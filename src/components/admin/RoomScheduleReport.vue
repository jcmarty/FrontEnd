<template>
  <div>
    <h1 class="d-print-none">Room Schedule Report</h1>
    <hr class="d-print-none"/>
    <div class="px-4">
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
          <b-form-select id="Semester" v-model="selectedSemester" @change="changeSemester">
            <option value="null" hidden>Select Semester</option>
            <option  :value="{id: sem.id, semester: sem.semester}" v-for="sem in semesterOptions" >{{sem.semester}}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="2">
        <b-form-group class="roomnumber" label="Room No." label-for="RoomNo">
          <b-form-select id="RoomNo" v-model="selectedRoom" @change="getFilteredClassSchedule()">
            <option value="null" hidden>Select Room</option>
            <option v-for="rooms in rowData" :value="rooms.id">{{rooms.room_number}}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col class="py-4">
        <!-- Add New Room Button -->
        <b-button variant="primary" onclick="window.print()">
          Print
        </b-button>
      </b-col>
  </b-form-row>





  <div class="d-print-none mt-4 mb-4 px-4 pt-4 bg-white shadow rounded">
    <center>
      <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="responsive d-none d-print-block" id="ComteqLogoPrint"/>
    </center>

    <b-form-row class="d-none d-print-block">
        <center>
          <h5>COMTEQ Computer & Business College</h5>
          <h6>1200 4th floor Savers Appliance Depot, Rizal Ave, East Tapinac Olongapo City Zambales. </h6>
      </center>
    </b-form-row>

    <b-form-row class="d-none d-print-block">
        <center><br/>
          <h6>SY ({{selectedAcademicYear.academic_year}})</h6>
          <h6>{{selectedSemester.semester}}</h6>
          <h6 v-if="selectedRoom === null">" "</h6>
          <h6 v-else>{{selectedRoom.room_id}}</h6>
      </center>
    </b-form-row>
    <!-- Main table element -->
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
</div>
    <!-- end of table -->

  </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: 'RoomScheduleReport',
        data() {
            return {
              items: [],
              fields: [
                { key: 'course_code', label: 'Course Code', class: 'text-center', sortable: true},
                { key: 'year_level', label: 'Year Level', sortable: true, class: 'text-center' },
                { key: 'subject_code', label: 'Subject Code', sortable: true, class: 'text-center' },
                { key: 'subject.subject.subject_title', label: 'Subject Title', sortable: true, class: 'text-center' },
                { key: 'day', label: 'Day', sortable: true, class: 'text-center' },
                // { key: 'time_start', label: 'Time Start', sortable: true, class: 'text-center' },
                // { key: 'time_end', label: 'Time End', sortable: true, class: 'text-center' },
                { key: 'time', label: 'Time', sortable: true, class: 'text-center',
                sortByFormatted: true,
                formatter: (value, key, item) => {
                  return this.timeFormatter(item.time_start) + "-" + this.timeFormatter(item.time_end);
                  // return item.time_start  + "-" + item.time_end;
                  }
                },
                { key: 'block', label: 'Block', sortable: true, class: 'text-center' },

              ],
              rowData: null,
              totalRows: 1,
              currentPage: 1,
              perPage: 5,
              pageOptions: [5, 10, 15, 20, 25],
              filter: null,

              academicYearOptions: this.$store.getters.getAcademicYears,
              semesterOptions: this.$store.getters.getSemesters,
              selectedAcademicYear: this.$store.getters.getCurrentAcademicYear,
              selectedSemester: this.$store.getters.getCurrentSemester,

              selectedRoom: 0,
            }
        },

          mounted () {
            this.getRooms();
            this.getFilteredClassSchedule();
          },

          methods: {
            // gets all created schedule
            getFilteredClassSchedule: function(){
              Axios
                .get('http://localhost/api/v1/class_schedules', {
                  params: {
                    room_id: this.selectedRoom,
                    academic_year_id: this.selectedAcademicYear.id,
                    semester_id: this.selectedSemester.id,
                    active: 1,
                  },
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  this.items = response.data;
                  this.totalRows = this.items.length;
                  console.log(response.data)
                })
            },

            getRooms: function(){
              Axios
                .get('http://localhost/api/v1/rooms', {
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  // console.log(response.data);
                  this.rowData = response.data;
                })
              },

              // clears selected values when semester select box has changed
              changeSemester: function(){
                // clears select boxes
                this.day_options = [];
                this.time_start_options = []
                this.SubjectsRow = [];
                this.instructorRow = null;
                this.roomRow = null;

                // clear select box selected values
                // this.selectedCurriculum = null;
                this.selectedYearLevel = null;
                this.selectedSubject = null;
                this.selectedBlock = null;
                this.selectedBatch = null;
                this.selectedInstructor = null;
                this.selectedRoom = null;
                this.selectedDay = null;
                this.selectedTimeStart = null;
              },

              timeFormatter : function(time){

                var split = time.split(":");
                var hour = split[0];
                var min = split[1];

                var h = hour % 12 || 12;
                var ampm = (hour < 12 || hour == 24) ? "AM" : "PM";
                return h + ":" + min + ampm;
              },
            }
          }
</script>
<style type="text/css">
  @media print{
    @page{
      size:landscape;
      margin: 0;
    }
  }
  #ComteqLogoPrint{
    height: 100px;
  }
  /* .pagebreak { page-break-before: disable; } */

</style>
