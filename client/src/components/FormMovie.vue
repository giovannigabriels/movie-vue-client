<script>
import Buttons from "./Button.vue";
export default {
  components: {
    Buttons,
  },
  props: ["genres", "formEditMovie", "form"],
  data() {
    return {
      title: this.formEditMovie ? this.formEditMovie.title : "",
      genreId: this.formEditMovie ? this.formEditMovie.genreId : "",
      synopsis: this.formEditMovie ? this.formEditMovie.synopsis : "",
      rating: this.formEditMovie ? this.formEditMovie.rating : "",
      imgUrl: this.formEditMovie ? this.formEditMovie.imgUrl : "",
      trailerUrl: this.formEditMovie ? this.formEditMovie.trailerUrl : "",
    };
  },
  methods: {
    cancelAddMovieHandler() {
      (this.title = ""),
        (this.genreId = ""),
        (this.synopsis = ""),
        (this.rating = ""),
        (this.imgUrl = ""),
        (this.trailerUrl = ""),
        this.$emit("cancelAddMovie", "movies");
    },
    submitHandlerMovie() {
      this.$emit("submitHandlerMovie", {
        title: this.title,
        genreId: this.genreId,
        synopsis: this.synopsis,
        rating: this.rating,
        imgUrl: this.imgUrl,
        trailerUrl: this.trailerUrl,
      });
    },
    cancelEditAddMovieHandler() {
      this.$emit("cancelEditAddMovieHandler", "movies");
    },
  },
};
</script>

<template>
  <div class="col-12 justify-content-center d-flex">
    <div class="col-8">
      <form @submit.prevent="submitHandlerMovie" id="form-movie">
        <div class="mb-3">
          <label for="movie-title"
            >Title <span class="text-danger fw-bold">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="movie-title"
            placeholder="Enter product name"
            autocomplete="off"
            required
            v-model="title"
          />
        </div>
        <div class="mb-3">
          <label for="movie-genre"
            >Genre <span class="text-danger fw-bold">*</span></label
          >
          <select
            id="movie-genre"
            class="form-select"
            required
            v-model="genreId"
          >
            <option value="" selected disabled>-- Select Genre --</option>
            <option
              v-for="(genre, index) in genres"
              :key="index"
              :value="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="movie-synopsis"
            >Synopsis <span class="text-danger fw-bold">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="movie-synopsis"
            placeholder="Enter product description"
            autocomplete="off"
            required
            v-model="synopsis"
          />
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="mb-3">
              <label for="movie-rating"
                >Rating <span class="text-danger fw-bold">*</span></label
              >
              <input
                type="number"
                min="0"
                class="form-control"
                id="movie-rating"
                placeholder="Enter product stock"
                autocomplete="off"
                required
                v-model="rating"
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="movie-imgUrl"
            >Image <span class="text-danger fw-bold">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="movie-imgUrl"
            placeholder="Enter product image url"
            autocomplete="off"
            required
            v-model="imgUrl"
          />
        </div>
        <div class="mb-3">
          <label for="movie-trailerUrl"
            >Trailer <span class="text-danger fw-bold">*</span>
            <span class="text-danger fw-bold"
              >Please enter youtube embed link</span
            >
            <a
              target="_blank"
              href="https://support.google.com/youtube/answer/171780?hl=en"
              >Click here</a
            >
          </label>
          <input
            type="text"
            class="form-control"
            id="movie-trailerUrl"
            placeholder="Enter movie trailer url"
            autocomplete="off"
            required
            v-model="trailerUrl"
          />
        </div>
        <div class="row mt-5 mb-3">
          <div class="col-6">
            <a
              class="btn btn-lg btn-light rounded-pill w-100 p-2"
              href=""
              id="cancel-add-movie"
              v-on:click.prevent="cancelAddMovieHandler"
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
label {
  color: aliceblue;
}
#form-movie {
  border: solid 1px;
  background-color: black;
  padding: 15px;
  border-radius: 10px;
}
</style>
