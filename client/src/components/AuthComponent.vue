<template>
  <div id="auth">
    <div class="container">
      <button v-on:click="destroy" class="btn btn-warning">Logout from {{name}}</button>
    </div>
    <div class="row justify-content-md-center mt-5">
      <h2 class="display-2 text-primary">Name of application!</h2>
    </div>
    <!-- <div class="row justify-content-md-center mt-5 text-danger">Don't same password!</div> -->
    <div class="row justify-content-md-center mt-5">
      <form method="POST">
        <!-- name -->
        <div class="form-group">
          <label for="name">Your name</label>
          <input
            v-model="name"
            required
            type="text"
            class="form-control"
            name="name"
            id="name"
            aria-describedby="Name"
          />
        </div>
        <!-- email -->
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            v-model="email"
            required
            type="email"
            class="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else. May be
            ;)
          </small>
        </div>
        <!-- password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            required
            type="password"
            name="password"
            class="form-control"
            id="password"
          />
        </div>
        <!-- PASSWORD repeat -->
        <div class="form-group">
          <label for="passwordRepeat">Repeat Password</label>
          <input
            v-model="passwordRepeat"
            required
            type="password"
            name="passwordRepeat"
            class="form-control"
            id="passwordRepeat"
          />
        </div>
        <button type="submit" v-on:click="postReg" class="btn btn-success w-100">Submit</button>
        <!-- <a class="w-100 btn btn-primary mt-2" href="/login">Login</a> -->
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "AuthComponent",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      show: true,
    };
  },
  methods: {
    postReg: async function (e) {
      
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat,
      };
      this.show = false;
      e.preventDefault();
      return await axios
        .post("http://localhost:9989/registration", {
          body: data,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    },
    destroy: function () {
      localStorage.clear();
      this.$router.go()
    },
  },
  // mounted() {
  //   if (localStorage.name) {
  //     this.name = localStorage.name;
  //   }
  // },
  watch: {
    name(newName) {
      this.name = newName
      localStorage.name = newName;
    },
  },
};
</script>
