import  Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupViewImg = this._popup.querySelector('.popup__img');
    this._popupImgInfo = this._popup.querySelector('.popup__img-info');
  }

  open(name, link) {
    this._popupViewImg.src = link;
    this._popupViewImg.alt = 'Фотография: ' + name;
    this._popupImgInfo.textContent = name;

    super.open();
  }
}