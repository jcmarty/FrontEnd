<template>
  <div>

  <h1>College Class Schedule</h1><hr/>

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

    <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
      <div class="panel-heading">Add a Class Schedule</div>
      <div class="panel-body">
        <b-form id="Add_ClassSchedule_Form">

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="academicyear"
              label="Academic Year"
              label-for="academicYear">
              <b-form-select
                id="academicYear"
                v-model="selectedAcademicYear"
                @change="">
                <option value="null" hidden>Select Academic Year</option>
                <option v-for="ay in AyRow"
                v-bind:value="ay.id">{{ay.academic_year}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="semester"
              label="Semester"
              label-for="Semester">
              <b-form-select
                id="Semester"
                v-model="selectedSemester"
                @change="changeSemester">
                <option value="null" hidden>Select Semester</option>
                <option v-for="sem in SemRow"
                v-bind:value="sem.id">{{sem.semester}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="course"
              label="Course"
              label-for="Course">
              <b-form-select
                id="Course"
                v-model="selectedCourse"
                @change="getCurriculum()" :options="course_options">
                <option value="null" hidden>Select Course</option>
                <!-- <option v-for="course in CourseRow"
                v-bind:value="{id:course.id , year:course.year_duration}">{{course.course_code}}</option> -->
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="curriculum"
              label="Curriculum"
              label-for="Curriculum">
              <b-form-select
                id="Curriculum"
                v-model="selectedCurriculum"
                @change="changeCurr">
                <option value="null" hidden>Select Curriculum</option>
                <option v-if="Curriculumrow === null" value="null" disabled>No Curriculums</option>
                <option v-else v-for="curriculum in Curriculumrow "
                v-bind:value="{id: curriculum.id, subjects: curriculum.curriculum_subjects}">{{curriculum.curriculum_title}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="yearlevel"
              label="Year Level"
              label-for="yearLevel">
              <b-form-select
                  id="yearLevel"
                  v-model="selectedYearLevel"
                  @change="getSubject()" :options="year_options">
                  <option value="null" hidden>Select Year Level</option>
                  <option v-if="selectedCurriculum === null" value="null" disabled>No year levels</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="subject"
              label="Subject"
              label-for="Subject">
              <b-form-select
                id="Subject"
                @change="getInstructors"
                v-model="selectedSubject" >
                <option value="null" hidden>Select Subject</option>
                <option v-if="SubjectsRow === null" value="null" disabled>No Subjects</option>
                <option v-else v-for="data in SubjectsRow"
                v-bind:value="{id: data.id, subject_id: data.subject_id, instructors: data.subject.instructors, lab:  data.subject.lab}">
                {{data.subject.subject_code}} - {{data.subject.subject_description}}
              </option>
              </b-form-select>
            </b-form-group>
          </b-col>



            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="block"
                label="Block"
                label-for="Block">
              <b-form-input
                type="text"
                v-model="selectedBlock"
                id="block"
                placeholder="Enter Block No."
                v-bind:value="blockData"
                :disabled="blockStatus">
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="batch"
              label="Batch"
              label-for="Batch">
            <b-form-input
              type="text"
              v-model="selectedBatch"
              id="batch"
              placeholder="Enter Batch No."
              v-bind:value="batchData"
              :disabled="batchStatus">
            </b-form-input>
          </b-form-group>
        </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="instructor"
              label="Instructor"
              label-for="Instructor">
              <b-form-select
                id="Instructor"
                @change="getRooms"
                v-model="selectedInstructor" >
                <option value="null" hidden>Select Instructor</option>
                <option v-if="instructorRow === null" value="null" disabled>No Instructors</option>
                <option v-else v-for="data in instructorRow"
                v-bind:value="data.instructor_id">{{data.instructor.first_name}} {{data.instructor.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="room"
              label="Room"
              label-for="Room">
              <b-form-select
                id="Room"
                @change="getDays"
                v-model="selectedRoom">
                <option value="null" hidden>Select Room</option>
                <option v-if="roomRow === null" value="null" disabled>No Rooms</option>
                <option v-else v-for="room in roomRow"
                v-bind:value="room.id">{{room.room_number}} - {{room.room_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="day"
              label="Day"
              label-for="Day">
              <b-form-select
                id="Day"
                @change=""
                v-model="selectedDay"
                :options="day_options">
                <option value="null" hidden>Select Day</option>
                <option v-if="roomRow === null" value="null" disabled>No Days</option>
              </b-form-select>
            </b-form-group>
          </b-col>



        </b-form>
        <b-form-row>
          <b-col>
            <b-button variant="danger" @click="toggleForm">
              Cancel
            </b-button>
          </b-col>
          <b-col class="d-flex justify-content-end">
            <b-button variant="primary" id="Add_Semester_Btn" >
              Add
            </b-button>
          </b-col>
        </b-form-row>
      </div>
    </div>

    <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New Class Schedule
    </b-button>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="CollegeClassScheduleColumnDefs"
      :rowData="CollegeClassSchedRow"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

  </div>
</template>

    <script>
    import Axios from "axios";
    import {AgGridVue} from "ag-grid-vue";
    import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
    import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';

        export default {
            name: 'CollegeClassSchedule',
            data() {
                return {
                  CollegeClassScheduleColumnDefs: null,
                  columnDefs: null,
                  CollegeClassSchedRow: null,
                  AyRow: null,
                  SemRow: null,
                  CourseRow: null,
                  Curriculumrow: null,
                  SubjectsRow: null,
                  instructorRow: null,
                  roomRow: null,
                  blockData: null,
                  batchData: null,
                  gridOptions: null,
                  showForm: false,
                  alertMessage: "",
                  errors: [],
                  dismissSecs: 7,
                  dismissSuccessCountDown: 0,
                  dismissErrorCountDown: 0,



                  current_ay: [],
                  current_sem: [],
                  selectedAcademicYear:null,
                  selectedSemester:null,
                  selectedCourse: {
                    id: null,
                    curriculums: []
                  },
                  selectedCurriculum:{
                    id: null,
                    subjects: []
                  },
                  selectedSubject: null,
                  selectedYearLevel: null,
                  selectedInstructor: null,
                  selectedBlock: null,
                  selectedBatch: null,
                  selectedRoom: null,
                  selectedDay: null,

                  academic_options: [],
                  year_options: [],
                  course_options: [],
                  day_options: [],

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
                    class_type: null,
                    academic_year: null,
                    semester: null,

                  },


                  // full_name: this.instructor.first_name + " " + this.instructor.last_name,
                }
            },
            components: {
                AgGridVue,
            },
            beforeMount() {
              this.getClassSchedule();
              this.getCurrentSetting();
              this.gridOptions = {
                  context: {
                      componentParent: this
                  }
              };

              this.CollegeClassScheduleColumnDefs = [
                  {headerName: 'Day', field: 'schedule.day', sortable: true, filter: true, width: 150,},
                  {headerName: 'Time', field: 'schedule.time', sortable: true, filter: true, width: 200},
                  {headerName: 'Subject Code', field: 'subject.subject_code', sortable: true, filter: true, width: 150, resizable:true },
                  {headerName: 'Subject Description', field: 'subject.subject_desc', sortable: true, filter: true, width: 300, resizable:true},
                  {headerName: 'Room No.', field: 'room.room_number', sortable: true, filter: true, width: 150},
                  {headerName: 'Instructor.', field: 'instructor.full_name' , sortable: true, filter: true, width: 150},
                  {headerName: 'Block', field: 'block', sortable: true, filter: true, width: 150},
                  {headerName: 'Batch', field: 'batch', sortable: true, filter: true, width: 150},
                  {headerName: 'Academic Year', field: 'ay.academic_year', sortable: true, filter: true, width: 150},
                  {headerName: 'Semester', field: 'sem.semester', sortable: true, filter: true, width: 150},
              ];

              },
              mounted () {
                this.getAY();
                this.getSemester();
                this.getCourse();
              },

              methods: {
                // gets all created schedule
                getClassSchedule: function(){
                  Axios
                    .get('http://localhost/api/v1/class_schedules', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      // console.log(response);
                      this.CollegeClassSchedRow = response.data;
                    })
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
                          this.current_ay = [
                            { id: current_ay.data.id},
                            { academic_year: current_ay.data.academic_year},
                          ];
                          Axios
                            .get('http://localhost/api/v1/semesters/' + response.data.current_sem, {
                              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                            })
                            .then(current_sem => {
                              this.selectedSemester = current_sem.data.id
                              this.current_sem = current_sem.data.semester
                            }) // end of get current sem
                        }) // end of get current ay
                    }) // end of get settings
                },
                // gets all academic year record
                getAY: function(){
                  Axios
                    .get('http://localhost/api/v1/academic_years', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      this.AyRow = response.data;
                    })
                },

                // gets all semester record
                getSemester: function(){
                  Axios
                    .get('http://localhost/api/v1/semesters', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      this.SemRow = response.data;
                    })
                },

                changeSemester: function(){
                  // clears select boxes
                  this.day_options = [];
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
                },

                // get all courses
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
                          // console.log(response.data[i].course_code);
                          this.course_options.push(
                            {
                              value: {
                                id: response.data[i].id,
                                year: response.data[i].year_duration,
                                curriculum: response.data[i].curriculum
                              },
                              text: response.data[i].course_code
                            },
                          );
                        }
                      }
                    });
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
                    // });
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

                      this.selectedSubject = null;
                      this.selectedBlock = null;
                      this.selectedBatch = null;
                      this.selectedInstructor = null;
                      this.selectedRoom = null;
                      this.selectedDay = null;


                },

                // gets all instructor that prefers the selected subject
                getInstructors: function(){
                  this.instructorRow = null

                  var instructors = this.selectedSubject.instructors;

                    if( instructors.length == 0){
                      this.instructorRow = null;
                    }else{
                      this.instructorRow = instructors;
                    }



                  var lab = this.selectedSubject.lab
                  console.log(lab);
                  // check if subject has laboratory
                  if(lab == 1){
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



                    this.roomRow = null;
                    this.day_options = [];


                    this.selectedInstructor = null;
                    this.selectedRoom = null;
                    this.selectedDay = null;

                    // this.getRooms();
                },

                // gets all rooms
                getRooms: function(){
                  Axios
                    .get('http://localhost/api/v1/rooms', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      this.day_options = [];
                      this.selectedDay = null;
                      this.selectedRoom = null;
                      this.roomRow = response.data;
                    })
                },

                //
                getDays: function(){
                //   Axios
                //     .get('http://localhost/api/v1/instructors/' + this.selectedInstructor
                //         + '/availabilities/' + this.selectedAcademicYear + '/' + this.selectedSemester,
                //     {
                //       headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                //     })
                //     .then(response => {
                //       console.log(response.data);
                //     })
                },

                getTimes: function(){

                },

                toggleForm: function(){
                  // clears select boxes
                  this.CourseRow = null;
                  this.Curriculumrow = null;
                  this.year_options = [];
                  this.SubjectsRow = [];
                  this.instructorRow = null;
                  this.roomRow = null;
                  this.day_options = [];

                  // clear select box selected values
                  // this.selectedCurriculum = null;
                  this.selectedCourse = null;
                  this.selectedCurriculum = null;
                  this.selectedYearLevel = null;
                  this.selectedSubject = null;
                  this.selectedBlock = null;
                  this.selectedBatch = null;
                  this.selectedInstructor = null;
                  this.selectedRoom = null;
                  this.selectedDay = null;

                  if(this.showForm){
                    this.showForm = false;
                  } else {
                    this.showForm = true;
                  }

                },
              },

            }
    </script>

  </div>
</template>
