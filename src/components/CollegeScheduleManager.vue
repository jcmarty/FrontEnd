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
                @change="">
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
                v-bind:value="curriculum.id">{{curriculum.curriculum_title}}</option>
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


          <!-- <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="blockbatch"
              label="Block Batch"
              label-for="blockBatch">
              <b-form-select
                id="blockBatch"
                @change="getInstructorSchedule()">
                <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col> -->

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="subject"
              label="Subject"
              label-for="Subject">
              <b-form-select
                id="Subject"
                @change="getInstructorSchedule()"
                v-model="selectedSubject" >
                <option value="null" hidden>Select Subject</option>
                <option v-if="SubjectsRow === null" value="null" disabled>No Subjects</option>
                <option v-else v-for="data in SubjectsRow"
                v-bind:value="data.id">{{data.subject.subject_code}} - {{data.subject.subject_description}} </option>
              </b-form-select>
            </b-form-group>
          </b-col>


          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="leclab"
              label="Lecture Laboratory"
              label-for="lectureLaboratory">
              <b-form-select
                id="lectureLaboratory"
                @change="getInstructorSchedule()">
                <!-- <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option> -->
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
                  gridOptions: null,
                  showForm: false,
                  alertMessage: "",
                  errors: [],
                  dismissSecs: 7,
                  dismissSuccessCountDown: 0,
                  dismissErrorCountDown: 0,


                  current_ay: [],
                  current_sem: [],
                  selectedCourse: null,
                  selectedYearLevel: null,
                  year_options: [],
                  course_options: [],
                  academic_options: [],
                  selectedCurriculum:null,
                  selectedAcademicYear:null,
                  selectedSemester:null,
                  selectedSubject: null,
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
              this.gridOptions = {
                  context: {
                      componentParent: this
                  }
              };

              this.CollegeClassScheduleColumnDefs = [
                  {headerName: 'Day', field: 'day', sortable: true, filter: true, width: 150,},
                  {headerName: 'Time Start', field: 'time_start', sortable: true, filter: true, width: 150},
                  {headerName: 'Time End', field: 'time_end', sortable: true, filter: true, width: 150},
                  {headerName: 'Subject Code', field: 'subject.subject.subject_code', sortable: true, filter: true, width: 150, resizable:true },
                  {headerName: 'Subject Description', field: 'subject.subject.subject_description', sortable: true, filter: true, width: 300, resizable:true},
                  {headerName: 'Room No.', field: 'room.room_number', sortable: true, filter: true, width: 150},
                  {headerName: 'Instructor.', field: 'instructor.first_name' , sortable: true, filter: true, width: 150},
                  {headerName: 'Block', field: 'block', sortable: true, filter: true, width: 150},
                  {headerName: 'Batch', field: 'batch', sortable: true, filter: true, width: 150},
                  {headerName: 'Class Type', field: 'class_type', sortable: true, filter: true, width: 150},
                  {headerName: 'Academic Year', field: 'academic_year.academic_year', sortable: true, filter: true, width: 150},
                  {headerName: 'Semester', field: 'semester.semester', sortable: true, filter: true, width: 150},
              ];

              },
              mounted () {
                this.getClassSchedule();
                this.getCurrentSetting()
                this.getCourse();
                this.getAY();
                this.getSemester();

              },

              methods: {
                // gets all created schedule
                getClassSchedule: function(){
                  Axios
                    .get('http://localhost/api/v1/class_schedules', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      //console.log(response.data.data);
                      this.CollegeClassSchedRow = response.data;
                    })
                },
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
                      //console.log(response.data.data);
                      this.AyRow = response.data;
                      // if( response.data.length == 0){
                      //   // this.AyRow = null;
                      // }else{
                      //   for (var i = 0; i < response.data.length; i++) {
                      //     // console.log(response.data[i].academic_year);
                      //     this.academic_options.push(
                      //       {
                      //         value: {
                      //           id: response.data[i].id,
                      //         },
                      //         text: response.data[i].academic_year },
                      //     );
                      //   }
                      // }
                    })
                },

                // gets all semester record
                getSemester: function(){
                  Axios
                    .get('http://localhost/api/v1/semesters', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      //console.log(response.data.data);
                      this.SemRow = response.data;
                    })
                },

                getCourse: function(){
                  Axios
                    .get('http://localhost/api/v1/courses', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      // course_options
                      // this.CourseRow = response.data;
                      if( response.data.length == 0){
                        this.CourseRow = null;
                      }else{
                        for (var i = 0; i < response.data.length; i++) {
                          // console.log(response.data[i].course_code);
                          this.course_options.push(
                            {
                              value: {
                                id: response.data[i].id,
                                year: response.data[i].year_duration
                              },
                              text: response.data[i].course_code },
                          );
                        }
                      }
                    });
                },

                getCurriculum: function(){
                  Axios
                    .get('http://localhost/api/v1/courses/' + this.selectedCourse.id + '/curriculums', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {

                      // this.Curriculumrow = response.data;

                      if( response.data.length == 0){
                        this.Curriculumrow = null;
                      }else{
                        this.Curriculumrow = response.data;
                      }
                      this.year_options = [];
                      this.SubjectsRow = null;
                      this.selectedYearLevel = null;
                      this.selectedCurriculum = null;
                      this.selectedSubject = null;
                    });



                },
                changeCurr: function(){
                  this.selectedYearLevel = null;
                  this.selectedSubject = null;
                  // console.log(this.selectedCourse)
                  if(this.selectedCourse.year === "4 years"){
                    this.year_options = [
                      { value: '1st Year', text: '1st Year' },
                      { value: '2nd Year', text: '2nd Year' },
                      { value: '3rd Year', text: '3rd Year' },
                      { value: '4th Year', text: '4th Year' },
                    ];
                  }
                 else if(this.selectedCourse.year === "2 years"){
                   this.year_options = [

                     { value: '1st Year', text: '1st Year' },
                     { value: '2nd Year', text: '2nd Year' },
                   ];
                 }
                },

                getSubject: function(){
                  this.dataFilter = {
                    "semester_id" : this.selectedSemester,
                    "curriculum_id" : this.selectedCurriculum,
                    "year_level" : this.selectedYearLevel
                  };
                  // console.log(this.dataFilter);
                  Axios
                    .post('http://localhost/api/v1/course/get_subjects', this.dataFilter,{
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      if( response.data == 0){
                        this.SubjectsRow = null;
                      }else{
                        this.SubjectsRow = response.data;
                      }

                      // this.SubjectsRow = response.data;
                      // console.log(response.data);
                    });
                },


                toggleForm: function(){
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
