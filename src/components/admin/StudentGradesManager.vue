<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Manage Student Grades</h1>
    <hr class="d-print-none"/>

    <div class="px-4 py-3 mt-4 mx-3 shadow rounded bg-white">
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
            <b-form-select id="Semester" v-model="selectedSemester" @change="">
              <option value="null" hidden>Select Semester</option>
              <option  :value="{id: sem.id, semester: sem.semester}" v-for="sem in semesterOptions" >{{sem.semester}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group class="instructor" label="Instructor" label-for="Instructor">
            <b-form-select id="Instructor" @change="getSubject" v-model="selectedInstructor">
              <option value="null" hidden>Select Instructor</option>
              <option v-if="instructorRow === null" value="null" disabled>No Instructors</option>
              <option v-else v-for="data in instructorRow" v-bind:value="data.id">{{data.last_name}}, {{data.middle_name}} {{data.first_name}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group class="subject" label="Subject" label-for="Subject">
            <b-form-select id="Subject" @change="filterStudentSchedule" v-model="selectedSubject">
              <option value="null" hidden>Select Subject</option>
              <option v-if="SubjectsRow.length == 0" value="null" disabled>No Subjects</option>
              <option v-else v-for="data in SubjectsRow" v-bind:value="{id: data.id, subject_code: data.subject_code ,subject_id: data.subject_id}">
                {{data.subject_code}} - {{data.subject.subject.subject_title}}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- Alert Message -->
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
      <!-- Main table element -->
      <b-overlay :show="isLoading" rounded="sm">
      <b-table
        class="my-3 table-striped"
        show-empty
        responsive
        bordered
        hover
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter">


        <!-- <template v-slot:cell(full_name)="row" >
          <p v-if="row.item.enrollment.student.suffix_name">{{row.item.enrollment.student.last_name}} {{row.item.enrollment.student.suffix_name}}, {{row.item.enrollment.student.middle_name}} {{row.item.enrollment.student.first_name}} </p>
          <p v-else>{{row.item.enrollment.student.last_name}}, {{row.item.enrollment.student.middle_name}} {{row.item.enrollment.student.first_name}} </p>
        </template> -->

        <template v-slot:cell(prelim_grade)="row" >
          <input type="number" class="Grade" v-model="row.item.prelim_grade" :disabled="input_status.prelim_disabled" min="0" max="100"/>
        </template>

        <template v-slot:head(prelim_grade)="row" >
            <b-form-group class="Prelim" label="Prelim Grades" label-for="Prelim">
              <b-button v-if="input_status.prelim_disabled" size="sm" variant="warning" :hidden="hidebutton"
                  @click="input_status = {
                    prelim_disabled: false,
                    midterm_disabled: true,
                    prefinal_disabled: true,
                    final_disabled: true,
                    semestral_disabled: true
                  }"
              >
                  <i class="fa fa-pencil"></i>
              </b-button>

              <b-button v-if="!input_status.prelim_disabled" size="sm" variant="success" @click="PrelimSaveGrades">
                <i class="fa fa-save"></i>
              </b-button>
            </b-form-group>
        </template>

        <template v-slot:cell(midterm_grade)="row" >
          <input type="number" class="Grade" v-model="row.item.midterm_grade" :disabled="input_status.midterm_disabled" min="0" max="100"></input>
        </template>

        <template v-slot:head(midterm_grade)="row" >
            <b-form-group class="Midterm" label="Midterm Grades" label-for="Midterm">
              <b-button v-if="input_status.midterm_disabled" size="sm" variant="warning" :hidden="hidebutton"
                  @click="input_status = {
                    prelim_disabled: true,
                    midterm_disabled: false,
                    prefinal_disabled: true,
                    final_disabled: true,
                    semestral_disabled: true
                  }"
              >
                  <i class="fa fa-pencil"></i>
              </b-button>

              <b-button v-if="!input_status.midterm_disabled" size="sm" variant="success" @click="MidtermSaveGrades">
                <i class="fa fa-save"></i>
              </b-button>
            </b-form-group>
        </template>

        <template v-slot:cell(prefinal_grade)="row" >
          <input type="number" class="Grade" v-model="row.item.prefinal_grade" :disabled="input_status.prefinal_disabled" min="0" max="100"></input>
        </template>

        <template v-slot:head(prefinal_grade)="row" >
            <b-form-group class="Prefinal" label="Prefinal Grades" label-for="Prefinal">
              <b-button v-if="input_status.prefinal_disabled" size="sm" variant="warning" :hidden="hidebutton"
                  @click="input_status = {
                    prelim_disabled: true,
                    midterm_disabled: true,
                    prefinal_disabled: false,
                    final_disabled: true,
                    semestral_disabled: true
                  }"
              >
                  <i class="fa fa-pencil"></i>
              </b-button>

              <b-button v-if="!input_status.prefinal_disabled" size="sm" variant="success" @click="PrefinalSaveGrades">
                <i class="fa fa-save"></i>
              </b-button>
            </b-form-group>
        </template>

        <template v-slot:cell(final_grade)="row" >
            <input type="number" class="Grade" v-model="row.item.final_grade" :disabled="input_status.final_disabled" min="0" max="100"></input>
        </template>

        <template v-slot:head(final_grade)="row" >
            <b-form-group class="Final" label="Final Grades" label-for="Final">
              <b-button v-if="input_status.final_disabled" size="sm" variant="warning" :hidden="hidebutton"
                  @click="input_status = {
                    prelim_disabled: true,
                    midterm_disabled: true,
                    prefinal_disabled: true,
                    final_disabled: false,
                    semestral_disabled: true
                  }"
              >
                  <i class="fa fa-pencil"></i>
              </b-button>

              <b-button v-if="!input_status.final_disabled" size="sm" variant="success" @click="FinalSaveGrades">
                <i class="fa fa-save"></i>
              </b-button>
            </b-form-group>
        </template>

        <!-- <template v-slot:cell(semestral)="row" > -->
          <!-- <input type="text" class="Grade" :disabled="input_status.semestral_disabled" :value="(row.item.prelim_grade + row.item.midterm_grade + row.item.prefinal_grade + row.item.final_grade) / 4 "> -->
            <!-- <input type="text" class="Grade" v-model="row.item.prelim_grade" :disabled="input_status.semestral_disabled" >
            </input> -->

        <!-- </template> -->
      </b-table>
    </b-overlay>


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
    name: 'StudentGradesManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'enrollment.student.student_number', label: 'Student Number', sortable: true, class: 'text-center' },
          {
            key: 'full_name',
            label: 'Full Name',
            class: 'text-center',
            sortable: true,
            sortByFormatted: true,
            formatter: (value, key, item) => {
              var suffix = item.enrollment.student.suffix_name? " " + item.enrollment.student.suffix_name: "";
              var middle = item.enrollment.student.middle_name? " " + item.enrollment.student.middle_name: "";
              return item.enrollment.student.last_name  + suffix + ', ' + item.enrollment.student.first_name + middle;
            },
          },
          { key: 'prelim_grade', label: 'Prelim Grade', class: 'text-center'},
          { key: 'midterm_grade', label: 'Midterm Grade', class: 'text-center'},
          { key: 'prefinal_grade', label: 'Pre-Final Grade', class: 'text-center'},
          { key: 'final_grade', label: 'Final Grade', class: 'text-center'},
          {
            key: 'semestral',
            label: 'Semestral Grade',
            class: 'text-center',
            sortable: true,
            sortByFormatted: true,
            formatter: (value, key, item) => {
              var prelim = item.prelim_grade? item.prelim_grade : 0;
              var midterm = item.midterm_grade? item.midterm_grade : 0;
              var prefinal = item.prefinal_grade? item.prefinal_grade : 0;
              var final = item.final_grade? item.final_grade : 0;

              var totalGrade = parseFloat(prelim) + parseFloat(midterm) + parseFloat(prefinal) + parseFloat(final);
              var semestralGrade = totalGrade / 4
              // limiting semestral grade to 2 decimal places
              var roundedNumber = Math.round(semestralGrade, 0);
              item.semestral = roundedNumber;
              return parseFloat(item.semestral).toFixed(2);
            },
          },
          {
            key: 'figure',
            label: 'Figure',
            class: 'text-center',
            sortable: true,
            sortByFormatted: true,
            formatter: (value, key, item) => {
              var prelim = item.prelim_grade? item.prelim_grade : 0;
              var midterm = item.midterm_grade? item.midterm_grade : 0;
              var prefinal = item.prefinal_grade? item.prefinal_grade : 0;
              var final = item.final_grade? item.final_grade : 0;
              var semestralGrade = item.semestral;
              if (semestralGrade < 75 ) {
                var num  = 5.00;
                num = num.toFixed( 2 )
                item.figure = num;
                return(5.00);
              }
              else if (semestralGrade >= 75 && semestralGrade < 78) {
                var num  = 3.00;
                num = num.toFixed( 2 )
                item.figure = num;
                 return(3.00);
              }
              else if (semestralGrade >= 78 && semestralGrade < 80) {
                var num  = 2.75;
                num = num.toFixed( 2 )
                item.figure = num;
                 return(2.75);
              }
              else if (semestralGrade >= 80 && semestralGrade < 83) {
                var num  = 2.50;
                num = num.toFixed( 2 )
                item.figure = num;
                 return(2.50);
              }
              else if (semestralGrade >= 83 && semestralGrade < 85) {
                var num  = 2.25;
                num = num.toFixed( 2 )
                item.figure = num;
                return(2.25);
              }
              else if (semestralGrade >= 85 && semestralGrade < 88) {
                var num  = 2.00;
                num = num.toFixed( 2 )
                item.figure = num;
                return(2.00);
              }
              else if (semestralGrade >= 88 && semestralGrade < 91) {
                var num  = 1.75;
                num = num.toFixed( 2 )
                item.figure = num;
                 return(1.75);
              }
              else if (semestralGrade >= 91 && semestralGrade < 94) {
                var num  = 1.50;
                num = num.toFixed( 2 )
                item.figure = num;
                 return(1.50);
              }
              else if (semestralGrade >= 94 && semestralGrade < 96) {
                var num  = 1.25;
                num = num.toFixed( 2 )
                item.figure = num;
                return(1.25);
              }
              else if (semestralGrade >= 96 && semestralGrade <= 100) {
                var num  = 1.00;
                num = num.toFixed( 2 )
                item.figure = num;
                 return(1.00);
              }

            },
          },
          {
            key: 'remarks',
            label: 'Remarks',
            class: 'text-center',
            sortable: true,
            sortByFormatted: true,
            formatter: (value, key, item) => {
              var prelim = item.prelim_grade? item.prelim_grade : 0;
              var midterm = item.midterm_grade? item.midterm_grade : 0;
              var prefinal = item.prefinal_grade? item.prefinal_grade : 0;
              var final = item.final_grade? item.final_grade : 0;
              var semestralGrade = item.semestral;
              var fa = "FAILED";
              var ps = "PASSED";
              var inc = "INCOMPLETE";
              if (prelim == 0 || midterm == 0 || prefinal == 0 || final == 0 ) {
                item.remarks = inc;
                return(inc);
              }
              else if (semestralGrade < 75 ) {
                item.remarks = fa;
                return(fa);
              }
              else if (semestralGrade >= 75 ) {
                item.remarks = ps;
                return(ps);
              }

            },
          },
        ],

        filteredClass: [],
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

        selectedInstructor: null,
        selectedSubject: null,
        selectedAcademicYear: this.$store.getters.getCurrentAcademicYear,
        selectedSemester: this.$store.getters.getCurrentSemester,

        academicYearOptions: this.$store.getters.getAcademicYears,
        semesterOptions: this.$store.getters.getSemesters,

        SubjectsRow: [],
        instructorRow: null,
        StudentScheduleRow: null,
        dataFilter: null,

        subjRow: null,

        Grades:{
          prelim_grade: null,
          midterm_grade:null,
          prefinal_grade:null,
          final_grade:null,
          semestral: null,
        },

        input_status: {
          prelim_disabled: true,
          midterm_disabled: true,
          prefinal_disabled: true,
          final_disabled: true,
          semestral_disabled: true
        },

        isLoading: false,

        hidebutton: true

      }
    },

    mounted () {
      this.getFilteredClassSchedule();
      this.getInstructors();
      this.getSubject();
      this.getStudentSchedule();
    },

    methods:{

      // gets all created schedule
      getFilteredClassSchedule: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/class_schedules', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.filteredClass = response.data;
            this.isLoading = false
          })
      },

      // gets all instructor that prefers the selected subject
      getInstructors: function(){
        Axios
          .get('http://localhost/api/v1/instructors', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.instructorRow = response.data;
          })

      },

      getSubject: function(){
        var class_schedules = this.filteredClass;
        var filtered_subject = [];

        for (var i = 0; i < class_schedules.length; i++) {
          if (class_schedules[i].instructor_id == this.selectedInstructor && class_schedules[i].academic_year_id == this.selectedAcademicYear.id && class_schedules[i].semester_id == this.selectedSemester.id) {
            filtered_subject.find(subject => {
              return subject.subject_code == class_schedules[i].subject_code
            }) ? console.log() : filtered_subject.push(class_schedules[i]);

            // !filtered_subject.includes(/class_schedules[i].subject_code) ? filtered_subject.push(class_schedules[i]) === -1 : console.log();
            // filtered_subject.push(class_schedules[i])/
          }
        }
        this.SubjectsRow = filtered_subject;
        this.selectedSubject = null;
        console.log(this.SubjectsRow );

    },

      getStudentSchedule: function(){
        Axios
          .get('http://localhost/api/v1/student_schedules', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.StudentScheduleRow = response.data;
          })
      },

      filterStudentSchedule: function(){
        var Subject = this.selectedSubject;
        var studSched = this.StudentScheduleRow;
        var filteredSub = [];
        for (var i = 0; i < studSched.length; i++) {
          if (studSched[i].subject_id == Subject.subject_id && studSched[i].enrollment.academic_year_id == this.selectedAcademicYear.id && studSched[i].enrollment.semester_id == this.selectedSemester.id ) {
            filteredSub.push(studSched[i]);
          }
        }

        this.items = filteredSub;
        this.totalRows = this.items.length;
        this.hidebutton = false;

      },

      PrelimSaveGrades: function(){
        // console.log(this.items);
        this.input_status = {
          prelim_disabled: true,
          midterm_disabled: true,
          prefinal_disabled: true,
          final_disabled: true,
          semestral_disabled: true
        }

        for (var i = 0; i < this.items.length; i++) {
          Axios
            .put('http://localhost/api/v1/student_schedules/' + this.items[i].id , this.items[i],{
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              this.getFilteredClassSchedule();
              this.alertMessage = response.data.message;
              this.dismissSuccessCountDown = this.dismissSecs;
            })
            .catch(error => {
              this.alertMessage = error.response.data.message;
              const values = Object.values(error.response.data.errors);
              for(const val of values){
                for(const err of val){
                  this.errors.push(err);
                }
              }
              this.dismissErrorCountDown = this.dismissSecs;
            });
        }

      },

      MidtermSaveGrades: function(){
        this.input_status = {
          prelim_disabled: true,
          midterm_disabled: true,
          prefinal_disabled: true,
          final_disabled: true,
          semestral_disabled: true
        }

        for (var i = 0; i < this.items.length; i++) {
          Axios
            .put('http://localhost/api/v1/student_schedules/' + this.items[i].id , this.items[i],{
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              this.getFilteredClassSchedule();
              this.alertMessage = "Students Grade Successfully Upddated.";
              this.dismissSuccessCountDown = this.dismissSecs;
            })
            .catch(error => {
              this.alertMessage = error.response.data.message;
              const values = Object.values(error.response.data.errors);
              for(const val of values){
                for(const err of val){
                  this.errors.push(err);
                }
              }
              this.dismissErrorCountDown = this.dismissSecs;
            });
        }
      },

      PrefinalSaveGrades: function(){
        this.input_status = {
          prelim_disabled: true,
          midterm_disabled: true,
          prefinal_disabled: true,
          final_disabled: true,
          semestral_disabled: true
        }

        for (var i = 0; i < this.items.length; i++) {
          Axios
            .put('http://localhost/api/v1/student_schedules/' + this.items[i].id , this.items[i],{
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              this.getFilteredClassSchedule();
              this.alertMessage = response.data.message;
              this.dismissSuccessCountDown = this.dismissSecs;
            })
            .catch(error => {
              this.alertMessage = error.response.data.message;
              const values = Object.values(error.response.data.errors);
              for(const val of values){
                for(const err of val){
                  this.errors.push(err);
                }
              }
              this.dismissErrorCountDown = this.dismissSecs;
            });
        }
      },

      FinalSaveGrades: function(){
        this.input_status = {
          prelim_disabled: true,
          midterm_disabled: true,
          prefinal_disabled: true,
          final_disabled: true,
          semestral_disabled: true
        }
        for (var i = 0; i < this.items.length; i++) {

          Axios
            .put('http://localhost/api/v1/student_schedules/' + this.items[i].id , this.items[i],{
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              this.getFilteredClassSchedule();
              this.alertMessage = response.data.message;
              this.dismissSuccessCountDown = this.dismissSecs;
            })
            .catch(error => {
              this.alertMessage = error.response.data.message;
              const values = Object.values(error.response.data.errors);
              for(const val of values){
                for(const err of val){
                  this.errors.push(err);
                }
              }
              this.dismissErrorCountDown = this.dismissSecs;
            });
        }
      },

      SemestralGradeComputation: function(){
        var SemestralGrade;
        var data = this.items;



        for (var i = 0; i < data.length; i++) {
          SemestralGrade = data[i].prelim_grade + data[i].midterm_grade + data[i].prefinal_grade + data[i].final_grade / 4;
          data[i].semestral = SemestralGrade;
        }

      }

    }
  }
</script>
<style>
  .Grade {
    width: 50px;
    text-align: center;
  }
</style>
