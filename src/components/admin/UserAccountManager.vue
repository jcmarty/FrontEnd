<template> <!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1 class="font-weight-bold text-dark">Manage User Accounts</h1>
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
    <div class="addPanel">

      <transition name="fade">
      <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="showForm">
        <div class=" h5 font-weight-bold text-dark" >Add New User Account</div>
        <hr/>
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
    </transition>
  </div> <!-- End of Col  -->
    <!--User Account Form End  -->

    <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">
      <!-- Adding Form Start  -->
      <b-row>
        <b-col lg="4" class="my-1 ">
          <b-form-group
          class="filter"
          label="Filter"
          label-for="Filter">
            <b-input-group  size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search">
              </b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col class="py-4">
          <!-- Add New Room Button -->
          <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
            Add New User Account
          </b-button>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-overlay :show="isLoading" rounded="sm">
      <b-table
        class="my-0 table-striped"
        show-empty
        responsive
        bordered
        hover
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter">

        <template v-slot:cell(active)="row" >
          <b-form-checkbox switch size="sm" :checked="row.item.status"  @change="StatusUpdate(row.item, $event.target)">
            <b-badge variant="success" pill v-if="row.item.active">Active</b-badge>
            <b-badge variant="danger"  pill v-else>Inactive</b-badge>
          </b-form-checkbox>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button variant='info' size='sm' @click="PrivPage(row.item, $event.target)"v-b-tooltip.hover title="Privileges">
            <b-icon-clock/>
          </b-button>

          <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" class="mr-1">
            <b-icon-pencil/>
          </b-button>

        </template>
      </b-table>
      </b-overlay>

      <hr/>
      <b-row>
        <b-col sm="4" md="6" lg="1" class="my-1">
          <b-form-group
          class="perpageselect"
          label=""
          label-for="perPageSelect">
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="4" md="3" class="my-1 col-md-3 offset-md-8">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
      <!-- end of table -->

    <!-- Start Of Edit Modal -->
    <b-modal id="editUserAccountModal" ref="editUserAccountModal" title="Edit User Account" size="lg" no-close-on-backdrop>
      <b-form-row>
      <!-- Username -->
      <b-col cols="12" md="6" lg="4">
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

      <!--  Confirm Password -->
      <b-col cols="12" md="6" lg="4">
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
    </b-form-row>

    <b-form-row>

      <!-- First Name -->
      <b-col cols="12" md="6" lg="4">
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
      <b-col cols="12" md="6" lg="4">
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
      <b-col cols="12" md="6" lg="4">
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
    </b-form-row>

    <b-form-row>

      <!--  Email -->
      <b-col cols="12" md="6" lg="8">
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


<!-- remove change password and replace with reset password -->

  </div> <!-- End of Main Div -->
</template> <!-- End of Template -->

<script>
  import Axios from "axios";
  export default{
    name: 'UserAccountManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'username', label: 'Username', class: 'text-center', sortable: true},
          { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
          { key: 'first_name', label: 'First Name', sortable: true, class: 'text-center' },
          { key: 'middle_name', label: 'Middle Name', sortable: true, class: 'text-center' },
          { key: 'last_name', label: 'Last Name', sortable: true, class: 'text-center' },
          { key: 'role', label: 'Role ', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Status', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        LastUser: null,
        LastUserRole: null,

        users: {
          id: null,
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
          {value: 'Assistant Registrar', text: 'Assistant Registrar'},
          {value: 'Coordinator', text: 'Coordinator'},
          {value: 'Registrar', text: 'Registrar'},
          {value: 'School Administrator', text: 'School Administrator'},
          {value: 'System Administrator', text: 'System Administrator'}
        ],

        UserActivities:[],
        UserPriv:[],

        options: [
          {value: 0, text: 'Inactive'},
          {value: 1, text: 'Active'}
        ],

        isLoading: false,
        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
    }, // End of Data



    mounted () {
      this.getUserAccount();
    }, // End of Mounted

    methods:{

      // Get User Account Function
      getUserAccount: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/users', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.isLoading = false;
            this.items = response.data;
            for(var j = 0; j < this.items.length; j++){
              if(this.items[j].active == 1){
                this.items[j].status = true
              }else{
                this.items[j].status = false;
              }
            }
            // console.log(this.items);
            this.totalRows = this.items.length;
          })
          .catch(error => {
            this.isLoading = false;
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
            //
            this.getUserAccount();
            // console.log(response.data)
            // added this message because api will return the created user record
            this.alertMessage = "User account successfully created.";
            this.dismissSuccessCountDown = this.dismissSecs;
            this.showForm = false;
            this.resetform();
            // passing of data from created user record
            this.LastUser = response.data.id;
            this.LastUserRole = response.data.role;

            this.getUserActivies();
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
        if (this.LastUserRole === 'System Administrator') {
          // all activities will be added to this user..
          for(var i = 0; i < user_activities.data.length; i++){
              this.UserPriv.push({
                user_id: this.LastUser,
                activity_id: user_activities.data[i].id,
                create_priv: 1,
                read_priv: 1,
                update_priv: 1,
                delete_priv: 1,
              });
          }
        }

        else if (this.LastUserRole === 'School Administrator') {
          //
          for(var i = 0; i < user_activities.data.length; i++){
              this.UserPriv.push({
                user_id: this.LastUser,
                activity_id: user_activities.data[i].id,
                create_priv: 0,
                read_priv: 1,
                update_priv: 0,
                delete_priv: 0,
              });
              console.log(user_activities.data[i].id);
          }
        }

        else if (this.LastUserRole === 'Registrar') {
          // preset privileges
          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[1].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[2].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[5].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[6].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[7].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[8].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[11].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[12].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[13].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[14].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[15].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[16].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

        }

        else if (this.LastUserRole === 'Assistant Registrar') {
          // preset privileges
          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[1].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[2].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[5].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[6].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[7].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[8].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[11].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[12].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[13].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[14].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[15].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[16].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });
        }

        else if (this.LastUserRole === 'Coordinator') {
          // preset privileges
          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[1].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[2].id,
            create_priv: 0,
            read_priv: 1,
            update_priv: 0,
            delete_priv: 0,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[3].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[4].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[5].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[6].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[7].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[8].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[11].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[12].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

          this.UserPriv.push({
            user_id: this.LastUser,
            activity_id: user_activities.data[13].id,
            create_priv: 1,
            read_priv: 1,
            update_priv: 1,
            delete_priv: 1,
          });

        }


          this.GrantLastUser();
          this.UserPriv = []

        })
        .catch(error => {
          this.alertMessage = error.response.data.message;
          this.dismissErrorCountDown = this.dismissSecs;
        })
    },


      GrantLastUser: function(){
          Axios
            .post('http://localhost/api/v1/privileges', this.UserPriv,{
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(respone => {
              console.log(respone.data);
              // console.log(this.UserPriv[j])
            })
            .catch(error => {
              this.alertMessage = error.response.data.message;
              this.dismissErrorCountDown = this.dismissSecs;
            })
      },



      // Update User Account Funtion
      updateUserAccount: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/users/' + this.users.id, this.users, {
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
          .delete('http://localhost/api/v1/users/' + this.users.id, {
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

      EditModal: function(item, index) {
        console.log(this.users)
        this.users = {
          id: item.id,
          username: item.username,
          password: item.password,
          password: item.password,
          email: item.email,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
          role: item.role,
          active: item.active
        };
        this.$root.$emit('bv::show::modal', 'editUserAccountModal')
      },
      DeleteModal: function(item){
        this.users = {
          id: item.id,
          username: item.username,
          password: item.password,
          email: item.email,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
          role: item.role,
          active: item.active
        };
          this.$root.$emit('bv::show::modal', 'deleteUserAccountModal')
      },
      // this function will update the status of user. Active or Inactive
      StatusUpdate: function(item){
        this.errors = [];

        this.users = {
          id: item.id,
          active: item.active == 1 ? item.active = 0 : item.active = 1
        };
        Axios
        .put('http://localhost/api/v1/users/' + this.users.id, this.users, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getUserAccount();
          if(item.active == 0){
            this.alertMessage = "User " + item.username + " successfully deactivated."
          }else{
              this.alertMessage = "User " + item.username + " successfully activated."
          }
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
      }, // end of Status Update Function

      PrivPage: function(item){
        this.users = {
          id: item.id,
          username: item.username,
          password: item.password,
          email: item.email,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
          role: item.role,
          active: item.active
        };
          this.$router.replace({
            name: 'UserPrivilegeManager',
            params: {
              id: item.id,
              first_name: item.first_name,
              last_name: item.last_name,
              role: item.role
            }
          })
      }
    } // End of Methods
  } // End of Export Default
</script>
