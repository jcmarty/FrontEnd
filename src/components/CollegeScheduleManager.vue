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
                <option v-for="ay in AyRow"
                v-bind:value="ay.academic_year">{{ay.academic_year}}</option>
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
                <option v-for="sem in SemRow"
                v-bind:value="sem.semester">{{sem.semester}}</option>
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
                @change="getCurriculum()">
                <option v-for="course in CourseRow"
                v-bind:value="{id:course.id , year:course.year_duration}">{{course.course_code}}</option>
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
                @change="">
                <option v-for="curriculum in Curriculumrow "
                v-bind:value="curriculum.id">{{curriculum.curriculum_title}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="yearlevel"
              label="Year Level"
              label-for="yearLevel">
              <b-form-select :hidden="Bs"
                id="yearLevel"
                v-model="selectedYearLevel"
                @change="getSubject()">
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </b-form-select>

              <b-form-select :hidden="Voc"
                id="yearLevel"
                v-model="selectedYearLevel"
                @change="getSubject()">
                <option>1st Year</option>
                <option>2nd Year</option>
              </b-form-select>
            </b-form-group>
          </b-col>


          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="blockbatch"
              label="Block Batch"
              label-for="blockBatch">
              <b-form-select
                id="blockBatch"
                @change="getInstructorSchedule()">
                <!-- <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option> -->
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
                @change="getInstructorSchedule()">
                <!-- <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option> -->
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
                  gridOptions: null,
                  showForm: false,
                  alertMessage: "",
                  errors: [],
                  dismissSecs: 7,
                  dismissSuccessCountDown: 0,
                  dismissErrorCountDown: 0,
                  Bs: true,
                  Voc: true,
                  selectedCourse: null,
                  selectedYearLevel: null,
                  selectedCurriculum:null,
                  selectedAcademicYear:null,
                  selectedSemester:null,

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
                this.getCourse();
                this.getAY();
                this.getSemester();

              },

              methods: {
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

                getAY: function(){
                  Axios
                    .get('http://localhost/api/v1/academic_years', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      //console.log(response.data.data);
                      this.AyRow = response.data;
                    })
                },

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
                      //console.log(response.data.data);
                      this.CourseRow = response.data;
                    });


                },

                getCurriculum: function(){
                  Axios
                    .get('http://localhost/api/v1/courses/' + this.selectedCourse.id + '/curriculums', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                        // console.log(response.data);
                      this.Curriculumrow = response.data;
                    });
                    if(this.selectedCourse.year === "4 years"){
                      this.Bs = false,
                      this.Voc = true
                    }
                   else if(this.selectedCourse.year === "2 years"){
                     this.Bs = true,
                     this.Voc = false
                   }

                },

                getSubject: function(){
                  Axios
                    .post('http://localhost/api/v1/course/get_subjects', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                        // console.log(response.data);
                      this.Curriculumrow = response.data;
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
