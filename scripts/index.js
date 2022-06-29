import {cardList, classObject, page, profileInfoEditButton, cardAddButton, profileName, profileJob, photoList,popupEditProfile, 
  popupEditProfileForm, nameInput, jobInput,popupEditProfileCloseButton,popupAddCard,popupAddCardForm,titleInput,
  linkInput,popupAddCardCloseButton,popupViewPhoto,popupViewImg,popupImgInfo,popupViewPhotoCloseButton} from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const editFormValidator = new FormValidator(classObject, popupEditProfileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classObject, popupAddCardForm);
addFormValidator.enableValidation();

function renderHideInputError(popup) {
  if(popup === popupAddCard ){
    addFormValidator.resetErrors();
  }else{
    editFormValidator.resetErrors();
  }
}

function addingeventkeydown() {
  document.addEventListener('keydown', handleKey);
}

function removingeventkeydown() {
  document.removeEventListener('keydown', handleKey);
}

function getProfileInfo() {
  nameInput.value= profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopup(popup){
  page.classList.add('page_hiddened');
  popup.classList.add('popup_opened');
  addingeventkeydown();
}

function closePopup(popup){
  page.classList.remove('page_hiddened');
  popup.classList.remove('popup_opened');
  removingeventkeydown();
}

function closePopupRender (evt) { 
  closePopup(evt.target.closest('.popup'));
}

function handleKey (evt) { 
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopupEditProfile (evt) { 
  renderHideInputError(popupEditProfile); 
  openPopup(popupEditProfile);
  getProfileInfo();
}

function openPopupAddCard (evt) { 
  renderHideInputError(popupAddCard); 
  openPopup(popupAddCard);
}

function openPopupViewPhoto (name, link) { 
  openPopup(popupViewPhoto);
  popupViewImg.src = link;
  popupImgInfo.textContent = name;
  popupViewImg.alt = 'Фотография: ' + name;
}

function clickOverlayPopup (evt) {
  if(evt.target === evt.currentTarget) {
    closePopupRender(evt);
  }
}

function saveProfileInfo (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupRender(evt);
}

function renderCard(card, container) {
  container.prepend(card);
}  

function initializeCard(obj, template, func){
  const cardItem = new Card(obj, template, func);
  return cardItem;
}

function renderCardInfo(evt) {
  evt.preventDefault(); 
  renderCard(initializeCard({title: titleInput.value, link: linkInput.value }, "#card-template", openPopupViewPhoto).generateCard(), photoList)
  popupAddCardForm.reset();
  closePopup(popupAddCard);
  addFormValidator.inactivateButton();
}

cardList.forEach((cardData) => {
  renderCard(initializeCard(cardData, "#card-template", openPopupViewPhoto).generateCard(), photoList)
});

getProfileInfo();


///////////////PopopEditListeners/////////////
profileInfoEditButton.addEventListener('click', openPopupEditProfile); 
popupEditProfileCloseButton.addEventListener('click', closePopupRender); 
popupEditProfileForm.addEventListener('submit', saveProfileInfo); 
popupEditProfile.addEventListener('click', clickOverlayPopup); 
/////////////////////////////////////////////

///////////////PopopAddListeners/////////////
cardAddButton.addEventListener('click', openPopupAddCard); 
popupAddCardCloseButton.addEventListener('click', closePopupRender);
popupAddCardForm.addEventListener('submit', renderCardInfo); 
popupAddCard.addEventListener('click', clickOverlayPopup); 
/////////////////////////////////////////////

///////////////PopopShowListeners/////////////
popupViewPhotoCloseButton.addEventListener('click', closePopupRender); 
popupViewPhoto.addEventListener('click', clickOverlayPopup); 
/////////////////////////////////////////////