function renderHideInputError(popup) {
  const inputsList = popup.querySelectorAll('.popup__input');
  if (inputsList.length !== 0){
    for(let i = 0; i<inputsList.length; i++) {
      hideInputError(popup.querySelector('.popup__form'), inputsList[i], classObject);
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
    renderHideInputError(popup);// внутри функции проверяется есть ли у попапа инпуты 
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
    toggleButtonState(Array.from(popupEditProfileForm.querySelectorAll('.popup__input')), popupEditSubmit, classObject);
}

function openPopupAddCard (evt) { 
  togglePopup(popupAddCard);
}

function openPopupViewPhoto (evt) { 
  togglePopup(popupViewPhoto);
    popupViewImg.src = evt.target.src;
    popupImgInfo.textContent = evt.target.closest('.photo-grid__item').querySelector('.photo-grid__title').textContent;
    popupViewImg.alt = 'Фотография: ' + popupImgInfo.textContent;
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
  inactivateButton(popupAddSubmit, classObject);
}

cardList.forEach((cardData) => {
  renderCard(createCard(cardData), photoList)
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