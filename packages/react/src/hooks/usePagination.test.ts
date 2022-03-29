import { act, renderHook } from '@testing-library/react-hooks';
import { expect, test } from 'vitest';
import { usePagination } from './usePagination';

test('go to a page', () => {
  const { result } = renderHook(() => usePagination({ page: 1, totalItems: 10, itemsPerPage: 5 }));

  expect(result.current.pagination.totalPages).toBe(2);
  expect(result.current.pagination.page).toBe(1);

  act(() => void result.current.updatePagination({ page: 2 }));
  expect(result.current.pagination.page).toBe(2);

  act(() => void result.current.updatePagination({ page: 3 }));
  expect(result.current.pagination.page).toBe(2);
});

test('go to next page', () => {
  const { result } = renderHook(() => usePagination({ page: 1, totalItems: 10, itemsPerPage: 5 }));

  act(() => void result.current.updatePagination({ page: result.current.pagination.nextPage }));
  expect(result.current.pagination.page).toBe(2);
  expect(result.current.pagination.nextPage).toBe(0);
});

test('go to previous page', () => {
  const { result } = renderHook(() => usePagination({ page: 2, totalItems: 10, itemsPerPage: 5 }));

  act(() => void result.current.updatePagination({ page: result.current.pagination.previousPage }));
  expect(result.current.pagination.page).toBe(1);
  expect(result.current.pagination.previousPage).toBe(0);
});

test('update items per page', () => {
  const { result } = renderHook(() => usePagination({ page: 1, totalItems: 10, itemsPerPage: 5 }));

  act(() => void result.current.updatePagination({ itemsPerPage: 2 }));
  expect(result.current.pagination.totalPages).toBe(5);

  act(() => void result.current.updatePagination({ itemsPerPage: 3 }));
  expect(result.current.pagination.totalPages).toBe(4);
});

test('update total items', () => {
  const { result } = renderHook(() => usePagination({ page: 1, totalItems: 10, itemsPerPage: 5 }));

  act(() => void result.current.updatePagination({ totalItems: 400 }));
  expect(result.current.pagination.totalPages).toBe(80);
});
