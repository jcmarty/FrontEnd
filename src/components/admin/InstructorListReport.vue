<template>
  <div>
    <!-- page title -->
    <h1 class="d-print-none font-weight-bold text-dark">Instructors List Report</h1>
    <hr class="d-print-none"/>
    <div class="px-4">
    <!-- start of filters -->
    <b-row class="d-print-none">

      <!-- <b-col cols="12" md="6" lg="3">
        <b-form-group class="Academic text-dark"
                      label="Academic Year"
                      label-for="Academic">
          <b-form-select v-model="selectedAcademicYear" id="Academic">
            <option value="null" hidden>Select Academic Year</option>
            <option :value="{ id: ay.id, academic_year: ay.academic_year}" v-for="ay in this.$store.getters.getAcademicYears">{{ay.academic_year}}</option>
          </b-form-select>
        </b-form-group>
      </b-col> -->

      <!-- <b-col cols="12" md="6" lg="3">
        <b-form-group class="semester text-dark"
                      label="Semester"
                      label-for="Semester">
          <b-form-select v-model="selectedSemester" id="Semester">
            <option value="null" hidden>Select Semester</option>
            <option :value="{ id: sem.id, semester: sem.semester}" v-for="sem in this.$store.getters.getSemesters">{{sem.semester}}</option>
          </b-form-select>
        </b-form-group>
      </b-col> -->

      <!-- <b-col cols="12" md="6" lg="3">
        <b-form-group class="instructor text-dark"
                      label="Instructor"
                      label-for="Instructor">
          <b-form-select v-model="selectedInstructor" id="Instructor" @change="onChangeInstructor">
            <option value="null" hidden>Select Instructor</option>
            <option :value="ins" v-for="ins in instructorOptions">{{ins.first_name}} {{ins.last_name}}</option>
          </b-form-select>
        </b-form-group>
      </b-col> -->
      <!-- Semester  -->

      <!-- print button -->
      <b-col cols="12" md="6" lg="3">
        <!-- <b-button v-if="selectedInstructor" class="mt-4"  variant="info" onclick="window.print()"> -->
        <b-button class="mt-4"  variant="primary" onclick="window.print()">
          Print
        </b-button>
      </b-col>
      <!-- print button -->

    </b-row>
    <!-- end of filters -->

    <!-- start of instructor table -->
    <div class="d-print-none mt-4 mb-4 px-4 pt-4 bg-white shadow rounded">
      <b-overlay :show="isLoading" rounded="sm">
        <b-table
          class="d-print-block table-striped "
          show-empty
          responsive
          head-variant=""
          bordered
          hover
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">

        </b-table>
      </b-overlay>

      <hr/>
      <b-row>
        <b-col lg="1">
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

        <b-col lg="3">
          <b-form-group class="pt-2">
            <p>Showing 1 to {{this.perPage}} of {{this.items.length}} entries</p>
          </b-form-group>
        </b-col>

        <b-col offset-lg="4" lg="4" >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0 float-right"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
    <!-- end of instructor table -->

    <!-- for printing only -->
    <div id="to_print">
      <div class="content d-none d-print-block ">

        <!-- dark blue #002060 -->
        <!-- red #ff0000 -->

        <b-table
          id="print_table"
          class=" table-striped "
          show-empty
          bordered
          responsive
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">
        </b-table>
      </div>
      <!-- <div class="footer  d-none d-print-block text-center">This is the Footer</div> -->
    </div>

  </div>
  <!-- end of class container -->
  </div>
</template>

<script>
import Axios from "axios";
const baseUrl = "http://localhost/api/v1/";
export default {
  name: 'InstructorScheduleReport',
  data() {
    return {
      selectedAcademicYear: null,
      selectedSemester: null,

      // variables for table
      isLoading: false,
      items: [],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      filter: null,
      // end of variables for table

      selectedInstructor: null,
      instructorOptions: null,
    }
  },
  beforeMount() {

  },

  mounted () {
    // get current setting from db
    this.getSettings();

    // get current ay and semester based on saved setting
    this.$store.dispatch('loadAcademicYears', this.$store.getters.getToken);
    this.$store.dispatch('loadSemesters', this.$store.getters.getToken);

    this.selectedAcademicYear = this.$store.getters.getCurrentAcademicYear,
    this.selectedSemester = this.$store.getters.getCurrentSemester,

    // return page to the top
    this.backToTop();

    // get all instructors
    this.getInstructors();
    // this.getInstructorSchedule();
  },

  methods: {

    // this function runs when instructor select box changes and ..
    // get the schedule of selected instructor based on the selected ay and semester
    onChangeInstructor: function (){
      var params = {
        academic_year_id : this.selectedAcademicYear.id,
        semester_id : this.selectedSemester.id,
        instructor_id : this.selectedInstructor.id,
      };
      // console.log(params)

      this.isLoading = true;
      Axios
        .get('http://localhost/api/v1/class_schedules', {
          params : params,
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length
          this.isLoading = false;
          // console.log(response.data)
        })
    }, // end of function onChangeInstructor

    // get all instructor record
    getInstructors: function(){
    this.isLoading = true;
    Axios
      .get('http://localhost/api/v1/instructors', {
        headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
      })
      .then(response => {
        this.isLoading = false;
        this.instructorOptions = response.data;
      })
    }, // end of function getInstructors


    backToTop: function(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, // end of backToTop

    // get all settng from db
    getSettings: function(){
      Axios.get(baseUrl + "settings", {
        headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
      })
      .then(response => {
          this.$store.dispatch('setAppSettings', response.data);
          // console.log(response.data);
      });
    }, // end of function getSettings

    timeFormatter : function(time){

      var split = time.split(":");
      var hour = split[0];
      var min = split[1];

      var h = hour % 12 || 12;
      var ampm = (hour < 12 || hour == 24) ? "AM" : "PM";
      return h + ":" + min + ampm;
    },
  }
}
</script>

<style>
.reset{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media print {

  body {
    margin: 0 auto  ;
    padding: 0;
  }
  #to_print{
    position: absolute;
    font-family: "Bookman Old Style";
    color: black;
    left: 0;
    top: 0;
    margin: 0;
  }
  .header {
    margin: 0px 0px 10px 0px;
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
  }

  .header .logo {
    position: relative;
    width: 100%;
    height: auto ;
    margin: 0 auto;
  }
  .content p{
    /* margin-top: 30px; */
  }
  #print_table {
    margin-top : 20px;
    font-size: 14pt;
  }
  .footer {
    position: absolute;
    bottom: 0;
  }
}
</style>
