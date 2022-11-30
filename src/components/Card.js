export default class Card {
  constructor(data, templateSelector, userId, addLike, removeLike, deleteCard, { handleCardClick }) {
    this._photo = data.link;
    this._caption = data.name;
    this.id = data._id;
    this._likesSumFromData = data.likes.length;
    this._ownerId = data.owner._id;
    this._likesArr = data.likes;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._deleteCard = deleteCard;
    this._handleCardClick = handleCardClick;
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
    this._likesSum = this._contentCard.querySelector('.content__like-sum');

    this._contentPhoto.src = this._photo;
    this._contentPhoto.alt = `${this._caption}. Иллюстрация.`;
    this._contentPlaceName.textContent = this._caption;



    if(this._ownerId === this._userId) {
      this._deleteButton.style.display = 'block';
    }

    this._likesArr.forEach((element) => {
      if(element._id === this._userId) {
        this._likeButton.classList.add("content__like_active");
      }
    });


    this._likesSum.textContent = this._likesSumFromData;

    return this._contentCard;
  };


  _handleLikeIcon(evt) {
    if (evt.target.classList.contains('content__like_active')) {
      this._removeLike(this.id).then(() => {
        this._likeButton.classList.remove("content__like_active");
        this._likesSum.textContent = +this._likesSum.textContent - 1;
      });
    } else this._addLike(this.id).then(() => {
      this._likeButton.classList.add("content__like_active");
      this._likesSum.textContent = +this._likesSum.textContent + 1;
    });
  }


  _handleDeleteCard() {
    this._deleteCard(this.id, () => {
      this._contentCard.remove();
      this._contentCard = null;
    });
  }

  _setEventListeners() {
    this._likeButton = this._contentCard.querySelector(".content__like");
    this._deleteButton = this._contentCard.querySelector(".content__delete");
    this._contentPhoto = this._contentCard.querySelector(".content__photo");

    this._likeButton.addEventListener("click", (evt) => this._handleLikeIcon(evt));
    this._deleteButton.addEventListener("click", () => this._handleDeleteCard())
    this._contentPhoto.addEventListener("click", () => this._handleCardClick());
  }
}

