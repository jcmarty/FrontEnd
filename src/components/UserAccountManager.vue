<template>
  <div>
    <h1>Manage User Accounts</h1>
    <!--form Start  -->
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

    <b-tabs v-if="showForm" v-model="tabIndex">
      <b-tab title="User Accounts">
        <!-- Form Start -->
        <!-- User information -->
        <b-form id="Add_UserAccount_Form">
          <b-form-row>
          <b-col cols="12" md="6" lg="3">
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

          <!--  Room Name -->
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

          <b-col cols="12" md="6" lg="3">
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

        </b-form-row>
        <b-form-row>
          <!--  Room Type -->

          <!-- Room Capacity -->
          <b-col cols="12" md="6" lg="3">
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
              <b-button variant="primary" id="Add_UserAccount_Btn" @click="addUserAccount">
                Next
              </b-button>
            </b-col>
        </b-form-row>
          </b-form>
      </b-tab>
    <!--User Account Form End  -->

<!-- User Privilege Form Start -->
    <b-tab title="User Privilege" :disabled="secondTabDisabled">
        <b-form>
          <b-form-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
              class="useractivities"
              label="User Activities"
              label-for="userActivities">

              <table border="1">
                <tr>
                  <th>Activities</th>
                  <th>Create</th>
                  <th>Read</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>

                <tr  v-for="(key, value) in userActivities">
                  <td v-model="userpriv.activity_id">{{value}}</td>
                  <td>
                    <b-form-checkbox
                      v-model="userpriv.create_priv"
                      value= "1"
                      unchecked-value ="0">
                      <div>{{ userpriv.create_priv }}</div>
                  </b-form-checkbox>
                </td>

                  <td>
                      <b-form-checkbox
                        v-model="userpriv.read_priv"
                        value="1"
                        unchecked-value ="">
                    </b-form-checkbox>
                  </td>

                  <td>
                    <b-form-checkbox
                      v-model="userpriv.update_priv"
                      value="1"
                      unchecked-value ="">
                    </b-form-checkbox>
                  </td>

                    <td>
                      <b-form-checkbox
                      v-model="userpriv.delete_priv"
                      value="1"
                      unchecked-value ="">
                    </b-form-checkbox>
                  </td>
                </tr>
              </table>

                <!-- <ul>
                  <li v-for="(key, value) in userActivities">
                    {{value}}

                        <b-form-checkbox
                          :id="key"
                          v-model="empty">
                          <b-text>create</b-text>
                        </b-form-checkbox>

                  </li>
                </ul> -->
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
              <b-col>
                <b-button variant="primary" @click="tabIndex--">
                  Previous
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="primary" id="Add_UserAccount_Btn" @click="addUserPrivileges">
                  Next
                </b-button>
              </b-col>
          </b-form-row>
        </b-form>
    </b-tab>
    <!-- User Privilege Form End -->
  </b-tabs>

    <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New User Account
    </b-button>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

<!-- User Account Edit Form Start -->
    <b-modal id="editUserAccountModal" ref="editUserAccountModal" title="Edit User Account" size="xl">
      <b-form-row>
      <!-- Room Number -->
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

      <!--  Room Name -->
      <b-col cols="12" md="6" lg="4">
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

      <!--  Room Type -->
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

      <!-- Room Capacity -->
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

      <b-col cols="12" md="6" lg="2">
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

      <b-col cols="12" md="6" lg="2">
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

      <b-col cols="12" md="6" lg="2">
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

      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('editUserAccountModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="updateUserAccount()">
          Update
        </b-button>
      </template>
    </b-modal>
    <!-- User Account Edit Form End -->

    <!-- User Account Delete Form Start -->
    <b-modal id="deleteUserAccountModal" ref="deleteUserAccountModal" title="Delete User Account" size="lg">
      <p>Are you sure you want to delete {{ this.users.username }}?</p>

      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('deleteUserAccountModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deleteUserAccount()">
          Delete
        </b-button>
      </template>
    </b-modal>
    <!-- User Account Delete Form End -->
  </div>
</template>   

<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  import UserAccountActionButtons from "./ActionButtons/UserAccountActionButtons.vue";
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

        userpriv: [
          {activity_id:[]},
          {create_priv:[]},
          {read_priv:[]},
          {update_priv:[]},
          {delete:[]}
        ],
        roleOptions:[
          {value: 'Coordinator', text: 'Coordinator'},
          {value: 'Guess', text: 'Guess'},
          {value: 'Registrar', text: 'Registrar'},
          {value: 'System Admin', text: 'System Admin'},
          {value: 'System Administrator', text: 'System Administrator'}
        ],

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

        privID: null,
        userActivities: this.$store.state.settings.user_activities,
        secondTabDisabled: true,
        tabIndex: 0,
        CbcID: 0,
      }
    },
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

    },
    mounted () {
      this.getUserAccount();
    },

    methods:{
      nextTab: function(){
        this.secondTabDisabled = false;
        this.tabIndex++;
      },

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
      },
      toggleForm: function(){
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },
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
              this.privID = response.data.last_insert_id;
              this.tabIndex++;
              this.secondTabDisabled = false;

            // clear room data
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
      },
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
          // clear subject data
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
      },
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
            // clear room data
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

          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            /*const values = Object.values(error.response.data.errors);
            for(const val of values){
              for(const err of val){
                this.errors.push(err);
              }
            }*/
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteUserAccountModal'].hide();
      },
      addUserPrivileges: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/privileges/' + this.privID, this.users, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getUserAccount();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.userpriv = {
              activity_id: this.userActivities,
              create_priv: 0,
              read_priv: 0,
              update_priv: 0,
              delete_priv: 0
            };
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
      }
    }
  }
</script>
