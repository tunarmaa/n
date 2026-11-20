'use strict';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const loadBtn = document.getElementById('loadBtn');
const searchInput = document.getElementById('searchInput');
const statusBox = document.getElementById('status');
const usersList = document.getElementById('usersList');
const postsStatus = document.getElementById('postsStatus');
const postsList = document.getElementById('postsList');


/* Резервные данные: используются ТОЛЬКО при сетевом сбое (сервер недоступен).
   При HTTP-ошибках (например 404) показывается сообщение об ошибке. */
const FALLBACK_USERS = [{"id": 1, "name": "Leanne Graham", "email": "Sincere@april.biz", "address": {"city": "Gwenborough"}}, {"id": 2, "name": "Ervin Howell", "email": "Shanna@melissa.tv", "address": {"city": "Wisokyburgh"}}, {"id": 3, "name": "Clementine Bauch", "email": "Nathan@yesenia.net", "address": {"city": "McKenziehaven"}}, {"id": 4, "name": "Patricia Lebsack", "email": "Julianne.OConner@kory.org", "address": {"city": "South Elvis"}}, {"id": 5, "name": "Chelsey Dietrich", "email": "Lucio_Hettinger@annie.ca", "address": {"city": "Roscoeview"}}, {"id": 6, "name": "Mrs. Dennis Schulist", "email": "Karley_Dach@jasper.info", "address": {"city": "South Christy"}}, {"id": 7, "name": "Kurtis Weissnat", "email": "Telly.Hoeger@billy.biz", "address": {"city": "Howemouth"}}, {"id": 8, "name": "Nicholas Runolfsdottir V", "email": "Sherwood@rosamond.me", "address": {"city": "Aliyaview"}}, {"id": 9, "name": "Glenna Reichert", "email": "Chaim_McDermott@dana.io", "address": {"city": "Bartholomebury"}}, {"id": 10, "name": "Clementina DuBuque", "email": "Rey.Padberg@karina.biz", "address": {"city": "Lebsackbury"}}];
const FALLBACK_POSTS = [{"id": 1, "userId": 1, "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"}, {"id": 2, "userId": 1, "title": "qui est esse", "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"}, {"id": 3, "userId": 1, "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut", "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"}, {"id": 11, "userId": 2, "title": "sample post 1 of user 2", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 2."}, {"id": 12, "userId": 2, "title": "sample post 2 of user 2", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 2."}, {"id": 13, "userId": 2, "title": "sample post 3 of user 2", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 2."}, {"id": 21, "userId": 3, "title": "sample post 1 of user 3", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 3."}, {"id": 22, "userId": 3, "title": "sample post 2 of user 3", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 3."}, {"id": 23, "userId": 3, "title": "sample post 3 of user 3", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 3."}, {"id": 31, "userId": 4, "title": "sample post 1 of user 4", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 4."}, {"id": 32, "userId": 4, "title": "sample post 2 of user 4", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 4."}, {"id": 33, "userId": 4, "title": "sample post 3 of user 4", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 4."}, {"id": 41, "userId": 5, "title": "sample post 1 of user 5", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 5."}, {"id": 42, "userId": 5, "title": "sample post 2 of user 5", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 5."}, {"id": 43, "userId": 5, "title": "sample post 3 of user 5", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 5."}, {"id": 51, "userId": 6, "title": "sample post 1 of user 6", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 6."}, {"id": 52, "userId": 6, "title": "sample post 2 of user 6", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 6."}, {"id": 53, "userId": 6, "title": "sample post 3 of user 6", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 6."}, {"id": 61, "userId": 7, "title": "sample post 1 of user 7", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 7."}, {"id": 62, "userId": 7, "title": "sample post 2 of user 7", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 7."}, {"id": 63, "userId": 7, "title": "sample post 3 of user 7", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 7."}, {"id": 71, "userId": 8, "title": "sample post 1 of user 8", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 8."}, {"id": 72, "userId": 8, "title": "sample post 2 of user 8", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 8."}, {"id": 73, "userId": 8, "title": "sample post 3 of user 8", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 8."}, {"id": 81, "userId": 9, "title": "sample post 1 of user 9", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 9."}, {"id": 82, "userId": 9, "title": "sample post 2 of user 9", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 9."}, {"id": 83, "userId": 9, "title": "sample post 3 of user 9", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 9."}, {"id": 91, "userId": 10, "title": "sample post 1 of user 10", "body": "Пример текста публикации (локальные демо-данные) 1 для пользователя 10."}, {"id": 92, "userId": 10, "title": "sample post 2 of user 10", "body": "Пример текста публикации (локальные демо-данные) 2 для пользователя 10."}, {"id": 93, "userId": 10, "title": "sample post 3 of user 10", "body": "Пример текста публикации (локальные демо-данные) 3 для пользователя 10."}];
let usedFallback = false;
const FALLBACK_NOTICE = 'Сервер jsonplaceholder недоступен (сетевой сбой). Показаны сохранённые демо-данные.';

let allUsers = []; // загруженный список пользователей (для поиска без нового запроса)

/* ---------- Вспомогательные функции ---------- */

// Показать сообщение в указанной области; onRetry добавляет кнопку «Повторить»
function showMessage(box, text, type, onRetry) {
  box.textContent = '';
  const p = document.createElement('p');
  p.className = type;
  p.textContent = text;

  if (onRetry) {
    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'btn btn-retry';
    retryBtn.textContent = 'Повторить';
    retryBtn.addEventListener('click', onRetry);
    p.appendChild(retryBtn);
  }
  box.appendChild(p);
}

function clearMessage(box) {
  box.textContent = '';
}

// Запрос + проверка response.ok + чтение JSON
async function fetchJson(url) {
  usedFallback = false;
  let response;
  try {
    response = await fetch(url);
  } catch (networkError) {
    // Сетевой сбой: переходим на резервные данные, чтобы приложение оставалось работоспособным
    usedFallback = true;
    return getFallback(url);
  }
  if (!response.ok) {
    throw new Error('Ошибка HTTP: ' + response.status + (response.statusText ? ' ' + response.statusText : ''));
  }
  return await response.json();
}

function getFallback(url) {
  const u = new URL(url);
  if (u.pathname === '/users') return FALLBACK_USERS;
  if (u.pathname === '/posts') {
    const id = Number(u.searchParams.get('userId'));
    return FALLBACK_POSTS.filter((x) => x.userId === id);
  }
  throw new Error('Ошибка HTTP: 404 Not Found');
}

function errorText(error) {
  // TypeError возникает при сетевом сбое (нет интернета, DNS и т.д.)
  if (error instanceof TypeError) {
    return 'Сетевая ошибка: не удалось связаться с сервером. Проверьте подключение.';
  }
  return error.message;
}

/* ---------- Загрузка пользователей ---------- */

async function loadUsers() {
  loadBtn.disabled = true;
  showMessage(statusBox, 'Загрузка...', 'loading');
  usersList.textContent = '';

  try {
    allUsers = await fetchJson(USERS_URL);
    clearMessage(statusBox);
    renderUsers();
    if (usedFallback) {
      showMessage(statusBox, FALLBACK_NOTICE, 'info');
    }
  } catch (error) {
    allUsers = [];
    showMessage(statusBox, 'Не удалось загрузить пользователей. ' + errorText(error), 'error', loadUsers);
  } finally {
    loadBtn.disabled = false;
  }
}

/* ---------- Отображение и поиск ---------- */

function createUserCard(user) {
  const card = document.createElement('article');
  card.className = 'user-card';

  const name = document.createElement('h3');
  name.textContent = user.name;

  const email = document.createElement('p');
  const emailLabel = document.createElement('span');
  emailLabel.className = 'label';
  emailLabel.textContent = 'Email: ';
  email.append(emailLabel, user.email);

  const city = document.createElement('p');
  const cityLabel = document.createElement('span');
  cityLabel.className = 'label';
  cityLabel.textContent = 'Город: ';
  city.append(cityLabel, user.address.city);

  const postsBtn = document.createElement('button');
  postsBtn.type = 'button';
  postsBtn.className = 'btn btn-secondary';
  postsBtn.textContent = 'Показать публикации';
  postsBtn.addEventListener('click', () => loadPosts(user));

  card.append(name, email, city, postsBtn);
  return card;
}

function renderUsers() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = allUsers.filter((u) => u.name.toLowerCase().includes(query));

  usersList.textContent = '';

  if (allUsers.length === 0) {
    return; // пользователи ещё не загружены
  }
  if (filtered.length === 0) {
    showMessage(statusBox, 'Пользователи не найдены', 'info');
    return;
  }

  clearMessage(statusBox);
  filtered.forEach((user) => usersList.appendChild(createUserCard(user)));
}

searchInput.addEventListener('input', renderUsers);
loadBtn.addEventListener('click', loadUsers);

/* ---------- Публикации пользователя ---------- */

async function loadPosts(user) {
  postsList.textContent = '';
  showMessage(postsStatus, 'Загрузка...', 'loading');

  try {
    const posts = await fetchJson(POSTS_URL + '?userId=' + encodeURIComponent(user.id));
    clearMessage(postsStatus);
    if (usedFallback) {
      showMessage(postsStatus, FALLBACK_NOTICE, 'info');
    }

    if (posts.length === 0) {
      showMessage(postsStatus, 'У пользователя нет публикаций', 'info');
      return;
    }

    const title = document.createElement('p');
    title.className = 'hint';
    title.textContent = 'Публикации пользователя: ' + user.name;
    postsList.appendChild(title);

    posts.slice(0, 3).forEach((post) => {
      const card = document.createElement('article');
      card.className = 'post-card';

      const h = document.createElement('h3');
      h.textContent = post.title;

      const body = document.createElement('p');
      body.textContent = post.body;

      card.append(h, body);
      postsList.appendChild(card);
    });
  } catch (error) {
    showMessage(postsStatus, 'Не удалось загрузить публикации. ' + errorText(error), 'error', () => loadPosts(user));
  }
}
