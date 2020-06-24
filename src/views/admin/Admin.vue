<template>
  <div id="admin">
    <router-view />
  </div>
</template>
<script>
import Axios from 'axios';

    export default {
        name: 'Admin',
        data() {
            return {

            }
        },

        beforeMount(){
          if(typeof localStorage.getItem("ccbc_token") !== 'undefined'  && localStorage.getItem("ccbc_token") !== null && localStorage.getItem("ccbc_token") !== ""){
            this.$store.dispatch('setAuthenticated', true);
            this.$store.dispatch('setUser', JSON.parse(localStorage.getItem("ccbc_token")).user);
            this.$store.dispatch('setToken', JSON.parse(localStorage.getItem("ccbc_token")).token);
          }

          if(!this.$store.getters.isAuthenticated){
            this.$router.replace("/admin/login");
          }
          else {
            this.$router.replace("/admin");
          }

        },


        methods: {
            logout(){
              this.$store.dispatch('logout');
            }
        }
    }
</script>
