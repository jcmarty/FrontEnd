<template>
  <div>
    <!-- page title -->
    <h1>View Students</h1>
    <hr/>

    <!-- start of filters -->
    <b-row>
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
    </b-row>
    <!-- end of filters -->

    <!-- start of instructor table -->
    <b-overlay :show="isLoading" rounded="sm">
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

        <template v-slot:cell(actions)="row">
          <b-button size="sm" variant="info" @click="" v-b-tooltip.hover title="View Students">
            <i class="fa fa-eye"/>
          </b-button>
        </template>
      </b-table>
    </b-overlay>
    <!-- end of instructor table -->


  </div>
</template>

<script>
import Axios from "axios";
import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
export default {
  name: 'StudentPerSubjectReport',
  data() {
    return {
      selectedAcademicYear: this.$store.getters.getCurrentAcademicYear,
      selectedSemester: this.$store.getters.getCurrentSemester,

      // variables for table
      isLoading: false,
      items: [],
      fields: [
        { key: 'room_number', label: 'Room Number', class: 'text-center', sortable: true},
        { key: 'room_name', label: 'Room Name', sortable: true, class: 'text-center' },
        { key: 'room_type', label: 'Room Type', sortable: true, class: 'text-center' },
        { key: 'room_capacity', label: 'Room Capacity', sortable: true, class: 'text-center' },
        { key: 'actions', label: 'Actions' , class: 'text-center' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      filter: null,
      // end of variables for table
    }
  },
  beforeMount() {

  },

  mounted () {
    this.backToTop();
    this.getInstructors();
    // this.getInstructorSchedule();
  },

  methods: {

    getInstructors: function(){
    this.isLoading = true;
    Axios
      .get('http://localhost/api/v1/instructors', {
        headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
      })
      .then(response => {
        this.isLoading = false;
        console.log(response.data);
        this.items = response.data;
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
