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
}

function cardDelete(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

function profileEditPatch(item) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(item)
  })
}

function newPlacePost(item) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(item)
  })
}

function avatarPatch(item) {
  return fetch(`${config.baseUrl}/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(item)
  })
}

export {newPlacePost, avatarPatch, profileEditPatch, getCards, getProfileInfo, cardDelete, likeCardFeach }