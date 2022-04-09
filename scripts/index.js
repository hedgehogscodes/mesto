const profileInfoEditButton = document.querySelector('.profile__btn_action_edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
const popup = document.querySelector('.popup');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_status');
const profileInfoSaveButton = popup.querySelector('.popup__btn_action_save');
const popupCloseButton = popup.querySelector('.popup__btn_action_close');

function popupEditOpenClose (evt) {
    evt.preventDefault(); 
    popup.classList.toggle('popup_opened');
    if(popup.classList.contains('popup_opened')){
      nameInput.value= profileName.textContent;
      jobInput.value = profileJob.textContent;
    }
}

function popupSaveEdit (evt) {
  evt.preventDefault(); 
  popup.classList.toggle('popup_opened');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function popupOverlayClick (evt) {
  evt.preventDefault(); 
  if(evt.target === evt.currentTarget) {
    popupEditOpenClose(evt);
  }
}


profileInfoEditButton.addEventListener('click', popupEditOpenClose); 
popupCloseButton.addEventListener('click', popupEditOpenClose); 
profileInfoSaveButton.addEventListener('click', popupSaveEdit); 
popup.addEventListener('click', popupOverlayClick); 