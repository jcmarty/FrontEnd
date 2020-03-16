<template>
  <div class="container">
    <h1>User Priviledges</h1>
    <hr/>
    <b-breadcrumb>
      <b-breadcrumb-item to="/manage/useraccount">User Account</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ user.name }}</b-breadcrumb-item>
    </b-breadcrumb>
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
    <div class="panel panel-primary" >
      <div class="panel-heading">Grant Priviledges</div>
      <div class="panel-body">

        <!-- Form Start -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Activity</th>
              <th scope="col">{{label}}</th>
              <th scope="col">Create</th>
              <th scope="col">Read</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <!-- Select Activities -->
                <b-col cols="12" md="12" lg="12">
                  <b-form-group class="checkBoxContainer" label="" label-for="">
                    <b-form-select class="privCheckbox" id="activities" v-model="selectedActivity.id" :options="activityOptions" @change="changePriv">
                      <option value="null" hidden>Select activity</option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </td>
              <td>
                <!-- Grant All Priv -->
                <b-col cols="12" md="1" lg="1">
                  <b-form-group class="checkBoxContainer">
                    <b-form-checkbox
                      class="privCheckbox"
                      name="all_chckbox"
                      v-model="grant"
                      value="1"
                      unchecked-value="0"
                      :disabled="status"
                      size="lg"
                      @change="grantAll"
                    >
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
              </td>
              <td>
                <!-- Create Priv -->
                <b-col cols="12" md="1" lg="1">
                  <b-form-group class="checkBoxContainer">
                    <b-form-checkbox
                      class="privCheckbox"
                      v-model="selectedActivity.create_priv"
                      name="create_chckbox"
                      value="1"
                      unchecked-value="0"
                      :disabled="status"
                      size="lg"
                    >
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
              </td>
              <td>
                <!-- Read Priv -->
                <b-col cols="12" md="1" lg="1">
                  <b-form-group class="checkBoxContainer">
                    <b-form-checkbox
                      class="privCheckbox"
                      v-model="selectedActivity.read_priv"
                      name="read_chckbox"
                      value="1"
                      unchecked-value="0"
                      :disabled="status"
                      size="lg"
                    >
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
              </td>
              <td>
                <!-- Update Priv -->
                <b-col cols="12" md="1" lg="1">
                  <b-form-group class="checkBoxContainer">
                    <b-form-checkbox
                      class="privCheckbox"
                      v-model="selectedActivity.update_priv"
                      name="update_chckbox"
                      value="1"
                      unchecked-value="0"
                      :disabled="status"
                      size="lg"
                    >
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
              </td>
              <td>
                <!-- Delete Priv -->
                <b-col cols="12" md="1" lg="1">
                  <b-form-group class="checkBoxContainer">
                    <b-form-checkbox
                      class="privCheckbox"
                      v-model="selectedActivity.delete_priv"
                      name="delete_chckbox"
                      value="1"
                      unchecked-value="0"
                      :disabled="status"
                      size="lg"
                    >
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
              </td>
              <td>
                <b-col md="2" lg="2">
                  <b-form-group class="checkBoxContainer col-md-12 ">
                      <b-button @click="grantPrivilege" size="sm" variant="success">Grant</b-button>
                  </b-form-group>
                </b-col>
              </td>
            </tr>
          </tbody>
        </table>
        <b-form-row>

        </b-form-row>
        <!-- Form End -->
      </div>
      <!--  end of panel-body -->
    </div>
    <!-- end of panel -->
    <div class="myTable px-4 py-3 my-5">
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
      </b-row>

      <b-table
        class="my-3 table-striped"
        show-empty
        responsive=true
        head-variant="dark"
        bordered
        hover
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter">

        <template v-slot:cell(create_priv)="row" >
          <p v-if="row.item.create_priv">Authorized</p>
          <p v-else>Unauthorized</p>
        </template>

        <template v-slot:cell(read_priv)="row" >
          <p v-if="row.item.create_priv">Authorized</p>
          <p v-else>Unauthorized</p>
        </template>

        <template v-slot:cell(update_priv)="row" >
          <p v-if="row.item.create_priv">Authorized</p>
          <p v-else>Unauthorized</p>
        </template>

        <template v-slot:cell(delete_priv)="row" >
          <p v-if="row.item.create_priv">Authorized</p>
          <p v-else>Unauthorized</p>
        </template>


      </b-table>

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
  </div>
</template>   

<style>
  .panel-body{
    padding: 10px 20px;
  }

  thead{
    text-align: center;
  }
</style>

<script>
  import Axios from "axios";

  export default{
    name: 'UserPrivilegeManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'activity.title', label: 'Activity', class: 'text-center', sortable: true},
          { key: 'create_priv', label: 'Create Privileges', sortable: true, class: 'text-center' },
          { key: 'read_priv', label: 'Read Privileges', sortable: true, class: 'text-center' },
          { key: 'update_priv', label: 'Update Privileges', sortable: true, class: 'text-center' },
          { key: 'delete_priv', label: 'Delete Privileges', sortable: true, class: 'text-center' },
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        user: {
          id: null,
          name: null
        },
        status: true,
        grant: 0,
        label: 'Select all',

        selectedActivity: {
          id: null,
          user_id: null,
          create_priv: 0,
          read_priv: 0,
          update_priv: 0,
          delete_priv: 0
         },

         activityOptions: [],
         alertMessage: "",
         errors: [],
         dismissSecs: 7,
         dismissSuccessCountDown: 0,
         dismissErrorCountDown: 0,
      }
    },

    mounted: function(){
      this.getUserPriviledge();
    },
    created() {
        this.user = {
          id: this.$route.params.id,
          name: this.$route.params.first_name + " " + this.$route.params.last_name
        }
    },
    methods:{
      // get all user priviledges
      getUserPriviledge: function(){
        Axios
          .get('http://localhost/api/v1/users/' + this.user.id + '/privileges', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            // console.log(response.data);
            this.items = response.data;
            this.totalRows = this.items.length;
            for (var i = 0; i < response.data.length; i++) {
              // console.log(response.data[i].course_code);
              this.activityOptions.push(
                {
                  value: response.data[i].id,
                  text: response.data[i].activity.title
                },
              );
            }
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
      },

      // enables check boxes when theres an activity selected
      changePriv: function(){
       this.status = false;
       Axios
         .get('http://localhost/api/v1/users/' + this.user.id + '/privileges/' + this.selectedActivity.id, {
           headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
         })
         .then(response => {
           // console.log(response.data);
           this.selectedActivity.user_id = response.data.user_id;
           this.selectedActivity.create_priv = response.data.create_priv;
           this.selectedActivity.read_priv = response.data.read_priv;
           this.selectedActivity.update_priv = response.data.update_priv;
           this.selectedActivity.delete_priv = response.data.delete_priv;

               if(this.selectedActivity.create_priv == 1 &&
                 this.selectedActivity.read_priv == 1 &&
                 this.selectedActivity.update_priv == 1 &&
                 this.selectedActivity.delete_priv == 1
               ){
                 this.label = "Unselect all"
                 this.grant = 1
               }
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
      },

      // Granting user privilege
      grantPrivilege: function(){
        this.errors = [];
        // console.log(this.selectedActivity)
        if (this.selectedActivity.id == null){
          this.alertMessage = "Failed to grant user privilege.";
          this.errors.push("Activity select box is required.");
          this.dismissErrorCountDown = this.dismissSecs;
        }else{
        this.errors = [];
        Axios
          .put('http://localhost/api/v1/privileges/' + this.selectedActivity.id, this.selectedActivity,{
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
              // console.log(response)
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.selectedActivity = {
               id: null,
               user_id: null,
               create_priv: 0,
               read_priv: 0,
               update_priv: 0,
               delete_priv: 0
            };
            this.label = "Select all"
            this.grant = 0
            this.status = true;
            this.getUserPriviledge();
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
      },

      // checked all priv check box
      grantAll: function() {
        if (this.grant == 1){
          this.label = "Select all"
          this.grant = 0
        }else{
          this.label = "Unselect all"
          this.grant = 1
        }
          this.selectedActivity.create_priv = this.grant;
          this.selectedActivity.read_priv = this.grant;
          this.selectedActivity.update_priv = this.grant;
          this.selectedActivity.delete_priv = this.grant;
      }
    }
  }
</script>
