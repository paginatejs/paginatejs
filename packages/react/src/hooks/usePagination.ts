import type { Pagination, PaginationProps } from '@paginatejs/core';
import { getPagination } from '@paginatejs/core';
import React from 'react';

export type UpdatePaginationProps = {
  totalItems?: number;
  page?: number;
  itemsPerPage?: number;
};

export type UpdatePagination = (props: UpdatePaginationProps) => Pagination;

export type UsePaginationType = {
  pagination: Pagination;
  updatePagination: UpdatePagination;
};

const isSamePagination = (p1: PaginationProps, p2: UpdatePaginationProps): boolean =>
  p1.page === p2.page && p1.itemsPerPage === p2.itemsPerPage && p1.totalItems === p2.totalItems;

export const usePagination = (props: PaginationProps): UsePaginationType => {
  const [pagination, setPagination] = React.useState(() => getPagination(props));
  const updatePagination = (props2: UpdatePaginationProps) => {
    if (isSamePagination(props, props2)) {
      return pagination;
    }
    const newPagination = getPagination({ ...props, ...props2 });
    setPagination(newPagination);
    return newPagination;
  };
  React.useEffect(
    () => void updatePagination(props),
    [props.totalItems, props.page, props.itemsPerPage]
  );
  return { pagination, updatePagination };
};
