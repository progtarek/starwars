import { Paging } from './Paging';

export interface PaginatedList<T> extends Paging {
  results: T[];
}
