<template>
<div>
  <div id="pageHeader">
    <h1 class="font-weight-bold text-dark">Class Schedule Manager</h1>
  </div>
  <hr />


  <b-alert variant="success" :show="dismissSuccessCountDown" @dismissed="dismissSuccessCountDown=0" dismissible fade>
    {{alertMessage}}
  </b-alert>
  <b-alert variant="warning" :show="dismissWarningCountDown" @dismissed="dismissWarningCountDown=0" dismissible fade>
    <p>{{alertMessage}}</p>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </b-alert>

  <b-alert variant="danger" :show="dismissErrorCountDown" @dismissed="dismissErrorCountDown=0" dismissible fade>
    <p>{{alertMessage}}</p>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </b-alert>

  <!-- <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
    <div class="panel-heading">Add a Class Schedule</div>
    <div class="panel-body"> -->

    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-3 pb-3 bg-white shadow rounded">
      <div class="" >
        <b-form-row>
        <b-col class="mt-2  h5 font-weight-bold text-dark"  cols="12" md="6" lg="3">
          Add New Schedule
        </b-col>

        <b-col class=""  cols="12" md="6" lg="2">
          <b-form-group class="academicyear" label="" label-for="academicYear">
            <b-form-select id="academicYear" v-model="selectedAcademicYear" @change="">
              <option value="null" hidden>Select Academic Year</option>
              <option  :value="ay.id" v-for="ay in academicYearOptions" >{{ay.academic_year}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col class="" cols="12" md="6" lg="2">
          <b-form-group class="semester" label="" label-for="Semester">
            <b-form-select id="Semester" v-model="selectedSemester" @change="">
              <option value="null" hidden>Select Semester</option>
              <option  :value="sem.id" v-for="sem in semesterOptions" >{{sem.semester}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      </div>
      <hr class="mt-1"/>
      <b-form id="">
        <b-form-row>
          <b-col cols="12" md="6" lg="2">
            <b-form-group class="course" label="Course" label-for="Course">
              <b-form-select id="Course" v-model="selectedCourse" @change="onChangeCourse">
                <option value="null" hidden>Select Course</option>
                <option v-for="course in CourseRow"
                  v-bind:value="{id:course.id, course_code:course.course_code, year:course.year_duration, curriculum: course.curriculum}">{{course.course_code}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group class="curriculum" label="Curriculum" label-for="Curriculum">
              <b-form-select id="Curriculum" v-model="selectedCurriculum" @change="onChangeCurriculum">
                <option value="null" hidden>Select Curriculum</option>
                <option v-if="Curriculumrow === null" value="null" disabled>No Curriculums</option>
                <option v-else v-for="curriculum in Curriculumrow " v-bind:value="{id: curriculum.id, subjects: curriculum.curriculum_subjects}">{{curriculum.curriculum_title}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group class="yearlevel" label="Year Level" label-for="yearLevel">
              <b-form-select id="yearLevel" v-model="selectedYearLevel" @change="onChangeYearLevel">
                <option value="null" hidden>Select Year Level</option>
                <option v-if="selectedCurriculum === null" value="null" disabled>No year levels</option>
                <option v-else v-for="data in YearLevelRow" v-bind:value="data.value">{{data.value}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="4">
            <b-form-group class="subject" label="Subject" label-for="Subject">
              <b-form-select id="Subject" @change="onChangeSubject" v-model="selectedSubject">
                <option value="null" hidden>Select Subject</option>
                <option v-if="SubjectsRow === null" value="null" disabled>No Subjects</option>
                <option v-else v-for="data in SubjectsRow" v-bind:value="{id: data.id, subject_code: data.subject.subject_code ,subject_id: data.subject_id, instructors: data.subject.instructors, lab:  data.subject.lab}">
                  {{data.subject.subject_code}} - {{data.subject.subject_title}}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="1">
            <b-form-group class="block" label="Block" label-for="Block">
              <b-form-input type="text" list="blockList" id="block" @change="" v-bind:value="blockData" v-model="selectedBlock" :disabled="blockStatus">
              </b-form-input>
              <datalist id="blockList">
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
              </datalist>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="1">
            <b-form-group class="batch" label="Batch" label-for="Batch">
              <b-form-input type="text" list="batchList" id="batch" @change="" v-bind:value="batchData" v-model="selectedBatch" :disabled="batchStatus">
              </b-form-input>
              <datalist id="batchList">
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
              </datalist>
            </b-form-group>
          </b-col>

        </b-form-row>

        <b-form-row>
          <b-col cols="12" md="4" lg="2">
            <b-form-group class="instructor" label="Instructor" label-for="Instructor">
              <b-form-select id="Instructor" @change="" v-model="selectedInstructor">
                <option value="null" hidden>Select Instructor</option>
                <option v-if="instructorRow === null" value="null" disabled>No Instructors</option>
                <option v-else v-for="data in instructorRow" v-bind:value="data.instructor_id">{{data.instructor.first_name}} {{data.instructor.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="4" lg="2">
            <b-form-group class="room" label="Room" label-for="Room">
              <b-form-select id="Room" @change="" v-model="selectedRoom">
                <option value="null" hidden>Select Room</option>
                <option v-if="roomRow === null" value="null" disabled>No Rooms</option>
                <option v-else v-for="room in roomRow" v-bind:value="room.id">{{room.room_number}} - {{room.room_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="4" lg="2">
            <b-form-group class="day" label="Day" label-for="Day">
              <b-form-select id="Day" @change="" v-model="selectedDay" :options="day_options">
                <option value="null" hidden>Select Day</option>
                <option v-if="selectedRoom == null" value="null" disabled>No Days</option>
                <option v-if="day_options == []" value="null" disabled>No Days</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="4" lg="2">
            <b-form-group class="time_start" label="Time Start" label-for="time_start">
              <b-form-select id="time_start" @change="" v-model="selectedTimeStart" :options="available_time_start">
                <option value="null" hidden>Select Time Start</option>
                <option v-if="selectedDay == null" value="null" disabled>No Time Start</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="4" lg="2">
            <b-form-group class="time_end" label="Time End" label-for="time_end">
              <b-form-select id="time_end" @change="" v-model="selectedTimeEnd" :options="available_time_end">
                <option value="null" hidden>Select Time End</option>
                <option v-if="selectedTimeStart == null" value="null" disabled>No Time End</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col class="">
            <b-button class="mt-4" @click="" variant="primary" block :disabled="disableAddBtn" id="Add_Semester_Btn">
              Add
            </b-button>
          </b-col>
        </b-form-row>

      </b-form>
    </div>

      <!-- SCHEDULES TABLE -->
      <div class="scheduleTable  px-3 pt-2 my-2 ml-2" >
        <!-- Main table element -->
        <div class="" >
          <b-table
            class="my-3 table-striped"
            show-empty
            bordered
            hover
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter">
          </b-table>
        </div>

        <hr/>
        <b-row>
          <b-col sm="4" md="6" lg="1" class="my-1">
            <b-form-group
            class="perpageselect"
            label="Limit:"
            label-for="perPageSelect">
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col sm="4" md="3" class=" col-md-3 offset-md-8">
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
  </div>
</template>

<script>
    import Axios from "axios";
    const baseUrl = "http://localhost/api/v1/";
      export default {
            name: 'CollegeClassSchedule',
            data() {
                return {
                  CollegeClassSchedRow: null,
                  AyRow: null,
                  SemRow: null,
                  CourseRow: null,
                  Curriculumrow: null,
                  SubjectsRow: null,
                  YearLevelRow: null,
                  instructorRow: null,
                  roomRow: null,
                  roomContainer: null,
                  blockData: null,
                  batchData: null,

                  showForm: false,
                  disableAddBtn : true,
                  alertMessage: "",
                  errors: [],
                  dismissSecs: 7,
                  dismissSuccessCountDown: 0,
                  dismissWarningCountDown: 0,
                  dismissErrorCountDown: 0,

                  current_ay: [],
                  current_sem: [],
                  available_time_start : [],
                  filter_available_time_start : [],
                  available_time_end : [],
                  availabilities : [],
                  time_conflicts: [],

                  selectedAcademicYear: this.$store.getters.getCurrentAcademicYear.id,
                  selectedSemester: this.$store.getters.getCurrentSemester.id,
                  selectedCourse: null,
                  selectedCurriculum: null,
                  selectedSubject: null,
                  selectedYearLevel: null,
                  selectedInstructor: null,
                  selectedBlock: null,
                  selectedBatch: null,
                  selectedRoom: null,
                  selectedDay: null,
                  selectedTimeStart: null,
                  selectedTimeEnd : null,

                  // form options
                  academicYearOptions: this.$store.getters.getAcademicYears,
                  semesterOptions: this.$store.getters.getSemesters,
                  year_options: [],
                  // course_options: this.$store.getters.getCourses,
                  day_options: [],
                  time_start_options: [],
                  time_end_options: [],
                  notUsedTime: [],
                  conflicts: [],

                  blockStatus: true,
                  batchStatus: true,

                  dataFilter: null,


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

                  items: [],
                  fields: [
                    { key: 'day', label: 'Day', class: 'text-center', sortable: true},
                    { key: 'time', label: 'Time', sortable: true, class: 'text-center',
                      formatter: (value, key, item) => {
                        var start = item.time_start != null || "" ? this.timeFormatter(item.time_start) + " - " : "-- : ";
                        var end = item.time_end != null || "" ? this.timeFormatter(item.time_end) : "--";
                        return  start + end;
                      // return item.time_start  + "-" + item.time_end;
                      }
                    },
                    // { key: 'time_end', label: 'Time End', sortable: true, class: 'text-center' },
                    { key: 'subject_code', label: 'Subject Code', sortable: true, class: 'text-center' },
                    { key: 'subject.subject.subject_title', label: 'Description', sortable: true, class: 'text-center' },
                    { key: 'room.room_number', label: 'Room', sortable: true, class: 'text-center' },
                    { key: 'instructor', label: 'Instructor', sortable: true, class: 'text-center',
                      formatter: (value, key, item) => {
                        var first_name = item.instructor != null || "" ? item.instructor.first_name + " " : "";
                        var last_name = item.instructor != null || "" ? item.instructor.last_name + " " : "";
                        return first_name + last_name;
                      // return item.time_start  + "-" + item.time_end;
                      }
                    },

                  ],

                  totalRows: 1,
                  currentPage: 1,
                  perPage: 5,
                  pageOptions: [5, 10, 15, 20, 25],
                  filter: null,


                  // full_name: this.instructor.first_name + " " + this.instructor.last_name,
                }
            },

              beforeMount() {
              // this.getClassSchedule();
            }, // end of before mount

              mounted () {
                this.onPageLoad();
                this.getCourses();

              }, // end of mounted

              methods: {

                onChangeSubject: function(){
                  var instructors = this.selectedSubject.instructors;
                  var ay = this.selectedAcademicYear
                  var sem = this.selectedSemester

                  if(instructors.length == 0){
                    this.instructorRow = [];
                  }else{
                    var x = [];
                    instructors.forEach((item, i) => {
                      if (item.academic_year_id == ay && item.semester_id == sem) {
                        x.push(item);
                      }
                    });
                    this.instructorRow = x;
                  }
                  // console.log(instructors)

                  var lab = this.selectedSubject.lab
                  // check if subject has laboratory
                  if(lab > 0){
                    this.blockStatus = false;
                    this.batchStatus = false;
                    this.selectedBlock = 1;
                    this.selectedBatch = 1;
                  } else{
                    this.blockStatus = false;
                    this.batchStatus = true;
                    this.selectedBlock = 1;
                    this.selectedBatch = 0;
                  }
                }, // end of onChangeSubject

                onChangeYearLevel: function(){
                  this.selectedSubject = null;
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
                  // console.log(this.selectedCurriculum.subjects)
                }, // end of function onChangeYearLevel

                onChangeCurriculum : function(){
                  this.selectedYearLevel = null;
                  this.selectedSubject = null;
                  this.SubjectsRow = [];

                  //set year level selection base on the year duration of selected course
                  if (this.selectedCourse.year == 4) {
                    this.YearLevelRow = [
                      { value: '1st Year', text: '1st Year' },
                      { value: '2nd Year', text: '2nd Year' },
                      { value: '3rd Year', text: '3rd Year' },
                      { value: '4th Year', text: '4th Year' },
                    ];
                  }else if(this.selectedCourse.year == 2){
                    this.YearLevelRow = [
                      { value: '1st Year', text: '1st Year' },
                      { value: '2nd Year', text: '2nd Year' }
                    ];
                  }
                }, // end of function onChangeCurriculum


                onChangeCourse: function(){
                  this.selectedCurriculum = null;
                  this.selectedYearLevel = null;
                  this.selectedSubject = null;
                  this.SubjectsRow = [];
                  // pass curriculums of the selected course
                  this.Curriculumrow = this.selectedCourse.curriculum
                }, // end of function onChangeCourse


                // this function will run after the page loaded
                onPageLoad: function(){
                  // check if ay and sem is set, if not get current settings
                  if(this.selectedAcademicYear == null || this.selectedSemester == null){
                    this.selectedAcademicYear = this.$store.getters.getCurrentAcademicYear.id;
                    this.selectedSemester = this.$store.getters.getCurrentSemester.id;
                  }else{
                    var params = {
                      academic_year_id: this.selectedAcademicYear,
                      semester_id: this.selectedSemester,
                      active: 1,
                    }
                    this.getClassSchedule(params)
                  }
                }, // end of function onPageLoad

                // this will get all class schedules
                getClassSchedule : function(params){
                  if (params != null) {
                    // get class_schedules with params
                    Axios
                      .get(baseUrl+ 'class_schedules', {
                        params: params,
                        headers: {
                          'Authorization': 'Bearer ' + this.$store.getters.getToken
                        }
                      })
                      .then(response => {
                        this.items = response.data;
                        // console.log(this.items)
                        this.backToTop();
                      })
                      .catch(error => {
                        this.alertMessage = error.response.data.message;
                        this.dismissErrorCountDown = this.dismissSecs;
                        this.backToTop();
                      })
                  }else{
                    // get all class_schedules
                    Axios
                      .get(baseUrl+ 'class_schedules', {
                        headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                      })
                      .then(response => {
                        this.items = response.data;
                        this.backToTop();
                      })
                      .catch(error => {
                        this.alertMessage = error.response.data.message;
                        this.dismissErrorCountDown = this.dismissSecs;
                        this.backToTop();
                      })
                  }
                }, // end of function getClassSchedule

                // Get course Function
                getCourses: function(){
                  Axios
                    .get(baseUrl+ 'courses', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      this.CourseRow = response.data;
                      this.backToTop();
                    })
                    .catch(error => {
                      this.alertMessage = error.response.data.message;
                      this.dismissErrorCountDown = this.dismissSecs;
                      this.backToTop();
                    })
                }, // End of Get Course function

                // this will make the page scroll to the top
                backToTop: function(){
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }, // end of function backToTop

                // this function will convert 24HR to 12HR format
                timeFormatter : function(time){

                  var split = time.split(":");
                  var hour = split[0];
                  var min = split[1];

                  var h = hour % 12 || 12;
                  var ampm = (hour < 12 || hour == 24) ? "AM" : "PM";
                  return h + ":" + min + ampm;
                }, // end of function timeFormatter
              } // end of methods
            }
    </script>

  </div>
</template>
