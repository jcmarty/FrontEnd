<template>
  <div>
    <h1>Instructors Schedule Report</h1><hr/>

  <b-col cols="12" md="6" lg="2">
    <b-form-group
      class="middlename"
      label="Select Instructor"
      label-for="middlename">
      <b-form-select
        id="day"
        v-model="selected"
        @change="getInstructorSchedule()">
        <option v-for="ins in rowData"
        v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
      </b-form-select>
    </b-form-group>
  </b-col>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="InstructorScheduleRowData"
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
        name: 'InstructorScheduleReport',
        data() {
            return {
              subjectsColumnDefs: null,
              columnDefs: null,
              rowData: null,
              InstructorScheduleRowData: null,
              gridOptions: null,
              id: null,
              instructorId: null,
              Instructor: {
                employee_id: null,
                instructor_id: null,
                academic_year_id: null,
                semester_id: null,
                time_start: null,
                time_end: null,
                day: null,
                first_name: null,
                last_name: null,
              },
                selected: null,
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
                {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 150},
                {headerName: 'Subject Code', field: 'subject.subject.subject_code', sortable: true, filter: true, width: 150},
                {headerName: 'Subject Description', field: 'subject.subject.subject_description', sortable: true, filter: true, width: 150, resizable: true},
                {headerName: 'Day', field: 'day', sortable: true, filter: true, width: 150,},
                {headerName: 'Time Start', field: 'time_start', sortable: true, filter: true, width: 150},
                {headerName: 'Time End', field: 'time_end', sortable: true, filter: true, width: 150},
                {headerName: 'Room No.', field: 'room_id', sortable: true, filter: true, width: 150},

            ];

          },
          mounted () {
            this.getInstructors();
            this.getInstructorSchedule();
          },

          methods: {
            getInstructors: function(){
              Axios
                .get('http://localhost/api/v1/instructors', {
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  //console.log(response.data.data);
                  this.rowData = response.data;
                })
            },
            getInstructorSchedule: function(id){
              Axios
                .get('http://localhost/api/v1/instructors/' + this.selected + '/class_schedules',{
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  //console.log(response.data.data);
                  this.InstructorScheduleRowData = response.data;
                })
            },

            }
          }
</script>
