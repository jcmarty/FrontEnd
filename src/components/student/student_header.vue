<template>
  <div>
    <div class="dash_header">
      <div class="dash_logo">
        <img src="https://www.comteq.edu.ph/portal/student/www/image/comteq_logo3.png" alt="Comteq Logo">
      </div>
      <div class="dash_logout">
        <b-button  class="dash_logout_btn" size="sm" variant="primary" href="">
            Logout
        </b-button>
      </div>
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

  .dash_header {
    background: white;
    position: fixed;
    left: 0;
    margin-left: 220px;
    padding-left: 10px;
    width: 100%;
    height: 55px;
  }

  .dash_header .dash_logo img{
    width: 135px;
    height: auto;
  }

  .dash_header .dash_logout .dash_logout_btn{
    float: right;
  }

</style>
