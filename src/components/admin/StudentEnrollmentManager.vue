<template>
  <div>
    <!-- page title -->
    <h1>Manage Student Enrollment</h1>
    <hr/>

    <!-- form container -->
    <div class="container">

      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="showStudentForm">
        <div class=" h5 font-weight-bold text-dark"  v-if="showStudentForm">Academic Information</div>
        <hr/>
        <div class="" v-if="showStudentForm">
            <b-form-row>
              <!-- Academic Year -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="Academic"
                              label="Academic"
                              label-for="Academic">
                  <b-form-select v-model="selectedAcademicYear" id="Academic">
                    <option value="null" hidden>Select Academic</option>
                    <option :value="{ id: ay.id, academic_year: ay.academic_year}" v-for="ay in academicYearOptions">{{ay.academic_year}}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <!-- Academic Year -->

              <!-- Semester  -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="semester"
                              label="Semester"
                              label-for="Semester">
                  <b-form-select v-model="selectedSemester" id="Semester">
                    <option value="null" hidden>Select Semester</option>
                    <option :value="{ id: sem.id, semester: sem.semester}" v-for="sem in semesterOptions">{{sem.semester}}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <!-- Semester  -->

              <!-- Student Number -->
              <b-col cols="12" md="3" lg="3">
                <b-form-group class="studentno"
                              label="Student Number"
                              label-for="studentNo">
                  <b-form-input type="text"
                                v-model="student_number"
                                id="studentNo"
                                @keyup="searchNumber"
                                :state="student_numberState"
                                maxlength=12
                                aria-describedby="student_number-feedback"
                                placeholder="Search Student Number...">
                  </b-form-input>
                  <b-form-invalid-feedback id="student_number-feedback">
                    {{studentNumberMessage}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <!-- Student Number -->

              <!-- Date Enrolled-->
              <b-col cols="12" md="2" lg="3">
                <b-form-group class="dateEnrolled"
                              label="Date Enrolled"
                              label-for="dateEnrolled">
                  <b-form-input type="date"
                                v-model="selectedDate"
                                id="dateEnrolled"
                                @change="dateEnrolledState = null"
                                :state="dateEnrolledState"
                                aria-describedby="dateEnrolled-feedback">
                  </b-form-input>
                  <b-form-invalid-feedback id="dateEnrolled-feedback">
                    Date enrolled is required.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <!-- Date Enrolled -->

              <!-- fullName -->
              <b-col cols="12" md="3" lg="3">
                <b-form-group class="fullname"
                              label="Full Name"
                              label-for="fullName">
                  <b-form-input type="text"
                                v-model="full_name"
                                id="fullName"
                                disabled></b-form-input>
                </b-form-group>
              </b-col>
              <!-- fullName -->

              <!-- address -->
              <b-col cols="12" md="5" lg="5">
                <b-form-group class="address"
                              label="Address"
                              label-for="address">
                  <b-form-input type="text"
                                v-model="address"
                                id="address"
                                disabled></b-form-input>
                </b-form-group>
              </b-col>
              <!-- address -->

              <!-- Student Status -->
              <b-col cols="12" md="2" lg="2">
                <b-form-group class="studentStatus"
                              label="Student Status"
                              label-for="studentStatus">
                  <b-form-select
                    v-model="selectedStudentStatus"
                    id="studentStatus"
                    @change="studentStatusState = null"
                    :state="studentStatusState"
                    aria-describedby="studentStatus-feedback">
                    <option value="null" hidden>Student Status</option>
                    <option value="New">New</option>
                    <option value="Old">Old</option>
                    <option value="Transferee">Transferee</option>
                  </b-form-select>
                  <b-form-invalid-feedback id="studentStatus-feedback">
                    Student Status is required.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <!-- Student Status -->

              <!-- Academic Status -->
              <b-col cols="12" md="2" lg="2">
                <b-form-group class="academicstatus"
                              label="Academic Status"
                              label-for="academicStatus">
                  <b-form-select
                    v-model="selectedAcademicStatus"
                    id="academicStatus"
                    @change="academicStatusState = null"
                    :state="academicStatusState"
                    aria-describedby="academicStatus-feedback">
                    <option value="null" hidden>Academic Status</option>
                    <option value="Regular">Regular</option>
                    <option value="Irregular">Irregular</option>
                  </b-form-select>
                  <b-form-invalid-feedback id="academicStatus-feedback">
                    Academic Status is required.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <!-- Academic Status -->

            </b-form-row>

            <b-form-row>
              <!-- Course -->
              <b-col cols="12" md="3" lg="3">
                <b-form-group class="course"
                              label="Course"
                              label-for="Course">
                  <b-form-select v-model="selectedCourse"
                                 id="Course"
                                 :options="courseOptions"
                                 @change="getCurriculum"
                                 :state="courseState"
                                 aria-describedby="course-feedback">
                    <option value="null" hidden>Select Course</option>
                  </b-form-select>
                  <b-form-invalid-feedback id="course-feedback">
                    Course is required.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <!-- Course -->

              <!-- Curriculum -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="curriculum"
                              label="Curriculum"
                              label-for="Curriculum">
                  <b-form-select v-model="selectedCurriculum"
                                 id="Curriculum"
                                 @change="setYearLevel"
                                 :state="curriculumState"
                                 aria-describedby="curriculum-feedback">
                    <option value="null" hidden>Select Curriculum</option>
                    <option v-for="curriculum in curriculumOptions " v-bind:value="{id: curriculum.id, subjects: curriculum.curriculum_subjects, curriculum: curriculum}">{{curriculum.curriculum_title}}</option>
                  </b-form-select>
                  <b-form-invalid-feedback id="curriculum-feedback">
                    Curriculum is required.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <!-- Curriculum -->

              <!-- yearLevel -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="yearlevel"
                              label="Year Level"
                              label-for="yearLevel">
                  <b-form-select v-model="selectedYearLevel"
                                 id="yearLevel"
                                 :options="yearOptions"
                                 @change="setSubjects"
                                 :state="yearLevelState"
                                 aria-describedby="yearLevel-feedback">
                    <option value="null" hidden>Select Year Level</option>
                  </b-form-select>
                  <b-form-invalid-feedback id="yearLevel-feedback">
                    Year Level is required.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <!-- yearLevel -->

              <!-- block -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="block"
                              label="Block"
                              label-for="block">
                  <b-form-select v-model="selectedBlock"
                                 id="block"
                                 @change="onChangeBlock"
                                 :state="blockState"
                                 aria-describedby="block-feedback">
                    <option value="null" hidden>Select Block</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </b-form-select>
                  <b-form-invalid-feedback id="block-feedback">
                    Block is required.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <!-- block -->
            </b-form-row>

        </div>
      </div>
      <!-- end of academic form -->


      <!-- academc form btn -->
      <b-form-row class="d-flex justify-content-end">
        <b-button class="mx-3"
                  variant="primary"
                  @click="showAddSubject"
                  v-if="showStudentForm"
                  >
                  Next <i class="fa fa-arrow-right" aria-hidden="true"/>
        </b-button>
      </b-form-row>
      <!-- academc form btn -->

      <!-- Form for Enrolling Subjects -->
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="showSubjectsForm">
        <!-- form title -->
        <div class=" h5 font-weight-bold text-dark"  v-if="showSubjectsForm">Add Subjects</div>
        <hr/>
        <!-- table title -->
        <div class=" h6 font-weight-bold text-center text-dark">
          {{selectedCourse.course_code}} |
          {{selectedCurriculum.curriculum.curriculum_title}} |
          {{selectedYearLevel.toUpperCase()}} |
          BLOCK {{selectedBlock}}
        </div>
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


          <template v-slot:head(action)="row">
            <b-form-checkbox id="selectAll" v-model="allSelected" @change="selectAll($event)" value="1">
            </b-form-checkbox>
          </template>

          <template v-slot:cell(action)="row" >
            <b-form-checkbox v-model="selected" :value="row.item" >
            </b-form-checkbox>
          </template>

        </b-table>

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
      <!-- end of subjects to be enrolled -->

      <!-- subjects form btn -->
      <b-button
                class="mx-3"
                variant="primary"
                @click="showEnrollStudet"
                v-if="showSubjectsForm"
                ><i class="fa fa-arrow-left" aria-hidden="true"/> Previous
      </b-button>
      <b-button
                class="mx-3 float-right"
                variant="primary"
                @click="showVerify"
                v-if="showSubjectsForm"
                >Next <i class="fa fa-arrow-right" aria-hidden="true"/>
      </b-button>
      <!-- subjects form btn -->


      <!-- start of verification form -->
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="showVerifyForm">
        <!-- form title -->
        <div class=" h5 font-weight-bold text-dark">Verification</div>
        <hr/>
        <div class="d-flex align-items-center flex-column">
          <!-- start of enrollment information -->
          <b-card  header-tag="header" class="d-flex my-3 w-75">
            <template v-slot:header>
              <h6 class="font-weight-bold text-dark mb-0"><i class="fa fa-info-circle fa-lg mr-2" aria-hidden="true"/>   Enrollment Info</h6>
            </template>

            <!-- date enrolled -->
            <div class="row mx-5 mt-2">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Date Enrolled :</h6>
              </div>
              <div class="column w-50">
                <h6>{{selectedDate}}</h6>
              </div>
            </div>
            <!-- end of date enrolled -->

            <!-- academic year -->
            <div class="row mx-5 mt-2">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Academic Year :</h6>
              </div>
              <div class="column w-50">
                <h6>{{selectedAcademicYear.academic_year}}</h6>
              </div>
            </div>
            <!-- end of academic year -->

            <!-- semester -->
            <div class="row mx-5">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Semester :</h6>
              </div>
              <div class="column w-50">
                <h6>{{selectedSemester.semester.toUpperCase()}}</h6>
              </div>
            </div>
            <!-- end of semester -->

            <!-- Course -->
            <div class="row mx-5">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Course :</h6>
              </div>
              <div class="column w-50">
                <h6>{{selectedCourse.course_code}}</h6>
              </div>
            </div>
            <!-- end of Course -->

            <!-- Curriculum -->
            <div class="row mx-5">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Curriculum :</h6>
              </div>
              <div class="column w-50">
                <h6>{{selectedCurriculum.curriculum.curriculum_title.toUpperCase()}}</h6>
              </div>
            </div>
            <!-- end of Curriculum -->

            <!-- year level -->
            <div class="row mx-5">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Year Level :</h6>
              </div>
              <div class="column w-50">
                <h6>{{selectedYearLevel.toUpperCase()}}</h6>
              </div>
            </div>
            <!-- end of year level -->

            <!--block -->
            <div class="row mx-5">
              <div class="column w-50">
                <h6 class="font-weight-bold">Block :</h6>
              </div>
              <div class="column w-50">
                <h6>{{selectedBlock}}</h6>
              </div>
            </div>
            <!-- end of block -->

          </b-card>
          <!-- end of enrollment info -->

          <!-- Start of student information -->
          <b-card  header-tag="header" class="my-3 w-75">

            <!-- card title -->
            <template v-slot:header>
              <h6 class="font-weight-bold text-dark mb-0"><i class="fa fa-user fa-lg mr-2" aria-hidden="true"/> Student Info</h6>
            </template>

            <!-- student number -->
            <div class="row mx-5 mt-2">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Student Number :</h6>
              </div>
              <div class="column w-50">
                <h6>{{student_number}}</h6>
              </div>
            </div>
            <!-- end of student number -->

            <!-- full name -->
            <div class="row mx-5">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Full Name :</h6>
              </div>
              <div class="column w-50">
                <h6>{{full_name.toUpperCase()}}</h6>
              </div>
            </div>
            <!-- end of full name -->


            <!-- contact number -->
            <div class="row mx-5">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Contact Number :</h6>
              </div>
              <div class="column w-50">
                <h6>{{student_param.cellphone}}</h6>
              </div>
            </div>
            <!-- end of contact number -->

            <!-- email -->
            <div class="row mx-5">
              <div class="mb-3 column w-50">
                <h6 class="font-weight-bold">Email :</h6>
              </div>
              <div class="column w-50">
                <h6>{{student_param.email}}</h6>
              </div>
            </div>
            <!-- end of email -->

            <!-- address -->
            <div class="row mx-5">
              <div class="column w-50">
                <h6 class="font-weight-bold">Address :</h6>
              </div>
              <div class="column w-50">
                <h6>
                  {{student_param.address.toUpperCase()}}
                  {{student_param.barangay ? " " + student_param.barangay.toUpperCase() : " "}}
                  {{student_param.city ? " " + student_param.city.toUpperCase() : " "}}
                  {{student_param.province ? " " + student_param.province.toUpperCase() : " "}}
                  {{student_param.postal ? " " + student_param.postal.toUpperCase() : " "}}
                </h6>
              </div>
            </div>
            <!-- end of address -->

          </b-card>
          <!-- End of student information -->

          <!-- Start of Subjects -->
          <b-card  header-tag="header" class="w-75">
            <template v-slot:header>
              <h6 class="font-weight-bold text-dark mb-0"><i class="fa fa-book fa-lg mr-2" aria-hidden="true"/> Subjects</h6>
            </template>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Subject Code</th>
                  <th scope="col">Title</th>
                  <th scope="col">Units</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in selected">
                  <td align="center" scope="col">{{item.subject.subject_code}}</td>
                  <td align="center" scope="col">{{item.subject.subject_title}}</td>
                  <td align="center" scope="col">{{item.subject.units}}</td>
                </tr>
              </tbody>
            </table>
          </b-card>
          <!-- end of subjects -->
        </div>
        <!-- card container -->
      </div>
      <!-- end of verification form -->

      <!-- verification form btn -->
      <b-button
                class="mx-3"
                variant="primary"
                @click="showAddSubject"
                v-if="showVerifyForm"
                ><i class="fa fa-arrow-left" aria-hidden="true"/> Previous
      </b-button>
      <b-button
            class="mx-3 float-right"
            variant="primary"
            @click="enrollStudent"
            v-if="showVerifyForm"
            >Enroll <i class="fa fa-user-plus" aria-hidden="true"/>
      </b-button>
      <!-- verification form btn -->

    </div>
    <!-- end of container -->

  </div>
</template>

<script>

  import Axios from 'axios'
  import axiosRetry from 'axios-retry';
  axiosRetry(Axios, { retries: 3 });
  export default {
    name: 'StudentEnrollmentManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'action', label: '', class: 'text-center'},
          { key: 'subject.subject_code', label: 'Subject Code', sortable: true, class: 'text-center' },
          { key: 'subject.subject_title', label: 'Title', sortable: true, class: 'text-center' },
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 15, 20, 25],
        filter: null,

        semesters: {
          semester: null
        },

        RegStudent: {
          id: null,
          name: null,
          student_number: null
        },

        // form models
        tabIndex: 0,
        student_id: null,
        selectedAcademicYear: this.$store.getters.getCurrentAcademicYear,
        selectedSemester: this.$store.getters.getCurrentSemester,
        selectedStudentStatus: null,
        selectedAcademicStatus: null,
        selectedCourse: null,
        selectedCurriculum: null,
        selectedYearLevel: null,
        selectedDate: null,
        selectedBlock: null,
        full_name: null,
        address: "",

        // form options
        academicYearOptions: this.$store.getters.getAcademicYears,
        semesterOptions: this.$store.getters.getSemesters,
        courseOptions: this.$store.getters.getCourses,
        curriculumOptions: null,
        yearOptions: [],
        subjectOptions: [],
        addedSubjects: [],

        student_number: null,
        student_param: null,
        showStudentForm: true,
        showSubjectsForm: false,
        showVerifyForm: false,
        enrollmentData: null,
        verifyForm: true,
        subjectForm: true,

        // for data validation
        loadOverlay: false,
        studentNumberMessage: null,
        student_numberState: null,
        dateEnrolledState: null,
        studentStatusState: null,
        academicStatusState: null,
        courseState: null,
        curriculumState: null,
        yearLevelState: null,
        blockState: null,

        // for subject checkboxes
        selected: [],
        allSelected: false,
        indeterminate: false,

        // for alert messages
        alertMessage: '',
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0
      }
    },

    mounted() {
      this.test()
      // this.getSemesters();
      // this.getAcademicYear();
      this.getRegisteredStudents()
      // console.log(this.$store.getters.getCourses)
    },

    watch: {
      // whenever question changes, this function will run
      selected: function () {
        var e = document.getElementById("selectAll")
        if(this.selected.length == this.items.length){
          e.checked = true;
        }else{
          e.checked = false;
        }
        console.log("selected : " + this.selected.length + " | items : " + this.items.length)
      }
    },
    methods: {
      selectAll: function(e){
        this.selected = [];
        var e = document.getElementById("selectAll")
        if(e.checked == true){
          var selected = [];
            this.items.forEach(function (item) {
              selected.push(item);
            });
            this.selected = selected;
        }else{
          this.selected = [];
        }
        // if(this.allSelected == 1){
        //   var selected = [];
        //              this.items.forEach(function (item) {
        //                  selected.push(item);
        //              });
        //              this.selected = selected;
        // }else{
        //
        // }
      },

      // enroll student
      enrollStudent: function(){
         this.enrollmentData = {
           academic_year_id	: this.selectedAcademicYear.id,
           semester_id : this.selectedSemester.id,
           student_id	: this.student_id,
           curriculum_id : this.selectedCurriculum.id,
           course_id : this.selectedCourse.id,
           year_level : this.selectedYearLevel,
           block : this.selectedBlock,
           active : 1,
           subjects : this.selected,
           status: 'ENROLLED'
         };

         Axios.post('http://localhost/api/v1/enrollments', this.enrollmentData,{
           headers: { Authorization: 'Bearer ' + this.$store.getters.getToken }
         })
           .then(response => {
             // console.log(response.data.message);
             console.log(response.data);
           })
           .catch(error => {
             console.log(error.response)
           })
      }, // end of function enrollStudent

      getClassSched: function() {
        Axios.get('http://localhost/api/v1/class_schedules', {
          headers: { Authorization: 'Bearer ' + this.$store.getters.getToken }
        })
          .then(response => {
            //console.log(response.data.data);
            this.items = response.data
            this.totalRows = this.items.length
          })
          .catch(error => {
            this.alertMessage = error.response.data.message
            this.dismissErrorCountDown = this.dismissSecs
          })
      }, // end of function getClassSched

      // this function will get all student records
      getRegisteredStudents: function() {
        Axios.get('http://localhost/api/v1/students', {
          headers: { Authorization: 'Bearer ' + this.$store.getters.getToken }
        })
          .then(response => {
            this.rowData = response.data
          })
          .catch(error => {
            console.log(error.response)
          })
      }, // end of function getRegisteredStudents

      // gets all curriculum record
      getCurriculum: function() {
        this.courseState = null;
        var curriculums = this.selectedCourse.curriculum
        if (curriculums.length == 0) {
          this.curriculumOptions = null
        } else {
          this.curriculumOptions = curriculums
        }
        // clears values in select boxes
        this.selectedCurriculum = null;
        this.selectedYearLevel = null;
      }, // end of function getCurriculum

      // SET YEAR LEVEL BASED ON SELECTED COURSE
      setYearLevel: function() {
        this.curriculumState = null;
        if (this.selectedCourse.year == '4') {
          this.yearOptions = [
            { value: '1st Year', text: '1st Year' },
            { value: '2nd Year', text: '2nd Year' },
            { value: '3rd Year', text: '3rd Year' },
            { value: '4th Year', text: '4th Year' }
          ]
        } else if (this.selectedCourse.year == '2') {
          this.yearOptions = [
            { value: '1st Year', text: '1st Year' },
            { value: '2nd Year', text: '2nd Year' }
          ]
        }
        // clears values in select boxes
        this.selectedYearLevel = null;
      }, // end of function setYearLevel

      // get all subject based on selected course, curriculum, year level and semester.
      setSubjects: function(){
        this.yearLevelState = null;
        // clears subject select box
        this.items = []
        this.subjectOptions = [];
        var year = this.selectedYearLevel
        var semester_id = this.selectedSemester.id
        var subjects = this.selectedCurriculum.subjects

        if(subjects.length == 0){
          this.subjectOptions = [];
        }else{
          subjects.forEach(subject => {
            if(subject.year_level == year && subject.semester_id == semester_id){
              this.subjectOptions.push(subject);
            }
          });
        }
        this.items = this.subjectOptions
        this.totalRows = this.items.length;
      }, // end of function setSubjects

      // function for block
      onChangeBlock: function(){
        this.blockState = null;
      }, // end of function block

      // Search student using student number
      searchNumber: function() {
        this.student_number = this.student_number.length == 4 ? this.student_number + '-' : this.student_number
        this.student_number = this.student_number.length == 7 ? this.student_number + '-' : this.student_number
        if (this.student_number.length > 11) {
          let data = this.rowData.filter(obj => obj.student_number == this.student_number)
          if (data.length > 0) {
            var info = data[0]
            var suff = info.suffix_name != null ? info.suffix_name + ',. ' : ', '
            var middle = info.middle_name != null ? info.middle_name : ''
            this.full_name = info.last_name + suff + info.first_name + ' ' + middle
            this.address = info.address
            this.student_id = info.id
            this.student_param = info;
            this.student_numberState = true
          } else {
            this.student_numberState = false
            this.studentNumberMessage = "Student number doesn't exist."
            this.full_name = null
            this.address = null
            this.student_id = null
          }
        } else {
          // sets the state of input box to default
          this.student_numberState  = null
          // set all values to null
          this.address = null
          this.full_name = null
          this.student_id = null
        }
      }, // end of function searchNumber

      // show the final form of enrollment
      showVerify: function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.showSubjectsForm = false;
        this.showVerifyForm = true
      }, // end of showVerifyForm

      // show adding for subjects to be enrolled
      showAddSubject: function(){
        // form validation
        var checker;
        // student number
        if(this.student_number == "" || this.student_number == null){
          this.student_numberState = false
          this.studentNumberMessage = "Student Number is required."
          checker = true;
        }else{
          if(this.student_id == null){
            this.student_numberState = false
            this.studentNumberMessage = "Student number doesn't exist."
            checker = true;
          }
          this.studentStatusState = null;
        }

        // date enrolled
        if(this.selectedDate == null){
          this.dateEnrolledState = false
          checker = true;
        }else{
          this.dateEnrolledState = null;
        }

        // student status
        if(this.selectedStudentStatus == null){
          this.studentStatusState = false;
          checker = true;
        }else{
          this.studentStatusState = null;
        }

        // academic status
        if(this.selectedAcademicStatus == null){
          this.academicStatusState = false;
          checker = true;
        }else{
          this.academicStatusState = null;
        }

        // course
        if(this.selectedCourse == null){
          this.courseState = false;
          checker = true;
        }else{
          this.courseState = null;
        }

        // curriculum
        if(this.selectedCurriculum == null){
          this.curriculumState = false;
          checker = true;
        }else{
          this.curriculumState = null;
        }

        if(this.selectedYearLevel == null){
          this.yearLevelState = false;
          checker = true;
        }else{
          this.yearLevelState = null;
        }

        if(this.selectedBlock == null){
          this.blockState = false;
          checker = true;
        }else{
          this.blockState = null;
        }

        if(checker){

        }else{
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.showStudentForm = false;
          this.showVerifyForm = false
          // hides all form and shows subject form
          this.showSubjectsForm = true;
        }
      }, // end of function showAddSubject

      // show enroll student form
      showEnrollStudet: function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.showStudentForm = true;
        this.showSubjectsForm = false;
      }, // end of showEnrollStudet

      // add selected subject to array addedsubjects
      addSubject: function(index, subject) {
        this.addedSubjects.unshift(subject);
        this.$delete(this.subjectOptions, index);
      }, // end of function addSubject

      // removes selected subject from addedsubjects and returns it to subject option variable
      removeSubject: function(index, addedSubject) {
        this.subjectOptions.push(addedSubject);
        this.$delete(this.addedSubjects, index);
        // sort subjects by id
        this.subjectOptions.sort(function(a, b) {
          return a.id - b.id;
        });
      }, // end of function removeSubject

      // start of testing
      test: function() {
        if (Object.keys(this.$route.params).length === 0) {
          this.RegStudent = {
            id: '',
            name: '',
            student_number: ''
          }
        } else {
          var params = this.$route.params

          var suff = params.suffix_name != null ? params.suffix_name + ',. ' : ', '
          var middle = params.middle_name != null ? params.middle_name : ''

          this.RegStudent = {
            id: this.$route.params.id,
            name: params.last_name + ' ' + suff + ', ' + params.first_name + ' ' + middle,
            // this.$route.params.last_name +" "+this.$route.params.suffix_name+", "+this.$route.params.first_name+" "+this.$route.params.middle_name,
            student_number: this.$route.params.student_number
          }

          this.full_name = params.last_name + suff + params.first_name + ' ' + middle;
          this.student_id = params.id;
          this.student_number = params.student_number;
          this.address = params.address;
          this.student_param = params;
        }
        // console.log(this.$route.params);
      }
    }
  }

</script>
