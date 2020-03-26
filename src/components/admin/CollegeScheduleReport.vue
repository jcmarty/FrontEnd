<template> <!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1 class="d-print-none">Class Schedule Report</h1>
    <hr class="d-print-none"/>


    <div class="myTable px-4 py-3 my-5">
      <!-- Adding Form Start  -->
      <b-form-row class="d-print-none">
        <b-col  cols="12" md="6" lg="4">
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
      </b-form-row>

      <b-form-row class="d-print-none">
        <b-col  cols="12" md="6" lg="2">
          <b-form-group class="academicyear" label="Academic Year" label-for="academicYear">
            <b-form-select id="academicYear" v-model="selectedAcademicYear" @change="">
              <option value="null" hidden>Select Academic Year</option>
              <option  :value="{id: ay.id, academic_year: ay.academic_year}" v-for="ay in academicYearOptions" >{{ay.academic_year}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col  cols="12" md="6" lg="2">
          <b-form-group class="semester" label="Semester" label-for="Semester">
            <b-form-select id="Semester" v-model="selectedSemester" @change="changeSemester">
              <option value="null" hidden>Select Semester</option>
              <option  :value="{id:sem.id, semester: sem.semester}" v-for="sem in semesterOptions" >{{sem.semester}}</option>
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
              <option v-else v-for="curriculum in Curriculumrow " v-bind:value="{id: curriculum.id, subjects: curriculum.curriculum_subjects, curriculum_title:curriculum.curriculum_title}">{{curriculum.curriculum_title}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <b-form-group class="yearlevel" label="Year Level" label-for="yearLevel">
            <b-form-select id="yearLevel" v-model="selectedYearLevel" @change="getSubject()" :options="year_options">
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
        <b-col class="py-4">
          <!-- Add New Room Button -->
          <b-button variant="primary" onclick="window.print()">
            Print
          </b-button>
        </b-col>
      </b-form-row>

      <center>
        <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="responsive d-none d-print-block" id="ComteqLogoPrint"/>
      </center>

      <b-form-row class="d-none d-print-block">
          <center>
            <h4>COMTEQ Computer & Business College</h4>
            <h5>1200 4th floor Savers Appliance Depot, Rizal Ave, East Tapinac Olongapo City Zambales. </h5>
        </center>
      </b-form-row>

      <b-form-row class="d-none d-print-block">
          <center>
            <h5>SY ({{selectedAcademicYear.academic_year}})</h5>
            <h5>{{selectedSemester.semester}}</h5>
            <h5 v-if="selectedCourse === null">" "</h5>
            <h5 v-else>{{selectedCourse.course_code}}</h5>
            <h5 v-if="selectedCurriculum === null">" "</h5>
            <h5 v-else>{{selectedCurriculum.curriculum_title}} {{selectedYearLevel}}</h5>
        </center>
      </b-form-row>


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

  </div> <!-- End of Main Div -->
</template>

<script>
  import Axios from "axios";
  export default{
    name: 'CollegeScheduleReport',
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

        CollegeClassSchedRow: null,
        AyRow: null,
        SemRow: null,
        CourseRow: null,
        Curriculumrow: null,
        SubjectsRow: null,
        blockData: null,
        batchData: null,

        current_ay: [],
        current_sem: [],

        selectedAcademicYear: this.$store.getters.getSettings.current_ay,
        selectedSemester: this.$store.getters.getSettings.current_sem,
        selectedCourse: null,
        selectedCurriculum: null,
        selectedSubject: null,
        selectedYearLevel: null,
        selectedBlock: null,

        academicYearOptions: this.$store.getters.getAcademicYears,
        semesterOptions: this.$store.getters.getSemesters,
        year_options: [],
        course_options: this.$store.getters.getCourses,

        ClassSched:{
          day: null,
          time_start: null,
          time_end: null,
          subject_code: null,
          subject_desc: null,
          room_number: null,
          instructor: null,
          block: null,
          batch: null,
          academic_year: null,
          semester: null,

        },


      }
    }, // End of Data



    mounted () {
      this.getFilteredClassSchedule();


    }, // End of Mounted

    methods:{

      // gets all created schedule
      getFilteredClassSchedule: function(){
        Axios
          .get('http://localhost/api/v1/class_schedules', {
            params: {
              academic_year_id: this.selectedAcademicYear,
              semester_id: this.selectedSemester,
              course_id: this.selectedCourse.id,
              year_level: this.selectedYearLevel,
              block : this.selectedBlock,
              active: 1,
            },
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {

            this.items = response.data;
            this.totalRows = this.items.length;
          })
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

      // SET YEAR LEVEL BASED ON SELECTED COURSE
      changeCurr: function(){
        console.log(this.selectedCurriculum);
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

      // gets all subjects base on selected semester, curriculum and year level
      getSubject: function(){
        // clears subject select box
        this.SubjectsRow = [];
        var year = this.selectedYearLevel
        var sem = this.selectedSemester
        var subjects = this.selectedCurriculum.subjects

        if(subjects.length == 0){
          this.SubjectsRow = [];
        }else{
          for(var i = 0; i < subjects.length; i++){
            if(subjects[i].year_level == year && subjects[i].semester_id == sem){
                this.SubjectsRow.push(subjects[i])
            }
          }
        }

            this.instructorRow = null;
            this.roomRow = null;
            this.day_options = [];
            this.time_start_options = []

            this.selectedSubject = null;
            this.selectedBlock = null;
            this.selectedBatch = null;
            this.selectedInstructor = null;
            this.selectedRoom = null;
            this.selectedDay = null;
            this.selectedTimeStart = null;
      },


    } // End of Methods
  } // End of Export Default
</script>

<style>
  #ComteqLogoPrint{
    width: 250px;
    height: 125px;
  }
</style>
