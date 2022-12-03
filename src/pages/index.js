import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupOfConfirmation from "../components/PopupOfConfirmation.js";
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
  objForValidation
} from "../utils/constans.js"

import Api from "../components/Api.js"

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'abb2bbf6-61b5-4346-b7aa-47dedd2bc449',
    'Content-Type': 'application/json'
  }
});

//------------ПОЛУЧЕНИЕ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ И КАРТОЧЕК С СЕРВЕРА   ------------//

let userId;

Promise.all([api.getUserInfoAndAvatar(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    userId = user._id;
    cardsContainer.renderItems(cards);
  })
  .catch((error) => console.log(`Ошибка при получении информации с сервера: ${error}`))


//------------УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ------------//

const addLike = (id, likeElement) => {
  api.addLike(id)
    .then(() => likeElement())
    .catch((error) => console.log(`Ошибка при попытке лайкнуть карточку: ${error}`))
}

const removeLike = (id, deleteLike) => {
  api.deleteLike(id)
    .then(() => deleteLike())
    .catch((error) => console.log(`Ошибка при попытке убрать лайк: ${error}`))
}

const popupOfDeletion = new PopupOfConfirmation(".popup_type_are-you-sure");
popupOfDeletion.setEventListeners();

const deleteCard = (id, deleteElement) => {
  popupOfDeletion.open();
  popupOfDeletion.setSubmitAction(() => {
    popupOfDeletion.renderLoading(true);
    api.deleteCard(id)
      .then(() => {
        deleteElement();
        popupOfDeletion.close();
      })
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`))
      .finally(() => popupOfDeletion.renderLoading(false));
  });
};

function createCard(data) {
  const card = new Card(data, ".template-add-photo", userId, addLike, removeLike, deleteCard, { handleCardClick: () => {
    popupWithImage.open(data);
  } });
  const cardElement = card.createCard();
  return cardElement;
}

const cardsContainer = new Section({
  renderer: (card) => {
    const cardElement = createCard(card);
    cardsContainer.addItem(cardElement);
  }
}, '.content')


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

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", { handleFormSubmit: (formData) => {
  popupEditProfile.renderLoading(true);
  api.setUserInfo({ name: formData.username, about: formData.about })
    .then((user) => {
      userInfo.setUserInfo(user);
      popupEditProfile.close();
    })
    .catch((error) => console.log(`Ошибка при изменении информации пользователя: ${error}`))
    .finally(() => popupEditProfile.renderLoading(false))
} });
popupEditProfile.setEventListeners();


//------------ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА------------//

const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", { handleFormSubmit: (formData) => {
  popupEditAvatar.renderLoading(true);
  api.setAvatar( { avatar: formData.avatarlink } )
    .then((user) => {
      userInfo.setUserAvatar(user);
      popupEditAvatar.close();
    })
    .catch((error) => console.log(`Ошибка при изменении аватара пользователя: ${error}`))
    .finally(() => popupEditAvatar.renderLoading(false))
} });
popupEditAvatar.setEventListeners();


//------------ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ------------//

const popupAddCard = new PopupWithForm(".popup_type_add-card", { handleFormSubmit: (formData) => {
  popupAddCard.renderLoading(true);
  api.addNewCard({ name: formData.cardname, link: formData.cardlink })
    .then((card) => {
      const cardElement = createCard(card);
      cardsContainer.addNewItem(cardElement);
      popupAddCard.close();
    })
    .catch((error) => console.log(`Ошибка при добавлении новой карточки: ${error}`))
    .finally(() => popupAddCard.renderLoading(false))
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
