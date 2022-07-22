<template>
  <div>
    <h1>Главная</h1>
    <p>Вы вошли на сайт с Vue.js & JWT!!</p>
    <p>
      Ваша роль: <strong>{{ currentUser.role }}</strong
      >.
    </p>
    <p>Доступ к этой странице имеют все авторизованные пользователи.</p>
    <div>
      Текущий пользователь из защищенной конечной точки API:
      <ul v-if="userFromApi">
        <li>{{ userFromApi.firstName }} {{ userFromApi.lastName }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { authenticationService } from "../_services/authentication.service";
import { userService } from "../_services/user.service";
export default {
  data() {
    return {
      currentUser: authenticationService.currentUserValue,
      userFromApi: null
    };
  },
  created() {
    // если пользователь не залогинен - переход на страницу логина
    if (!this.currentUser) this.$router.push("/login");
    // получение пользователя по id и его данных
    userService
      .getById(this.currentUser.id)
      .then(user => (this.userFromApi = user));
  }
};
</script>
