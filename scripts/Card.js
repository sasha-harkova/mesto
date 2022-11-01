const popupImage = document.querySelector(".popup__image");
const popupPlaceName = document.querySelector(".popup__place-name");


export default class Card {
  constructor(photo, caption, templateSelector) {
    this._photo = photo;
    this._caption = caption;
    this._templateSelector = templateSelector;
  }

  createCard() {
    this._contentCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".content__card")
      .cloneNode(true);
    this._setEventListeners()

    this._contentPlaceName = this._contentCard.querySelector(".content__place-name");
    this._contentPhoto = this._contentCard.querySelector(".content__photo");

    this._contentPhoto.src = this._photo;
    this._contentPhoto.alt = `${this._caption}. Иллюстрация.`;
    this._contentPlaceName.textContent = this._caption;

    return this._contentCard;
  };

  _handleLikeIcon() {
  this._likeButton.classList.toggle("content__like_active");
  }

  _handleDeleteCard() {
    this._deleteButton.closest(".content__card").remove();
  }

  _handlePreviewPicture() {
    popupImage.src = this._contentPhoto.src;
    popupImage.alt = this._contentPhoto.alt;
    popupPlaceName.textContent = this._contentPlaceName.textContent;
  }

  _setEventListeners() {
    this._likeButton = this._contentCard.querySelector(".content__like");
    this._deleteButton = this._contentCard.querySelector(".content__delete");
    this._contentPhoto = this._contentCard.querySelector(".content__photo");

    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () => this._handleDeleteCard());
    this._contentPhoto.addEventListener("click", () => this._handlePreviewPicture());
  }
}
