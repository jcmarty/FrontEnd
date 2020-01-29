<template>
  <div>
    <h1>Manage Student Registration</h1>
    <div>
      <!-- An alert for displaying success messages -->
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

      <!-- Tab Group with forms for registration of students -->
      <b-tabs v-model="tabIndex">
        <b-tab title="Student Information">
        <!-- Start form Student information -->
          <b-form>
            <b-form-row>
              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="academicyear"
                  label="Academic Year"
                  label-for="academicYear">
                  <b-form-select
                    id="academicYear"
                    @change="getAY()">
                    <option v-for="Ay in AYrowData"
                    v-bind:value="Ay.id">{{Ay.current_ay}}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="semester"
                  label="Semester"
                  label-for="Semester">
                  <b-form-select
                    id="Semester"
                    @change="getSemesters()">
                    <option v-for="sem in SemRowData"
                    v-bind:value="sem.id">{{sem.semester}}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="lastname"
                  label="Last Name"
                  label-for="lastName">
                  <b-form-input
                    type="text"
                    v-model="Students.last_name"
                    id="lastName">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="firstname"
                  label="First Name"
                  label-for="firstName">
                  <b-form-input
                    type="text"
                    v-model="Students.first_name"
                    id="firstName">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="middlename"
                  label="Middle Name"
                  label-for="middleName">
                  <b-form-input
                    type="text"
                    v-model="Students.middle_name"
                    id="middleName">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="suffixname"
                  label="Suffix Name"
                  label-for="suffixName">
                  <b-form-input
                    type="text"
                    v-model="Students.suffix_name"
                    id="suffixName">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="course"
                  label="Course"
                  label-for="Course">
                  <b-form-select
                    id="Course"
                    @change="getCourse()">
                    <option v-for="course in CourseRowData"
                    v-bind:value="course.id">{{course.course_code}}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="yearlevel"
                  label="Year Level"
                  label-for="yearLevel">
                  <b-form-select
                    :options="genderOptions">
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="studentstatus"
                  label="Student Status"
                  label-for="studentStatus">
                  <b-form-select
                    v-model="Students.student_status"
                    :options="StudentStatusOptions">
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="academicstatus"
                  label="Academic Status"
                  label-for="academicStatus">
                  <b-form-select
                    v-model="Students.academic_status"
                    :options="AcademicStatusOptions">
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="schoollastattended"
                  label="School Last Attended"
                  label-for="schoolLastAttended">
                  <b-form-input
                    v-model="Students.school_last_attended"
                    type="text"
                    id="schoolLastAttended">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="schooladdress"
                  label="School Address"
                  label-for="schoolAddress">
                  <b-form-input
                    type="text"
                    v-model="Students.school_address"
                    id="schoolAddress">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col>
                <b-button variant="danger" @click="hideModal('editInstructorModal')">
                  Back
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="primary" @click="secondTab">
                  Next
                </b-button>
              </b-col>
            </b-form-row>

          </b-form>
        </b-tab>
        <!-- End of student information form -->


        <b-tab title="Personal Information" :disabled="secondTabDisabled">
            <!-- Start of Personal Information Form -->
          <b-form>
            <b-form-row>
              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="presentaddress"
                  label="Present Address"
                  label-for="presentAddress">
                  <b-form-input
                    type="text"
                    v-model="Students.address"
                    id="presentAddress"
                    required>
                  </b-form-input>
                </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="barangay"
                label="Barangay"
                label-for="Barangay">
                <b-form-input
                  type="text"
                  id="Barangay"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="citymunicipality"
                label="City / Municipality"
                label-for="cityMunicipality">
                <b-form-input
                  type="text"
                  v-model="Students.city"
                  id="cityMunicipality"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="province"
                label="Province"
                label-for="Province">
                <b-form-input
                  type="text"
                  v-model="Students.province"
                  id="Province"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="1">
              <b-form-group
                class="postalcode"
                label="Postal Code"
                label-for="postalCode">
                <b-form-input
                  type="text"
                  v-model="Students.postal"
                  id="postalCode"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

          </b-form-row>

          <b-form-row>


              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  class="emailaddress"
                  label="Email Address"
                  label-for="emailAddress">
                  <b-form-input
                    type="email"
                    v-model="Students.email"
                    id="emailAddress"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  class="cellphoneno"
                  label="Cellphone No."
                  label-for="cellphoneNo">
                  <b-form-input
                    type="number"
                    v-model="Students.cellphone"
                    id="cellphoneNo"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  class="telephoneno"
                  label="Telephone No."
                  label-for="telephoneNo">
                  <b-form-input
                    type="text"
                    v-model="Students.telephone"
                    id="telephoneNo"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="birthdate"
                  label="Birth Date"
                  label-for="birthDate">
                  <datepicker
                    v-model="Students.birth_date"
                    id="birthDate"
                    :clear-button="true"
                    :calendar-button="true"
                    :calendar-button-icon="calendarIcon"
                    :bootstrap-styling="true"
                    :format="birthDateFormat">
                  </datepicker>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  class="age"
                  label="Age"
                  label-for="Age">
                  <b-form-input
                    type="text"
                    id="Age"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="placeofbirth"
                  label="Place of Birth"
                  label-for="placeofBirth">
                  <b-form-input
                    type="text"
                    v-model="Students.birth_place"
                    id="placeofBirth"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="gender"
                  label="Gender"
                  label-for="Gender">
                  <b-form-select
                    v-model="Students.gender"
                    :options="genderOptions">
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="bloodtype"
                  label="Blood Type"
                  label-for="bloodType">
                  <b-form-input
                    type="text"
                    v-model="Students.blood_type"
                    id="bloodType"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="citizenship"
                  label="Citizenship"
                  label-for="citizenShip">
                  <b-form-input
                    type="text"
                    id="citizenShip"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="civilstatus"
                  label="Civil Status"
                  label-for="civilStatus">
                  <b-form-input
                    type="text"
                    v-model="Students.civil_status"
                    id="civilStatus"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>
              </b-form-row>

              <b-form-row>
                <b-col>
                  <b-button variant="danger" @click="hideModal('editInstructorModal')">
                    Back
                  </b-button>
                </b-col>
                <b-col class="d-flex justify-content-end">
                  <b-button variant="primary" @click="lastTab">
                    Next
                  </b-button>
                </b-col>
              </b-form-row>
          </b-form>
          <!-- End of Personal Information Form -->
        </b-tab>

        <b-tab title="Parents / GuardianInformation" :disabled="lastTabsDisabled">
          <!-- Start of Parents Information Form -->
          <b-form>
            <b-form-row>
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="fathersname"
                  label="Father's Name:"
                  label-for="fathersName">
                  <b-form-input
                    type="text"
                    v-model="Students.father_name"
                    id="fathersName">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="mothersname"
                  label="Mother's Name:"
                  label-for="mothersName">
                  <b-form-input
                    type="text"
                    v-model="Students.mother_name"
                    id="mothersName">
                  </b-form-input>
                </b-form-group>
              </b-col>
          </b-form-row>

          <b-form-row>
              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="contactperson"
                  label="Contact Person:"
                  label-for="contactPerson">
                  <b-form-input
                    type="text"
                    v-model="Students.contact_person"
                    id="contactPerson">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="contactnumber"
                  label="Contact Number"
                  label-for="contactNumber">
                  <b-form-input
                    type="text"
                    v-model="Students.contact_number"
                    id="contactNumber">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="contactaddress"
                  label="Contact Address:"
                  label-for="contactAddress">
                  <b-form-input
                    type="text"
                    v-model="Students.contact_address"
                    id="contactAddress">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-form-group label="Guardian Information">
                 <b-col cols="12" md="6" lg="6"><b-form-radio v-model="selected" name="some-radios" value="A">Same as Mother Information</b-form-radio></b-col>
                 <b-col cols="12" md="6" lg="6"><b-form-radio v-model="selected" name="some-radios" value="A">Same as Father Information</b-form-radio></b-col>
              </b-form-group>
            </b-form-row>

            <b-form-row>
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="guardianname"
                  label="Guardian's Name:"
                  label-for="guardianName">
                  <b-form-input
                    type="text"
                    id="guardianName">
                  </b-form-input>
                </b-form-group>
              </b-col>
          </b-form-row>


            <b-form-row>

            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="contactnumber"
                label="Contact Number"
                label-for="contactNumber">
                <b-form-input
                  type="text"
                  id="contactNumber">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="contactaddress"
                label="Contact Address:"
                label-for="contactAddress">
                <b-form-input
                  type="text"
                  id="contactAddress">
                </b-form-input>
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
                <b-button variant="primary" @click="RegStudents">
                  Next
                </b-button>
              </b-col>
            </b-form-row>
          </b-form>
        </b-tab>
      </b-tabs>
    </div>


    <b-form-row>
      <h5>Pre Registered Students</h5>
      <ag-grid-vue class="ag-theme-material"
        :columnDefs="PreregisteredColDef"
        :rowData="studentsrowdata"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="10"
        :gridOptions="gridOptions">
      </ag-grid-vue>
    </b-form-row>


  </div>
</template>
<script>
  import Axios from "axios";
  import moment from 'moment';
  import {AgGridVue} from "ag-grid-vue";
  import Datepicker from 'vuejs-datepicker';
  import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';

  export default{
    name: 'StudentRegistrationManager',
    components: {
      AgGridVue,
      Datepicker,
      VueTimepicker
    },
    data() {
      return{
        settings: this.$store.getters.getSettings,
        tabIndex: 0,
        selected: null,
        secondTabDisabled: true,
        lastTabsDisabled: true,
        PreregisteredColDef: null,
        PreregisteredRowData: null,
        AYrowData: null,
        SemRowData: null,
        CourseRowData: null,
        academicYearOptions: [],
        semesterOptions: [],
        genderOptions: [
          {value: 'Male', text: 'Male'},
          {value: 'Female', text: 'Female'}
        ],
        StudentStatusOptions: [
          {value: 'Old', text: 'Old'},
          {value: 'New', text: 'New'},
          {value: 'Transferee', text: 'Transferee'}
        ],
        AcademicStatusOptions: [
          {value: 'Regular', text: 'Regular'},
          {value: 'Irregular', text: 'Irregular'}

        ],
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
        studentsrowdata: null,
        Students: {
          first_name: null,
          middle_name: null,
          last_name: null,
          suffix_name: null,
          gender: null,
          address: null,
          civil_status: null,
          city: null,
          postal: null,
          province: null,
          telephone: null,
          cellphone: null,
          email: null,
          birth_date: null,
          birth_place: null,
          father_name: null,
          mother_name: null,
          contact_person: null,
          contact_address: null,
          contact_number: null,
          blood_type: null,
          active: 1,
          academic_status: null,
          student_status: null,
          school_last_attended: null,
          school_address: null,

        }
      }
    },
    beforeMount(){
      this.gridOptions = {
          context: {
              componentParent: this
          }
      };

      this.PreregisteredColDef = [
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 150},
          {headerName: 'First Name', field: 'first_name', sortable: true, filter: true, width: 150,},
          {headerName: 'Middle Name', field: 'middle_name', sortable: true, filter: true, width: 150,},
          {headerName: 'Last Name', field: 'last_name', sortable: true, filter: true, width: 150,},
          {headerName: 'Suffix Name', field: 'suffix_name', sortable: true, filter: true, width: 150,},
          {headerName: 'Gender', field: 'gender', sortable: true, filter: true, width: 150,},
          {headerName: 'Address', field: 'address', sortable: true, filter: true, width: 150,},
          {headerName: 'Civil Status', field: 'civil_status', sortable: true, filter: true, width: 150,},
          {headerName: 'City', field: 'city', sortable: true, filter: true, width: 150,},
          {headerName: 'Postal', field: 'postal', sortable: true, filter: true, width: 150,},
          {headerName: 'Province', field: 'province', sortable: true, filter: true, width: 150,},
          {headerName: 'Telephone', field: 'telephone', sortable: true, filter: true, width: 150,},
          {headerName: 'Cellphone', field: 'cellphone', sortable: true, filter: true, width: 150,},
          {headerName: 'Email', field: 'email', sortable: true, filter: true, width: 150,},
          {headerName: 'Birthdate', field: 'birthdate', sortable: true, filter: true, width: 150,},
          {headerName: 'Birth Place', field: 'birth_place', sortable: true, filter: true, width: 150,},
      ];


    },
    mounted () {
      this.getSemesters();
      this.getAY();
      this.getCourse();
      this.getStudents();
    },
    methods:{

      secondTab: function(){
        this.secondTabDisabled = false;
        this.tabIndex++;
      },

      lastTab: function(){
        this.lastTabsDisabled = false;
        this.tabIndex++;
      },

      getSemesters: function(){
        Axios
          .get('http://localhost/api/v1/semesters', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.SemRowData = response.data;
          })
      },

      getAY: function(){
        Axios
          .get('http://localhost/api/v1/settings', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.AYrowData = response.data;
          })
      },

      getCourse: function(){
        Axios
          .get('http://localhost/api/v1/courses', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.CourseRowData = response.data;
          })
      },

      getStudents: function(){
        Axios
          .get('http://localhost/api/v1/students', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.studentsrowdata = response.data;
          })
      },

      RegStudents: function(){
        Axios
          .post('http://localhost/api/v1/students', this.Students, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getStudents();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.Students = {
              first_name: null,
              middle_name: null,
              last_name: null,
              suffix_name: null,
              gender: null,
              address: null,
              civil_status: null,
              city: null,
              postal: null,
              province: null,
              telephone: null,
              cellphone: null,
              email: null,
              birth_date: null,
              birth_place: null,
              father_name: null,
              mother_name: null,
              contact_person: null,
              contact_address: null,
              contact_number: null,
              blood_type: null,
              active: 1,
              academic_status: null,
              student_status: null,
              school_last_attended: null,
              school_address: null,
            };
          })
      },


      toggleForm: function(){
        // toggle form visibility
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },
    },
    }
</script>
