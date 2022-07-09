import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // closest - search up in the tree (looks for parents)
      const btn = e.target.closest('.btn--inline');
      // guard clause - when we click outside btn prevent of returning null.
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const prevButton = `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
    const nextButton = `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
       ${nextButton}
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        ${prevButton}
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        ${nextButton}${prevButton}
      `;

      // Page 1, and there are NO other pages
      return '';
    }
  }
}

export default new PaginationView();
