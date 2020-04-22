<template>
  <div class="container">
    <h1>Instructor Information</h1>
    <hr/>
    <b-breadcrumb>
      <b-breadcrumb-item to="/manage/instructor">Instructors</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ instructor.name }}</b-breadcrumb-item>
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

    <div class=" h5 font-weight-bold text-dark">Personal Information

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
            variant="success"
            @click="updateInstructor"
            v-b-tooltip.hover title="Update">
            <i class="fa fa-save"/>
          </b-button>
    </div>

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
                id="empID"
                :disabled="information_disable">
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
                id="firstname"
                :disabled="information_disable">
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
                id="middlename"
                :disabled="information_disable">
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
                id="lastname"
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
                v-model="instructor.birth_date"
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
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="gender"
              label="Gender"
              label-for="gender">
              <b-form-select
                v-model="instructor.gender"
                :options="genderOptions"
                :disabled="information_disable">
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
                :disabled="information_disable">
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
                id="contact_no"
                :disabled="information_disable">
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
                id="address"
                :disabled="information_disable">
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
                id="city"
                :disabled="information_disable">
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
                id="province"
                :disabled="information_disable">
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
                id="postal_code"
                :disabled="information_disable">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </div>

    <hr/>

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
                max-rows="6"
                :disabled="information_disable">
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
                max-rows="6"
                :disabled="information_disable">
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
                max-rows="6"
                :disabled="information_disable">
              </b-form-textarea>
            </b-form-group>
          </b-col>
        </b-form-row>

      </div>

    </div>
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
    name: 'InstructorInformationManager',
    components: {
      Datepicker,
      VueTimepicker,
    },
    data() {
      return {

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
          active: 1
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

    },
    created() {
        this.instructor = {
          id: this.$route.params.id,
          name: this.$route.params.first_name + " " + this.$route.params.last_name,
          employee_id: this.$route.params.employee_id,
          first_name: this.$route.params.first_name,
          middle_name: this.$route.params.middle_name,
          last_name: this.$route.params.last_name,
          birth_date: this.$route.params.birth_date,
          gender: this.$route.params.gender,
          email: this.$route.params.email,
          contact_no: this.$route.params.contact_no,
          address: this.$route.params.address,
          city: this.$route.params.city,
          province: this.$route.params.province,
          postal_code: this.$route.params.postal_code,
          work_experience: this.$route.params.work_experience,
          certifications: this.$route.params.certifications,
          educational_attainment: this.$route.params.educational_attainment,
          active: 1
        }
    },
    methods:{

      updateInstructor: function(){
        this.errors = [];
        Axios
          .put('http://localhost/api/v1/instructors/' + this.instructor.id, this.instructor, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
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
            this.updateErrorCountDown = this.dismissSecs;
          });
      },
    }
  }
</script>
