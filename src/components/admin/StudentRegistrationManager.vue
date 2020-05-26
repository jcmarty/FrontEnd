<template>
  <div>
    <h1 class="font-weight-bold text-dark">Manage Student Registration</h1>
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
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="StudentInfoshowForm">
      <div class=" h5 font-weight-bold text-dark">Student Information</div>
      <hr/>
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-row>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.Students.last_name.$error}"
              label="Last Name *"
              label-for="lastName">
              <b-form-input
                type="text"
                id="lastName"
                v-model.trim="$v.Students.last_name.$model"
                :class="{'is-invalid' :$v.Students.last_name.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.last_name.required">Last Name is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.Students.first_name.$error}"
              label="First Name *"
              label-for="firstName">
              <b-form-input
                type="text"
                id="firstName"
                v-model.trim="$v.Students.first_name.$model"
                :class="{'is-invalid' :$v.Students.first_name.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.first_name.required">First Name is required!</span>
              </div>
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


        </b-form-row>

        <b-form-row>

          <b-col cols="12" md="6" lg="6">
            <b-form-group
              :class="{'text-danger' : $v.Students.school_last_attended.$error}"
              label="School Last Attended *"
              label-for="schoolLastAttended">
              <b-form-input
                type="text"
                id="schoolLastAttended"
                v-model.trim="$v.Students.school_last_attended.$model"
                :class="{'is-invalid' :$v.Students.school_last_attended.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.school_last_attended.required">School Last Attended is required!</span>
              </div>
            </b-form-group>
          </b-col>

            <b-col cols="12" md="6" lg="6">
              <b-form-group
                :class="{'text-danger' : $v.Students.school_address.$error}"
                label="School Address *"
                label-for="schoolAddress">
                <b-form-input
                  type="text"
                  id="schoolAddress"
                  v-model.trim="$v.Students.school_address.$model"
                  :class="{'is-invalid' :$v.Students.school_address.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.Students.school_last_attended.required">School Address is required!</span>
                </div>
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

          </b-form>
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
              :class="{'text-danger' : $v.Students.address.$error}"
              label="Present Address ( House No./Lot No./Bldg No./Street ) *"
              label-for="presentAddress">
              <b-form-input
                type="text"
                id="presentAddress"
                v-model.trim="$v.Students.address.$model"
                :class="{'is-invalid' :$v.Students.address.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.address.required">Present Address is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.Students.barangay.$error}"
              label="Barangay / Subdivision *"
              label-for="Barangay">
              <b-form-input
                type="text"
                id="Barangay"
                v-model.trim="$v.Students.barangay.$model"
                :class="{'is-invalid' :$v.Students.barangay.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.barangay.required">Barangay / Subdivision is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.Students.city.$error}"
              label="City / Municipality *"
              label-for="cityMunicipality">
              <b-form-input
                type="text"
                id="cityMunicipality"
                v-model.trim="$v.Students.city.$model"
                :class="{'is-invalid' :$v.Students.city.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.city.required">City / Municipality is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.Students.province.$error}"
              label="Province *"
              label-for="Province">
              <b-form-input
                type="text"
                id="Province"
                v-model.trim="$v.Students.province.$model"
                :class="{'is-invalid' :$v.Students.province.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.province.required">Province is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="1">
            <b-form-group
              :class="{'text-danger' : $v.Students.postal.$error}"
              label="Postal Code"
              label-for="postalCode">
              <b-form-input
                type="text"
                id="postalCode"
                v-model.trim="$v.Students.postal.$model"
                :class="{'is-invalid' :$v.Students.postal.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.postal.required">Postal Code is required!</span>
              </div>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.Students.birth_date.$error}"
              label="Birth Date *"
              label-for="birthDate">
              <datepicker
                id="birthDate"
                :clear-button="true"
                :calendar-button="true"
                :calendar-button-icon="calendarIcon"
                :bootstrap-styling="true"
                :format="birthDateFormat"
                v-model.trim="$v.Students.birth_date.$model"
                :class="{'is-invalid' :$v.Students.birth_date.$error}">
              </datepicker>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.birth_date.required">Birth Date is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.Students.gender.$error}"
              label="Gender *"
              label-for="Gender">
              <b-form-select
                :options="genderOptions"
                v-model.trim="$v.Students.gender.$model"
                :class="{'is-invalid' :$v.Students.gender.$error}">
              </b-form-select>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.gender.required">Gender is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="4">
            <b-form-group
              :class="{'text-danger' : $v.Students.email.$error}"
              label="Email Address *"
              label-for="emailAddress">
              <b-form-input
                type="email"
                id="emailAddress"
                v-model.trim="$v.Students.email.$model"
                :class="{'is-invalid' :$v.Students.email.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.email.required">Email Address is required!</span>
              </div>
            </b-form-group>
          </b-col>



          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.Students.cellphone.$error}"
              label="Cellphone No. *"
              label-for="cellphoneNo">
              <b-form-input
                type="number"
                id="cellphoneNo"
                v-model.trim="$v.Students.cellphone.$model"
                :class="{'is-invalid' :$v.Students.cellphone.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.cellphone.required">Cellphone No. is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="5">
            <b-form-group
              :class="{'text-danger' : $v.Students.birth_place.$error}"
              label="Place of Birth *"
              label-for="placeofBirth">
              <b-form-input
                type="text"
                id="placeofBirth"
                v-model.trim="$v.Students.birth_place.$model"
                :class="{'is-invalid' :$v.Students.birth_place.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.birth_place.required">Place of Birth is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.Students.citizenship.$error}"
              label="Citizenship *"
              label-for="citizenShip">
              <b-form-input
                type="text"
                id="citizenShip"
                v-model.trim="$v.Students.citizenship.$model"
                :class="{'is-invalid' :$v.Students.citizenship.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.citizenship.required">Citizenship is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.Students.civil_status.$error}"
              label="Civil status *"
              label-for="civilStatus">
              <b-form-input
                type="text"
                id="civilStatus"
                v-model.trim="$v.Students.civil_status.$model"
                :class="{'is-invalid' :$v.Students.civil_status.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.civil_status.required">Civil Status is required!</span>
              </div>
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
          <hr/>
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
              label="Father's Name"
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
              :class="{'text-danger' : $v.Students.mother_name.$error}"
              label="Mother's Name *"
              label-for="mothersName">
              <b-form-input
                type="text"
                id="mothersName"
                v-model.trim="$v.Students.mother_name.$model"
                :class="{'is-invalid' :$v.Students.mother_name.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.mother_name.required">Mother's Name is required!</span>
              </div>
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
              :class="{'text-danger' : $v.Students.contact_person.$error}"
              label="Guardian's Name *"
              label-for="guardianName">
              <b-form-input
                type="text"
                id="guardianName"
                v-model.trim="$v.Students.contact_person.$model"
                :class="{'is-invalid' :$v.Students.contact_person.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.contact_person.required">Guardian's Name is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="4">
            <b-form-group
              :class="{'text-danger' : $v.Students.contact_address.$error}"
              label="Contact Address *"
              label-for="contactAddress">
              <b-form-input
                type="text"
                id="contactAddress"
                v-model.trim="$v.Students.contact_address.$model"
                :class="{'is-invalid' :$v.Students.contact_address.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Students.contact_address.required">Contact Address is required!</span>
              </div>
            </b-form-group>
          </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group
            :class="{'text-danger' : $v.Students.contact_number.$error}"
            label="Contact Number *"
            label-for="contactNumber">
            <b-form-input
              type="number"
              id="contactNumber"
              v-model.trim="$v.Students.contact_number.$model"
              :class="{'is-invalid' :$v.Students.contact_number.$error}">
            </b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.Students.contact_number.required">Contact Number is required!</span>
            </div>
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
      <div class="px-4 py-3 mt-4 mx-3 shadow rounded bg-white" v-if="RegisterTableForm">
      <!-- Adding Form Start  -->
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
          <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="RegisterTableForm">
            Register new Student
          </b-button>
        </b-col>
      </b-row>


      <!-- Main table element -->
      <b-overlay :show="registerOverlay" rounded="sm">
      <b-table
        class="my-3 table-striped"
        responsive
        show-empty
        bordered
        hover
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter">

        <template v-slot:cell(active)="row" >
          <b-button v-if="row.item.active" variant="danger" size="sm" @click="StatusUpdate(row.item, $event.target)" v-b-tooltip.hover title=" Deactivate">
            Deactivate
          </b-button>

          <b-button v-else="row.item.active" variant="success" size="sm" @click="StatusUpdate(row.item, $event.target)" v-b-tooltip.hover title="Activate">
            Activate
          </b-button>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button variant="info" size="sm"  @click="enroll(row.item, row.index, $event.target)" v-b-tooltip.hover title="Enroll Me!">
            <b-icon-people-fill/>
          </b-button>

          <b-button variant="info" size="sm"  @click="ViewInfo(row.item, row.index, $event.target)" v-b-tooltip.hover title="View Information">
            <b-icon-info/>
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
  import { required, minLength, between } from 'vuelidate/lib/validators';
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
          { key: 'student_number', label: 'Student Number', class: 'text-center'},
          { key: 'full_name', label: 'Full Name', class: 'text-center'},
          { key: 'birth_date', label: 'Birthdate', class: 'text-center'},
          { key: 'gender', label: 'Gender', class: 'text-center'},
          { key: 'address', label: 'Address', class: 'text-center'},
          { key: 'barangay', label: 'Barangay', class: 'text-center'},
          { key: 'city', label: 'City', class: 'text-center'},
          { key: 'active', label: 'Active', class: 'text-center'},
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        Students: {
          id: null,
          student_number: "1819-01-0001",
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
          cellphone: 0,
          email: null,
          birth_date: null,
          birth_place: null,
          father_name: null,
          mother_name: null,
          contact_person: null,
          contact_address: null,
          contact_number: 0,
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

      }
    },

    validations: {
     Students: {
       first_name: {required},
       last_name: {required},
       gender: {required},
       civil_status: {required},
       citizenship:{required},
       address: {required},
       barangay: {required},
       city: {required},
       postal: {required},
       province: {required},
       cellphone: {required},
       email: {required},
       birth_date: {required},
       birth_place: {required},
       mother_name: {required},
       contact_person: {required},
       contact_address: {required},
       contact_number: {required},
       school_last_attended: {required},
       school_address: {required},
     },
    },

    mounted () {
      this.getSemesters();
      this.getAY();
      this.getCourse();
      this.getStudents();
    },

    methods:{

      onSubmit() {
        this.$v.Students.$touch();
        if (this.$v.Students.$anyError) {
          return;
        }
        this.RegStudents()
      },

      backStudentInfoForm: function(){
        this.StudentInfoshowForm = true;
        this.PersonalInfoshowForm = false;
      },

      showPersonalInfoForm: function(){
        var checker;

        // last name
        if (this.Students.last_name == null || this.Students.last_name == "" ) {
            this.last_name_state = false;
            checker = true;
        } else {
          this.last_name_state = null;
        }

        // first Name
        if (this.Students.first_name == null || this.Students.first_name == "") {
            this.first_name_state = false,
            checker = true;
        } else {
          this.first_name_state = null;
        }

        // school last Attended
        if (this.Students.school_last_attended == null || this.Students.school_last_attended == "") {
            this.school_last_attended_state = false;
            checker = true;
        } else {
          this.school_last_attended_state = null
        }

        // school Address
        if (this.Students.school_address == null || this.Students.school_address =="") {
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
        if (this.Students.address == null || this.Students.address == "") {
            this.present_address_state = false;
            checker = true;
        } else {
          this.present_address_state = null;
        }

        // Barangay
        if (this.Students.barangay == null || this.Students.barangay == "") {
            this.barangay_state = false,
            checker = true;
        } else {
          this.barangay_state = null;
        }

        // City / Municipality
        if (this.Students.city == null || this.Students.city == "") {
            this.cityMunicipality_state = false;
            checker = true;
        } else {
          this.cityMunicipality_state = null
        }

        // Province
        if (this.Students.province == null || this.Students.province == "") {
            this.province_state = false;
            checker = true;
        } else {
          this.province_state = null;
        }

        // Postal
        if (this.Students.postal == null || this.Students.postal == "") {
            this.postalCode_state = false;
            checker = true;
        } else {
          this.postalCode_state = null;
        }

        // Birthdate
        if (this.Students.birth_date == null || this.Students.birth_date == "") {
            this.birthDate_state = false;
            checker = true;
        } else {
          this.birthDate_state = null;
        }

        // Gender
        if (this.Students.gender == null || this.Students.gender == "") {
            this.gender_state = false;
            checker = true;
        } else {
          this.gender_state = null;
        }

        // Cellphone Number
        if (this.Students.cellphone == null || this.Students.cellphone == "") {
            this.cellphone_state = false;
            checker = true;
        } else {
          this.cellphone_state = null;
        }

        // Place of Birth
        if (this.Students.birth_place == null || this.Students.birth_place == "") {
            this.placeofBirth_state = false;
            checker = true;
        } else {
          this.placeofBirth_state = null;
        }

        // Citizenship
        if (this.Students.citizenship == null || this.Students.citizenship == "") {
            this.citizenShip_state = false;
            checker = true;
        } else {
          this.citizenShip_state = null;
        }

        // Civilstatus
        if (this.Students.civil_status == null || this.Students.civil_status == "") {
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
        if (this.Students.father_name == null || this.Students.father_name == "") {
            this.fathersName_state = false;
            checker = true;
        } else {
          this.fathersName_state = null;
        }

        // mother's Name
        if (this.Students.mother_name == null || this.Students.mother_name == "") {
          this.mothersName_state = false;
          checker = true;
        } else {
          this.mothersName_state = null;
        }

        // Guardian Name
        if (this.Students.contact_person == null || this.Students.contact_person == "") {
            this.guardianName_state = false;
            checker = true
        } else {
          this.guardianName_state = null;
        }

        // Guardian address
        if (this.Students.contact_address == null || this.Students.contact_address == "") {
            this.guardianContactAddress_state = false;
            checker = true;
        } else {
          this.guardianContactAddress_state = null;
        }

        // Guardian Name
        if (this.Students.contact_number == 0 || this.Students.contact_number == "") {
            this.guardianContactNumber_state = false;
            checker = true;
        } else {
          this.guardianContactNumber_state = null;
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
            this.registerOverlay = false;
            // this.alertMessage = response.data.message;
            this.items = response.data;
            this.totalRows = this.items.length;


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
          contact_number: 0,
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

      ViewInfo: function(item) {
        this.$router.replace({
          name: 'StudentInformationManager',
          params: {
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
          }
        })
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
