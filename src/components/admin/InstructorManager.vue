<template>
  <div>
    <h1>Manage Instructors</h1>
    <div>
      <b-modal id="editInstructorModal" ref="editInstructorModal"
        title="Edit Instructor Information" size="xl" hide-footer no-close-on-backdrop>
        <!-- An alert for displaying success messages -->
        <b-alert variant="success"
          :show="updateSuccessCountDown"
          @dismissed="updateSuccessCountDown=0"
          dismissible fade>
            {{alertMessage}}
        </b-alert>

        <!-- An alert for displaying warning and/or error messages -->
        <b-alert variant="danger"
          :show="updateErrorCountDown"
          @dismissed="updateErrorCountDown=0"
          dismissible fade>
            <p>{{alertMessage}}</p>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
        </b-alert>

        <b-tabs v-model="tabIndex">
          <b-tab title="Personal Information">
            <b-form>
              <!-- Start form personal information -->
              <!-- 1st Form 1 Personal Information Start -->
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
                      type="text"
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
                  <b-button variant="danger" @click="hideModal('editInstructorModal')">
                    Cancel
                  </b-button>
                </b-col>
                <b-col class="d-flex justify-content-end">
                  <b-button variant="primary" @click="nextTab">
                    Next
                  </b-button>
                </b-col>
              </b-form-row>
            </b-form>
           <!--  Form End  -->
          </b-tab>

          <b-tab title="Educational Attainment">
            <b-form>
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
                  <b-button variant="primary" @click="tabIndex--">
                    Previous
                  </b-button>
                </b-col>
                <b-col class="d-flex justify-content-end">
                  <!--TODO:
                      ONLY call updateInstructor method if at
                      least one instructor information was changed -->
                  <b-button variant="success" @click="updateInstructor">
                    Update
                  </b-button>
                </b-col>
              </b-form-row>
            </b-form>
          </b-tab>
        </b-tabs>
      </b-modal>

      <b-modal id="deleteInstructorModal" ref="deleteInstructorModal" title="Delete Instructor" size="md" no-close-on-backdrop>
        <h6>Are you sure you want to delete <br/> <b>{{ this.instructor.first_name }} {{ this.instructor.last_name }}?</b></h6>
        <template v-slot:modal-footer="{ cancel, ok }">
          <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button class="float-left"  variant="danger" @click="hideModal('deleteInstructorModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="deleteInstructor()">
            Yes
          </b-button>
        </b-col>
        </template>
      </b-modal>

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

      <!-- Tab Group with forms for adding new instructor/s -->
      <b-tabs v-if="showForm" v-model="tabIndex">
        <b-tab title="Personal Information">
          <!-- Start form personal information -->
          <!-- 1st Form 1 Personal Information Start -->
          <b-form>
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
                    type="text"
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
                <b-button variant="danger" @click="toggleForm">
                  Cancel
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <!-- TODO:  Disable this button until all required fields are filled up -->
                <b-button variant="primary" @click="nextTab">
                  Next
                </b-button>
              </b-col>
            </b-form-row>
          </b-form>
        </b-tab>
         <!--  Form End  -->

        <b-tab title="Educational Attainment" :disabled="secondTabDisabled">
          <b-form>
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
                <b-button variant="primary" @click="tabIndex--">
                  Previous
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="primary" @click="addInstructor">
                  Next
                </b-button>
              </b-col>
            </b-form-row>
          </b-form>
        </b-tab>

        <b-tab title="Preferred Subjects" :disabled="lastTabsDisabled">
          <b-form>
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
            <b-form-row v-if="instructorId != null">
              <ag-grid-vue class="ag-theme-material"
                :columnDefs="preferredSubjectsColumnDefs"
                :rowData="preferredSubjectsRowData"
                :animateRows="true"
                :pagination="true"
                :paginationPageSize="5"
                :gridOptions="subjectsGridOptions">
              </ag-grid-vue>
            </b-form-row>
            <b-form-row>
              <b-col>
                <b-button variant="primary" @click="tabIndex--">
                  Previous
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="primary" @click="tabIndex++">
                  Next
                </b-button>
              </b-col>
            </b-form-row>
          </b-form>
        </b-tab>
        <b-tab title="Time Availability" :disabled="lastTabsDisabled">
          <b-form>
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
            <b-form-row v-if="instructorId != null">
              <ag-grid-vue class="ag-theme-material"
                :columnDefs="timeAvailabilityColumnDefs"
                :rowData="timeAvailabilityRowData"
                :animateRows="true"
                :pagination="true"
                :paginationPageSize="5">
              </ag-grid-vue>
            </b-form-row>
            <b-form-row>
              <b-col>
                <b-button variant="primary" @click="tabIndex--">
                  Previous
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="success" @click="toggleForm">
                  Finish
                </b-button>
              </b-col>
            </b-form-row>
          </b-form>
        </b-tab>
      </b-tabs>
    </div>

    <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New Instructor
    </b-button>

    <!-- Data Grid for displaying list of instructors -->
    <ag-grid-vue class="ag-theme-material"
      :columnDefs="personalInfoColumnDefs"
      :rowData="personalInfoRowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

  </div>
</template>
<script>
  import Axios from "axios";
  import moment from 'moment';
  import {AgGridVue} from "ag-grid-vue";
  import Datepicker from 'vuejs-datepicker';
  import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
  import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  import InstructorActionButtons from "./ActionButtons/InstructorActionButtons.vue";
  import PreferredSubjectButtons from "./ActionButtons/PreferredSubjectButtons.vue";

  export default{
    name: 'InstructorManager',
    components: {
      AgGridVue,
      Datepicker,
      InstructorActionButtons,
      PreferredSubjectButtons,
      VueTimepicker
    },
    data() {
      return{
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
        instructor: {
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
    beforeMount(){
      this.gridOptions = {
        context: {
            componentParent: this
        }
      };
      this.subjectsGridOptions = {
        context: {
            componentParent: this
        }
      }
      this.timeAvailabilityColumnDefs = [
        {headerName: 'Day', field: 'day', sortable: true, filter: true},
        {headerName: 'Start', field: 'time_start', sortable: true, filter: true},
        {headerName: 'End', field: 'time_end', sortable: true, filter: true},
        {headerName: 'Academic Year', field: 'academic_year', sortable: true, filter: true},
        {headerName: 'Semester', field: 'semester', sortable: true, filter: true}
      ];
      this.preferredSubjectsColumnDefs = [
        {headerName: 'Subject Code', field: 'subject_id', sortable: true, filter: true},
        {headerName: 'Description', field: 'subject_description', sortable: true, filter: true},
        {headerName: 'Academic Year', field: 'academic_year', sortable: true, filter: true},
        {headerName: 'Semester', field: 'semester', sortable: true, filter: true},
        {headerName: 'Actions', field: 'id', width: 350, cellRendererFramework: 'PreferredSubjectButtons'}
      ];
      this.personalInfoColumnDefs = [
        {headerName: 'Employee ID', field: 'employee_id', sortable: true, filter: true},
        {headerName: 'Firstname', field: 'first_name', sortable: true, filter: true},
        {headerName: 'Middlename', field: 'middle_name'},
        {headerName: 'Lastname', field: 'last_name', sortable: true, filter: true},
        {headerName: 'Birth Date', field: 'birth_date', sortable: true, filter: true},
        {headerName: 'Gender', field: 'gender', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true},
        {headerName: 'Contact No', field: 'contact_no'},
        {headerName: 'Address', field: 'address'},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Province', field: 'province', sortable: true, filter: true},
        {headerName: 'Work Experience', field: 'work_experience'},
        {headerName: 'Certifications', field: 'certifications'},
        {headerName: 'Highest Educational Attainment', field: 'educational_attainment'},
        {headerName: 'Status', field: 'active', width: 120,
          cellRenderer: (data) => {
            if(data.value === 1){
              return 'Active';
            } else {
              return 'Inactive';
            }
          }},
        {headerName: 'Actions', field: 'id', width: 350, cellRendererFramework: 'InstructorActionButtons'}
      ];
    },
    mounted () {
      this.gridApi = this.gridOptions.api;
      this.subjectsGidApi = this.subjectsGridOptions.api;
      this.getInstructors();
      this.getSubjects();
      if(this.instructorId != null){
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
        this.id = null;
        this.instructor = {
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
      getTimeAvailabilities: function(){
        Axios
          .get('http://localhost/api/v1/instructors/' + this.instructorId + '/availabilities', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            this.timeAvailabilityRowData = response.data;

          })
          .catch(error => {
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
          .post('http://localhost/api/v1/instructors/' + this.instructorId + '/availabilities', this.newTimeAvailability, {
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
        Axios
          .get('http://localhost/api/v1/instructors/' + this.instructorId + '/preferred_subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            this.preferredSubjectsRowData = response.data;
          })
          .catch(error => {
            console.log(error.response);
          })
      },
      addPreferredSubject: function($source){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/instructors/' + this.instructorId + '/preferred_subjects', this.newPreferredSubject, {
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
      getInstructors: function(){
        Axios
          .get('http://localhost/api/v1/instructors', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            this.personalInfoRowData = response.data;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      },
      toggleForm: function(){
        this.clearInstructorData();
        // toggle form visibility
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },
      addInstructor: function(){
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
            this.instructorId = response.data.last_insert_id;
            this.getPreferredSubjects();
            this.getTimeAvailabilities();
            this.getInstructors();
            this.lastTabsDisabled = false;
            // TODO: FIX THIS; next tab is not being activated after adding new instructor
            this.tabIndex++;
            console.log(
              this.instructorId
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
      updateInstructor: function(){
        this.errors = [];
        Axios
          .put('http://localhost/api/v1/instructors/' + this.instructorId, this.instructor, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSubjects();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.getPreferredSubjects();
            this.getTimeAvailabilities();
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
      deleteInstructor: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/instructors/' + this.instructorId, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getInstructors();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
          })
          .catch(error => {
            // TODO:  Hide integrity constraint errors
            //        and other database errors that hackers could
            //        use to infiltrate our system.
            //        Display a more user-friendly message instead.
            //        Example:  Failed to remove <instructor name> from
            //                  the database.  They might already have
            //                  classes or other related records.  Please
            //                  delete those records first before removing
            //                  this instructor from the database.
            this.alertMessage = error.response.data.message;
            /*const values = Object.values(error.response.data.errors);
            for(const val of values){
              for(const err of val){
                this.errors.push(err);
              }
            }*/
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteInstructorModal'].hide();
      }
    }
  }
</script>
