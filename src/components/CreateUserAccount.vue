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
    <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
      <div class="panel-heading">Add a User</div>
      <div class="panel-body">
        <b-form id="Add_UserAccount_Form">
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="username"
              label="Username"
              label-for="userName">
              <b-form-input
                type="text"
                v-model="users.username"
                id="userName"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Name -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="password"
              label="Password"
              label-for="passWord">
              <b-form-input
                type="text"
                v-model="users.password"
                id="passWord"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Type -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="confirmpssword"
              label="Confirm Password"
              label-for="confirmPassword">
              <b-form-input
                type="text"
                v-model="users.password_confirmation"
                id="confirmPassword"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!-- Room Capacity -->
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="email"
              label="Email"
              label-for="email">
              <b-form-input
                type="text"
                v-model="users.email"
                id="email"
                required></b-form-input>
            </b-form-group>
          </b-col>

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

            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_Room_Btn" @click="addUserAccount">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>
    <!--Form end  -->

    <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New User
    </b-button>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>


  </div>
</template>   

<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  import UserAccountActionButtons from "./ActionButtons/UserAccountActionButtons.vue";
  export default{
    name: 'CreateUserAccount',
    components: {
      AgGridVue,
      UserAccountActionButtons
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        id: null,

        users: {
          username: null,
          passWord: null,
          confirm_passWord: null,
          emil: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          role: null,
          active: 1
        },

        options: [
          {value: 0, text: 'Inactive'},
          {value: 1, text: 'Active'}
        ],

        roleOptions:[
          {value: 'Coordinator', text: 'Coordinator'},
          {value: 'Guess', text: 'Guess'},
          {value: 'Registrar', text: 'Registrar'},
          {value: 'System Admin', text: 'System Admin'},
          {value: 'System Administrator', text: 'System Administrator'}
        ],

        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
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
          {headerName: 'Room Number', field: 'username', sortable: true, filter: true, width: 130,},
          {headerName: 'Room Name', field: 'email', sortable: true, filter: true, resizable: true},
          {headerName: 'Room Type', field: 'first_name', sortable: true, filter: true, width: 150},
          {headerName: 'Room Type', field: 'middle_name', sortable: true, filter: true, width: 150},
          {headerName: 'Room Type', field: 'last_name', sortable: true, filter: true, width: 150},
          {headerName: 'Room Type', field: 'role', sortable: true, filter: true, width: 150},
          {headerName: 'Status', field: 'active', width: 120,
            cellRenderer: (data) => {
              if(data.value === 1){
                return 'Active';
              } else {
                return 'Inactive';
              }
            }},
          {headerName: 'Actions', field: 'id', cellRendererFramework: 'UserAccountActionButtons'}
      ];

    },
    mounted () {
      this.getUserAccount();
    },
    methods:{
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
          .post('http://localhost/api/v1/users', this.room, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getRooms();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.room = {
              room_number: null,
              room_name: null,
              room_type: null,
              room_capacity: 0,
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
      }


    }
  }
</script>
