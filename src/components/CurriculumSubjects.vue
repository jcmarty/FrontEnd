<template>
  <div>
    <h1>Manage Curriculum Subjects</h1>
    <!-- <h2>Title: {{ curriculum.curriculum_title }}</h2>
    <p>Description: {{ curriculum.curriculum_desc }}</p>
    <p v-if="curriculum.course !== null">
      Course: {{ curriculum.course.course_desc }}
      <span v-if="curriculum.course.course_major !== null">Major in {{ curriculum.course.course_major }}</span>
    </p>
    <p v-if="curriculum.strand !== null">Strand: {{ curriculum.strand.strand }}</p> -->
    <!--  TODO:  Place a form for adding curriculum subject here -->
    <b-form-row>
      <b-form-group
        class="search_subject"
        label="Search Subject"
        label-for="search_subject">
        <b-form-input
          type="text"
          v-model="filterText"
          id="search_subject"
          placeholder="Filter..." v-on:keyup="onFilterTextBoxChanged"
          ></b-form-input>
      </b-form-group>
    </b-form-row>
    <b-form-row>
      <b-col cols="12" md="6" lg="6">
        <!-- <b-card class="mt-3" header="Curriculum Subjects"> -->
          <ag-grid-vue class="ag-theme-material"
            :columnDefs="columnDefs"
            :rowData="rowData"
            :animateRows="true"
            :pagination="true"
            :paginationPageSize="10"
            :gridOptions="gridOptions">
          </ag-grid-vue>
        <!-- </b-card> -->
      </b-col>
    </b-form-row>
    <!--  TODO:  Display subjects per year and semester  -------
                 We might need a custom component here
                 instead of using ag-grid-vue.  Not sure though.
  <<----------------------------------------------------------- -->
  </div>
</template>
<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  export default{
    name: 'CurriculumSubjects',
    data(){
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        filterText: null,
        id: null,
        subject: {
          subject_code: null,
          subject_description: null,
          lec: 0,
          lab: 0,
          units: null,
          active: 1
        },
        options: [
          {value: 0, text: 'Inactive'},
          {value: 1, text: 'Active'}],
          curriculum: {
            id: null,
            curriculum_title: null,
            curriculum_desc: null,
            course: null,
            course_major: null,
            strand: null,
          }
      }
    },
    components: {
        AgGridVue
    },
    beforeMount() {
      this.gridOptions = {
          context: {
              componentParent: this
          }
      };
        this.columnDefs = [
            // {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 80},
            // {headerName: 'Year', field: 'academic_year', sortable: true, filter: true, width: 180,},
            // {headerName: 'semester', field: 'semester', sortable: true, filter: true, width: 180,},
            {headerName: 'Subject Code', field: 'subject_code', sortable: true, filter: true, width: 180,},
            {headerName: 'Subject Description', field: 'subject_description', sortable: true, filter: true, width: 180,},
            {headerName: 'Lecture', field: 'lec', sortable: true, filter: true, width: 130,},
            {headerName: 'Laboratory', field: 'lab', sortable: true, filter: true, resizable: true},
            {headerName: 'Units', field: 'units', sortable: true, filter: true, width: 150},
            // {headerName: 'Active', field: 'active', sortable: true, filter: true, width: 180}


        ];
        Axios
          .get('http://localhost/api/v1/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.rowData = response.data;
          })
      },
    created() {
        this.curriculum.id = this.$route.params.id;
    },
    mounted(){
      this.getCurriculumDetails();
    },
    methods: {
      onFilterTextBoxChanged: function () {
        // alert(this.filterText);
          this.gridOptions.api.setQuickFilter(this.filterText);
      },

      getCurriculumDetails:  function(){
        Axios
          .get('http://localhost/api/v1/curriculums/' + this.curriculum.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.curriculum = response.data[0];
            //console.log(this.curriculum);
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
  }
</script>
