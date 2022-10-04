const popupAll = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupForImage = document.querySelector(".popup_for-image");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupSaveButton = document.querySelector(".popup__save-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const nameInput = document.querySelector(".popup__form-item_el_name");
const jobInput = document.querySelector(".popup__form-item_el_job");
const userName = document.querySelector(".profile__username");
const userDescription = document.querySelector(".profile__user-description");
const profileForm = document.querySelector('form[name="edit-profile"]');
const content = document.querySelector(".content");
const newCardForm = document.querySelector('form[name="add-photo"]');
const placeName = document.querySelector(".popup__form-item_el_place-name");
const linkPhoto = document.querySelector(".popup__form-item_el_link");
const templateAddPhoto = document.querySelector(".template-add-photo").content;
// const contentCard = templateAddPhoto.querySelector(".content__card");
// const contentPlaceName = contentCard.querySelector(".content__place-name");
// const contentPhoto = contentCard.querySelector(".content__photo");
const popupImage = document.querySelector(".popup__image");
const popupPlaceName = document.querySelector(".popup__place-name");


function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
}

function openPopupAddCard() {
  openPopup(popupAddCard);
  newCardForm.reset();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function closeEachPopup() {
  popupAll.forEach(item => closePopup(item));
}

function handleClosePopupByClickingOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    closeEachPopup();
  }
}

function handleSaveProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closeEachPopup();
}

function handleAddLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("content__like_active");
}

function handleDeleteCard(evt) {
  const eventTarget = evt.target.closest(".content__card");
  eventTarget.remove();
}

function handleOpenPhoto(evt) {
  const eventTarget = evt.target;

  popupImage.src = eventTarget.src;
  popupPlaceName.textContent = eventTarget.alt.replace(". Иллюстрация.", "");
  openPopup(popupForImage);
}


function createCard(photo, caption) {
  const contentCard = templateAddPhoto.querySelector(".content__card").cloneNode(true);
  const contentPlaceName = contentCard.querySelector(".content__place-name");
  const contentPhoto = contentCard.querySelector(".content__photo");

  contentPhoto.src = photo;
  contentPhoto.alt = caption + ". Иллюстрация.";
  contentPlaceName.textContent = caption;

  contentCard.querySelector(".content__like").addEventListener("click", handleAddLike);
  contentCard.querySelector(".content__delete").addEventListener("click", handleDeleteCard);
  contentCard.querySelector(".content__photo").addEventListener("click", handleOpenPhoto);

  return contentCard;
}

function renderCard(photo, caption) {
  content.prepend(createCard(photo, caption));
}

function addCardFromArray() {
  initialCards.forEach((item) => {
    renderCard(item.link, item.name)
  });
}
addCardFromArray();


function handleAddNewCard(evt) {
  evt.preventDefault();
  renderCard(linkPhoto.value, placeName.value);
  closeEachPopup();
}


profileEditButton.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", openPopupAddCard);
popupCloseButtons.forEach(btn => btn.addEventListener("click", closeEachPopup));
popupAll.forEach(item => item.addEventListener("click", handleClosePopupByClickingOverlay));
profileForm.addEventListener("submit", handleSaveProfile);
newCardForm.addEventListener("submit", handleAddNewCard);
