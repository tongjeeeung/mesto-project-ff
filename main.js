(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"34913065-b87c-4a9e-8494-49d33019fe2b","Content-Type":"application/json"}};function t(t,r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:r,headers:e.headers}).then((function(e){return n(e)}))}function n(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function r(e,t,n,r,o,c){var u=c.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__delete-button"),a=u.querySelector(".card__image"),l=u.querySelector(".card__like-button"),s=u.querySelector(".card__like-counter");return e.owner._id!==r._id&&u.removeChild(i),e.likes.find((function(e){return e._id===r._id}))&&l.classList.add("card__like-button_is-active"),a.src=e.link,a.alt=e.name,s.textContent=e.likes.length,u.querySelector(".card__title").textContent=e.name,i.addEventListener("click",(function(){return t(u,e._id)})),a.addEventListener("click",(function(){return o(a)})),l.addEventListener("click",(function(){return n(l,e,s)})),u}function o(t,r){(function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return n(e)}))})(r).then((function(e){t.remove()})).catch((function(e){console.log(e)}))}function c(e,n,r){e.classList.contains("card__like-button_is-active")?t(n._id,"DELETE").then((function(t){r.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)})):t(n._id,"PUT").then((function(t){r.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function l(e,t,n,r){var o=e.querySelector(".".concat(t.classList[1],"-error"));t.classList.add(r.inputErrorClass),o.textContent=n}function s(e,t,n){var r=e.querySelector(".".concat(t.classList[1],"-error"));t.classList.remove(n.inputErrorClass),r.textContent=""}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.removeAttribute("disabled",!1),t.classList.remove(n.inactiveButtonClass)):(t.setAttribute("disabled",!0),t.classList.add(n.inactiveButtonClass))}function p(e,t,n){var r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(n){s(e,n,t)})),d(r,n,t)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector(".places__list"),m=document.querySelector("#card-template").content,y=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_avatar_edit"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__image"),g=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),C=document.querySelector(".popup_type_image"),L=document.querySelector(".popup__image"),k=document.querySelector(".popup__caption"),x=document.querySelectorAll(".popup__close"),A=document.querySelector(".popup__form"),w=document.getElementsByName("new-place")[0],U=h.querySelector(".popup__form"),B=U.querySelector(".popup__input_type_url"),j=w.querySelector(".popup__input_type_card-name"),O=w.querySelector(".popup__input_type_url"),T=A.querySelector(".popup__input_type_name"),P=A.querySelector(".popup__input_type_description"),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function I(e){L.src=e.src,L.alt=e.alt,k.textContent=e.alt,u(C)}function N(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";e.textContent=t}S.addEventListener("click",(function(e){T.value=g.textContent,P.value=E.textContent,p(y.querySelector(D.formSelector),D,y.querySelector(D.submitButtonSelector)),u(y)})),b.addEventListener("click",(function(){j.value="",O.value="",p(v.querySelector(D.formSelector),D,v.querySelector(D.submitButtonSelector)),u(v)})),q.addEventListener("click",(function(){B.value="",p(h.querySelector(D.formSelector),D,h.querySelector(D.submitButtonSelector)),u(h)})),x.forEach((function(e){e.addEventListener("click",(function(e){i(e.target.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){t.target===e&&i(t.target)}))})),A.addEventListener("submit",(function(t){t.preventDefault();var r,o=t.submitter.textContent;N(t.submitter),(r={name:T.value,about:P.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return n(e)}))).then((function(e){E.textContent=e.about,g.textContent=e.name,i(y)})).catch((function(e){console.log(e)})).finally((function(){N(t.submitter,o)}))})),w.addEventListener("submit",(function(t){t.preventDefault();var u,a=t.submitter.textContent;N(t.submitter),(u={name:j.value,link:O.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(u)}).then((function(e){return n(e)}))).then((function(e){var t=r(e,o,c,e.owner,I,m);_.prepend(t),i(v),j.value="",O.value=""})).catch((function(e){console.log(e)})).finally((function(){N(t.submitter,a)}))})),U.addEventListener("submit",(function(t){t.preventDefault();var r,o=t.submitter.textContent;N(t.submitter),(r={avatar:B.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return n(e)}))).then((function(e){q.style.backgroundImage="url('".concat(e.avatar,"')"),i(h),B.value=""})).catch((function(e){console.log(e)})).finally((function(){N(t.submitter,o)}))})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?s(e,t,n):t.validity.patternMismatch?l(e,t,t.dataset.errorMessage,n):l(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(t,e)}))}(D),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return n(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return n(e)}))]).then((function(e){var t,n,u=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=u[0],a=u[1];g.textContent=i.name,E.textContent=i.about,q.style.backgroundImage="url('".concat(i.avatar,"')"),a.forEach((function(e){var t=r(e,o,c,i,I,m);_.append(t)}))})).catch((function(e){console.log(e)}))})();