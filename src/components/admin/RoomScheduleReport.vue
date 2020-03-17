<template>
  <div>
    <h1>Room Schedule Report</h1><hr/>

  <b-col cols="12" md="6" lg="2">
    <b-form-group
      class="roomnumber"
      label="Select Room No."
      label-for="RoomNo">
      <b-form-select
        id="RoomNo"
        v-model="selected"
        @change="getRoomSchedule()">
        <option v-for="rooms in rowData"
        v-bind:value="rooms.id">{{rooms.room_number}}</option>
      </b-form-select>
    </b-form-group>
  </b-col>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="RoomScheduleRowData"
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
import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';

    export default {
        name: 'RoomScheduleReport',
        data() {
            return {
              columnDefs: null,
              rowData: null,
              RoomScheduleRowData: null,
              gridOptions: null,
              id: null,

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
                {headerName: 'ID', field: 'subject_id', sortable: true, filter: true, width: 80},
                {headerName: 'Day', field: 'day', sortable: true, filter: true, width: 150,},
                {headerName: 'Time Start', field: 'time_start', sortable: true, filter: true, width: 150},
                {headerName: 'Time End', field: 'time_end', sortable: true, filter: true, width: 150},
                {headerName: 'Room ID.', field: 'room_id', sortable: true, filter: true, width: 150},
                {headerName: 'Instructor ID.', field: 'instructor_id', sortable: true, filter: true, width: 150},
                {headerName: 'Block', field: 'block', sortable: true, filter: true, width: 150},
                {headerName: 'Batch', field: 'batch', sortable: true, filter: true, width: 150},
                {headerName: 'Class Type', field: 'class_type', sortable: true, filter: true, width: 150},
                {headerName: 'Academic Year', field: 'academic_year_id', sortable: true, filter: true, width: 150},
                {headerName: 'Semester', field: 'semester_id', sortable: true, filter: true, width: 150},
            ];

          },
          mounted () {
            this.getRooms();
            this.getRoomSchedule();
          },

          methods: {
            getRooms: function(){
              Axios
                .get('http://localhost/api/v1/rooms', {
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  //console.log(response.data.data);
                  this.rowData = response.data;
                })
            },
            getRoomSchedule: function(id){
              Axios
                .get('http://localhost/api/v1/rooms/' + this.selected + '/schedules ',{
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  //console.log(response.data.data);
                  this.RoomScheduleRowData = response.data;
                })
            },

            }
          }
</script>
