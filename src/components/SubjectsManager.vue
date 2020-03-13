<template>  <!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1>Manage Subjects</h1>
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
      <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
        <div class="panel-heading">Add Subject</div>
        <div class="panel-body">
          <b-form id="Add_College_Subject_Form">
            <b-form-row>
                <!-- Suject Code -->
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="subjectcode"
                  label="Subject Code"
                  label-for="subjCode">
                  <b-form-input
                    type="text"
                    v-model="subject.subject_code"
                    id="subjCode"
                    required></b-form-input>
                </b-form-group>
              </b-col>

              <!--  Subject Description -->
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="subjectdesc"
                  label="Subject Description"
                  label-for="subjDesc">
                  <b-form-input
                    type="text"
                    v-model="subject.subject_description"
                    id="subjDesc"
                    required></b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <!-- Lecture Units -->
              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  class="lecUnits"
                  label="Lecture Units"
                  label-for="lec">
                  <b-form-input
                    type="number"
                    v-model="subject.lec"
                    id="lec"
                    required></b-form-input>
                </b-form-group>
              </b-col>

              <!-- Laboratory Units -->
              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  class="labUnits"
                  label="Laboratory Units"
                  label-for="lab">
                  <b-form-input
                    type="number"
                    v-model="subject.lab"
                    id="lab"
                    required></b-form-input>
                </b-form-group>
              </b-col>

              <!-- Total Units -->
              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  class="units"
                  label="Units"
                  label-for="Units">
                  <b-form-input
                    type="number"
                    v-model="subject.units"
                    id="Units"
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
                <b-button variant="success" id="Add_College_Subject_Btn" @click="addSubject">
                  Add
                </b-button>
              </b-col>
            </b-form-row>

          </b-form> <!-- End of b-form  -->
        </div> <!-- End of Panel Body  -->
      </div>  <!-- End of Panel  -->
    </div> <!-- End of Col  -->

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
            Add New Sbuject
          </b-button>
        </b-col>
      </b-row>

      <!-- Main table element -->
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

        <template v-slot:cell(active)="row" >
          <p v-if="row.item.active"><b-badge class="p-2" variant="success">Active</b-badge></p>
          <p v-else><b-badge  class="p-2" variant="danger">Inactive</b-badge></p>

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
    <b-modal id="editSubjModal" ref="editSubjModal" title=" Edit Subject" size="lg" no-close-on-backdrop>
        <b-form-row>
        <!-- Subject Code -->
          <b-col cols="12" md="6" lg="6">
            <b-form-group
              class="subjectcode"
              label="Subject Code"
              label-for="subjCode">
              <b-form-input
                type="text"
                v-model="subject.subject_code"
                id="subjCode"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Subject Description -->
          <b-col cols="12" md="6" lg="6">
            <b-form-group
              class="subjectdesc"
              label="Subject Description"
              label-for="subjDesc">
              <b-form-input
                type="text"
                v-model="subject.subject_description"
                id="subjDesc"
                required>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <!-- Lecture Units -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="lecUnits"
              label="Lecture Units"
              label-for="lec">
              <b-form-input
                type="number"
                v-model="subject.lec"
                id="lec"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!-- Laboratory Units -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="labUnits"
              label="Laboratory Units"
              label-for="lab">
              <b-form-input
                type="number"
                v-model="subject.lab"
                id="lab"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!-- Total Units -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="units"
              label="Units"
              label-for="Units">
              <b-form-input
                type="number"
                v-model="subject.units"
                id="Units"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!-- Subject Status -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              label="Status">
              <b-form-select v-model="subject.active" :options="options"></b-form-select>
            </b-form-group>
          </b-col>
        </b-form-row>

        <!-- Modal Footer Template -->
        <template v-slot:modal-footer="{ cancel, ok }">
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-col>
            <b-button class="float-left" variant="danger" @click="$bvModal.hide('editSubjModal')">
              Cancel
            </b-button>
            <b-button class="float-right" variant="success" @click="updateSubject()">
              Update
            </b-button>
          </b-col>
        </template>

    </b-modal> <!-- End of Edit Modal -->

    <!-- Start of Delete Modal -->
    <b-modal class="modal" id="deleteSubjModal" ref="deleteSubjModal" title="Delete Subject" size="md" no-close-on-backdrop>
      <h6>Are you sure you want to delete this <br/> <b>{{this.subject.subject_code}} {{ this.subject.subject_description }}?</b></h6>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button class="float-left" variant="danger" @click="$bvModal.hide('deleteSubjModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="deleteSubject()">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal> <!-- End of delete Modal -->

  </div> <!-- End of Main Div -->
</template>   <!-- End of Template -->

<script>
  import Axios from "axios";
  export default{
    name: 'SubjectsManager',
    data() {
      return {
        items: [],
        fields: [

          { key: 'subject_code', label: 'Subject Code', sortable: true, class: 'text-center' },
          { key: 'subject_description', label: 'Subject Description', sortable: true, class: 'text-center' },
          { key: 'lec', label: 'Lec units', sortable: true, class: 'text-center' },
          { key: 'lab', label: 'Lab Unit', sortable: true, class: 'text-center' },
          { key: 'units', label: 'Units', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        subject: {
          id: null,
          subject_code: null,
          subject_description: null,
          lec: 0,
          lab: 0,
          units: 0,
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
    }, // end of data


    mounted () {
      this.getSubjects();
    }, //end of mounted

    methods:{
      // get subject function
      getSubjects: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
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
      }, // end of get subject function

      // Add Subject function
      addSubject: function(){
        this.errors = [];
        this.subject.units = parseInt(this.subject.lec) + parseInt(this.subject.lab);
        Axios
          .post('http://localhost/api/v1/subjects', this.subject, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSubjects();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.showForm = false
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
      }, // End of add subject function

      // Update subject function
      updateSubject: function(){
        this.errors = [];
        this.subject.units = parseInt(this.subject.lec) + parseInt(this.subject.lab);
        Axios
          .put('http://localhost/api/v1/subjects/' + this.subject.id, this.subject, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSubjects();
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
        this.$refs['editSubjModal'].hide();
      }, // End of Update Subject function

      // Delete Subject Function
      deleteSubject: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/subjects/' + this.subject.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSubjects();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.resetform();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteSubjModal'].hide();
      }, // End of Delete Subject Function

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
        this.subject = {
          subject_code: null,
          subject_description: null,
          lec: 0,
          lab: 0,
          units: 0,
          active: 1
        };
      }, // End of Reset Form Function

      EditModal: function(item, index) {

        this.subject = {
          id: item.id,
          subject_code: item.subject_code,
          subject_description: item.subject_description,
          lec: item.lec,
          lab: item.lab,
          units: item.units,
          active: item.active
        };
        this.$root.$emit('bv::show::modal', 'editSubjModal')
      },
      DeleteModal: function(item){
        this.subject = {
          id: item.id,
          subject_code: item.subject_code,
          subject_description: item.subject_description,
          lec: item.lec,
          lab: item.lab,
          units: item.units,
          active: item.active
        };

          this.$root.$emit('bv::show::modal', 'deleteSubjModal')
      },
    } // End of Methods
  } // End of Export Default
</script>
