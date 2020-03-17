<template>
  <div>
    <h1>Students Report</h1><hr/>

    <b-col cols="12" md="6" lg="2">
      <b-form-group
        class="course"
        label="Select Course"
        label-for="Course">
        <b-form-select
          id="Course"
          v-model="SelectedCourse"
          @change="">
          <option v-for="course in CourseRow"
          v-bind:value="course.id">{{course.course_code}}</option>
        </b-form-select>
      </b-form-group>
    </b-col>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="EnrolledStudentsRow"
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
        name: 'StudentsReport',
        data() {
            return {
              columnDefs: null,
              EnrolledStudentsRow: null,
              CourseRow: null,
              gridOptions: null,
              id: null,

              SelectedCourse: null,
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
            this.columnDefs = [
                {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 150 },
                {headerName: 'Student Number', field: 'student.student_number', sortable: true, filter: true, width: 150},
                {headerName: 'Student Name', field: 'subject.subject.subject_description', sortable: true, filter: true, width: 150, resizable: true},
                {headerName: 'Course', field: 'course.course_code', sortable: true, filter: true, width: 150,},
                {headerName: 'Year Level', field: 'year_level', sortable: true, filter: true, width: 150},
                // {headerName: 'Time End', field: 'time_end', sortable: true, filter: true, width: 150},
                // {headerName: 'Instructor', field: 'instructor_id', sortable: true, filter: true, width: 150},
                // {headerName: 'Block', field: 'block', sortable: true, filter: true, width: 150},
                // {headerName: 'Batch', field: 'batch', sortable: true, filter: true, width: 150},
                // {headerName: 'Class Type', field: 'class_type', sortable: true, filter: true, width: 150},
                // {headerName: 'Academic Year', field: 'academic_year_id', sortable: true, filter: true, width: 150},
                // {headerName: 'Semester', field: 'semester_id', sortable: true, filter: true, width: 150},
            ];

          },
          mounted () {
            this.getEnrolledStudents();
            this.getCourse();
            // this.getRoomSchedule();
          },

          methods: {
            getEnrolledStudents: function(){
              Axios
                .get('http://localhost/api/v1/enrollments', {
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  //console.log(response.data.data);
                  this.EnrolledStudentsRow = response.data;
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
              })
          }


            // getRoomSchedule: function(id){
            //   Axios
            //     .get('http://localhost/api/v1/rooms/' + this.selected + '/schedules ',{
            //       headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            //     })
            //     .then(response => {
            //       //console.log(response.data.data);
            //       this.RoomScheduleRowData = response.data;
            //     })
            // },

            }
    }
</script>
