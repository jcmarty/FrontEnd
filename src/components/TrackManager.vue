<template>
  <div>
    <h1>Manage Track</h1>
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
      <div class="panel-heading">Add a Track</div>
      <div class="panel-body">
        <b-form id="Add_Track_Form">
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="trackcode"
              label="Track Code"
              label-for="trackCode">
              <b-form-input
                type="text"
                v-model="track.track_code"
                id="trackCode"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Name -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="trackdesc"
              label="Track Desc"
              label-for="trackDesc">
              <b-form-input
                type="text"
                v-model="track.track_desc"
                id="trackDesc"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!-- Room Capacity -->

            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_track_Btn" @click="addTrack">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>
    <!--Form end  -->

    <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New Course
    </b-button>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

    <b-modal id="editTrackModal" ref="editTrackModal" title="Edit Track" size="xl">
      <b-form-row>
      <!-- Room Number -->
      <b-col cols="12" md="6" lg="2">
        <b-form-group
          class="trackcode"
          label="Track Code"
          label-for="trackCode">
          <b-form-input
            type="text"
            v-model="track.track_code"
            id="trackCode"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!--  Room Name -->
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          class="trackdesc"
          label="Track Desc"
          label-for="trackDesc">
          <b-form-input
            type="text"
            v-model="track.track_desc"
            id="trackDesc"
            required></b-form-input>
        </b-form-group>
      </b-col>
      <!-- Room Capacity -->
      </b-form-row>

      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('editTrackModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="updateTrack()">
          Update
        </b-button>
      </template>
    </b-modal>

    <b-modal id="deleteTrackModal" ref="deleteTrackModal" title="Delete Track" size="lg">
      <p>Are you sure you want to delete {{ this.track.track_desc }}?</p>

      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('deleteTrackModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deleteTrack()">
          Delete
        </b-button>
      </template>
    </b-modal>
  </div>
</template>   

<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  import TracksActionButtons from "./ActionButtons/TracksActionButtons.vue";
  export default{
    name: 'TrackManager',
    components: {
      AgGridVue,
      TracksActionButtons
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        id: null,
        track: {
          track_code: null,
          track_desc: null,
          created_at: null,
          updated_at: null,
          last_updated_by: null,
          active: 1
        },
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
    },
    beforeMount(){
      this.gridOptions = {
          context: {
              componentParent: this
          }
      };
      this.columnDefs = [
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 90},
          {headerName: 'Track Code', field: 'track_code', sortable: true, filter: true, width: 130,},
          {headerName: 'Track Description', field: 'track_desc', sortable: true, filter: true, resizable: true},
          {headerName: 'Created at', field: 'created_at', sortable: true, filter: true, width: 150},
          {headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true, width: 180,},
          {headerName: 'Last updated by', field: 'last_updated_by', sortable: true, filter: true, width: 180,},
          {headerName: 'Status', field: 'active', width: 120,
            cellRenderer: (data) => {
              if(data.value === 1){
                return 'Active';
              } else {
                return 'Inactive';
              }
            }},
          {headerName: 'Actions', field: 'id', cellRendererFramework: 'TracksActionButtons'}
      ];

    },
    mounted () {
      this.getTracks();
    },
    methods:{
      getTracks: function(){
        Axios
          .get('http://localhost/api/v1/tracks', {
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
      addTrack: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/tracks', this.track, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getTracks();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.track = {
              track_code: null,
              track_desc: null,
              created_at: null,
              updated_at: null,
              last_updated_by: null,
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
      updateTrack: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/tracks/' + this.id, this.track, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getTracks();
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          // clear subject data
          this.track = {
            track_code: null,
            track_desc: null,
            created_at: null,
            updated_at: null,
            last_updated_by: null,
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
        this.$refs['editTrackModal'].hide();
      },
      deleteTrack: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/tracks/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getTracks();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.track = {
              track_code: null,
              track_desc: null,
              created_at: null,
              updated_at: null,
              last_updated_by: null,
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
        this.$refs['deleteTrackModal'].hide();
      }
    }
  }
</script>
