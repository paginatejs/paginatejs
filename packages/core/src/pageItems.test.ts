import { expect, test } from 'vitest';
import type { Page, PageItemsProps } from './pageItems';
import { getPageItems } from './pageItems';

test('3 pages with 2 page items', () => {
  withDefaults({ totalPages: 3, maxPageItems: 2 })
    .expectPages({ page: 1 }, [1, 2])
    .expectPages({ page: 2 }, [2, 3])
    .expectPages({ page: 3 }, [2, 3]);
});

test('10 pages with 2 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 2 })
    .expectPages({ page: 1 }, [1, 2])
    .expectPages({ page: 2 }, [2, 3])
    .expectPages({ page: 3 }, [3, 4])
    .expectPages({ page: 4 }, [4, 5])
    .expectPages({ page: 5 }, [5, 6])
    .expectPages({ page: 6 }, [6, 7])
    .expectPages({ page: 7 }, [7, 8])
    .expectPages({ page: 8 }, [8, 9])
    .expectPages({ page: 9 }, [9, 10])
    .expectPages({ page: 10 }, [9, 10]);
});

test('10 pages with 3 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 3 })
    .expectPages({ page: 1 }, [1, 2, 3])
    .expectPages({ page: 2 }, [1, 2, 3])
    .expectPages({ page: 3 }, [2, 3, 4])
    .expectPages({ page: 4 }, [3, 4, 5])
    .expectPages({ page: 5 }, [4, 5, 6])
    .expectPages({ page: 6 }, [5, 6, 7])
    .expectPages({ page: 7 }, [6, 7, 8])
    .expectPages({ page: 8 }, [7, 8, 9])
    .expectPages({ page: 9 }, [8, 9, 10])
    .expectPages({ page: 10 }, [8, 9, 10]);
});

test('10 pages with 4 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 4 })
    .expectPages({ page: 1 }, [1, 2, 3, 4])
    .expectPages({ page: 2 }, [1, 2, 3, 4])
    .expectPages({ page: 3 }, [2, 3, 4, 5])
    .expectPages({ page: 4 }, [3, 4, 5, 6])
    .expectPages({ page: 5 }, [4, 5, 6, 7])
    .expectPages({ page: 6 }, [5, 6, 7, 8])
    .expectPages({ page: 7 }, [6, 7, 8, 9])
    .expectPages({ page: 8 }, [7, 8, 9, 10])
    .expectPages({ page: 9 }, [7, 8, 9, 10])
    .expectPages({ page: 10 }, [7, 8, 9, 10]);
});

test('10 pages with 5 page items without gaps', () => {
  withDefaults({ totalPages: 10, maxPageItems: 5, disableGaps: true })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5])
    .expectPages({ page: 4 }, [2, 3, 4, 5, 6])
    .expectPages({ page: 5 }, [3, 4, 5, 6, 7])
    .expectPages({ page: 6 }, [4, 5, 6, 7, 8])
    .expectPages({ page: 7 }, [5, 6, 7, 8, 9])
    .expectPages({ page: 8 }, [6, 7, 8, 9, 10])
    .expectPages({ page: 9 }, [6, 7, 8, 9, 10])
    .expectPages({ page: 10 }, [6, 7, 8, 9, 10]);
});

test('10 pages with 6 page items without gaps', () => {
  withDefaults({ totalPages: 10, maxPageItems: 6, disableGaps: true })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 6])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 6])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 6])
    .expectPages({ page: 4 }, [2, 3, 4, 5, 6, 7])
    .expectPages({ page: 5 }, [3, 4, 5, 6, 7, 8])
    .expectPages({ page: 6 }, [4, 5, 6, 7, 8, 9])
    .expectPages({ page: 7 }, [5, 6, 7, 8, 9, 10])
    .expectPages({ page: 8 }, [5, 6, 7, 8, 9, 10])
    .expectPages({ page: 9 }, [5, 6, 7, 8, 9, 10])
    .expectPages({ page: 10 }, [5, 6, 7, 8, 9, 10]);
});

test('100 pages with 7 page items without gaps', () => {
  withDefaults({ totalPages: 100, maxPageItems: 7, disableGaps: true })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 4 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 5 }, [2, 3, 4, 5, 6, 7, 8])
    .expectPages({ page: 6 }, [3, 4, 5, 6, 7, 8, 9])
    .expectPages({ page: 7 }, [4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 8 }, [5, 6, 7, 8, 9, 10, 11])
    .expectPages({ page: 9 }, [6, 7, 8, 9, 10, 11, 12])
    .expectPages({ page: 10 }, [7, 8, 9, 10, 11, 12, 13])
    .expectPages({ page: 50 }, [47, 48, 49, 50, 51, 52, 53])
    .expectPages({ page: 100 }, [94, 95, 96, 97, 98, 99, 100]);
});

test('100 pages with 8 page items without gaps', () => {
  withDefaults({ totalPages: 100, maxPageItems: 8, disableGaps: true })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 6, 7, 8])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 6, 7, 8])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 6, 7, 8])
    .expectPages({ page: 4 }, [1, 2, 3, 4, 5, 6, 7, 8])
    .expectPages({ page: 5 }, [2, 3, 4, 5, 6, 7, 8, 9])
    .expectPages({ page: 6 }, [3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 7 }, [4, 5, 6, 7, 8, 9, 10, 11])
    .expectPages({ page: 8 }, [5, 6, 7, 8, 9, 10, 11, 12])
    .expectPages({ page: 9 }, [6, 7, 8, 9, 10, 11, 12, 13])
    .expectPages({ page: 10 }, [7, 8, 9, 10, 11, 12, 13, 14])
    .expectPages({ page: 50 }, [47, 48, 49, 50, 51, 52, 53, 54])
    .expectPages({ page: 100 }, [93, 94, 95, 96, 97, 98, 99, 100]);
});

test('7 pages with 7 page items without gaps', () => {
  withDefaults({ totalPages: 7, maxPageItems: 7, disableGaps: true })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 4 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 5 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 6 }, [1, 2, 3, 4, 5, 6, 7])
    .expectPages({ page: 7 }, [1, 2, 3, 4, 5, 6, 7]);
});

test('10 pages with 5 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 5 })
    .expectPages({ page: 1 }, [1, 2, 3, 'gap', 10])
    .expectPages({ page: 2 }, [1, 2, 3, 'gap', 10])
    .expectPages({ page: 3 }, [1, 2, 3, 'gap', 10])
    .expectPages({ page: 4 }, [1, 'gap', 4, 'gap', 10])
    .expectPages({ page: 5 }, [1, 'gap', 5, 'gap', 10])
    .expectPages({ page: 6 }, [1, 'gap', 6, 'gap', 10])
    .expectPages({ page: 7 }, [1, 'gap', 7, 'gap', 10])
    .expectPages({ page: 8 }, [1, 'gap', 8, 9, 10])
    .expectPages({ page: 9 }, [1, 'gap', 8, 9, 10])
    .expectPages({ page: 10 }, [1, 'gap', 8, 9, 10]);
});

test('10 pages with 6 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 6 })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 'gap', 10])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 'gap', 10])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 'gap', 10])
    .expectPages({ page: 4 }, [1, 'gap', 4, 5, 'gap', 10])
    .expectPages({ page: 5 }, [1, 'gap', 5, 6, 'gap', 10])
    .expectPages({ page: 6 }, [1, 'gap', 6, 7, 'gap', 10])
    .expectPages({ page: 7 }, [1, 'gap', 7, 8, 9, 10])
    .expectPages({ page: 8 }, [1, 'gap', 7, 8, 9, 10])
    .expectPages({ page: 9 }, [1, 'gap', 7, 8, 9, 10])
    .expectPages({ page: 10 }, [1, 'gap', 7, 8, 9, 10]);
});

test('10 pages with 7 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 7 })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 'gap', 10])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 'gap', 10])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 'gap', 10])
    .expectPages({ page: 4 }, [1, 2, 3, 4, 5, 'gap', 10])
    .expectPages({ page: 5 }, [1, 'gap', 4, 5, 6, 'gap', 10])
    .expectPages({ page: 6 }, [1, 'gap', 5, 6, 7, 'gap', 10])
    .expectPages({ page: 7 }, [1, 'gap', 6, 7, 8, 9, 10])
    .expectPages({ page: 8 }, [1, 'gap', 6, 7, 8, 9, 10])
    .expectPages({ page: 9 }, [1, 'gap', 6, 7, 8, 9, 10])
    .expectPages({ page: 10 }, [1, 'gap', 6, 7, 8, 9, 10]);
});

test('10 pages with 8 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 8 })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 6, 'gap', 10])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 6, 'gap', 10])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 6, 'gap', 10])
    .expectPages({ page: 4 }, [1, 2, 3, 4, 5, 6, 'gap', 10])
    .expectPages({ page: 5 }, [1, 'gap', 4, 5, 6, 7, 'gap', 10])
    .expectPages({ page: 6 }, [1, 'gap', 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 7 }, [1, 'gap', 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 8 }, [1, 'gap', 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 9 }, [1, 'gap', 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 10 }, [1, 'gap', 5, 6, 7, 8, 9, 10]);
});

test('10 pages with 9 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 9 })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 6, 7, 'gap', 10])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 6, 7, 'gap', 10])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 6, 7, 'gap', 10])
    .expectPages({ page: 4 }, [1, 2, 3, 4, 5, 6, 7, 'gap', 10])
    .expectPages({ page: 5 }, [1, 2, 3, 4, 5, 6, 7, 'gap', 10])
    .expectPages({ page: 6 }, [1, 'gap', 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 7 }, [1, 'gap', 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 8 }, [1, 'gap', 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 9 }, [1, 'gap', 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 10 }, [1, 'gap', 4, 5, 6, 7, 8, 9, 10]);
});

test('10 pages with 10 page items', () => {
  withDefaults({ totalPages: 10, maxPageItems: 10 })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 4 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 5 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 6 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 7 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 8 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 9 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .expectPages({ page: 10 }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('100 pages with 10 page items', () => {
  withDefaults({ totalPages: 100, maxPageItems: 10 })
    .expectPages({ page: 1 }, [1, 2, 3, 4, 5, 6, 7, 8, 'gap', 100])
    .expectPages({ page: 2 }, [1, 2, 3, 4, 5, 6, 7, 8, 'gap', 100])
    .expectPages({ page: 3 }, [1, 2, 3, 4, 5, 6, 7, 8, 'gap', 100])
    .expectPages({ page: 4 }, [1, 2, 3, 4, 5, 6, 7, 8, 'gap', 100])
    .expectPages({ page: 5 }, [1, 2, 3, 4, 5, 6, 7, 8, 'gap', 100])
    .expectPages({ page: 6 }, [1, 'gap', 4, 5, 6, 7, 8, 9, 'gap', 100])
    .expectPages({ page: 7 }, [1, 'gap', 5, 6, 7, 8, 9, 10, 'gap', 100])
    .expectPages({ page: 8 }, [1, 'gap', 6, 7, 8, 9, 10, 11, 'gap', 100])
    .expectPages({ page: 9 }, [1, 'gap', 7, 8, 9, 10, 11, 12, 'gap', 100])
    .expectPages({ page: 10 }, [1, 'gap', 8, 9, 10, 11, 12, 13, 'gap', 100])
    .expectPages({ page: 20 }, [1, 'gap', 18, 19, 20, 21, 22, 23, 'gap', 100])
    .expectPages({ page: 30 }, [1, 'gap', 28, 29, 30, 31, 32, 33, 'gap', 100])
    .expectPages({ page: 40 }, [1, 'gap', 38, 39, 40, 41, 42, 43, 'gap', 100])
    .expectPages({ page: 50 }, [1, 'gap', 48, 49, 50, 51, 52, 53, 'gap', 100])
    .expectPages({ page: 60 }, [1, 'gap', 58, 59, 60, 61, 62, 63, 'gap', 100])
    .expectPages({ page: 70 }, [1, 'gap', 68, 69, 70, 71, 72, 73, 'gap', 100])
    .expectPages({ page: 80 }, [1, 'gap', 78, 79, 80, 81, 82, 83, 'gap', 100])
    .expectPages({ page: 90 }, [1, 'gap', 88, 89, 90, 91, 92, 93, 'gap', 100])
    .expectPages({ page: 91 }, [1, 'gap', 89, 90, 91, 92, 93, 94, 'gap', 100])
    .expectPages({ page: 92 }, [1, 'gap', 90, 91, 92, 93, 94, 95, 'gap', 100])
    .expectPages({ page: 93 }, [1, 'gap', 91, 92, 93, 94, 95, 96, 'gap', 100])
    .expectPages({ page: 94 }, [1, 'gap', 92, 93, 94, 95, 96, 97, 'gap', 100])
    .expectPages({ page: 95 }, [1, 'gap', 93, 94, 95, 96, 97, 98, 99, 100])
    .expectPages({ page: 96 }, [1, 'gap', 93, 94, 95, 96, 97, 98, 99, 100])
    .expectPages({ page: 97 }, [1, 'gap', 93, 94, 95, 96, 97, 98, 99, 100])
    .expectPages({ page: 98 }, [1, 'gap', 93, 94, 95, 96, 97, 98, 99, 100])
    .expectPages({ page: 99 }, [1, 'gap', 93, 94, 95, 96, 97, 98, 99, 100])
    .expectPages({ page: 100 }, [1, 'gap', 93, 94, 95, 96, 97, 98, 99, 100]);
});

test('2 pages with 7 page items', () => {
  withDefaults({ totalPages: 2, maxPageItems: 7 })
    .expectPages({ page: 1 }, [1, 2])
    .expectPages({ page: 2 }, [1, 2])
    .expectPages({ page: 3 }, [1, 2]);
});

test('page higher than total number of pages should go to the last page', () => {
  expectPages({ page: 999, totalPages: 10 }, [1, 'gap', 6, 7, 8, 9, 10]);
});

test('page lower than total number of pages should go to the first page', () => {
  expectPages({ page: 0, totalPages: 10 }, [1, 2, 3, 4, 5, 'gap', 10]);
  expectPages({ page: -1, totalPages: 10 }, [1, 2, 3, 4, 5, 'gap', 10]);
});

test('zero or negative total pages should return empty array', () => {
  expectPages({ page: 1, totalPages: -1 }, []);
  expectPages({ page: 1, totalPages: 0 }, []);
});

test('negative maxPageItems should return empty array', () => {
  expectPages({ page: 1, totalPages: 10, maxPageItems: -1 }, []);
});

test('maxPageItems 1 should return empty array', () => {
  expectPages({ page: 1, totalPages: 0, maxPageItems: 1 }, []);
});

test('undefined or zero maxPageItems defaults to 7', () => {
  expectPages({ page: 1, totalPages: 10 }, [1, 2, 3, 4, 5, 'gap', 10]);
  expectPages({ page: 1, totalPages: 10, maxPageItems: 0 }, [1, 2, 3, 4, 5, 'gap', 10]);
});

export type TestPageItemsProps = Omit<PageItemsProps, 'page' | 'totalPages'> & {
  page?: number;
  totalPages?: number;
};

const withDefaults = (defaultProps: TestPageItemsProps) => {
  const expectPagesWithDefaults = {
    expectPages: (props: TestPageItemsProps, expectedPages: Page[]) => {
      expectPages(
        {
          ...defaultProps,
          ...props,
        } as PageItemsProps,
        expectedPages
      );
      return expectPagesWithDefaults;
    },
  };
  return expectPagesWithDefaults;
};

const expectPages = (props: PageItemsProps, expectedPages: Page[]) => {
  const receivedPages = getPageItems(props);
  expect(JSON.stringify(receivedPages)).toBe(JSON.stringify(expectedPages));
};
