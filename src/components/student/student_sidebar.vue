<template>
  <div>
    <div class="dash_sidebar">
      <!-- add image here -->
      <center>
        <img class="profile_image" src="https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png" alt="">
        <h5>John Christopher L. Marty</h5>
      </center>
      <a href="#"><i class="fa fa-user" aria-hidden="true"/><span>Profile</span></a>
      <a href="#"><i class="fa fa-book" aria-hidden="true"/><span>Enrollment</span></a>
      <a href="#"><i class="fa fa-calendar" aria-hidden="true"/><span>Schedule</span></a>
      <a href="#"><i class="fa fa-cog" aria-hidden="true"/><span>Account Setting</span></a>
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

    }, // End of Mounted

    methods:{

    } // End of Methods

  } //End of Export Default
</script>

<style scoped>

  .dash_sidebar{
    background: #1b56f3;
    padding-top: 30px;
    position: fixed;
    left: 0;
    width: 220px;
    height: 100%;
  }

  .dash_sidebar .profile_image{
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-bottom: 20px;
  }

  .dash_sidebar h5{
    color: white;
    margin-top: 0;
    margin-bottom: 20px;
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
  }

  .dash_sidebar a:hover{
    font-weight: 500;
    border-right: 3px solid #1b56f3;
    background: white;
    color: #1b56f3;
  }

  .dash_sidebar i{
    padding-right: 10px;
  }




</style>
