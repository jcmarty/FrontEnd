<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Student Grades Report</h1>
    <hr class="d-print-none"/>
    <b-breadcrumb class="d-print-none">
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

        <b-col>
          <!-- Add New Room Button -->
          <b-button class="mt-4 float-right"  variant="dark" onclick="window.print()">
            Print <i class="fa fa-print"/>
          </b-button>
        </b-col>
      </b-form-row>

      <!-- Main table element -->
      <b-overlay :show="isLoading" rounded="sm">
      <b-table
        class="my-3 table-striped d-print-none"
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
    </div>
      <!-- end of table -->

      <!-- for printing only -->
      <div id="to_print">
        <div class="header d-none d-print-block">
          <img src="../../assets/images/header_logo.png" alt="Comteq Logo" class="logo"/>
        </div>
        <div class="content d-none d-print-block ">
          <div class="d-print-block mt-4 mb-4 px-4 pt-4 pb-3 border border-dark">
            <!-- form title -->
            <div class="text-center h2 font-weight-bold text-dark mb-4">Student Grade</div>
              <table border="0" style="width: 100%">
                <tr class="">
                  <td class="pb-3">
                    <span class="h5 pl-5">Student Number : </span>
                    <span class="h5 font-weight-normal">{{Students.student_number}}</span>
                  </td>
                  <td class="pb-3">
                    <span class="h5 pl-5">Academic Year : </span>
                    <span class="h5 font-weight-normal">{{selectedAcademicYear}}</span>
                  </td>
                </tr>

                <tr class="">
                  <td class="pb-3">
                    <span class="h5 pl-5">Full Name : </span>

                    <span class="h5 font-weight-normal">{{Students.name}}</span>
                  </td>
                  <td class="pb-3">
                    <span class="h5 pl-5">Semester : </span>
                    <span class="h5 font-weight-normal">{{selectedSemester}}</span>
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
            class="table-striped"
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
        name: 'StudentGradeReport',
        data() {
            return {
              isLoading: false,
              items: [],
              fields: [
                { key: 'curriculum_subject.subject.subject_code', label: 'Suject Code', sortable: true, class: 'text-center' },
                { key: 'curriculum_subject.subject.subject_title', label: 'Suject Title', sortable: true, class: 'text-center' },
                { key: 'prelim_grade', label: 'Prelim Grade', sortable: true, class: 'text-center' },
                { key: 'midterm_grade', label: 'Midterm Grade', sortable: true, class: 'text-center' },
                { key: 'prefinal_grade', label: 'Pre Final Grade', sortable: true, class: 'text-center' },
                { key: 'final_grade', label: 'Final Grade', sortable: true, class: 'text-center' },
                { key: 'semestral', label: 'Semestral', sortable: true, class: 'text-center' },
                { key: 'figure', label: 'Figure', sortable: true, class: 'text-center' },
                { key: 'remarks', label: 'Remarks', sortable: true, class: 'text-center' },


              ],

              Students: {
                id: null,
                name: null,
                student_number: null,
                first_name: null,
                middle_name: null,
                last_name: null,
                suffix_name: null,
                course: null,
                year: null,
                block: null,
              },


              rowData: null,
              totalRows: 1,
              currentPage: 1,
              perPage: 5,
              pageOptions: [5, 10, 15, 20, 25],
              filter: null,

              selectedAcademicYear: null,
              selectedSemester: null,


            }
        },

        created() {
            this.Students = {
              id: this.$route.params.id,
              name: this.$route.params.student.first_name + " " + this.$route.params.student.last_name,
              student_number: this.$route.params.student.student_number,
              first_name: this.$route.params.student.first_name,
              middle_name: this.$route.params.student.middle_name,
              last_name: this.$route.params.student.last_name,
              suffix_name: this.$route.params.student.suffix_name,
              course: this.$route.params.course.course_code,
              year: this.$route.params.year_level,
              block: this.$route.params.block
            },
            this.selectedAcademicYear = this.$route.params.academic_year.academic_year;
            this.selectedSemester = this.$route.params.semester.semester;
        },

          mounted () {
            this.getStudentSchedule();
          },

          methods: {
            getStudentSchedule: function(){
              Axios
                .get('http://localhost/api/v1/student_schedules', {
                  params: {enrollment_id : this.Students.id},
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  this.items = response.data;
                  this.totalRows = this.items.length;
                  console.log(response.data);
                })
            },
          }

}
</script>
