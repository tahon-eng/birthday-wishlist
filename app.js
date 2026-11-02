const SVG_NS = 'http://www.w3.org/2000/svg';
const art = (content) => `<svg xmlns="${SVG_NS}" viewBox="0 0 300 200" fill="none" aria-hidden="true">${content}</svg>`;
const search = (query) => `https://www.skroutz.gr/search?keyphrase=${encodeURIComponent(query)}`;

// Only these local, fixed illustrations use HTML. Guest names always use textContent.
const gifts = [
  { id: 'oneblade', title: 'Philips OneBlade', category: 'Для себе', description: 'OneBlade 360 або 360 Pro. Щоб тримати все під контролем — і бороду теж.', detail: '360 / 360 Pro', url: search('Philips OneBlade 360'), color: '#e7eadc', illustration: art('<ellipse cx="155" cy="175" rx="59" ry="8" fill="#3a5037" opacity=".1"/><g transform="rotate(18 151 100)"><rect x="128" y="58" width="45" height="115" rx="19" fill="#38463c" stroke="#293c31" stroke-width="2.2"/><path d="M130 80h41v69c0 25-41 25-41 0V80Z" fill="#425847"/><path d="M132 83v67c0 13 9 20 18 20" stroke="#c4d96b" stroke-width="5" stroke-linecap="round"/><rect x="137" y="62" width="27" height="80" rx="12" fill="#293d32"/><rect x="143" y="104" width="15" height="22" rx="7" fill="#b9cf6b"/><path d="M150 109v6m-4-3a5 5 0 1 0 8 0" stroke="#344c32" stroke-width="1.4" stroke-linecap="round"/><path d="M135 58v-9h32v9" fill="#c3d76d" stroke="#293c31" stroke-width="2"/><rect x="119" y="32" width="66" height="20" rx="5" fill="#bdcf72" stroke="#293c31" stroke-width="2.2"/><rect x="124" y="36" width="56" height="11" rx="2" fill="#dce4b9"/><path d="M129 37v9m6-9v9m6-9v9m6-9v9m6-9v9m6-9v9m6-9v9m6-9v9m6-9v9" stroke="#647858" stroke-width="1"/></g>') },
  { id: 'mirror', title: 'Дзеркало у повний зріст', category: 'Для дому', description: 'Підлогове, від 160 см. Простеньке: без мережива, візерунків і всього такого.', detail: '160 см або вище', url: search('floor standing mirror 160 cm'), color: '#efe8df', illustration: art('<ellipse cx="155" cy="183" rx="58" ry="6" fill="#5d4c3c" opacity=".1"/><path d="m178 79 24 100h-7l-24-98" stroke="#685b47" stroke-width="2.2" fill="#bda37d"/><path d="M112 30h64v148h-64z" fill="#b69c78" stroke="#635b4a" stroke-width="2.3"/><path d="M119 37h50v134h-50z" fill="#dce5dd" stroke="#8a927e" stroke-width="1.5"/><path d="m123 107 41-61m-41 86 41-61" stroke="#f4f4e9" stroke-width="8" opacity=".85"/><path d="M112 177v7m64-7v7" stroke="#635b4a" stroke-width="3" stroke-linecap="round"/><path d="m199 50 5 9 10 2-9 5-1 10-6-8-10 2 5-9-4-9z" fill="#c6a775"/>') },
  { id: 'sneakers', title: 'New Balance 530', category: 'Для себе', description: 'Ті самі кросівки, які пасуватимуть і до планів, і до прогулянок без плану.', detail: 'Розмір і колір — уточни в особистих', url: search('New Balance 530'), color: '#e7e9e5', illustration: art('<ellipse cx="151" cy="164" rx="103" ry="10" fill="#44534c" opacity=".1"/><path d="m69 76 28-17 39 17 32 18 54 15c19 5 30 21 27 35l-10 13H60c-19 0-22-17-12-35l21-46Z" fill="#e8e5d9" stroke="#59665e" stroke-width="2.2"/><path d="m64 84 19 26 32-8 18-25-35-11-34 18Z" fill="#faf9ee" stroke="#7c867b" stroke-width="1.5"/><path d="m48 132 25-5 27 8 26-8 26 12 29-10 38 8 29-2v13l-11 10H60c-12 0-18-9-12-26Z" fill="#f8f5e9" stroke="#687369" stroke-width="2"/><path d="m47 147 63 1 39 3 94-2" stroke="#acb29f" stroke-width="2"/><path d="m113 99 10-10 49 12-8 11-30-7-13 16-13-5 17-24" fill="#bdc4b8" stroke="#788677" stroke-width="1.5"/><path d="m146 82 25-5 27 23-28-6-24-12Z" fill="#b4c0b4" stroke="#788677" stroke-width="1.5"/><path d="m144 85 22 13m-13-18 22 13m-12-19 20 14" stroke="#f6f4e8" stroke-width="3" stroke-linecap="round"/><path d="m77 95 8 13m-1-16 8 13m-1-16 8 13m89 11 17 9m-9-14 17 9m-9-13 17 9" stroke="#b3bcac" stroke-width="1.5"/>') },
  { id: 'sunglasses', title: 'Сонцезахисні окуляри', category: 'Сертифікати', description: 'Подарунковий сертифікат, щоб можна було приміряти й обрати свою пару.', detail: 'Сертифікат — чудова ідея', repeatable: true, color: '#f0e8d5', illustration: art('<ellipse cx="151" cy="163" rx="91" ry="9" fill="#695a40" opacity=".08"/><g transform="rotate(-10 150 104)"><path d="m68 98 5-31 24-5m138 36-5-31-24-5" stroke="#4b4936" stroke-width="5" stroke-linecap="round"/><path d="M58 97h75v14c0 57-69 47-72 12l-3-26Zm110 0h75l-4 26c-3 35-71 45-71-12V97Z" fill="#7d8366" stroke="#3c4838" stroke-width="5"/><path d="M133 104c12-10 24-10 35 0M51 97h13m174 0h12" stroke="#3c4838" stroke-width="5" stroke-linecap="round"/><path d="m73 109 18 24m-6-24 18 24m80-24 18 24m-6-24 18 24" stroke="#adb798" stroke-width="3" opacity=".6"/></g><path d="m217 43 3 8 9 1-7 5 2 9-7-5-7 5 2-9-7-5 9-1z" fill="#c79f5e"/>') },
  { id: 'hairdryer', title: 'Фен. Так, звичайний фен', category: 'Для себе', description: 'Внатурі я не маю фена 🙂 Час виправити цю маленьку побутову несправедливість.', url: search('hair dryer'), color: '#e9e3df', illustration: art('<ellipse cx="148" cy="179" rx="68" ry="7" fill="#4a4841" opacity=".08"/><path d="M152 150c-1 37 38 25 38 43" stroke="#5f6558" stroke-width="3" stroke-linecap="round"/><g transform="rotate(-15 150 100)"><path d="m129 98 5 64c0 10 32 10 33 0l1-64" fill="#b77d6b" stroke="#55594e" stroke-width="2.2"/><path d="M148 115v19" stroke="#f0d8c8" stroke-width="5" stroke-linecap="round"/><path d="M79 53c12-13 32-16 53-11l69 18v48l-71 8c-28 3-56-17-56-40 0-8 1-17 5-23Z" fill="#d6a18a" stroke="#55594e" stroke-width="2.2"/><path d="M92 51c-18 6-19 43-1 51" stroke="#b77d6b" stroke-width="5"/><path d="M204 63h26v42h-26z" fill="#535b50" stroke="#3f4b3f" stroke-width="2"/><path d="m205 64 22 1 14 15-1 10-13 14-22 1V64Z" fill="#646b5d" stroke="#3f4b3f" stroke-width="2"/><path d="M90 64v21m7-25v30m7-31v31" stroke="#8f7465" stroke-width="2" stroke-linecap="round"/></g>') },
  { id: 'bracelets', title: 'Браслети', category: 'Для себе', description: 'Шкіряні чи металеві. На інших бачив, а сам ще не носив. Хочу спробувати!', detail: 'Розмір зап’ястка — уточни в особистих', url: search('mens leather steel bracelet'), color: '#e9e8dd', illustration: art('<ellipse cx="112" cy="160" rx="53" ry="8" fill="#584838" opacity=".1"/><ellipse cx="197" cy="160" rx="49" ry="7" fill="#584838" opacity=".08"/><g transform="rotate(-18 117 103)"><ellipse cx="116" cy="101" rx="45" ry="55" stroke="#5f4b38" stroke-width="19"/><ellipse cx="116" cy="101" rx="45" ry="55" stroke="#8c694a" stroke-width="13"/><ellipse cx="116" cy="101" rx="45" ry="55" stroke="#b38c61" stroke-width="2" stroke-dasharray="3 4"/><rect x="107" y="143" width="23" height="23" rx="3" fill="#9a9b87" stroke="#4b5143" stroke-width="2"/><rect x="112" y="148" width="13" height="13" rx="2" stroke="#d7d8bc" stroke-width="2"/></g><g transform="rotate(20 193 111)"><ellipse cx="192" cy="109" rx="40" ry="48" fill="#a2aa9b" stroke="#505d50" stroke-width="2"/><ellipse cx="192" cy="109" rx="29" ry="36" fill="#e9e8dd" stroke="#505d50" stroke-width="2"/><path d="m164 72 8 8m-15 7 11 5m-14 12h11m-9 17 10-3m-4 21 9-8m4 20 5-11m16 14-1-11m18 4-5-9m16-7-9-6m12-10-10-2m7-16-10 3m1-20-7 7m-9-17-3 11" stroke="#e0e2cb" stroke-width="3"/></g>') },
  { id: 'multitool', title: 'Ніж або мультитул', category: 'Корисні штуки', description: 'Швейцарський ніж чи мультитул. Маленька річ для великих «а в мене є чим!».', url: search('Swiss army knife multitool'), color: '#e3e7dc', illustration: art('<ellipse cx="150" cy="174" rx="78" ry="7" fill="#45523c" opacity=".08"/><g transform="rotate(-22 150 109)"><path d="m161 105 38-78c7-13 15-4 15 8l-12 76" fill="#cbd0be" stroke="#4d5a4a" stroke-width="2.2"/><path d="m176 81 23-47m-41 75-4-76c0-16 10-17 14-3l16 69" stroke="#4d5a4a" stroke-width="2" fill="#e0e2cf"/><path d="m114 114-36-58 9-6 46 56m-2 15-18-82 10-2 31 77" fill="#a5af9b" stroke="#4d5a4a" stroke-width="2.2"/><path d="m103 135-30 26-9-6 30-29" fill="#d7dbc8" stroke="#4d5a4a" stroke-width="2"/><rect x="85" y="105" width="127" height="39" rx="19" fill="#b96a52" stroke="#4d5a4a" stroke-width="2.2"/><rect x="92" y="110" width="112" height="29" rx="14" fill="#cd7e5f"/><path d="M144 115h11v7h7v10h-7v6h-11v-6h-7v-10h7v-7Z" fill="#f2e7ce" transform="translate(0 -2) scale(1 .9)"/><circle cx="99" cy="124" r="3" fill="#b6bca6" stroke="#4d5a4a" stroke-width="1.5"/><circle cx="198" cy="124" r="3" fill="#b6bca6" stroke="#4d5a4a" stroke-width="1.5"/></g>') },
  { id: 'screwdriver', title: 'Магнітна викрутка', category: 'Корисні штуки', description: 'Щоб болти не падали. Бо ловити їх десь під шафою — окремий вид спорту.', url: search('magnetic screwdriver'), color: '#eee6d8', illustration: art('<ellipse cx="150" cy="175" rx="80" ry="8" fill="#655239" opacity=".08"/><g transform="rotate(40 143 103)"><path d="M139 22h10v93h-10z" fill="#b4bda8" stroke="#4c5947" stroke-width="2"/><path d="m139 22-2-12h14l-2 12" fill="#8d9a83" stroke="#4c5947" stroke-width="2"/><path d="M127 105h34l7 20-5 45c-2 18-37 18-39 0l-5-45 8-20Z" fill="#e2b964" stroke="#4c5947" stroke-width="2.3"/><path d="M130 115h28v48c0 19-28 19-28 0v-48Z" fill="#4c5a43"/><path d="M143 124v43m-9-39v32m18-32v32" stroke="#7e8c6d" stroke-width="3" stroke-linecap="round"/></g><g transform="rotate(-20 216 108)"><path d="M211 87h10v35h-10z" fill="#b1baa6" stroke="#4c5947" stroke-width="1.5"/><path d="M208 87h16v6h-16zM211 101h10m-10 5h10m-10 5h10m-10 5h10" stroke="#4c5947" stroke-width="1.5"/></g><path d="m201 52 8-5m-1 18h10" stroke="#bc814d" stroke-width="2.3" stroke-linecap="round"/>') },
  { id: 'vacuum', title: 'Мініпилосос без дротів', category: 'Для дому й авто', description: 'Mini Cordless Vacuum Cleaner. Для крихт, пилу і швидкого наведення порядку.', url: search('mini cordless vacuum cleaner'), color: '#e2e8e0', illustration: art('<ellipse cx="157" cy="175" rx="87" ry="8" fill="#4b5c48" opacity=".09"/><g transform="rotate(-18 149 107)"><path d="m171 88 48 10 27 38-12 9-30-28-34-4" fill="#72866e" stroke="#465b45" stroke-width="2.3"/><path d="M83 70h93l18 22v31l-18 14H83V70Z" fill="#9aab8d" stroke="#465b45" stroke-width="2.3"/><path d="M115 70h57v67h-57z" fill="#d3dbc5" opacity=".8"/><path d="m116 79 32 49m-20-49 32 49" stroke="#eceddb" stroke-width="3" opacity=".6"/><path d="M84 72 48 84v40l36 12V72Z" fill="#596b52" stroke="#465b45" stroke-width="2"/><path d="M49 88H27v31h22" fill="#7e9070" stroke="#465b45" stroke-width="2"/><rect x="155" y="60" width="20" height="12" rx="5" fill="#d7bb78" stroke="#465b45" stroke-width="2"/><path d="M180 89v26m6-22v18" stroke="#6c805f" stroke-width="2" stroke-linecap="round"/></g>') },
  { id: 'phone-holder', title: 'Тримач для телефона', category: 'У майбутнє авто', description: 'Для машини, щоб телефон тримало. Олег собі це забронював дуже переконливо 😁', presetName: 'Олег', color: '#e9e5d9', illustration: art('<ellipse cx="152" cy="179" rx="62" ry="7" fill="#4b4f41" opacity=".08"/><path d="m141 125-9 35h41l-9-35" fill="#586654" stroke="#394c3d" stroke-width="2.2"/><ellipse cx="153" cy="164" rx="37" ry="10" fill="#89967b" stroke="#394c3d" stroke-width="2.2"/><rect x="116" y="26" width="73" height="116" rx="12" fill="#52634e" stroke="#394c3d" stroke-width="2.3"/><rect x="122" y="32" width="61" height="102" rx="7" fill="#c9d5b8"/><path d="m131 101 17-19 11 7 19-35" stroke="#8a9e77" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="m131 101 17-19 11 7 19-35" stroke="#f0ecd8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="148" cy="82" r="4" fill="#b36f4a"/><path d="M142 33h22" stroke="#52634e" stroke-width="3" stroke-linecap="round"/><path d="M109 84h15v24h-15zM181 84h15v24h-15z" fill="#6e7d61" stroke="#394c3d" stroke-width="2"/><path d="M133 130v14h40v-14" stroke="#394c3d" stroke-width="4" stroke-linejoin="round"/>') },
  { id: 'giftcard', title: 'Гіфткард', category: 'Сертифікати', description: 'Amazon, Skroutz і т. п. Трошки свободи обрати саме те, чого захочеться.', detail: 'Магазин і регіон — уточни в особистих', repeatable: true, url: 'https://www.amazon.de/s?k=gift+card', linkText: 'Пошук на Amazon', color: '#eee5d4', illustration: art('<ellipse cx="150" cy="167" rx="91" ry="8" fill="#74623d" opacity=".08"/><g transform="rotate(-10 150 101)"><rect x="54" y="52" width="190" height="112" rx="10" fill="#d3b46e" stroke="#5b573c" stroke-width="2.2"/><path d="M72 76h65m-65 10h43" stroke="#f3e8c7" stroke-width="3" stroke-linecap="round"/><path d="M54 108h190" stroke="#b29658" stroke-width="1.5" stroke-dasharray="4 4"/><path d="m191 75-3 8-9 1 7 6-2 9 7-5 7 5-2-9 7-6-9-1-3-8Z" fill="#f7efd6" stroke="#716743" stroke-width="1.3"/><rect x="70" y="122" width="58" height="23" rx="4" fill="#f5e9c8"/><path d="M80 128v11m5-11v11m7-11v11m3-11v11m6-11v11m4-11v11m7-11v11m5-11v11" stroke="#8f8052" stroke-width="1.3"/><path d="M161 132c16 9 37 9 50-3m-8-4 9 3-3 9" stroke="#6f6744" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g>') },
  { id: 'cash', title: 'Гроші у конвертику', category: 'Класика, але з душею', description: 'Тільки з побажаннями 😁 Ну щоб усе згідно-відповідно. Теплі слова — обов’язкова частина.', detail: 'Конвертик + кілька слів від тебе', repeatable: true, color: '#e6eadf', illustration: art('<ellipse cx="150" cy="175" rx="93" ry="8" fill="#536044" opacity=".08"/><g transform="rotate(7 150 110)"><path d="M62 71h177v95H62z" fill="#e6c690" stroke="#62624c" stroke-width="2.2"/><path d="m62 75 88 63 89-63" fill="#eed8af" stroke="#62624c" stroke-width="2" stroke-linejoin="round"/><path d="m62 166 65-48m112 48-65-48" stroke="#9b916c" stroke-width="1.6"/><path d="M91 84V39h118v45l-59 42-59-42Z" fill="#f8f3df" stroke="#62624c" stroke-width="2"/><path d="M109 57h56m-56 10h81m-81 10h71" stroke="#b6b79a" stroke-width="2" stroke-linecap="round"/><path d="M150 100c-15-14-26 6 0 19 25-13 15-33 0-19Z" fill="#bd7858"/></g><path d="m225 35 2 8 9 2-8 4-1 9-5-7-9 1 5-7-3-8 8 3z" fill="#c4aa6d"/>') }
];

const grid = document.querySelector('#gift-grid');
const status = document.querySelector('#connection-status');
const alertBox = document.querySelector('#connection-alert');
const retry = document.querySelector('#retry-connection');
const dialog = document.querySelector('#booking-dialog');
const form = document.querySelector('#booking-form');
const nameInput = document.querySelector('#guest-name');
const submit = document.querySelector('#dialog-submit');
const dialogClose = document.querySelector('#dialog-close');
const dialogSecondary = document.querySelector('#dialog-secondary');
const dialogError = document.querySelector('#dialog-error');
const emptyState = document.querySelector('#empty-state');
const filterButtons = [...document.querySelectorAll('[data-filter]')];

let api;
let liveGifts = new Map();
let ownIds = new Set();
let connected = false;
let loading = true;
let filter = 'all';
let mode = 'reserve';
let selectedGift;
let selectedReservation;
let pending = false;
let activeRequest;
let stopSubscription;
let startingSubscription = false;
let fallbackTimer;
let toastTimer;
let dialogInvoker;

const element = (tag, className, text) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
};

const reservationsFor = (gift) => liveGifts.get(gift.id)?.reservations || [];
const isRepeatable = (gift) => liveGifts.get(gift.id)?.repeatable ?? Boolean(gift.repeatable);
const canReserve = (gift) => isRepeatable(gift) || reservationsFor(gift).length === 0;
const isMine = (reservation) => ownIds.has(String(reservation.id));

function ownReservations(gift) {
  return reservationsFor(gift).filter(isMine);
}

function updateConnection() {
  status.replaceChildren();
  status.append(element('span', `status-dot ${loading ? 'pending' : connected ? '' : 'offline'}`));
  status.append(element('span', loading ? 'Підключаємо список…' : connected ? 'Бронювання спільне для всіх' : 'Бронювання зараз недоступне'));
  alertBox.hidden = connected || loading;
  retry.disabled = loading;
  retry.textContent = loading ? 'Підключаємо…' : 'Спробувати ще раз ↻';
  grid.setAttribute('aria-busy', String(loading));
  filterButtons.forEach((button) => {
    button.disabled = button.dataset.filter !== 'all' && !connected;
  });
}

function createReservationRow(reservation, gift) {
  const row = element('li', 'reservation-person');
  const initial = String(reservation.name || '?').trim().slice(0, 1).toLocaleUpperCase('uk');
  row.append(element('span', 'reservation-avatar', initial));
  const name = element('span', 'reservation-name', String(reservation.name || 'Гість'));
  name.append(element('span', 'reserved-suffix', ' · ' + (isMine(reservation) ? 'твоя бронь' : 'бронює')));
  row.append(name);
  if (isMine(reservation)) {
    const cancel = element('button', 'own-reservation-cancel', 'Скасувати');
    cancel.type = 'button';
    cancel.disabled = !connected;
    cancel.setAttribute('aria-label', `Скасувати свою бронь: ${gift.title}`);
    cancel.addEventListener('click', () => openCancel(gift, reservation, cancel));
    row.append(cancel);
  }
  return row;
}

function renderGift(gift, index) {
  const reservations = reservationsFor(gift);
  const repeatable = isRepeatable(gift);
  const reserved = reservations.length > 0;
  const card = element('article', 'gift-card');
  card.dataset.giftId = gift.id;
  card.style.setProperty('--art-bg', gift.color);
  const visual = element('div', 'gift-visual');
  visual.innerHTML = gift.illustration;
  visual.append(element('span', 'gift-index', String(index + 1).padStart(2, '0')));
  const label = element('span', `gift-label ${!connected ? 'unknown' : repeatable ? 'repeatable' : reserved ? 'reserved' : ''}`);
  const labelText = !connected ? (gift.presetName ? 'Вже обрав Олег' : loading ? 'Перевіряємо…' : 'Статус невідомий') : repeatable ? 'Можна кільком гостям' : reserved ? 'Заброньовано' : 'Вільний';
  label.append(element('span', 'label-dot'), document.createTextNode(labelText));
  visual.append(label);
  card.append(visual);
  const content = element('div', 'gift-content');
  content.append(element('p', 'gift-category', gift.category));
  const title = element('h3', '', gift.title);
  title.id = `gift-title-${gift.id}`;
  card.setAttribute('aria-labelledby', title.id);
  content.append(title, element('p', 'gift-description', gift.description));
  if (gift.detail) content.append(element('p', 'gift-detail', gift.detail));
  if (gift.url) {
    const link = element('a', 'gift-search', (gift.linkText || 'Пошук на Skroutz') + ' ↗');
    link.href = gift.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${gift.linkText || 'Пошук на Skroutz'}: ${gift.title} (нова вкладка)`);
    content.append(link);
  }
  const action = element('div', 'gift-action-area');
  if (reserved && connected) {
    const people = element('ul', 'reservation-list');
    people.setAttribute('aria-label', 'Хто забронював');
    reservations.forEach((reservation) => people.append(createReservationRow(reservation, gift)));
    action.append(people);
  } else if (!connected && gift.presetName) {
    action.append(element('p', 'reservation-preset-note', 'У вішлісті вже зазначено: обрав Олег.'));
  }
  const mine = ownReservations(gift).length > 0;
  if ((!reserved || repeatable) && !gift.presetName || connected && repeatable) {
    const button = element('button', `gift-reserve ${repeatable && reserved ? 'repeatable-action' : ''}`);
    button.type = 'button';
    button.disabled = !connected || (!repeatable && mine);
    button.append(element('span', '', !connected ? 'Бронювання недоступне' : repeatable && reserved ? 'Додати бронювання' : mine ? 'Ти вже забронював/-ла ✓' : 'Забронювати'));
    if (connected && (repeatable || !mine)) button.append(element('span', 'button-arrow', '↗'));
    button.setAttribute('aria-label', `Забронювати: ${gift.title}`);
    button.addEventListener('click', () => openReservation(gift, button));
    action.append(button);
  } else if (!connected || !reserved) {
    const button = element('button', 'gift-reserve', gift.presetName ? 'Уже обрав Олег' : 'Бронювання недоступне');
    button.disabled = true;
    button.type = 'button';
    action.append(button);
  }
  content.append(action);
  card.append(content);
  return card;
}

function render() {
  updateConnection();
  const totals = {
    all: gifts.length,
    free: gifts.filter(canReserve).length,
    reserved: gifts.filter((gift) => reservationsFor(gift).length > 0).length
  };
  document.querySelectorAll('[data-count]').forEach((span) => {
    span.textContent = span.dataset.count === 'all' || connected ? totals[span.dataset.count] : '—';
  });
  if (!connected) filter = 'all';
  filterButtons.forEach((button) => {
    const current = button.dataset.filter === filter;
    button.classList.toggle('active', current);
    button.setAttribute('aria-pressed', String(current));
  });
  grid.replaceChildren();
  gifts.forEach((gift, index) => {
    const show = filter === 'all' || filter === 'free' && canReserve(gift) || filter === 'reserved' && reservationsFor(gift).length > 0;
    if (show) grid.append(renderGift(gift, index));
  });
  emptyState.hidden = grid.children.length !== 0;
  emptyState.textContent = filter === 'reserved' ? 'Поки жодної броні. Можеш бути першим/-ою ♡' : 'Усі подарунки вже знайшли своїх людей. Напиши мені — придумаємо ще щось!';
}

function showToast(message) {
  const region = document.querySelector('#toast-region');
  clearTimeout(toastTimer);
  region.replaceChildren();
  const toast = element('div', 'toast');
  toast.append(element('span', 'toast-icon', '✓'), element('span', '', message));
  region.append(toast);
  toastTimer = setTimeout(() => region.replaceChildren(), 6500);
}

function errorMessage(error, cancelling = false) {
  const source = `${error?.code || ''} ${error?.message || error || ''}`;
  if (/Цей подарунок уже забронювали|вже маєш на нього бронь/i.test(source)) return 'Цей подарунок уже заброньовано або ти вже маєш на нього бронь. Список оновлено — перевір його після закриття вікна.';
  if (/already.reserved|gift.taken|unique|conflict|23505|already.booked|reserved_by_other/i.test(source)) return 'Хтось уже встиг забронювати цей подарунок. Обери інший — гарних ідей ще багато.';
  if (/already.*(you|own)|duplicate.*(guest|owner)|own.*reservation/i.test(source)) return 'У тебе вже є бронь на цей подарунок.';
  if (/name|22023|ім’я від 2 до 60/i.test(source)) return 'Вкажи ім’я від 2 до 60 символів, будь ласка.';
  if (/forbidden|not.owner|permission|42501|not.found|404/i.test(source) && cancelling) return 'Цю бронь не вдалося скасувати. Вона доступна лише в браузері, де її створили, або вже скасована.';
  if (/storage|localStorage|browser.*secret|Дозволь збереження даних/i.test(source)) return 'Браузер не дозволяє зберегти твою бронь. Дозволь зберігання даних для цього сайту та спробуй ще раз.';
  return cancelling ? 'Не вдалося підтвердити скасування. Перевір з’єднання та спробуй ще раз.' : 'Не вдалося підтвердити бронювання. Перевір з’єднання та спробуй ще раз.';
}

function openDialog(gift, invoker) {
  selectedGift = gift;
  dialogInvoker = invoker;
  dialogError.hidden = true;
  dialogError.textContent = '';
  submit.disabled = false;
  dialogClose.disabled = false;
  dialogSecondary.disabled = false;
  submit.classList.toggle('danger', mode === 'cancel');
  dialog.showModal();
}

function openReservation(gift, invoker) {
  if (!connected || !canReserve(gift) || (!isRepeatable(gift) && ownReservations(gift).length > 0)) return;
  mode = 'reserve';
  selectedReservation = undefined;
  document.querySelector('#dialog-icon').textContent = '♡';
  document.querySelector('#dialog-eyebrow').textContent = 'ЦЕЙ ПОДАРУНОК — ВІД ТЕБЕ';
  document.querySelector('#dialog-title').textContent = 'Бронюємо?';
  document.querySelector('#dialog-description').textContent = `${gift.title}${isRepeatable(gift) ? '\nМожна додати кілька бронювань на різні імена, навіть із цього ж браузера. Кожна бронь окрема — подарунок залишається доступним іншим.' : '\nЗалиш ім’я — інші побачать, що подарунок уже зайнятий.'}`;
  document.querySelector('#name-field').hidden = false;
  nameInput.disabled = false;
  nameInput.value = '';
  submit.textContent = 'Так, беру на себе ↗';
  dialogSecondary.textContent = 'Ще подумаю';
  openDialog(gift, invoker);
  nameInput.focus();
}

function openCancel(gift, reservation, invoker) {
  if (!connected || !isMine(reservation)) return;
  mode = 'cancel';
  selectedReservation = reservation;
  document.querySelector('#dialog-icon').textContent = '↶';
  document.querySelector('#dialog-eyebrow').textContent = 'ПЛАНИ БУВАЮТЬ МІНЛИВІ';
  document.querySelector('#dialog-title').textContent = 'Скасувати бронь?';
  document.querySelector('#dialog-description').textContent = `${gift.title}\n${isRepeatable(gift) ? 'Твоя бронь зникне зі списку. Подарунок і далі можна буде обрати.' : 'Після скасування цей подарунок знову зможе обрати хтось інший.'}`;
  document.querySelector('#name-field').hidden = true;
  nameInput.disabled = true;
  submit.textContent = 'Так, скасувати бронь';
  dialogSecondary.textContent = 'Залишити мою бронь';
  openDialog(gift, invoker);
  dialogSecondary.focus();
}

function closeDialog() {
  if (pending) return;
  dialog.close();
}

function setPending(value) {
  pending = value;
  form.setAttribute('aria-busy', String(value));
  submit.disabled = value;
  dialogClose.disabled = value;
  dialogSecondary.disabled = value;
  nameInput.readOnly = value;
}

async function loadGifts({ quiet = false } = {}) {
  if (activeRequest) return activeRequest;
  activeRequest = (async () => {
    if (!quiet) { loading = true; render(); }
    try {
      if (!api) api = await import('./backend.js');
      const [data, ids] = await Promise.all([api.getGifts(), Promise.resolve(api.getMyReservationIds())]);
      if (!Array.isArray(data) || gifts.some((gift) => !data.some((item) => String(item.id) === gift.id))) throw new Error('Incomplete gift list');
      liveGifts = new Map(data.map((gift) => [String(gift.id), { ...gift, reservations: Array.isArray(gift.reservations) ? gift.reservations : [] }]));
      ownIds = new Set(Array.from(ids || []).map(String));
      connected = true;
      startLiveUpdates();
      return true;
    } catch (error) {
      connected = false;
      return false;
    } finally {
      loading = false;
      render();
      activeRequest = undefined;
    }
  })();
  return activeRequest;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (pending || !connected || !selectedGift) return;
  const guestName = nameInput.value.trim().replace(/\s+/g, ' ');
  if (mode === 'reserve' && (guestName.length < 2 || guestName.length > 60)) {
    dialogError.textContent = 'Вкажи ім’я від 2 до 60 символів, будь ласка.';
    dialogError.hidden = false;
    nameInput.focus();
    return;
  }
  const actionMode = mode;
  setPending(true);
  dialogError.hidden = true;
  submit.textContent = actionMode === 'cancel' ? 'Скасовуємо…' : 'Зберігаємо бронь…';
  try {
    if (actionMode === 'cancel') await api.cancelReservation(selectedReservation.id);
    else await api.reserveGift(selectedGift.id, guestName);
    if (activeRequest) await activeRequest;
    await loadGifts({ quiet: true });
    setPending(false);
    dialog.close();
    showToast(actionMode === 'cancel' ? 'Бронь скасовано. Дякую, що попередив/-ла!' : `Готово, ${guestName}! Подарунок заброньовано за тобою ♡`);
  } catch (error) {
    dialogError.textContent = errorMessage(error, actionMode === 'cancel');
    dialogError.hidden = false;
    setPending(false);
    submit.textContent = actionMode === 'cancel' ? 'Спробувати скасувати ще раз' : 'Спробувати забронювати ще раз';
    await loadGifts({ quiet: true });
    if (!connected) {
      submit.disabled = true;
      dialogError.textContent += ' Зараз немає з’єднання. Закрий вікно й натисни «Спробувати ще раз» над подарунками.';
    } else if (actionMode === 'reserve' && (!canReserve(selectedGift) || (!isRepeatable(selectedGift) && ownReservations(selectedGift).length > 0))) {
      submit.disabled = true;
    }
  }
});

filterButtons.forEach((button) => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  render();
}));
dialogClose.addEventListener('click', closeDialog);
dialogSecondary.addEventListener('click', closeDialog);
dialog.addEventListener('cancel', (event) => { if (pending) event.preventDefault(); });
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
});
dialog.addEventListener('close', () => {
  if (document.contains(dialogInvoker)) dialogInvoker.focus();
  else document.querySelector(`[data-gift-id="${selectedGift?.id}"] h3`)?.closest('article')?.querySelector('button')?.focus();
});
const refreshList = () => { if (!document.hidden && !loading && !pending) loadGifts({ quiet: true }); };
async function startLiveUpdates() {
  if (startingSubscription || stopSubscription || fallbackTimer) return;
  startingSubscription = true;
  try {
    if (typeof api?.subscribe === 'function') stopSubscription = await api.subscribe(refreshList);
  } catch { /* Reads and focus refresh remain available when subscription fails. */ }
  finally {
    if (typeof stopSubscription !== 'function') {
      fallbackTimer = setInterval(refreshList, 20000);
      window.addEventListener('focus', refreshList);
    }
    startingSubscription = false;
  }
}

retry.addEventListener('click', () => { loadGifts(); });
document.addEventListener('visibilitychange', refreshList);
window.addEventListener('pageshow', (event) => { if (event.persisted) { startLiveUpdates(); refreshList(); } });
window.addEventListener('pagehide', () => {
  if (typeof stopSubscription === 'function') stopSubscription();
  stopSubscription = undefined;
  clearInterval(fallbackTimer);
  fallbackTimer = undefined;
  window.removeEventListener('focus', refreshList);
});

render();
loadGifts();
