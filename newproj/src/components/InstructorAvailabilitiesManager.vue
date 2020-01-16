<template>
  <div>
    <h1>Manage Instructor Time Availability</h1>
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
      <div class="panel-heading">Add Time Availability</div>
      <div class="panel-body">
        <b-form>
          <b-form-row>
            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="academic_year"
                label="Academic Year"
                label-for="academic_year">
                <b-form-select
                  id="academic_year"
                  v-model="timeAvailability.academic_year_id"
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
                  v-model="timeAvailability.semester_id"
                  :options="semesterOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="day"
                label="Day"
                label-for="day">
                <b-form-select
                  id="day"
                  v-model="timeAvailability.day"
                  :options="dayOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="time_start"
                label="Time Start"
                label-for="time_start">
                  <vue-timepicker v-model="timeAvailability.time_start" format="hh:mm A" close-on-complete></vue-timepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="time_end"
                label="Time End"
                label-for="time_end">
                  <vue-timepicker v-model="timeAvailability.time_end" format="hh:mm A" close-on-complete></vue-timepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2" class="d-flex justify-content-end align-items-end mb-1">
              <b-button variant="primary" @click="addTimeAvailability" class="px-5">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>

    <b-modal id="deleteAvailabilityModal" ref="deleteAvailabilityModal" title="Delete Time Availability" size="lg">
      <p>Are you sure you want to remove {{ timeAvailability.day }} {{ timeAvailability.time_start }} - {{ timeAvailability.time_end }}?</p>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="hideModal('deleteAvailabilityModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deleteTimeAvailability">
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
  import moment from 'moment';
  import InstructorAvailabilitiesButtons from "./InstructorAvailabilitiesButtons.vue";
  import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';

  export default{
    name: 'InstructorAvailabilitiesManager',
    components: {
      AgGridVue,
      InstructorAvailabilitiesButtons,
      VueTimepicker
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
          timeAvailability: {
            day: null,
            time_start: null,
            time_end: null,
            academic_year_id: null,
            semester_id: null,
            active: 1
          },
          dayOptions: [
            {value: 'Monday', text: 'Monday'},
            {value: 'Tuesday', text: 'Tuesday'},
            {value: 'Wednesday', text: 'Wednesday'},
            {value: 'Thursday', text: 'Thursday'},
            {value: 'Friday', text: 'Friday'},
            {value: 'Saturday', text: 'Saturday'},
          ],
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
        {headerName: 'Day', field: 'day', sortable: true, filter: true},
        {headerName: 'Time Start', field: 'time_start', sortable: true},
        {headerName: 'Time End', field: 'time_end', sortable: true},
        {headerName: 'Academic Year', field: 'academic_year', sortable: true, filter: true},
        {headerName: 'Semester', field: 'semester', sortable: true, filter: true},
        {headerName: 'Actions', field: 'id', width: 150, cellRendererFramework: 'InstructorAvailabilitiesButtons'}
      ];
    },
    mounted() {
      this.getTimeAvailabilities();
      this.getAcademicYears();
      this.getSemesters();
      this.timeAvailability.academic_year_id = this.settings.current_ay;
      this.timeAvailability.semester_id = this.settings.current_sem;
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
      getTimeAvailabilities: function(){
        Axios
          .get('http://localhost/api/v1/instructors/' + this.instructor.id + '/availabilities', {
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
      deleteTimeAvailability: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/instructors/' + this.instructor.id + '/availabilities/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.timeAvailability.time_start = {"HH":"","H":"","hh":"","h":"","a":"","A":"","kk":"","k":"","m":"","mm":"","s":"","ss":""};
            this.timeAvailability.time_end = {"HH":"","H":"","hh":"","h":"","a":"","A":"","kk":"","k":"","m":"","mm":"","s":"","ss":""};
            this.getTimeAvailabilities();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteAvailabilityModal'].hide();
      },
      addTimeAvailability: function(){
        this.errors = [];
        this.timeAvailability.time_start
          = moment(this.timeAvailability.time_start.hh + ":"
            + this.timeAvailability.time_start.mm + " "
            + this.timeAvailability.time_start.A, ["hh:mm A"]).format("HH:mm");
        this.timeAvailability.time_end
          = moment(this.timeAvailability.time_end.hh
            + ":" + this.timeAvailability.time_end.mm + " "
            + this.timeAvailability.time_end.A, ["hh:mm A"]).format("HH:mm");
        Axios
          .post('http://localhost/api/v1/instructors/' + this.instructor.id + '/availabilities', this.timeAvailability, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // reset time_start and time_end by converting time_start and time_end back to empty objects
            this.timeAvailability.time_start = {"HH":"","H":"","hh":"","h":"","a":"","A":"","kk":"","k":"","m":"","mm":"","s":"","ss":""};
            this.timeAvailability.time_end = {"HH":"","H":"","hh":"","h":"","a":"","A":"","kk":"","k":"","m":"","mm":"","s":"","ss":""};
            this.getTimeAvailabilities();
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
      getSubjects: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            for(const subject of response.data){
              this.subjectOptions.push({value: subject.id, text: subject.subject_description});
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
