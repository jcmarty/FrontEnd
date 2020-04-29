<template>
  <div>
  <!-- page title -->
  <h1>Instructors Schedule Report</h1>
  <hr/>

  <!-- Academic Year -->
  <b-col cols="12" md="6" lg="3">
    <b-form-group class="Academic"
                  label="Academic Year"
                  label-for="Academic">
      <b-form-select v-model="selectedAcademicYear" id="Academic">
        <option value="null" hidden>Select Academic</option>
        <option :value="{ id: ay.id, academic_year: ay.academic_year}" v-for="ay in this.$store.getters.getAcademicYears">{{ay.academic_year}}</option>
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
        <option :value="{ id: sem.id, semester: sem.semester}" v-for="sem in this.$store.getters.getSemesters">{{sem.semester}}</option>
      </b-form-select>
    </b-form-group>
  </b-col>
  <!-- Semester  -->



  </div>
</template>

<script>
import Axios from "axios";
import {AgGridVue} from "ag-grid-vue";
import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';

export default {
  name: 'InstructorScheduleReport',
  data() {
    return {
      selectedAcademicYear: this.$store.getters.getCurrentAcademicYear,
      selectedSemester: this.$store.getters.getCurrentSemester,
    }
  },
  beforeMount() {

  },

  mounted () {
    this.backToTop();
    // this.getInstructors();
    // this.getInstructorSchedule();
  },

  methods: {
    getInstructors: function(){
    Axios
      .get('http://localhost/api/v1/instructors', {
        headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
      })
      .then(response => {
        this.rowData = response.data;
      })
    }, // end of function getInstructors


    getInstructorSchedule: function(id){
    Axios
      .get('http://localhost/api/v1/instructors/' + this.selected + '/class_schedules',{
        headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
      })
      .then(response => {
        this.InstructorScheduleRowData = response.data;
      })
    }, // end of function getInstructorSchedule

    backToTop: function(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, // end of backToTop
  }
}
</script>
