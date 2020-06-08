<template>
  <div>
    <div class="dash_sidebar">
      <!-- add image here -->
      <a href="#"><span>Profile</span></a>
      <a href="#"><span>Enrollment</span></a>
      <a href="#"><span>Schedule</span></a>
      <a href="#"><span>Account Setting</span></a>
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
    background: rgb(27, 86, 243);
    margin-top: 70px;
    padding-top: 30px;
    position: fixed;
    left: 0;
    width: 230px;
    height: 100%;
  }

  .dash_sidebar a{
    color: #fff;
    display: block;
    width: 100%;
    line-height: 60px;
    text-decoration: none;
    padding-left: 40px;
    box-sizing: border-box;
    transition:  0.5s;
    transition-property: background;
  }

  .dash_sidebar a:hover{
    background: white;
    color: rgb(27, 86, 243);;
  }


</style>
