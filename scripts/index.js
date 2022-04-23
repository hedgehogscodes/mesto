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
////////////////////////////////////

///////////////PopopAdd/////////////
const popupAddCard = document.querySelector('.popup_add');
const popupAddCardForm = popupAddCard.querySelector('.popup__add-form');
const titleInput = popupAddCard.querySelector('.popup__input_type_title');
const linkInput = popupAddCard.querySelector('.popup__input_type_link');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__btn_action_close');
////////////////////////////////////

///////////////PopopShow/////////////
const popupViewPhoto = document.querySelector('.popup_photo-view');
const popupViewImg = popupViewPhoto.querySelector('.popup__img');
const popupImgInfo = popupViewPhoto.querySelector('.popup__img-info');
const popupViewPhotoCloseButton = popupViewPhoto.querySelector('.popup__btn_action_close');
////////////////////////////////////

function togglePopup (popup) { 
  page.classList.toggle('page_hiddened');
  popup.classList.toggle('popup_opened');
}

function openPopupEditProfile (evt) { 
  togglePopup(popupEditProfile);
  if(popupEditProfile.classList.contains('popup_opened')){
    nameInput.value= profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

function openPopupAddCard (evt) { 
  togglePopup(popupAddCard);
}

function openPopupViewPhoto (evt) { 
  togglePopup(popupViewPhoto);
  if(popupViewPhoto.classList.contains('popup_opened')){
    popupViewImg.src = evt.target.src;
    popupImgInfo.textContent = evt.target.closest('.photo-grid__item').querySelector('.photo-grid__title').textContent;
    popupViewImg.alt = 'Фотография: ' + popupImgInfo.textContent;
  }
}

function closePopupRender (evt) { 
  togglePopup(evt.target.closest('.popup'));
}

function saveProfileInfo (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupRender(evt);
}

function clickOverlayPopup (evt) {
  if(evt.target === evt.currentTarget) {
    closePopupRender(evt);
  }
}

function deletePhotoCard (evt) {
  evt.target.closest('.photo-grid__item').remove();
};

function LikePhotoCard (evt) {
  evt.target.classList.toggle('photo-grid__btn_active');
};

function renderCard(card, container) {
  container.prepend(card);
}  

function createCard(cardData) {
  const newPhotoCard = photoListTemplate.cloneNode(true);

  const titlePhotoCard = newPhotoCard.querySelector('.photo-grid__title');
  titlePhotoCard.textContent = cardData.title;

  const linkPhotoCard = newPhotoCard.querySelector('.photo-grid__image');
  linkPhotoCard.src = cardData.link;
  linkPhotoCard.alt = 'Фотография:' + cardData.title;

  const deleteButton = newPhotoCard.querySelector('.photo-grid__delete-button');
  deleteButton.addEventListener('click', deletePhotoCard);

  const LikeButton = newPhotoCard.querySelector('.photo-grid__btn_action_like');
  LikeButton.addEventListener('click', LikePhotoCard);

  linkPhotoCard.addEventListener('click', openPopupViewPhoto);

  return newPhotoCard;
}


function renderCardInfo(evt) {
  evt.preventDefault(); 
  renderCard(createCard({title: titleInput.value, link: linkInput.value }), photoList)
  titleInput.value = "";
  linkInput.value = "";
  togglePopup(popupAddCard);
}

cardList.forEach((cardData) => {
  renderCard(createCard(cardData), photoList)
  togglePopup(popupAddCard);
});

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