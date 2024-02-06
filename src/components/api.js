const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    authorization: '34913065-b87c-4a9e-8494-49d33019fe2b',
    'Content-Type': 'application/json'
  }
}

function likeCardFeach(cardId, methodStr) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: methodStr,
      headers: config.headers
    })
  .then(res => findError(res));
}

function cardDelete(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => findError(res));
}

function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => findError(res));
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => findError(res));
}

function profileEditPatch(item) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(item)
  })
  .then(res => findError(res));
}

function findError(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function newPlacePost(item) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(item)
  })
  .then(res => findError(res));
}

function avatarPatch(item) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(item)
  })
  .then(res => findError(res))
}

export {newPlacePost, avatarPatch, profileEditPatch, getCards, getProfileInfo, cardDelete, likeCardFeach }