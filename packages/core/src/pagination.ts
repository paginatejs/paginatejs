export type BasePagination = {
  page: number; // Shortcut for currentPage
  totalPages: number; // Total number of pages
};

export type Pagination = BasePagination & {
  currentPage: number;
  firstPage: number;
  previousPage: number;
  nextPage: number;
  lastPage: number;
  totalItems: number; // Total number of items to paginate
  itemsPerPage: number; // Number of items per page
  toItem: number; // Last item of the current page
  fromItem: number; // First item of the current page
};

export type PaginationProps = {
  totalItems: number;
  page?: number; // Current page. Default is 1.
  itemsPerPage?: number; // Number of items per page. Default is 24.
};

export const getPagination = ({
  totalItems,
  page = 0,
  itemsPerPage = 24,
}: PaginationProps): Pagination => {
  let totalPages = 0;
  let firstPage = 0;
  let previousPage = 0;
  let nextPage = 0;
  let lastPage = 0;
  let fromItem = 0;
  let toItem = 0;
  if (itemsPerPage < 1) {
    itemsPerPage = 1;
  }
  if (totalItems) {
    totalPages = Math.ceil(totalItems / itemsPerPage);
    firstPage = 1;
    lastPage = totalPages;
    let startItem: number;
    if (page < 1) {
      page = 1;
      startItem = 0;
      fromItem = 1;
    } else {
      previousPage = page - 1;
      startItem = previousPage * itemsPerPage;
      fromItem = startItem + 1;
      if (page > totalPages) {
        page = totalPages;
      } else if (page < totalPages) {
        nextPage = page + 1;
      }
    }
    if (totalItems < itemsPerPage) {
      toItem = totalItems;
    } else {
      toItem = startItem + itemsPerPage;
      if (toItem > totalItems) {
        toItem = startItem + (totalItems % startItem);
      }
    }
  }
  return {
    page,
    currentPage: page,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    totalItems,
    itemsPerPage,
    toItem,
    fromItem,
    totalPages,
  };
};
