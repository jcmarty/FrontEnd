<template><!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1 class="font-weight-bold text-dark">Manage Strands</h1>
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
    <div class="addPanelStrand">

      <transition name="fade">
      <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="showForm">
        <div class=" h5 font-weight-bold text-dark" >Add New Strands</div>
        <hr/>

          <b-form @submit.stop.prevent="onSubmit">
            <b-form-row>
              <!-- Track -->
              <b-col cols="12" md="6" lg="12">
                <b-form-group
                  :class="{'text-danger' : $v.strand.track_id.$error}"
                  label="Track *"
                  label-for="Track">
                  <b-form-select
                    autofocus
                    id="Track"
                    v-model.trim="$v.strand.track_id.$model"
                    :class="{'is-invalid' :$v.strand.track_id.$error}">
                    <option value="null"hidden>Select Track</option>
                    <option v-for="track in trackData" :value="track.id">{{track.track_code}}</option>
                  </b-form-select>
                  <div class="invalid-feedback">
                    <span v-if="!$v.strand.track_id.required">Track is required!</span>
                  </div>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <!-- Strand Code -->
              <b-col cols="12" md="6" lg="12">
                <b-form-group
                  :class="{'text-danger' : $v.strand.strand_code.$error}"
                  label="Strand Code"
                  label-for="strandCode">
                  <b-form-input
                    type="text"
                    id="strandCode"
                    v-model.trim="$v.strand.strand_code.$model"
                    :class="{'is-invalid' :$v.strand.strand_code.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.strand.strand_code.required">Strand Code is required!</span>
                  </div>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <!--  Strand Description -->
              <b-col cols="12" md="6" lg="12">
                <b-form-group
                  :class="{'text-danger' : $v.strand.strand_desc.$error}"
                  label="Strand Description *"
                  label-for="strandDesc">
                  <b-form-input
                    type="text"
                    id="strandDesc"
                    v-model.trim="$v.strand.strand_desc.$model"
                    :class="{'is-invalid' :$v.strand.strand_desc.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.strand.strand_desc.required">Strand Description is required!</span>
                  </div>
                </b-form-group>
              </b-col>
            </b-form-row>
            <hr/>
            <!-- Form Buttons -->
            <b-form-row>
              <b-col>
                <b-button variant="danger" @click="toggleForm">
                  Cancel
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="success" id="Add_Strands_Btn" type="submit" >
                  Add
                </b-button>
              </b-col>
            </b-form-row>

          </b-form> <!-- End of b-form  -->
      </div> <!-- End of Panel  -->
      </transition>
    </div>  <!-- End of Col  -->

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
            Add New Strand
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

        <!-- <template v-slot:cell(track_id)="row" >
          <p v-if="row.item.track_id">{{this.track.track_code}}</p>
        </template> -->

        <template v-slot:cell(active)="row" >
          <b-button v-if="row.item.active" variant="danger" size="sm" @click="StatusUpdate(row.item, $event.target)" v-b-tooltip.hover title=" Deactivate">
            Deactivate
          </b-button>

          <b-button v-else="row.item.active" variant="success" size="sm" @click="StatusUpdate(row.item, $event.target)" v-b-tooltip.hover title="Activate">
            Activate
          </b-button>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Edit Strand">
            <b-icon-pencil/>
          </b-button>

          <b-button variant="danger" size="sm"  @click="DeleteModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Delete Strand">
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
      <center><h6>Are you sure you want to update  <br/><b>Strand {{ this.strand.strand_code}}?</b></h6></center>

          <!-- Modal Footer Template -->
          <template v-slot:modal-footer="{ cancel, ok }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-col>
              <b-button  class="float-left" variant="danger" @click="backModalUpdate">
                No
              </b-button>
              <b-button class="float-right" variant="success" @click="updateStrand">
                Yes
              </b-button>
            </b-col>
          </template>
      </b-modal>

    <!-- Start Of Edit Modal -->
    <b-modal id="editStrandsModal" ref="editStrandsModal" title="Edit Strand" size="md"  no-close-on-backdrop>
      <b-form-row>
        <!-- Track -->
        <b-col cols="12" md="6" lg="12">
          <b-form-group
            :class="{'text-danger' : $v.strand.track_id.$error}"
            label="Track *"
            label-for="Track">
            <b-form-select
              autofocus
              id="Track"
              v-model.trim="$v.strand.track_id.$model"
              :class="{
              'is-invalid' :$v.strand.track_id.$error}">
              <option value="null"hidden>Select Track</option>
              <option v-for="track in trackData" :value="track.id">{{track.track_code}}</option>
            </b-form-select>
            <div class="invalid-feedback">
              <span v-if="!$v.strand.track_id.required">Track is required!</span>
            </div>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <!-- Strand Code -->
        <b-col cols="12" md="6" lg="12">
          <b-form-group
            :class="{'text-danger' : $v.strand.strand_code.$error}"
            label="Strand Code"
            label-for="strandCode">
            <b-form-input
              type="text"
              id="strandCode"
              v-model.trim="$v.strand.strand_code.$model"
              :class="{'is-invalid' :$v.strand.strand_code.$error}">
            </b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.strand.strand_code.required">Strand Code is required!</span>
            </div>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <!--  Strand Description -->
        <b-col cols="12" md="6" lg="12">
          <b-form-group
            :class="{'text-danger' : $v.strand.strand_desc.$error}"
            label="Strand Description *"
            label-for="strandDesc">
            <b-form-input
              type="text"
              id="strandDesc"
              v-model.trim="$v.strand.strand_desc.$model"
              :class="{
              'is-invalid' :$v.strand.strand_desc.$error}">
            </b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.strand.strand_desc.required">Strand Description is required!</span>
            </div>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- Modal Footer Template -->
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('editStrandsModal')">
            Cancel
          </b-button>
          <b-button class="float-right" variant="success" @click="confirmUpdateModal">
            Update
          </b-button>
        </b-col>
      </template>

    </b-modal><!-- End of Edit Modal -->

    <!-- Start of Delete Modal -->
    <b-modal id="deleteStrandsModal" ref="deleteStrandsModal" title="Delete Strand" size="md" no-close-on-backdrop>
      <center><h6>Are you sure you want to delete <br/> <b>{{ this.strand.strand_code }}?</b></h6></center>

      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('deleteStrandsModal')">
            No
          </b-button>
          <b-button class="float-right"  variant="success" @click="deleteStrand()">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal> <!-- End of delete Modal -->

  </div> <!-- End of Main Div -->
</template> <!-- End of Template -->

<script>
  import Axios from "axios";
  import { required, minLength, between } from 'vuelidate/lib/validators';
  export default{
    name: 'StrandsManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'track.track_code', label: 'Track', class: 'text-center', sortable: true},
          { key: 'strand_code', label: 'Strand Code', sortable: true, class: 'text-center' },
          { key: 'strand_desc', label: 'Strand Description', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        strand: {
          id:null,
          track_id: null,
          strand_code: null,
          strand_desc: null,
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

        trackData: null,
        selectedTrack: null,
      }
    }, // End of Data

    validations: {
     strand: {
       track_id: {required},
       strand_code: {required},
       strand_desc: {required},
     }
    },

    mounted () {
      this.getStrands();
      this.getTracks();
    }, // end of Mounted

    methods:{
      onSubmit() {
        this.$v.strand.$touch();
        if (this.$v.strand.$anyError) {
          return;
        }
        this.addStrand()

      },
      // Get Tracks Function
      getTracks: function(){
        Axios
          .get('http://localhost/api/v1/tracks', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            // console.log(response.data);

            this.trackData = response.data;
          })
          .catch(error => {

            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      }, // End of Get Tracks function

      // Get Strand Function
      getStrands: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/strands', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.isLoading = false;
            this.items = response.data;
            this.totalRows = this.items.length;

          })
          .catch(error => {
            this.isLoading = false;
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      }, // End of Get Strand Function

      // Add Strand Function
      addStrand: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/strands', this.strand, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getStrands();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.showForm = false;
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
          })
      }, // end of Add Strand Function

      // Update Strand Function
      updateStrand: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/strands/' + this.strand.id, this.strand, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getStrands();
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
        this.$refs['editStrandsModal'].hide();
        this.$refs['confirmUpdate'].hide();
      }, // End of Update Strand Function

      // Delete Strand Function
      deleteStrand: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/strands/' + this.strand.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getStrands();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.resetform();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteStrandsModal'].hide();
      }, // End of Delete Strand Function

      // Toggle Form Function
      toggleForm: function(){
        this.resetform();
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      }, // End of Toggle Form Function

      backModalUpdate: function(){
        this.$refs['confirmUpdate'].hide();
        this.$refs['editStrandsModal'].show();
      },

      confirmUpdateModal: function(){
        this.$refs['confirmUpdate'].show();
        this.$refs['editStrandsModal'].hide();
      },
      // Reset Form Function
      resetform: function(){
        this.strand = {
          track_id: null,
          strand_code: null,
          strand_desc: null,
          active: 1
        };

        this.$nextTick(() => {
          this.$v.$reset();
        });
      }, // End of Reset Form Function

      EditModal: function(item, index) {
        this.strand = {
          id: item.id,
          track_id: item.track_id,
          strand_code: item.strand_code,
          strand_desc: item.strand_desc,
          active: item.active
        };
        this.$root.$emit('bv::show::modal', 'editStrandsModal')
      },
      DeleteModal: function(item){
        this.strand = {
          id: item.id,
          track_id: item.track_id,
          strand_code: item.strand_code,
          strand_desc: item.strand_desc,
          active: item.active
        };

          this.$root.$emit('bv::show::modal', 'deleteStrandsModal')
      },

      StatusUpdate: function(item){
        this.errors = [];

        this.strand = {
          id: item.id,
          track_id: item.track_id,
          strand_code: item.strand_code,
          strand_desc: item.strand_desc,
          active: item.active == 1 ? item.active = 0 : item.active = 1
        };

        Axios
        .put('http://localhost/api/v1/strands/' + this.strand.id, this.strand, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getStrands();
          if(item.active == 0){
            this.alertMessage = "Strand " + item.strand_code + " successfully deactivated."
          }else{
              this.alertMessage = "Strand " + item.strand_code + " successfully activated."
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
    } // End of Methods
  } // End of Export Default
</script>


<style>
  .addPanelStrand{
    width: 50%;
    position: relative;
    left: 250px;
  }


</style>
