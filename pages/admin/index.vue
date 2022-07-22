<template>
  <div>
    <h1>Админ</h1>
    <p>Доступ к этой странице имеют только администраторы.</p>
    <div>
      Все пользователи из безопасной (только для администратора) конечной точки
      API:
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.firstName + " " + user.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { authenticationService } from "~/_services/authentication.service";
import { userService } from "~/_services/user.service";

export default {
  data() {
    return {
      // получение текущего пользователя
      user: authenticationService.currentUserValue,
      users: []
    };
  },
  created() {
    // получение массива всех пользователей
    userService.getAll().then(users => (this.users = users));
  }
};
</script>
