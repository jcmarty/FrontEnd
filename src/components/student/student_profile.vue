<template lang="html">
  <div>
    <!-- page title -->
    <div class="dash_page_title">
      Profile
      <hr />
    </div>
    <!-- page title -->

    <!-- page content -->
    <div class="dash_profile_container">
      <!-- left content -->
      <div class="left_profile">
        <center>
          <img class="profile_image" src="https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png" alt=""/>
          <h6 class="mb-2">John Christopher L. Marty</h6>
          <p class="mb-4">myEmail@yahoo.com</p>
        </center>
        <div class="dash_recent_info">
          <p class="mb-3">Course <span>BSIT</span></p>
          <p class="mb-3">Year Level <span>1st Year</span></p>
          <p class="mb-3">Block <span>BLK-1</span></p>
          <p class="mb-3">Semester <span>1st Sem</span></p>
        </div>
      </div>
      <!-- left content -->

      <!-- right content -->
      <div class="right_profile">
        <b-tabs content-class="mt-3">

          <b-tab active class="px-2">
            <template slot="title">
              <span :class="{'text-danger' : this.$v.personal_info.$anyError}" >Personal Info
                <i v-if="this.$v.personal_info.$anyError"
                class="fa fa-exclamation-circle fa-lg"
                :class="{'text-danger' : this.$v.personal_info.$anyError}"
                aria-hidden="true"/>
              </span>
            </template>
            <!-- Student Information form -->
            <b-form-row class="mt-5">

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.last_name.$error}"
                  label="Last Name *"
                  label-for="lastName">
                  <b-form-input
                    type="text"
                    id="lastName"
                    v-model.trim="$v.personal_info.last_name.$model"
                    :class="{'is-invalid' :$v.personal_info.last_name.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.last_name.required">Last Name is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.first_name.$error}"
                  label="First Name *"
                  label-for="firstName">
                  <b-form-input
                    type="text"
                    id="firstName"
                    v-model.trim="$v.personal_info.first_name.$model"
                    :class="{'is-invalid' :$v.personal_info.first_name.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.first_name.required">First Name is required!</span>
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
                    v-model="personal_info.suffix_name"
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
                    v-model="personal_info.middle_name"
                    id="middleName">
                  </b-form-input>
                </b-form-group>
              </b-col>


            </b-form-row>

            <b-form-row>

              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.school_last_attended.$error}"
                  label="School Last Attended *"
                  label-for="schoolLastAttended">
                  <b-form-input
                    type="text"
                    id="schoolLastAttended"
                    v-model.trim="$v.personal_info.school_last_attended.$model"
                    :class="{'is-invalid' :$v.personal_info.school_last_attended.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.school_last_attended.required">School Last Attended is required!</span>
                  </div>
                </b-form-group>
              </b-col>

                <b-col cols="12" md="6" lg="6">
                  <b-form-group
                    :class="{'text-danger' : $v.personal_info.school_address.$error}"
                    label="School Address *"
                    label-for="schoolAddress">
                    <b-form-input
                      type="text"
                      id="schoolAddress"
                      v-model.trim="$v.personal_info.school_address.$model"
                      :class="{'is-invalid' :$v.personal_info.school_address.$error}">
                    </b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.personal_info.school_last_attended.required">School Address is required!</span>
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
                      v-model="personal_info.college_last_attended"
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
                        v-model="personal_info.college_address"
                        id="universityAddress">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                </b-form-row>
                <hr class="mt-3"/>
                <b-form-row class="mt-4">
                  <b-button class="ml-1" variant="info" size="sm" @click="saveChanges">
                    Save Changes
                  </b-button>
                </b-form-row>
            <!-- end of Student Information form -->
          </b-tab>

          <b-tab  class="px-2">
            <template slot="title">
              <span :class="{'text-danger' : this.$v.guardian_info.$anyError}" >Guardian Info
                <i v-if="this.$v.guardian_info.$anyError"
                class="fa fa-exclamation-circle fa-lg"
                :class="{'text-danger' : this.$v.guardian_info.$anyError}"
                aria-hidden="true"/>
              </span>
            </template>
            <!-- start of Guardian Informatin form -->
            <b-form-row class="mt-5">
              <b-col cols="12" md="6" lg="5">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.address.$error}"
                  label="Present Address (House No./Lot No./Street) *"
                  label-for="presentAddress">
                  <b-form-input
                    type="text"
                    id="presentAddress"
                    v-model.trim="$v.guardian_info.address.$model"
                    :class="{'is-invalid' :$v.guardian_info.address.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.address.required">Present Address is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.barangay.$error}"
                  label="Barangay / Subdivision *"
                  label-for="Barangay">
                  <b-form-input
                    type="text"
                    id="Barangay"
                    v-model.trim="$v.guardian_info.barangay.$model"
                    :class="{'is-invalid' :$v.guardian_info.barangay.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.barangay.required">Barangay / Subdivision is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.city.$error}"
                  label="City / Municipality *"
                  label-for="cityMunicipality">
                  <b-form-input
                    type="text"
                    id="cityMunicipality"
                    v-model.trim="$v.guardian_info.city.$model"
                    :class="{'is-invalid' :$v.guardian_info.city.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.city.required">City / Municipality is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.province.$error}"
                  label="Province *"
                  label-for="Province">
                  <b-form-input
                    type="text"
                    id="Province"
                    v-model.trim="$v.guardian_info.province.$model"
                    :class="{'is-invalid' :$v.guardian_info.province.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.province.required">Province is required!</span>
                  </div>
                </b-form-group>
              </b-col>


            </b-form-row>

            <b-form-row>
              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.postal.$error}"
                  label="Postal Code"
                  label-for="postalCode">
                  <b-form-input
                    type="text"
                    id="postalCode"
                    v-model.trim="$v.guardian_info.postal.$model"
                    :class="{'is-invalid' :$v.guardian_info.postal.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.postal.required">Postal Code is required!</span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.gender.$error}"
                  label="Gender *"
                  label-for="Gender">
                  <b-form-select
                    :options="genderOptions"
                    v-model.trim="$v.guardian_info.gender.$model"
                    :class="{'is-invalid' :$v.guardian_info.gender.$error}">
                  </b-form-select>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.gender.required">Gender is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="5">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.email.$error}"
                  label="Email Address *"
                  label-for="emailAddress">
                  <b-form-input
                    type="email"
                    id="emailAddress"
                    v-model.trim="$v.guardian_info.email.$model"
                    :class="{'is-invalid' :$v.guardian_info.email.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.email.required">Email Address is required!</span>
                    <span v-if="!$v.guardian_info.email.email">You have entered an invalid email address!</span>
                  </div>
                </b-form-group>
              </b-col>



              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.cellphone.$error}"
                  label="Cellphone No. *"
                  label-for="cellphoneNo">
                  <b-form-input
                    type="number"
                    id="cellphoneNo"
                    v-model.trim="$v.guardian_info.cellphone.$model"
                    :class="{'is-invalid' :$v.guardian_info.cellphone.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.cellphone.required">Contact No is required!</span>
                    <span v-if="!$v.guardian_info.cellphone.maxLength">Maximum of 11 digits!</span>
                    <span v-if="!$v.guardian_info.cellphone.minLength">Minimum of 11 digits!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.birth_date.$error}"
                  label="Birth Date *"
                  label-for="birthDate">
                  <datepicker
                    id="birthDate"
                    :clear-button="true"
                    :calendar-button="true"
                    calendar-button-icon="fa fa-calendar"
                    :bootstrap-styling="true"
                    :format="birthDateFormat"
                    v-model.trim="$v.guardian_info.birth_date.$model"
                    :class="{'is-invalid' :$v.guardian_info.birth_date.$error}">
                  </datepicker>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.birth_date.required">Birth Date is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.birth_place.$error}"
                  label="Place of Birth *"
                  label-for="placeofBirth">
                  <b-form-input
                    type="text"
                    id="placeofBirth"
                    v-model.trim="$v.guardian_info.birth_place.$model"
                    :class="{'is-invalid' :$v.guardian_info.birth_place.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.birth_place.required">Place of Birth is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.citizenship.$error}"
                  label="Citizenship *"
                  label-for="citizenShip">
                  <b-form-input
                    type="text"
                    id="citizenShip"
                    v-model.trim="$v.guardian_info.citizenship.$model"
                    :class="{'is-invalid' :$v.guardian_info.citizenship.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.citizenship.required">Citizenship is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.civil_status.$error}"
                  label="Civil status *"
                  label-for="civilStatus">
                  <b-form-input
                    type="text"
                    id="civilStatus"
                    v-model.trim="$v.guardian_info.civil_status.$model"
                    :class="{'is-invalid' :$v.guardian_info.civil_status.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.civil_status.required">Civil Status is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  class="telephoneno"
                  label="Telephone No."
                  label-for="telephoneNo">
                  <b-form-input
                    type="text"
                    v-model="guardian_info.telephone"
                    id="telephoneNo"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              </b-form-row>
              <hr class="mt-3"/>
              <b-form-row class="mt-4">
                <b-button class="ml-1" variant="info" size="sm" @click="saveChanges">
                  Save Changes
                </b-button>
              </b-form-row>
          </b-tab>

        </b-tabs>
      </div>
      <!-- right content -->

    </div>
    <!-- page content -->

  </div>
</template>

<script>
import { required, minLength, maxLength, between, email } from 'vuelidate/lib/validators';
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
export default {
  name: 'StudentProfile',
  components: {
    Datepicker,
    VueTimepicker,
  },
  data() {
    return {
      personal_info : {
        first_name : "",
        last_name : "",
        middle_name : "",
        suffix_name : "",
        school_last_attended : "",
        school_address : "",
        college_last_attended : "",
        college_address : ""
      },

      guardian_info:{
        gender: "",
        civil_status: "",
        citizenship: "",
        address: "",
        barangay: "",
        city: "",
        postal: "",
        province: "",
        cellphone: "",
        telephone: "",
        email: "",
        birth_date: "",
        birth_place: "",
      },

      account_info : {
        student_username : "",
        student_password : ""
      },

      birthDateFormat: "MMM dd, yyyy",
      genderOptions: [
        {value: 'Male', text: 'Male'},
        {value: 'Female', text: 'Female'}
      ],
    }
  },
  validations: {
     personal_info: {
       first_name: {required},
       last_name: {required},
       school_last_attended: {required},
       school_address: {required}
     },

     guardian_info:{
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

     account_info:{
       student_username: {required},
       student_password: {required},
       // student_new_password: {},
       // student_confirm_password {},
     }
  }, // End of Data

  methods:{
    validatePersonalInfo(){
      this.$v.personal_info.$touch();
      if (this.$v.personal_info.$anyError) {
        return;
      }
    }, // end of function validatePersonalInfo

    validateGuardianInfo(){
      this.$v.guardian_info.$touch();
      if (this.$v.guardian_info.$anyError) {
        return;
      }
    }, // end of function validatePersonalInfo

    saveChanges(){
      this.validatePersonalInfo();
      this.validateGuardianInfo();
    }, // end of function saveChanges
  },
}
</script>

<style lang="css" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .dash_tab_title{
    text-transform: capitalize;
  }

  .dash_profile_container{
    display: flex;
    justify-content: space-between;
  }

  .right_profile{
    width: calc(100vw - 220px - 230px - 60px);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
    padding: 20px;
    height: auto;
    float: right;
  }

  .right_profile b-tabs{
    color: red;
  }

  .dash_recent_info p span{
    float: right;
    color: #1b56f3;
    font-weight: 900;
    font-family: "Calibri";
    font-size: 14pt;
    line-height: 1;
  }

  .dash_recent_info p{
    font-weight: bold;
    font-size: 11pt;
  }

  .dash_page_title{
    font-size: 17pt;
    font-weight: bold;
    padding: 0;
    margin-bottom: 20px;
  }

  .left_profile{
    width: 230px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
    padding: 20px;
    min-height: calc(100vh - 55px - 45px - 100px);
    /* height: 100vh; */
    margin-right: 20px;
    float: left;
  }

  .left_profile h6{
    text-transform: uppercase;
  }

  .left_profile .profile_image{
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-bottom: 20px;
    margin-top: 10px;
  }



</style>
