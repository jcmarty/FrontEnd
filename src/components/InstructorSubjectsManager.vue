<template>
  <div>
    <h1>Manage Instructor Preferred Subjects</h1>
    <b-breadcrumb>
      <b-breadcrumb-item @click="$router.go(-1)">Instructors</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ instructor.name }}</b-breadcrumb-item>
    </b-breadcrumb>

    <!-- An alert for displaying success messages -->
    <b-alert variant="success"
      :show="dismissSuccessCountDown"
      @dismissed="dismissSuccessCountDown=0"
      dismissible fade>
        {{alertMessage}}
    </b-alert>

    <!-- An alert for displaying warning and/or error messages -->
    <b-alert variant="danger"
      :show="dismissErrorCountDown"
      @dismissed="dismissErrorCountDown=0"
      dismissible fade>
        <p>{{alertMessage}}</p>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
    </b-alert>

    <div class="panel panel-primary recordMaintenanceForm">
      <div class="panel-heading">Add Preferred Subject</div>
      <div class="panel-body">
        <b-form id="Add_College_Subject_Form">
          <b-form-row>
            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="preferred_subject"
                label="Preferred Subject"
                label-for="preferred_subject">
                <b-form-select
                  id="preferred_subject"
                  v-model="preferredSubject.subject_id"
                  :options="subjectOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="academic_year"
                label="Academic Year"
                label-for="academic_year">
                <b-form-select
                  id="academic_year"
                  v-model="preferredSubject.academic_year_id"
                  :options="academicYearOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="semester"
                label="Semester"
                label-for="semester">
                <b-form-select
                  id="semester"
                  v-model="preferredSubject.semester_id"
                  :options="semesterOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2" class="d-flex justify-content-end align-items-end mb-1">
              <b-button variant="primary" @click="addPreferredSubject" class="px-5">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>

    <b-modal id="deletePreferredSubjModal" ref="deletePreferredSubjModal" title="Delete Preferred Subject" size="lg">
      <p>Are you sure you want to remove {{ this.preferredSubject.subject_description }}?</p>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="hideModal('deletePreferredSubjModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deletePreferredSubject">
          Delete
        </b-button>
      </template>
    </b-modal>

    <!-- DataGrid for displaying instructor's preferred subjects -->
    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>
  </div>
</template>
<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import PreferredSubjectButtons from "./ActionButtons/PreferredSubjectButtons.vue";
  export default{
    name: 'InstructorSubjectsManager',
    components: {
      AgGridVue,
      PreferredSubjectButtons
    },
    data(){
      return {
          settings: this.$store.getters.getSettings,
          instructor: {
            id: null,
            name: null
          },
          columnDefs: null,
          rowData: null,
          id: null,
          preferredSubject: {
            subject_id: null,
            subject_code: null,
            subject_description: null,
            academic_year_id: null,
            semester_id: null,
            active: 1
          },
          subjectOptions: [],
          academicYearOptions: [],
          semesterOptions: [],
          alertMessage: "",
          errors: [],
          dismissSecs: 7,
          dismissSuccessCountDown: 0,
          dismissErrorCountDown: 0,
      }
    },
    beforeMount() {
      this.gridOptions = {
        context: {
            componentParent: this
        }
      };
      this.columnDefs = [
        {headerName: 'Subject Code', field: 'subject.subject_code', sortable: true, filter: true},
        {headerName: 'Description', field: 'subject.subject_description', sortable: true, filter: true},
        {headerName: 'Academic Year', field: 'academic_year.academic_year', sortable: true, filter: true},
        {headerName: 'Semester', field: 'semester.semester', sortable: true, filter: true},
        {headerName: 'Actions', field: 'id', width: 150, cellRendererFramework: 'PreferredSubjectButtons'}
      ];
    },
    mounted() {
      this.getSubjects();
      this.getPreferredSubjects();
      this.getAcademicYears();
      this.getSemesters();
      this.preferredSubject.academic_year_id = this.settings.current_ay;
      this.preferredSubject.semester_id = this.settings.current_sem;
    },
    created() {
        console.log(this.$route.params);
        this.instructor = {
          id: this.$route.params.id,
          name: this.$route.params.first_name + " " + this.$route.params.last_name
        }
    },
    methods: {
      hideModal: function($modal){
        this.$refs[$modal].hide();
      },
      deletePreferredSubject: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/instructors/' + this.instructor.id + '/preferred_subjects/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.getPreferredSubjects();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deletePreferredSubjModal'].hide();
      },
      addPreferredSubject: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/instructors/' + this.instructor.id + '/preferred_subjects', this.preferredSubject, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.getPreferredSubjects();
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
      getPreferredSubjects: function(){
        Axios
          .get('http://localhost/api/v1/instructors/' + this.instructor.id + '/preferred_subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            console.log(response.data);
            this.rowData = response.data;
          })
          .catch(error => {
            console.log(error.response);
          })
      },
      getSubjects: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            for(const subject of response.data){
              this.subjectOptions.push({value: subject.id, text: subject.subject_code + " - " +subject.subject_description});
            }
          })
          .catch(error => {
            console.log(error.response);
          })
      },
      getAcademicYears: function(){
        Axios
          .get('http://localhost/api/v1/academic_years', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            for(const ay of response.data){
              this.academicYearOptions.push({value: ay.id, text: ay.academic_year});
            }
          })
          .catch(error => {
            console.log(error.response.data.message);
          })
      },
      getSemesters: function(){
        Axios
          .get('http://localhost/api/v1/semesters', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            for(const sem of response.data){
              this.semesterOptions.push({value: sem.id, text: sem.semester});
            }
          })
          .catch(error => {
            console.log(error.response.data.message);
          })
      },
    }
  }
</script>
