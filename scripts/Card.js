export default class Card{
  constructor(cardData,templateSelector, openPopupViewPhoto){
    this._cardTitle = cardData.title;
    this._cardLink = cardData.link;
    this._templateSelector = templateSelector;
    this._openPopupViewPhotoFunc = openPopupViewPhoto;
  }

  _getTemplate(){
    const template = document.querySelector(this._templateSelector).content.querySelector(".photo-grid__item").cloneNode(true);
    return template;
  }

  _deletePhotoCard (evt) {
    this._element.remove()
  };
  
  _likePhotoCard (evt) {
    this._likeButton.classList.toggle('photo-grid__btn_active');
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._likePhotoCard.bind(this));

    this._deleteButton.addEventListener('click', this._deletePhotoCard.bind(this));

    this._linkPhotoCard.addEventListener('click',  () => {
      this._openPopupViewPhotoFunc(this._cardTitle, this._cardLink);
    });
  }

  generateCard(){
    this._element = this._getTemplate();
    this._element.querySelector('.photo-grid__title').textContent = this._cardTitle;

    this._linkPhotoCard = this._element.querySelector('.photo-grid__image');

    this._linkPhotoCard.src = this._cardLink;
    this._linkPhotoCard.alt = 'Фотография:' + this._cardTitle;

    this._deleteButton = this._element.querySelector('.photo-grid__delete-button');
    this._likeButton = this._element.querySelector('.photo-grid__btn_action_like');

    this._setEventListeners();

    return this._element;
  }

} 