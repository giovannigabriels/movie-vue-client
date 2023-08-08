<script>
import Buttons from "./Button.vue";
export default {
  components: {
    Buttons,
  },
  props: ["isLogin"],
  methods: {
    signInHandler() {
      this.$emit("signIn", "login");
    },
  },
};
</script>
<template>
  <div class="app-home">
    <div class="col-12 text-center align-middle text-dark">
      <h1>Unlimited movies, TV shows, and more.</h1>
      <h3>Watch anywhere. Cancel anytime.</h3>
    </div>
    <div class="col-12 text-center align-middle text-dark">
      <div>
        <Buttons
          classB="btn btn-danger align-middle"
          name="Sign In"
          :isLogin="isLogin"
          @handler="signInHandler"
        />
      </div>
    </div>
  </div>
</template>
