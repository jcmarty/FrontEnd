<template>
  <div>
    <h1>Manage Student Enrollment</h1>

    <div class="panel panel-primary recordMaintenanceForm">
      <div class="panel-heading">Enroll Student</div>
      <div class="panel-body">

        <b-form id="Add_Semester_Form">
          <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="studentno"
              label="Student No."
              label-for="studentNo">
              <b-form-input
                type="text"
                v-bind:value=" RegStudent.student_number "
                id="studentNo"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="studentStatus"
              label="Student Status"
              label-for="studentStatus">
              <b-form-input
                type="text"
                v-model="semesters.semester"
                id="studentStatus"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="academicstatus"
              label="Academic Status"
              label-for="academicStatus">
              <b-form-input
                type="text"
                v-model="semesters.semester"
                id="academicStatus"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="fullname"
              label="Full Name"
              label-for="fullName">
              <b-form-input
                type="text"
                v-bind:value=" RegStudent.name "
                id="fullName"
                required></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="course"
              label="Course"
              label-for="Course">
              <b-form-input
                type="text"
                v-model="semesters.semester"
                id="Course"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="curriculom"
              label="Curriculom"
              label-for="Curriculom">
              <b-form-input
                type="text"
                v-model="semesters.semester"
                id="Curriculom"
                required></b-form-input>
            </b-form-group>
          </b-col>

        <b-col cols="12" md="6" lg="3">
          <b-form-group
            class="yearlevel"
            label="Year Level"
            label-for="yearLevel">
            <b-form-input
              type="text"
              v-model="semesters.semester"
              id="yearLevel"
              required></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="3">
          <b-form-group
            class="dateenrolled"
            label="Date Enrolled"
            label-for="dateEnrolled">
            <b-form-input
              type="text"
              v-model="semesters.semester"
              id="dateEnrolled"
              required></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>




    <!-- <b-form-row>
      <h5>Subject Enrolled</h5>
      <ag-grid-vue class="ag-theme-material"
        :columnDefs="SubjectsColDef"
        :rowData="SubjectcsRowData"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="10"
        :gridOptions="gridOptions">
      </ag-grid-vue>
    </b-form-row>

    <b-form-row>
      <h5>Subject List</h5>
      <ag-grid-vue class="ag-theme-material"
        :columnDefs="SubjectsColDef"
        :rowData="SubjectcsRowData"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="10"
        :gridOptions="gridOptions">
      </ag-grid-vue>
    </b-form-row> -->


          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_Semester_Btn" @click="addSemeter">
                Add
              </b-button>
            </b-col>
          </b-form-row>

        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  import SemestersActionButtons from "./ActionButtons/SemestersActionButtons.vue";
  export default{
    name: 'StudentEnrollmentManager',
    components: {
      AgGridVue,
      SemestersActionButtons
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        SubjectsColDef: null,
        SubjectcsRowData: null,
        SubjectEnColdef: null,
        SubjectEnRowData: null,
        id: null,
        semesters:{
          semester:null
        },
        RegStudent:{
          id: null,
          name: null,
          student_number:null,
        },
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
      this.SubjectsColDef = [
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 150},
          {headerName: 'Subject Code', field: 'subject_code', sortable: true, filter: true, width: 150,},
          {headerName: 'Subject Description', field: 'subject_description',  sortable: true, filter: true, width: 350},
          {headerName: 'Action', field: 'subject_description', cellRendererFramework: 'SemestersActionButtons'}
      ];

      this.SubjectEnColdef = [
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 150},
          {headerName: 'Subject Code', field: 'subject_code', sortable: true, filter: true, width: 150,},
          {headerName: 'Subject Description', field: 'subject_description',  sortable: true, filter: true, width: 350},
          {headerName: 'Action', field: 'subject_description', cellRendererFramework: 'SemestersActionButtons'}
      ];

    },

    mounted () {
      this.test();
      this.getSemesters();
    },


    methods:{
      getSemesters: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.SubjectcsRowData = response.data;
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

      getClassSched: function(){
        Axios
          .get('http://localhost/api/v1/class_schedules', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.SubjectEnRowData = response.data;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      },

      getRegisteredStudent: function(){
        Axios
          .get('http://localhost/api/v1/students/' + this.RegStudent.id,  {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            this.rowData = response.data;

          })
          .catch(error => {
            console.log(error.response);
          })
      },

      toggleForm: function(){
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },
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
            // clear room data
            this.semesters = {
              semester: null
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
      updateSemester: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/semesters/' + this.id, this.semesters, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getSemesters();
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          // clear subject data
          this.semesters = {
            semester: null
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
        this.$refs['editSemesterModal'].hide();
      },
      deleteSemester: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/semesters/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSemesters();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.semesters = {
              semester: null
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
        this.$refs['deleteSemesterModal'].hide();
      },

      // start of testing
      test: function(){
        if(Object.keys(this.$route.params).length === 0){
          this.RegStudent = {
               id: '',
               name: '',
               student_number: '',
             };
        }else {
             this.RegStudent = {
                  id: this.$route.params.id,
                  name: this.$route.params.first_name + " " + this.$route.params.last_name,
                  student_number: this.$route.params.student_number,
                };
        }
        console.log(this.$route.params);
      }
    }
  }
</script>
