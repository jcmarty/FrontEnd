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

  <b-alert variant="success"
    :show="dismissSuccessCountDown"
    @dismissed="dismissSuccessCountDown=0"
    dismissible fade>
      {{alertMessage}}
  </b-alert>
  <b-alert variant="danger"
    :show="dismissErrorCountDown"
    @dismissed="dismissErrorCountDown=0"
    dismissible fade>
      <p>{{alertMessage}}</p>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
  </b-alert>

  <b-form-row>

    <b-col cols="12" md="6" lg="6">
      <!-- search subjecti input box -->
      <b-col cols="12" md="6" lg="6">
        <b-form-group class="" label="Search Subject" label-for="search_subject">
          <b-form-input type="text" v-model="filterText" id="search_subject" placeholder="Filter..." v-on:keyup="onFilterTextBoxChanged"></b-form-input>
        </b-form-group>
      </b-col>
      <!-- end of search subjects input box -->
      <b-col cols="12" md="6" lg="12">
        <!-- start of subjects table -->
        <div class="panel panel-primary">
          <div class="panel-heading">Subjects Table</div>
          <div class="subjects_table">
            <ag-grid-vue class="ag-theme-material" :columnDefs="columnDefs" :rowData="rowData" :animateRows="true" :pagination="true" :paginationPageSize="10" :gridOptions="gridOptions">
            </ag-grid-vue>
          </div>
          <!-- end of subjects table -->
        </div>
        <!-- end of panel -->
      </b-col>
    </b-col>

    <!-- end year level select box -->
    <b-col cols="12" md="6" lg="6">
      <b-col cols="12" md="6" lg="6">
        <b-form-group class="" label="Year Level" label-for="year_level">
          <b-form-select id="year_level" v-model="selectedYearLevel" :options="year_options" @change="onChangeYearLevel">
            <option value="null" hidden>Select Year level</option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <!-- end year level select box -->

      <!-- semester select box -->
      <b-col cols="12" md="6" lg="6">
        <b-form-group class="semester" label="Semester" label-for="Semester">
          <b-form-select id="Semester" v-model="selectedSemester" @change="onChangeSemester" :disabled="sem_status">
            <option :value="{id: null, semester:null}" hidden>Select Semester</option>
            <option v-for="sem in SemRow" v-bind:value="{id: sem.id, semester: sem.semester}">{{sem.semester}}</option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <!-- end of semester select box -->

      <!-- CURRICULUM SUBJECTS TABLE -->
      <b-col cols="12" md="6" lg="12">
        <div class="panel panel-primary">
          <div class="panel-heading">{{this.curriculum_data.curriculum_title}} / {{this.selectedYearLevel}} / {{this.selectedSemester.semester}}</div>
          <div class="subjects_table">
            <ag-grid-vue class="ag-theme-material" :columnDefs="CurriculumDefs" :rowData="CurriculumSubjectData" :animateRows="true" :pagination="true" :paginationPageSize="10" :gridOptions="CurriculumgridOptions">
            </ag-grid-vue>
          </div>
          <!-- end of div Subjects_table -->
        </div>
        <!-- end of panel -->
      </b-col>
      <!-- END OF CURRICULUM SUBJECTS TABLE -->
    </b-col>
  </b-form-row>
  <!--  TODO:  Display subjects per year and semester  -------
                 We might need a custom component here
                 instead of using ag-grid-vue.  Not sure though.
  <<----------------------------------------------------------- -->
</div>
</template>
<style>
.subjects_table {
  overflow: hidden;
  padding-right: 10px;
}

.ag-header-cell-label {
  justify-content: center;
}
</style>
<script>
import Axios from "axios";
import {
  AgGridVue
} from "ag-grid-vue";
import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
import CurriculumSubjectActionButton from "./ActionButtons/CurriculumSubjectActionButton.vue";
export default {
  name: 'CurriculumSubjects',
  data() {
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
      CurrSubjectRow: null,

      alertMessage: "",
      errors: [],
      dismissSecs: 7,
      dismissSuccessCountDown: 0,
      dismissErrorCountDown: 0,

      id: null,
      subject: {
        subject_code: null,
        subject_description: null,
        lec: 0,
        lab: 0,
        units: null,
        active: 1
      },
      options: [{
          value: 0,
          text: 'Inactive'
        },
        {
          value: 1,
          text: 'Active'
        }
      ],

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
      selectedSemester: {
        id: null,
        semester: null
      },
      selectedYearLevel: null,
      sem_status: true,
      subject_status: null,
    }
  },
  components: {
    AgGridVue,
    CurriculumSubjectActionButton
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
    this.columnDefs = [{
        headerName: 'Subject Code',
        field: 'subject_code',
        sortable: true,
        width: 110,
      },
      {
        headerName: 'Subject Description',
        field: 'subject_description',
        sortable: true
      },
      {
        headerName: 'Action',
        field: 'id',
        cellRendererFramework: 'CurriculumSubjectActionButton',
        width: 80,
      },
    ];
    this.CurriculumDefs = [{
        headerName: 'Subject Code',
        field: 'subject.subject_code',
        sortable: true,
        width: 110,
      },
      {
        headerName: 'Subject Description',
        field: 'subject.subject_description',
        sortable: true,
      },
      {
        headerName: 'Action',
        field: '',
        width: 80,
      },
    ];
  },
  created() {
    this.curriculum.id = this.$route.params.id;
    this.curriculum_data = this.$route.params.data;
  },
  mounted() {
    this.getSemester();
    this.getYearLevel();
    this.getCurriculumSubjects();
    this.filterExistedSubject();
    this.CurriculumgridOptions.api.sizeColumnsToFit();
    this.gridOptions.api.sizeColumnsToFit();
  },


  methods: {
    // get subjects that are not existed on specified curriculum
    filterExistedSubject: function() {
      // gets all subjects
      Axios
        .get('http://localhost/api/v1/subjects', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {

          // CurriculumSubjectData
          this.rowData = [];
          for(var i = 0; i < response.data.length; i++){
            for(var j = 0; j < this.CurrSubjectRow.length; j++){
              if(response.data[i].id == this.CurrSubjectRow[j].subject_id){
                this.subject_status = 1;
              }
            }
            if(this.subject_status == 1){
              this.subject_status = 0;
            }else{
              this.rowData.push(response.data[i]);
              this.subject_status = 0;
            }
          }
        })
    },

    onChangeYearLevel: function() {
      // Axios
      //   .get('http://localhost/api/v1/curriculums/' + this.curriculum_data.id + '/subjects?year_level=' + this.selectedYearLevel, {
      //     headers: {
      //       'Authorization': 'Bearer ' + this.$store.getters.getToken
      //     }
      //   })
      //   .then(response => {
      //     // console.log(response.data);
      //     this.CurriculumSubjectData = response.data;
      //   })
      this.selectedSemester = {
        id: null,
        semester: null
      };
      this.sem_status = false;
      this.CurriculumSubjectData = [];
    },

    onChangeSemester: function() {
      // console.log(this.selectedSemester)
      Axios
        .get('http://localhost/api/v1/curriculums/' + this.curriculum_data.id + '/subjects?year_level=' + this.selectedYearLevel + "&semester_id=" + this.selectedSemester.id, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          // console.log(response.data);
          this.CurriculumSubjectData = response.data;
        })
    },

    // get all curriculum subjects
    getCurriculumSubjects: function() {
      Axios
        .get('http://localhost/api/v1/curriculums/' + this.curriculum_data.id + '/subjects', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          this.CurrSubjectRow = response.data;
          // console.log(this.CurriculumSubjectData);
        })
    },

    // gets all semester record
    getSemester: function() {
      Axios
        .get('http://localhost/api/v1/semesters', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          this.SemRow = response.data;
        })
    },

    // sets year level select box
    getYearLevel: function() {
      if (this.curriculum_data.course.year_duration == 4) {
        this.year_options = [{
            value: "1st Year",
            text: '1st Year'
          },
          {
            value: "2nd Year",
            text: '2nd Year'
          },
          {
            value: "3rd Year",
            text: '3rd Year'
          },
          {
            value: "4th Year",
            text: '4th Year'
          }
        ];
      } else if (this.curriculum_data.course.year_duration == 2) {
        this.year_options = [{
            value: "1st Year",
            text: '1st Year'
          },
          {
            value: "2nd Year",
            text: '2nd Year'
          },
        ];
      }
    },

    // seach box
    onFilterTextBoxChanged: function() {
      this.gridOptions.api.setQuickFilter(this.filterText);
    },

  }
}
</script>
