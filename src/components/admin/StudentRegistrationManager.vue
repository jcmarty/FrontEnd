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

    <div v-if="showForm">

      <!-- start of register students -->
      <!-- Tab Group with forms for registration of students -->
      <b-tabs v-model="tabIndex" >
        <b-tab title="Student Information">
        <!-- Start form Student information -->
          <b-form>
            <b-form-row>
              <h5>Student's Information</h5>
            </b-form-row>
              <hr>
            <b-form-row>
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
                  id="schoolLastAttended">
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
                    id="schoolAddress">
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
              <h5>Personal Information</h5>
            </b-form-row>
            <hr>
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
                    required>
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
                  required>
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
                  class="gender"
                  label="Gender"
                  label-for="Gender">
                  <b-form-select
                    v-model="Students.gender"
                    :options="genderOptions">
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
                    required>
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
                    required>
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
                    required>
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
                    required>
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
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>

              </b-form-row>

              <b-form-row>
                <b-col>
                  <b-button variant="danger" @click="tabIndex--">
                    Previous
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

        <b-tab title="Parents / Guardian Information" :disabled="lastTabsDisabled">
          <!-- Start of Parents Information Form -->

          <b-form>
            <b-form-row>
              <h5>Parents Information</h5>
            </b-form-row>
            <hr>
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

            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="contactaddress"
                label="Contact Address:"
                label-for="contactAddress">
                <b-form-input
                  type="text"
                  v-model="Students.contact_address"
                  id="contact_Address">
                </b-form-input>
              </b-form-group>
            </b-col>

              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="hishercontactnumber"
                  label="His/Her Contact Number:"
                  label-for="contactNumber">
                  <b-form-input
                    type="text"
                    v-model="Students.contact_number"
                    id="contact_Number">
                  </b-form-input>
                </b-form-group>
              </b-col>

            </b-form-row>

              <hr>

            <b-form-row>
              <h5>Guardian Information</h5>
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
                    id="guardianName">
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
                    id="contactAddress">
                  </b-form-input>
                </b-form-group>
              </b-col>

            <b-col cols="12" md="6" lg="4">
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
        </b-form-row>

            <b-form-row>
              <b-col>
                <b-button variant="primary" @click="tabIndex--">
                  Previous
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="primary" @click="RegStudents">
                  Register
                </b-button>
              </b-col>
            </b-form-row>
          </b-form>
        </b-tab>
      </b-tabs>
    </div>

    <div class="myTable px-4 py-3 my-5">
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
          <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
            Register new Student
          </b-button>
        </b-col>
      </b-row>

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
          <b-badge variant="success" pill v-if="row.item.active">Active</b-badge>
          <b-badge variant="danger"  pill v-else>Inactive</b-badge>

        </template>

        <template v-slot:cell(actions)="row">
          <b-button variant="info" size="sm"  @click="enroll(row.item, row.index, $event.target)" class="mr-1">
            <b-icon-people-fill/>
          </b-button>

          <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" class="mr-1">
            <b-icon-pencil/>
          </b-button>

          <!-- <b-button variant="danger" size="sm" @click="DeleteModal(row.item, $event.target)" v-b-tooltip.hover title="Delete Room">
            <b-icon-trash/>
          </b-button> -->
        </template>
      </b-table>

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
        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
        updateSuccessCountDown: 0,
        updateErrorCountDown: 0,
        studentsrowdata: null,



      }
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
        Axios
          .get('http://localhost/api/v1/students', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
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

      RegStudents: function(){
        Axios
          .post('http://localhost/api/v1/students', this.Students, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = "New student record successfully created.";
            this.getStudents();
            this.dismissSuccessCountDown = this.dismissSecs;
            this.showForm = false;
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
      },

      CancelRegister: function(){
        this.ClearStudentFields();
        this.secondTabDisabled = true;
        this.lastTabsDisabled = true;
        this.showForm = false;
      },

      toggleForm: function(){
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },

      enroll: function(item){
        this.Students = {
          id: item.id,
          student_number: item.id,
          first_name: item.id,
          middle_name: item.id,
          last_name: item.id,
          suffix_name: item.id,
          gender: item.id,
          civil_status: item.id,
          citizenship:item.id,
          address: item.id,
          barangay: item.id,
          city: item.id,
          postal: item.id,
          province: item.id,
          telephone: item.id,
          cellphone: item.id,
          email: item.id,
          birth_date: item.id,
          birth_place: item.id,
          father_name: item.id,
          mother_name: item.id,
          contact_person: item.id,
          contact_address: item.id,
          contact_number: item.id,
          blood_type: item.id,
          photo_url: item.id,
          user_id: item.id,
          school_last_attended: item.id,
          school_address: item.id,
          college_last_attended: item.id,
          college_address: item.id,
          active: 1,
        },

        this.$router.replace({
          name: 'StudentEnrollmentManager',
          params: {
            id: item.id,
            student_number: item.student_number,
            first_name: item.first_name,
            middle_name: item.middle_name,
            suffix_name: item.suffix_name,
            last_name: item.last_name
          }
        })
      },

      EditModal: function(item, index) {
        this.Students = {
          id: item.id,
          student_number: item.id,
          first_name: item.id,
          middle_name: item.id,
          last_name: item.id,
          suffix_name: item.id,
          gender: item.id,
          civil_status: item.id,
          citizenship:item.id,
          address: item.id,
          barangay: item.id,
          city: item.id,
          postal: item.id,
          province: item.id,
          telephone: item.id,
          cellphone: item.id,
          email: item.id,
          birth_date: item.id,
          birth_place: item.id,
          father_name: item.id,
          mother_name: item.id,
          contact_person: item.id,
          contact_address: item.id,
          contact_number: item.id,
          blood_type: item.id,
          photo_url: item.id,
          user_id: item.id,
          school_last_attended: item.id,
          school_address: item.id,
          college_last_attended: item.id,
          college_address: item.id,
          active: 1,
        },

        this.$root.$emit('bv::show::modal', 'EditStudentModal')
      },

    },
  }
</script>
