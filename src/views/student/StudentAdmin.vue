<template>
  <div id="student_id">
    <router-view />
  </div>
</template>
<script>
import Axios from 'axios';

    export default {
        name: 'StudentAdmin',
        data() {
            return {

            }
        },

        beforeMount(){
          if(typeof localStorage.getItem("ccbc_token") !== 'undefined'  && localStorage.getItem("ccbc_token") !== null && localStorage.getItem("ccbc_token") !== ""){
            this.$store.dispatch('setStudentAuthenticated', true);
            this.$store.dispatch('setStudentUser', JSON.parse(localStorage.getItem("ccbc_token")).user);
            this.$store.dispatch('setStudentToken', JSON.parse(localStorage.getItem("ccbc_token")).token);
          }

          if(!this.$store.getters.isStudentAuthenticated){
            this.$router.replace("/student/login");
          }
          else {
            this.$router.replace("/dashboard/student/profile");
          }

        },


        methods: {
            logout(){
              this.$store.dispatch('logout');
            }
        }
    }
</script>
