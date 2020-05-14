<template><!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1>Manage Semesters</h1>
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
    <div class="addPanelSemester">

      <transition name="fade">
      <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="showForm">
        <div class="h5 font-weight-bold text-dark" >Add New Semester</div>
        <hr/>

          <b-form id="Add_Semester_Form">
            <b-form-row>
              <!-- Semester -->
              <b-col cols="12" md="6" lg="12">
                <b-form-group
                  class="semester"
                  label="Semester"
                  label-for="Semester">
                  <b-form-input
                    type="text"
                    v-model="semesters.semester"
                    id="Semester"
                    required></b-form-input>
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
                <b-button variant="success" id="Add_Semester_Btn" @click="addSemeter">
                  Add
                </b-button>
              </b-col>
            </b-form-row>

          </b-form> <!-- End of b-form  -->
      </div> <!-- End of Panel  -->
      </transition>
    </div> <!-- End of Col  -->

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
            Add New Semester
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

        <template v-slot:cell(actions)="row">
          <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Edit Semester">
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
    <b-modal id="editSemesterModal" ref="editSemesterModal" title="Edit Semester" size="md" no-close-on-backdrop>
      <b-form-row>
      <!-- Semester  -->
        <b-col cols="12" md="6" lg="12">
          <b-form-group
            class="semester"
            label="Semester"
            label-for="Semester">
            <b-form-input
              type="text"
              v-model="semesters.semester"
              id="roomNumber"
              required>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- Modal Footer Template -->
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('editSemesterModal')">
            Cancel
          </b-button>
          <b-button class="float-right" variant="success" @click="updateSemester()">
            Update
          </b-button>
        </b-col>
      </template>

    </b-modal> <!-- End of Edit Modal -->

    <!-- Start of Delete Modal -->
    <b-modal id="deleteSemesterModal" ref="deleteSemesterModal" title="Delete Semester" size="md" no-close-on-backdrop>
      <h6>Are you sure you want to delete <br/> <b> {{ this.semesters.semester }}?</b></h6>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('deleteSemesterModal')">
            No
          </b-button>
          <b-button  class="float-right"  variant="success" @click="deleteSemester()">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal> <!-- End of delete Modal -->

  </div> <!-- End of Main Div -->
</template> <!-- End of Template -->

<script>
  import Axios from "axios";
  export default{
    name: 'SemestersManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'semester', label: 'Semester', class: 'text-center', sortable: true},
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        semesters:{
          id: null,
          semester:null
        },

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
      this.getSemesters();
    }, // End of Mounted

    methods:{
      // Get Semester Function
      getSemesters: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/semesters', {
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
      }, // End of Get Semester Function

      //Add Semester Function
      addSemeter: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/semesters', this.semesters, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSemesters();
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
      }, // End of Add Semester function

      // Update Semester Function
      updateSemester: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/semesters/' + this.semesters.id, this.semesters, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getSemesters();
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
        this.$refs['editSemesterModal'].hide();
      }, // End of Update Semester Function

      //Delete Semester Function
      deleteSemester: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/semesters/' + this.semesters.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSemesters();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.resetform();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteSemesterModal'].hide();
      }, //End of Delete Semester Function

      // Toggle Form Function
      toggleForm: function(){
        this.resetform();
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },// End of Toggle Form Function

      // Reset Form Function
      resetform: function(){
        this.semesters = {
          semester: null
        };
      }, // End of Reset Form Function

      EditModal: function(item, index) {
        this.semesters = {
          id: item.id,
          semester: item.semester
        },
        this.$root.$emit('bv::show::modal', 'editSemesterModal')
      },
      DeleteModal: function(item){
        this.semesters = {
          id: item.id,
          semester: item.semester
        },

          this.$root.$emit('bv::show::modal', 'deleteSemesterModal')
      },
    } // End of Methods
  }// End of Export Default
</script>

<style>
.addPanelSemester{
  width: 50%;
  position: relative;
  left: 280px;
}
</style>
