<script>
export default {
  props: ["username", "isLogin"],
};
</script>

<template>
  <div>
    <div class="nav-home bg-white">
      <img id="image" src="../assets/icons8-netflix.svg" alt="NetPlix" />

      <div class="nav-menu" v-if="isLogin">
        <ul>
          <li class="nav-item">
            <a
              class="nav-link btn btn-primary"
              href=""
              id="nav-dashboard"
              v-on:click.prevent="$emit('dashboard', 'dashboard')"
            >
              Dashboard</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link btn btn-primary"
              href=""
              id="nav-product"
              v-on:click.prevent="$emit('movies', 'movies')"
            >
              Movies</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link btn btn-primary"
              href=""
              id="nav-category"
              v-on:click.prevent="$emit('genres', 'genres')"
            >
              Genres</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link btn btn-primary"
              href=""
              id="nav-logs"
              v-on:click.prevent="$emit('logs', 'logs')"
            >
              Logs</a
            >
          </li>
        </ul>
      </div>
      <div class="nav-menu" v-if="isLogin">
        <ul>
          <li class="nav-item">
            <a class="nav-link">
              Hej, <span id="username"></span>{{ username }}</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link btn btn-danger"
              href=""
              id="nav-logout"
              v-on:click.prevent="$emit('logout')"
            >
              Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.nav-home {
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
}

#image {
  width: 75px;
}

#signin {
  margin-right: 100px;
  margin-top: 25px;
  /* display: none; */
}

#logout {
  margin-right: 100px;
  margin-top: 25px;
  /* display: none; */
}
ul {
  display: flex;
  list-style: none;
  padding: 15px;
  margin-top: 50px;
  margin-bottom: 50px;
}

a {
  margin-left: 20px;
}
</style>
