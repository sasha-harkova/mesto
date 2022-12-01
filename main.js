(()=>{"use strict";function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var e=function(){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=n,this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputList=Array.from(this._formElement.querySelectorAll("".concat(this._inputSelector))),this._buttonElement=this._formElement.querySelector("".concat(this._submitButtonSelector))}var n,r;return n=e,(r=[{key:"_showInputError",value:function(t){t.classList.add("".concat(this._inputErrorClass)),this._errorElement=this._formElement.querySelector("#".concat(t.id,"-error")),this._errorElement.textContent=t.validationMessage,this._errorElement.classList.add("".concat(this._errorClass))}},{key:"_hideInputError",value:function(t){t.classList.remove("".concat(this._inputErrorClass)),this._errorElement=this._formElement.querySelector("#".concat(t.id,"-error")),this._errorElement.textContent="",this._errorElement.classList.remove("".concat(this._errorClass))}},{key:"deactivateButton",value:function(){this._buttonElement.classList.add("".concat(this._inactiveButtonClass)),this._buttonElement.setAttribute("disabled","disabled")}},{key:"_activateButton",value:function(){this._buttonElement.classList.remove("".concat(this._inactiveButtonClass)),this._buttonElement.removeAttribute("disabled","disabled")}},{key:"clearInputError",value:function(){var t=this;this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.deactivateButton():this._activateButton()}},{key:"_setEventListenerToInput",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListenerToInput()}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var r=function(){function t(e,n,r,o,i,a,u){var c=u.handleCardClick;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._photo=e.link,this._caption=e.name,this.id=e._id,this._likesSumFromData=e.likes.length,this._ownerId=e.owner._id,this._likesArr=e.likes,this._templateSelector=n,this._userId=r,this._addLike=o,this._removeLike=i,this._deleteCard=a,this._handleCardClick=c}var e,r;return e=t,(r=[{key:"createCard",value:function(){var t=this;return this._contentCard=document.querySelector(this._templateSelector).content.querySelector(".content__card").cloneNode(!0),this._setEventListeners(),this._contentPlaceName=this._contentCard.querySelector(".content__place-name"),this._contentPhoto=this._contentCard.querySelector(".content__photo"),this._likesSum=this._contentCard.querySelector(".content__like-sum"),this._contentPhoto.src=this._photo,this._contentPhoto.alt="".concat(this._caption,". Иллюстрация."),this._contentPlaceName.textContent=this._caption,this._ownerId===this._userId&&(this._deleteButton.style.display="block"),this._likesArr.forEach((function(e){e._id===t._userId&&t._likeButton.classList.add("content__like_active")})),this._likesSum.textContent=this._likesSumFromData,this._contentCard}},{key:"_handleLikeIcon",value:function(t){var e=this;t.target.classList.contains("content__like_active")?this._removeLike(this.id,(function(){e._likeButton.classList.remove("content__like_active"),e._likesSum.textContent=+e._likesSum.textContent-1})):this._addLike(this.id,(function(){e._likeButton.classList.add("content__like_active"),e._likesSum.textContent=+e._likesSum.textContent+1}))}},{key:"_handleDeleteCard",value:function(){var t=this;this._deleteCard(this.id,(function(){t._contentCard.remove(),t._contentCard=null}))}},{key:"_setEventListeners",value:function(){var t=this;this._likeButton=this._contentCard.querySelector(".content__like"),this._deleteButton=this._contentCard.querySelector(".content__delete"),this._contentPhoto=this._contentCard.querySelector(".content__photo"),this._likeButton.addEventListener("click",(function(e){return t._handleLikeIcon(e)})),this._deleteButton.addEventListener("click",(function(){return t._handleDeleteCard()})),this._contentPhoto.addEventListener("click",(function(){return t._handleCardClick()}))}}])&&n(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){return e._renderer(t)}))}},{key:"addItem",value:function(t){this._container.append(t)}},{key:"addNewItem",value:function(t){this._container.prepend(t)}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_handleClosePopupByClickingOverlay",value:function(t){t.target===t.currentTarget&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._closeButton=this._popup.querySelector(".popup__close-button"),this._closeButton.addEventListener("click",(function(){return t.close()})),this._popup.addEventListener("click",(function(e){return t._handleClosePopupByClickingOverlay(e)}))}}])&&a(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=f(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},l.apply(this,arguments)}function f(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=d(t)););return t}function p(t,e){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},p(t,e)}function h(t,e){if(e&&("object"===c(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function d(t){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},d(t)}var _=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=d(r);if(o){var n=d(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return h(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._photo=e._popup.querySelector(".popup__image"),e._caption=e._popup.querySelector(".popup__place-name"),e}return e=a,(n=[{key:"open",value:function(t){this._photo.src=t.link,this._photo.alt="".concat(t.name,". Иллюстрация."),this._caption.textContent=t.name,l(d(a.prototype),"open",this).call(this)}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=m(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},b.apply(this,arguments)}function m(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=w(t)););return t}function k(t,e){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},k(t,e)}function S(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&k(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=w(r);if(o){var n=w(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return S(this,t)});function a(t,e){var n,r=e.handleFormSubmit;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._handleFormSubmit=r,n._form=n._popup.querySelector(".popup__form"),n._inputs=n._form.querySelectorAll(".popup__input"),n._popupSubmitButton=n._form.querySelector(".popup__save-button"),n._popupSubmitButtonText=n._popupSubmitButton.textContent,n}return e=a,(n=[{key:"_getInputValues",value:function(){var t=this;return this._formValues={},this._inputs.forEach((function(e){t._formValues[e.name]=e.value})),this._formValues}},{key:"close",value:function(){b(w(a.prototype),"close",this).call(this),this._form.reset()}},{key:"renderLoading",value:function(t){this._popupSubmitButton.textContent=t?"Сохранение...":this._popupSubmitButtonText}},{key:"setEventListeners",value:function(){var t=this;b(w(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._handleFormSubmit(t._getInputValues())}))}}])&&v(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=L(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},O.apply(this,arguments)}function L(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=B(t)););return t}function P(t,e){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},P(t,e)}function j(t,e){if(e&&("object"===E(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function B(t){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},B(t)}var I=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&P(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=B(r);if(o){var n=B(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return j(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._form=e._popup.querySelector(".popup__form"),e._popupSubmitButton=e._form.querySelector(".popup__save-button"),e._popupSubmitButtonText=e._popupSubmitButton.textContent,e}return e=a,(n=[{key:"renderLoading",value:function(t){this._popupSubmitButton.textContent=t?"Удаление...":this._popupSubmitButtonText}},{key:"setSubmitAction",value:function(t){this._handleFormSubmit=t}},{key:"setEventListeners",value:function(){var t=this;O(B(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._handleFormSubmit()}))}}])&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);function R(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var T=function(){function t(e){var n=e.usernameSelecor,r=e.aboutSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._username=document.querySelector(n),this._about=document.querySelector(r),this._avatar=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return this._profileData={},this._profileData.username=this._username.textContent,this._profileData.about=this._about.textContent,this._profileData.avatar=this._avatar.src,this._profileData}},{key:"setUserInfo",value:function(t){this._username.textContent=t.name,this._about.textContent=t.about}},{key:"setUserAvatar",value:function(t){this._avatar.src=t.avatar}}])&&R(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),x=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),A=document.querySelector(".profile__avatar-container"),D=document.forms.edit,U=D.elements.username,V=D.elements.about,F=document.forms.addphoto,N=document.forms.editavatar,J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function H(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function M(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var z,$=new(function(){function t(e){var n=e.url,r=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._url=n,this._headers=r}var e,n;return e=t,(n=[{key:"_checkResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(response.status," ").concat(response.statusText))}},{key:"getUserInfoAndAvatar",value:function(){var t=this;return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"setUserInfo",value:function(t){var e=this,n=t.name,r=t.about;return fetch("".concat(this._url,"/users/me"),{headers:this._headers,method:"PATCH",body:JSON.stringify({name:n,about:r})}).then((function(t){return e._checkResponse(t)}))}},{key:"getInitialCards",value:function(){var t=this;return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"addNewCard",value:function(t){var e=this,n=t.name,r=t.link;return fetch("".concat(this._url,"/cards"),{headers:this._headers,method:"POST",body:JSON.stringify({name:n,link:r})}).then((function(t){return e._checkResponse(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this._url,"/cards/").concat(t),{headers:this._headers,method:"DELETE"}).then((function(t){return e._checkResponse(t)}))}},{key:"addLike",value:function(t){var e=this;return fetch("".concat(this._url,"/cards/").concat(t,"/likes"),{headers:this._headers,method:"PUT"}).then((function(t){return e._checkResponse(t)}))}},{key:"deleteLike",value:function(t){var e=this;return fetch("".concat(this._url,"/cards/").concat(t,"/likes"),{headers:this._headers,method:"DELETE"}).then((function(t){return e._checkResponse(t)}))}},{key:"setAvatar",value:function(t){var e=this,n=t.avatar;return fetch("".concat(this._url,"/users/me/avatar"),{headers:this._headers,method:"PATCH",body:JSON.stringify({avatar:n})}).then((function(t){return e._checkResponse(t)}))}}])&&H(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}())({url:"https://mesto.nomoreparties.co/v1/cohort-55",headers:{authorization:"abb2bbf6-61b5-4346-b7aa-47dedd2bc449","Content-Type":"application/json"}});Promise.all([$.getUserInfoAndAvatar(),$.getInitialCards()]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){u=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return M(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];rt.setUserInfo(o),rt.setUserAvatar(o),z=o._id,Y.renderItems(i)})).catch((function(t){return console.log("Ошибка при получении информации с сервера: ".concat(t))}));var G=function(t,e){$.addLike(t).then((function(){return e()})).catch((function(t){return console.log("Ошибка при попытке лайкнуть карточку: ".concat(t))}))},K=function(t,e){$.deleteLike(t).then((function(){return e()})).catch((function(t){return console.log("Ошибка при попытке убрать лайк: ".concat(t))}))},Q=new I(".popup_type_are-you-sure");Q.setEventListeners();var W=function(t,e){Q.open(),Q.setSubmitAction((function(){Q.renderLoading(!0),$.deleteCard(t).then((function(){return e()})).catch((function(t){return console.log("Ошибка при удалении карточки: ".concat(t))})).finally((function(){return Q.renderLoading(!1)})),Q.close()}))};function X(t){return new r(t,".template-add-photo",z,G,K,W,{handleCardClick:function(){nt.open(t)}}).createCard()}var Y=new i({renderer:function(t){var e=X(t);Y.addItem(e)}},".content"),Z=new e(J,F);Z.enableValidation();var tt=new e(J,D);tt.enableValidation();var et=new e(J,N);et.enableValidation();var nt=new _(".popup_type_for-image");nt.setEventListeners();var rt=new T({usernameSelecor:".profile__username",aboutSelector:".profile__user-description",avatarSelector:".profile__avatar"}),ot=new g(".popup_type_edit-profile",{handleFormSubmit:function(t){ot.renderLoading(!0),$.setUserInfo({name:t.username,about:t.about}).then((function(t){return rt.setUserInfo(t)})).catch((function(t){return console.log("Ошибка при изменении информации пользователя: ".concat(t))})).finally((function(){return ot.renderLoading(!1)})),ot.close()}});ot.setEventListeners();var it=new g(".popup_type_edit-avatar",{handleFormSubmit:function(t){it.renderLoading(!0),$.setAvatar({avatar:t.avatarlink}).then((function(t){return rt.setUserAvatar(t)})).catch((function(t){return console.log("Ошибка при изменении аватара пользователя: ".concat(t))})).finally((function(){return it.renderLoading(!1)})),it.close()}});it.setEventListeners();var at=new g(".popup_type_add-card",{handleFormSubmit:function(t){at.renderLoading(!0),$.addNewCard({name:t.cardname,link:t.cardlink}).then((function(t){var e=X(t);Y.addNewItem(e)})).catch((function(t){return console.log("Ошибка при добавлении новой карточки: ".concat(t))})).finally((function(){return at.renderLoading(!1)})),at.close()}});function ut(t,e){t.deactivateButton(),t.clearInputError(),e.open()}at.setEventListeners(),x.addEventListener("click",(function(){ut(tt,ot);var t=rt.getUserInfo();U.value=t.username,V.value=t.about})),A.addEventListener("click",(function(){ut(et,it)})),q.addEventListener("click",(function(){ut(Z,at)}))})();