import {cardList, classObject, page, profileInfoEditButton, cardAddButton, profileName, profileJob, photoList,popupEditProfile, 
  popupEditProfileForm, nameInput, jobInput,popupEditProfileCloseButton,popupEditSubmit,popupAddCard,popupAddCardForm,titleInput,
  linkInput,popupAddCardCloseButton,popupAddSubmit,popupViewPhoto,popupViewImg,popupImgInfo,popupViewPhotoCloseButton} from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const editFormValidator = new FormValidator(classObject, popupEditProfileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classObject, popupAddCardForm);
addFormValidator.enableValidation();

function renderHideInputError(popup) {

  const inputsList = popup.querySelectorAll('.popup__input');

  if (inputsList.length !== 0){
    for(let i = 0; i<inputsList.length; i++) {
      if(popup === popupAddCard ){
        addFormValidator.hideInputError(inputsList[i])
      }else{
        editFormValidator.hideInputError(inputsList[i])
      }
    }
  }

}

function addingeventkeydown() {
  document.addEventListener('keydown', keyHandler);
}

function removingeventkeydown() {
  document.removeEventListener('keydown', keyHandler);
}

function getProfileInfo() {
  nameInput.value= profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function togglePopup (popup) { 
  page.classList.toggle('page_hiddened');
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    addingeventkeydown();
  } else {
    removingeventkeydown();
    renderHideInputError(popup); 
  }
}

function closePopupRender (evt) { 
  togglePopup(evt.target.closest('.popup'));
}

function keyHandler (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    togglePopup(popup);
  }
}

function openPopupEditProfile (evt) { 
  togglePopup(popupEditProfile);
    getProfileInfo();
}

function openPopupAddCard (evt) { 
  togglePopup(popupAddCard);
}

function openPopupViewPhoto (name, link) { 
  togglePopup(popupViewPhoto);
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

function renderCardInfo(evt) {
  evt.preventDefault(); 
  const cardItem = new Card({title: titleInput.value, link: linkInput.value }, "#card-template", openPopupViewPhoto);
  renderCard(cardItem.generateCard(), photoList)
  popupAddCardForm.reset();
  togglePopup(popupAddCard);
  addFormValidator.inactivateButton();
}

cardList.forEach((cardData) => {
  const cardItem = new Card(cardData, "#card-template", openPopupViewPhoto);
  renderCard(cardItem.generateCard(), photoList)
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