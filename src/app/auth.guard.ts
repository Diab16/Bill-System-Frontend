import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Use inject to get Router

  if (localStorage.getItem("userToken") !== null) {
    console.log(true);
    return true;
  } else {
    console.log(false);
    // Redirect to signin if not authenticated
    router.navigate(['/Login']);
    return false;
  }
};
