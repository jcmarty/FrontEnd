<template>
  <div>
    <h1 class="font-weight-bold text-dark">Manage Track</h1>
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


    <div class="addPanel">

      <transition name="fade">
      <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="showForm">
        <div class=" h5 font-weight-bold text-dark" >Add New Track</div>
        <hr/>

          <b-form @submit.stop.prevent="onSubmit">

            <b-col cols="12" md="6" lg="12">
              <b-form-group
                :class="{'text-danger' : $v.track.track_code.$error}"
                label="Track Code *"
                label-for="trackCode">
                <b-form-input
                  type="text"
                  id="trackCode"
                  v-model.trim="$v.track.track_code.$model"
                  :class="{'is-invalid' :$v.track.track_code.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.track.track_code.required">Track Code is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <!--  Room Name -->
            <b-col cols="12" md="6" lg="12">
              <b-form-group
                :class="{'text-danger' : $v.track.track_desc.$error}"
                label="Track Description *"
                label-for="trackDesc">
                <b-form-textarea
                  type="text"
                  v-model="track.track_desc"
                  id="trackDesc"
                  v-model.trim="$v.track.track_desc.$model"
                  :class="{
                  'is-invalid' :$v.track.track_desc.$error}">
                </b-form-textarea>
                <div class="invalid-feedback">
                  <span v-if="!$v.track.track_desc.required">Track Description is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <!-- Room Capacity -->

              <b-col>
                <b-button class="float-left" variant="danger" @click="toggleForm">
                  Cancel
                </b-button>
                <b-button class="float-right" variant="success" id="Add_track_Btn" type="submit">
                  Add
                </b-button>
              </b-col>


          </b-form>
        </div>
        </transition>
    </div>
    <!--Form end  -->

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
            Add New Track
          </b-button>
        </b-col>
      </b-row>

      <!-- Main table element -->
    <b-overlay :show="isLoading" rounded="sm">
      <b-table
        class="my-3 table-striped"
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
          <b-button v-if="row.item.active" variant="danger" size="sm" @click="StatusUpdate(row.item, $event.target)" v-b-tooltip.hover title=" Deactivate">
            Deactivate
          </b-button>

          <b-button v-else="row.item.active" variant="success" size="sm" @click="StatusUpdate(row.item, $event.target)" v-b-tooltip.hover title="Activate">
            Activate
          </b-button>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" class="mr-1" v-b-tooltip.hover title="Edit Track">
            <b-icon-pencil/>
          </b-button>

          <b-button variant="danger" size="sm"  @click="DeleteModal(row.item, row.index, $event.target)" class="mr-1" v-b-tooltip.hover title="Delete Track">
            <b-icon-trash/>
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
      <b-modal id="confirmUpdate" ref="confirmUpdate" size="md" no-close-on-backdrop>
      <center><h6>Are you sure you want to update  <br/><b> {{ this.track.track_code }} ?</b></h6></center>

          <!-- Modal Footer Template -->
          <template v-slot:modal-footer="{ cancel, ok }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-col>
              <b-button  class="float-left" variant="danger" @click="backModalUpdate">
                No
              </b-button>
              <b-button class="float-right" variant="success" @click="updateTrack">
                Yes
              </b-button>
            </b-col>
          </template>
      </b-modal>

    <b-modal id="editTrackModal" ref="editTrackModal" title="Edit Track" size="sml"  no-close-on-backdrop>
      <b-form-row>
      <!-- Room Number -->
      <b-col cols="12" md="6" lg="12">
        <b-form-group
          :class="{'text-danger' : $v.track.track_code.$error}"
          label="Track Code *"
          label-for="trackCode">
          <b-form-input
            type="text"
            id="trackCode"
            v-model.trim="$v.track.track_code.$model"
            :class="{'is-invalid' :$v.track.track_code.$error}">
          </b-form-input>
          <div class="invalid-feedback">
            <span v-if="!$v.track.track_code.required">Track Code is required!</span>
          </div>
        </b-form-group>
      </b-col>

      <!--  Room Name -->
      <b-col cols="12" md="6" lg="12">
        <b-form-group
          :class="{'text-danger' : $v.track.track_desc.$error}"
          label="Track Description *"
          label-for="trackDesc">
          <b-form-textarea
            type="text"
            v-model="track.track_desc"
            id="trackDesc"
            v-model.trim="$v.track.track_desc.$model"
            :class="{'is-invalid' :$v.track.track_desc.$error}">
          </b-form-textarea>
          <div class="invalid-feedback">
            <span v-if="!$v.track.track_desc.required">Track Description is required!</span>
          </div>
        </b-form-group>
      </b-col>
      <!-- Room Capacity -->
      </b-form-row>

      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('editTrackModal')">
            Cancel
          </b-button>
          <b-button class="float-right"  variant="success" @click="confirmUpdateModal">
            Update
          </b-button>
        </b-col>
      </template>
    </b-modal>

    <b-modal id="deleteTrackModal" ref="deleteTrackModal" title="Delete Track" size="md"  no-close-on-backdrop>
      <center><h6>Are you sure you want to delete   <br/><b> {{ this.track.track_code }} ?</b></h6></center>
      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
        <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('deleteTrackModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="deleteTrack()">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal>
  </div>
</template>   

<script>
  import Axios from "axios";
  import { required, minLength, between } from 'vuelidate/lib/validators';
  export default{
    name: 'TrackManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'track_code', label: 'Track Code', class: 'text-center', sortable: true},
          { key: 'track_desc', label: 'Track Description', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        track: {
          id: null,
          track_code: null,
          track_desc: null,
          active: 1
        },

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
    },

    validations: {
      track: {
       track_code: {required},
       track_desc: {required},
     }
    },

    mounted () {
      this.getTracks();
    },

    methods:{

      onSubmit() {
        this.$v.track.$touch();
        if (this.$v.track.$anyError) {
          return;
        }
        this.addTrack()

      },


      getTracks: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/tracks', {
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
            this.totalRows = this.items.length;
          })
          .catch(error => {
            this.isLoading = false;
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      },

      toggleForm: function(){
        this.track = {
          track_code: null,
          track_desc: null,
          active: 1
        };
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
        this.$nextTick(() => {
          this.$v.$reset();
        });
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
            this.showForm = false;
            // clear room data
            this.track = {
              track_code: null,
              track_desc: null,
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
        .put('http://localhost/api/v1/tracks/' + this.track.id, this.track, {
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
        this.$refs['confirmUpdate'].hide();
      },
      deleteTrack: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/tracks/' + this.track.id, {
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
              active: 1
            };
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteTrackModal'].hide();
      },

      backModalUpdate: function(){
        this.$refs['confirmUpdate'].hide();
        this.$refs['editTrackModal'].show();
      },

      confirmUpdateModal: function(){
        this.$refs['confirmUpdate'].show();
        this.$refs['editTrackModal'].hide();
      },

      EditModal: function(item, index) {
        this.track = {
          id: item.id,
          track_code: item.track_code,
          track_desc: item.track_desc,
          active: item.active
        },
        this.$root.$emit('bv::show::modal', 'editTrackModal')
      },
      DeleteModal: function(item){
        this.track = {
          id: item.id,
          track_code: item.track_code,
          track_desc: item.track_desc,
          active: item.active
        },

          this.$root.$emit('bv::show::modal', 'deleteTrackModal')
      },

      StatusUpdate: function(item){
        this.errors = [];

        this.track = {
          id: item.id,
          track_code: item.track_code,
          track_desc: item.track_desc,
          active: item.active == 1 ? item.active = 0 : item.active = 1
        },

        Axios
        .put('http://localhost/api/v1/tracks/' + this.track.id, this.track, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getTracks();
          if(item.active == 0){
            this.alertMessage = "tracks " + item.track_code + " successfully deactivated."
          }else{
              this.alertMessage = "tracks " + item.track_code + " successfully activated."
          }
          this.dismissSuccessCountDown = this.dismissSecs;

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
    }
  }
</script>
