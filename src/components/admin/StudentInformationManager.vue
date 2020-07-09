<template>
  <div class="container">
    <h1 class="font-weight-bold text-dark">Student Information</h1>
    <hr/>
    <b-breadcrumb>
      <b-breadcrumb-item to="/manage/student/registration">Student Registration</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ this.Students.first_name }} {{ this.Students.last_name }}</b-breadcrumb-item>
    </b-breadcrumb>


    <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded">
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

      <b-modal id="confirmUpdate" ref="confirmUpdate" size="md" no-close-on-backdrop>
        <center><h6>Are you sure you want to update this information?</b></h6></center>

          <!-- Modal Footer Template -->
          <template v-slot:modal-footer="{ cancel, ok }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-col>
              <b-button  class="float-left" variant="danger" @click="$bvModal.hide('confirmUpdate')">
                No
              </b-button>
              <b-button class="float-right" variant="success" @click="StudInfoUpdate">
                Yes
              </b-button>
            </b-col>
          </template>
      </b-modal>

    <div class=" h5 font-weight-bold text-dark">Student Information

          <b-button
            class="float-right"
            v-if="information_disable"
            variant="warning"
            @click="information_disable = false"
            v-b-tooltip.hover title="Edit">
              <i class="fa fa-pencil"/>
          </b-button>

          <b-button
            class="float-right"
            v-if="!information_disable"
            variant="danger"
            @click="cancelForm"
            v-b-tooltip.hover title="Cancel">
            <i class="fa fa-times-circle"></i>
          </b-button>

          <b-button
            class="float-right"
            v-if="!information_disable"
            variant="success"
            @click="confirmUpdateModal"
            v-b-tooltip.hover title="Update">
            <i class="fa fa-save"/>
          </b-button>

    </div>
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
              aria-describedby="last_name-feedback"
              :disabled="information_disable">
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
              aria-describedby="first_name-feedback"
              :disabled="information_disable">
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
              :state="school_last_attended_state"
              aria-describedby="school_last_attended-feedback"
              :disabled="information_disable">
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
                aria-describedby="school_address-feedback"
                :disabled="information_disable">
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
              :state="present_address_state"
              aria-describedby="present_address-feedback"
              :disabled="information_disable">
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
              aria-describedby="barangay-feedback"
              :disabled="information_disable">
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
              aria-describedby="cityMunicipality-feedback"
              :disabled="information_disable">
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
              aria-describedby="province-feedback"
              :disabled="information_disable">
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
              aria-describedby="postalCode-feedback"
              :disabled="information_disable">
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
              aria-describedby="birthDate-feedback"
              :disabled="information_disable">
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
              aria-describedby="gender-feedback"
              :disabled="information_disable">
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
              :state="cellphone_state"
              aria-describedby="cellphone-feedback"
              :disabled="information_disable">
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
              aria-describedby="placeofBirth-feedback"
              :disabled="information_disable">
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
              aria-describedby="citizenShip-feedback"
              :disabled="information_disable">
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
              aria-describedby="civilStatus-feedback"
              :disabled="information_disable">
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
              :state="fathersName_state"
              aria-describedby="father_name-feedback"
              :disabled="information_disable">
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
              aria-describedby="mother_name-feedback"
              :disabled="information_disable">
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
              aria-describedby="guardianName-feedback"
              :disabled="information_disable">
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
              aria-describedby="contact_address-feedback"
              :disabled="information_disable">
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
            aria-describedby="contact_number-feedback"
            :disabled="information_disable">
          </b-form-input>
          <b-form-invalid-feedback id="contact_number-feedback">
            Contact number is required!
          </b-form-invalid-feedback>
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
    name: 'StudentInformationManager',
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
    mounted: function(){
      this.getStudents();
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
          photo_url: "sample.jpg",
          user_id: this.$route.params.user_id,
          school_last_attended: this.$route.params.school_last_attended,
          school_address: this.$route.params.school_address,
          college_last_attended: this.$route.params.college_last_attended,
          college_address: this.$route.params.college_address,
          active: 1,
        }
    },


    methods:{

      getStudents: function(){

        Axios
          .get('http://localhost/api/v1/students/'+ this.Students.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.student = response.data;
            console.log(this.student)
          })
      },
      // Update Room Function
      StudInfoUpdate: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/students/'+ this.Students.id, this.Students, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getStudents();
          this.information_disable = true;
          this.alertMessage = response.data.message;
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
        this.$refs['confirmUpdate'].hide();
      }, // End of Update Room Function

      confirmUpdateModal: function(){
        this.$refs['confirmUpdate'].show();
      },

      cancelForm: function(){
        this.information_disable = true;
        this.Students = {
          id: this.$route.params.id,
          student_number: this.$route.params.student_number,
          first_name: this.student.first_name,
          middle_name: this.student.middle_name,
          last_name: this.student.last_name,
          suffix_name: this.student.suffix_name,
          gender: this.student.gender,
          civil_status: this.student.civil_status,
          citizenship:this.student.citizenship,
          address: this.student.address,
          barangay: this.student.barangay,
          city: this.student.city,
          postal: this.student.postal,
          province: this.student.province,
          telephone: this.student.telephone,
          cellphone: this.student.cellphone,
          email: this.student.email,
          birth_date: this.student.birth_date,
          birth_place: this.student.birth_place,
          father_name: this.student.father_name,
          mother_name: this.student.mother_name,
          contact_person: this.student.contact_person,
          contact_address: this.student.contact_address,
          contact_number: this.student.contact_number,
          blood_type: this.student.blood_type,
          photo_url: "sample.jpg",
          user_id: this.student.user_id,
          school_last_attended: this.student.school_last_attended,
          school_address: this.student.school_address,
          college_last_attended: this.student.college_last_attended,
          college_address: this.student.college_address,
          active: 1,
        }
      },


    }
  }
</script>
