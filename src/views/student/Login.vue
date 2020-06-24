<template>
  <div class="row no-gutters align-content-center" id="loginBody">
    <div class="loginOverlay" v-if="logginIn">
      <b-spinner variant="primary"></b-spinner>
    </div>
    <div class="col-sm justify-content-center align-items-center align-content-center">
      <img src="../../assets/images/comteq_logo.png" id="loginComteqLogo" alt="COMTEQ LOGO">
      <h1>Online Enrollment</h1>
    </div>
    <b-form class="col-sm justify-content-center align-items-center" method="post" v-on:submit.prevent="login">
      <div class="container" id="loginContainer">
        <h1>Login</h1>
        <b-alert variant="danger" v-model="hasError">{{loginMessage}}</b-alert>
        <b-form-group
          class="mb-3"
          label="Username:"
          label-for="username">
            <b-form-input
              type="text"
              id="username"
              v-model="input.username"
              placeholder="username">
            </b-form-input>
        </b-form-group>
        <b-form-group
          class="mb-4"
          label="Password:"
          label-for="Password">
            <b-form-input
              type="password"
              id="password"
              v-model="input.password"
              placeholder="password">
            </b-form-input>
        </b-form-group>
        <b-form-group>
            <b-button block class="mb-3" type="submit" id="LoginBtn" name="loginbtn" v-on:click="login()" variant="primary" v-bind:disabled="logginIn">Login</b-button>
            <p>Reset password
              <strong>
                  <router-link  to="/reset_password"><a>here.</a></router-link>
              </strong>
            </p>
        </b-form-group>
      </div>
    </b-form>
  </div>
</template>
<script>
  import Axios from "axios";
  const baseUrl = "http://localhost/api/v1/";

  export default {
    name: 'StudentLogin',
    data() {
      return {
        systemTitle: this.$store.state.systemTitle,
        input: {
          username: "",
          password: ""
        },
        logginIn: false,
        loginMessage: "",
        hasError: false,
      }
    },

    beforeMount(){
      if(this.$store.state.studentAuthenticated){
        this.$router.replace("/dashboard/student/profile");
      }
    },
    mounted(){

      this.toggleBodyClass('removeClass', 'nav-md');
    },
    destroyed(){
      this.toggleBodyClass('addClass', 'nav-md');
    },
    methods: {
      toggleBodyClass(addRemoveClass, className){
        const el = document.body;
        if(addRemoveClass === 'addClass'){
          el.classList.add(className);
        }else{
          el.classList.remove(className);
        }
      },
      login(){
        /*TODO: Limit login attempt to three times
                after which the account must be blocked.
                A password reset request will be sent to
                the system administrator. */
        this.logginIn = true;
        Axios.post(baseUrl + "login", {username: this.input.username, password: this.input.password})
        .then(response => {
          if(response.data.user.role != "Student"){
            //save user details in localStorage
            localStorage.setItem('ccbc_token', JSON.stringify({ user: response.data.user, token: response.data.token}));
            //save token in store
            this.$store.dispatch('setToken', response.data.token);
            //set global state authenticated to true
            this.$store.dispatch('setAuthenticated', true);
            //save state user in store
            this.$store.dispatch('setUser', response.data.user);
            //redirect page to admin page
            this.$router.replace("/admin");
          }else{
            //save user details in localStorage
            localStorage.setItem('ccbc_token', JSON.stringify({ user: response.data.user, token: response.data.token}));
            //save token in store
            this.$store.dispatch('setStudentToken', response.data.token);
            //set global state authenticated to true
            this.$store.dispatch('setStudentAuthenticated', true);
            //save state user in store
            this.$store.dispatch('setStudentUser', response.data.user);
            //redirect page to admin page
            this.$router.replace("/dashboard/student/profile");
          }
        })
        .catch(error => {
          this.logginIn = false;
          // if(error.response.status==401){
          //   this.hasError = true;
          //   this.loginMessage = "Invalid username or password. " + error.response.data.message;
          // }
          this.hasError = true;
          this.loginMessage = error.response.data.message;
        });
      }
    }
  }
</script>
