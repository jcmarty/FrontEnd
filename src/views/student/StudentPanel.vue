<template>
  <div class="dash_content">
    <DashboardHeader class="dash_header"/>
    <DashboardSideBar class="dash_sidebar"/>

    <div class="dash_body_content">
      <router-view />
      <!-- asdljaslkdj -->
    </div>
    <DashboardFooter class="dash_footer"/>
  </div>
</template>

<script>
  import Axios from "axios";
  import DashboardSideBar from '../../components/student/student_sidebar.vue';
  import DashboardHeader from '../../components/student/student_header.vue';
  import DashboardFooter from '../../components/student/student_footer.vue';
  export default{
    name: 'StudentDashboard',

    components: {
      DashboardSideBar, DashboardHeader, DashboardFooter
    },

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
  .dash_body_content{
    background: #fff;
    margin-left: 220px;
    margin-top: 55px;
    min-height: calc(100vh);
    height: auto;
    padding: 20px 30px 50px 30px;
  }
</style>
