<template>
  <div>
    <h1>Manage {{curriculum_data.curriculum_title}} Subjects</h1>
    <!-- <h2>Title: {{ curriculum.curriculum_title }}</h2>
    <p>Description: {{ curriculum.curriculum_desc }}</p>
    <p v-if="curriculum.course !== null">
      Course: {{ curriculum.course.course_desc }}
      <span v-if="curriculum.course.course_major !== null">Major in {{ curriculum.course.course_major }}</span>
    </p>
    <p v-if="curriculum.strand !== null">Strand: {{ curriculum.strand.strand }}</p> -->
    <!--  TODO:  Place a form for adding curriculum subject here -->
    <b-form-row>

      <b-col cols="12" md="6" lg="2">
        <b-form-group
          class=""
          label="Year Level"
          label-for="year_level">
          <b-form-select
            id="year_level"
            v-model="selectedYearLevel"
            :options="year_options"
            @change="changeYear">
            <option value="null" hidden>Select Year level</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="2">
        <b-form-group
          class="semester"
          label="Semester"
          label-for="Semester">
          <b-form-select
            id="Semester"
            v-model="selectedSemester"
            @change="changeSemester"
            :disabled="sem_status">
            <option value="null" hidden>Select Semester</option>
            <option v-for="sem in SemRow"
            v-bind:value="{id: sem.id, semester: sem.semester}">{{sem.semester}}</option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>



    <b-form-row>


          <b-form-input
            type="text"
            v-model="filterText"
            id="search_subject"
            placeholder="Filter..." v-on:keyup="onFilterTextBoxChanged"
            ></b-form-input>


      <b-col cols="12" md="6" lg="6">
        <b-card class="mt-3 subject_card" >
          <ag-grid-vue class="ag-theme-material"
            :columnDefs="columnDefs"
            :rowData="rowData"
            :animateRows="true"
            :pagination="true"
            :paginationPageSize="10"
            :gridOptions="gridOptions">
          </ag-grid-vue>
        </b-card>
      </b-col>

      <b-col cols="12" md="6" lg="6">
        <b-card class="mt-3 subject_card"
        :header='curriculum_data.curriculum_title
          + " " + this.selectedYearLevel
          + " " + this.selectedYearLevel'>
          <ag-grid-vue class="ag-theme-material"
            :columnDefs="CurriculumDefs"
            :rowData="CurriculumSubjectData"
            :animateRows="true"
            :pagination="true"
            :paginationPageSize="10"
            :gridOptions="CurriculumgridOptions">
          </ag-grid-vue>
        </b-card>
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
        // subejects table
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        filterText: null,

        CurriculumDefs: null,
        CurriculumSubjectData: null,
        CurriculumgridOptions: null,
        curriculum_data: null,
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
          },

        year_options: [],
        SemRow: null,
        selectedSemester: null,
        selectedYearLevel: null,
        sem_status: true,
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

      this.CurriculumgridOptions = {
          context: {
              componentParent: this
          }
      };
      // this.CurriculumDefs = null;
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
        this.getSubjects();
      },
    created() {
        this.curriculum.id = this.$route.params.id;
        this.curriculum_data = this.$route.params.data;
    },
    mounted(){
      this.getSemester();
      this.getYearLevel();
    },
    methods: {
      onFilterTextBoxChanged: function () {
        // alert(this.filterText);
          this.gridOptions.api.setQuickFilter(this.filterText);
      },

      changeSemester: function(){
          console.log(this.selectedSemester.semester);
      },
      getYearLevel: function(){

        if(this.curriculum_data.course.year_duration == 4){
          this.year_options = [
            { value: "1st Year", text: '1st Year'},
            { value: "2nd Year", text: '2nd Year'},
            { value: "3rd Year", text: '3rd Year'},
            { value: "4th Year", text: '4th Year'}
          ];
        }else if(this.curriculum_data.course.year_duration == 2){
          this.year_options = [
            { value: "1st Year", text: '1st Year'},
            { value: "2nd Year", text: '2nd Year'},
          ];
        }
      },

      changeYear: function(){
        this.selectedSemester = null;
        this.sem_status = false;
      },

      // gets all semester record
      getSemester: function(){
        Axios
          .get('http://localhost/api/v1/semesters', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.SemRow = response.data;
          })
      },

      getSubjects: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            // console.log(this.curriculum_data);
            this.rowData = response.data;
          })
      },

      getCurriculumSubjects: function(){
        Axios
          .get('http://localhost/api/v1/curriculums/' + this.curriculum_data.id + '/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            // console.log(this.curriculum_data);
            this.rowData = response.data;
          })
      }
    }
  }
</script>
