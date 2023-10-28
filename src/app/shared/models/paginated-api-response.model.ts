import { Links } from './links.model';
import { Meta } from './meta.model';

export interface PaginatedApiResponse<T> {
  data: T[];
  links: Links;
  meta: Meta;
}
export class PaginatedApiResponse<T> implements PaginatedApiResponse<T> {
  data: T[];
  links: Links;
  meta: Meta;

  constructor(data?: T[]) {
    this.data = data || [];
    this.links = new Links();
    this.meta = new Meta(data?.length as number);
  }
}
