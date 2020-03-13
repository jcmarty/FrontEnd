<template>
<div>

  <h1>College Class Schedule</h1>
  <hr />

  <b-alert variant="success" :show="dismissSuccessCountDown" @dismissed="dismissSuccessCountDown=0" dismissible fade>
    {{alertMessage}}
  </b-alert>
  <b-alert variant="warning" :show="dismissWarningCountDown" @dismissed="dismissSuccessCountDown=0" dismissible fade>
    {{alertMessage}}
  </b-alert>
  <b-alert variant="danger" :show="dismissErrorCountDown" @dismissed="dismissErrorCountDown=0" dismissible fade>
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
          <b-form-group class="academicyear" label="Academic Year" label-for="academicYear">
            <b-form-select id="academicYear" v-model="selectedAcademicYear" @change="">
              <option value="null" hidden>Select Academic Year</option>
              <option v-for="ay in AyRow" v-bind:value="ay.id">{{ay.academic_year}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <b-form-group class="semester" label="Semester" label-for="Semester">
            <b-form-select id="Semester" v-model="selectedSemester" @change="changeSemester">
              <option value="null" hidden>Select Semester</option>
              <option v-for="sem in SemRow" v-bind:value="sem.id">{{sem.semester}}</option>
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
            <b-form-select id="yearLevel" v-model="selectedYearLevel" @change="getSubject()" :options="year_options">
              <option value="null" hidden>Select Year Level</option>
              <option v-if="selectedCurriculum === null" value="null" disabled>No year levels</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <b-form-group class="subject" label="Subject" label-for="Subject">
            <b-form-select id="Subject" @change="getInstructors" v-model="selectedSubject">
              <option value="null" hidden>Select Subject</option>
              <option v-if="SubjectsRow === null" value="null" disabled>No Subjects</option>
              <option v-else v-for="data in SubjectsRow" v-bind:value="{id: data.id, subject_code: data.subject.subject_code ,subject_id: data.subject_id, instructors: data.subject.instructors, lab:  data.subject.lab}">
                {{data.subject.subject_code}} - {{data.subject.subject_description}}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>



        <b-col cols="12" md="6" lg="1">
          <b-form-group class="block" label="Block" label-for="Block">
            <b-form-input type="text" v-model="selectedBlock" id="block" placeholder="No." v-bind:value="blockData" :disabled="blockStatus">
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="1">
          <b-form-group class="batch" label="Batch" label-for="Batch">
            <b-form-input type="text" v-model="selectedBatch" id="batch" placeholder="No." v-bind:value="batchData" :disabled="batchStatus">
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <b-form-group class="instructor" label="Instructor" label-for="Instructor">
            <b-form-select id="Instructor" @change="setRooms" v-model="selectedInstructor">
              <option value="null" hidden>Select Instructor</option>
              <option v-if="instructorRow === null" value="null" disabled>No Instructors</option>
              <option v-else v-for="data in instructorRow" v-bind:value="data.instructor_id">{{data.instructor.first_name}} {{data.instructor.last_name}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <b-form-group class="room" label="Room" label-for="Room">
            <b-form-select id="Room" @change="getDays" v-model="selectedRoom">
              <option value="null" hidden>Select Room</option>
              <option v-if="roomRow === null" value="null" disabled>No Rooms</option>
              <option v-else v-for="room in roomRow" v-bind:value="room.id">{{room.room_number}} - {{room.room_name}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <b-form-group class="day" label="Day" label-for="Day">
            <b-form-select id="Day" @change="getTimes" v-model="selectedDay" :options="day_options">
              <option value="null" hidden>Select Day</option>
              <option v-if="selectedRoom == null" value="null" disabled>No Days</option>
              <option v-else-if="day_options == []" value="null" disabled>No Days</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <b-form-group class="time_start" label="Time Start" label-for="time_start">
            <b-form-select id="time_start" @change="getTimeEnd" v-model="selectedTimeStart" :options="availabilities">
              <option value="null" hidden>Select Time Start</option>
              <option v-if="selectedDay == null" value="null" disabled>No Time Start</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <b-form-group class="time_end" label="Time End" label-for="time_end">
            <b-form-select id="time_end" @change="" v-model="selectedTimeEnd" :options="availabilities">
              <option value="null" hidden>Select Time End</option>
              <option v-if="selectedTimeStart == null" value="null" disabled>No Time End</option>
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
          <b-button @click="createSchedule" variant="primary" id="Add_Semester_Btn">
            Add
          </b-button>
        </b-col>
      </b-form-row>
    </div>
  </div>

  <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
    Add New Class Schedule
  </b-button>
  <b-button variant="success" size="" @click="getAvailabilities" class="">
    TIME
  </b-button>
  <ag-grid-vue class="ag-theme-material" :columnDefs="CollegeClassScheduleColumnDefs" :rowData="CollegeClassSchedRow" :animateRows="true" :pagination="true" :paginationPageSize="10" :gridOptions="gridOptions">
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
                  roomContainer: null,
                  blockData: null,
                  batchData: null,
                  gridOptions: null,
                  showForm: false,
                  alertMessage: "",
                  errors: [],
                  dismissSecs: 7,
                  dismissSuccessCountDown: 0,
                  dismissWarningCountDown: 0,
                  dismissErrorCountDown: 0,



                  current_ay: [],
                  current_sem: [],
                  availabilities : [],
                  time_conflicts: [],

                  selectedAcademicYear:null,
                  selectedSemester:null,
                  selectedCourse: {
                    id: null,
                    course_code: null,
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
                  selectedTimeStart: null,
                  selectedTimeEnd : null,

                  academic_options: [],
                  year_options: [],
                  course_options: [],
                  day_options: [],
                  time_start_options: [],
                  time_end_options: [],
                  notUsedTime: [],

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
                  {headerName: 'Day', field: 'day', sortable: true, filter: true, width: 150,},
                  {headerName: 'Time Start', field: 'time_start', sortable: true, filter: true, width: 200},
                  {headerName: 'Time End', field: 'time_end', sortable: true, filter: true, width: 200},
                  {headerName: 'Subject Code', field: 'subject_code', sortable: true, filter: true, width: 150, resizable:true },
                  {headerName: 'Subject Description', field: 'subject.subject.subject_description', sortable: true, filter: true, width: 300, resizable:true},
                  {headerName: 'Room No.', field: 'room.room_number', sortable: true, filter: true, width: 150},
                  {headerName: 'Instructor.', field: 'instructor.last_name' , sortable: true, filter: true, width: 150},
                  {headerName: 'Block', field: 'block', sortable: true, filter: true, width: 150},
                  {headerName: 'Batch', field: 'batch', sortable: true, filter: true, width: 150},
              ];

              },
              mounted () {
                this.getAY();
                this.getSemester();
                this.getCourse();
                this.getRooms();
              },

              methods: {


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

                // gets all instructor that prefers the selected subject
                getInstructors: function(){
                  this.instructorRow = null
                  // console.log(this.selectedSubject.instructors);
                  var instructors = this.selectedSubject.instructors;

                    if( instructors.length == 0){
                      this.instructorRow = null;
                    }else{
                      this.instructorRow = instructors;
                    }

                  var lab = this.selectedSubject.lab
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
                    this.time_start_options = []


                    this.selectedInstructor = null;
                    this.selectedRoom = null;
                    this.selectedDay = null;
                    this.selectedTimeStart = null;


                },

                setRooms: function(){
                  this.day_options = [];
                  this.selectedDay = null;
                  this.selectedRoom = null;
                  this.roomRow = this.roomContainer;
                },


                // get days of availability of an instructor
                getDays: function(){
                  this.day_options = [];
                  Axios
                    .get('http://localhost/api/v1/instructors/' + this.selectedInstructor
                          + '/availabilities?academic_year_id=' + this.selectedAcademicYear
                          + '&semester_id=' + this.selectedSemester,
                    {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      var availabilities = response.data;
                      if(availabilities.length > 0){
                        for(var i = 0; i < availabilities.length; i++){
                          this.day_options.push({
                            value: {
                              day: availabilities[i].day,
                              time_start: availabilities[i].time_start,
                              time_end: availabilities[i].time_end,
                            },
                            text: availabilities[i].day
                          });
                        }
                      }else{
                        alert("No Time Availability set for the selected instructor")
                        this.day_options = [];
                        this.selectedDay = null;
                      }
                    })
                },

                getTimeEnd: function(){
                  alert("change");
                  this.getTimeConflicts();
                },

                getTimeConflicts: function(){

                  // get selected room availability
                  Axios
                    .get('http://localhost/api/v1/rooms/' + this.selectedRoom + '/schedules?academic_year_id=' + this.selectedAcademicYear +
                    '&semester_id=' + this.selectedSemester +
                    '&day=' + this.selectedDay.day +
                    '&time_start=' + this.selectedTimeStart +
                    '&active=1',
                    {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    }).then(response => {
                      // push time conflicts to this array time_conflicts
                      if(response.data != null){
                        this.dismissWarningCountDown = 5;
                        this.alertMessage = response.data;
                      }
                    })

                  // get selected instructor availability
                  // Axios
                  //   .get('http://localhost/api/v1/instructors',
                  //   {
                  //     headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                  //   }).then(response => {
                  //     // push time conflicts to this array time_conflicts
                  //   })
                  // // get selected course availability
                  // Axios
                  //   .get('http://localhost/api/v1/course',
                  //   {
                  //     headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                  //   }).then(response => {
                  //     // push time conflicts to this array time_conflicts
                  //   })
                },

                getTimes: function(){
                  // this.getTimeConflicts();
                  this.selectedTimeStart = null;
                  this.time_start_options = [];
                  this.availabilities = [];
                  // console.log(this.selectedDay)
                  var time_start = this.selectedDay.time_start;
                  var split_start = time_start.split(":");
                  var hour_start = split_start[0];
                  var h = "";

                  var time_end = this.selectedDay.time_end;
                  var split_end = time_end.split(":");
                  var hour_end = split_end[0];

                  var ampm = "";
                  var converted = "";

                  for (var i = hour_start; i <= hour_end; i++) {
                  	for (var j = 0; j < 2; j++) {
                  		// this.timeConverter(j,i);
                      if (j == 0){
                        var minutes_start = "00";
                        h = i % 12 || 12;
                        ampm = (i < 12 || i == 24) ? "AM" : "PM";
                        //alert(converted = h + ":" +  minutes_start + ampm) ;
                        converted = h + ":" +  minutes_start + ampm;
                        // this.availabilities.push({
                        //   value: converted,
                        //   text: converted
                        // })
                        this.availabilities.push(converted)
                      }
                      else if(j == 1){
                        if(i == hour_end){

                        }else{
                          var minutes_start = "30";
                          h = i % 12 || 12;
                        	ampm = (i < 12 || i == 24) ? "AM" : "PM";
                          //alert(converted = h + ":" +  minutes_start + ampm) ;
                          converted = h + ":" +  minutes_start + ampm;
                          // this.availabilities.push({
                          //   value: converted,
                          //   text: converted
                          // })
                          this.availabilities.push(converted)
                        }
                      }
                  	}
                  }
                  // this.getAvailabilities();
                },

                getAvailabilities : function (data){
                  // this.aaaaaa()
                  var used = [
                      {
                        start: "8:00:00",
                        end: "9:30:00",
                      },
                      {
                        start: "10:30:00",
                        end: "11:00:00",
                      },
                      {
                        start: "11:00:00",
                        end: "1:00:00",
                      },

                    ];
                  var ampm = "";
                  var converted = "";
                  var h = "";
                  var usedTime = [];
                  var free = [];

                   for (var a = 0; a < used.length; a++) {
                   	var split_used_start = used[a].start.split(":");
                		var hour_used_start = split_used_start[0];
                    var min_start = split_used_start[1]

                    var split_used_end = used[a].end.split(":");
                		var hour_used_end = split_used_end[0];
                    var min_end = split_used_end[1];

                    var minutes_start = min_start;
                    var x = hour_used_start % 12 || 12;
                    var start_ampm = (hour_used_start < 12 || hour_used_start == 24) ? "AM" : "PM";
                    var start_converted = x + ":" +  minutes_start + start_ampm;
                    // this.time_start_options.push(start_converted);
                    // var newItem = "OLD_ITEM_2";
                    // var array = ["OLD_ITEM_1", "OLD_ITEM_2"];

                    this.notUsedTime.indexOf(start_converted) === -1 ? this.notUsedTime.push(start_converted) : console.log();

                    var minutes_start = min_end;
                    var y = hour_used_end % 12 || 12;
                    var end_ampm = (hour_used_end < 12 || hour_used_end == 24) ? "AM" : "PM";
                    var end_converted = y + ":" +  minutes_start + end_ampm;

                    this.notUsedTime.indexOf(end_converted) === -1 ? this.notUsedTime.push(end_converted) : console.log();


                    for (var b = hour_used_start; b <= hour_used_end; b++) {
                			for (var j = 0; j < 2; j++) {
                				if (j == 0){
                				  var minutes_start = "00";
                			  	h = b % 12 || 12;
                			  	ampm = (b < 12 || b == 24) ? "AM" : "PM";
                			   	converted = h + ":" +  minutes_start + ampm;
                          // console.log(converted);
                          usedTime.indexOf(converted) === -1 ? usedTime.push(converted) : console.log();
                			   	// usedTime.push(converted);
                       	}else if(j == 1){
                        	if(b == hour_used_end){
                            if(min_end == "30"){
                              var minutes_start = min_end;
                              h = b % 12 || 12;
                              ampm = (b < 12 || b == 24) ? "AM" : "PM";
                              converted = h + ":" +  minutes_start + ampm;
                              // console.log(converted);
                              usedTime.indexOf(converted) === -1 ? usedTime.push(converted) : console.log();
                              // usedTime.push(converted);
                            }
                          }else{
                          	var minutes_start = "30";
                				  	h = b % 12 || 12;
                   				  ampm = (b < 12 || b == 24) ? "AM" : "PM";
                            converted = h + ":" +  minutes_start + ampm;
                            // console.log(converted);
                   				  usedTime.push(converted);
                          }
                        }
                			}
                    }
                	}
                  //  all of used time
                  // console.log(usedTime.sort());

                  for(var i = 0; i < this.notUsedTime.length; i++){
                    var time = this.notUsedTime[i]
                    // cuts the un used time
                    usedTime.indexOf(time) !== -1 && usedTime.splice(usedTime.indexOf(time), 1)
                  }

                  for(var i = 0; i < usedTime.length; i++){
                    var used = usedTime[i]
                      this.availabilities.indexOf(used) !== -1 &&   this.availabilities.splice(  this.availabilities.indexOf(used), 1)
                  }

                  // this.time_start_options = this.availabilities
                },
                // gets all created schedule
                getClassSchedule: function(){
                  Axios
                    .get('http://localhost/api/v1/class_schedules', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      console.log(response.data);
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

                // gets all rooms
                getRooms: function(){
                  Axios
                    .get('http://localhost/api/v1/rooms', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      this.day_options = [];
                      this.time_start_options = []

                      this.selectedTimeStart = null;
                      this.selectedDay = null;
                      this.selectedRoom = null;
                      this.roomContainer = response.data;
                    })
                },

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
                                course_code: response.data[i].course_code,
                                curriculum: response.data[i].curriculum
                              },
                              text: response.data[i].course_code
                            },
                          );
                        }
                      }
                    });
                },

                // create class schedule
                createSchedule: function(){
                  var newSchedule = {
                              day : this.selectedDay.day,
                              time_start : this.selectedTimeStart,
                              time_end : this.selectedTimeEnd,
                              subject_id : this.selectedSubject.id,
                              subject_code : this.selectedSubject.subject_code,
                              room_id : this.selectedRoom,
                              instructor_id : this.selectedInstructor,
                              block : this.selectedBlock,
                              batch : this.selectedBatch,
                              academic_year_id : this.selectedAcademicYear,
                              semester_id : this.selectedSemester,
                              course_id : this.selectedCourse.id,
                              course_code : this.selectedCourse.course_code,
                              year_level : this.selectedYearLevel,
                              active : 1
                            };

                  Axios
                    .post('http://localhost/api/v1/class_schedules', newSchedule,{
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      alert(response.data.message);
                      this.getClassSchedule();
                    })
                  // console.log(newSchedule)
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
                  this.time = [];
                  this.time_start_options = [];
                  this.availabilities = [];

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
                  this.selectedTimeStart = null;
                  this.selectedTimeEnd = null;


                  if(this.showForm){
                    this.showForm = false;
                  } else {
                    this.showForm = true;
                  }
                },
              }
            }
    </script>

  </div>
</template>
