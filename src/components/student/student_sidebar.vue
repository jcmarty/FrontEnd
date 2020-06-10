<template>
  <div>
    <div class="dash_sidebar" id="dashboard_sidebar">
      <!-- add image here -->
      <center>
        <img class="profile_image" src="https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png" alt="">
        <h5>John Christopher L. Marty</h5>
      </center>
      <!-- <router-link tag="li" to="/dashboard/student/account_setting"><a>Requirements Testing</a></router-link> -->
      <a class="dash_navs active" @click="$router.replace({name: 'StudentProfile'})" to="/dashboard/student/profile" href="#"><i class="fa fa-user" aria-hidden="true"/><span>Profile</span></a>
      <a class="dash_navs" href="#"><i class="fa fa-book" aria-hidden="true"/><span>Enrollment</span></a>
      <a class="dash_navs" href="#"><i class="fa fa-calendar" aria-hidden="true"/><span>Schedule</span></a>
      <a class="dash_navs" @click="$router.replace({name: 'StudentAccountSetting'})" href="#"><i class="fa fa-cog" aria-hidden="true"/><span>Account Setting</span></a>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";
  export default{
    name: '',

    data() {
      return {

      }
    }, // End of Data

    mounted () {
      this.activeState();
      this.$router.replace({name: 'StudentProfile'})
    }, // End of Mounted

    methods:{
      activeState: function(target){
        // Get the container element
        var btnContainer = document.getElementById("dashboard_sidebar");

        // Get all buttons with class="btn" inside the container
        var navs = btnContainer.getElementsByClassName("dash_navs");

        // Loop through the buttons and add the active class to the current/clicked button
        for (var i = 0; i < navs.length; i++) {
          navs[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
          });
        }
      }, // activeState
    } // End of Methods

  } //End of Export Default
</script>

<style scoped>

  .dash_sidebar{
    background: #1b56f3;
    padding-top: 10px;
    position: fixed;
    left: 0;
    width: 220px;
    height: 100vh;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  }

  .dash_sidebar .profile_image{
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .dash_sidebar h5{
    color: white;
    margin-top: 0;
    margin-bottom: 30px;
  }

  .dash_sidebar a{
    color: #fff;
    display: block;
    width: 100%;
    line-height: 45px;
    text-decoration: none;
    padding-left: 30px;
    font-size: 11pt;
    box-sizing: border-box;
    transition:  0.3s;
    transition-property: background;
    cursor: pointer;
  }

  .dash_sidebar a:hover{
    /* padding-left: 50px;
    font-weight: bold; */
    border-right: 4px solid #1b56f3;
    background: white;
    color: #1b56f3;
  }

  .dash_sidebar .active{
    padding-left: 50px;
    font-weight: bold;
    border-right: 4px solid #1b56f3;
    background: white;
    color: #1b56f3;
  }

  .dash_sidebar i{
    padding-right: 10px;
  }




</style>
