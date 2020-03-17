<template><!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1>Manage Strands</h1>
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
      <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
        <div class="panel-heading">Add a Strands</div>
        <div class="panel-body">
          <b-form id="Add_Strands_Form">
            <b-form-row>
              <!-- Track -->
              <b-col cols="12" md="6" lg="12">
                <b-form-group
                  class="track"
                  label="Track"
                  label-for="Track">
                  <b-form-select
                    id="Track"
                    @change=""
                    v-model="strand.track_id" >
                    <option
                      value="null"
                      hidden>Select Track
                    </option>
                    <option
                      v-for="track in trackData"
                      v-bind:value="track.id">{{track.track_code}}
                    </option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <!-- Strand Code -->
              <b-col cols="12" md="6" lg="12">
                <b-form-group
                  class="strandcode"
                  label="Strand Code"
                  label-for="strandCode">
                  <b-form-input
                    type="text"
                    v-model="strand.strand_code"
                    id="strandCode"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <!--  Strand Description -->
              <b-col cols="12" md="6" lg="12">
                <b-form-group
                  class="stranddesc"
                  label="Strand Desc"
                  label-for="strandDesc">
                  <b-form-input
                    type="text"
                    v-model="strand.strand_desc"
                    id="strandDesc"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <!-- Form Buttons -->
            <b-form-row>
              <b-col>
                <b-button variant="danger" @click="toggleForm">
                  Cancel
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="success" id="Add_Strands_Btn" @click="addStrand">
                  Add
                </b-button>
              </b-col>
            </b-form-row>

          </b-form> <!-- End of b-form  -->
        </div> <!-- End of Panel Body  -->
      </div> <!-- End of Panel  -->
    </div>  <!-- End of Col  -->

    <div class="myTable px-4 py-3 my-5">
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
      <b-table
        class="my-3 table-striped"
        show-empty
        responsive
        head-variant="dark"
        bordered
        hover
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter">

        <!-- <template v-slot:cell(track_id)="row" >
          <p v-if="row.item.track_id">{{this.track.track_code}}</p>
        </template> -->

        <template v-slot:cell(active)="row" >
          <b-badge variant="success" pill v-if="row.item.active">Active</b-badge>
          <b-badge variant="danger"  pill v-else>Inactive</b-badge>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" class="mr-1">
            <b-icon-pencil/>
          </b-button>

          <b-button variant="danger" size="sm" @click="DeleteModal(row.item, $event.target)" v-b-tooltip.hover title="Delete Room">
            <b-icon-trash/>
          </b-button>
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


    <!-- Start Of Edit Modal -->
    <b-modal id="editStrandsModal" ref="editStrandsModal" title="Edit Strand" size="md"  no-close-on-backdrop>
      <b-form-row>
        <!-- Track -->
        <b-col cols="12" md="6" lg="12">
          <b-form-group
            class="track"
            label="Track"
            label-for="Track">
            <b-form-select
              id="Track"
              @change=""
              v-model="strand.track_id" >
              <option
                value="null"
                hidden>Select Track
              </option>
              <option
                v-for="track in trackData"
                v-bind:value="track.id">{{track.track_code}}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <!--  Stracnd Code -->
        <b-col cols="12" md="6" lg="6">
          <b-form-group
            class="strandcode"
            label="Strand Code"
            label-for="strandCode">
            <b-form-input
              type="text"
              v-model="strand.strand_code"
              id="strandCode"
              required>
            </b-form-input>
          </b-form-group>
        </b-col>

        <!-- Room Status -->
        <b-col cols="12" md="6" lg="6">
          <b-form-group
            label="Status">
            <b-form-select
            :options="options"
            v-model="strand.active">
          </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <!--  Strand Description -->
        <b-col cols="12" md="6" lg="12">
          <b-form-group
            class="stranddesc"
            label="Strand Desc"
            label-for="strandDesc">
            <b-form-input
              type="text"
              v-model="strand.strand_desc"
              id="strandDesc"
              required>
            </b-form-input>
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
          <b-button class="float-right" variant="success" @click="updateStrand()">
            Update
          </b-button>
        </b-col>
      </template>

    </b-modal><!-- End of Edit Modal -->

    <!-- Start of Delete Modal -->
    <b-modal id="deleteStrandsModal" ref="deleteStrandsModal" title="Delete Strand" size="md" no-close-on-backdrop>
      <h6>Are you sure you want to delete <br/> <b>{{ this.strand.strand_code }} {{ this.strand.strand_desc }}?</b></h6>
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

    mounted () {
      this.getStrands();
      this.getTracks();
    }, // end of Mounted

    methods:{
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
        Axios
          .get('http://localhost/api/v1/strands', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.items = response.data;
            this.totalRows = this.items.length;

          })
          .catch(error => {
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

      // Reset Form Function
      resetform: function(){
        this.strand = {
          track_id: null,
          strand_code: null,
          strand_desc: null,
          active: 1
        };
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
