<template>
  <div>
    <h1 class="d-print-none">Room Schedule Report</h1>
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

      <!-- <b-form-row class="d-print-none">
        <b-col class="ml-3 mt-2"  cols="12" md="6" lg="2">
          <b-form-group class="academicyear" label="Academic Year" label-for="academicYear">
            <b-form-select id="academicYear" v-model="selectedAcademicYear" @change="">
              <option value="null" hidden>Select Academic Year</option>
              <option  :value="ay.id" v-for="ay in academicYearOptions" >{{ay.academic_year}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col class="ml-3 mt-2" cols="12" md="6" lg="2">
          <b-form-group class="semester" label="Semester" label-for="Semester">
            <b-form-select id="Semester" v-model="selectedSemester" @change="changeSemester">
              <option value="null" hidden>Select Semester</option>
              <option  :value="sem.id" v-for="sem in semesterOptions" >{{sem.semester}}</option>
            </b-form-select>
          </b-form-group>
        </b-col> -->

        <b-col class="ml-3 mt-2" cols="12" md="6" lg="2">
          <b-form-group class="roomnumber" label="Room No." label-for="RoomNo">
            <b-form-select id="RoomNo" v-model="selected" @change="getFilteredClassSchedule()">
              <option value="null" hidden>Select Room</option>
              <option v-for="rooms in rowData" :value="rooms.id">{{rooms.room_number}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
    </b-form-row>

    <b-form-row class="d-print-none">
      <b-col class="py-4">
        <!-- Add New Room Button -->
        <b-button variant="primary" onclick="window.print()">
          Print
        </b-button>
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
      stacked="md"
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
                { key: 'day', label: 'Day', sortable: true, class: 'text-center' },
                { key: 'time_start', label: 'Time Start', sortable: true, class: 'text-center' },
                { key: 'time_end', label: 'Time End', sortable: true, class: 'text-center' },
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

              selected: 0,
            }
        },

          mounted () {
            this.getRooms();
            this.getRoomSchedule();
            this.getFilteredClassSchedule();
          },

          methods: {
            // gets all created schedule
            getFilteredClassSchedule: function(){
              Axios
                .get('http://localhost/api/v1/class_schedules', {
                  params: {
                    room_id: this.selected,
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
            }
          }
</script>
