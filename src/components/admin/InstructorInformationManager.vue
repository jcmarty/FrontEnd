<template>
  <div class="container">
    <h1 class="font-weight-bold text-dark">Instructor Information</h1>
    <hr/>
    <b-breadcrumb>
      <b-breadcrumb-item to="/manage/instructor">Instructors</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ this.instructor.first_name }} {{ this.instructor.last_name }}</b-breadcrumb-item>
    </b-breadcrumb>

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

    <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded">


      <b-modal id="confirmUpdate" ref="confirmUpdate" size="md" no-close-on-backdrop>
      <center><h6>Are you sure you want to update this instructor?</b></h6></center>

          <!-- Modal Footer Template -->
          <template v-slot:modal-footer="{ cancel, ok }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-col>
              <b-button  class="float-left" variant="danger" @click="$bvModal.hide('confirmUpdate')">
                No
              </b-button>
              <b-button class="float-right" variant="success" @click="updateInstructor">
                Yes
              </b-button>
            </b-col>
          </template>
      </b-modal>

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
            variant="danger"
            @click="cancelForm"
            v-b-tooltip.hover title="Cancel">
            <i class="fa fa-times-circle"></i>
          </b-button>

          <b-button
            class="float-right"
            v-if="!information_disable"
            variant="success"
            @click="onSubmit"
            v-b-tooltip.hover title="Update">
            <i class="fa fa-save"/>
          </b-button>



    </div>

    <hr/>
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.employee_id.$error}"
              label="Employee ID *"
              label-for="empID">
              <b-form-input
                type="text"
                id="empID"
                :disabled="information_disable"
                v-model.trim="$v.instructor.employee_id.$model"
                :class="{'is-invalid' :$v.instructor.employee_id.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.employee_id.required">Employee ID is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.first_name.$error}"
              label="First Name *"
              label-for="firstname">
              <b-form-input
                type="text"
                id="firstname"
                :disabled="information_disable"
                v-model.trim="$v.instructor.first_name.$model"
                :class="{'is-invalid' :$v.instructor.first_name.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.first_name.required">First Name is required!</span>
              </div>
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
              :class="{'text-danger' : $v.instructor.last_name.$error}"
              label="Last Name *"
              label-for="lastname">
              <b-form-input
                type="text"
                v-model="instructor.last_name"
                id="lastname"
                :disabled="information_disable"
                v-model.trim="$v.instructor.last_name.$model"
                :class="{'is-invalid' :$v.instructor.last_name.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.last_name.required">Last Name is required!</span>
              </div>
            </b-form-group>
          </b-col>

        </b-form-row>

        <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.birth_date.$error}"
              label="Birth Date *"
              label-for="birthDate">
              <datepicker
                id="birthDate"
                :clear-button="true"
                :calendar-button="true"
                :calendar-button-icon="calendarIcon"
                :bootstrap-styling="true"
                :format="birthDateFormat"
                :disabled="information_disable"
                v-model.trim="$v.instructor.birth_date.$model"
                :class="{'is-invalid' :$v.instructor.birth_date.$error}">
              </datepicker>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.birth_date.required">Birth Date is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.gender.$error}"
              label="Gender *"
              label-for="gender">
              <b-form-select
                :options="genderOptions"
                :disabled="information_disable"
                v-model.trim="$v.instructor.gender.$model"
                :class="{'is-invalid' :$v.instructor.gender.$error}">
              </b-form-select>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.gender.required">Gender is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.email.$error}"
              label="Email *"
              label-for="email">
              <b-form-input
                type="email"
                id="email"
                :disabled="information_disable"
                v-model.trim="$v.instructor.email.$model"
                :class="{'is-invalid' :$v.instructor.email.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.email.required">Email is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.contact_no.$error}"
              label="Contact No *"
              label-for="contact_no">
              <b-form-input
                type="text"
                id="contact_no"
                :disabled="information_disable"
                v-model.trim="$v.instructor.contact_no.$model"
                :class="{'is-invalid' :$v.instructor.contact_no.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.contact_no.required">Contact No is required!</span>
                <span v-if="!$v.instructor.contact_no.maxLength">Maximum of 11 digits!</span>
                <span v-if="!$v.instructor.contact_no.minLength">Minimum of 11 digits!</span>
              </div>

            </b-form-group>
          </b-col>

        </b-form-row>

        <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.address.$error}"
              label="Address *"
              label-for="address">
              <b-form-input
                type="text"
                id="address"
                :disabled="information_disable"
                v-model.trim="$v.instructor.address.$model"
                :class="{'is-invalid' :$v.instructor.address.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.address.required">Address is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.city.$error}"
              label="City / Municipality *"
              label-for="city">
              <b-form-input
                type="text"
                id="city"
                :disabled="information_disable"
                v-model.trim="$v.instructor.city.$model"
                :class="{'is-invalid' :$v.instructor.city.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.city.required">City / Municipality is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.province.$error}"
              label="Province *"
              label-for="province">
              <b-form-input
                type="text"
                id="province"
                :disabled="information_disable"
                v-model.trim="$v.instructor.province.$model"
                :class="{'is-invalid' :$v.instructor.province.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.province.required">Province is required!</span>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              :class="{'text-danger' : $v.instructor.postal_code.$error}"
              label="Postal Code *"
              label-for="postal_code">
              <b-form-input
                type="text"
                id="postal_code"
                :disabled="information_disable"
                v-model.trim="$v.instructor.postal_code.$model"
                :class="{'is-invalid' :$v.instructor.postal_code.$error}">
              </b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.postal_code.required">Postal Code is required!</span>
              </div>
            </b-form-group>
          </b-col>

        </b-form-row>

    <hr/>

    <div class=" h5 font-weight-bold text-dark">Educational Attainment</div>
    <hr/>

        <b-form-row>
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              :class="{'text-danger' : $v.instructor.educational_attainment.$error}"
              label="Educational Attainment *"
              label-for="educational_attainment">
              <b-form-textarea
                id="educational_attainment"
                v-model="instructor.educational_attainment"
                rows="3"
                max-rows="6"
                :disabled="information_disable"
                v-model.trim="$v.instructor.educational_attainment.$model"
                :class="{'is-invalid' :$v.instructor.educational_attainment.$error}">
              </b-form-textarea>
              <div class="invalid-feedback">
                <span v-if="!$v.instructor.educational_attainment.required">Educational Attainment is required!</span>
              </div>
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
      </b-form>

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
  import { required, minLength, maxLength, between } from 'vuelidate/lib/validators';
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

        Ins:[],

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

    validations: {
     instructor: {
       employee_id: {required},
       first_name: {required},
       last_name: {required},
       birth_date: {required},
       gender: {required},
       email: {required},
       contact_no: {required, minLength: minLength(11), maxLength: maxLength(11)},
       address: {required},
       city: {required},
       province: {required},
       postal_code: {required},
       educational_attainment: {required}
     },
    },

    mounted: function(){
      this.getInstructors();
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
      onSubmit() {
        this.$v.instructor.$touch();
        if (this.$v.instructor.$anyError) {
          return;
        }
        this.confirmUpdateModal()

      },
      getInstructors: function(){
        Axios
          .get('http://localhost/api/v1/instructors/' + this.instructor.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.Ins = response.data;
          })
      },

      updateInstructor: function(){
        this.errors = [];
        Axios
          .put('http://localhost/api/v1/instructors/' + this.instructor.id, this.instructor, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getInstructors();
            this.information_disable = true;
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
          this.$refs['confirmUpdate'].hide();
      },

      confirmUpdateModal: function(){
        this.$refs['confirmUpdate'].show();
      },

      cancelForm: function(){
        this.information_disable = true;
        this.instructor = {
          id: this.$route.params.id,
          name: this.Ins.last_name+ " " + this.Ins.first_name,
          employee_id: this.Ins.employee_id,
          first_name: this.Ins.first_name,
          middle_name: this.Ins.middle_name,
          last_name: this.Ins.last_name,
          birth_date: this.Ins.birth_date,
          gender: this.Ins.gender,
          email: this.Ins.email,
          contact_no: this.Ins.contact_no,
          address: this.Ins.address,
          city: this.Ins.city,
          province: this.Ins.province,
          postal_code: this.Ins.postal_code,
          work_experience: this.Ins.work_experience,
          certifications: this.Ins.certifications,
          educational_attainment: this.Ins.educational_attainment,
          active: 1
        }
      }
    }
  }
</script>
