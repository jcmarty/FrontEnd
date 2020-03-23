<template>
<div>
  <h1>Manage {{curriculum_data.curriculum_title}} Subjects</h1>
  <hr/>
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
  <h5>Subjects</h5>
  <b-form-row>
    <!-- end year level select box -->
      <b-col cols="12" md="6" lg="3">
        <b-form-group class="mb-4" label="Year Level" label-for="year_level">
          <b-form-select id="year_level" v-model="selectedYearLevel" :options="year_options" @change="onChangeYearLevel">
            <option value="null" hidden>Select Year level</option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <!-- end year level select box -->

      <!-- semester select box -->
      <b-col cols="12" md="6" lg="3">
        <b-form-group class="semester mb-4" label="Semester" label-for="Semester">
          <b-form-select id="Semester" v-model="selectedSemester" @change="onChangeSemester" :disabled="sem_status">
            <option :value="{id: null, semester:null}" hidden>Select Semester</option>
            <option v-for="sem in SemRow" v-bind:value="{id: sem.id, semester: sem.semester}">{{sem.semester}}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6" lg="6">
        <b-button class="float-right addBtn mt-4" variant='primary'
          @click=''>
          <i class="fa fa-plus"/>  Add Subject
        </b-button>
      </b-col>
    <b-col cols="12" md="8" lg="12">

      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Description</th>
            <th>Year Level</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody id="subjectsTable">
          <tr class="subject_row" v-for="data in curriculumSubjects">
            <td>{{data.subject.subject_code}}</td>
            <td>{{data.subject.subject_description}}</td>
            <td>{{data.year_level}}</td>
            <td>{{data.semester.semester}}</td>
            <td>
              <b-button
                v-model="deleteSubject"
                variant='danger'
                size='sm'
                class="deleteBtn"
                @click='()=>onDeleteSubject(data.id)'>
                  DELETE
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-col>
  </b-form-row>


  <!--  TODO:  Display subjects per year and semester  -------
                 We might need a custom component here
                 instead of using ag-grid-vue.  Not sure though.
  <<----------------------------------------------------------- -->
</div>
</template>
<style>
#subjectsTable tr td{
  padding-top: 25px;
  margin: 0;
}
#subjectsTable tr td:first-child{
  text-align: center;
}
#subjectsTable tr
  td:nth-child(3),
  td:nth-child(4),
  td:nth-child(5){
  text-align: center;
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

      curriculumSubjects: null,

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
      deleteSubject: null,
    }
  },
  components: {
    AgGridVue,
    CurriculumSubjectActionButton
  },
  beforeMount() {

  },
  created() {
    this.curriculum.id = this.$route.params.id;
    this.curriculum_data = this.$route.params.data;
  },
  mounted() {
    this.getCurriculumSubjects();
    this.getSemester();
    this.getYearLevel();
  },

  methods: {
    onDeleteSubject: function(id){
      Axios
        .delete('http://localhost/api/v1/curriculum_subjects/' + id, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          this.getCurriculumSubjects();

        })
        .catch(error => {
          this.alertMessage = error.response.data.message;
          this.dismissErrorCountDown = this.dismissSecs;
        });

    },

    // filter subjects using year level
    onChangeYearLevel: function () {
      this.sem_status = false;
      this.selectedSemester = {
        id: null,
        semester: null
      };
      // var selectedYearLevel, filter, table, tr, row, year_col, sem_col, i, txtValue;
      // selectedYearLevel = this.selectedYearLevel;
      // filter = selectedYearLevel.toUpperCase();
      // table = document.getElementById("subjectsTable");
      // tr = table.getElementsByTagName("tr");
      // row = table.getElementsByTagName("tr");
      //
      // for (i = 0; i < tr.length; i++) {
      //   year_col = tr[i].getElementsByTagName("td")[2];
      //   // sem_col = tr[i].getElementsByTagName("td")[0];
      //   if (year_col) {
      //     txtValue = year_col.textContent || year_col.innerText;
      //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
      //       tr[i].style.display = "";
      //     }
      //     else if (selectedYearLevel == "All") {
      //       for (var j = 0; j < row.length; j++) {
      //         row[j].style.display = "";
      //       }
      //     } else {
      //       tr[i].style.display = "none";
      //     }
      //   }
      // }
    },

    onChangeSemester: function() {

      var selectedYearLevel,  selectedSemester, filterYear, filterSemester, table, tr, year_col, sem_col, i, yearValue, semValue;
      selectedYearLevel = this.selectedYearLevel;
      selectedSemester = this.selectedSemester.semester;
      filterYear = selectedYearLevel.toUpperCase();
      filterSemester = selectedSemester.toUpperCase();

      table = document.getElementById("subjectsTable");
      tr = table.getElementsByTagName("tr");

      for (i = 0; i < tr.length; i++) {
        year_col = tr[i].getElementsByTagName("td")[2];
        sem_col = tr[i].getElementsByTagName("td")[3];
        if (year_col && sem_col) {
          yearValue = year_col.textContent || year_col.innerText;
          semValue = sem_col.textContent || sem_col.innerText;
          if (yearValue.toUpperCase().indexOf(filterYear) > -1 && semValue.toUpperCase().indexOf(filterSemester) > -1 ) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },

    // filter subjects using year level
    filterSubjects: function () {

      var selectedYearLevel, filter, table, tr, row, year_col, sem_col, i, txtValue;
      selectedYearLevel = this.selectedYearLevel;
      filter = selectedYearLevel.toUpperCase();
      table = document.getElementById("subjectsTable");
      tr = table.getElementsByTagName("tr");
      row = table.getElementsByTagName("tr");
      for (var j = 0; j < row.length; j++) {
        row[j].style.display = "";
      }
      for (i = 0; i < tr.length; i++) {
        year_col = tr[i].getElementsByTagName("td")[2];
        // sem_col = tr[i].getElementsByTagName("td")[0];
        if (year_col) {
          txtValue = year_col.textContent || year_col.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          }
          else if (selectedYearLevel == "All") {
            for (var j = 0; j < row.length; j++) {
              row[j].style.display = "";
            }
          } else {
            tr[i].style.display = "none";
          }
        }
      }
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
          this.curriculumSubjects = response.data;
          if(this.curriculumSubjects){

          }
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


  }
}
</script>
