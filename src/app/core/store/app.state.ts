import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { IRouterStateUrl } from './router/router.state';

export interface AppState {
  router: RouterReducerState<IRouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};
