export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._page = document.querySelector('.page');
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _clickOverlayPopup (evt) {
    if(evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    this._page.classList.add('page_hiddened');
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._page.classList.remove('page_hiddened');
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }


  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__btn_action_close');
    closeButton.addEventListener('click', this.close.bind(this));

    this._popup.addEventListener('mousedown', this._clickOverlayPopup.bind(this));
  }

}