<script>
import Buttons from "./Button.vue";
export default {
  components: {
    Buttons,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    this.googleSignInOnLoad();
  },
  methods: {
    loginHandler() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("submitLogin", payload);
    },
    toRegister() {
      this.$emit("toRegister", "register");
    },
    handleCredentialResponse(res) {
      this.$emit("handleCredentialResponse", res);
    },
    googleSignInOnLoad() {
      const cb = this.handleCredentialResponse;
      window.onload = function () {
        google.accounts.id.initialize({
          client_id:
            "966411328426-k8i9nmle5hs3me6mbff26g9kvlgst6pg.apps.googleusercontent.com",
          callback: cb,
        });
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" } // customization attributes
        );
      };
    },
  },
};
</script>

<template>
  <div class="login text-light">
    <h3>Login</h3>
    <form v-on:submit.prevent="loginHandler">
      <div class="mb-3">
        <label for="login-email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="login-email"
          placeholder="Enter email address ..."
          required
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="login-password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="login-password"
          rows="3"
          required
          placeholder="Enter your password ..."
          v-model="password"
        />
      </div>
      <Buttons
        name="Sign In"
        classB="btn btn-primary"
        type="submit"
        @handler="loginHandler"
      />
    </form>

    <br />
    <div>
      <center>or Sign In with</center>
      <br />
      <center><div id="buttonDiv"></div></center>
    </div>
    <br />
    <br />
    <span
      >New to NetPlix?
      <Buttons name="Sign up now" classB="btn btn-info" @handler="toRegister" />
    </span>
  </div>
</template>
