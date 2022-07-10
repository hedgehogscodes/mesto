import  Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input')) ;
    for(let i = 0; i< this._inputList.length; i++){
      this._inputsValues[i] = this._inputList[i].value;
    }
    return this._inputsValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', this._formSubmit.bind(this));
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}