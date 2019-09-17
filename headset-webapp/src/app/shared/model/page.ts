export interface IPageRes<T> {
  content: Array<T>;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IPage {
  page: number;
  size: number;
  sort?: Array<Sort>
}

export interface Sort {
  name: string;
  asc: 'asc' | 'desc'
}

export interface SortParam {
  sort: string[]
}
