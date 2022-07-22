<template>
  <div>
    <div class="alert alert-info">
      <strong>Обычный пользователь</strong> - Имя пользователя: user Пароль:
      user
      <br />
      <strong>Администратор</strong> - Имя пользователя: admin Пароль: admin
    </div>
    <h2>Форма входа</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">Имя пользователя</label>
        <input
          type="text"
          v-model.trim="$v.username.$model"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.username.$error }"
        />
        <div v-if="submitted && !$v.username.required" class="invalid-feedback">
          Имя пользователя обязательно
        </div>
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          v-model.trim="$v.password.$model"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.password.$error }"
        />
        <div v-if="submitted && !$v.password.required" class="invalid-feedback">
          Пароль обязателен
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">
          <span
            class="spinner-border spinner-border-sm"
            v-show="loading"
          ></span>
          <span>Войти</span>
        </button>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import { authenticationService } from "~/_services/authentication.service";

export default {
  mixins: [validationMixin],
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: ""
    };
  },
  validations: {
    username: { required },
    password: { required }
  },
  created() {
    // если пользователь залогинен - переход на главную
    if (authenticationService.currentUserValue) {
      this.$router.push("/");
    }
    // ссылка из запроса, для возвращения
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    onSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;
      // логин. при прохождении аутентификации возвращение на предыдущую страницу
      authenticationService.login(this.username, this.password).then(
        user => this.$router.push(this.returnUrl),
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }
};
</script>
