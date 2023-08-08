<script>
export default {
  props: [
    "table",
    "movies",
    "genres",
    "logs",
    "optionStatus",
    "role",
    "idUser",
  ],
  methods: {
    deleteGenreHandler(id, name) {
      Swal.fire({
        title: `Are you sure want to delete genre ${name}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("deleteGenre", { id, name });
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Delete ${name} Success!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    editMovieHandler(id) {
      this.$emit("editMovieHandler", id);
    },
    updateStatusHandler(id, event) {
      let payload = {
        id,
        status: event.target.value,
      };
      this.$emit("updateStatus", payload);
    },
    editGenreHandler(name, id) {
      let payload = {
        name,
        id,
      };
      this.$emit("editGenre", payload);
    },
  },
};
</script>

<template>
  <tr v-if="table === 'movies'" v-for="(movie, index) in movies" :key="index">
    <td scope="row">{{ index + 1 }}</td>
    <td class="fw-bold">{{ movie.title }}</td>
    <td>
      <img :src="movie.imgUrl" class="img-fluid" />
    </td>
    <td>{{ movie.synopsis }}</td>
    <td>
      <iframe width="200" height="150" :src="movie.trailerUrl"> </iframe>
    </td>
    <td class="fw-bold">{{ movie.rating }}</td>
    <td>{{ movie.Genre.name }}</td>
    <td>{{ movie.User.email }}</td>
    <td>
      <select
        v-if="role === 'admin'"
        name="Status"
        id=""
        v-on:change="updateStatusHandler(movie.id, $event)"
      >
        <option
          v-for="status in optionStatus"
          :value="status"
          :selected="movie.status === status"
        >
          {{ status }}
        </option>
      </select>
      <span v-if="role !== 'admin'">{{ movie.status }} </span>
    </td>
    <td>
      <a
        v-if="role === 'admin' || movie.authorId == idUser"
        href=""
        class="ms-3 btn btn-info"
        v-on:click.prevent="editMovieHandler(movie.id)"
        >Edit</a
      >
    </td>
  </tr>

  <tr v-if="table === 'genres'" v-for="(genre, index) in genres" :key="index">
    <td scope="row">{{ index + 1 }}</td>
    <td class="fw-bold">{{ genre.name }}</td>
    <td>
      <a
        href=""
        class="ms-3 btn btn-info"
        v-on:click.prevent="editGenreHandler(genre.name, genre.id)"
        >EDIT</a
      >
    </td>
    <td>
      <a
        href=""
        class="ms-3 btn btn-danger"
        v-on:click.prevent="deleteGenreHandler(genre.id, genre.name)"
        >DELETE
      </a>
    </td>
  </tr>

  <tr v-if="table === 'logs'" v-for="(log, index) in logs" :key="index">
    <td scope="row">#{{ index + 1 }}</td>
    <td class="fw-bold">{{ log.title }}</td>

    <td>{{ log.description }}</td>
    <td>
      {{ new Date(log.createdAt).toLocaleString() }}
    </td>
    <td>
      {{ log.updatedBy }}
    </td>
  </tr>
</template>

<style>
img {
  width: 50px;
}
</style>
