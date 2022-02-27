import { BasePagination } from './pagination';

export type Page = number | 'gap';

export type PageItemsProps = BasePagination & {
  maxPageItems?: number;
  disableGaps?: boolean;
};

export type PageItemCallback = (pageItem: Page) => void;

export const createPageItems = (props: PageItemsProps, callback: PageItemCallback): void => {
  const { page: currentPage, totalPages } = props;
  if (totalPages <= 0) {
    return;
  }
  const maxPageItems = props.maxPageItems || 7;
  if (maxPageItems < 0 || maxPageItems === 1) {
    return;
  }
  const size = maxPageItems > totalPages ? totalPages : maxPageItems;
  let first: number, last: number;
  let hasLastGap = false;
  if (size === 1) {
    first = currentPage;
    last = currentPage + 1;
  } else if (size === totalPages) {
    first = 1;
    last = totalPages + 1;
  } else {
    const steps = Math.floor(size / 2);
    const extraStep = size % 2 === 0 ? 1 : 0;
    const endRange = currentPage + extraStep;
    first = endRange - steps;
    last = currentPage + steps + 1;
    if (first < 1) {
      last = last - first + 1;
      first = 1;
    } else {
      const lastDiff = last - totalPages - 1;
      if (lastDiff > 0) {
        first -= lastDiff;
        last -= lastDiff;
      }
    }
    if (!props.disableGaps && size > 4) {
      if (first > 1) {
        callback(1);
        callback('gap');
        first += 2;
      }
      if (endRange + Math.ceil((size - 4) / 2) < totalPages - 1) {
        last -= 2;
        hasLastGap = true;
      }
    }
  }
  for (let i = first; i < last; i++) {
    callback(i);
  }
  if (hasLastGap) {
    callback('gap');
    callback(totalPages);
  }
};

export const getPageItems = (props: PageItemsProps): Page[] => {
  const pageItems: Page[] = [];
  createPageItems(props, (pageItem) => pageItems.push(pageItem));
  return pageItems;
};
