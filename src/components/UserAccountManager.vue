<template> <!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1>Manage User Accounts</h1>
    <hr/>
    <!-- Alert Message -->
    <b-alert variant="success"
      :show="dismissSuccessCountDown"
      @dismissed="dismissSuccessCountDown=0"
      dismissible fade>
        {{alertMessage}}
    </b-alert>
    <b-alert variant="danger"
      :show="dismissErrorCountDown"
      @dismissed="dismissErrorCountDown=0"
      dismissible fade>
        <p>{{alertMessage}}</p>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
    </b-alert>
    <!-- End of Alert Message -->

    <!-- Adding Form Start  -->
    <div class="col-md-10 offset-md-1">
      <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
        <div class="panel-heading">Add New User Account</div>
        <div class="panel-body">
          <b-form id="Add_UserAccount_Form">
            <b-form-row>
              <!-- Username -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="username"
                  label="Username"
                  label-for="Username">
                  <b-form-input
                    type="text"
                    v-model="users.username"
                    id="Username"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

            <!-- Password -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="password"
                label="Password"
                label-for="Password">
                <b-form-input
                  type="password"
                  v-model="users.password"
                  id="Password"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

            <!-- Confirm Password -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="confirmpassword"
                label="Confirm Password"
                label-for="confirmPassword">
                <b-form-input
                  type="password"
                  v-model="users.password_confirmation"
                  id="confirmPassword"
                  required></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Email -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="email"
                label="Email"
                label-for="Email">
                <b-form-input
                  type="text"
                  v-model="users.email"
                  id="Email"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <!-- First Name -->
          <b-form-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="firstname"
                label="First Name"
                label-for="firstName">
                <b-form-input
                  type="text"
                  v-model="users.first_name"
                  id="firstName"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

            <!-- Middle Name -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="middlename"
                label="Middle Name"
                label-for="middleName">
                <b-form-input
                  type="text"
                  v-model="users.middle_name"
                  id="middleName"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

            <!-- Last Name -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="lastname"
                label="Last Name"
                label-for="lastName">
                <b-form-input
                  type="text"
                  v-model="users.last_name"
                  id="lastName"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

            <!-- Role -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="role"
                label="Role"
                label-for="Role">
                <b-form-select
                  type="text"
                  v-model="users.role"
                  :options="roleOptions"
                  required>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="success" id="Add_UserAccount_Btn" @click="addUserAccount">
                Add
              </b-button>
            </b-col>
          </b-form-row>

        </b-form>
      </div>  <!-- End of Panel Body  -->
    </div>  <!-- End of Panel  -->
  </div> <!-- End of Col  -->
    <!--User Account Form End  -->

    <!-- Add New Semester Button -->
    <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New User Account
    </b-button>

    <!-- Ag-grid Table  -->
    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

    <!-- Start Of Edit Modal -->
    <b-modal id="editUserAccountModal" ref="editUserAccountModal" title="Edit User Account" size="lg" no-close-on-backdrop>
      <b-form-row>
      <!-- Username -->
      <b-col cols="12" md="6" lg="2">
        <b-form-group
          class="username"
          label="Username"
          label-for="Username">
          <b-form-input
            type="text"
            v-model="users.username"
            id="Username"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!--  Password -->
      <b-col cols="12" md="6" lg="3">
        <b-form-group
          class="password"
          label="Password"
          label-for="Password">
          <b-form-input
            type="password"
            v-model="users.password"
            id="Password"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!--  Confirm Password -->
      <b-col cols="12" md="6" lg="3">
        <b-form-group
          class="confirmpassword"
          label="Confirm Password"
          label-for="confirmPassword">
          <b-form-input
            type="password"
            v-model="users.password_confirmation"
            id="confirmPassword"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!--  Email -->
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          class="email"
          label="Email"
          label-for="Email">
          <b-form-input
            type="text"
            v-model="users.email"
            id="Email"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!-- First Name -->
      <b-col cols="12" md="6" lg="2">
        <b-form-group
          class="firstname"
          label="First Name"
          label-for="firstName">
          <b-form-input
            type="text"
            v-model="users.first_name"
            id="firstName"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!-- Middle Name -->
      <b-col cols="12" md="6" lg="3">
        <b-form-group
          class="middlename"
          label="Middle Name"
          label-for="middleName">
          <b-form-input
            type="text"
            v-model="users.middle_name"
            id="middleName"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!-- Last Name -->
      <b-col cols="12" md="6" lg="3">
        <b-form-group
          class="lastname"
          label="Last Name"
          label-for="lastName">
          <b-form-input
            type="text"
            v-model="users.last_name"
            id="lastName"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!-- Role -->
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          class="role"
          label="Role"
          label-for="Role">
          <b-form-select
            type="text"
            v-model="users.role"
            :options="roleOptions"
            required>
          </b-form-select>
        </b-form-group>
      </b-col>
      </b-form-row>

      <!-- Modal Footer Template -->
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-col>
        <b-button class="float-left"  variant="danger" @click="$bvModal.hide('editUserAccountModal')">
          Cancel
        </b-button>
        <b-button class="float-right"  variant="success" @click="updateUserAccount()">
          Update
        </b-button>
      </b-col>
      </template>

    </b-modal><!-- End of Edit Modal -->

    <!-- Start of Delete Modal -->
    <b-modal id="deleteUserAccountModal" ref="deleteUserAccountModal" title="Delete User Account" size="md" no-close-on-backdrop>
      <h6>Are you sure you want to delete <br/> <b>{{ this.users.username }}?</b></h6>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-col>
        <b-button class="float-left"  variant="danger" @click="$bvModal.hide('deleteUserAccountModal')">
          No
        </b-button>
        <b-button class="float-right"  variant="success" @click="deleteUserAccount()">
          Yes
        </b-button>
      </b-col>
      </template>
    </b-modal> <!-- End of delete Modal -->

  </div> <!-- End of Main Div -->
</template> <!-- End of Template -->

<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import UserAccountActionButtons from "./ActionButtons/UserAccountActionButtons.vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  export default{
    name: 'UserAccountManager',
    components: {
      AgGridVue,
      UserAccountActionButtons
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        LastUser: null,
        LastUserRole: null,
        users: {
          username: null,
          password: null,
          email: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          role: null,
          active: 1
        },

        roleOptions:[
          {value: 'Coordinator', text: 'Coordinator'},
          {value: 'Guest', text: 'Guest'},
          {value: 'Registrar', text: 'Registrar'},
          {value: 'System Admin', text: 'System Admin'},
          {value: 'System Administrator', text: 'System Administrator'}
        ],

        UserActivities:[],
        UserPriv:[],

        options: [
          {value: 0, text: 'Inactive'},
          {value: 1, text: 'Active'}
        ],

        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
    }, // End of Data

    beforeMount(){
      this.gridOptions = {
          context: {
              componentParent: this
          }
      };

      this.columnDefs = [
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 80},
          {headerName: 'Username', field: 'username', sortable: true, filter: true, width: 130,},
          {headerName: 'Email', field: 'email', sortable: true, filter: true, width: 150},
          {headerName: 'First Name', field: 'first_name', sortable: true, filter: true, width: 180,},
          {headerName: 'Middle Name', field: 'middle_name', sortable: true, filter: true, width: 180,},
          {headerName: 'Last Name', field: 'last_name', sortable: true, filter: true, width: 180,},
          {headerName: 'Role', field: 'role', sortable: true, filter: true, width: 180,},
          {headerName: 'Actions', field: 'id', cellRendererFramework: 'UserAccountActionButtons'}
      ];

    }, // End of Before Mount

    mounted () {
      this.getUserAccount();
    }, // End of Mounted

    methods:{

      // Get User Account Function
      getUserAccount: function(){
        Axios
          .get('http://localhost/api/v1/users', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.rowData = response.data;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      }, // End of Get User Account Function

      // Add User Account Function
      addUserAccount: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/users', this.users, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getUserAccount();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.resetform();
          Axios
            .get('http://localhost/api/v1/users', {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(last_user => {
              this.LastUser = last_user.data[0].id
               this.getUserActivies();
              // console.log(this.LastUser);
              // this.GrantLastUSer(last_user.data[0].role);
            })
            .catch(error => {
              this.alertMessage = error.response.data.message;
              this.dismissErrorCountDown = this.dismissSecs;
            })

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
          })
      }, // End of Add User Account function

      getUserActivies: function(){
        Axios
        .get('http://localhost/api/v1/activities', {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(user_activities => {
          // console.log(user_activities.data);
          for(var i = 0; i < user_activities.data.length; i++){
            this.UserPriv.push({
              user_id: this.LastUser,
              activity_id: user_activities.data[i].id,
              create_priv: 0,
              read_priv: 0,
              update_priv: 0,
              delete_priv: 0,
            });
          }
          this.GrantLastUser();
        })
        .catch(error => {
          this.alertMessage = error.response.data.message;
          this.dismissErrorCountDown = this.dismissSecs;
        })
    },


      GrantLastUser: function(){
        for(var j = 0; j < this.UserPriv.length; j++){
          Axios
            .post('http://localhost/api/v1/privileges', this.UserPriv[j],{
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(respone => {
              console.log(this.UserPriv[j])
            })
            .catch(error => {
              this.alertMessage = error.response.data.message;
              this.dismissErrorCountDown = this.dismissSecs;
            })
        }
      },



      // Update User Account Funtion
      updateUserAccount: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/users/' + this.id, this.users, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getUserAccount();
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          this.resetform();
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
        this.$refs['editUserAccountModal'].hide();
      }, // End of Update User Account Function

      // Delete User Account Function
      deleteUserAccount: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/users/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getUserAccount();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.resetform();

          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteUserAccountModal'].hide();
      }, // End of Delete User Account Function

      // Toggle Form Function
      toggleForm: function(){
        this.resetform();
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      }, // End of Toggle Form Function

      // Reset Form Function
      resetform: function(){
        this.users = {
          username: null,
          password: null,
          email: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          role: null,
          active: 1
        };
      }, // End of Reset Form Function
    } // End of Methods
  } // End of Export Default
</script>
