<template>

  <div>
    <h1>Manage Student Enrollment</h1>
    <hr/>
    <div class="container">
      <!-- start of stepper -->
      <div class="stepper">
        <ul>
          <li>Academic Information</li>
          <li>Add Subjects</li>
          <li>Verify & Enroll</li>
        </ul>
      </div>
      <!-- end of stepper -->

      <!-- start of panel -->
      <div class="panel panel-primary recordMaintenanceForm" v-if="showStudentForm">
        <div class="panel-heading">Enroll Student</div>
        <div class="panel-body">

          <b-form id="enrollStudentForm">
            <b-form-row>

              <!-- Student Number -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="studentno"
                              label="Student No."
                              label-for="studentNo">
                  <b-form-input type="text"
                                v-model="student_number"
                                id="studentNo"
                                @keyup="searchNumber"
                                :state="state"
                                maxlength=12
                                placeholder="Search Student Number here..."></b-form-input>
                </b-form-group>
              </b-col>
              <!-- Student Number -->

              <!-- fullName -->
              <b-col cols="12" md="6" lg="6">
                <b-form-group class="fullname"
                              label="Full Name"
                              label-for="fullName">
                  <b-form-input type="text"
                                v-model="full_name"
                                id="fullName"
                                required></b-form-input>
                </b-form-group>
              </b-col>
              <!-- fullName -->

              <!-- Date Enrolled-->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="dateEnrolled"
                              label="Date Enrolled"
                              label-for="dateEnrolled">
                  <b-form-input type="date"
                                v-model="selectedDate"
                                id="dateEnrolled"></b-form-input>
                </b-form-group>
              </b-col>
              <!-- Date Enrolled -->

              <!-- Academic Year -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="Academic"
                              label="Academic"
                              label-for="Academic">
                  <b-form-select v-model="selectedAcademic" id="Academic">
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

              <!-- Student Status -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="studentStatus"
                              label="Student Status"
                              label-for="studentStatus">
                  <b-form-select v-model="selectedStudentStatus" id="studentStatus">
                    <option value="null" hidden>Select Student Status</option>
                    <option value="New">New</option>
                    <option value="Old">Old</option>
                    <option value="Transferee">Transferee</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <!-- Student Status -->

              <!-- Academic Status -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="academicstatus"
                              label="Academic Status"
                              label-for="academicStatus">
                  <b-form-select v-model="selectedAcademicStatus" id="academicStatus">
                    <option value="null" hidden>Select Academic Status</option>
                    <option value="Regular">Regular</option>
                    <option value="Irregular">Irregular</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <!-- Academic Status -->

            </b-form-row>

            <b-form-row>
              <!-- Course -->
              <b-col cols="12" md="6" lg="3">
                <b-form-group class="course"
                              label="Course"
                              label-for="Course">
                  <b-form-select v-model="selectedCourse"
                                 id="Course"
                                 :options="courseOptions"
                                 @change="getCurriculum">
                    <option value="null" hidden>Select Course</option>
                  </b-form-select>
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
                                 @change="setYearLevel">
                    <option value="null" hidden>Select Curriculum</option>
                    <option v-for="curriculum in curriculumOptions " v-bind:value="{id: curriculum.id, subjects: curriculum.curriculum_subjects}">{{curriculum.curriculum_title}}</option>
                  </b-form-select>
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
                                 @change="setSubjects">
                    <option value="null" hidden>Select Year Level</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <!-- yearLevel -->

              <!-- enroll button -->
              <b-col cols="12" md="6" lg="3">
                <b-button class="mt-4"
                          variant="success"
                          @click="showAddSubject"
                          block>
                  Enroll
                </b-button>
              </b-col>
              <!-- enroll button -->

            </b-form-row>
          </b-form> <!-- end of b-form -->
        </div> <!--end of panel body -->
      </div> <!-- end of panel primary -->

      <!-- Form for Enrolling Subjects -->

      <div class="conatiner d-flex flex-row justify-content-between" v-if="showSubjectsForm">
        <!-- Subjects per course -->
        <div class="w-50 mr-2 p-3 d-flex flex-column bg-white shadow-sm">
          <p class="h6 text-dark mb-3" align="center" v>{{selectedCourse.course_code}} / {{selectedYearLevel}} / {{selectedSemester.semester}}</p>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Subject Code</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- loop subject record here -->
              <tr :key="index" v-for="subject, index in subjectOptions" class="subjectBtn">
                <td width="25%"align="center">{{subject.subject.subject_code}}</td>
                <td width="65%" align="center">{{subject.subject.subject_description}}</td>
                <td width="10%" align="center">
                  <b-button size="sm" variant="success":value="subject" @click="addSubject(index,subject)">+</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- subjects to be enrolled -->
        <div class="w-50 ml-2 p-3 d-flex flex-column bg-white shadow-sm">
          <p class="h6 text-dark mb-3" align="center">Subject to be Enrolled</p>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Subject Code</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="addedSubject, index in addedSubjects" class="subjectBtn">
                <td width="25%" align="center">{{addedSubject.subject.subject_code}}</td>
                <td width="65%" align="center">{{addedSubject.subject.subject_description}}</td>
                <td width="10%" align="center">
                  <b-button size="sm" variant="warning" :value="addedSubject" @click="removeSubject(index, addedSubject)">x</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- end of table -->
    </div>
    <!-- end of container -->
  </div>

</template>

<script>

  import Axios from 'axios'
  export default {
    name: 'StudentEnrollmentManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'room_number', label: 'Room Number', class: 'text-center', sortable: true },
          { key: 'room_name', label: 'Room Name', sortable: true, class: 'text-center' },
          { key: 'room_type', label: 'Room Type', sortable: true, class: 'text-center' },
          { key: 'room_capacity', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions', class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
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
        state: null,
        student_id: null,
        selectedAcademic: this.$store.getters.getCurrentAcademicYear,
        selectedSemester: this.$store.getters.getCurrentSemester,
        selectedStudentStatus: null,
        selectedAcademicStatus: null,
        selectedCourse: null,
        selectedCurriculum: null,
        selectedYearLevel: null,
        selectedDate: null,
        full_name: null,

        // form options
        academicYearOptions: this.$store.getters.getAcademicYears,
        semesterOptions: this.$store.getters.getSemesters,
        courseOptions: this.$store.getters.getCourses,
        curriculumOptions: null,
        yearOptions: [],
        subjectOptions: [],
        addedSubjects: [],

        student_number: null,
        displaSelectedSemester: null,
        showStudentForm: true,
        showSubjectsForm: false,
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
    },

    methods: {
      // show adding for subjects to be enrolled
      showAddSubject: function(){
        this.showStudentForm = false;
        this.showSubjectsForm = true;
      }, // end of function showAddSubject

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
            this.student_id = info.id
            this.state = true
          } else {
            this.state = false
            this.full_name = null
            this.student_id = null
          }
        } else {
          // sets the state of input box to default
          this.state = null
          // set all values to null
          this.full_name = null
          this.student_id = null
        }
      }, // end of function searchNumber

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
        var curriculums = this.selectedCourse.curriculum
        if (curriculums.length == 0) {
          this.curriculumOptions = null
        } else {
          this.curriculumOptions = curriculums
        }
      }, // end of function getCurriculum

      // SET YEAR LEVEL BASED ON SELECTED COURSE
      setYearLevel: function() {
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
      }, // end of function setYearLevel

      // get all subject based on selected course, curriculum, year level and semester.
      setSubjects: function(){
        // clears subject select box
        this.addedSubjects = [];
        this.subjectOptions = [];
        var year = this.selectedYearLevel
        var sem = this.selectedSemester
        var subjects = this.selectedCurriculum.subjects

        if(subjects.length == 0){
          this.subjectOptions = [];
        }else{
          for(var i = 0; i < subjects.length; i++){
            if(subjects[i].year_level == year && subjects[i].semester_id == sem){
                this.subjectOptions.push(subjects[i]);
            }
          }
        }
      }, // end of function setSubjects

      // start of testing
      test: function() {
        if (Object.keys(this.$route.params).length === 0) {
          this.RegStudent = {
            id: '',
            name: '',
            student_number: ''
          }
        } else {
          var p = this.$route.params

          var suff = p.suffix_name != null ? p.suffix_name + ',. ' : ', '
          var middle = p.middle_name != null ? p.middle_name : ''

          this.RegStudent = {
            id: this.$route.params.id,
            name: p.last_name + ' ' + suff + ', ' + p.first_name + ' ' + middle,
            // this.$route.params.last_name +" "+this.$route.params.suffix_name+", "+this.$route.params.first_name+" "+this.$route.params.middle_name,
            student_number: this.$route.params.student_number
          }

          this.full_name = p.last_name + suff + p.first_name + ' ' + middle
          this.student_id = p.id
          this.student_number = this.$route.params.student_number
        }
        // console.log(this.$route.params);
      }
    }
  }

</script>
