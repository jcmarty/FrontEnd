<template>
  <div>
    <div class="dash_sidebar" id="dashboard_sidebar">
      <center>
        <!-- add image here -->
        <!-- <img class="profile_image" src="https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png" alt="">
        <h5>John Christopher L. Marty</h5> -->
        <span>Student <br/>
           Dashboard
         </span>
      </center>
      <!-- <router-link tag="li" to="/dashboard/student/account_setting"><a>Requirements Testing</a></router-link> -->
      <a class="dash_navs active" @click="$router.replace({name: 'StudentProfile'})" to="/dashboard/student/profile" href="#"><i class="fa fa-user" aria-hidden="true"/><span>Profile</span></a>
      <a class="dash_navs" @click="$router.replace({name: 'StudentOnlineEnrollment'})" href="#"><i class="fa fa-book" aria-hidden="true"/><span>Enrollment</span></a>
      <a class="dash_navs" href="#"><i class="fa fa-info pr-3" aria-hidden="true"/><span>Assesment</span></a>
      <a class="dash_navs" @click="showAccountSettingModal" href="#"><i class="fa fa-cog" aria-hidden="true"/><span>Account Setting</span></a>
    </div>

    <b-modal id="accountSettingModal" ref="accountSettingModal" title="Account Settings" size="sm" no-close-on-backdrop>

    <!-- First Name -->
    <b-form-row>
      <b-col cols="12" md="6" lg="12">
        <b-form-group
          :class="{'text-danger' : $v.account_info.student_username.$error}"
          label="Username"
          label-for="username">
          <b-form-input
            type="text"
            id="username"
            v-model.trim="$v.account_info.student_username.$model"
            :class="{'is-invalid' :$v.account_info.student_username.$error}">
          </b-form-input>
          <div class="invalid-feedback">
            <span v-if="!$v.account_info.student_username.required">Username is required!</span>
          </div>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="12">
        <b-form-group
          :class="{'text-danger' : $v.account_info.student_password.$error}"
          label="Old Password"
          label-for="old_password">
          <b-form-input
            type="text"
            id="old_password"
            v-model.trim="$v.account_info.student_password.$model"
            :class="{'is-invalid' :$v.account_info.student_password.$error}">
          </b-form-input>
          <div class="invalid-feedback">
            <span v-if="!$v.account_info.student_password.required">Civil Status is required!</span>
          </div>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="12">
        <b-form-group
          :class="{'text-danger' : $v.account_info.student_new_password.$error}"
          label="New Password"
          label-for="new_password">
          <b-form-input
            type="text"
            id="new_password"
            v-model.trim="$v.account_info.student_new_password.$model"
            :class="{'is-invalid' :$v.account_info.student_new_password.$error}">
          </b-form-input>
          <div class="invalid-feedback">
            <span v-if="!$v.account_info.student_new_password.required">Civil Status is required!</span>
          </div>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="12">
        <b-form-group
          :class="{'text-danger' : $v.account_info.student_confirm_password.$error}"
          label="Confirm Password"
          label-for="confirm_password">
          <b-form-input
            type="text"
            id="confirm_password"
            v-model.trim="$v.account_info.student_confirm_password.$model"
            :class="{'is-invalid' :$v.account_info.student_confirm_password.$error}">
          </b-form-input>
          <div class="invalid-feedback">
            <span v-if="!$v.account_info.student_confirm_password.required">Civil Status is required!</span>
          </div>
        </b-form-group>
      </b-col>
    </b-form-row>

      <!-- Modal Footer Template -->
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-col>
        <b-button class="float-left"  variant="danger" @click="hideAccountSettingModal">
          Cancel
        </b-button>
        <b-button class="float-right"  variant="success" @click="">
          Update
        </b-button>
      </b-col>
      </template>

    </b-modal> <!-- End of Edit settings -->

  </div>
</template>

<script>
  import Axios from "axios";
  import { required, minLength, between, sameAs, email } from 'vuelidate/lib/validators';
  export default{
    name: '',

    data() {
      return {
        account_info : {
          student_username: "",
          student_password: "",
          student_new_password: "",
          student_confirm_password: ""
        },
      }
    }, // End of Data

    validations: {
       account_info:{
         student_username: {required},
         student_password: {required},
         student_new_password: {required},
         student_confirm_password: {required},
       }
    }, // End of Data

    mounted () {
      this.activeState();
      this.$router.replace({name: 'StudentProfile'})
    }, // End of Mounted

    methods:{
      showAccountSettingModal(){
        this.$refs['accountSettingModal'].show();
      },

      hideAccountSettingModal(){
        this.$refs['accountSettingModal'].hide();
      },

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
    padding-top: 30px;
    position: fixed;
    left: 0;
    top: 0;
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

  .dash_sidebar center span{
    color: white;
    font-size: 14pt;
    font-weight: bold;
    text-transform: uppercase;
  }

  .dash_sidebar center {
    margin-bottom: 30px;
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
    /* padding-left: 50px;*/
    font-weight: bold;
    border-right: 4px solid #1b56f3;
    background: white;
    color: #1b56f3;
  }

  .dash_sidebar i{
    padding-right: 10px;
  }




</style>
