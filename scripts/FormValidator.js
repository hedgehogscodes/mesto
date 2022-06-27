export default class FormValidator {
  constructor(classObject, formElement){
    this._classObject = classObject;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._classObject.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._classObject.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._classObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classObject.errorClass);
  };
  
  hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._classObject.inputErrorClass);
    errorElement.classList.remove(this._classObject.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  inactivateButton () {
    this._buttonElement.classList.add(this._classObject.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };
  
  activateButton () {
    this._buttonElement.classList.remove(this._classObject.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.inactivateButton();
    } else {
      this.activateButton();
    }
  };

  _setEventListeners(){
    
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation(){
    this._setEventListeners();
  };
}