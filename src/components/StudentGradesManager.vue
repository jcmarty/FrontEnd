<template>
  <div>
    <h1>Manage Student Grades</h1>

    <div class="panel panel-primary recordMaintenanceForm">
      <div class="panel-heading">Student Grades</div>
      <div class="panel-body">

        <b-form id="Add_Semester_Form">
          <b-form-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="academicyear"
                label="Academic Year"
                label-for="academicYear">
                <b-form-select
                  id="academicYear"
                  v-model="selected"
                  @change="getInstructorSchedule()">
                  <option v-for="ay in AyRowData"
                  v-bind:value="ay.id">{{ay.academic_year}}</option>
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="semester"
                label="Semester"
                label-for="Semester">
                <b-form-select
                  id="Instructor"
                  v-model="selected"
                  @change="getInstructorSchedule()">
                  <option v-for="sem in SemRowData"
                  v-bind:value="sem.id">{{sem.semester}}</option>
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="instructor"
                label="Instructor"
                label-for="Instructor">
                <b-form-select
                  id="Instructor"
                  v-model="selected"
                  @change="getInstructorSchedule()">
                  <option v-for="ins in InsRowData"
                  v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="subject"
                label="Subject"
                label-for="Subject">
                <b-form-select>
                </b-form-select>
              </b-form-group>
            </b-col>


      </b-form-row>


    <b-form-row>
      <h5>Subject List</h5>
      <ag-grid-vue class="ag-theme-material"
        :columnDefs="SubjectsColDef"
        :rowData="SubjectcsRowData"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="10"
        :gridOptions="gridOptions">
      </ag-grid-vue>
    </b-form-row>


          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_Semester_Btn" @click="addSemeter">
                Add
              </b-button>
            </b-col>
          </b-form-row>

        </b-form>

      </div>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  export default{
    name: 'StudentGradesManager',
    components: {
      AgGridVue,
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        SemRowData: null,
        InsRowData: null,
        AyRowData: null,
        gridOptions: null,
        id: null,
        semesters:{
          semester:null
        },
        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
    },
    beforeMount(){
      this.gridOptions = {
          context: {
              componentParent: this
          }
      };

      this.SubjectsColDef = [
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 150},
          {headerName: 'Subject Code', field: 'subject_code', sortable: true, filter: true, width: 150,},
          {headerName: 'Subject Description', field: 'subject_description',  sortable: true, filter: true, width: 350},
          {headerName: 'Action', field: 'subject_description', cellRendererFramework: 'SemestersActionButtons'}
      ];


    },
    mounted () {
      this.getSemesters();
      this.getInstructors();
    },
    methods:{
      getSemesters: function(){
        Axios
          .get('http://localhost/api/v1/semesters', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.SemRowData = response.data;
          })

      },
      getInstructors: function(){
        Axios
          .get('http://localhost/api/v1/instructors', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.InsRowData = response.data;
          })
      },
      getAcademicYear: function(){
        Axios
          .get('http://localhost/api/v1/academic_years', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.AyRowData = response.data;
          })
      },
      toggleForm: function(){
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },



      }
  }
</script>
