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

      <ul class="progressbar" v-if="progress">
          <li class="active">Student Information</li>
          <li id="PersonalInformation">Personal Information</li>
          <li id="ParentsInformation" >Parents Information</li>
       </ul>



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
              :class="{'text-danger' : $v.StudPersonal.address.$error}"
              label="Present Address ( House No./Lot No./Bldg No./Street ) *"
              label-for="presentAddress">
              <b-form-input
                type="text"
                id="presentAddress"
                v-model.trim="$v.StudPersonal.address.$model"
                :class="{'is-invalid' :$v.StudPersonal.address.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.address.required">Present Address is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.barangay.$error}"
              label="Barangay / Subdivision *"
              label-for="Barangay">
              <b-form-input
                type="text"
                id="Barangay"
                v-model.trim="$v.StudPersonal.barangay.$model"
                :class="{'is-invalid' :$v.StudPersonal.barangay.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.barangay.required">Barangay / Subdivision is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.city.$error}"
              label="City / Municipality *"
              label-for="cityMunicipality">
              <b-form-input
                type="text"
                id="cityMunicipality"
                v-model.trim="$v.StudPersonal.city.$model"
                :class="{'is-invalid' :$v.StudPersonal.city.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.city.required">City / Municipality is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.province.$error}"
              label="Province *"
              label-for="Province">
              <b-form-input
                type="text"
                id="Province"
                v-model.trim="$v.StudPersonal.province.$model"
                :class="{'is-invalid' :$v.StudPersonal.province.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.province.required">Province is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="1">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.postal.$error}"
              label="Postal Code"
              label-for="postalCode">
              <b-form-input
                type="text"
                id="postalCode"
                v-model.trim="$v.StudPersonal.postal.$model"
                :class="{'is-invalid' :$v.StudPersonal.postal.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.postal.required">Postal Code is required!</span>
              </div>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.birth_date.$error}"
              label="Birth Date *"
              label-for="birthDate">
              <datepicker
                id="birthDate"
                :clear-button="true"
                :calendar-button="true"
                :calendar-button-icon="calendarIcon"
                :bootstrap-styling="true"
                :format="birthDateFormat"
                v-model.trim="$v.StudPersonal.birth_date.$model"
                :class="{'is-invalid' :$v.StudPersonal.birth_date.$error}">
              </datepicker>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.birth_date.required">Birth Date is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.gender.$error}"
              label="Gender *"
              label-for="Gender">
              <b-form-select
                :options="genderOptions"
                v-model.trim="$v.StudPersonal.gender.$model"
                :class="{'is-invalid' :$v.StudPersonal.gender.$error}">
              </b-form-select>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.gender.required">Gender is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="4">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.email.$error}"
              label="Email Address *"
              label-for="emailAddress">
              <b-form-input
                type="email"
                id="emailAddress"
                v-model.trim="$v.StudPersonal.email.$model"
                class="noCaps"
                :class="{'is-invalid' :$v.StudPersonal.email.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.email.required">Email Address is required!</span>
                <span v-if="!$v.StudPersonal.email.email">You have entered an invalid email address!</span>
              </div>
            </b-form-group>
          </b-col>



          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.cellphone.$error}"
              label="Cellphone No. *"
              label-for="cellphoneNo">
              <b-form-input
                type="number"
                id="cellphoneNo"
                onKeyPress="if(this.value.length==11) return false;"
                v-model.trim="$v.StudPersonal.cellphone.$model"
                :class="{'is-invalid' :$v.StudPersonal.cellphone.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.cellphone.required">Contact No is required!</span>
                <span v-if="!$v.StudPersonal.cellphone.maxLength">Maximum of 11 digits!</span>
                <span v-if="!$v.StudPersonal.cellphone.minLength">Minimum of 11 digits!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="5">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.birth_place.$error}"
              label="Place of Birth *"
              label-for="placeofBirth">
              <b-form-input
                type="text"
                id="placeofBirth"
                v-model.trim="$v.StudPersonal.birth_place.$model"
                :class="{'is-invalid' :$v.StudPersonal.birth_place.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.birth_place.required">Place of Birth is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.citizenship.$error}"
              label="Citizenship *"
              label-for="citizenShip">
              <b-form-input
                type="text"
                id="citizenShip"
                v-model.trim="$v.StudPersonal.citizenship.$model"
                :class="{'is-invalid' :$v.StudPersonal.citizenship.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.citizenship.required">Citizenship is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              :class="{'text-danger' : $v.StudPersonal.civil_status.$error}"
              label="Civil status *"
              label-for="civilStatus">
              <b-form-input
                type="text"
                id="civilStatus"
                v-model.trim="$v.StudPersonal.civil_status.$model"
                :class="{'is-invalid' :$v.StudPersonal.civil_status.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudPersonal.civil_status.required">Civil Status is required!</span>
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
              :class="{'text-danger' : $v.StudParents.mother_name.$error}"
              label="Mother's Name *"
              label-for="mothersName">
              <b-form-input
                type="text"
                id="mothersName"
                v-model.trim="$v.StudParents.mother_name.$model"
                :class="{'is-invalid' :$v.StudParents.mother_name.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudParents.mother_name.required">Mother's Name is required!</span>
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
              :class="{'text-danger' : $v.StudParents.contact_person.$error}"
              label="Guardian's Name *"
              label-for="guardianName">
              <b-form-input
                type="text"
                id="guardianName"
                v-model.trim="$v.StudParents.contact_person.$model"
                :class="{'is-invalid' :$v.StudParents.contact_person.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudParents.contact_person.required">Contact No is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="4">
            <b-form-group
              :class="{'text-danger' : $v.StudParents.contact_address.$error}"
              label="Contact Address *"
              label-for="contactAddress">
              <b-form-input
                type="text"
                id="contactAddress"
                v-model.trim="$v.StudParents.contact_address.$model"
                :class="{'is-invalid' :$v.StudParents.contact_address.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.StudParents.contact_address.required">Contact Address is required!</span>
              </div>
            </b-form-group>
          </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group
            :class="{'text-danger' : $v.StudParents.contact_number.$error}"
            label="Contact Number *"
            label-for="contactNumber">
            <b-form-input
              type="number"
              id="contactNumber"
              onKeyPress="if(this.value.length==11) return false;"
              v-model.trim="$v.StudParents.contact_number.$model"
              :class="{'is-invalid' :$v.StudParents.contact_number.$error}">
            </b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.StudParents.contact_number.required">Contact Number is required!</span>
              <span v-if="!$v.StudParents.contact_number.maxLength">Maximum of 11 digits!</span>
              <span v-if="!$v.StudParents.contact_number.minLength">Minimum of 11 digits!</span>
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
  import { required, minLength, maxLength, between, email } from 'vuelidate/lib/validators';
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
          student_number: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          suffix_name: null,
          school_last_attended: null,
          school_address: null,
          college_last_attended: null,
          college_address: null,
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
          active: 1,
        },

        StudPersonal: {
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
        },

        StudParents: {
          father_name: null,
          mother_name: null,
          contact_person: null,
          contact_address: null,
          contact_number: null,
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
        progress: false,
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
       school_last_attended: {required},
       school_address: {required},
     },

     StudPersonal: {
       gender: {required},
       civil_status: {required},
       citizenship:{required},
       address: {required},
       barangay: {required},
       city: {required},
       postal: {required},
       province: {required},
       cellphone: {required, minLength: minLength(11), maxLength: maxLength(11)},
       email: {required, email},
       birth_date: {required},
       birth_place: {required},
     },

     StudParents: {
       mother_name: {required},
       contact_person: {required},
       contact_address: {required},
       contact_number: {required, minLength: minLength(11), maxLength: maxLength(11)},
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
        this.$v.Students.$touch();
        if (this.$v.Students.$anyError) {
          return;
        }
        else {
          var element = document.getElementById("PersonalInformation");
          element.classList.add("active");
          var checker;
          this.StudentInfoshowForm = false;
          this.PersonalInfoshowForm = true;
        }


      },

      showParentsInfoForm: function(){
        this.$v.StudPersonal.$touch();
        if (this.$v.StudPersonal.$anyError) {
          return;
        }
        else {
          var element = document.getElementById("ParentsInformation");
          element.classList.add("active");
          var checker;
          this.ParentsInfoshowForm = true;
          this.PersonalInfoshowForm = false;
        }

      },

      backPersonalInfoForm: function(){
        this.PersonalInfoshowForm = true;
        this.ParentsInfoshowForm = false;
      },

      RegStudents: function(){
        this.$v.StudParents.$touch();
        if (this.$v.StudParents.$anyError) {
          return;
        }
        else {
          this.Students.address = this.StudPersonal.address;
          this.Students.barangay = this.StudPersonal.barangay;
          this.Students.city = this.StudPersonal.city;
          this.Students.province = this.StudPersonal.province;
          this.Students.postal = this.StudPersonal.postal;
          this.Students.birth_date = this.StudPersonal.birth_date;
          this.Students.birth_place = this.StudPersonal.birth_place;
          this.Students.gender = this.StudPersonal.gender;
          this.Students.cellphone = this.StudPersonal.cellphone;
          this.Students.citizenship = this.StudPersonal.citizenship;
          this.Students.civil_status = this.StudPersonal.civil_status;

          this.Students.mother_name = this.StudParents.mother_name;
          this.Students.contact_person = this.StudParents.contact_person;
          this.Students.contact_address = this.StudParents.contact_address;
          this.Students.contact_number = this.StudParents.contact_number;

          this.ParentsInfoshowForm = false;
          this.progress = false;
          this.RegisterTableForm = true;
          var q = document.getElementById("PersonalInformation");
          var w = document.getElementById("ParentsInformation");
           q.classList.remove("active");
           w.classList.remove("active");
          Axios
            .post('http://localhost/api/v1/students', this.Students, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              console.log(response.message);

              this.alertMessage = "New student record successfully registered";
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
              var sn, mn = null;
              sn = this.items[i].suffix_name != null ? " " +this.items[i].suffix_name : '',
              mn = this.items[i].middle_name != null ? this.items[i].middle_name : '',
              this.items[i].full_name = this.items[i].last_name + sn + ", " + this.items[i].first_name + " " + mn;
            }
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
        this.$nextTick(() => {
          this.$v.$reset();
        });
      },

      CancelRegister: function(){
        this.ClearStudentFields();
        this.secondTabDisabled = true;
        this.lastTabsDisabled = true;
        this.StudentInfoshowForm = false;
        this.progress = false;
        this.RegisterTableForm = true;
      },

      toggleForm: function(){
        if(this.StudentInfoshowForm){
          this.StudentInfoshowForm = false;
          this.RegisterTableForm = true;
        } else {
          this.StudentInfoshowForm = true;
          this.progress = true;
          this.RegisterTableForm = false;
        }
        this.$nextTick(() => {
          this.$v.$reset();
        });
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

<style>
.progressbar {
  counter-reset: step;
  padding: 10px 0px 80px 200px;
}
.progressbar li {
    list-style-type: none;
    width: 25%;
    float: left;
    font-size: 12px;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    color: #7d7d7d;
}

.progressbar li:before {
    width: 30px;
    height: 30px;
    content: counter(step);
    counter-increment: step;
    line-height: 30px;
    border: 2px solid #7d7d7d;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
}

.progressbar li:after {
    width: 100%;
    height: 2px;
    content: '';
    position: absolute;
    background-color: #7d7d7d;
    top: 15px;
    left: -50%;
    z-index: -1;
}

.progressbar li:first-child:after {
    content: none;
}

.progressbar li.active {
    color: green;
}

.progressbar li.active:before {
    border-color: #55b776;
}

.progressbar li.active + li:after {
    background-color: #55b776;
}
</style>
