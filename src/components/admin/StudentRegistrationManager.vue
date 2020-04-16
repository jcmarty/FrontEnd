<template>
  <div>
    <h1>Manage Student Registration</h1>
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
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="StudentInfoshowForm">
      <div class=" h5 font-weight-bold text-dark">Student Information</div>
      <hr/>
      <div class="">
        <b-form-row>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="lastname"
              label="Last Name"
              label-for="lastName">
              <b-form-input
                type="text"
                v-model="Students.last_name"
                id="lastName"
                :state="last_name_state"
                aria-describedby="last_name-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="last_name-feedback">
                Last name is required!
              </b-form-invalid-feedback>
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
                id="firstName"
                :state="first_name_state"
                aria-describedby="first_name-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="first_name-feedback">
                First name is required!
              </b-form-invalid-feedback>
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
        </b-form-row>

        <b-form-row>

          <b-col cols="12" md="6" lg="6">
            <b-form-group
              class="schoollastattended"
              label="School Last Attended"
              label-for="schoolLastAttended">
              <b-form-input
                type="text"
                v-model="Students.school_last_attended"
                id="schoolLastAttended"
                :state="school_last_attended_state"
                aria-describedby="school_last_attended-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="school_last_attended-feedback">
                School last attended is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="schooladdress"
                label="School Address"
                label-for="schoolAddress">
                <b-form-input
                  type="text"
                  v-model="Students.school_address"
                  id="schoolAddress"
                  :state="school_address_state"
                  aria-describedby="school_address-feedback">
                </b-form-input>
                <b-form-invalid-feedback id="school_address-feedback">
                  School Address is required!
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

          </b-form-row>

          <b-form-row>

            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="universitycollege"
                label="University / College (for transferee)"
                label-for="universityCollege">
                <b-form-input
                  type="text"
                  v-model="Students.college_last_attended"
                  id="universityCollege">
                </b-form-input>
              </b-form-group>
            </b-col>
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="universicyaddress"
                  label="University Address"
                  label-for="universityAddress">
                  <b-form-input
                    type="text"
                    v-model="Students.college_address"
                    id="universityAddress">
                  </b-form-input>
                </b-form-group>
              </b-col>

            </b-form-row>

            <b-form-row>
              <b-col>
                <b-button variant="danger" @click="CancelRegister">
                  cancel
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="primary" @click="showPersonalInfoForm">
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
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="PersonalInfoshowForm">
      <div class=" h5 font-weight-bold text-dark">Personal Information</div>
      <hr/>
      <div class="">
        <b-form-row>
          <b-col cols="12" md="6" lg="5">
            <b-form-group
              class="presentaddress"
              label="Present Address ( House No./Lot No./Bldg No./Street )"
              label-for="presentAddress">
              <b-form-input
                type="text"
                v-model="Students.address"
                id="presentAddress"
                :state="present_address_state"
                aria-describedby="present_address-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="present_address-feedback">
                Present Address is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="barangay"
              label="Barangay / Subdivision"
              label-for="Barangay">
              <b-form-input
                type="text"
                v-model="Students.barangay"
                id="Barangay"
                :state="barangay_state"
                aria-describedby="barangay-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="barangay-feedback">
                Barangay is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="citymunicipality"
              label="City / Municipality"
              label-for="cityMunicipality">
              <b-form-input
                type="text"
                v-model="Students.city"
                id="cityMunicipality"
                :state="cityMunicipality_state"
                aria-describedby="cityMunicipality-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="cityMunicipality-feedback">
                City / Municipality is required!
              </b-form-invalid-feedback>
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
                :state="province_state"
                aria-describedby="province-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="province-feedback">
                Province is required!
              </b-form-invalid-feedback>
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
                :state="postalCode_state"
                aria-describedby="postalCode-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="postalCode-feedback">
                Postal code is required!
              </b-form-invalid-feedback>
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
                v-model="Students.birth_date"
                id="birthDate"
                :clear-button="true"
                :calendar-button="true"
                :calendar-button-icon="calendarIcon"
                :bootstrap-styling="true"
                :format="birthDateFormat"
                :state="birthDate_state"
                aria-describedby="birthDate-feedback">
              </datepicker>
              <b-form-invalid-feedback id="birthDate-feedback">
                Birthdate is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="gender"
              label="Gender"
              label-for="Gender">
              <b-form-select
                v-model="Students.gender"
                :options="genderOptions"
                :state="gender_state"
                aria-describedby="gender-feedback">
              </b-form-select>
              <b-form-invalid-feedback id="gender-feedback">
                Gender is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

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



          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="cellphoneno"
              label="Cellphone No."
              label-for="cellphoneNo">
              <b-form-input
                type="number"
                v-model="Students.cellphone"
                id="cellphoneNo"
                :state="cellphone_state"
                aria-describedby="cellphone-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="cellphone-feedback">
                Cellphone number is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="5">
            <b-form-group
              class="placeofbirth"
              label="Place of Birth"
              label-for="placeofBirth">
              <b-form-input
                type="text"
                v-model="Students.birth_place"
                id="placeofBirth"
                :state="placeofBirth_state"
                aria-describedby="placeofBirth-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="placeofBirth-feedback">
                Place of birth is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="citizenship"
              label="Citizenship"
              label-for="citizenShip">
              <b-form-input
                type="text"
                v-model="Students.citizenship"
                id="citizenShip"
                :state="citizenShip_state"
                aria-describedby="citizenShip-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="citizenShip-feedback">
                Citizenship is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="civilstatus"
              label="Civil Status"
              label-for="civilStatus">
              <b-form-input
                type="text"
                v-model="Students.civil_status"
                id="civilStatus"
                :state="civilStatus_state"
                aria-describedby="civilStatus-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="civilStatus-feedback">
                Civil status is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
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

          </b-form-row>

          <b-form-row>

            <b-col>
              <b-button variant="danger" @click="backStudentInfoForm">
                Previous
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" @click="showParentsInfoForm">
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
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="ParentsInfoshowForm">
      <div class=" h5 font-weight-bold text-dark">Parents Information</div>
      <hr/>
      <div class="">
        <b-form-row>
          <b-col cols="12" md="6" lg="6">
            <b-form-group
              class="fathersname"
              label="Father's Name:"
              label-for="fathersName">
              <b-form-input
                type="text"
                v-model="Students.father_name"
                id="fathersName"
                :state="fathersName_state"
                aria-describedby="father_name-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="father_name-feedback">
                Father's name is required!
              </b-form-invalid-feedback>
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
                id="mothersName"
                :state="mothersName_state"
                aria-describedby="mother_name-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="mother_name-feedback">
                Mother's name is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <hr>
          <b-form-row>
            <div class=" h5 font-weight-bold text-dark">Guardian Information</div>
          </b-form-row>
        <hr>

        <b-form-row>
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="guardianname"
              label="Guardian's Name:"
              label-for="guardianName">
              <b-form-input
                type="text"
                v-model="Students.contact_person"
                id="guardianName"
                :state="guardianName_state"
                aria-describedby="guardianName-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="guardianName-feedback">
                Guardian's name is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="contactaddress"
              label="Contact Address:"
              label-for="contactAddress">
              <b-form-input
                type="text"
                v-model="Students.contact_address"
                id="contactAddress"
                :state="guardianContactAddress_state"
                aria-describedby="contact_address-feedback">
              </b-form-input>
              <b-form-invalid-feedback id="contact_address-feedback">
                Contact address is required!
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group
            class="contactnumber"
            label="Contact Number"
            label-for="contactNumber">
            <b-form-input
              type="number"
              v-model="Students.contact_number"
              id="contactNumber"
              :state="guardianContactNumber_state"
              aria-describedby="contact_number-feedback">
            </b-form-input>
            <b-form-invalid-feedback id="contact_number-feedback">
              Contact number is required!
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
    </b-form-row>

          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="backPersonalInfoForm">
                Previous
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" @click="RegStudents">
                Register
              </b-button>
            </b-col>

            </b-form-row>

      </div>
    </div>
      <!-- end of academic form -->
    </transition>

    <transition name="fade">
      <div class="px-4 py-3 mt-4 mx-3 shadow rounded" v-if="RegisterTableForm">
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
          <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="RegisterTableForm">
            Register new Student
          </b-button>
        </b-col>
      </b-row>

      <b-overlay :show="registerOverlay" rounded="sm">
      <!-- Main table element -->
      <b-table
        class="my-3 table-striped"
        show-empty
        responsive
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
          <b-form-checkbox switch size="sm" :checked="row.item.status"  @change="StatusUpdate(row.item, $event.target)">
            <b-badge variant="success" pill v-if="row.item.active">Active</b-badge>
            <b-badge variant="danger"  pill v-else>Inactive</b-badge>
          </b-form-checkbox>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button variant="info" size="sm"  @click="enroll(row.item, row.index, $event.target)">
            <b-icon-people-fill/>
          </b-button>

          <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)">
            <b-icon-pencil/>
          </b-button>

          <!-- <b-button variant="danger" size="sm" @click="DeleteModal(row.item, $event.target)" v-b-tooltip.hover title="Delete Room">
            <b-icon-trash/>
          </b-button> -->
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
    name: 'StudentRegistrationManager',
    components: {
      Datepicker,
      VueTimepicker,
    },
    data() {
      return{
        items: [],
        fields: [
          { key: 'student_number', label: 'Room Number', class: 'text-left'},
          { key: 'full_name', label: 'Full Name', class: 'text-left'},
          { key: 'birth_date', label: 'Birthdate', class: 'text-left'},
          { key: 'gender', label: 'Gender', class: 'text-left'},
          { key: 'address', label: 'Address', class: 'text-left'},
          { key: 'barangay', label: 'Barangay', class: 'text-left'},
          { key: 'city', label: 'City', class: 'text-left'},
          { key: 'active', label: 'Active', class: 'text-left'},
          { key: 'actions', label: 'Action', class: 'text-left'},
        ],

        Students: {
          id: null,
          student_number: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          suffix_name: null,
          gender: null,
          civil_status: null,
          citizenship:null,
          address: null,
          barangay: null,
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
          photo_url: null,
          user_id: null,
          school_last_attended: null,
          school_address: null,
          college_last_attended: null,
          college_address: null,
          active: 1,
        },

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        settings: this.$store.getters.getSettings,
        tabIndex: 0,
        selected: null,
        secondTabDisabled: true,
        lastTabsDisabled: true,
        studentColDef: null,
        StudentRowData: null,
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
        StudentInfoshowForm: false,
        PersonalInfoshowForm: false,
        ParentsInfoshowForm: false,
        RegisterTableForm: true,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
        updateSuccessCountDown: 0,
        updateErrorCountDown: 0,
        studentsrowdata: null,
        registerOverlay: false,

        last_name_state: null,
        first_name_state: null,
        school_last_attended_state: null,
        school_address_state: null,
        present_address_state: null,
        barangay_state: null,
        cityMunicipality_state: null,
        province_state: null,
        postalCode_state: null,
        birthDate_state: null,
        gender_state: null,
        cellphone_state: null,
        placeofBirth_state: null,
        citizenShip_state: null,
        civilStatus_state: null,
        fathersName_state: null,
        mothersName_state: null,
        guardianName_state: null,
        guardianContactAddress_state: null,
        guardianContactNumber_state: null,


      }
    },

    mounted () {
      this.getSemesters();
      this.getAY();
      this.getCourse();
      this.getStudents();
    },

    methods:{

      backStudentInfoForm: function(){
        this.StudentInfoshowForm = true;
        this.PersonalInfoshowForm = false;
      },

      showPersonalInfoForm: function(){
        var checker;

        // last name
        if (this.Students.last_name == null) {
            this.last_name_state = false;
            checker = true;
        } else {
          this.last_name_state = null;
        }

        // first Name
        if (this.Students.first_name == null) {
            this.first_name_state = false,
            checker = true;
        } else {
          this.first_name_state = null;
        }

        // school last Attended
        if (this.Students.school_last_attended == null) {
            this.school_last_attended_state = false;
            checker = true;
        } else {
          this.school_last_attended_state = null
        }

        // school Address
        if (this.Students.school_address == null) {
            this.school_address_state = false;
            checker = true;
        } else {
          this.school_address_state = null;
        }

        if (checker) {

        } else {
          this.StudentInfoshowForm = false;
          this.PersonalInfoshowForm = true;
        }

      },

      showParentsInfoForm: function(){
        var checker;

        // Present Address
        if (this.Students.address == null) {
            this.present_address_state = false;
            checker = true;
        } else {
          this.present_address_state = null;
        }

        // Barangay
        if (this.Students.barangay == null) {
            this.barangay_state = false,
            checker = true;
        } else {
          this.barangay_state = null;
        }

        // City / Municipality
        if (this.Students.city == null) {
            this.cityMunicipality_state = false;
            checker = true;
        } else {
          this.cityMunicipality_state = null
        }

        // Province
        if (this.Students.province == null) {
            this.province_state = false;
            checker = true;
        } else {
          this.province_state = null;
        }

        // Postal
        if (this.Students.postal == null) {
            this.postalCode_state = false;
            checker = true;
        } else {
          this.postalCode_state = null;
        }

        // Birthdate
        if (this.Students.birth_date == null) {
            this.birthDate_state = false;
            checker = true;
        } else {
          this.birthDate_state = null;
        }

        // Gender
        if (this.Students.gender == null) {
            this.gender_state = false;
            checker = true;
        } else {
          this.gender_state = null;
        }

        // Cellphone Number
        if (this.Students.cellphone == null) {
            this.cellphone_state = false;
            checker = true;
        } else {
          this.cellphone_state = null;
        }

        // Place of Birth
        if (this.Students.birth_place == null) {
            this.placeofBirth_state = false;
            checker = true;
        } else {
          this.placeofBirth_state = null;
        }

        // Citizenship
        if (this.Students.citizenship == null) {
            this.citizenShip_state = false;
            checker = true;
        } else {
          this.citizenShip_state = null;
        }

        // Civilstatus
        if (this.Students.civil_status == null) {
            this.civilStatus_state = false;
            checker = true;
        } else {
          this.civilStatus_state = null;
        }

        if (checker) {

        } else {
          this.ParentsInfoshowForm = true;
          this.PersonalInfoshowForm = false;
        }

      },

      backPersonalInfoForm: function(){
        this.PersonalInfoshowForm = true;
        this.ParentsInfoshowForm = false;
      },

      RegStudents: function(){
        var checker;
        // father's name
        if (this.Students.father_name == null) {
            this.fathersName_state = false;
            checker = true;
        } else {
          this.fathersName_state = null;
        }

        // mother's Name
        if (this.Students.mother_name == null) {
          this.mothersName_state = false;
          checker = true;
        } else {
          this.mothersName_state = null;
        }

        // Guardian Name
        if (this.Students.contact_person == null) {
            this.guardianName_state = false;
            checker = true
        } else {
          this.guardianName_state = null;
        }

        // Guardian address
        if (this.Students.contact_address == null) {
            this.guardianContactAddress_state = false;
            checker = true;
        } else {
          this.guardianContactAddress_state = null;
        }

        // Guardian Name
        if (this.Students.contact_number == null) {
            this.guardianContactNumber_state = false;
            checker = true;
        } else {
          this.guardianContactNumber_state = false;
        }

        if (checker) {

        } else {
          this.ParentsInfoshowForm = false;
          this.RegisterTableForm = true;
          Axios
            .post('http://localhost/api/v1/students', this.Students, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              console.log(response.message);
              this.alertMessage = "New student record successfully created.";
              this.getStudents();
              this.dismissSuccessCountDown = this.dismissSecs;
              this.showForm = false;
              this.ClearStudentFields();
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
        }

      },


      hideModal: function($modal){
        this.ClearStudentFields();
        this.$refs[$modal].hide();
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
        this.registerOverlay = true;
        Axios
          .get('http://localhost/api/v1/students', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.items = response.data;
            this.totalRows = this.items.length;
            this.registerOverlay = false;

            for (var i = 0; i < this.items.length; i++) {
              // this.items[i].full_name = this.items[i].last_name;

              var sn, mn = null;
              sn = this.items[i].suffix_name != null ? " " +this.items[i].suffix_name : '',
              mn = this.items[i].middle_name != null ? this.items[i].middle_name : '',

              this.items[i].full_name = this.items[i].last_name + sn + ", " + this.items[i].first_name + " " + mn;
              // if(this.items[i].suffix_name != null){
              //
              // last_suffix = this.items[i].last_name + " " + this.items[i].suffix_name + ", " ;
              // }
              // else {
              //   last_suffix = this.items[i].last_name + ", "
              // }
              //
              // var first_middle = null;
              // if(this.items[i].middle_name != null){
              //   first_middle = this.items[i].first_name + " " + this.items[i].middle_name;
              // }
              // else {
              //   first_middle = this.items[i].first_name
              // }
              //
              // this.items[i].full_name = last_suffix + first_middle;


            }
            // console.log(this.items)
            // console.log(response.data[0].fullname = 'john christopher marty')
            // console.log(response.data[0])
          })
      },

      UpdateStudents: function(){
        this.errors = [];
        Axios
          .put('http://localhost/api/v1/students/'+ this.id, this.Students, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getStudents();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.ClearStudentFields();
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
          this.$refs['EditStudentModal'].hide();
        },




      ClearStudentFields: function(){
        this.Students = {
          student_number: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          suffix_name: null,
          gender: null,
          civil_status: null,
          citizenship:null,
          address: null,
          barangay: null,
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
          photo_url: null,
          user_id: null,
          school_last_attended: null,
          school_address: null,
          college_last_attended: null,
          college_address: null,
          active: 1,
        };

        this.last_name_state = null;
        this.first_name_state = null;
        this.school_last_attended_state = null;
        this.school_address_state = null;
        this.present_address_state = null;
        this.barangay_state = null;
        this.cityMunicipality_state = null;
        this.province_state = null;
        this.postalCode_state = null;
        this.birthDate_state = null;
        this.gender_state = null;
        this.cellphone_state = null;
        this.placeofBirth_state = null;
        this.citizenShip_state = null;
        this.civilStatus_state = null;
        this.fathersName_state = null;
        this.mothersName_state = null;
        this.guardianName_state = null;
        this.guardianContactAddress_state = null;
        this.guardianContactNumber_state = null;
      },

      CancelRegister: function(){
        this.ClearStudentFields();
        this.secondTabDisabled = true;
        this.lastTabsDisabled = true;
        this.StudentInfoshowForm = false;
        this.RegisterTableForm = true;
      },

      toggleForm: function(){
        if(this.StudentInfoshowForm){
          this.StudentInfoshowForm = false;
          this.RegisterTableForm = true;
        } else {
          this.StudentInfoshowForm = true;
          this.RegisterTableForm = false;
        }
      },

      enroll: function(item){
        this.Students = {
          id: item.id,
          student_number: item.student_number,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
          suffix_name: item.suffix_name,
          gender: item.gender,
          civil_status: item.civil_status,
          citizenship:item.citizenship,
          address: item.address,
          barangay: item.barangay,
          city: item.city,
          postal: item.postal,
          province: item.province,
          telephone: item.telephone,
          cellphone: item.cellphone,
          email: item.email,
          birth_date: item.birth_date,
          birth_place: item.birth_place,
          father_name: item.father_name,
          mother_name: item.mother_name,
          contact_person: item.contact_person,
          contact_address: item.contact_address,
          contact_number: item.contact_number,
          blood_type: item.blood_type,
          photo_url: item.photo_url,
          user_id: item.user_id,
          school_last_attended: item.school_last_attended,
          school_address: item.school_address,
          college_last_attended: item.college_last_attended,
          college_address: item.college_address,
          active: 1,
        },

        this.$router.replace({
          name: 'StudentEnrollmentManager',
          params: item
        })
      },

      EditModal: function(item, index) {
        this.Students = {
          id: item.id,
          student_number: item.student_number,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
          suffix_name: item.suffix_name,
          gender: item.gender,
          civil_status: item.civil_status,
          citizenship:item.citizenship,
          address: item.address,
          barangay: item.barangay,
          city: item.city,
          postal: item.postal,
          province: item.province,
          telephone: item.telephone,
          cellphone: item.cellphone,
          email: item.email,
          birth_date: item.birth_date,
          birth_place: item.birth_place,
          father_name: item.father_name,
          mother_name: item.mother_name,
          contact_person: item.contact_person,
          contact_address: item.contact_address,
          contact_number: item.contact_number,
          blood_type: item.blood_type,
          photo_url: item.photo_url,
          user_id: item.user_id,
          school_last_attended: item.school_last_attended,
          school_address: item.school_address,
          college_last_attended: item.college_last_attended,
          college_address: item.college_address,
          active: 1,
        },

        this.$root.$emit('bv::show::modal', 'EditStudentModal')
      },

      StatusUpdate: function(item){
        this.errors = [];

        this.Students = {
          id: item.id,
          student_number: item.student_number,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
          suffix_name: item.suffix_name,
          gender: item.gender,
          civil_status: item.civil_status,
          citizenship:item.citizenship,
          address: item.address,
          barangay: item.barangay,
          city: item.city,
          postal: item.postal,
          province: item.province,
          telephone: item.telephone,
          cellphone: item.cellphone,
          email: item.email,
          birth_date: item.birth_date,
          birth_place: item.birth_place,
          father_name: item.father_name,
          mother_name: item.mother_name,
          contact_person: item.contact_person,
          contact_address: item.contact_address,
          contact_number: item.contact_number,
          blood_type: item.blood_type,
          photo_url: item.photo_url,
          user_id: item.user_id,
          school_last_attended: item.school_last_attended,
          school_address: item.school_address,
          college_last_attended: item.college_last_attended,
          college_address: item.college_address,
          active: item.active == 1 ? item.active = 0 : item.active = 1
        },

        Axios
        .put('http://localhost/api/v1/students/'+ this.Students.id, this.Students, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getStudents();
          if(item.active == 0){
            this.alertMessage = "Students " + item.last_name, +" "+ item.first_name + " successfully deactivated."
          }else{
              this.alertMessage = "Students " + item.last_name, +" "+ item.first_name + " successfully activated."
          }
          this.dismissSuccessCountDown = this.dismissSecs;
          this.ClearStudentFields();
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

    },
  }
</script>
