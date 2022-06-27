const cardList = [
  {
    title: 'Тут я родился',
    link: './images/Image-group/Ej1.jpg',
  },
  {
    title: 'Тут играю',
    link: './images/Image-group/EJ2.jpg',
  },
  {
    title: 'А тут мне 8',
    link: './images/Image-group/Ej3.jpg',
  },
  {
    title: 'А тут я сплю',
    link: './images/Image-group/Ej4.jpg',
  },
  {
    title: 'Тут я еду',
    link: './images/Image-group/Ej5.jpg',
  },
  {
    title: 'А тут я усталь',
    link: './images/Image-group/Ej6.jpg',
  },
];

const classObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const page = document.querySelector('.page');
const profileInfoEditButton = document.querySelector('.profile__btn_action_edit');
const cardAddButton = document.querySelector('.profile__btn_action_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
const photoList = document.querySelector('.photo-grid__list');

///////////////PopopEdit/////////////
const popupEditProfile = document.querySelector('.popup_edit');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__edit-form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_status');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__btn_action_close');
const popupEditSubmit = popupEditProfileForm.querySelector('.popup__btn')
////////////////////////////////////

///////////////PopopAdd/////////////
const popupAddCard = document.querySelector('.popup_add');
const popupAddCardForm = popupAddCard.querySelector('.popup__add-form');
const titleInput = popupAddCard.querySelector('.popup__input_type_title');
const linkInput = popupAddCard.querySelector('.popup__input_type_link');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__btn_action_close');
const popupAddSubmit= popupAddCardForm.querySelector('.popup__btn')
////////////////////////////////////

///////////////PopopShow/////////////
const popupViewPhoto = document.querySelector('.popup_photo-view');
const popupViewImg = popupViewPhoto.querySelector('.popup__img');
const popupImgInfo = popupViewPhoto.querySelector('.popup__img-info');
const popupViewPhotoCloseButton = popupViewPhoto.querySelector('.popup__btn_action_close');
////////////////////////////////////

export {cardList, classObject, page, profileInfoEditButton, cardAddButton, profileName, profileJob, photoList,popupEditProfile, 
        popupEditProfileForm, nameInput, jobInput,popupEditProfileCloseButton,popupEditSubmit,popupAddCard,popupAddCardForm,titleInput,
        linkInput,popupAddCardCloseButton,popupAddSubmit,popupViewPhoto,popupViewImg,popupImgInfo,popupViewPhotoCloseButton};