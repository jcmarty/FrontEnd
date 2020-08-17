<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Student Schedule Report</h1>
    <hr class="d-print-none"/>
    <b-breadcrumb  class="d-print-none">
      <b-breadcrumb-item to="/reports/student">Student Reports</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ this.Students.first_name }} {{ this.Students.last_name }}</b-breadcrumb-item>
    </b-breadcrumb>

    <div class="px-4 py-3 mt-4 mx-3 shadow rounded bg-white d-print-none">
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
        <b-col >
          <!-- Add New Room Button -->
          <b-button class="mt-4 float-right"  variant="primary" onclick="window.print()">
            Print
          </b-button>
        </b-col>
      </b-form-row>

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
    </div><!-- end of table -->

    <!-- for printing only -->
    <div id="to_print">
      <div class="header d-none d-print-block">
        <img src="../../assets/images/header_logo.png" alt="Comteq Logo" class="logo"/>
      </div>
      <div class="content d-none d-print-block ">
        <div class="d-print-block mt-4 mb-4 px-4 pt-4 pb-3 border border-dark">
          <!-- form title -->
          <div class="text-center h2 font-weight-bold text-dark mb-4">Student Schedule Report</div>
            <table border="0" style="width: 100%">
              <tr class="">
                <td class="pb-3">
                  <span class="h5 pl-5">Student Number : </span>
                  <span class="h5 font-weight-normal">{{Students.student_number}}</span>
                </td>
                <td class="pb-3">
                  <span class="h5 pl-5">Academic Year : </span>
                  <span class="h5 font-weight-normal">{{Students.ay}}</span>
                </td>
              </tr>

              <tr class="">
                <td class="pb-3">
                  <span class="h5 pl-5">Full Name : </span>

                  <span class="h5 font-weight-normal">{{Students.name}}</span>
                </td>
                <td class="pb-3">
                  <span class="h5 pl-5">Semester : </span>
                  <span class="h5 font-weight-normal">{{Students.sem}}</span>
                </td>
              </tr>

              <tr>
                <td class="pb-3">
                  <span class="h5 pl-5">Course / Year : </span>
                  <span class="h5 font-weight-normal">{{Students.course}} - {{Students.year}}</span>
                </td>
                <td class="pb-3">
                  <span class="h5 pl-5">Block : </span>
                  <span class="h5 font-weight-normal">{{Students.block}}</span>
                </td>
              </tr>
            </table>
          </div>

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

      </div>
      <!-- <div class="footer  d-none d-print-block text-center">This is the Footer</div> -->
    </div>
  </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: 'StudentScheduleReport',
        data() {
            return {
              isLoading: false,
              schedule: [],
              items: [],
              fields: [
                { key: 'curriculum_subject.subject.subject_code', label: 'Suject Code', sortable: true, class: 'text-center' },
                { key: 'curriculum_subject.subject.subject_title', label: 'Suject Title', sortable: true, class: 'text-center' },
                { key: 'instructor', label: 'instructor', sortable: true, class: 'text-center',
                sortByFormatted: true,
                formatter: (value, key, item) => {
                  for (var i = 0; i < this.schedule.length; i++) {
                    if (this.schedule[i].subject_id == item.subject_id) {
                      return this.schedule[i].instructor.last_name + ", " +this.schedule[i].instructor.first_name;
                    }
                  }

                },
              },
                { key: 'day', label: 'Day', sortable: true, class: 'text-center' ,
                  sortByFormatted: true,
                  formatter: (value, key, item) => {
                    for (var i = 0; i < this.schedule.length; i++) {
                      if (this.schedule[i].subject_id == item.subject_id) {
                        return this.schedule[i].day;
                      }
                    }

                  },
                },
                { key: 'time', label: 'Time Start/Time End', sortable: true, class: 'text-center',
                  sortByFormatted: true,
                  formatter: (value, key, item) => {
                    for (var i = 0; i < this.schedule.length; i++) {

                      if (this.schedule[i].subject_id == item.subject_id) {
                        var start = this.schedule[i].time_start != null || "" ? this.timeFormatter(this.schedule[i].time_start) + " - " : "-- : ";
                        var end = this.schedule[i].time_end != null || "" ? this.timeFormatter(this.schedule[i].time_end) : "--";
                        return  start + end;
                      }
                    }

                  },
                 },
                { key: 'room_number', label: 'Room Number', sortable: true, class: 'text-center',
                  sortByFormatted: true,
                  formatter: (value, key, item) => {
                    for (var i = 0; i < this.schedule.length; i++) {
                      if (this.schedule[i].subject_id == item.subject_id) {
                        return  this.schedule[i].room.room_number;
                      }
                    }

                  },
                 },

              ],

              Students: {
                id: null,
                student_number: null,
                first_name: null,
                middle_name: null,
                last_name: null,
                suffix_name: null,
                course:null,
                year:null,
                block:null,
                ay:null,
                sem:null,
              },


              rowData: null,
              totalRows: 1,
              currentPage: 1,
              perPage: 5,
              pageOptions: [5, 10, 15, 20, 25],
              filter: null,


              selectedAcademicYear: null,
              selectedSemester: null,
              selectedBlock :null,
              selectedCourse: null,
              selectedYearLevel: null,


            }
        },

        created() {
          this.items = this.$route.params.student_schedule;
          this.selectedAcademicYear =  this.$route.params.academec_year_id;
          this.selectedSemester = this.$route.params.semester_id;
          this.selectedCourse = this.$route.params.course_id;
          this.selectedYearLevel = this.$route.params.year_level;
          this.selectedBlock =this.$route.params.block;
          console.log(this.items);
            this.Students = {
              id: this.$route.params.student.id,
              name: this.$route.params.student.first_name + " " + this.$route.params.student.last_name,
              student_number: this.$route.params.student.student_number,
              first_name: this.$route.params.student.first_name,
              middle_name: this.$route.params.student.middle_name,
              last_name: this.$route.params.student.last_name,
              suffix_name: this.$route.params.student.suffix_name,
              course:this.$route.params.course.course_code,
              year:this.$route.params.year_level,
              block:this.$route.params.block,
              ay:this.$route.params.academic_year.academic_year,
              sem:this.$route.params.semester.semester,
            }
        },

          mounted () {
            this.getStudentSchedule();
          },

          methods: {
            timeFormatter : function(time){

              var split = time.split(":");
              var hour = split[0];
              var min = split[1];

              var h = hour % 12 || 12;
              var ampm = (hour < 12 || hour == 24) ? "AM" : "PM";
              return h + ":" + min + ampm;
            }, // end of function timeFormatter
            getStudentSchedule: function(){
              Axios
                .get('http://localhost/api/v1/class_schedules', {
                  params: {
                    academec_year_id : this.selectedAcademicYear,
                    semester_id: this.selectedSemester,
                    course_id: this.selectedCourse,
                    year_level: this.selectedYearLevel,
                    block: this.selectedBlock,
                    active: 1,
                  },
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  this.schedule = response.data;
                  console.log(this.schedule)
                })
            },

            // getSchedule(){
            //   .get('http://localhost/api/v1/class_schedule', {
            //     params: {academec_year_id : this.items.id},
            //     headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            //   })
            // },
          }

}
</script>
