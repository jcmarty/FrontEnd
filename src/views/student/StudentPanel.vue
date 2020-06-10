<template>
  <div class="">
    <DashboardHeader />
    <SideMenu />
  </div>
</template>

<script>
  import Axios from "axios";
  import SideMenu from '../../components/student/student_sidebar.vue';
  import DashboardHeader from '../../components/student/student_header.vue';
  export default{
    name: 'studentDashboard',

    components: {
      SideMenu, DashboardHeader
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
