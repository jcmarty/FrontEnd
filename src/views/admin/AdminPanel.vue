<template>
<div class="container body">
  <div class="main_container">
    <SideMenu />
    <Header />
    <div class="right_col" role="main">
        <div class="clearfix"></div>
        <router-view></router-view>
    </div>
    <Footer />
</div>
</div>
</template>
<script>
    import SideMenu from '../../components/admin/SideMenu.vue';
    import Header from '../../components/admin/Header.vue';
    import Footer from '../../components/admin/Footer.vue';
    import Axios from "axios";
    const baseUrl = "http://localhost/api/v1/";
    export default {
        name: 'Admin',
        components:{
          SideMenu,
          Header,
          Footer
        },
        data() {
            return {};
        },

        beforeMount(){
          // get system settings (includes current ay and sem)
          // and store in Vue store
          this.getSettings();
          this.$store.dispatch('loadAcademicYears', this.$store.getters.getToken);
          this.$store.dispatch('loadSemesters', this.$store.getters.getToken);
          this.$store.dispatch('loadRooms', this.$store.getters.getToken);
          this.$store.dispatch('loadCourses', this.$store.getters.getToken);
        },


        methods: {
          // get all settng from db
          getSettings: function(){
            Axios.get(baseUrl + "settings", {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
                this.$store.dispatch('setAppSettings', response.data);
                console.log(response.data);
            });
          }, // end of function getSettings

        },
    }
</script>
