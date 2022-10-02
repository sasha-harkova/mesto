const popupAll = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupSaveButton = document.querySelector(".popup__save-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const nameInput = document.querySelector(".popup__form-item_el_name");
const jobInput = document.querySelector(".popup__form-item_el_job");
const userName = document.querySelector(".profile__username");
const userDescription = document.querySelector(".profile__user-description");
const sendUpdateProfile = document.querySelector('form[name="edit-profile"]');
const content = document.querySelector(".content");
const sendNewCard = document.querySelector('form[name="add-photo"]');
const placeName = document.querySelector(".popup__form-item_el_place-name");
const linkPhoto = document.querySelector(".popup__form-item_el_link");

//открываем попап
function openPopup(index) {
  popupAll[index].classList.add("popup_opened");
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  placeName.value = "";
  linkPhoto.value = "";
}
profileEditButton.addEventListener("click", () => openPopup(0));
profileAddButton.addEventListener("click", () => openPopup(1));

//закрываем попап по кнопке
function closePopup() {
  popupAll.forEach((item) => item.classList.remove("popup_opened"));
}
popupCloseButtons.forEach((btn) => btn.addEventListener("click", closePopup));

//закрываем попап по заднему фону
function closePopupByClickingOverlay(event) {
  if (event.target == event.currentTarget) {
    closePopup();
  }
}
popupAll.forEach((item) =>
  item.addEventListener("click", closePopupByClickingOverlay)
);

//изменяем профиль
function saveProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closePopup();
}
sendUpdateProfile.addEventListener("submit", saveProfile);


const templateAddPhoto = document.querySelector(".template-add-photo").content;
const contentCard = templateAddPhoto.querySelector(".content__card");
const contentPlaceName = contentCard.querySelector(".content__place-name");
const contentPhoto = contentCard.querySelector(".content__photo");

//добавили карточки из массива
function addCardFromArray() {
  initialCards.forEach((item) => {
    contentPlaceName.textContent = item.name;
    contentPhoto.src = item.link;
    contentPhoto.alt = item.name;

    const copyCard = contentCard.cloneNode(true);

    content.prepend(copyCard);
    return copyCard;
  });
}
addCardFromArray();

//ставим лайки
function addLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("content__like_active");
}

const likeButtons = document.querySelectorAll(".content__like");
likeButtons.forEach((item) => item.addEventListener("click", addLike));

//удаляем карточки
function deleteCard(evt) {
  const eventTarget = evt.target.closest(".content__card");
  eventTarget.remove();
}

const deleteButtons = document.querySelectorAll(".content__delete");
deleteButtons.forEach((item) => item.addEventListener("click", deleteCard));

//открываем карточки в полноэкранном режиме
function openPhoto(evt) {
  const eventTarget = evt.target;

  document.querySelector(".popup__image").src = eventTarget.src;
  document.querySelector(".popup__place-name").textContent = eventTarget.alt;
  openPopup(2);
}

const contentPhotos = document.querySelectorAll(".content__photo");
contentPhotos.forEach((item) => item.addEventListener("click", openPhoto));

//добавляем новые карточки
function addNewCard(evt) {
  evt.preventDefault();

  contentPlaceName.textContent = placeName.value;
  contentPhoto.src = linkPhoto.value;
  contentPhoto.alt = placeName.value;

  const newCard = contentCard.cloneNode(true);

  newCard.querySelector(".content__like").addEventListener("click", addLike);
  newCard.querySelector(".content__delete").addEventListener("click", deleteCard);
  newCard.querySelector(".content__photo").addEventListener("click", openPhoto);

  content.prepend(newCard);
  closePopup();
  return newCard;
}
sendNewCard.addEventListener("submit", addNewCard);
