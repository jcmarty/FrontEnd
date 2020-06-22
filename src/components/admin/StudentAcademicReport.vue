<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Student Academic Record Report</h1>
    <hr class="d-print-none"/>
    <b-breadcrumb>
      <b-breadcrumb-item to="/reports/student">Student Reports</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ this.Students.first_name }} {{ this.Students.last_name }}</b-breadcrumb-item>
    </b-breadcrumb>

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
    </div>
      <!-- end of table -->
  </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: 'StudentAcademicReport',
        data() {
            return {
              isLoading: false,
              items: [],
              fields: [
                { key: 'curriculum_subject.subject.subject_code', label: 'Suject Code', sortable: true, class: 'text-center' },
                { key: 'curriculum_subject.subject.subject_title', label: 'Suject Title', sortable: true, class: 'text-center' },
                { key: 'curriculum_subject.subject.units', label: 'Units', sortable: true, class: 'text-center' },
                { key: 'curriculum_subject.subject.lec', label: 'Lec', sortable: true, class: 'text-center' },
                { key: 'curriculum_subject.subject.lab', label: 'Lab', sortable: true, class: 'text-center' },

              ],

              Students: {
                id: null,
                student_number: null,
                first_name: null,
                middle_name: null,
                last_name: null,
                suffix_name: null,
              },


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
              courseOption:null,
              selectedCourse: null,
              selectedYearLevel: null,
              yearOptions: [],
              filteredItems: [],
              counter: 0,

            }
        },

        created() {
            this.Students = {
              id: this.$route.params.id,
              name: this.$route.params.first_name + " " + this.$route.params.last_name,
              student_number: this.$route.params.student_number,
              first_name: this.$route.params.first_name,
              middle_name: this.$route.params.middle_name,
              last_name: this.$route.params.last_name,
              suffix_name: this.$route.params.suffix_name,
            }
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
