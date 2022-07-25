const classObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const profileAvatar = document.querySelector('.profile__avatar');
const profileInfoEditButton = document.querySelector('.profile__btn_action_edit');
const cardAddButton = document.querySelector('.profile__btn_action_add');
const photoListSelector = '.photo-grid__list';

///////////////PopopEdit/////////////
const popupEditProfile = document.querySelector('.popup_edit');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__edit-form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_status');
const saveEdit = popupEditProfile.querySelector('.popup__btn_action_save');
////////////////////////////////////

///////////////PopopAdd/////////////
const popupAddCard = document.querySelector('.popup_add');
const popupAddCardForm = popupAddCard.querySelector('.popup__add-form');
const addCardButton = popupAddCardForm.querySelector('.popup__btn_action_create');
////////////////////////////////////

///////////////PopopConfirm////////
const popupConfirm = document.querySelector('.popup_confirm');
const confirmButton = popupConfirm.querySelector('.popup__btn_action_confirm');
////////////////////////////////////


///////////////PopopEditAvatar////////
const popupEditAvatar = document.querySelector('.popup_avatar');
const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__avatar-from');
const editAvatarButton = popupEditAvatarForm.querySelector('.popup__btn_action_save');
////////////////////////////////////

export { classObject, profileInfoEditButton, cardAddButton, photoListSelector,
        popupEditProfileForm, nameInput, jobInput,popupAddCardForm,saveEdit,addCardButton,confirmButton,popupEditAvatarForm,editAvatarButton,profileAvatar};