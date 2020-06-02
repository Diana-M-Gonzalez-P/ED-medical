export class Session {
    validateUser(router) {
        if (!localStorage.getItem('token')) {
            router.navigateByUrl('/login');
        }
      }
    validateLogin(router) {
        if (localStorage.getItem('token')) {
            router.navigateByUrl('/home');
        } else {
        }
    }
}