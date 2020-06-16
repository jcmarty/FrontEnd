<template>
<!-- top navigation -->
<div class="top_nav d-print-none">
  <div class="nav_menu">
    <b-navbar>
        <div class="nav toggle">
          <a id="menu_toggle" v-on:click="swapClass()"><i class="fa fa-bars"></i></a>
        </div>

        <b-navbar-brand href="admin">
          <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="responsive"/>
        </b-navbar-brand>

        <b-navbar-nav>
          <!--  TODO:  Replace firstname with full name or role? -->

          <b-nav-item-dropdown :text="user_data.first_name + ' ' + user_data.last_name" right>
            <b-dropdown-item  @click="EditProfile" ><i class="fa fa-users pull-right"></i>Profile</b-dropdown-item>
            <b-dropdown-item  v-b-modal.ChangePasswordModal ><i class="fa fa-pencil pull-right"></i>Change Password</b-dropdown-item>
            <b-dropdown-item v-on:click="logout()"><i class="fa fa-sign-out pull-right"></i> Log Out</b-dropdown-item>

          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
  </div>

  <b-toast id="message" ref="message"  static no-auto-hide>
   {{alertMessage}}
 </b-toast>

  <b-modal id="confirmUpdateModal" ref="confirmUpdateModal" size="md" no-close-on-backdrop>
    <center><h6>Are you sure you want to update  <br/><b>{{this.profile_data.username}} ?</b></h6></center>

      <!-- Modal Footer Template -->
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button  class="float-left" variant="danger" @click="backModalUpdate">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="updateUserAccount">
            Yes
          </b-button>
        </b-col>
      </template>
  </b-modal>

  <!-- Start of Modal -->
  <b-modal id="ProfileModal" ref="ProfileModal" title="Profile" size="lg" no-close-on-backdrop>
    <b-form-row>
      <!-- user_dataname -->
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          :class="{'text-danger' : $v.profile_data.username.$error}"
          label="Username *"
          label-for="Username">
          <b-form-input
            type="text"
            id="Username"
            v-model.trim="$v.profile_data.username.$model"
            :class="{'is-invalid' :$v.profile_data.username.$error}">
          </b-form-input>
          <div class="invalid-feedback">
            <span v-if="!$v.profile_data.username.required">Username is required!</span>
          </div>
        </b-form-group>
      </b-col>

    <!-- Email -->
    <b-col cols="12" md="6" lg="8">
      <b-form-group
        :class="{'text-danger' : $v.profile_data.email.$error}"
        label="Email *"
        label-for="Email">
        <b-form-input
          type="text"
          id="Email"
          v-model.trim="$v.profile_data.email.$model"
          :class="{'is-invalid' :$v.profile_data.email.$error}">
        </b-form-input>
        <div class="invalid-feedback">
          <span v-if="!$v.profile_data.email.required">Email is required!</span>
          <span v-if="!$v.profile_data.email.email">You have entered an invalid email address!</span>
        </div>
      </b-form-group>
    </b-col>
  </b-form-row>

  <!-- First Name -->
  <b-form-row>
    <b-col cols="12" md="6" lg="4">
      <b-form-group
        :class="{'text-danger' : $v.profile_data.first_name.$error}"
        label="First Name *"
        label-for="firstName">
        <b-form-input
          type="text"
          id="firstName"
          v-model.trim="$v.profile_data.first_name.$model"
          :class="{'is-invalid' :$v.profile_data.first_name.$error}">
        </b-form-input>
        <div class="invalid-feedback">
          <span v-if="!$v.profile_data.first_name.required">First name is required!</span>
        </div>
      </b-form-group>
    </b-col>

    <!-- Middle Name -->
    <b-col cols="12" md="6" lg="4">
      <b-form-group
        class="middlename"
        label="Middle Name"
        label-for="middleName">
        <b-form-input
          type="text"
          id="middleName"
          v-model="profile_data.middle_name">
        </b-form-input>
      </b-form-group>
    </b-col>

    <!-- Last Name -->
    <b-col cols="12" md="6" lg="4">
      <b-form-group
        :class="{'text-danger' : $v.profile_data.last_name.$error}"
        label="Last Name *"
        label-for="lastName">
        <b-form-input
          type="text"
          id="lastName"
          v-model.trim="$v.profile_data.last_name.$model"
          :class="{'is-invalid' :$v.profile_data.last_name.$error}">
        </b-form-input>
        <div class="invalid-feedback">
          <span v-if="!$v.profile_data.last_name.required">Last name is required!</span>
        </div>
      </b-form-group>
    </b-col>

  </b-form-row>

    <!-- Modal Footer Template -->
    <template v-slot:modal-footer="{ cancel, ok }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
    <b-col>
      <b-button class="float-left"  variant="danger" @click="$bvModal.hide('ProfileModal')">
        Cancel
      </b-button>
      <b-button class="float-right"  variant="success" @click='confirmUpdate'>
        Update
      </b-button>
    </b-col>
    </template>

  </b-modal> <!-- End of Modal -->

  <b-modal id="confirmPassUpdate" ref="confirmPassUpdate" size="md" no-close-on-backdrop>
    <center><h6>Are you sure you want to update  <br/><b>{{this.user_data.username}} ?</b></h6></center>

      <!-- Modal Footer Template -->
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button  class="float-left" variant="danger" @click="backModalUpdatePass">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="updateUserPass">
            Yes
          </b-button>
        </b-col>
      </template>
  </b-modal>

  <!-- Start of Modal -->
  <b-modal id="ChangePasswordModal" ref="ChangePasswordModal" title="Change Password" size="sm" no-close-on-backdrop>

  <!-- First Name -->
  <b-form-row>
    <b-col cols="12" md="6" lg="12">
      <b-form-group
        :class="{'text-danger' : $v.user_password.old_password.$error}"
        label="Old Password *"
        label-for="OldPass">
        <b-form-input
          type="password"
          id="OldPass"
          v-model.trim="$v.user_password.old_password.$model"
          :class="{'is-invalid' :$v.user_password.old_password.$error}">
        </b-form-input>
        <div class="invalid-feedback">
          <span v-if="!$v.user_password.old_password.required">Old Password is required!</span>
        </div>
      </b-form-group>
    </b-col>

    <!-- Middle Name -->
    <b-col cols="12" md="6" lg="12">
      <b-form-group
        :class="{'text-danger' : $v.user_password.password.$error}"
        label="New Password"
        label-for="NewPassword">
        <b-form-input
          type="password"
          id="NewPassword"
          v-model.trim="$v.user_password.password.$model"
          :class="{'is-invalid' :$v.user_password.password.$error}">
        </b-form-input>
        <div class="invalid-feedback">
          <span v-if="!$v.user_password.password.required">New Password is required!</span>
          <span v-if="!$v.user_password.password.minLength">Password must have at least 6 characters.</span>
        </div>
      </b-form-group>
    </b-col>

    <!-- Last Name -->
    <b-col cols="12" md="6" lg="12">
      <b-form-group
        :class="{'text-danger' : $v.user_password.password_confirmation.$error}"
        label="Confirm Password *"
        label-for="ConfrimPassword">
        <b-form-input
          type="password"
          id="ConfrimPassword"
          v-model.trim="$v.user_password.password_confirmation.$model"
          :class="{'is-invalid' :$v.user_password.password_confirmation.$error}">
        </b-form-input>
        <div class="invalid-feedback">
          <span v-if="!$v.user_password.password_confirmation.required">Confirm Password is required!</span>
          <span v-if="!$v.user_password.password_confirmation.sameAsPassword"> Passwords must be identical.</span>
        </div>
      </b-form-group>
    </b-col>

  </b-form-row>

    <!-- Modal Footer Template -->
    <template v-slot:modal-footer="{ cancel, ok }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
    <b-col>
      <b-button class="float-left"  variant="danger" @click="cancelChangePass">
        Cancel
      </b-button>
      <b-button class="float-right"  variant="success" @click="confirmUpdatePass">
        Update
      </b-button>
    </b-col>
    </template>

  </b-modal> <!-- End of Modal -->
</div>

<!-- /top navigation -->
</template>
<script>
    import Axios from "axios";
    import { required, minLength, between, sameAs, email } from 'vuelidate/lib/validators';
    export default {
        name: 'Header',
        data() {
            return {
              user_data: this.$store.getters.getUser,
              profile_data :{
                id: null,
                username: null,
                email: null,
                first_name: null,
                middle_name: null,
                last_name: null,
              },
              user_password:{
                old_password: null,
                password: null,
                password_confirmation: null,
              },

              alertMessage: "",
              errors: [],
              dismissSecs: 7,
              dismissSuccessCountDown: 0,
              dismissErrorCountDown: 0,
            }
        },

        validations: {
          profile_data :{
            username: {required},
            email: {required, email},
            first_name: {required},
            last_name: {required},
          },
          user_password:{
            old_password: {required},
            password: {required, minLength: minLength(6)},
            password_confirmation: {sameAsPassword: sameAs('password'), required},
          },
        },


        mounted() {
        },
        methods: {
          makeToast(append = false) {
            this.$nextTick(() => {
              this.$v.$reset();
            });

            this.$bvToast.toast(`${this.alertMessage}` , {
              autoHideDelay: 2000,
              appendToast: append,
              variant: (this.alertMessage === "User profile successfully updated." || this.alertMessage === "Password successfully updated.")? 'success' : 'danger',
              toaster: "b-toaster-top-center",
            })
          },

          updateUserAccount: function(){
            this.errors = [];
            Axios
            .put('http://localhost/api/v1/update_profile/' + this.profile_data.id, this.profile_data, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
            this.$store.dispatch('setUser', response.data.user);
            this.user_data = this.$store.getters.getUser;
            this.alertMessage = response.data.message;
            this.makeToast();
            this.dismissSuccessCountDown = this.dismissSecs;
            console.log(this.alertMessage)
            })
            .catch(error => {
              console.log(error.response.data)
              this.alertMessage = error.response.data.message;
              this.makeToast();
              const values = Object.values(error.response.data.errors);
              for(const val of values){
                for(const err of val){
                  this.errors.push(err);
                }
              }
            });
            this.clearProf();
            this.$refs['confirmUpdateModal'].hide();
          }, // End of Update User Account Function

          updateUserPass: function(){
            this.errors = [];
            Axios
            .put('http://localhost/api/v1/update_password/' + this.user_data.id, this.user_password, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              this.alertMessage = response.data.message;
              this.makeToast();
            })
            .catch(error => {
              console.log(error.response.data)
              this.alertMessage = error.response.data.message;
              this.makeToast();
              const values = Object.values(error.response.data.errors);
              for(const val of values){
                for(const err of val){
                  this.errors.push(err);
                }
              }
            });
            this.clearPass();
            this.$refs['confirmPassUpdate'].hide();
          }, // End of Update User Account Function
          clearProf(){
            this.profile_data ={
              id: null,
              username: null,
              email: null,
              first_name: null,
              middle_name: null,
              last_name: null,
            }
          },
          clearPass(){
            this.user_password ={
              old_password: null,
              password: null,
              password_confirmation: null,
            }
          },

          confirmUpdatePass: function(){
            this.$v.user_password.$touch();
            if (this.$v.user_password.$anyError) {
              return;
            }else {
              this.$refs['confirmPassUpdate'].show();
              this.$refs['ChangePasswordModal'].hide();
            }


          },

          cancelChangePass: function(){
            this.$nextTick(() => {
              this.$v.$reset();
            });

            this.$refs['ChangePasswordModal'].hide();
          },

          backModalUpdatePass: function(){
            this.$refs['confirmPassUpdate'].hide();
            this.$refs['ChangePasswordModal'].show();
          },

          backModalUpdate: function(){
            this.$refs['confirmUpdateModal'].hide();
            this.$refs['ProfileModal'].show();
          },

          confirmUpdate: function(){
            this.$v.profile_data.$touch();
            if (this.$v.profile_data.$anyError) {
              return;
            }else {
              this.$refs['confirmUpdateModal'].show();
              this.$refs['ProfileModal'].hide();
            }
          },

            EditProfile: function(){
              this.profile_data = {
                id: this.user_data.id,
                username: this.user_data.username,
                email: this.user_data.email,
                first_name: this.user_data.first_name,
                middle_name: this.user_data.middle_name,
                last_name: this.user_data.last_name,
                active: this.user_data.active
              };
              this.$root.$emit('bv::show::modal', 'ProfileModal')
              console.log(this.profile_data);
            },


            logout(){
              this.$store.dispatch('logout');
            },
            //replaces jquery code for the collapsible sidebar menu
            swapClass(){
              const el = document.body;
              el.classList.toggle('nav-md');
              el.classList.toggle('nav-sm');
            }
        }
    }
</script>
