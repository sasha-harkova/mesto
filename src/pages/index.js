import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButton,
  cardAddButton,
  popupEditAvatarButton,
  profileForm,
  nameInput,
  aboutInput,
  newCardForm,
  newAvatarForm,
  avatarInput,
  objForValidation,
} from "../utils/constans.js"

import Api from "../components/Api.js"

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'abb2bbf6-61b5-4346-b7aa-47dedd2bc449',
    'Content-Type': 'application/json'
  }
});

//------------ФУНКЦИЯ ЗАГРУЗКИ ОТВЕТА ОТ СЕРВЕРА------------//

function renderLoading(isLoading, popup) {
  const popupSaveButton = popup._form.querySelector('.popup__save-button');
  if(isLoading) {
    popupSaveButton.textContent = 'Сохранение...'
  } else {
    popupSaveButton.textContent = 'Сохранить'
  }
}

//------------ПОЛУЧЕНИЕ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ С СЕРВЕРА------------//

let userId;

Promise.all([api.getUserInfoAndAvatar, api.getInitialCards])
.then(() => {
  api.getUserInfoAndAvatar()
    .then((user) => {
      userInfo.setUserInfo(user);
      userInfo.setUserAvatar(user);
      userId = user._id;
    })
    .catch((error) => console.log(`Ошибка при получении информации пользователя с сервера: ${error}`));
});


//------------УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ------------//

const addLike = (id) => api.addLike(id);
const removeLike = (id) => api.deleteLike(id);

let deleteCardFromServer;

const popupAreYouSure = new PopupWithForm(".popup_type_are-you-sure", { handleFormSubmit: () => deleteCardFromServer() });
popupAreYouSure.setEventListeners();

const deleteCard = (id, deleteElement) => {
  popupAreYouSure.open();
  deleteCardFromServer = () => {
    renderLoading(true, popupAreYouSure);
    api.deleteCard(id)
      .then(() => deleteElement())
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`))
      .finally(() => renderLoading(false, popupAreYouSure))
  };
};

function createCard(data) {
  const card = new Card(data, ".template-add-photo", userId, addLike, removeLike, deleteCard, { handleCardClick: () => {
    popupWithImage.open(data);
  } });
  const cardElement = card.createCard();
  return cardElement;
}


//------------ДОБАВЛЕНИЕ КАРТОЧЕК ИЗ МАССИВА------------//

const cardsContainer = new Section({
  renderer: (card) => {
    const cardElement = createCard(card);
    cardsContainer.addItem(cardElement);
  }
}, '.content')

api.getInitialCards()
  .then((cards) => {
    cardsContainer.renderItems(cards);
  })
  .catch((error) => console.log(`Ошибка при добавлении карточек с сервера: ${error}`));


//------------ВАЛИДАЦИЯ ФОРМ------------//

const validationNewCardForm = new FormValidator(objForValidation, newCardForm);
validationNewCardForm.enableValidation();

const validationProfileForm = new FormValidator(objForValidation, profileForm);
validationProfileForm.enableValidation();

const validationNewAvatarForm = new FormValidator(objForValidation, newAvatarForm);
validationNewAvatarForm.enableValidation();


//------------ПОПАП С ЗУМОМ ИЗОБРАЖЕНИЯ------------//

const popupWithImage = new PopupWithImage('.popup_type_for-image');
popupWithImage.setEventListeners();


//------------ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ------------//

const userInfo = new UserInfo({usernameSelecor: ".profile__username", aboutSelector: ".profile__user-description", avatarSelector: ".profile__avatar"});

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", { handleFormSubmit: () => {
  renderLoading(true, popupEditProfile);
  api.setUserInfo({ name: nameInput.value, about: aboutInput.value })
    .then((user) => userInfo.setUserInfo(user))
    .catch((error) => console.log(`Ошибка при изменении информации пользователя: ${error}`))
    .finally(() => renderLoading(false, popupEditProfile))
} });
popupEditProfile.setEventListeners();


//------------ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА------------//

const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", { handleFormSubmit: () => {
  renderLoading(true, popupEditAvatar);
  api.setAvatar( { avatar: avatarInput.value } )
    .then((user) => userInfo.setUserAvatar(user))
    .catch((error) => console.log(`Ошибка при изменении аватара пользователя: ${error}`))
    .finally(() => renderLoading(false, popupEditAvatar))
} });
popupEditAvatar.setEventListeners();


//------------ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ------------//

const popupAddCard = new PopupWithForm(".popup_type_add-card", { handleFormSubmit: (formData) => {
  renderLoading(true, popupAddCard);
  api.addNewCard({ name: formData.cardname, link: formData.cardlink })
  .then((card) => {
    const cardElement = createCard(card);
    cardsContainer.addNewItem(cardElement);
  })
  .catch((error) => console.log(`Ошибка при добавлении новой карточки: ${error}`))
  .finally(() => renderLoading(false, popupAddCard))
} });
popupAddCard.setEventListeners();


//------------УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ПОПАПОВ С ФОРМАМИ------------//

function openPopupWithForm(validationForm, popup) {
  validationForm.deactivateButton();
  validationForm.clearInputError();
  popup.open();
}

//------------СЛУШАТЕЛИ ПОПАПОВ------------//

profileEditButton.addEventListener("click", () => {
  openPopupWithForm(validationProfileForm, popupEditProfile);
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.username;
  aboutInput.value = profileData.about;
});
popupEditAvatarButton.addEventListener("click", () => {
  openPopupWithForm(validationNewAvatarForm, popupEditAvatar);
});
cardAddButton.addEventListener("click", () => {
  openPopupWithForm(validationNewCardForm, popupAddCard);
});
