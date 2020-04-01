import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateUrl } from './router.state';


export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const {queryParams} = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    while (state.firstChild) {
      state = state.firstChild;
    }

    const {params, fragment} = state;
    return {url, queryParams, params, fragment};
  }
}

export const RouterStateSerializerProvider = {
  provide: RouterStateSerializer,
  useClass: CustomSerializer
};
