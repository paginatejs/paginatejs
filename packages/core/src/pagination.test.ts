import { getPagination } from './pagination';

test('total pages', () => {
  expect(getPagination({ totalItems: 10, itemsPerPage: 5 }).totalPages).toBe(2);
  expect(getPagination({ totalItems: 6, itemsPerPage: 5 }).totalPages).toBe(2);
  expect(getPagination({ totalItems: 5, itemsPerPage: 5 }).totalPages).toBe(1);
  expect(getPagination({ totalItems: 1, itemsPerPage: 5 }).totalPages).toBe(1);
  expect(getPagination({ totalItems: 0, itemsPerPage: 5 }).totalPages).toBe(0);
});

test('from item', () => {
  expect(getPagination({ page: 1, totalItems: 10, itemsPerPage: 5 }).fromItem).toBe(1);
  expect(getPagination({ page: 2, totalItems: 9, itemsPerPage: 5 }).fromItem).toBe(6);
});

test('to item', () => {
  expect(getPagination({ page: 1, totalItems: 10, itemsPerPage: 5 }).toItem).toBe(5);
  expect(getPagination({ page: 2, totalItems: 9, itemsPerPage: 5 }).toItem).toBe(9);
});

test('previous page', () => {
  expect(getPagination({ page: 1, totalItems: 10, itemsPerPage: 5 }).previousPage).toBe(0);
  expect(getPagination({ page: 2, totalItems: 7, itemsPerPage: 5 }).previousPage).toBe(1);
});

test('next page', () => {
  expect(getPagination({ page: 1, totalItems: 10, itemsPerPage: 5 }).nextPage).toBe(2);
  expect(getPagination({ page: 2, totalItems: 7, itemsPerPage: 5 }).nextPage).toBe(0);
});

test('pagination without items', () => {
  const pagination = getPagination({ totalItems: 0, itemsPerPage: 5 });
  expect(pagination.totalPages).toBe(0);
  expect(pagination.currentPage).toBe(0);
  expect(pagination.firstPage).toBe(0);
  expect(pagination.nextPage).toBe(0);
  expect(pagination.previousPage).toBe(0);
  expect(pagination.lastPage).toBe(0);
  expect(pagination.fromItem).toBe(0);
  expect(pagination.toItem).toBe(0);
});
