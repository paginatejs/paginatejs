import type { Pagination, PaginationProps } from '@paginatejs/core';
import { getPagination } from '@paginatejs/core';
import React from 'react';

export type UpdatePaginationProps = {
  totalItems?: number;
  page?: number;
  itemsPerPage?: number;
};

export type UpdatePagination = (props: UpdatePaginationProps) => Pagination;

export type UsePaginationType = [pagination: Pagination, updatePagination: UpdatePagination];

const isSamePagination = (props1: PaginationProps, props2: UpdatePaginationProps): boolean =>
  props1.page === props2.page &&
  props1.totalItems === props2.totalItems &&
  props1.itemsPerPage === props2.itemsPerPage;

const usePagination = (props1: PaginationProps): UsePaginationType => {
  const [pagination, setPagination] = React.useState(() => getPagination(props1));
  const dependencies = [props1.page, props1.totalItems, props1.itemsPerPage];

  const updatePagination = React.useMemo(
    () => (props2: UpdatePaginationProps) => {
      if (isSamePagination(props1, props2)) {
        return pagination;
      }
      const newPagination = getPagination({
        page: props2.page ?? props1.page,
        totalItems: props2.totalItems ?? props1.totalItems,
        itemsPerPage: props2.itemsPerPage ?? props1.itemsPerPage,
      });
      setPagination(newPagination);
      return newPagination;
    },
    dependencies
  );

  React.useEffect(() => void updatePagination(props1), dependencies);

  return [pagination, updatePagination];
};

export default usePagination;
