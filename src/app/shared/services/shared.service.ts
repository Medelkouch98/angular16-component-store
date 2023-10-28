import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { QueryParam } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private router: Router,
  ) {}

  /**
   * gérer la pagination et le tri pour l'envoi dans les requêtes de recherche
   * @returns QueryParam
   */
  public getPageAndSortURL(
    page: number,
    per_page: number,
    sort: Sort
  ): QueryParam {
    let params: QueryParam = { page, per_page };
    if (sort?.direction) {
      params = { ...params, sort: sort.active, order: sort.direction };
    }
    return params;
  }

  /**
   * recuperation de chaîne de filtre pour l'envoi dans les requêtes de recherche
   * @returns QueryParam
   */
  public getSearchQuery(data: any): QueryParam {
    if (!data) return {};
    // remove empty values from the filter object
    return Object.keys(data).reduce((acc, key) => {
      const val = data[key];
      const nonEmpty = val != null && val !== '' && val !== -1;
      return { ...acc, ...(nonEmpty && { [key]: val }) };
    }, {});
  }

  /**
   * create query
   * @param data any
   * @param page number
   * @param page_size number
   * @param sort Sort
   * @returns QueryParam
   */
  public getQuery(
    data: any,
    page?: number,
    page_size?: number,
    sort?: Sort
  ): QueryParam {
    return {
      ...this.getSearchQuery(data),
      ...(page && this.getPageAndSortURL(page, page_size, sort)),
    };
  }

  /**
   * Ouvre une route dans une nouvelle fenêtre.
   * @param commands La route ou le lien à ouvrir dans la nouvelle fenêtre.
   * @param queryParams Les paramètres du lien.
   */
  redirectToNewTab(commands: any[], queryParams?: {[key: string]: any}): void {
    const url = this.router.createUrlTree(commands, { queryParams }).toString();
    window.open(url, '_blank');
  }

}
