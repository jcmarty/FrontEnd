<template> <!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1 class="font-weight-bold text-dark">Manage Academic Years</h1>
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

    <!--Main Div of Adding Form Start  -->
    <div class="AddingForm">
      <transition name="fade"> <!-- Transition -->

      <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded"  v-if="showForm"> <!-- Div showForm Start -->
        <div class="h5 font-weight-bold text-dark" >Add New Academic Year</div>
        <hr/>

          <b-form @submit.stop.prevent="onSubmit"> <!-- B-form start -->
            <b-form-row>
              <b-col cols="12" md="6" lg="12">
                <b-form-group
                  :class="{'text-danger' : $v.AcademicYears.academic_year.$error}"
                  label="Academic Year *"
                  label-for="academicYear">
                  <b-form-input
                    type="text"
                    id="academicYear"
                    autofocus
                    v-model.trim="$v.AcademicYears.academic_year.$model"
                    :class="{'is-invalid' :$v.AcademicYears.academic_year.$error}">
                    </b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.AcademicYears.academic_year.required">Academic Year is required!</span>
                    </div>
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
                <b-button variant="success" id="Add_AY_Btn" type="submit">
                  Add
                </b-button>
              </b-col>
            </b-form-row>
          </b-form> <!-- B-form End -->

        </div> <!-- div showForm end -->
      </transition> <!-- Transition End -->
    </div> <!-- Main div End -->

    <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded"> <!-- Table Div Start-->
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
          <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
            Add New Academic Year
          </b-button>
        </b-col>
      </b-row>


      <b-overlay :show="isLoading" rounded="sm"> <!-- Overlay Start-->
        <!-- Main table element -->
        <b-table
          class="my-3 table-striped"
          show-empty
          responsive=true
          bordered
          hover
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          >


          <template v-slot:cell(actions)="row">
            <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Edit Academic Year">
              <b-icon-pencil/>
            </b-button>

            <b-button variant="danger" size="sm"  @click="DeleteModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Edit Academic Year">
              <b-icon-trash/>
            </b-button>
          </template>
        </b-table> <!-- Main table element End -->
      </b-overlay> <!-- Overlay End-->

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

    </div> <!-- Div Table End -->


       <!-- Modal Component -->
    <b-modal id="confirmUpdate" ref="confirmUpdate" size="sm" no-close-on-backdrop>
    <center><h6>Are you sure you want to update this  <br/><b> Academic Year {{this.AcademicYears.academic_year}} ?</b></h6></center>
      <!-- Modal Footer Template -->
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button  class="float-left"  variant="danger" @click="backModalUpdate">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="updateAY">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal>

    <!-- Start Of Edit Modal -->
    <b-modal id="editAYModal" ref="editAYModal" title="Edit Academic Year" size="sm" no-close-on-backdrop>
      <b-form-row>
        <b-col cols="12" md="6" lg="12">
          <b-form-group
            :class="{'text-danger' : $v.AcademicYears.academic_year.$error}"
            label="Academic Year *"
            label-for="academicYear">
            <b-form-input
              type="text"
              id="academicYear"
              autofocus
              v-model.trim="$v.AcademicYears.academic_year.$model"
              :class="{'is-invalid' :$v.AcademicYears.academic_year.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.AcademicYears.academic_year.required">Academic Year is required!</span>
              </div>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- Modal Footer Template -->
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button  class="float-left" size="sm" variant="danger" @click="$bvModal.hide('editAYModal')">
            Cancel
          </b-button>
          <b-button class="float-right" size="sm" variant="success" @click="confirmUpdateModal">
            Update
          </b-button>
        </b-col>
      </template>

    </b-modal> <!-- End of Edit Modal -->

    <!-- Start of Delete Modal -->
    <b-modal id="deleteAYModal" ref="deleteAYModal" title="Delete AY" size="md" no-close-on-backdrop>
      <center><h6>Are you sure you want to delete <br/> <b> Academic Year {{ this.AcademicYears.academic_year }}? </b></h6></center>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button class="float-left" size="sm" variant="danger" @click="$bvModal.hide('deleteAYModal')">
            Cancel
          </b-button>
          <b-button class="float-right" size="sm" variant="success" @click="deleteAY">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal> <!-- End of delete Modal -->

  </div> <!-- End of Main Div -->
</template>  <!-- End of Template --> 

<script>
  import Axios from "axios";
  import { required, minLength, between } from 'vuelidate/lib/validators';
  export default{
    name: 'AcademicYearManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'academic_year', label: 'Academic Year', class: 'text-center', sortable: true},
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        AcademicYears: {
          id: null,
          academic_year: null
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
    }, // End of Data

    validations: {
      AcademicYears: {
       academic_year: {required}
     },
    },

    mounted () {

      this.getAcademicYear();
    }, // End of Mounted

    methods:{
      onSubmit() {
        this.$v.AcademicYears.$touch();
        if (this.$v.AcademicYears.$anyError) {
          return;
        }
        this.addAY()
        // alert("Form submitted!");
      },
      // Get Academic Year Function
      getAcademicYear: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/academic_years', {
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
      }, // End of Get Academic Year Function

      // Add Academic Year Function
      addAY: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/academic_years', this.AcademicYears, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getAcademicYear();
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
      }, // End of add Academic Year Function

      // Update Acadmeic Year Function
      updateAY: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/academic_years/' + this.AcademicYears.id, this.AcademicYears, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getAcademicYear();
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
        this.$refs['editAYModal'].hide();
        this.$refs['confirmUpdate'].hide();
      }, // End of Update Academic Year Function

      // Delete Academic Year Function
      deleteAY: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/academic_years/' + this.AcademicYears.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getAcademicYear();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.resetform();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteAYModal'].hide();
      }, // End of Delete Academic Year Function

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
        this.$refs['editAYModal'].show();
      },

      confirmUpdateModal: function(){
        this.$v.AcademicYears.$touch();
        if (this.$v.AcademicYears.$anyError) {
          return;
        }else {
          this.$refs['confirmUpdate'].show();
          this.$refs['editAYModal'].hide();
        }

      },
      // Reset Form Function
      resetform: function(){
        this.AcademicYears = {
          academic_year: null,
        };
      }, // End of Reset Form Function

      EditModal: function(item, index) {
        var str = item.academic_year;
        var res = str.slice(0,4);
        this.AcademicYears = {
          id: item.id,
          academic_year: res,
        },
        this.$root.$emit('bv::show::modal', 'editAYModal')
      },
      DeleteModal: function(item){

        this.AcademicYears = {
          id: item.id,
          academic_year: item.academic_year,
        },

          this.$root.$emit('bv::show::modal', 'deleteAYModal')
      },

    } // End of Methods
  } //End of Export Default
</script>

<style>
.AddingForm{
  width: 50%;
  position: relative;
  left: 280px;
}
</style>
