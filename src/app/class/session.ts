export class Session {
    validateUser(router) {
        if (!localStorage.getItem('token')) {
            router.navigateByUrl('');
        }
      }
    validateLogin(router) {
        if (!localStorage.getItem('token')) {
            router.navigateByUrl('');
        } else {
        }
    }
}