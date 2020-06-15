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

          label="Username *"
          label-for="Username">
          <b-form-input
            type="text"
            id="Username"
            v-model="this.profile_data.username">
          </b-form-input>

        </b-form-group>
      </b-col>

    <!-- Email -->
    <b-col cols="12" md="6" lg="8">
      <b-form-group

        label="Email *"
        label-for="Email">
        <b-form-input
          type="text"
          id="Email"
          v-model="this.profile_data.email">
        </b-form-input>

      </b-form-group>
    </b-col>
  </b-form-row>

  <!-- First Name -->
  <b-form-row>
    <b-col cols="12" md="6" lg="4">
      <b-form-group

        label="First Name *"
        label-for="firstName">
        <b-form-input
          type="text"
          id="firstName"
          v-model="this.profile_data.first_name">
        </b-form-input>

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
          v-model="this.profile_data.middle_name">
        </b-form-input>
      </b-form-group>
    </b-col>

    <!-- Last Name -->
    <b-col cols="12" md="6" lg="4">
      <b-form-group

        label="Last Name *"
        label-for="lastName">
        <b-form-input
          type="text"
          id="lastName"
          v-model="this.profile_data.last_name">
        </b-form-input>

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

  <!-- Start of Modal -->
  <b-modal id="ChangePasswordModal" ref="ChangePasswordModal" title="Change Password" size="sm" no-close-on-backdrop>

  <!-- First Name -->
  <b-form-row>
    <b-col cols="12" md="6" lg="12">
      <b-form-group
        label="Current Password *"
        label-for="CurrentPass">
        <b-form-input
          type="password"
          id="CurrentPass">
        </b-form-input>
      </b-form-group>
    </b-col>

    <!-- Middle Name -->
    <b-col cols="12" md="6" lg="12">
      <b-form-group
        label="New Password"
        label-for="NewPassword">
        <b-form-input
          type="password"
          id="NewPassword">
        </b-form-input>
      </b-form-group>
    </b-col>

    <!-- Last Name -->
    <b-col cols="12" md="6" lg="12">
      <b-form-group
        label="Confirm Password *"
        label-for="ConfrimPassword">
        <b-form-input
          type="password"
          id="ConfrimPassword">
        </b-form-input>
      </b-form-group>
    </b-col>

  </b-form-row>

    <!-- Modal Footer Template -->
    <template v-slot:modal-footer="{ cancel, ok }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
    <b-col>
      <b-button class="float-left"  variant="danger" @click="$bvModal.hide('ChangePasswordModal')">
        Cancel
      </b-button>
      <b-button class="float-right"  variant="success" @click="">
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
              }
            }
        },

        mounted() {
        },
        methods: {

          updateUserAccount: function(){
            this.errors = [];
            Axios
            .put('http://localhost/api/v1/users/' + this.profile_data.id, this.profile_data, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {

              console.log(response.data)

            })
            .catch(error => {
              this.alertMessage = error.response.data.message;
              const values = Object.values(error.response.data.errors);
              for(const val of values){
                for(const err of val){
                  this.errors.push(err);
                }
              }
              this.dismissErrorCountDown = this.dismissSecs;
            });
            this.$refs['confirmUpdateModal'].hide();
          }, // End of Update User Account Function


          backModalUpdate: function(){
            this.$refs['confirmUpdateModal'].hide();
            this.$refs['ProfileModal'].show();
          },

          confirmUpdate: function(){
            this.$refs['confirmUpdateModal'].show();
            this.$refs['ProfileModal'].hide();
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
