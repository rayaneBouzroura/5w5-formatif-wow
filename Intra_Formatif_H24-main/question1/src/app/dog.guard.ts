import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';

export const dogGuard: CanActivateFn = (route, state) => {
  let userString = localStorage.getItem('user');
  let user = JSON.parse(userString!);
  console.log('current user cat preference : ', user.prefercat);
  if(user.prefercat){
    return createUrlTreeFromSnapshot(route,['/cat']);
  }
  return true;
};
