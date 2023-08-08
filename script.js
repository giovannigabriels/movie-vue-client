const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hello Vue!",
      urlBase: "http://localhost:3001",
      page: "landing",
      isLogin: false,
      dataLogin: {
        email: "",
        password: "",
      },
      dataRegister: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
      movies: [],
      genres: [],
      logs: [],
      genreId: "",
      formEditGenre: {},
      movieId: "",
      updateStat: "",
      formEditMovie: {
        title: "",
        synopsis: "",
        genreId: "",
        rating: "",
        imgUrl: "",
        trailerUrl: "",
      },
      optionStatus: ["active", "inactive", "archived"],
      selectedStatus: "",
      addMovie: {
        title: "",
        synopsis: "",
        imgUrl: "",
        trailerUrl: "",
        rating: "",
        genreId: "",
      },
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
    } else {
      this.changePage("landing");
      this.isLogin = false;
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    async login() {
      try {
        const body = this.dataLogin;

        const data = await axios({
          url: `${this.urlBase}/users/login`,
          method: "post",
          data: body,
        });
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("username", data.data.user.username);
        this.username = localStorage.username;
        this.changePage("dashboard");
        this.isLogin = true;
        this.fetchMovie();
      } catch (error) {
        console.log(error);
      }
    },
    async register() {
      try {
        const body = this.dataRegister;

        const data = await axios({
          url: `${this.urlBase}/users/register`,
          method: "post",
          data: body,
        });
        console.log(body);
      } catch (error) {
        console.log(error);
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
        console.log(data.data);
      } catch (error) {
        console.log(error);
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
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async submitMovie() {
      try {
        const body = this.addMovie;
        await axios({
          url: `${this.urlBase}/movies`,
          method: "post",
          headers: {
            access_token: localStorage.access_token,
          },
          data: body,
        });
        console.log(body);
        this.fetchMovie();
      } catch (error) {
        console.log(error);
      }
    },
    async submitGenre() {
      try {
        const body = this.addGenre;
        await axios({
          url: `${this.urlBase}/genres`,
          method: "post",
          headers: {
            access_token: localStorage.access_token,
          },
          data: body,
        });
        console.log(body);
        this.fetchGenre();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGenre() {
      try {
        const id = this.genreId;
        await axios({
          url: `${this.urlBase}/genres/${id}`,
          method: "delete",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchGenre();
      } catch (error) {
        console.log(error);
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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async editGenre() {
      try {
        const id = this.genreId;
        const body = this.formEditGenre;
        const data = await axios({
          url: `${this.urlBase}/genres/${id}`,
          method: "put",
          headers: {
            access_token: localStorage.access_token,
          },
          data: body,
        });
        this.fetchGenre();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async findOneMovie(id) {
      try {
        const data = await axios({
          url: `${this.urlBase}/movies/${id}`,
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        // this.formEditMovie = data.data;
        this.formEditMovie.title = data.data.title;
        this.formEditMovie.synopsis = data.data.synopsis;
        this.formEditMovie.genreId = data.data.genreId;
        this.formEditMovie.rating = data.data.rating;
        this.formEditMovie.imgUrl = data.data.imgUrl;
        this.formEditMovie.trailerUrl = data.data.trailerUrl;
      } catch (error) {
        console.log(error);
      }
    },
    async editMovie() {
      try {
        const id = this.movieId;
        const body = this.formEditMovie;
        const data = await axios({
          url: `${this.urlBase}/movies/${id}`,
          method: "put",
          headers: {
            access_token: localStorage.access_token,
          },
          data: body,
        });
        this.fetchMovie();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatus(id) {
      try {
        const body = this.updateStat;
        console.log(id);
        console.log(body);
        await axios({
          url: `${this.urlBase}/movies/${id}`,
          method: "patch",
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            status: body,
          },
        });
        this.fetchMovie();
      } catch (error) {
        console.log(error);
      }
    },
    signInHandler() {
      this.changePage("login");
    },
    loginHandler() {
      this.login();
    },
    signUpHandler() {
      this.changePage("register");
    },
    registerHandler() {
      this.changePage("login");
      this.register();
    },
    dashboardHandler() {
      this.changePage("dashboard");
    },
    movieHandler() {
      this.changePage("movie");
      this.fetchGenre();
      this.fetchMovie();
    },
    genreHandler() {
      this.changePage("genre");
    },
    logHandler() {
      this.changePage("logs");
      this.fetchLogs();
    },
    logoutHandler() {
      this.changePage("login");
      this.isLogin = false;
      localStorage.clear();
    },
    addMovieHandler() {
      this.changePage("createmovie");
    },
    submitAddMovieHandler() {
      this.changePage("movie");
      this.submitMovie();
    },
    cancelAddMovieHandler() {
      this.changePage("movie");
    },
    addGenreHandler() {
      this.changePage("creategenre");
      this.formEditGenre.name = "";
    },
    cancelAddGenre() {
      this.changePage("genre");
    },
    submitAddGenre() {
      this.changePage("genre");
      this.submitGenre();
    },
    deleteGenreHandler(id) {
      this.genreId = id;
      this.deleteGenre();
      this.changePage("genre");
    },
    editGenreHandler(name, id) {
      this.formEditGenre.name = name;
      this.genreId = id;
      this.changePage("editGenreForm");
    },
    submitEditGenre() {
      this.editGenre();
      this.changePage("genre");
    },
    editMovieHandler(id) {
      this.movieId = id;
      this.findOneMovie(id);
      this.changePage("editmovie");
    },
    cancelEditAddMovieHandler() {
      this.fetchMovie();
      this.changePage("movie");
      this.formEditMovie.title = {};
    },
    submitEditMovieHandler() {
      this.editMovie();
      this.changePage("movie");
    },
    updateStatusHandler(id, val) {
      console.log(val.target.value, "ini val");
      console.log(id);
      this.updateStat = val.target.value;
      this.updateStatus(id);
    },
  },
}).mount("#app");
