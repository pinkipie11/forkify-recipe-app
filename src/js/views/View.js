import icons from 'url:../../img/icons.svg'; // Parcel 2

// We are exporting class itself because we are not going to create any instance of this View. We will only use it as a parent class of the others child views.
export default class View {
  _data;

  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Jonas Schmdtmann
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // This method will convert string (newMarkup) to a real DOM Node objects - like a virtual DOM which lives in our memory.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Returns NODE lists.
    // Array.from() - converting to
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements);
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Comparing these two elements
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      // If they are different we want to change the text content of curEl to the text content of the newEl. - UPDATING DOM in places where it has changed.
      // Text we want to change is the firstChildNode with nodeValue. In other element which don't contain text nodeValue will be null(will not be replaced/changed).
      // ?. - childNode will not allways exist.

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      // Also whenever an element changes we want to change the attributes.
      if (!newEl.isEqualNode(curEl))
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
   <div class="spinner">
     <svg>
        <use href="${icons}#icon-loader"></use>
     </svg>
   </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
         <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
         </div>
         <p>${message}</p>
       </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
         <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
         </div>
         <p>${message}</p>
       </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
