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

const page = document.querySelector('.page');
const profileInfoEditButton = document.querySelector('.profile__btn_action_edit');
const cardAddButton = document.querySelector('.profile__btn_action_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
const photoList = document.querySelector('.photo-grid__list');
const photoListTemplate = document.querySelector("#card-template").content.querySelector(".photo-grid__item");

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

function renderHideInputError(popup) {
  if (popup !== popupViewPhoto){
    hideInputError(popup.querySelector('.popup__form'), popup.querySelectorAll('.popup__input')[0], classObject);
    hideInputError(popup.querySelector('.popup__form'), popup.querySelectorAll('.popup__input')[1], classObject);
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
}


function closePopupRender (evt) { 
  togglePopup(evt.target.closest('.popup'));
  removingeventkeydown();
}

function keyHandler (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    togglePopup(popup);
    renderHideInputError(popup);
    removingeventkeydown();
  }
}

function openPopupEditProfile (evt) { 
  addingeventkeydown();
  togglePopup(popupEditProfile);
  if(popupEditProfile.classList.contains('popup_opened')){
    getProfileInfo();
    toggleButtonState(Array.from(popupEditProfileForm.querySelectorAll('.popup__input')), popupEditSubmit, classObject);
  }
}

function openPopupAddCard (evt) { 
  addingeventkeydown();
  togglePopup(popupAddCard);
}

function openPopupViewPhoto (evt) { 
  addingeventkeydown();
  togglePopup(popupViewPhoto);
  if(popupViewPhoto.classList.contains('popup_opened')){
    popupViewImg.src = evt.target.src;
    popupImgInfo.textContent = evt.target.closest('.photo-grid__item').querySelector('.photo-grid__title').textContent;
    popupViewImg.alt = 'Фотография: ' + popupImgInfo.textContent;
  }
}

function clickOverlayPopup (evt) {
  if(evt.target === evt.currentTarget) {
    closePopupRender(evt);
    renderHideInputError(evt.target);
  }
}

function saveProfileInfo (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupRender(evt);
}

function deletePhotoCard (evt) {
  evt.target.closest('.photo-grid__item').remove();
};

function likePhotoCard (evt) {
  evt.target.classList.toggle('photo-grid__btn_active');
};

function createCard(cardData) {
  const newPhotoCard = photoListTemplate.cloneNode(true);

  const titlePhotoCard = newPhotoCard.querySelector('.photo-grid__title');
  titlePhotoCard.textContent = cardData.title;

  const linkPhotoCard = newPhotoCard.querySelector('.photo-grid__image');
  linkPhotoCard.src = cardData.link;
  linkPhotoCard.alt = 'Фотография:' + cardData.title;

  const deleteButton = newPhotoCard.querySelector('.photo-grid__delete-button');
  deleteButton.addEventListener('click', deletePhotoCard);

  const likeButton = newPhotoCard.querySelector('.photo-grid__btn_action_like');
  likeButton.addEventListener('click', likePhotoCard);

  linkPhotoCard.addEventListener('click', openPopupViewPhoto);

  return newPhotoCard;
}

function renderCard(card, container) {
  container.prepend(card);
}  

function renderCardInfo(evt) {
  evt.preventDefault(); 
  renderCard(createCard({title: titleInput.value, link: linkInput.value }), photoList)
  popupAddCardForm.reset();
  togglePopup(popupAddCard);
  removingeventkeydown();
  inactivateButton(popupAddSubmit, classObject);
}

cardList.forEach((cardData) => {
  renderCard(createCard(cardData), photoList)
});

getProfileInfo();

///////////////PopopEditListeners/////////////
profileInfoEditButton.addEventListener('click', openPopupEditProfile); 

popupEditProfileCloseButton.addEventListener('click', function (evt) {
  closePopupRender(evt);
  renderHideInputError(popupEditProfile);
}); 

popupEditProfileForm.addEventListener('submit', saveProfileInfo); 
popupEditProfile.addEventListener('click', clickOverlayPopup); 
/////////////////////////////////////////////

///////////////PopopAddListeners/////////////
cardAddButton.addEventListener('click', openPopupAddCard); 

popupAddCardCloseButton.addEventListener('click', function (evt) {
  closePopupRender(evt);
  renderHideInputError(popupAddCard);
});

popupAddCardForm.addEventListener('submit', renderCardInfo); 
popupAddCard.addEventListener('click', clickOverlayPopup); 
/////////////////////////////////////////////

///////////////PopopShowListeners/////////////
popupViewPhotoCloseButton.addEventListener('click', closePopupRender); 
popupViewPhoto.addEventListener('click', clickOverlayPopup); 
/////////////////////////////////////////////