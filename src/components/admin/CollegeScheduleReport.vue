<template>
  <div>
    <h1 class="d-print-none">College Schedule Report</h1>
    <hr class="d-print-none"/>

    <div class="myTable px-4 py-3 my-5">
      <!-- Adding Form Start  -->

    <div class="d-print-none">

      <b-form-row>
        <b-col cols="12" md="6" lg="4">
          <b-form-group
          class="filter"
          label="Filter"
          label-for="Filter">
            <b-input-group>
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search">
              </b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
      <b-col cols="12" md="6" lg="2">
        <b-form-group class="academicyear" label="Academic Year" label-for="academicYear">
          <b-form-select id="academicYear" v-model="selectedAcademicYear" @change="">
            <option value="null" hidden>Select Academic Year</option>
            <option v-for="ay in AyRow" v-bind:value="{id: ay.id, academic_year:ay.academic_year}">{{ay.academic_year}}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="2">
        <b-form-group class="semester" label="Semester" label-for="Semester">
          <b-form-select id="Semester" v-model="selectedSemester" @change="changeSemester">
            <option value="null" hidden>Select Semester</option>
            <option v-for="sem in SemRow" v-bind:value="{id: sem.id, semester: sem.semester}">{{sem.semester}}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="2">
        <b-form-group class="course" label="Course" label-for="Course">
          <b-form-select id="Course" v-model="selectedCourse" @change="getCurriculum()" :options="course_options">
            <option value="null" hidden>Select Course</option>
            <!-- <option v-for="course in CourseRow"
              v-bind:value="{id:course.id , year:course.year_duration}">{{course.course_code}}</option> -->
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="2">
        <b-form-group class="curriculum" label="Curriculum" label-for="Curriculum">
          <b-form-select id="Curriculum" v-model="selectedCurriculum" @change="changeCurr">
            <option value="null" hidden>Select Curriculum</option>
            <option v-if="Curriculumrow === null" value="null" disabled>No Curriculums</option>
            <option v-else v-for="curriculum in Curriculumrow " v-bind:value="{id: curriculum.id, subjects: curriculum.curriculum_subjects}">{{curriculum.curriculum_title}}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="2">
        <b-form-group class="yearlevel" label="Year Level" label-for="yearLevel">
          <b-form-select id="yearLevel" v-model="selectedYearLevel" :options="year_options">
            <option value="null" hidden>Select Year Level</option>
            <option v-if="selectedCurriculum === null" value="null" disabled>No year levels</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="2">
        <b-form-group class="block" label="Block" label-for="Block">
          <b-form-select id="block" @change="getFilteredClassSchedule" v-bind:value="blockData" v-model="selectedBlock">
            <option value="null" hidden>Block</option>
            <option value="1" >1</option>
            <option value="2" >2</option>
            <option value="3" >3</option>
            <option value="4" >4</option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row class="d-print-none">
      <b-col cols="12" md="6" lg="2">
        <b-button  variant="primary" onclick="window.print()" >
            Print
        </b-button>
      </b-col>
    </b-form-row>
    </div>

      <b-form-row class="d-none d-print-block">

          <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="responsive" id="comteqlogo"/>
          <h4>Comteq Computer & Business College
            1200 4th Floor Savers Appliance Depot
            Rizal Ave. East Tapinac, Olongapo City, Zambales</h4><br/>

                  <div class="clearfix"></div>
      </b-form-row>

      <b-form-row class="d-none d-print-block">
        <center><h4>SY ({{current_ay.academic_year}})</h4></center>
        <center><h5> {{ current_sem }}</h5></center>
        <center><h5>{{selectedCourse.course_code}} {{selectedYearLevel}} {{selectedBlock}} </h5></center>
      </b-form-row>
      <!-- Main table element -->
      <b-form-row
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
      </b-table>


      <hr class="d-print-none"/>
      <b-row class="d-print-none">
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
  export default{
    name: 'CoursesManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'day', label: 'Day', class: 'text-center', sortable: true},
          { key: 'time_start', label: 'Time Start', sortable: true, class: 'text-center' },
          { key: 'time_end', label: 'Time End', sortable: true, class: 'text-center' },
          { key: 'subject_code', label: 'Subject Code', sortable: true, class: 'text-center' },
          { key: 'subject.subject.subject_description', label: 'Description', sortable: true, class: 'text-center' },
          { key: 'room.room_number', label: 'Room', sortable: true, class: 'text-center' },
          { key: 'instructor.last_name', label: 'Instructor', sortable: true, class: 'text-center' },
          { key: 'block', label: 'Block', sortable: true, class: 'text-center' },
          { key: 'batch', label: 'Batch', sortable: true, class: 'text-center' },
        ],


        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,

        selectedAcademicYear:null,
        selectedSemester:null,
        selectedCourse: null,
        selectedCurriculum: null,
        selectedSubject: null,
        selectedYearLevel: null,
        selectedBlock: null,
        Curriculumrow: null,
        blockData: null,



        current_ay: [],
        current_sem: [],

        academic_options: [],
        year_options: [],
        course_options: [],

        AyRow: null,
        SemRow: null,

      }
    }, // End of Data



    beforeMount() {
      // this.getClassSchedule();
      this.getCurrentSetting();
      },

      mounted () {
        this.getAcademicYear();
        this.getSemester();
        this.getCourse();
      },


    methods:{

      // gets all created schedule
      getFilteredClassSchedule: function(){
        Axios
          .get('http://localhost/api/v1/class_schedules', {
            params: {
              academic_year_id: this.selectedAcademicYear.id,
              semester_id: this.selectedSemester.id,
              course_id: this.selectedCourse.id,
              year_level: this.selectedYearLevel,
              block : this.selectedBlock,
              active: 1,
            },
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            // console.log(response.data);
            this.items = response.data;
            this.totalRows = this.items.length;
          })
      },

      // gets all academic year record
      getAcademicYear: function(){
        Axios
          .get('http://localhost/api/v1/academic_years', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.AyRow = response.data;
          })
          .catch(function (error) {
            console.log(error.response.status); console.log(error);
          })
      },

      // Gets all semester record
      getSemester: function(){
        Axios
          .get('http://localhost/api/v1/semesters', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.SemRow = response.data;
          })
          .catch(function (error) {
            console.log(error.response.status); console.log(error);
          })
      },

      // Gets all course records
      getCourse: function(){
        Axios
          .get('http://localhost/api/v1/courses', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            if( response.data.length == 0){
              this.CourseRow = null;
            }else{
              for (var i = 0; i < response.data.length; i++) {
                // var course = respone.data[i]
                if (response.data[i].active == 1) {
                  this.course_options.push(
                    {
                      value: {
                        id: response.data[i].id,
                        year: response.data[i].year_duration,
                        course_code: response.data[i].course_code,
                        curriculum: response.data[i].curriculum
                      },
                      text: response.data[i].course_code
                    },
                  );
                }
                // console.log(response.data[i].course_code);


              }
            }
          })
          .catch(function (error) {
            console.log(error.response.status); console.log(error);
          }) // end of get all courses
      },

      // SET YEAR LEVEL BASED ON SELECTED COURSE
      changeCurr: function(){
        if(this.selectedCourse.year == "4"){
          this.year_options = [
            { value: '1st Year', text: '1st Year' },
            { value: '2nd Year', text: '2nd Year' },
            { value: '3rd Year', text: '3rd Year' },
            { value: '4th Year', text: '4th Year' },
          ];
        }
       else if(this.selectedCourse.year == "2"){
         this.year_options = [

           { value: '1st Year', text: '1st Year' },
           { value: '2nd Year', text: '2nd Year' },
         ];
       }
       this.SubjectsRow = [];
       this.time_start_options = []
       this.instructorRow = null;
       this.roomRow = null;
       this.day_options = [];

       this.selectedYearLevel = null;
       this.selectedSubject = null;
       this.selectedBlock = null;
       this.selectedBatch = null;
       this.selectedInstructor = null;
       this.selectedRoom = null;
       this.selectedDay = null;
       this.selectedTimeStart = null;
      },

      // gets all curriculum record
      getCurriculum: function(){
        var curriculums = this.selectedCourse.curriculum
            if( curriculums.length == 0){
              this.Curriculumrow = null;
            }else{
              this.Curriculumrow = curriculums;
            }
            // clears select boxes
            this.day_options = [];
            this.year_options = [];
            this.SubjectsRow = [];
            this.time_start_options = []
            this.instructorRow = null;
            this.roomRow = null;

            // clear select box selected values
            this.selectedCurriculum = null;
            this.selectedYearLevel = null;
            this.selectedSubject = null;
            this.selectedBlock = null;
            this.selectedBatch = null;
            this.selectedInstructor = null;
            this.selectedRoom = null;
            this.selectedDay = null;
            this.selectedTimeStart = null;
          // });
      },

      // clears selected values when semester select box has changed
      changeSemester: function(){
        // clears select boxes
        this.day_options = [];
        this.time_start_options = []
        this.SubjectsRow = [];
        this.instructorRow = null;
        this.roomRow = null;

        // clear select box selected values
        // this.selectedCurriculum = null;
        this.selectedYearLevel = null;
        this.selectedSubject = null;
        this.selectedBlock = null;
        this.selectedBatch = null;
        this.selectedInstructor = null;
        this.selectedRoom = null;
        this.selectedDay = null;
        this.selectedTimeStart = null;
      },



      // get current academic year and
      getCurrentSetting: function(){
        Axios
          .get('http://localhost/api/v1/settings', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            Axios
              .get('http://localhost/api/v1/academic_years/' + response.data.current_ay, {
                headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
              })
              .then(current_ay => {
                this.selectedAcademicYear = current_ay.data.id;
                this.current_ay =
                  { id: current_ay.data.id,
                    academic_year: current_ay.data.academic_year
                  }
                Axios
                  .get('http://localhost/api/v1/semesters/' + response.data.current_sem, {
                    headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                  })
                  .then(current_sem => {
                    this.selectedSemester = current_sem.data.id
                    this.current_sem = current_sem.data.semester
                  })
                  .catch(function (error) {
                      console.log(error.response.status); console.log(error);
                  }) // end of get current sem
              })
              .catch(function (error) {
                  console.log(error.response.status); console.log(error);
              }) // end of get current ay
          })
          .catch(function (error) {
              console.log(error.response.status); console.log(error);
          }) // end of get settings
      },
    } // End of Methods
  } // End of Export Default
</script>

<style media="screen">
  #comteqlogo{
    width: 300px;
    height: 120px;
  }
</style>
