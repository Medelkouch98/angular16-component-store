
export interface PaginatedApiResponse<T> {
  data: T[];
  count: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}
export class PaginatedApiResponse<T> implements PaginatedApiResponse<T> {
  data: T[];
  count: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;

  constructor(data?: T[]) {
    this.data = data || [];
    this.count= 14;
    this.pageIndex = 0;
    this.pageSize= 5;
    this.totalPages= 2;
  }
}
