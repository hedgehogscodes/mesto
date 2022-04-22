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
const popupEdit = document.querySelector('.popup_edit');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_status');
const profileInfoSaveButton = popupEdit.querySelector('.popup__btn_action_save');
const popupCloseButton = popupEdit.querySelector('.popup__btn_action_close');
////////////////////////////////////

///////////////PopopAdd/////////////
const popupAdd = document.querySelector('.popup_add');
const titleInput = popupAdd.querySelector('.popup__input_type_title');
const linkInput = popupAdd.querySelector('.popup__input_type_link');
const cardCreateButton = popupAdd.querySelector('.popup__btn_action_create');
const popupAddCloseButton = popupAdd.querySelector('.popup__btn_action_close');
////////////////////////////////////

///////////////PopopShow/////////////
const popupViewPhoto = document.querySelector('.popup_photo-view');
const popupViewImg = popupViewPhoto.querySelector('.popup__img');
const popupImgInfo = popupViewPhoto.querySelector('.popup__img-info');
const popupShowCloseButton = popupViewPhoto.querySelector('.popup__btn_action_close');
////////////////////////////////////


function popupOpenClose (evt) {
    evt.preventDefault(); 
    page.classList.toggle('page_hiddened');
    if(evt.target === profileInfoEditButton || evt.target === popupCloseButton || evt.target === popupEdit){
      popupEdit.classList.toggle('popup_opened');
      if(popupEdit.classList.contains('popup_opened')){
        nameInput.value= profileName.textContent;
        jobInput.value = profileJob.textContent;
      }
    }
    else if(evt.target === cardAddButton || evt.target === popupAddCloseButton || evt.target === popupAdd){
      popupAdd.classList.toggle('popup_opened');
    }
    else if (evt.target.classList.contains('photo-grid__image') || evt.target === popupShowCloseButton || evt.target === popupViewPhoto){
      popupViewPhoto.classList.toggle('popup_opened');
      if(popupViewPhoto.classList.contains('popup_opened')){
        popupViewImg.src = evt.target.src;
        popupImgInfo.textContent = evt.target.closest('.photo-grid__item').querySelector('.photo-grid__title').textContent;
      }
    }
}

function popupSaveEdit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupEdit.classList.toggle('popup_opened');
}

function popupOverlayClick (evt) {
  evt.preventDefault(); 
  if ((nameInput !== document.activeElement) && (jobInput !== document.activeElement) 
  && (titleInput !== document.activeElement) && (linkInput !== document.activeElement)){
    if(evt.target === evt.currentTarget) {
      popupOpenClose(evt);
    }
  }
}

function DeletePhotoCard (evt) {
  evt.target.closest('.photo-grid__item').remove();
};

function LikePhotoCard (evt) {
  evt.target.classList.toggle('photo-grid__btn_active');
};

function popupCreateCard(cardData) {
  const newPhotoCard = photoListTemplate.cloneNode(true);

  const titlePhotoCard = newPhotoCard.querySelector('.photo-grid__title');
  titlePhotoCard.textContent = cardData.title;

  const linkPhotoCard = newPhotoCard.querySelector('.photo-grid__image');
  linkPhotoCard.src = cardData.link;
  linkPhotoCard.alt = 'Фотография:' + cardData.title;

  const deleteButton = newPhotoCard.querySelector('.photo-grid__delete-button');
  deleteButton.addEventListener('click', DeletePhotoCard);

  const LikeButton = newPhotoCard.querySelector('.photo-grid__btn_action_like');
  LikeButton.addEventListener('click', LikePhotoCard);

  linkPhotoCard.addEventListener('click', popupOpenClose);

  photoList.prepend(newPhotoCard);
  popupAdd.classList.toggle('popup_opened');
}


cardList.forEach((cardData) => {
  popupCreateCard(cardData);
});


function popupAddCard(evt) {
  evt.preventDefault(); 
  if((titleInput.value !== '') && (linkInput.value !== '')){
    popupCreateCard({title: titleInput.value, link: linkInput.value });
    titleInput.value = "";
    linkInput.value = "";
  }
}

///////////////PopopEditListeners/////////////
profileInfoEditButton.addEventListener('click', popupOpenClose); 
popupCloseButton.addEventListener('click', popupOpenClose); 
profileInfoSaveButton.addEventListener('click', popupSaveEdit); 
popupEdit.addEventListener('click', popupOverlayClick); 
/////////////////////////////////////////////

///////////////PopopAddListeners/////////////
cardAddButton.addEventListener('click', popupOpenClose); 
popupAddCloseButton.addEventListener('click', popupOpenClose); 
cardCreateButton.addEventListener('click', popupAddCard); 
popupAdd.addEventListener('click', popupOverlayClick); 
/////////////////////////////////////////////

///////////////PopopShowListeners/////////////
popupShowCloseButton.addEventListener('click', popupOpenClose); 
popupViewPhoto.addEventListener('click', popupOverlayClick); 
/////////////////////////////////////////////