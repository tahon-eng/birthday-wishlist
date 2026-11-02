import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './config.js';

const SELECT = 'id,gift_id,name,created_at';
const SCOPE = `wishlist:${SUPABASE_URL}:`;
const TOKEN_KEY = SCOPE + 'browser-secret';
const MINE_KEY = SCOPE + 'reservation-ids';
let mine = readMine();
let inFlight = false;
function readMine() {
  try { const values = JSON.parse(localStorage.getItem(MINE_KEY) || '[]'); return new Set(Array.isArray(values) ? values.filter(v => typeof v === 'string') : []); }
  catch { return new Set(); }
}
function config() {
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(SUPABASE_URL) || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Бронювання ще налаштовується. Поки що можна переглянути список подарунків.');
  }
  if (/^sb_secret_/.test(SUPABASE_PUBLISHABLE_KEY)) throw new Error('Помилка налаштування підключення.');
}
function browserSecret() {
  try {
    let token = localStorage.getItem(TOKEN_KEY);
    if (!/^[a-f0-9]{64}$/.test(token || '')) {
      token = Array.from(crypto.getRandomValues(new Uint8Array(32)), v => v.toString(16).padStart(2, '0')).join('');
      localStorage.setItem(TOKEN_KEY, token);
    }
    if (localStorage.getItem(TOKEN_KEY) !== token) throw new Error();
    return token;
  } catch { throw new Error('Дозволь збереження даних у цьому браузері, щоб зберегти доступ до своєї броні.'); }
}
async function hash(token) {
  const value = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return Array.from(new Uint8Array(value), v => v.toString(16).padStart(2, '0')).join('');
}
async function request(path, options = {}) {
  config();
  const headers = { apikey: SUPABASE_PUBLISHABLE_KEY, ...options.headers };
  // Modern publishable keys belong in apikey; legacy anon JWTs also need Bearer.
  if (SUPABASE_PUBLISHABLE_KEY.startsWith('eyJ')) headers.Authorization = 'Bearer ' + SUPABASE_PUBLISHABLE_KEY;
  let response;
  try { response = await fetch(SUPABASE_URL + '/rest/v1/' + path, { ...options, headers, cache: 'no-store', signal: AbortSignal.timeout(15000) }); }
  catch { throw new Error('Не вдалося зв’язатися зі списком бронювань. Перевір інтернет і спробуй ще раз.'); }
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    if (body?.code === '23505') throw new Error('Цей подарунок уже забронювали або ти вже маєш на нього бронь. Онови список.');
    if (response.status === 401 || response.status === 403) throw new Error('Бронювання зараз недоступне. Спробуй оновити сторінку або напиши мені.');
    throw new Error('Не вдалося оновити бронювання. Спробуй ще раз.');
  }
  return body;
}
export async function getGifts() {
  const [gifts, reservations] = await Promise.all([
    request('wishlist_gifts?select=id,repeatable&order=position'),
    request('wishlist_reservations?select=' + SELECT + '&order=created_at'),
  ]);
  if (!Array.isArray(gifts) || gifts.length !== 12 || !Array.isArray(reservations)) throw new Error('Список ще налаштовується. Спробуй трохи пізніше.');
  return gifts.map(gift => ({ ...gift, reservations: reservations.filter(r => r.gift_id === gift.id).map(r => ({ id: r.id, name: r.name })) }));
}
export function getMyReservationIds() { return [...mine]; }
export async function reserveGift(giftId, rawName) {
  if (inFlight) throw new Error('Попередня дія ще виконується.');
  const name = rawName.normalize('NFC').trim();
  if (name.length < 2 || name.length > 60 || /[\u0000-\u001f\u007f]/.test(name)) throw new Error('Вкажи ім’я від 2 до 60 символів.');
  const token = browserSecret();
  inFlight = true;
  try {
    const id = crypto.randomUUID();
    // Persist BEFORE sending: a lost response must not lose the ability to cancel.
    mine.add(id); localStorage.setItem(MINE_KEY, JSON.stringify([...mine]));
    const rows = await request('wishlist_reservations?select=' + SELECT, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Prefer: 'return=representation', 'x-wishlist-token': token },
      body: JSON.stringify({ id, gift_id: giftId, name, token_hash: await hash(token) }),
    });
    if (!Array.isArray(rows) || rows.length !== 1) throw new Error('Перевір оновлений список, щоб переконатися, що бронь збережено.');
    return rows[0];
  } finally { inFlight = false; }
}
export async function cancelReservation(id) {
  if (inFlight) throw new Error('Попередня дія ще виконується.');
  if (!mine.has(id)) throw new Error('Можна скасувати лише свою бронь.');
  const token = browserSecret();
  inFlight = true;
  try {
    const rows = await request('wishlist_reservations?id=eq.' + encodeURIComponent(id) + '&select=' + SELECT, { method: 'DELETE', headers: { Prefer: 'return=representation', 'x-wishlist-token': token } });
    if (!Array.isArray(rows) || rows.length !== 1) throw new Error('Ця бронь уже відсутня або належить іншому браузеру. Онови список.');
    mine.delete(id); localStorage.setItem(MINE_KEY, JSON.stringify([...mine]));
  } finally { inFlight = false; }
}
export function subscribe(onChange) {
  // No Realtime publication needed: fresh shared state every 15 seconds + focus.
  const refresh = () => { if (!document.hidden && !inFlight) onChange(); };
  const timer = setInterval(refresh, 15000);
  window.addEventListener('focus', refresh);
  const storage = e => { if (e.key === MINE_KEY) { mine = readMine(); refresh(); } };
  window.addEventListener('storage', storage);
  return () => { clearInterval(timer); window.removeEventListener('focus', refresh); window.removeEventListener('storage', storage); };
}
