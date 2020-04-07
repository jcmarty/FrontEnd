<template>
  <div>
    <h1 class="d-print-none">Manage Student Grades</h1>
    <hr class="d-print-none"/>

    <div class="myTable px-4 py-3 my-5">
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
              <option v-if="SubjectsRow === null" value="null" disabled>No Subjects</option>
              <option v-else v-for="data in SubjectsRow" v-bind:value="{id: data.id, subject_code: data.subject_code ,subject_id: data.subject_id}">
                {{data.subject_code}} - {{data.subject.subject.subject_title}}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>


      <!-- Main table element -->
      <b-table
        class="my-3 table-striped"
        show-empty
        responsive
        head-variant="dark"
        bordered
        hover
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter">

        <template v-slot:cell(full_name)="row" >
          <p v-if="row.item.enrollment.student.suffix_name">{{row.item.enrollment.student.last_name}} {{row.item.enrollment.student.suffix_name}}, {{row.item.enrollment.student.middle_name}} {{row.item.enrollment.student.first_name}} </p>
          <p v-else>{{row.item.enrollment.student.last_name}}, {{row.item.enrollment.student.middle_name}} {{row.item.enrollment.student.first_name}} </p>
        </template>

        <template v-slot:cell(prelim_grade)="row" >
          <input type="text" class="Grade" v-model="Grades.prelim_grade"></input>
        </template>

        <template v-slot:cell(midterm_grade)="row" >
          <input type="text" class="Grade" v-model="Grades.midterm_grade"></input>
        </template>

        <template v-slot:cell(prefinal_grade)="row" >
          <input type="text" class="Grade" v-model="Grades.prefinal_grade"></input>
        </template>

        <template v-slot:cell(final_grade)="row" >
          <input type="text" class="Grade" v-model="Grades.final_grade"></input>
        </template>
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
    name: 'StudentGradesManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'enrollment.student.student_number', label: 'Student Number', sortable: true, class: 'text-center' },
          { key: 'full_name', label: 'Student Name', class: 'text-center', sortable: true , class: 'text-center' },
          { key: 'prelim_grade', label: 'Prelim Grade', class: 'text-center', sortable: true , class: 'text-center'},
          { key: 'midterm_grade', label: 'Midterm Grade', class: 'text-center', sortable: true , class: 'text-center' },
          { key: 'prefinal_grade', label: 'Pre-Final Grade', class: 'text-center', sortable: true , class: 'text-center' },
          { key: 'final_grade', label: 'Final Grade', class: 'text-center', sortable: true , class: 'text-center'},
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

        SubjectsRow: null,
        instructorRow: null,
        StudentScheduleRow: null,
        dataFilter: null,

        subjRow: null,

        Grades:{
          prelim_grade: null,
          midterm_grade:null,
          prefinal_grade:null,
          final_grade:null
        }

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
        Axios
          .get('http://localhost/api/v1/class_schedules', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.filteredClass = response.data;

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
          if (studSched[i].subject_id == Subject.subject_id) {
            filteredSub.find(student => {
              return student.enrollment.student.student_number == studSched[i].enrollment.student.student_number
            }) ? console.log() : filteredSub.push(studSched[i]);
          }
        }

        this.items = filteredSub;
        this.totalRows = this.items.length;
        console.log(this.items)
      }
    }
  }
</script>
<style>
  .Grade {
    width: 70px;
  }
</style>
