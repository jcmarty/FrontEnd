<template>
<div class="container body">
  <div class="main_container">
    <SideMenu />
    <Header />
    <!-- The Modal -->
    <div class="modal Account_Settings" id="AccountSettings" tabindex="1" data-backdrop="static" >
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Account Settings</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body" id="accountSetting">
            <form>
              <div class="form-group">
                <label for="FirstName">First Name:</label>
                <input type="text" class="form-control" id="FirstName" aria-describedby="emailHelp" placeholder="First Name" required>
              </div>
              <div class="form-group">
                <label for="MiddleName">Middle Name:</label>
                <input type="text" class="form-control" id="MiddleName" placeholder="Middle Name" required>
              </div>
              <div class="form-group">
                <label for="LastName">Last Name:</label>
                <input type="text" class="form-control" id="LastName" placeholder="Last Name" required>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-success pull-right" data-toggle="modal" data-dismiss="modal" data-target="#Update_Account_Settings">Update</button>
                <button type="button" class="btn btn-warning" data-toggle="modal" data-dismiss="modal"  data-target="#ChangePassword">Change Password</button>
              </div>
          </form>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancel</button>
          </div>

        </div>
      </div>
    </div>

    <!-- The Modal edit -->
    <div class="modal modal-xl" id="Update_Account_Settings" tabindex="-1" role="dialog" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content" id="Update_Account_Settings_Content">

          <div class="modal-body">
            <center><h3>Are you sure you want to update?</h3></center>
            <button type="button" class="btn btn-danger btn-md "   data-dismiss="modal" id="NoUpdate" data-toggle="modal" data-target="#AccountSettings">No</button>
            <button type="button" class="btn btn-success btn-md  pull-right" data-dismiss="modal" name="YesAccount" id="YesUpdate">Yes</button>
          </div>
        </div>
      </div>
    </div>
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
          if(!this.$store.state.authenticated){
            this.$router.replace("/admin/login");
          }
        },
        mounted(){
          // get system settings (includes current ay and sem)
          // and store in Vue store
          this.getSettings();
          this.$store.dispatch('loadAcademicYears', this.$store.getters.getToken);
          this.$store.dispatch('loadSemesters', this.$store.getters.getToken);
          this.$store.dispatch('loadRooms', this.$store.getters.getToken);
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
