<template>
  <div>
    <h1 class="font-weight-bold text-dark">Manage Instructor Time Availability</h1>
    <b-breadcrumb>
      <b-breadcrumb-item to="/manage/instructor">Instructors</b-breadcrumb-item>
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

    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">
      <h5 class=" h5 font-weight-bold text-dark">Add Time Availability</h5><hr/>
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

    <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">

    <b-overlay :show="isLoading" rounded="sm">
    <b-table
      class="my-3 table-striped MyTable"
      responsive
      show-empty
      bordered
      hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter">

      <template v-slot:cell(actions)="row">

        <b-button variant="danger" size="sm" @click="DeleteModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Delete">
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
  </div>
</template>
<script>
  import Axios from "axios";
  import moment from 'moment';
  import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';

  export default{
    name: 'InstructorAvailabilitiesManager',
    components: {
      VueTimepicker
    },
    data(){
      return {
        items: [],
        fields: [
          { key: 'day', label: 'Day', class: 'text-center', sortable: true},
          { key: 'time_start', label: 'Time Start', sortable: true, class: 'text-center' },
          { key: 'time_end', label: 'Time End', sortable: true, class: 'text-center' },
          { key: 'academic_year.academic_year', label: 'Academic Year', sortable: true, class: 'text-center' },
          { key: 'semester.semester', label: 'Semseter', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

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

        isLoading: false,
        academicYearOptions: [],
        semesterOptions: [],
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
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
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/instructors/' + this.instructor.id + '/availabilities', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.isLoading = false;
            //console.log(response.data);
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

      DeleteModal: function(item){
          this.id = item.id,
        this.timeAvailability = {
          day: item.day,
          time_start: item.time_start,
          time_end: item.time_end,
          academic_year_id: item.academic_year_id,
          semester_id: item.semester_id,
          active: item.active,

        };

          this.$root.$emit('bv::show::modal', 'deleteAvailabilityModal')
      },
    }
  }
</script>
