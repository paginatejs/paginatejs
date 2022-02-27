import type { Pagination, PaginationProps } from '@paginatejs/core';
import { getPagination } from '@paginatejs/core';
import React from 'react';

export type UsePaginationType = {
  pagination: Pagination;
  setPage: (page: number) => Pagination;
  setTotalItems: (totalItems: number) => Pagination;
  setItemsPerPage: (itemsPerPage: number) => Pagination;
};

export const usePagination = (props: PaginationProps): UsePaginationType => {
  const [pagination, setPagination] = React.useState(() => getPagination(props));
  const [updatePagination, setPage, setTotalItems, setItemsPerPage] = React.useMemo(
    () => createHelperFunctions(pagination, setPagination),
    [pagination.totalItems, pagination.page, pagination.itemsPerPage]
  );
  React.useEffect(
    () =>
      void (updatePagination as UpdatePagination)(props.totalItems, props.page, props.itemsPerPage),
    [props.totalItems, props.page, props.itemsPerPage]
  );
  return { pagination, setPage, setTotalItems, setItemsPerPage };
};

type UpdatePagination = (totalItems?: number, page?: number, itemsPerPage?: number) => Pagination;

const createHelperFunctions = (
  pagination: Pagination,
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
) => {
  const updatePagination: UpdatePagination = (
    totalItems = pagination.totalItems,
    page = pagination.page,
    itemsPerPage = pagination.itemsPerPage
  ) => {
    if (
      totalItems === pagination.totalItems &&
      page === pagination.page &&
      itemsPerPage === pagination.itemsPerPage
    ) {
      return pagination;
    }
    const newPagination = getPagination({ totalItems, page, itemsPerPage });
    setPagination(newPagination);
    return newPagination;
  };
  return [
    updatePagination,
    (page: number) => updatePagination(undefined, page),
    (totalItems: number) => updatePagination(totalItems),
    (itemsPerPage: number) => updatePagination(undefined, undefined, itemsPerPage),
  ];
};
