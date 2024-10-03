import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';

export const formatifGuard: CanActivateFn = (route, state) => {
  let userString = localStorage.getItem('user');

  if(userString == null){
    console.log('no user');
    return createUrlTreeFromSnapshot(route,['/login']);
  }
  let user = JSON.parse(userString);
  console.log('User likes cats:', user.prefercat);


  console.log('yes user');
  return true;
};
