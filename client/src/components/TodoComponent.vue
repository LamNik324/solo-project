<template>
  <div v-if="todos.length > 0" class="container mb-4 ">
    <div class="form-group">
      <label for="title">
        <h2 class>Create New Todo</h2>
        <h4>Title</h4>
      </label>
      <input
        type="title"
        v-model="title"
        class="form-control mb-4"
        aria-describedby="Write your title"
      />
      <small class="form-text text-muted">Когда-нибудь тебе придется это сделать))0)</small>
      <label for="text">
        <h4 class="mt-3">Text</h4>
      </label>
      <input type="text" v-model="text" class="form-control" aria-describedby="Write your text" />
      <a class="btn btn-info mt-4" v-on:click="createTodo">Create</a>
    </div>
    <h1 class="display-4 mb-4">Latest Todos</h1>

    <div>
      <div
        class="border border-warning my-4 col justify-content-center alert-warning"
        v-for="(todo) in todos"
        v-bind:item="todo"
        v-bind:key="todo._id"
        v-bind:id="todo._id"
      >
        <p
          class="lead"
        >{{`${todo.createdAt.getHours()}:${todo.createdAt.getMinutes()} ${todo.createdAt.getDate()}/${todo.createdAt.getMonth()}/${todo.createdAt.getFullYear()}`}}</p>
        <hr class="my-4" />
        <h2 class="display-4 alert alert-primary">{{todo.title}}</h2>
        <h4>{{todo.text}}</h4>
        <div v-if="todo.progress < 0" class="container alert-danger">
          <h3>Ты старался пирожок )</h3>
        </div>
        <div v-if="todo.progress < 100 && todo.progress >= 0" class="container">
          <div class="progress mb-4">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated justify-content-center"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="'width:' + todo.progress + '%'"
            >In progress</div>
          </div>
          <label for="text">
            <h4 v-if="todo.progress < 100 && todo.progress >= 0" class="mt-1">How much is done?</h4>
          </label>
          <br />
          <a
            v-if="todo.progress < 100 && todo.progress >= 0"
            class="btn btn-success mt-4 mr-3 text-light"
            v-on:click="addProgress(todo._id)"
          >Progres on 25%</a>
          <a
            v-if="todo.progress < 100 && todo.progress >= 0"
            class="btn btn-warning mt-4 ml-3 text-light"
            v-on:click="deleteProgress(todo._id)"
          >Regress on 25%</a>
        </div>
        <div v-else-if="todo.progress >= 100" class="container alert-success">
          <h4>Солнце, ты сделал это)</h4>
        </div>
        <p class="lead">
          <a
            class="btn btn-danger btn-lg mt-4 mr-3 text-dark"
            v-on:click="deleteTodo(todo._id)"
            role="button"
          >Delete</a>
          <a
            v-on:click="done(todo._id)"
            v-if="todo.progress < 100"
            class="btn btn-success btn-lg mt-4 ml-3 text-dark"
            role="button"
          >Done</a>
        </p>
      </div>
      <hr class="my-4" />
    </div>
    <h3>Hello, I'm your task manager Ulutbek, if you wanna get your tasks on email, click bottom below.</h3>
              <a
            v-on:click="sendMessage()"
            class="btn btn-success btn-lg mt-4 ml-3"
            role="button"
          >Send Message</a>
  </div>
  <div v-else class="container mb-4">
    <div class="form-group">
      <label for="title">
        <h2 class>Create New Todo</h2>
        <h4>Title</h4>
      </label>
      <input
        type="title"
        v-model="title"
        class="form-control mb-4"
        aria-describedby="Write your title"
      />
      <small class="form-text text-muted">Когда-нибудь тебе придется это сделать))0)</small>
      <label for="text">
        <h4 class="mt-3">Text</h4>
      </label>
      <input type="text" v-model="text" class="form-control" aria-describedby="Write your text" />
      <a class="btn btn-info mt-4" v-on:click="createTodo">Create</a>
    </div>
    <div>
      <h1 class="text-warning display-2">Sorry, your todos is empty :(</h1>
    </div>
  </div>
</template>

<script>
import TodoService from "../TodoService";

export default {
  name: "TodoComponent",
  data() {
    return {
      todos: [],
      error: "",
      title: "",
      text: "",
      id: "",
      loading: true,
      // progress,
    };
  },
  async created() {
    try {
      this.todos = await TodoService.getTodos();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createTodo() {
      await TodoService.createTodo(this.text, this.title);
      this.todos = await TodoService.getTodos();
      this.text = "";
      this.title = "";
    },
    async deleteTodo(id) {
      await TodoService.deleteTodo(id);
      this.todos = await TodoService.getTodos();
    },
    async addProgress(id) {
      await TodoService.addProgress(id);
      this.progress += 25;
      this.todos = await TodoService.getTodos();
    },
    async deleteProgress(id) {
      await TodoService.deleteProgress(id);
      this.progress -= 25;
      this.todos = await TodoService.getTodos();
    },
    async done(id) {
      await TodoService.done(id);
      this.progress += 1000;
      this.todos = await TodoService.getTodos();
    },
    async sendMessage() {
      await TodoService.sendMessage()
      this.todos = await TodoService.getTodos();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.done {
  background-image: url("../../public/done.jpg");
  opacity: 0.5;
  z-index: 2;
  /* background-size: 100%; */
  transform: translateY((-1500px));
}
</style>
