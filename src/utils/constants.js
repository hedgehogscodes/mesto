import ej1 from '../images/Image-group/Ej1.jpg';
import ej2 from '../images/Image-group/EJ2.jpg';
import ej3 from '../images/Image-group/Ej3.jpg';
import ej4 from '../images/Image-group/Ej4.jpg';
import ej5 from '../images/Image-group/Ej5.jpg';
import ej6 from '../images/Image-group/Ej6.jpg';


const cardList = [
  {
    title: 'Тут я родился',
    link: ej1,
  },
  {
    title: 'Тут играю',
    link: ej2,
  },
  {
    title: 'А тут мне 8',
    link: ej3,
  },
  {
    title: 'А тут я сплю',
    link: ej4,
  },
  {
    title: 'Тут я еду',
    link: ej5,
  },
  {
    title: 'А тут я усталь',
    link: ej6,
  },
];

// const cardList = [
//   {
//     title: 'Тут я родился',
//     link: './images/Image-group/Ej1.jpg',
//   },
//   {
//     title: 'Тут играю',
//     link: './images/Image-group/EJ2.jpg',
//   },
//   {
//     title: 'А тут мне 8',
//     link: './images/Image-group/Ej3.jpg',
//   },
//   {
//     title: 'А тут я сплю',
//     link: './images/Image-group/Ej4.jpg',
//   },
//   {
//     title: 'Тут я еду',
//     link: './images/Image-group/Ej5.jpg',
//   },
//   {
//     title: 'А тут я усталь',
//     link: './images/Image-group/Ej6.jpg',
//   },
// ];

const classObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const profileInfoEditButton = document.querySelector('.profile__btn_action_edit');
const cardAddButton = document.querySelector('.profile__btn_action_add');
const photoListSelector = '.photo-grid__list';

///////////////PopopEdit/////////////
const popupEditProfile = document.querySelector('.popup_edit');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__edit-form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_status');
////////////////////////////////////

///////////////PopopAdd/////////////
const popupAddCard = document.querySelector('.popup_add');
const popupAddCardForm = popupAddCard.querySelector('.popup__add-form');
////////////////////////////////////

export {cardList, classObject, profileInfoEditButton, cardAddButton, photoListSelector,
        popupEditProfileForm, nameInput, jobInput,popupAddCardForm};