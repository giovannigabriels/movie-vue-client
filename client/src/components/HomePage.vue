<script>
import FormMovie from "./FormMovie.vue";
import FormGenre from "./FormGenre.vue";
import RowTable from "./RowTable.vue";
import Buttons from "./Button.vue";

export default {
  props: [
    "movies",
    "page",
    "genres",
    "logs",
    "formEditMovie",
    "optionStatus",
    "role",
    "idUser",
  ],
  components: {
    FormMovie,
    FormGenre,
    RowTable,
    Buttons,
  },
  data() {
    return {
      editGenreData: {
        name: "",
        id: "",
      },
    };
  },
  methods: {
    addMovieHandler(payload) {
      //   console.log(payload, "ini payload");
      this.$emit("submitAddMovie", payload);
    },
    addGenreHandler(payload) {
      this.$emit("submitAddGenre", payload);
    },
    cancelAddMovie(val) {
      this.$emit("cancelAddMovie", val);
    },
    cancelAddGenre(val) {
      this.$emit("cancelAddGenre", val);
    },
    deleteGenre(data) {
      this.$emit("deleteGenre", data);
    },
    editMovieHandler(id) {
      this.$emit("editMovieHandler", id);
    },
    submitEditMovieHandler(val) {
      this.$emit("submitEditMovie", val);
    },
    cancelEditAddMovieHandler(val) {
      this.$emit("cancelEditAddMovie", val);
    },
    updateStatus(payload) {
      this.$emit("updateStatus", payload);
    },
    editGenre(payload) {
      this.editGenreData.name = payload.name;
      this.editGenreData.id = payload.id;
      this.$emit("toEditGenre", "editGenreForm");
    },
    submitEditGenre(val) {
      const { name } = val;
      this.$emit("submitEditGenre", { name, id: this.editGenreData.id });
    },
    toAddGenre() {
      this.$emit("toAddGenre", "creategenre");
    },
    toAddMovie() {
      this.$emit("toAddMovie", "createmovie");
    },
  },
};
</script>

<template>
  <!-- Dashboard Section -->
  <section v-if="page === 'dashboard'" id="dashboard-section">
    <div class="row my-5" style="justify-content: center">
      <div class="card text-white bg-secondary mx-3 my-5" style="width: 20rem">
        <div class="card-body">
          <h2 class="card-title">Total Movies</h2>
          <h3 class="card-subtitle mb-2">{{ movies.length }}</h3>
        </div>
      </div>
      <div class="card text-white bg-secondary my-5" style="width: 20rem">
        <div class="card-body">
          <h2 class="card-title">Total Genre</h2>
          <h3 class="card-subtitle mb-2">{{ genres.length }}</h3>
        </div>
      </div>
    </div>
  </section>
  <!-- End Dashboard Section -->

  <!-- Movie Section -->
  <section v-if="page === 'movies'" style="margin-top: 100px">
    <div class="col-12">
      <div class="justify-content-center d-flex row p-5">
        <div
          class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center"
        >
          <h1 class="display-2">Movies</h1>
        </div>
        <div class="d-flex justify-content-end col-12 mb-5">
          <Buttons
            classB="btn btn-primary rounded-pill "
            @handler="toAddMovie"
            name="Add New Movie"
          />
        </div>
        <table class="table text-dark" id="movie-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col" width="180px">Image</th>
              <th scope="col" width="250px">Synopsis</th>
              <th scope="col" width="50px">Trailer</th>
              <th scope="col">Rating</th>
              <th scope="col">Genre</th>
              <th scope="col">Author</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <RowTable
              table="movies"
              :idUser="idUser"
              :role="role"
              :movies="movies"
              :optionStatus="optionStatus"
              @editMovieHandler="editMovieHandler"
              @updateStatus="updateStatus"
            />
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <!-- End Movie Section -->

  <!-- New Movie Section -->
  <section v-if="page === 'createmovie'" style="margin-top: 100px">
    <center><h1 class="display-2">Add Movie</h1></center>

    <div class="col-12">
      <FormMovie
        :genres="genres"
        @submitHandlerMovie="addMovieHandler"
        @cancelAddMovie="cancelAddMovie"
      />
    </div>
  </section>
  <!-- End New Movie Section -->

  <!-- Edit Movie Section -->
  <section
    id="edit-movie-section"
    v-if="page === 'editmovie'"
    style="margin-top: 100px"
  >
    <center><h1 class="display-2">Edit Movie</h1></center>

    <div class="col-12">
      <FormMovie
        :formEditMovie="formEditMovie"
        :genres="genres"
        @cancelAddMovie="cancelAddMovie"
        @submitHandlerMovie="submitEditMovieHandler"
        @cancelEditAddMovieHandler="cancelEditAddMovieHandler"
      />
    </div>
  </section>
  <!-- End Edit Movie Section -->

  <!-- Genre Section -->
  <section
    id="genre-section"
    v-if="page === 'genres'"
    style="margin-top: 100px"
  >
    <div class="col-12">
      <div class="justify-content-center d-flex row p-5">
        <div
          class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center"
        >
          <h1 class="display-2">Genre</h1>
        </div>
        <div class="d-flex justify-content-end col-12 mb-5">
          <Buttons
            classB="btn btn-primary rounded-pill"
            @handler="toAddGenre"
            name="Add New Genre"
          />
        </div>

        <table class="table" id="table-genre">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col" width="50px"></th>
              <th scope="col" width="50px"></th>
            </tr>
          </thead>
          <tbody id="table-genre">
            <RowTable
              table="genres"
              :genres="genres"
              @deleteGenre="deleteGenre"
              @editGenre="editGenre"
            />
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <!-- End Genre Section -->

  <!-- New Genre Section -->
  <section
    id="new-genre-section"
    v-if="page === 'creategenre'"
    style="margin-top: 100px"
  >
    <center><h1 class="display-2">New Genre</h1></center>

    <div class="col-12">
      <FormGenre
        form="add"
        @submitHandler="addGenreHandler"
        @cancelAddGenre="cancelAddGenre"
      />
    </div>
  </section>
  <!-- End New Genre Section -->

  <!-- Edit Genre Section -->
  <section v-if="page === 'editGenreForm'" style="margin-top: 100px">
    <center><h1 class="display-2">Edit Genre</h1></center>

    <div class="col-12">
      <FormGenre
        form="edit"
        :editGenreData="editGenreData"
        @submitHandler="submitEditGenre"
        @cancelAddGenre="cancelAddGenre"
      />
    </div>
  </section>
  <!-- END Edit Genre Section -->

  <!-- Logs Section -->
  <section id="logs-sectionn" v-if="page === 'logs'" style="margin-top: 100px">
    <div class="col-12">
      <div class="justify-content-center d-flex row p-5">
        <div
          class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center"
        >
          <h1 class="display-2">Logs</h1>
        </div>
        <table id="logs-table" class="table" style="width: 1000px">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated By</th>
            </tr>
          </thead>
          <tbody id="table-genre">
            <RowTable table="logs" :logs="logs" />
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <!-- End Log Section -->
</template>

<style>
#dashboard-section {
  margin-top: 200px;
}

.card-title {
  margin-left: 60px;
}
.card-subtitle {
  margin-left: 130px;
}
thead {
  background-color: rgba(201, 96, 5, 0.827);
}
tbody {
  background-color: rgb(203, 199, 197);
}
img {
  width: 100px;
}
</style>
