<template lang="html">
  <div>
    <!-- page title -->
    <div class="dash_page_title">
      Profile
      <hr />
    </div>
    <!-- page title -->
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
    <!-- page content -->
    <div class="dash_profile_container">
      <!-- left content -->
      <div class="left_profile">
        <center>
          <img class="profile_image" src="https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png" alt=""/>
          <h6 class="mb-2">{{academic_info.first_name}} {{academic_info.last_name}}</h6>
          <p class="mb-4">{{personal_info.email}}</p>
        </center>
        <div v-if="aside_info" class="dash_recent_info">
          <p class="mb-3">S.Y <span>{{aside_info.academic_year}}</span></p>
          <p class="mb-3">Semester <span>{{aside_info.semester}}</span></p>
          <p class="mb-3">Course <span>{{aside_info.course_code}}</span></p>
          <p class="mb-3">Year Level <span>{{aside_info.year_level}}</span></p>
          <p class="mb-3">Block <span>BLK - {{aside_info.block}}</span></p>
          <p class="mb-3">Academic <span>{{aside_info.academic_status}}</span></p>
        </div>
      </div>
      <!-- left content -->

      <!-- right content -->
      <div class="right_profile">
        <b-tabs content-class="mt-3">

          <b-tab active class="px-2">
            <template slot="title">
              <span :class="{'text-danger' : this.$v.academic_info.$anyError}" >Academic Info
                <i v-if="this.$v.academic_info.$anyError"
                class="fa fa-exclamation-circle fa-lg"
                :class="{'text-danger' : this.$v.academic_info.$anyError}"
                aria-hidden="true"/>
              </span>
            </template>
            <!-- Student Information form -->
            <b-form-row class="mt-5">

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.academic_info.last_name.$error}"
                  label="Last Name *"
                  label-for="lastName">
                  <b-form-input
                    type="text"
                    id="lastName"
                    v-model.trim="$v.academic_info.last_name.$model"
                    :class="{'is-invalid' :$v.academic_info.last_name.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.academic_info.last_name.required">Last Name is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.academic_info.first_name.$error}"
                  label="First Name *"
                  label-for="firstName">
                  <b-form-input
                    type="text"
                    id="firstName"
                    v-model.trim="$v.academic_info.first_name.$model"
                    :class="{'is-invalid' :$v.academic_info.first_name.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.academic_info.first_name.required">First Name is required!</span>
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
                    v-model="academic_info.suffix_name"
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
                    v-model="academic_info.middle_name"
                    id="middleName">
                  </b-form-input>
                </b-form-group>
              </b-col>


            </b-form-row>

            <b-form-row>

              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  :class="{'text-danger' : $v.academic_info.school_last_attended.$error}"
                  label="School Last Attended *"
                  label-for="schoolLastAttended">
                  <b-form-input
                    type="text"
                    id="schoolLastAttended"
                    v-model.trim="$v.academic_info.school_last_attended.$model"
                    :class="{'is-invalid' :$v.academic_info.school_last_attended.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.academic_info.school_last_attended.required">School Last Attended is required!</span>
                  </div>
                </b-form-group>
              </b-col>

                <b-col cols="12" md="6" lg="6">
                  <b-form-group
                    :class="{'text-danger' : $v.academic_info.school_address.$error}"
                    label="School Address *"
                    label-for="schoolAddress">
                    <b-form-input
                      type="text"
                      id="schoolAddress"
                      v-model.trim="$v.academic_info.school_address.$model"
                      :class="{'is-invalid' :$v.academic_info.school_address.$error}">
                    </b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.academic_info.school_last_attended.required">School Address is required!</span>
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
                      v-model="academic_info.college_last_attended"
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
                        v-model="academic_info.college_address"
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
              <span :class="{'text-danger' : this.$v.personal_info.$anyError}" >Personal Info
                <i v-if="this.$v.personal_info.$anyError"
                class="fa fa-exclamation-circle fa-lg"
                :class="{'text-danger' : this.$v.personal_info.$anyError}"
                aria-hidden="true"/>
              </span>
            </template>
            <!-- start of Guardian Informatin form -->
            <b-form-row class="mt-5">
              <b-col cols="12" md="6" lg="5">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.address.$error}"
                  label="Present Address (House No./Lot No./Street) *"
                  label-for="presentAddress">
                  <b-form-input
                    type="text"
                    id="presentAddress"
                    v-model.trim="$v.personal_info.address.$model"
                    :class="{'is-invalid' :$v.personal_info.address.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.address.required">Present Address is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.barangay.$error}"
                  label="Barangay / Subdivision *"
                  label-for="Barangay">
                  <b-form-input
                    type="text"
                    id="Barangay"
                    v-model.trim="$v.personal_info.barangay.$model"
                    :class="{'is-invalid' :$v.personal_info.barangay.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.barangay.required">Barangay / Subdivision is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.city.$error}"
                  label="City / Municipality *"
                  label-for="cityMunicipality">
                  <b-form-input
                    type="text"
                    id="cityMunicipality"
                    v-model.trim="$v.personal_info.city.$model"
                    :class="{'is-invalid' :$v.personal_info.city.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.city.required">City / Municipality is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.province.$error}"
                  label="Province *"
                  label-for="Province">
                  <b-form-input
                    type="text"
                    id="Province"
                    v-model.trim="$v.personal_info.province.$model"
                    :class="{'is-invalid' :$v.personal_info.province.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.province.required">Province is required!</span>
                  </div>
                </b-form-group>
              </b-col>


            </b-form-row>

            <b-form-row>
              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.postal.$error}"
                  label="Postal Code"
                  label-for="postalCode">
                  <b-form-input
                    type="text"
                    id="postalCode"
                    v-model.trim="$v.personal_info.postal.$model"
                    :class="{'is-invalid' :$v.personal_info.postal.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.postal.required">Postal Code is required!</span>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.gender.$error}"
                  label="Gender *"
                  label-for="Gender">
                  <b-form-select
                    :options="genderOptions"
                    v-model.trim="$v.personal_info.gender.$model"
                    :class="{'is-invalid' :$v.personal_info.gender.$error}">
                  </b-form-select>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.gender.required">Gender is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="5">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.email.$error}"
                  label="Email Address *"
                  label-for="emailAddress">
                  <b-form-input
                    type="email"
                    id="emailAddress"
                    v-model.trim="$v.personal_info.email.$model"
                    :class="{'is-invalid' :$v.personal_info.email.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.email.required">Email Address is required!</span>
                    <span v-if="!$v.personal_info.email.email">You have entered an invalid email address!</span>
                  </div>
                </b-form-group>
              </b-col>



              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.cellphone.$error}"
                  label="Cellphone No. *"
                  label-for="cellphoneNo">
                  <b-form-input
                    type="number"
                    id="cellphoneNo"
                    v-model.trim="$v.personal_info.cellphone.$model"
                    :class="{'is-invalid' :$v.personal_info.cellphone.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.cellphone.required">Contact No is required!</span>
                    <span v-if="!$v.personal_info.cellphone.maxLength">Maximum of 11 digits!</span>
                    <span v-if="!$v.personal_info.cellphone.minLength">Minimum of 11 digits!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.birth_date.$error}"
                  label="Birth Date *"
                  label-for="birthDate">
                  <datepicker
                    id="birthDate"
                    :clear-button="true"
                    :calendar-button="true"
                    calendar-button-icon="fa fa-calendar"
                    :bootstrap-styling="true"
                    :format="birthDateFormat"
                    v-model.trim="$v.personal_info.birth_date.$model"
                    :class="{'is-invalid' :$v.personal_info.birth_date.$error}">
                  </datepicker>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.birth_date.required">Birth Date is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.birth_place.$error}"
                  label="Place of Birth *"
                  label-for="placeofBirth">
                  <b-form-input
                    type="text"
                    id="placeofBirth"
                    v-model.trim="$v.personal_info.birth_place.$model"
                    :class="{'is-invalid' :$v.personal_info.birth_place.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.birth_place.required">Place of Birth is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.citizenship.$error}"
                  label="Citizenship *"
                  label-for="citizenShip">
                  <b-form-input
                    type="text"
                    id="citizenShip"
                    v-model.trim="$v.personal_info.citizenship.$model"
                    :class="{'is-invalid' :$v.personal_info.citizenship.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.citizenship.required">Citizenship is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="2">
                <b-form-group
                  :class="{'text-danger' : $v.personal_info.civil_status.$error}"
                  label="Civil status *"
                  label-for="civilStatus">
                  <b-form-input
                    type="text"
                    id="civilStatus"
                    v-model.trim="$v.personal_info.civil_status.$model"
                    :class="{'is-invalid' :$v.personal_info.civil_status.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.personal_info.civil_status.required">Civil Status is required!</span>
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
                    v-model="personal_info.telephone"
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

          <b-tab  class="px-2">
            <template slot="title">
              <span :class="{'text-danger' : this.$v.guardian_info.$anyError}" >Guardian Info
                <i v-if="this.$v.guardian_info.$anyError"
                class="fa fa-exclamation-circle fa-lg"
                :class="{'text-danger' : this.$v.guardian_info.$anyError}"
                aria-hidden="true"/>
              </span>
            </template>
            <b-form-row class="mt-5">
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  label="Father's Name"
                  label-for="fathersName">
                  <b-form-input
                    type="text"
                    v-model="guardian_info.father_name"
                    id="fathersName">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.mother_name.$error}"
                  label="Mother's Name *"
                  label-for="mothersName">
                  <b-form-input
                    type="text"
                    id="mothersName"
                    v-model.trim="$v.guardian_info.mother_name.$model"
                    :class="{'is-invalid' :$v.guardian_info.mother_name.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.mother_name.required">Mother's Name is required!</span>
                  </div>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.contact_person.$error}"
                  label="Guardian's Name *"
                  label-for="guardianName">
                  <b-form-input
                    type="text"
                    id="guardianName"
                    v-model.trim="$v.guardian_info.contact_person.$model"
                    :class="{'is-invalid' :$v.guardian_info.contact_person.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.contact_person.required">Contact No is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.contact_address.$error}"
                  label="Contact Address *"
                  label-for="contactAddress">
                  <b-form-input
                    type="text"
                    id="contactAddress"
                    v-model.trim="$v.guardian_info.contact_address.$model"
                    :class="{'is-invalid' :$v.guardian_info.contact_address.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.contact_address.required">Contact Address is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  :class="{'text-danger' : $v.guardian_info.contact_number.$error}"
                  label="Contact Number *"
                  label-for="contactNumber">
                  <b-form-input
                    type="number"
                    id="contactNumber"
                    v-model.trim="$v.guardian_info.contact_number.$model"
                    :class="{'is-invalid' :$v.guardian_info.contact_number.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.guardian_info.contact_number.required">Contact Number is required!</span>
                    <span v-if="!$v.guardian_info.contact_number.maxLength">Maximum of 11 digits!</span>
                    <span v-if="!$v.guardian_info.contact_number.minLength">Minimum of 11 digits!</span>
                  </div>
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

          <b-tab  class="px-2">
            <template slot="title">
              <span :class="{'text-danger' : this.$v.account_info.$anyError}" >Account Info
                <i v-if="this.$v.account_info.$anyError"
                class="fa fa-exclamation-circle fa-lg"
                :class="{'text-danger' : this.$v.account_info.$anyError}"
                aria-hidden="true"/>
              </span>
            </template>

            <b-form-row>
              <!-- Username -->
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  :class="{'text-danger' : $v.account_info.username.$error }"
                  label="Username *"
                  label-for="Username">
                  <b-form-input
                    type="text"
                    id="Username"
                    v-model.trim="$v.account_info.username.$model"
                    :class="{'is-invalid' :$v.account_info.username.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.account_info.username.required">Username is required!</span>
                  </div>
                </b-form-group>
              </b-col>


            <!-- Email -->
            <b-col cols="12" md="6" lg="6">
              <b-form-group
                :class="{'text-danger' : $v.account_info.email.$error}"
                label="Email *"
                label-for="Email">
                <b-form-input
                  type="text"
                  id="Email"
                  v-model.trim="$v.account_info.email.$model"
                  :class="{'is-invalid' :$v.account_info.email.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.account_info.email.required">Email is required!</span>
                  <span v-if="!$v.account_info.email.email">You have entered an invalid email address!</span>
                </div>
              </b-form-group>
            </b-col>
          </b-form-row>

          <!-- First Name -->
          <b-form-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group
                :class="{'text-danger' : $v.account_info.first_name.$error}"
                label="First Name *"
                label-for="firstName">
                <b-form-input
                  type="text"
                  id="firstName"
                  v-model.trim="$v.account_info.first_name.$model"
                  :class="{'is-invalid' :$v.account_info.first_name.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.account_info.first_name.required">First Name is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <!-- Middle Name -->
            <b-col cols="12" md="6" lg="4">
              <b-form-group
                class="middlename"
                label="Middle Name"
                label-for="middleName">
                <b-form-input
                  type="text"
                  v-model="account_info.middle_name"
                  id="middleName">
                </b-form-input>
              </b-form-group>
            </b-col>

            <!-- Last Name -->
            <b-col cols="12" md="6" lg="4">
              <b-form-group
                :class="{'text-danger' : $v.account_info.last_name.$error}"
                label="Last Name *"
                label-for="lastName">
                <b-form-input
                  type="text"
                  id="lastName"
                  v-model.trim="$v.account_info.last_name.$model"
                  :class="{'is-invalid' :$v.account_info.last_name.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.account_info.last_name.required">Last Name is required!</span>
                </div>
              </b-form-group>
            </b-col>

          </b-form-row>

            <hr class="mt-3"/>
            <b-form-row class="mt-4">
              <b-button class="ml-1" variant="info" size="sm" @click="validateAccountInfo">
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
import Axios from "axios";
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
      result : null,
      academic_info : {
        first_name : "",
        last_name : "",
        middle_name : "",
        suffix_name : "",
        school_last_attended : "",
        school_address : "",
        college_last_attended : "",
        college_address : ""
      },

      personal_info:{
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

      guardian_info: {
        father_name: null,
        mother_name: null,
        contact_person: null,
        contact_address: null,
        contact_number: null,
      },

      aside_info: null,

      academic_error: null,
      personal_error : null,
      guardian_error : null,

      account_info : {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
      },

      alertMessage: "",
      errors: [],
      dismissSecs: 7,
      dismissSuccessCountDown: 0,
      dismissErrorCountDown: 0,
      updateSuccessCountDown: 0,
      updateErrorCountDown: 0,

      birthDateFormat: "MMM dd, yyyy",
      genderOptions: [
        {value: 'Male', text: 'Male'},
        {value: 'Female', text: 'Female'}
      ],
    }
  },
  validations: {
     academic_info: {
       first_name: {required},
       last_name: {required},
       school_last_attended: {required},
       school_address: {required}
     },

     personal_info:{
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

     guardian_info: {
       mother_name: {required},
       contact_person: {required},
       contact_address: {required},
       contact_number: {required, minLength: minLength(11), maxLength: maxLength(11)},
     },

     account_info:{
       username: {required},
       first_name: {required},
       last_name: {required},
       email: {required, email},
       // student_new_password: {},
       // student_confirm_password {},
     }
  }, // End of Data

  created(){

  },

  mounted(){
    this.result = this.$store.getters.getStudentUser;
    var x = this.$store.getters.getStudentUser.student
    // console.log(x.enrollment[0])
    this.academic_info = {
      first_name : x.first_name,
      last_name : x.last_name,
      middle_name : x.middle_name,
      suffix_name : x.suffix_name,
      school_last_attended : x.school_last_attended,
      school_address : x.school_address,
      college_last_attended : x.college_last_attended,
      college_address : x.college_address
    };

    this.personal_info = {
      gender: x.gender,
      civil_status: x.civil_status,
      citizenship: x.citizenship,
      address: x.address,
      barangay: x.barangay,
      city: x.city,
      postal: x.postal,
      province: x.province,
      cellphone: x.cellphone,
      telephone: x.telephone,
      email: x.email,
      birth_date: x.birth_date,
      birth_place: x.birth_place,
    };

    console.log(this.personal_info)

    this.guardian_info = {
      father_name: x.father_name,
      mother_name: x.mother_name,
      contact_person: x.contact_person,
      contact_address: x.contact_address,
      contact_number: x.contact_number,
    },

    this.account_info = {
      username : this.result.username,
      first_name : this.result.first_name,
      last_name : this.result.last_name,
      email : this.result.email,
    };

    this.aside_info = {
      course_code : x.enrollment[0].course.course_code,
      year_level : x.enrollment[0].year_level,
      block : x.enrollment[0].block,
      semester : x.enrollment[0].semester.semester,
      academic_year : x.enrollment[0].academic_year.academic_year,
      academic_status : x.enrollment[0].academic_status,
    }
    // console.log(this.studentData.student.first_name)
  },

  methods:{
    validateAcademicInfo(){
      this.$v.academic_info.$touch();
      if (this.$v.academic_info.$anyError) {
        this.academic_error = true;
        return;
      }
    }, // end of function validatePersonalInfo

    validatePersonalInfo(){
      this.$v.personal_info.$touch();
      if (this.$v.personal_info.$anyError) {
        this.personal_error = true;
        return;
      }
    }, // end of function validatePersonalInfo

    validateGuardianInfo(){
      this.$v.guardian_info.$touch();
      if (this.$v.guardian_info.$anyError) {
        this.guardian_error = true;
        return;
      }
    }, // end of function validatePersonalInfo

    validateAccountInfo(){
      this.$v.account_info.$touch();
      if (this.$v.account_info.$anyError) {
        return;
      }
      this.updateStudentAccount();
      // update functon here
    }, // end of function validatePersonalInfo

    updateStudentAccount(){
      var id = this.result.student.id
      var to_update = {
        username : this.account_info.username,
        first_name : this.account_info.first_name,
        last_name : this.account_info.last_name,
        email : this.account_info.email,
      };

      Axios
        .put('http://localhost/api/v1/online/students/' + id + '/account', to_update, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getStudentToken}
        })
        .then(response => {
          console.log(response.data.message)
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
        })
        .catch(error => {
          console.log(error.response.data)
          this.alertMessage = error.response.data.message;
          const values = Object.values(error.response.data.errors);
          for(const val of values){
            for(const err of val){
              this.errors.push(err);
            }
          }
          this.dismissErrorCountDown = this.dismissSecs;
        });
    }, // end of function updateStudentAccount





    saveChanges(){
      this.validateAcademicInfo();
      this.validatePersonalInfo();
      this.validateGuardianInfo();

      if(this.academic_error == true || this.personal_error == true || this.guardian_error == true){
        // alert("error")
      }else{
        this.updateStudentProfile();
      }
    }, // end of function saveChanges

    updateStudentProfile(){
      console.log(this.result)

      // var s = this.result.student;

      var id = this.result.student.id;
      var to_update = {

        first_name : this.academic_info.first_name,
        last_name : this.academic_info.last_name,
        middle_name : this.academic_info.middle_name,
        suffiacademic_info_name : this.academic_info.suffiacademic_info_name,
        school_last_attended : this.academic_info.school_last_attended,
        school_address : this.academic_info.school_address,
        college_last_attended : this.academic_info.college_last_attended,
        college_address : this.academic_info.college_address,

        gender: this.personal_info.gender,
        civil_status: this.personal_info.civil_status,
        citizenship: this.personal_info.citizenship,
        address: this.personal_info.address,
        barangay: this.personal_info.barangay,
        city: this.personal_info.city,
        postal: this.personal_info.postal,
        province: this.personal_info.province,
        cellphone: this.personal_info.cellphone,
        telephone: this.personal_info.telephone,
        email: this.personal_info.email,
        birth_date: this.personal_info.birth_date,
        birth_place: this.personal_info.birth_place,

        father_name: this.guardian_info.father_name,
        mother_name: this.guardian_info.mother_name,
        contact_person: this.guardian_info.contact_person,
        contact_address: this.guardian_info.contact_address,
        contact_number: this.guardian_info.contact_number,
        active: 1,
        user_id: this.result.id,
      };
      console.log(to_update)
      Axios
        .put('http://localhost/api/v1/online/students/'+ id, to_update, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getStudentToken}
        })
        .then(response => {
          console.log(response.data.message)
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
    }, // end of function updateStudentProfile

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
