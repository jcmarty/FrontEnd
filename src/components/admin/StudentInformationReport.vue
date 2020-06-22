<template>
  <div class="container">
    <h1 class="font-weight-bold text-dark">Student Information</h1>
    <hr/>
    <b-breadcrumb>
      <b-breadcrumb-item to="/reports/student">Student Report</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ this.Students.first_name }} {{ this.Students.last_name }}</b-breadcrumb-item>
    </b-breadcrumb>




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
              :disabled="information_disable">
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
              id="firstName"
              :disabled="information_disable">
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
              id="middleName"
              :disabled="information_disable">
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
              id="suffixName"
              :disabled="information_disable">
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
              :disabled="information_disable">
            </b-form-input>
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
                :disabled="information_disable">
              </b-form-input>
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
                id="universityCollege"
                :disabled="information_disable">
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
                  id="universityAddress"
                  :disabled="information_disable">
                </b-form-input>
              </b-form-group>
            </b-col>

          </b-form-row>

    </div>
    <!-- end of academic form -->

    <hr/>
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
              :disabled="information_disable">
            </b-form-input>
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
              :disabled="information_disable">
            </b-form-input>
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
              :disabled="information_disable">
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
              :disabled="information_disable">
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
              :disabled="information_disable">
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
              v-model="Students.birth_date"
              id="birthDate"
              :clear-button="true"
              :calendar-button="true"
              :calendar-button-icon="calendarIcon"
              :bootstrap-styling="true"
              :format="birthDateFormat"
              :disabled="information_disable">
            </datepicker>
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
              :disabled="information_disable">
            </b-form-select>
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
              :disabled="information_disable">
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
              :disabled="information_disable">
            </b-form-input>
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
              :disabled="information_disable">
            </b-form-input>
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
              :disabled="information_disable">
            </b-form-input>
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
              :disabled="information_disable">
            </b-form-input>
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
              :disabled="information_disable">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </div>
    <hr/>
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
              :disabled="information_disable">
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
              id="mothersName"
              :disabled="information_disable">
            </b-form-input>
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
              :disabled="information_disable">
            </b-form-input>
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
              :disabled="information_disable">
            </b-form-input>

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
            :disabled="information_disable">
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    </div>
  </div>
    <!-- end of academic form -->

  </div>
</template>   

<style>
  .panel-body{
    padding: 10px 20px;
  }

  thead{
    text-align: center;
  }

  .table tbody tr td, .table th {
    vertical-align: middle;
  }

</style>

<script>
  import Axios from "axios";
  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker';
  import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
  export default{
    name: 'StudentInformationReport',
    components: {
      Datepicker,
      VueTimepicker,
    },
    data() {
      return {

        student:[],

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
          telephone: 0,
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

        genderOptions: [
          {value: 'Male', text: 'Male'},
          {value: 'Female', text: 'Female'}
        ],

        calendarIcon: "fa fa-calendar",
        birthDateFormat: "MMM dd, yyyy",

        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
        updateSuccessCountDown: 0,
        updateErrorCountDown: 0,

        information_disable: true,


      }
    },

    created() {
        this.Students = {
          id: this.$route.params.id,
          name: this.$route.params.first_name + " " + this.$route.params.last_name,
          student_number: this.$route.params.student_number,
          first_name: this.$route.params.first_name,
          middle_name: this.$route.params.middle_name,
          last_name: this.$route.params.last_name,
          suffix_name: this.$route.params.suffix_name,
          gender: this.$route.params.gender,
          civil_status: this.$route.params.civil_status,
          citizenship:this.$route.params.citizenship,
          address: this.$route.params.address,
          barangay: this.$route.params.barangay,
          city: this.$route.params.city,
          postal: this.$route.params.postal,
          province: this.$route.params.province,
          telephone: this.$route.params.telephone,
          cellphone: this.$route.params.cellphone,
          email: this.$route.params.email,
          birth_date: this.$route.params.birth_date,
          birth_place: this.$route.params.birth_place,
          father_name: this.$route.params.father_name,
          mother_name: this.$route.params.mother_name,
          contact_person: this.$route.params.contact_person,
          contact_address: this.$route.params.contact_address,
          contact_number: this.$route.params.contact_number,
          blood_type: this.$route.params.blood_type,
          photo_url: this.$route.params.photo_url,
          user_id: this.$route.params.user_id,
          school_last_attended: this.$route.params.school_last_attended,
          school_address: this.$route.params.school_address,
          college_last_attended: this.$route.params.college_last_attended,
          college_address: this.$route.params.college_address,

        }
    },

  }
</script>
