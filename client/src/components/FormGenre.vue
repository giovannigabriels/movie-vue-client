<script>
import Buttons from "./Button.vue";
export default {
  components: {
    Buttons,
  },
  props: ["genres", "form", "editGenreData"],
  data() {
    return {
      name: this.editGenreData ? this.editGenreData.name : "",
    };
  },
  methods: {
    cancelAddGenre() {
      (this.name = ""), this.$emit("cancelAddGenre", "genres");
    },
    submitHandler() {
      this.$emit("submitHandler", { name: this.name });
    },
  },
};
</script>

<template>
  <div class="col-12 justify-content-center d-flex">
    <div class="col-3">
      <form v-on:submit.prevent="submitHandler" id="form-genre">
        <div class="mb-3">
          <label for="genre-name"
            >Name <span class="text-danger fw-bold">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="genre-name"
            placeholder="Enter category name"
            autocomplete="off"
            required
            v-model="name"
          />
        </div>
        <div class="row mt-5 mb-3 mr-2">
          <div class="col-6">
            <a
              id="cancel-add-genre"
              class="btn btn-lg btn-light rounded-pill w-100 p-2"
              href=""
              v-on:click.prevent="cancelAddGenre"
              >Cancel</a
            >
          </div>
          <div class="col-6">
            <Buttons
              classB="btn btn-lg btn-primary rounded-pill w-100 p-2"
              type="submit"
              name="Submit"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
#form-genre {
  border: solid 1px;
  background-color: black;
  padding: 15px;
  border-radius: 10px;
}
</style>
