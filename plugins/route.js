import { authenticationService } from "~/_services/authentication.service";

export default ({ app }) => {
  // переходы по роутам в зависимости от того, вошёл пользователь или нет
  app.router.beforeEach((to, from, next) => {
    const { authorize } = to.meta;
    const currentUser = authenticationService.currentUserValue;
    if (authorize) {
      if (!currentUser) {
        return next({ path: "/login", query: { returnUrl: to.path } });
      }

      if (authorize.length && !authorize.includes(currentUser.role)) {
        return next({ path: "/" });
      }
    }

    next();
  });
};
