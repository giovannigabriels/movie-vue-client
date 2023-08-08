<script>
export default {
  props: ["name", "isLogin", "classB", "type", "val"],
};
</script>

<template>
  <button
    :class="classB"
    v-if="!isLogin"
    v-on:click="$emit('handler')"
    :type="type"
  >
    {{ name }}
  </button>
</template>
