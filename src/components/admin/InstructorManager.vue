<template>
  <div>
    <h1 class="font-weight-bold text-dark">Manage Instructors</h1>
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

    <transition name="fade">
      <!-- start of academic form -->
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="InsPersonalInfoForm">
      <div class=" h5 font-weight-bold text-dark">Personal Information</div>
      <hr/>
        <div class="">
          <b-form-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="employeeid"
                label="Employee ID"
                label-for="empID">
                <b-form-input
                  type="text"
                  v-model="instructor.employee_id"
                  id="empID">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="firstname"
                label="First Name"
                label-for="firstname">
                <b-form-input
                  type="text"
                  v-model="instructor.first_name"
                  id="firstname">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="middlename"
                label="Middle Name"
                label-for="middlename">
                <b-form-input
                  type="text"
                  v-model="instructor.middle_name"
                  id="middlename">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="lastname"
                label="Last Name"
                label-for="lastname">
                <b-form-input
                  type="text"
                  v-model="instructor.last_name"
                  id="lastname">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="birthdate"
                label="Birth Date"
                label-for="birthDate">
                <datepicker
                  v-model="instructor.birth_date"
                  id="birthDate"
                  :clear-button="true"
                  :calendar-button="true"
                  :calendar-button-icon="calendarIcon"
                  :bootstrap-styling="true"
                  :format="birthDateFormat">
                </datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="gender"
                label="Gender"
                label-for="gender">
                <b-form-select
                  v-model="instructor.gender"
                  :options="genderOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="email"
                label="Email"
                label-for="email">
                <b-form-input
                  type="email"
                  v-model="instructor.email"
                  id="email"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="contact_no"
                label="Contact No"
                label-for="contact_no">
                <b-form-input
                  type="number"
                  v-model="instructor.contact_no"
                  id="contact_no">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="address"
                label="Address"
                label-for="address">
                <b-form-input
                  type="text"
                  v-model="instructor.address"
                  id="address">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="city"
                label="City / Municipality"
                label-for="city">
                <b-form-input
                  type="text"
                  v-model="instructor.city"
                  id="city">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="province"
                label="Province"
                label-for="province">
                <b-form-input
                  type="text"
                  v-model="instructor.province"
                  id="province">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="postal_code"
                label="Postal Code"
                label-for="postal_code">
                <b-form-input
                  type="text"
                  v-model="instructor.postal_code"
                  id="postal_code">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="CancelInsForm">
                cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" @click="ShowEducationalForm">
                Next
              </b-button>
            </b-col>
          </b-form-row>

        </div>
      </div>
      <!-- end of academic form -->
    </transition>

    <transition name="fade">
      <!-- start of academic form -->
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="InsEducAttainmentForm">
      <div class=" h5 font-weight-bold text-dark">Educational Attainment</div>
      <hr/>
        <div class="">
          <b-form-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group
                class="educational_attainment"
                label="Educational Attainment"
                label-for="educational_attainment">
                <b-form-textarea
                  id="educational_attainment"
                  v-model="instructor.educational_attainment"
                  rows="3"
                  max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="4">
              <b-form-group
                class="certifications"
                label="Certifications"
                label-for="certifications">
                <b-form-textarea
                  id="certifications"
                  v-model="instructor.certifications"
                  rows="3"
                  max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="4">
              <b-form-group
                class="work_experience"
                label="Work Experience"
                label-for="work_experience">
                <b-form-textarea
                  id="work_experience"
                  v-model="instructor.work_experience"
                  rows="3"
                  max-rows="6">
                </b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="BackPersonalForm">
                Previous
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" @click="ShowPreferredSubjForm">
                Next
              </b-button>
            </b-col>
          </b-form-row>

        </div>
      </div>
      <!-- end of academic form -->
    </transition>

    <transition name="fade">
      <!-- start of academic form -->
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="InsPrefSubjectForm">
      <div class=" h5 font-weight-bold text-dark">Preferred Subjects</div>
      <hr/>
      <div class="">
        <b-form-row>
          <b-col cols="12" md="6" lg="6">
            <b-form-group
              class="preferred_subject"
              label="Preferred Subject"
              label-for="preferred_subject">
              <b-form-select
                id="preferred_subject"
                v-model="newPreferredSubject.subject_id"
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
                v-model="newPreferredSubject.academic_year_id"
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
                v-model="newPreferredSubject.semester_id"
                :options="semesterOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="2" class="d-flex justify-content-end align-items-end mb-1">
            <b-button variant="success" @click="addPreferredSubject('new')" class="px-5">
              Add
            </b-button>
          </b-col>
        </b-form-row>

        <b-overlay :show="isLoading" rounded="sm">
        <b-form-row>
          <b-table
            class="my-3 table-striped MyTable"
            responsive
            show-empty
            bordered
            hover
            :items="PrefSubItems"
            :fields="PrefSubFields"
            :current-page="PrefSubcurrentPage"
            :per-page="PrefSubperPage"
            :filter="PrefSubfilter">

            <template v-slot:cell(actions)="row">
              <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Edit Room">
                <b-icon-pencil/>
              </b-button>
            </template>
          </b-table>
        </b-form-row>
        </b-overlay>

        <b-form-row>
          <b-col>
            <b-button variant="danger" @click="BackEducationalForm">
              Previous
            </b-button>
          </b-col>
          <b-col class="d-flex justify-content-end">
            <b-button variant="primary" @click="ShowTimeAvailForm">
              Next
            </b-button>
          </b-col>
        </b-form-row>

      </div>
    </div>
      <!-- end of academic form -->
    </transition>

    <transition name="fade">
      <!-- start of academic form -->
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded"  v-if="InsTimeAvailabilityForm">
      <div class=" h5 font-weight-bold text-dark">Time Availability</div>
      <hr/>
      <div class="">
        <b-form-row>
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="academic_year"
              label="Academic Year"
              label-for="academic_year">
              <b-form-select
                id="academic_year"
                v-model="newTimeAvailability.academic_year_id"
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
                v-model="newTimeAvailability.semester_id"
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
                v-model="newTimeAvailability.day"
                :options="dayOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="time_start"
              label="Time Start"
              label-for="time_start">
                <vue-timepicker v-model="newTimeAvailability.time_start" format="hh:mm A" close-on-complete></vue-timepicker>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="time_end"
              label="Time End"
              label-for="time_end">
                <vue-timepicker v-model="newTimeAvailability.time_end" format="hh:mm A" close-on-complete></vue-timepicker>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="2" class="d-flex justify-content-end align-items-end mb-1">
            <b-button variant="success" @click="addTimeAvailability" class="px-5">
              Add
            </b-button>
          </b-col>
        </b-form-row>

        <b-overlay :show="isLoading" rounded="sm">
        <b-form-row>
          <b-table
            class="my-3 table-striped MyTable"
            responsive
            show-empty
            bordered
            hover
            :items="TimeAvailItems"
            :fields="TimeAvailFields"
            :current-page="TimeAvailcurrentPage"
            :per-page="TimeAvailperPage"
            :filter="TimeAvailfilter">

            <template v-slot:cell(actions)="row">
              <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Edit Room">
                <b-icon-pencil/>
              </b-button>
            </template>
          </b-table>
        </b-form-row>
        </b-overlay>

        <b-form-row>
          <b-col>
            <b-button variant="danger" @click="BackPrefferedSubjFrom">
              Previous
            </b-button>
          </b-col>
          <b-col class="d-flex justify-content-end">
            <b-button variant="primary" @click="Finish">
              Finish
            </b-button>
          </b-col>
        </b-form-row>

      </div>
    </div>
      <!-- end of academic form -->
    </transition>

    <transition name="fade">
      <!-- start of academic form -->
      <div id="" class="px-4 py-3 mt-4 mx-3 shadow rounded bg-white" v-if="InsTableForm">
      <div class="">

    <b-row>
      <b-col lg="4" class="my-1 ">
          <b-input-group  size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search">
            </b-form-input>
          </b-input-group>
      </b-col>

      <b-col class="">
        <!-- Add New Room Button -->
        <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="InsTableAddBtn">
          Add new Instructor
        </b-button>
      </b-col>
    </b-row>

    <b-overlay :show="isLoading" rounded="sm">
    <b-table
      class="my-3 table-striped MyTable"
      responsive
      bordered
      hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter">

      <template v-slot:cell(active)="row" >
        <b-form-checkbox switch size="sm" :checked="row.item.status"  @change="StatusUpdate(row.item, $event.target)">
          <b-badge variant="success" pill v-if="row.item.active">Active</b-badge>
          <b-badge variant="danger"  pill v-else>Inactive</b-badge>
        </b-form-checkbox>
      </template>

      <template v-slot:cell(actions)="row">

        <b-button variant="info" size='sm' @click="ViewInstructorAvailabilities(row.item, row.index, $event.target)" v-b-tooltip.hover title="Availability">
          <b-icon-clock/>
        </b-button>

        <b-button variant="info" size="sm" @click="ViewInstructorSubjects(row.item, row.index, $event.target)" v-b-tooltip.hover title="Subjects">
          <b-icon-book/>
        </b-button>

        <b-button variant="info" size="sm" @click="ViewInstructorInformation(row.item, row.index, $event.target)" v-b-tooltip.hover title="Information">
          <b-icon-info/>
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
<!-- end of academic form -->
</transition>
    <!-- end of table -->

  </div>
</template>
<script>
  import Axios from "axios";
  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker';
  import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';

  export default{
    name: 'InstructorManager',
    components: {
      VueTimepicker,
      Datepicker
    },
    data() {
      return{
        items: [],
        fields: [
          { key: 'employee_id', label: 'Employee ID', class: 'text-center', sortable: true},
          { key: 'first_name', label: 'Full Name', sortable: true, class: 'text-center' },
          { key: 'birth_date', label: 'Birthdate', sortable: true, class: 'text-center' },
          { key: 'gender', label: 'Gender', sortable: true, class: 'text-center' },
          { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
          { key: 'contact_no', label: 'Contact Number', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        PrefSubItems: [],
        PrefSubFields: [
          { key: 'subject.subject_code', label: 'Subject Code', class: 'text-center', sortable: true},
          { key: 'subject.subject_title', label: 'Subject Title', sortable: true, class: 'text-center' },
          { key: 'academic_year.academic_year', label: 'Academic Year', sortable: true, class: 'text-center' },
          { key: 'semester.semester', label: 'Semester', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        PrefSubtotalRows: 1,
        PrefSubcurrentPage: 1,
        PrefSubperPage: 5,

        TimeAvailItems: [],
        TimeAvailFields: [
          { key: 'day', label: 'Day', class: 'text-center', sortable: true},
          { key: 'time_start', label: 'Time Start', sortable: true, class: 'text-center' },
          { key: 'time_end', label: 'Time End', sortable: true, class: 'text-center' },
          { key: 'academic_year.academic_year', label: 'Academic Year', sortable: true, class: 'text-center' },
          { key: 'semester.semester', label: 'Semester', sortable: true, class: 'text-center' },
        ],

        TimeAvailtotalRows: 1,
        TimeAvailcurrentPage: 1,
        TimeAvailperPage: 5,
        TimeAvailpageOptions: [5, 10, 15, 20, 25],






        instructor: {
          id: null,
          employee_id: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          birth_date: null,
          gender: null,
          email: null,
          contact_no: null,
          address: null,
          city: null,
          province: null,
          postal_code: null,
          work_experience: null,
          certifications: null,
          educational_attainment: null,
          availabilities: [],
          preferred_subjects: [],
          active: 1
        },


        InsPersonalInfoForm: false,
        InsEducAttainmentForm: false,
        InsPrefSubjectForm: false,
        InsTimeAvailabilityForm: false,
        InsTableForm:  true,
        InsTableAddBtn:  true,

        settings: this.$store.getters.getSettings,
        tabIndex: 0,
        secondTabDisabled: true,
        lastTabsDisabled: true,
        personalInfoColumnDefs: null,
        personalInfoRowData: null,
        preferredSubjectsColumnDefs: null,
        preferredSubjectsRowData: null,
        timeAvailabilityColumnDefs: null,
        timeAvailabilityRowData: null,
        instructorId: null,

        subjectOptions: [],
        academicYearOptions: [],
        semesterOptions: [],

        newPreferredSubject: {
          subject_id: null,
          academic_year_id: null,
          semester_id: null,
          active: 1
        },

        genderOptions: [
          {value: 'Male', text: 'Male'},
          {value: 'Female', text: 'Female'}
        ],

        dayOptions: [
          {value: 'Monday', text: 'Monday'},
          {value: 'Tuesday', text: 'Tuesday'},
          {value: 'Wednesday', text: 'Wednesday'},
          {value: 'Thursday', text: 'Thursday'},
          {value: 'Friday', text: 'Friday'},
          {value: 'Saturday', text: 'Saturday'},
        ],

        newTimeAvailability: {
          instructor_id: null,
          academic_year_id: null,
          semester_id: null,
          day: null,
          time_start: null,
          time_end: null,
          active: 1
        },

        isLoading: false,
        calendarIcon: "fa fa-calendar",
        birthDateFormat: "MMM dd, yyyy",
        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
        updateSuccessCountDown: 0,
        updateErrorCountDown: 0,
      }
    },

    mounted () {
      this.getInstructors();
      this.getSubjects();
      if(this.instructor.id != null){
        this.getPreferredSubjects();
        this.getTimeAvailabilities();
      }
      this.getAcademicYears();
      this.getSemesters();
      this.newPreferredSubject.academic_year_id = this.settings.current_ay;
      this.newPreferredSubject.semester_id = this.settings.current_sem;
      this.newTimeAvailability.academic_year_id = this.settings.current_ay;
      this.newTimeAvailability.semester_id = this.settings.current_sem;
    },
    methods:{
      clearInstructorData: function(){

        this.instructor = {
          id: null,
          employee_id: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          birth_date: null,
          gender: null,
          email: null,
          contact_no: null,
          address: null,
          city: null,
          province: null,
          postal_code: null,
          work_experience: null,
          certifications: null,
          educational_attainment: null,
          availabilities: [],
          preferred_subjects: [],
          active: 1
        };
      },

      hideModal: function($modal){
        this.clearInstructorData();
        this.$refs[$modal].hide();
      },

      nextTab: function(){
        this.secondTabDisabled = false;
        this.tabIndex++;
      },

      getSubjects: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            for(const subject of response.data){
              this.subjectOptions.push({value: subject.id, text: subject.subject_code});
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

      getInstructors: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/instructors', {
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
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      },

      AddInstructor: function(){
        this.errors = [];
        // Datepicker returns a date format that is different from what is required by the api/db
        // Use moment to format the date
        // TODO: check if format is correct; console is returning a deprecation warning
        this.instructor.birth_date = moment(String(this.instructor.birth_date)).format('YYYY-MM-DD');
        Axios
          .post('http://localhost/api/v1/instructors', this.instructor, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.instructor.id = response.data.last_insert_id;
            this.getPreferredSubjects();
            this.getTimeAvailabilities();
            this.getInstructors();
            console.log(
              this.instructor.id
            )
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

      EditModal: function(item, index) {
        this.instructor = {
          id: item.id,
          employee_id: item.employee_id,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
          birth_date: item.birth_date,
          gender: item.gender,
          email: item.email,
          contact_no: item.contact_no,
          address: item.address,
          city: item.city,
          province: item.province,
          postal_code: item.postal_code,
          work_experience: item.work_experience,
          certifications: item.certifications,
          educational_attainment: item.educational_attainment,
          availabilities: item.availabilities,
          preferred_subjects: item.preferred_subjects,
          active: item.active
        },

        this.$root.$emit('bv::show::modal', 'editInstructorModal')
      },

      updateInstructor: function(){
        this.errors = [];
        Axios
          .put('http://localhost/api/v1/instructors/' + this.instructor.id, this.instructor, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.tabIndex--;
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.getInstructors();
            this.$refs['editInstructorModal'].hide();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            const values = Object.values(error.response.data.errors);
            for(const val of values){
              for(const err of val){
                this.errors.push(err);
              }
            }
            this.updateErrorCountDown = this.dismissSecs;
          });
      },

      toggleForm: function(){
        if(this.InsPersonalInfoForm){
          this.InsPersonalInfoForm = false;
          this.InsTableAddBtn = true;
        } else {
          this.InsPersonalInfoForm = true;
          this.InsTableAddBtn = false;
        }
      },

      CancelInsForm: function(){
        this.clearInstructorData()
        this.InsPersonalInfoForm = false;
        this.InsTableAddBtn = true;
      },

      ShowEducationalForm: function(){
        this.InsPersonalInfoForm = false;
        this.InsTableForm = false;
        this.InsEducAttainmentForm = true;
      },

      BackPersonalForm: function(){
        this.InsPersonalInfoForm = true;
        this.InsTableForm = true;
        this.InsEducAttainmentForm = false;
      },

      ShowPreferredSubjForm: function(){
        this.AddInstructor();
        this.InsEducAttainmentForm = false;
        this.InsPrefSubjectForm = true;
      },

      BackEducationalForm: function(){
        this.InsEducAttainmentForm = true;
        this.InsPrefSubjectForm = false;
      },

      ShowTimeAvailForm: function(){
        this.InsPrefSubjectForm = false;
        this.InsTimeAvailabilityForm = true;
      },

      BackPrefferedSubjFrom: function(){
        this.InsPrefSubjectForm = true;
        this.InsTimeAvailabilityForm = false;
      },

      Finish: function(){
        this.InsTimeAvailabilityForm = false;
        this.clearInstructorData()
        this.InsTableForm = true;
        this.InsTableAddBtn = true;

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
            this.TimeAvailItems = response.data;
            for(var j = 0; j < this.TimeAvailItems.length; j++){
              if(this.TimeAvailItems[j].active == 1){
                this.TimeAvailItems[j].status = true
              }else{
                this.TimeAvailItems[j].status = false;
              }
            }
            this.TimeAvailtotalRows = this.TimeAvailItems.length;

          })
          .catch(error => {
            this.isLoading = false;
            console.log(error.response);
          })
      },
      addTimeAvailability: function(){
        this.errors = [];
        // timepicker is returning an OBJECT in 12-hr format (hh:mm A)
        // use moment to convert and format object to time in 24-hr format (HH:mm)
        this.newTimeAvailability.time_start
          = moment(this.newTimeAvailability.time_start.hh + ":"
            + this.newTimeAvailability.time_start.mm + " "
            + this.newTimeAvailability.time_start.A, ["hh:mm A"]).format("HH:mm");
        this.newTimeAvailability.time_end
          = moment(this.newTimeAvailability.time_end.hh
            + ":" + this.newTimeAvailability.time_end.mm + " "
            + this.newTimeAvailability.time_end.A, ["hh:mm A"]).format("HH:mm");
        Axios
          .post('http://localhost/api/v1/instructors/' + this.instructor.id + '/availabilities', this.newTimeAvailability, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // reset time_start and time_end by converting time_start and time_end back to empty objects
            this.newTimeAvailability.time_start = {"HH":"","H":"","hh":"","h":"","a":"","A":"","kk":"","k":"","m":"","mm":"","s":"","ss":""};
            this.newTimeAvailability.time_end = {"HH":"","H":"","hh":"","h":"","a":"","A":"","kk":"","k":"","m":"","mm":"","s":"","ss":""};
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
      getPreferredSubjects: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/instructors/' + this.instructor.id + '/preferred_subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.isLoading = false;
            //console.log(response.data);
            this.PrefSubItems = response.data;
            for(var j = 0; j < this.PrefSubItems.length; j++){
              if(this.PrefSubItems[j].active == 1){
                this.PrefSubItems[j].status = true
              }else{
                this.PrefSubItems[j].status = false;
              }
            }
            this.PrefSubtotalRows = this.PrefSubItems.length;
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error.response);
          })
      },
      addPreferredSubject: function($source){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/instructors/' + this.instructor.id + '/preferred_subjects', this.newPreferredSubject, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            if($source == 'update'){
              this.updateSuccessCountDown = this.dismissSecs;
            } else {
              this.dismissSuccessCountDown = this.dismissSecs;
            }
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

      ViewInstructorAvailabilities: function(item) {
        this.$router.replace({
          name: 'manageInstructorAvailabilities',
          params: {
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
          }
        })
      },

      ViewInstructorSubjects: function(item) {
        this.$router.replace({
          name: 'manageInstructorSubjects',
          params: {
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
          }
        })
      },

      ViewInstructorInformation: function(item) {
        this.$router.replace({
          name: 'InstructorInformationManager',
          params: {
            id: item.id,
            employee_id: item.employee_id,
            first_name: item.first_name,
            middle_name: item.middle_name,
            last_name: item.last_name,
            birth_date: item.birth_date,
            gender: item.gender,
            email: item.email,
            contact_no: item.contact_no,
            address: item.address,
            city: item.city,
            province: item.province,
            postal_code: item.postal_code,
            work_experience: item.work_experience,
            certifications: item.certifications,
            educational_attainment: item.educational_attainment,
            active: 1
          }
        })
      },

      StatusUpdate: function(item){
        this.errors = [];

        this.instructor = {
          id: item.id,
          active: item.active == 1 ? item.active = 0 : item.active = 1
        },

        Axios
          .put('http://localhost/api/v1/instructors/' + this.instructor.id, this.instructor, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getInstructors();
          if(item.active == 0){
            this.alertMessage = "Instructor " + item.last_name +", "+ item.first_name + " successfully deactivated."
          }else{
              this.alertMessage = "Instructor " + item.last_name +", "+ item.first_name + " successfully activated."
          }
          this.dismissSuccessCountDown = this.dismissSecs;
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
    }
  }
</script>
