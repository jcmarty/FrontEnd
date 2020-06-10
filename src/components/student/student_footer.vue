<template>
  <div>
    <div class="dash_footer">
      <span>Registration System Developed by COMTEQ Students | {{current_year}}</span>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";
  export default{
    name: '',

    data() {
      return {
        current_year : "",
      }
    }, // End of Data

    mounted () {
      var d = new Date();
      this.current_year = d.getFullYear();
    }, // End of Mounted

    methods:{

    } // End of Methods

  } //End of Export Default
</script>
<style scoped>
  .dash_footer{
    background: white;
    position: fixed;
    left: 0;
    bottom: 0;
    margin-left: 220px;
    padding: 10px;
    width: calc(100vw - 220px);
    height: 45px;
    text-align: center;
    border-top: 2px solid #1b56f3;
  }

  .dash_footer span{
    font-size: 10pt;
    font-weight: 700;
  }

</style>
