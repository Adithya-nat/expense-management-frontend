<template>
  <div class = "signup">
   <h1>Signup page</h1>
   <form name="signUpForm" @submit.prevent="handleSignup">
     <div v-if="message" id="message">{{message}}</div>
     <div class="form_row">
       <label for="email"> Email </label>
       <input type="email" name="email" v-model="email" />
     </div>
     <div class="form_row">
       <label for="firstname"> First Name:</label>
       <input type="text" name="firstname" v-model="firstname" />
     </div>
     <div class="form_row">
       <label for="lastname"> Last Name:</label>
       <input type="text" name="lastname" v-model="lastname" />
     </div>
     <div class="form_row">
       <label for="password"> Password:</label>
       <input type="password" name="password" v-model="password" />
     </div>
     <div class="form_row">
       <button :disabled="submitted">
         <span> Signup </span>
       </button>
     </div>
   </form>
  </div>
</template>
<script>
import AuthService from "../services/auth";

export default {
  name: "SignUp",
  data() {
    return {
      submitted: false,
      message: "",
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    }
  },
  methods: {
    handleSignup() {
      console.log("Signup Pressed");
      if(this.email!="" && this.password!="" && this.firstname!="" && this.lastname!="") {
        this.submitted = true;
        console.log(this.lastname);
        console.log(this.firstname);
        this.message = "Send data to API";
        AuthService.signup({
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname
        }).then((user)=> {
          console.log(user);
          this.message = "User created";
        }).catch((err)=> {
          console.log(err);
          this.message = "Oops! Email already taken";
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