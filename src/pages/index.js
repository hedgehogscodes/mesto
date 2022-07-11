import './index.css';
import {cardList, classObject, profileInfoEditButton, cardAddButton, photoListSelector,
  popupEditProfileForm, nameInput, jobInput,popupAddCardForm} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

///////////////initialize validatioon for forms////////////////////////////////////
const editFormValidator = new FormValidator(classObject, popupEditProfileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classObject, popupAddCardForm);
addFormValidator.enableValidation();
///////////////////////////////////////////////////////////////////////////////////

///////////////initialize obj for adding///////////////////////////////////////////
const addCardsobj = new Section({ data: []}, photoListSelector);
///////////////////////////////////////////////////////////////////////////////////

///////////////initialize user/////////////////////////////////////////////////////
const userInfo = new UserInfo({ nameSelector: '.profile__name', statusSelector: '.profile__status'});
///////////////////////////////////////////////////////////////////////////////////

///////////////initialize popups///////////////////////////////////////////////////
const popupPhoto = new PopupWithImage('.popup_photo-view');
popupPhoto.setEventListeners();

const popupEdit = new PopupWithForm('.popup_edit', saveProfileInfo);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_add',renderCardInfo);
popupAdd.setEventListeners();
///////////////////////////////////////////////////////////////////////////////////

///////////////initialize card/////////////////////////////////////////////////////
function initializeCard(obj, template, func){
  const cardItem = new Card(obj, template, func);
  return cardItem.generateCard();
}
///////////////////////////////////////////////////////////////////////////////////


function openPopupEditProfile (evt) { 
  editFormValidator.resetErrors();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.status;
  popupEdit.open();
}

function openPopupAddCard (evt) { 
  addFormValidator.resetErrors();
  popupAdd.open();
}

function saveProfileInfo (inputs) {
  userInfo.setUserInfo(inputs.name, inputs.status);
  popupEdit.close();
}

function renderCard(card,container) {
  container.addItem(card);
}  

function renderCardInfo(inputs) {
  const cardItem = initializeCard(inputs, "#card-template", () => {popupPhoto.open(inputs.title, inputs.link);});
  renderCard(cardItem,addCardsobj)
  popupAddCardForm.reset();
  popupAdd.close();
  addFormValidator.inactivateButton();
}

///////////////function for setup cards////////////////////////////////////////////
function setupCards(cards){
  const cardsobj = new Section({
      data: cards, 
      renderer: (card) => {
        const cardItem = initializeCard(card, "#card-template", () => {popupPhoto.open(card.title, card.link);});
        renderCard(cardItem,cardsobj)
      }
    },
    photoListSelector
  );
  cardsobj.renderItems();
}
///////////////////////////////////////////////////////////////////////////////////


setupCards(cardList);


///////////////Add listener for editbutton/////////////////////////////////////////
profileInfoEditButton.addEventListener('click', openPopupEditProfile); 
///////////////////////////////////////////////////////////////////////////////////

///////////////Add listener for addbutton//////////////////////////////////////////
cardAddButton.addEventListener('click', openPopupAddCard); 
///////////////////////////////////////////////////////////////////////////////////

