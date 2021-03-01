<template>
  <div class = "Login">
    <h1>Login</h1>
    <form name="loginForm" @submit.prevent="handleLogin">
      <div v-if="message" id="message">{{message}}</div>
      <div class="form_row">
        <label for="email"> Email </label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="form_row">
        <label for="password"> Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="form_row">
        <button :disabled="submitted">
          <span> Login </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import AuthService from "../services/auth";

export default {
  name: "Login",
  data() {
    return {
      submitted: false,
      message: "",
      email: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      this.submitted = true;
      if(this.email!="" && this.password!="") {
        console.log("Sending login request");
        AuthService.login({
          email: this.email,
          password: this.password
        }).then((id) => {
          this.message = "Login successful";
          this.$router.push({ path: `home/${id}`});
        }).catch((err) => {
          if(err) {
            console.log('Some error loggin in');
            console.log(err);
            this.message = "Some error logging in";
            this.submitted = false;
          }
        });
      } 
      else {
        this.message = "Email and password required";
        this.submitted = false;
      }
    }
  }
}
</script>
