<template>
  <div>
    <h1>Manage Subjects</h1>
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
      <div class="panel-heading">Add a Subject</div>
      <div class="panel-body">
        <b-form id="Add_College_Subject_Form">
          <b-form-row>
          <!-- Subject Code -->
            <b-col cols="12" md="6" lg="3">
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
            <b-col cols="12" md="6" lg="3">
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

            <!-- Units -->
            <b-col cols="12" md="6" lg="3">
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

            <b-col cols="12" md="6" lg="3">
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
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_College_Subject_Btn" @click="addSubject">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>
    <!--Form end  -->

    <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New Subject
    </b-button>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

    <b-modal id="editSubjModal" ref="editSubjModal" title="Edit Subject" size="xl">
      <b-form-row>
      <!-- Subject Code -->
        <b-col cols="12" md="6" lg="2">
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
        <b-col cols="12" md="6" lg="4">
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

        <!-- Units -->
        <b-col cols="12" md="6" lg="2">
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

        <b-col cols="12" md="6" lg="2">
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

        <b-col cols="12" md="6" lg="2">
          <b-form-group
            label="Status">
            <b-form-select v-model="subject.active" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('editSubjModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="updateSubject()">
          Update
        </b-button>
      </template>
    </b-modal>

    <b-modal id="deleteSubjModal" ref="deleteSubjModal" title="Delete Subject" size="lg">
      <p>Are you sure you want to delete {{ this.subject.subject_description }}?</p>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('deleteSubjModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deleteSubject()">
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
  import SubjectActionButtons from "./ActionButtons/SubjectActionButtons.vue";
  export default{
    name: 'SubjectsManager',
    components: {
      AgGridVue,
      SubjectActionButtons
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        id: null,
        subject: {
          subject_code: null,
          subject_description: null,
          lec: 0,
          lab: 0,
          units: null,
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
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 80},
          {headerName: 'Code', field: 'subject_code', sortable: true, filter: true, width: 130,},
          {headerName: 'Description', field: 'subject_description', sortable: true, filter: true, resizable: true},
          {headerName: 'Lecture Units', field: 'lec', sortable: true, filter: true, width: 150,},
          {headerName: 'Laboratory Units', field: 'lab', sortable: true, filter: true, width: 180,},
          {headerName: 'Total Units', field: 'units', sortable: true, filter: true, width: 130},
          {headerName: 'Status', field: 'active', width: 120,
            cellRenderer: (data) => {
              if(data.value === 1){
                return 'Active';
              } else {
                return 'Inactive';
              }
            }},
          {headerName: 'Actions', field: 'id', cellRendererFramework: 'SubjectActionButtons'}
      ];

    },
    mounted () {
      this.getSubjects();
    },
    methods:{
      getSubjects: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
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
            // clear subject data
            this.subject = {
              subject_code: null,
              subject_description: null,
              lec: 0,
              lab: 0,
              units: null,
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
      updateSubject: function(){
        this.errors = [];
        this.subject.units = parseInt(this.subject.lec) + parseInt(this.subject.lab);
        Axios
          .put('http://localhost/api/v1/subjects/' + this.id, this.subject, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSubjects();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear subject data
            this.subject = {
              subject_code: null,
              subject_description: null,
              lec: 0,
              lab: 0,
              units: null,
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
        this.$refs['editSubjModal'].hide();
      },
      deleteSubject: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/subjects/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSubjects();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear subject data
            this.subject = {
              subject_code: null,
              subject_description: null,
              lec: 0,
              lab: 0,
              units: null,
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
        this.$refs['deleteSubjModal'].hide();
      }
    }
  }
</script>
