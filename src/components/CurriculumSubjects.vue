<template>
<div>
  <h1>Manage {{curriculum_data.curriculum_title}} Subjects</h1>
  <hr />
  <!-- <h2>Title: {{ curriculum.curriculum_title }}</h2>
    <p>Description: {{ curriculum.curriculum_desc }}</p>
    <p v-if="curriculum.course !== null">
      Course: {{ curriculum.course.course_desc }}
      <span v-if="curriculum.course.course_major !== null">Major in {{ curriculum.course.course_major }}</span>
    </p>
    <p v-if="curriculum.strand !== null">Strand: {{ curriculum.strand.strand }}</p> -->
  <!--  TODO:  Place a form for adding curriculum subject here -->

  <b-alert variant="success" :show="dismissSuccessCountDown" @dismissed="dismissSuccessCountDown=0" dismissible fade>
    {{alertMessage}}
  </b-alert>
  <b-alert variant="danger" :show="dismissErrorCountDown" @dismissed="dismissErrorCountDown=0" dismissible fade>
    <p>{{alertMessage}}</p>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </b-alert>
  <!-- Adding Form Start  -->
  <div >
    <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
      <div class="panel-heading">Add a Room</div>
      <div class="panel-body">
        <b-form id="Add_Room_Form">

        <b-form-row>
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

          <!-- semester select box -->
          <b-col cols="12" md="12" lg="6">
            <b-form-group class="semester mb-4" label="Subject" label-for="Subject">
              <b-form-select id="Subject" v-model="selectedSubject" @change="" :disabled="sem_status">
                <option :value="null" hidden>Select Subject</option>
                <option v-for="subject in SubjectRow" v-bind:value="subject.id">{{subject.subject_code}} - {{subject.subject_description}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-form-row>

          <!-- Form Buttons -->
         <b-form-row>
           <b-col>
             <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
           </b-col>
           <b-col class="d-flex justify-content-end">
              <b-button variant="success" id="Add_Room_Btn" @click="">
                Add
              </b-button>
           </b-col>
        </b-form-row>

        </b-form> <!-- End of b-form  -->
      </div>  <!-- End of Panel Body  -->
    </div>  <!-- End of Panel  -->
  </div> <!-- End of Col  -->

  <h5>Subjects</h5>
  <b-form-row>
    <b-col cols="12" md="6" lg="3">
      <b-form-group class="mb-4" label="Year Level" label-for="year_level">
        <b-form-select id="year_level" v-model="selectedYearLevel" :options="year_options" @change="onChangeYearLevel" v-if="!showForm">
          <option value="null" hidden>Select Year level</option>
        </b-form-select>
      </b-form-group>
    </b-col>
    <!-- end year level select box -->

    <!-- semester select box -->
    <b-col cols="12" md="6" lg="3">
      <b-form-group class="semester mb-4" label="Semester" label-for="Semester">
        <b-form-select id="Semester" v-model="selectedSemester" @change="onChangeSemester" :disabled="sem_status" v-if="!showForm">
          <option :value="{id: null, semester:null}" hidden>Select Semester</option>
          <option v-for="sem in SemRow" v-bind:value="{id: sem.id, semester: sem.semester}">{{sem.semester}}</option>
        </b-form-select>
      </b-form-group>
    </b-col>

    <!-- semester select box -->
    <b-col cols="12" md="6" lg="6">
      <b-form-group class="offset-md-3 semester mt-4" label="" label-for="Semester">
        <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
          Add New Curriculum Subject
        </b-button>
      </b-form-group>
    </b-col>
    <!-- curriculum subjects table -->
      <table class="table table-bordered table-striped">
        <tbody id="subjectsTable">

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
#subjectsTable tr td {
  padding-top: 25px;
  margin: 0;
}

#subjectsTable tr td:first-child {
  text-align: center;
}

#subjectsTable tr td:nth-child(3),
td:nth-child(4),
td:nth-child(5) {
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
      showForm: false,
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
      SubjectRow: null,
      selectedSubject: null,
      SemRow: null,
      selectedSemester: {
        id: null,
        semester: null
      },
      selectedYearLevel: null,
      sem_status: true,
      subject_status: null,
      deleteSubject: null,
      container: [],
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
    this.getSubjects();
  },

  methods: {
    onDeleteSubject: function(id) {
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

    // get all curriculum subjects
    getCurriculumSubjects: function() {
      this.container = [];
      Axios
        .get('http://localhost/api/v1/curriculums/27/subjects', {
          // .get('http://localhost/api/v1/curriculums/' + this.curriculum_data.id + '/subjects', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          // console.log(response.data);


          var year_level = response.data;

          // groups subjects by year level and semester
          const groupBy = key => array =>
            array.reduce((objectsByKeyValue, obj) => {
              const value = obj[key];
              objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
              return objectsByKeyValue;
            }, {});

          const groupByYear = groupBy('year_level');

          // group year level subject with semester
          for (var i = 0; i < this.year_options.length; i++) {
            var semester = groupByYear(year_level)[this.year_options[i].text];
            const groupBySemester = groupBy('semester_id');

            var x = Object.values(groupBySemester(semester))
            for (var j = 0; j < x.length; j++) {
              if (j == 0) {
                this.container.push({
                  year_level: this.year_options[i].text,
                  semester: "1st Semester",
                  subjects: x[j] || null,
                })
              } else if (j == 1) {
                this.container.push({
                  year_level: this.year_options[i].text,
                  semester: "2nd Semester",
                  subjects: x[j] || null,
                })
              } else if (j == 2) {
                this.container.push({
                  year_level: this.year_options[i].text,
                  semester: "Summer",
                  subjects: x[j] || null,
                })
              }
            }
          }

          this.appendToTable();
          if(this.selectedSemester.semester != null){
            this.onChangeSemester();
          }
          console.log(this.container);
        })
    },

    onChangeYearLevel: function() {
      this.sem_status = false;
      // this.selectedSemester = {
      //   id: null,
      //   semester: null
      // };
      // this.getCurriculumSubjects();
      var title, classValue, selectedYearLevel, selectedSemester, filterYear, filterSemester, table, tr, year_col, sem_col, i, semValue;
      selectedYearLevel = this.selectedYearLevel;
      selectedSemester = this.selectedSemester.semester;

      if(selectedSemester != null){
        filterYear = selectedYearLevel.toUpperCase() + " - " + selectedSemester.toUpperCase();;

        table = document.getElementById("subjectsTable");
        tr = table.getElementsByTagName("tr")

        for (i = 0; i < tr.length; i++) {
          if(tr[i].className == filterYear){
            tr[i].style.display = "";
          }else{
            tr[i].style.display = "none";
          }
        }
      }


    },

    onChangeSemester: function() {

      var title, classValue, selectedYearLevel, selectedSemester, filterYear, filterSemester, table, tr, year_col, sem_col, i, semValue;
      selectedYearLevel = this.selectedYearLevel;
      selectedSemester = this.selectedSemester.semester;
      filterYear = selectedYearLevel.toUpperCase() + " - " + selectedSemester.toUpperCase();;

      table = document.getElementById("subjectsTable");

      // tr = table.getElementsByClassName("title")
      tr = table.getElementsByTagName("tr")

      for (i = 0; i < tr.length; i++) {
        if(tr[i].className == filterYear){
          tr[i].style.display = "";
        }else{
          tr[i].style.display = "none";
        }
      }
      // console.log(tr[0].textContent);
      // for (i = 0; i < tr.length; i++) {
      //   year_col = tr[i].textContent;
      //     // var yearValue = year_col.textContent || year_col.innerText;
      //     if (year_col.toUpperCase().indexOf(filterYear) > -1) {
      //       tr[i].style.display = "";
      //     } else {
      //       tr[i].style.display = "none";
      //     }
      // }
    },

    appendToTable: function() {
      var container = this.container;
      var tbl = document.getElementById('subjectsTable');

      for (var i = 0; i < container.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(container[i].year_level.toUpperCase() + " - " + container[i].semester.toUpperCase()))
        // tr.appendChild(th).classList.add("title");
        tr.setAttribute("class", container[i].year_level.toUpperCase() + " - " + container[i].semester.toUpperCase());
        tr.appendChild(th).colSpan = "6";
        tbl.appendChild(tr);


        var row = document.createElement('tr');
        var hcode = document.createElement('th');
        var hdesc = document.createElement('th');
        var hunits = document.createElement('th');
        var hlec = document.createElement('th');
        var hlab = document.createElement('th');
        var hlab = document.createElement('th');
        var hprerequisite = document.createElement('th');


        hcode.appendChild(document.createTextNode("Subject Code"))
        hdesc.appendChild(document.createTextNode("Description"))
        hunits.appendChild(document.createTextNode("Units"))
        hlec.appendChild(document.createTextNode("Lec"))
        hlab.appendChild(document.createTextNode("Lab"))
        hprerequisite.appendChild(document.createTextNode("Prerequisite"))

        row.appendChild(hcode)
        row.appendChild(hdesc)
        row.appendChild(hunits)
        row.appendChild(hlec)
        row.appendChild(hlab)
        row.appendChild(hprerequisite)
        // row.classList.add("try")
        row.setAttribute("class", container[i].year_level.toUpperCase() + " - " + container[i].semester.toUpperCase());
        tbl.appendChild(row);
        var subjects = container[i].subjects;
        for (var j = 0; j < subjects.length; j++) {
          var subject = subjects[j];
          // header

          // data
          var tr = document.createElement('tr');
          var code = document.createElement('td');
          var desc = document.createElement('td');
          var units = document.createElement('td');
          var lec = document.createElement('td');
          var lab = document.createElement('td');
          var prerequisite = document.createElement('td');
          code.appendChild(document.createTextNode(subject.subject.subject_code))
          desc.appendChild(document.createTextNode(subject.subject.subject_description))
          units.appendChild(document.createTextNode(subject.subject.units))
          lec.appendChild(document.createTextNode(subject.subject.lec))
          lab.appendChild(document.createTextNode(subject.subject.lab))
          prerequisite.appendChild(document.createTextNode(subject.prerequisite || ""))

          tr.appendChild(code)
          tr.appendChild(desc)
          tr.appendChild(units)
          tr.appendChild(lec)
          tr.appendChild(lab)
          tr.appendChild(prerequisite)
          tr.setAttribute("class", container[i].year_level.toUpperCase() + " - " + container[i].semester.toUpperCase());
          tbl.appendChild(tr)

        }
      }
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

    toggleForm: function(){
      if(this.showForm){
        this.showForm = false;
      } else {
        this.showForm = true;
      }
    }, // End of Toggle Form Function

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

    // gets all semester record
    getSubjects: function() {
      Axios
        .get('http://localhost/api/v1/subjects', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          this.SubjectRow = response.data;
        })
    },


  }
}
</script>
