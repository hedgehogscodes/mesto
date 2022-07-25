export default class Card{
  constructor(cardData,templateSelector, openPopupViewPhoto, currentUserId, deletePhotoCard, addlikefunc, dellikefunc){
    this._cardTitle = cardData.name;
    this._cardLink = cardData.link;
    this._templateSelector = templateSelector;
    this._openPopupViewPhotoFunc = openPopupViewPhoto;
    this.cardId = cardData._id;
    this._cardOwnerId = cardData.owner._id;
    this._currentUserId = currentUserId;
    this._likes = cardData.likes;
    this._deletePhotoCard = deletePhotoCard;
    this._addlikefunc = addlikefunc;
    this._dellikefunc = dellikefunc;
  
  }

  _getTemplate(){
    const template = document.querySelector(this._templateSelector).content.querySelector(".photo-grid__item").cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._isLiked()) {
        this._dellikefunc();
      }
      else {
        this._addlikefunc();
      };
    });

    this._deleteButton.addEventListener('click', this._deletePhotoCard.bind(this));

    this._linkPhotoCard.addEventListener('click',  () => {
      this._openPopupViewPhotoFunc();
    });
  }

  _isLiked() {
    return this._likes.some((item) => {
      return item._id === this._currentUserId
    })
  }

  _renderLikes() {
    if (this._isLiked()) {
      this._likeButton.classList.add('photo-grid__btn_active');
    } else {
      this._likeButton.classList.remove('photo-grid__btn_active');
    };
    this._element.querySelector('.photo-grid__like-amount').textContent = this._likes.length;
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  generateCard(){
    this._element = this._getTemplate();
    this._element.querySelector('.photo-grid__title').textContent = this._cardTitle;
    this._linkPhotoCard = this._element.querySelector('.photo-grid__image');

    this._linkPhotoCard.src = this._cardLink;
    this._linkPhotoCard.alt = 'Фотография:' + this._cardTitle;

    this._deleteButton = this._element.querySelector('.photo-grid__delete-button');
    this._likeButton = this._element.querySelector('.photo-grid__btn_action_like');
    
    this._renderLikes();
    this._setEventListeners();

    if (this._cardOwnerId !== this._currentUserId) {
      this._element.querySelector('.photo-grid__delete-button').remove();
    }

    return this._element;
  }

} 