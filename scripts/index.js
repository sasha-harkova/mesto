const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupForImage = document.querySelector(".popup_for-image");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupSaveButton = document.querySelector(".popup__save-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const profileForm = document.forms.edit;
const nameInput = profileForm.elements.username;
const jobInput = profileForm.elements.about;
const userName = document.querySelector(".profile__username");
const userDescription = document.querySelector(".profile__user-description");
const content = document.querySelector(".content");
const newCardForm = document.forms.addphoto;
const placeName = newCardForm.elements.cardname;
const linkPhoto = newCardForm.elements.cardlink;
const templateAddPhoto = document.querySelector(".template-add-photo").content;
const popupImage = document.querySelector(".popup__image");
const popupPlaceName = document.querySelector(".popup__place-name");


function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByClickingEscape);
};

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  clearInputError(popupEditProfile);
};

function openPopupAddCard() {
  openPopup(popupAddCard);
  newCardForm.reset();
  clearInputError(popupAddCard);
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByClickingEscape);
};

function closeEachPopup() {
  popups.forEach(item => closePopup(item));
};

function handleClosePopupByClickingOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    closeEachPopup();
  }
};

function handleSaveProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closeEachPopup();
  handleDeactivateButtonAtForm(evt);
};

function setEventListenersToCard(evt) {
  const eventTarget = evt.target;
    if (eventTarget.classList.contains("content__like")) {
      eventTarget.classList.toggle("content__like_active");
    };
    if (eventTarget.classList.contains("content__delete")) {
      eventTarget.closest(".content__card").remove();
    };
    if (eventTarget.classList.contains("content__photo")) {
      popupImage.src = eventTarget.src;
      popupPlaceName.textContent = eventTarget.alt.replace(". Иллюстрация.", "");
      openPopup(popupForImage);
    };
};

function createCard(photo, caption) {
  const contentCard = templateAddPhoto.querySelector(".content__card").cloneNode(true);
  const contentPlaceName = contentCard.querySelector(".content__place-name");
  const contentPhoto = contentCard.querySelector(".content__photo");

  contentPhoto.src = photo;
  contentPhoto.alt = caption + ". Иллюстрация.";
  contentPlaceName.textContent = caption;

  contentCard.addEventListener("click", setEventListenersToCard);

  return contentCard;
};

function renderCard(photo, caption) {
  content.prepend(createCard(photo, caption));
};

function addCardFromArray() {
  initialCards.forEach((item) => {
    renderCard(item.link, item.name)
  });
};
addCardFromArray();


function handleAddNewCard(evt) {
  evt.preventDefault();
  renderCard(linkPhoto.value, placeName.value);
  closeEachPopup();
  handleDeactivateButtonAtForm(evt);
};

profileEditButton.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", openPopupAddCard);
popupCloseButtons.forEach(btn => btn.addEventListener("click", closeEachPopup));
popups.forEach(item => item.addEventListener("click", handleClosePopupByClickingOverlay));
profileForm.addEventListener("submit", handleSaveProfile);
newCardForm.addEventListener("submit", handleAddNewCard);


function deactivateButton(buttonElement) {
  buttonElement.classList.add("popup__save-button_disabled");
};

function handleDeactivateButtonAtForm(evt) {
  const buttonElement = evt.target.querySelector(".popup__save-button");
  deactivateButton(buttonElement);
};

function closePopupByClickingEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};
