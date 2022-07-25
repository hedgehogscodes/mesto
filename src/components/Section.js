export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  addItem(element, startpos) {
    if(startpos == true){
      this._container.append(element);
    }
    else{
      this._container.prepend(element);
    }
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}