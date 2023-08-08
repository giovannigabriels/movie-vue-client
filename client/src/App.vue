<script>
import axios from "axios";
import Navbar from "./components/Navbar.vue";
import LandingPage from "./components/LandingPage.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import HomePage from "./components/HomePage.vue";

export default {
  components: {
    HomePage,
    Navbar,
    LandingPage,
    Login,
    Register,
  },
  data() {
    return {
      message: "Hello Vue!",
      urlBase: "https://movie-vue-server-production.up.railway.app",
      page: "landing",
      isLogin: false,
      movies: [],
      genres: [],
      logs: [],
      genreId: "",
      movieId: "",
      role: "",
      idUser: "",
      formEditMovie: {
        title: "",
        synopsis: "",
        genreId: "",
        rating: "",
        imgUrl: "",
        trailerUrl: "",
      },
      optionStatus: ["active", "inactive", "archived"],
      addGenre: {
        name: "",
      },
      username: "",
    };
  },

  created() {
    if (localStorage.access_token) {
      this.changePage("dashboard");
      this.isLogin = true;
      this.fetchMovie();
      this.fetchGenre();
      this.fetchLogs();
      this.username = localStorage.username;
      this.role = localStorage.role;
      this.idUser = localStorage.id;
    } else {
      this.changePage("landing");
      this.isLogin = false;
    }
  },
  methods: {
    handleCredentialResponse(response) {
      const { credential } = response;
      axios({
        method: "POST",
        url: `${this.urlBase}/users/google-sign-in`, // Please fill with your backend url!
        headers: {
          google_token: credential,
        },
      })
        .then(({ data }) => {
          this.isLogin = true;
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("id", data.user.id);
          this.role = localStorage.role;
          this.idUser = localStorage.id;
          this.username = localStorage.username;
          this.changePage("dashboard");
          this.fetchMovie();
          this.fetchGenre();
          this.fetchLogs();
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Login With Google Success!",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: `${error.response.data.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    changePage(page) {
      this.page = page;
    },
    async login(payload) {
      try {
        const data = await axios({
          url: `${this.urlBase}/users/login`,
          method: "post",
          data: payload,
        });
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("username", data.data.user.username);
        localStorage.setItem("role", data.data.user.role);
        localStorage.setItem("id", data.data.user.id);
        this.role = localStorage.role;
        this.idUser = localStorage.id;
        this.username = localStorage.username;
        this.changePage("dashboard");
        this.isLogin = true;
        this.fetchMovie();
        this.fetchGenre();
        this.fetchLogs();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async register(payload) {
      try {
        const data = await axios({
          url: `${this.urlBase}/users/register`,
          method: "post",
          data: payload,
        });
        this.changePage("login");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Register Success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Oops...",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async fetchMovie() {
      try {
        const data = await axios({
          url: `${this.urlBase}/movies`,
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.movies = data.data;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async fetchGenre() {
      try {
        const data = await axios({
          url: `${this.urlBase}/genres`,
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.genres = data.data;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async submitMovie(payload) {
      try {
        await axios({
          url: `${this.urlBase}/movies`,
          method: "post",
          headers: {
            access_token: localStorage.access_token,
          },
          data: payload,
        });
        this.fetchMovie();
        this.changePage("movies");
        this.fetchLogs();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Add Movie ${payload.title} Success!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async submitGenre(payload) {
      try {
        await axios({
          url: `${this.urlBase}/genres`,
          method: "post",
          headers: {
            access_token: localStorage.access_token,
          },
          data: payload,
        });
        this.fetchGenre();
        this.changePage("genres");
        this.fetchLogs();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Add Genre ${payload.name} Success!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async deleteGenre(data) {
      try {
        const dataGen = await axios({
          url: `${this.urlBase}/genres/${data.id}`,
          method: "delete",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchGenre();
        this.changePage("genres");
        this.fetchLogs();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async fetchLogs() {
      try {
        const data = await axios({
          url: `${this.urlBase}/histories`,
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.logs = data.data;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async editGenre(val) {
      try {
        const id = val.id;
        const name = val.name;
        const data = await axios({
          url: `${this.urlBase}/genres/${id}`,
          method: "put",
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            name,
          },
        });
        this.fetchGenre();
        this.fetchMovie();
        this.changePage("genres");
        this.fetchLogs();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${data.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async findOneMovie(id) {
      try {
        this.movieId = id;
        const data = await axios({
          url: `${this.urlBase}/movies/${id}`,
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.formEditMovie.title = data.data.title;
        this.formEditMovie.synopsis = data.data.synopsis;
        this.formEditMovie.genreId = data.data.genreId;
        this.formEditMovie.rating = data.data.rating;
        this.formEditMovie.imgUrl = data.data.imgUrl;
        this.formEditMovie.trailerUrl = data.data.trailerUrl;
        this.changePage("editmovie");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async editMovie(val) {
      try {
        const id = this.movieId;
        const data = await axios({
          url: `${this.urlBase}/movies/${id}`,
          method: "put",
          headers: {
            access_token: localStorage.access_token,
          },
          data: val,
        });
        this.fetchMovie();
        this.changePage("movies");
        this.fetchLogs();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${data.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async updateStatus(payload) {
      try {
        const { id, status } = payload;
        const data = await axios({
          url: `${this.urlBase}/movies/${id}`,
          method: "patch",
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            status,
          },
        });
        this.fetchMovie();
        this.fetchLogs();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${data.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    logoutHandler() {
      Swal.fire({
        title: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.changePage("login");
          this.isLogin = false;
          localStorage.clear();
          Swal.fire({
            position: "top",
            icon: "success",
            title: `Logout Success!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
  },
};
</script>

<template>
  <!-- NAVBAR SECTION -->

  <div>
    <Navbar
      :username="username"
      :isLogin="isLogin"
      @logout="logoutHandler"
      @dashboard="changePage"
      @movies="changePage"
      @genres="changePage"
      @logs="changePage"
    />
  </div>
  <!-- END NAVBAR SECTION -->

  <!-- Landing Page Section -->
  <div v-if="page === 'landing'">
    <LandingPage @signIn="changePage" :isLogin="isLogin" />
  </div>
  <!-- END Landing Page Section -->

  <!-- Login Page Section -->
  <div v-show="page === 'login'">
    <Login
      @submitLogin="login"
      @toRegister="changePage"
      @handleCredentialResponse="handleCredentialResponse"
    />
  </div>
  <!-- END Login Page Section -->

  <!-- Register Page Section -->
  <section v-if="page === 'register'">
    <Register @submitRegister="register" @signIn="changePage" />
  </section>
  <!-- END Register Page Section -->

  <!-- HOME PAGE SECTION -->
  <HomePage
    :movies="movies"
    :page="page"
    :genres="genres"
    :logs="logs"
    :role="role"
    :idUser="idUser"
    :optionStatus="optionStatus"
    @toAddMovie="changePage"
    @submitAddMovie="submitMovie"
    @toAddGenre="changePage"
    @submitAddGenre="submitGenre"
    @cancelAddMovie="changePage"
    @cancelAddGenre="changePage"
    @deleteGenre="deleteGenre"
    @editMovieHandler="findOneMovie"
    :formEditMovie="formEditMovie"
    @submitEditMovie="editMovie"
    @cancelEditAddMovie="changePage"
    @updateStatus="updateStatus"
    @toEditGenre="changePage"
    @submitEditGenre="editGenre"
  />
</template>

<!-- END HOME PAGE SECTION -->

<style scoped>
* {
  margin: 0;
}

.nav-home {
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
}

.nav-menu {
  /* display: none; */
}

.app-home {
  margin-top: 10em;
  /* display: none; */
}

.login {
  border: solid 1px;
  /* border-color: black; */
  /* background: transparent; */
  background-color: black;
  padding: 15px;
  width: 25%;
  margin: auto;
  border-radius: 10px;
  margin-top: 150px;
  margin-bottom: 50px;
  /* display: none; */
}

.register {
  border: solid 1px;
  background-color: black;
  padding: 15px;
  width: 25%;
  margin: auto;
  border-radius: 10px;
  margin-top: 150px;
  margin-bottom: 50px;
  /* display: none; */
}

.table {
  margin-left: 150px;
  background-color: white;
}
/* .nav-menu {
  display: flex;
  justify-content: space-between;
} */

ul {
  display: flex;
  list-style: none;
  padding: 15px;
  margin-top: 50px;
  margin-bottom: 50px;
}
li {
  margin-left: 15px;
}

#dashboard-section {
  /* display: none; */
}
</style>
