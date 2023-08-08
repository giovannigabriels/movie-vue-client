<script>
import Buttons from "./Button.vue";
export default {
  components: {
    Buttons,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    };
  },
  methods: {
    registerHandler() {
      let payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        address: this.address,
      };
      this.$emit("submitRegister", payload);
    },
    signInHandler() {
      this.$emit("signIn", "login");
    },
  },
};
</script>

<template>
  <div class="register text-light">
    <h3>Sign up and enjoy</h3>
    <form action="" v-on:submit.prevent="registerHandler">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          class="form-control"
          id="username"
          rows="3"
          v-model="username"
          placeholder="Enter your username ..."
        />
      </div>
      <div class="mb-3">
        <label for="register-email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="register-email"
          placeholder="Enter email address ..."
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="register-password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="register-password"
          rows="3"
          v-model="password"
          placeholder="Enter your password ..."
        />
      </div>
      <div class="mb-3">
        <label for="phonenumber" class="form-label">Phone Number</label>
        <input
          class="form-control"
          id="phonenumber"
          rows="3"
          v-model="phoneNumber"
          placeholder="Enter phone number (optional) ..."
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input
          class="form-control"
          id="address"
          rows="3"
          v-model="address"
          placeholder="Enter your address (optional) ..."
        />
      </div>
      <Buttons classB="btn btn-primary" type="submit" name="Sign Up" />
    </form>
    <span>Already have account?</span>
    <Buttons
      classB="btn btn-danger align-middle mx-2"
      name="Sign In"
      @handler="signInHandler"
    />
  </div>
</template>
