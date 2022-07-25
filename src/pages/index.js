import './index.css';
import {classObject, profileInfoEditButton, cardAddButton, photoListSelector,
  popupEditProfileForm, nameInput, jobInput,popupAddCardForm,saveEdit,addCardButton,confirmButton,popupEditAvatarForm,editAvatarButton,profileAvatar} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from '../components/PopupConfirm.js';
import Api from "../components/Api.js";

///////////////initialize validatioon for forms////////////////////////////////////
const editFormValidator = new FormValidator(classObject, popupEditProfileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classObject, popupAddCardForm);
addFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(classObject, popupEditAvatarForm);
editAvatarFormValidator.enableValidation();
///////////////////////////////////////////////////////////////////////////////////

///////////////initialize obj for adding///////////////////////////////////////////
const addCardsobj = new Section({ data: []}, photoListSelector);
///////////////////////////////////////////////////////////////////////////////////

///////////////initialize user/////////////////////////////////////////////////////
const userInfo = new UserInfo({ nameSelector: '.profile__name', statusSelector: '.profile__status', avatarSelector: '.profile__avatar'});
///////////////////////////////////////////////////////////////////////////////////


///////////////initialize Api//////////////////////////////////////////////////////
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '52b3031e-4bbf-4230-9679-707716e24a97',
    'Content-Type': 'application/json'
  }
});
///////////////////////////////////////////////////////////////////////////////////

///////////////initialize popups///////////////////////////////////////////////////
const popupPhoto = new PopupWithImage('.popup_photo-view');
popupPhoto.setEventListeners();

const popupEdit = new PopupWithForm('.popup_edit', saveProfileInfo);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_add',renderCardInfo);
popupAdd.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_avatar', saveAvatar);
popupAvatar.setEventListeners();


const popupConfirm = new PopupConfirm('.popup_confirm', deletePhotoCard)
popupConfirm.setEventListeners();

///////////////////////////////////////////////////////////////////////////////////

///////////////initialize card/////////////////////////////////////////////////////
function initializeCard(obj, template, func){
  const cardItem = new Card(obj, template, func, userInfo.id, 
    () => { popupConfirm.open(cardItem);},
    () => {
      api.addLike(obj._id)
        .then((result) => {
          cardItem.updateLikes(result.likes)
        })
        .catch(err => console.log(`Error ${err}`))
    }, 
    () => {
      api.deleteLike(obj._id)
        .then((result) => {
          cardItem.updateLikes(result.likes)
        })
        .catch(err => console.log(`Error ${err}`))
    });
  return cardItem.generateCard();
}
///////////////////////////////////////////////////////////////////////////////////

///////////////function for setup user////////////////////////////////////////////
function setupUser(user) {
  userInfo.setUserInfo(user.name, user.about,user._id,user.avatar);
}
//////////////////////////////////////////////////////////////////////////////////

///////////////function for setup cards////////////////////////////////////////////
function setupCards(cards){
  const cardsobj = new Section({
      data: cards, 
      renderer: (card) => {
        const cardItem = initializeCard(card, "#card-template", () => {popupPhoto.open(card.name, card.link);});
        renderCard(cardItem,cardsobj,true)
      }
    },
    photoListSelector
  );
  cardsobj.renderItems();
}
///////////////////////////////////////////////////////////////////////////////////


///////////////Open popup functions////////////////////////////////////////////////
function openPopupEditProfile(evt) { 
  editFormValidator.resetErrors();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.status;
  popupEdit.open();
}

function openPopupAddCard(evt) { 
  addFormValidator.resetErrors();
  popupAdd.open();
}

function openPopupAvatar() {
  editAvatarFormValidator.resetErrors();
  popupAvatar.open();
}
///////////////////////////////////////////////////////////////////////////////////


function deletePhotoCard(item){
  confirmButton.textContent = 'Удаление...';
  api.deleteCard(item.cardId)
    .then(() => {
      item._element.remove();
      item._element = null;
      confirmButton.textContent = 'Да';
      popupConfirm.close();
    })
    .catch(err => console.log(`Error ${err}`));
}

function saveProfileInfo(inputs) {
  saveEdit.textContent = 'Сохранение...';
  api.saveUserInfo(inputs)
    .then((result) => {
      setupUser(result);
      saveEdit.textContent = 'Сохранить';
      popupEdit.close();
    })
    .catch(err => console.log(`Error ${err}`));
}

function saveAvatar(input){
  editAvatarButton.textContent = 'Сохранение...';
  api.editAvatar(input.link)
    .then((result) => {
      setupUser(result);
      editAvatarButton.textContent = 'Сохранить';
      popupAvatar.close();
    })
    .catch(err => console.log(`Error ${err}`));
}

function renderCard(card,container,startpos) {
  container.addItem(card,startpos);
}  

function renderCardInfo(inputs) {
  addCardButton.textContent = 'Создание...';
  api.addCard(inputs)
    .then((result) => {
      const cardItem = initializeCard(result, "#card-template", () => {popupPhoto.open(result.name, result.link);});
      addCardButton.textContent = 'Создать';
      renderCard(cardItem,addCardsobj,false)
      popupAddCardForm.reset();
      popupAdd.close();
      addFormValidator.inactivateButton();
    })
    .catch(err => console.log(`Error ${err}`));
}


const promises = [api.getUserInfo(), api.getInitialCards()];

Promise.all(promises)
  .then((results) => {
    setupUser(results[0]);
    setupCards(results[1]);
    profileInfoEditButton.addEventListener('click', openPopupEditProfile); 
    cardAddButton.addEventListener('click', openPopupAddCard);
    profileAvatar.addEventListener('click', openPopupAvatar);
  })
  .catch(err => console.log(`Error ${err}`));


