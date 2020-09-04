<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->

    <!-- <AuthComponent /> -->
    <Loader v-if="loading" />
    <TodoComponent v-else />
  </div>
</template>

<script>
import TodoComponent from "./components/TodoComponent.vue";
import Loader from "./components/Loader.vue"
// import AuthComponent from "./components/AuthComponent.vue";

export default {
  name: "App",
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }, 
  components: {
    TodoComponent,
    Loader,
    // AuthComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
