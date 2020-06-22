<template>
<div>
  <h1 class="font-weight-bold text-dark">Manage {{curriculum.curriculum_title}} Subjects</h1>
  <hr />
  <!-- <h2>Title: {{ curriculum.curriculum_title }}</h2>
    <p>Description: {{ curriculum.curriculum_desc }}</p>
    <p v-if="curriculum.course !== null">
      Course: {{ curriculum.course.course_desc }}
      <span v-if="curriculum.course.course_major !== null">Major in {{ curriculum.course.course_major }}</span>
    </p>
    <p v-if="curriculum.strand !== null">Strand: {{ curriculum.strand.strand }}</p> -->
  <!--  TODO:  Place a form for adding curriculum subject here -->

  <b-alert class="mx-4" variant="success" :show="dismissSuccessCountDown" @dismissed="dismissSuccessCountDown=0" dismissible fade>
    {{alertMessage}}
  </b-alert>
  <b-alert class="mx-4" variant="danger" :show="dismissErrorCountDown" @dismissed="dismissErrorCountDown=0" dismissible fade>
    <p>{{alertMessage}}</p>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </b-alert>

    <input type="checkbox" id="currID" @click="onDeleteSubject" hidden>
    <input id="deleteID" hidden >
    <!-- start of adding form  -->
    <b-row class="ml-4">
      <b-button variant="info" size="" :to="{ name: 'manageCollegeCurriculum'}" class="toggleFormBtn" v-if="!showForm">
        <i class="fa fa-arrow-left" aria-hidden="true"/> Go Back
      </b-button>
    </b-row>
    <div class="adding_form">
      <transition name="fade">
        <div id="" class="px-4 pt-4 pb-3 mx-4 my-4 bg-white shadow rounded" v-if="showForm">
          <div class=" h5 font-weight-bold text-dark" >Add Curriculum Subject</div>
          <hr/>
            <b-row>
              <!-- start year level -->
              <!-- <b-col cols="12" md="6" lg="3">
                <b-form-group class="mb-4" label="Year Level" label-for="year_level">
                  <b-form-select id="year_level" v-model="selectedYearLevel" :options="year_options" @change="onChangeYearLevel">
                    <option value="null" v-if="showForm" hidden>Select Year level</option>
                    <option value="All" v-if="!showForm">All Year level</option>
                  </b-form-select>
                </b-form-group>
              </b-col> -->

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                :class="{'text-danger' : selectedYearLevel == null? true:  false}"
                label="Year Level *"
                label-for="year_level">
                  <b-form-select
                    type="text"
                    class="rounded"
                    id="year_level"
                    v-model="selectedYearLevel"
                    @change="onChangeYearLevel"
                    :class="{
                    'is-invalid' : selectedYearLevel == null? true:  false}"
                    :options="year_options">
                    <option value="null" v-if="showForm" hidden>Select Year level</option>
                    <option value="All" v-if="!showForm">All Year level</option>
                  </b-form-select>
                  <div class="invalid-feedback">
                    <span v-if="selectedYearLevel == null">This field is required.</span>
                  </div>
                </b-form-group>
              </b-col>
              <!-- end year level select box -->

              <!-- semester select box -->
              <!-- <b-col cols="12" md="6" lg="3">
                <b-form-group class="semester mb-4" label="Semester" label-for="Semester">
                  <b-form-select id="Semester" v-model="selectedSemester" @change="onChangeSemester" :disabled="sem_status">
                    <option :value="{id: null, semester:null}" hidden>Select Semester</option>
                    <option v-for="sem in SemRow" v-bind:value="{id: sem.id, semester: sem.semester}">{{sem.semester}}</option>
                  </b-form-select>
                </b-form-group>
              </b-col> -->

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                :class="{'text-danger' : selectedSemester.semester == null? true:  false}"
                label="Semester *"
                label-for="Semester">
                <b-form-select id="Semester" v-model="selectedSemester" @change="onChangeSemester" :disabled="sem_status"
                    class="rounded"
                    :class="{
                    'is-invalid' : selectedSemester.semester == null? true:  false}">
                    <option :value="{id: null, semester:null}" hidden>Select Semester</option>
                    <option v-for="sem in SemRow" v-bind:value="{id: sem.id, semester: sem.semester}">{{sem.semester}}</option>
                  </b-form-select>
                  <div class="invalid-feedback">
                    <span v-if="selectedSemester.semester == null">This field is required.</span>
                  </div>
                </b-form-group>
              </b-col>

              <!-- semester select box -->
              <!-- <b-col cols="12" md="12" lg="6">
                <b-form-group class="mb-4" label="Subject" label-for="Subject">
                  <b-form-select id="Subject" v-model="selectedSubject" @change="" :disabled="subject_status">
                    <option :value="null" hidden>Select Subject</option>
                    <option v-for="subject in SubjectRow" v-bind:value="subject.id">{{subject.subject_code}} - {{subject.subject_description}}</option>
                  </b-form-select>
                </b-form-group>
              </b-col> -->

              <b-col lg="4" class="">
                <b-form-group
                class="filter"
                label="Filter"
                label-for="Filter">
                  <b-input-group  size="">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      placeholder="Type to Search">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>

            </b-row>

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

                  <template v-slot:cell(actions)="row">
                    <b-form-checkbox v-model="selectedSubjects" :value="row.item"></b-form-checkbox>
                  </template>
                </b-table>
              </b-overlay>
              <hr/>


            <b-row>
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

              <b-col offset-lg="6" sm="12" md="4" lg="5"class="my-1">
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

              <!-- Form Buttons -->
             <b-form-row>
               <b-col>
                 <b-button variant="danger" @click="toggleForm">
                    Cancel
                  </b-button>
               </b-col>
               <b-col class="d-flex justify-content-end">
                  <b-button :disabled="selectedSemester.semester == null? true: false" variant="primary" id="Add_Curriculum_subject" @click="nextPage">
                    Next
                  </b-button>
               </b-col>
            </b-form-row>

          <!-- End of b-form  -->
        <!-- start of adding form  -->
        </div>
      </transition>
    </div>

    <transition name="fade">
      <!-- start of verification form -->
      <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="showVerifyForm">
        <!-- form title -->
        <div class=" h5 font-weight-bold text-dark">Verification</div>
        <hr/>


          <!-- Start of Subjects -->
          <!-- <b-card  header-tag="header" class="d-flex my-3 w-75">
            <template v-slot:header>
              <h6 class="font-weight-bold text-dark mb-0">List of Subjects</h6>
            </template> -->

            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Subject Code</th>
                  <th scope="col">Title</th>
                  <th scope="col">Units</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in selectedSubjects">
                  <td align="center" scope="col">{{item.subject_code}}</td>
                  <td align="center" scope="col">{{item.subject_title}}</td>
                  <td align="center" scope="col">{{item.units}}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-right" colspan="2">Total Units:</td>
                  <td class="text-center">{{parseInt(totalUnits)}}</td>
                </tr>
              </tbody>
            </table>


          <!-- end of subjects -->
      <!-- </b-card> -->
      <!-- Form Buttons -->
         <b-row>
           <b-col>
             <b-button class="pull-left" variant="danger" @click="prevPage">
                Previous
              </b-button>
              <b-button class="pull-right" variant="success"  @click="addSubject">
                Add
              </b-button>
            </b-col>
        </b-row>
      </div>
      <!-- end of verification form -->
    </transition>


<div id="" class="px-4 pt-4 pb-3 mx-4 my-4 bg-white shadow rounded">
  <b-form-row>
    <b-col cols="12" md="6" lg="3" v-if="!showForm">
      <b-form-group class="mb-4" label="Year Level" label-for="year_level">
        <b-form-select id="year_level" v-model="selectedYearLevel" :options="year_options" @change="onChangeYearLevel" >
          <option value="All">All Year level</option>
        </b-form-select>
      </b-form-group>
    </b-col>
    <!-- end year level select box -->

    <!-- semester select box -->
    <b-col cols="12" md="6" lg="3" v-if="!showForm">
      <b-form-group class="semester mb-4" label="Semester" label-for="Semester">
        <b-form-select id="Semester" v-model="selectedSemester" @change="onChangeSemester" :disabled="sem_status" >
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
    <table class="table table-bordered">
      <tbody id="subjectsTable">
      </tbody>
    </table>
  </b-form-row>
</div>

  <!--  TODO:  Display subjects per year and semester  -------
                 We might need a custom component here
                 instead of using ag-grid-vue.  Not sure though.
  <<----------------------------------------------------------- -->
</div>
</template>
<style>

#subjectsTable tr #total_units {
  text-align: right;
  font-weight: 700;
  /* color: red; */
}


#subjectsTable tr td {
  margin: 0;
}

#subjectsTable tr th {
  text-align: center;
}

#subjectsTable tr td:first-child {
  text-align: center;
}
#subjectsTable tr #table_head{
  font-weight: 700;
  text-align: left !important;
}


#subjectsTable tr td{
  text-align: center;
}
</style>




<script>
function myFunction() {
  document.getElementById('deleteID').value = this.id;
  document.getElementById('currID').click();
}
import Axios from "axios";
import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
export default {
  name: 'CurriculumSubjects',
  data() {
    return {
      isLoading: false,

      items: [],
      fields: [
        { key: 'subject_code', label: 'Subject Code', class: 'text-center', sortable: true},
        { key: 'subject_title', label: 'Title', sortable: true, class: 'text-center' },
        { key: 'lec', label: 'Lec', sortable: true, class: 'text-center' },
        { key: 'lab', label: 'Lab', sortable: true, class: 'text-center' },
        { key: 'units', label: 'Units', sortable: true, class: 'text-center' },
        { key: 'actions', label: 'Actions' , class: 'text-center' }
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      filter: null,


      message: null,
      grant: null,
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

      filteredSubjects : [],
      selectedSubjects : [],
      year_options: [],
      SubjectRow: null,
      selectedSubject: null,
      SemRow: null,
      selectedSemester: {
        id: null,
        semester: null
      },
      totalUnits: 0,
      showVerifyForm: false,
      selectedYearLevel: "All",
      sem_status: true,
      subject_status: true,
      deleteSubject: null,
      container: [],
      dataInsert: {
        subject_id: null,
        year_level: null,
        curriculum_id: null,
        semester_id: null,
        active: null
      }
    }
  },
  beforeMount() {

  },
  created() {
    this.curriculum.id = this.$route.params.id;
    this.curriculum_data = this.$route.params;
    this.curriculum.curriculum_title = this.$route.params.curriculum_title
  },
  mounted() {
    // console.log(this.curriculum_data)
    this.getCurriculumSubjects();
    this.getSemester();
    this.getYearLevel();
  },

  methods: {
    prevPage: function(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.showForm = true;
      this.showVerifyForm = false;
    },
    nextPage: function(){

      if(this.selectedSubjects.length == 0){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.alertMessage = "Please select subject/s.";
        this.dismissErrorCountDown = this.dismissSecs;
      } else{
        this.selectedSubjects.forEach(element => {
          console.log(element.units)
          this.totalUnits += parseInt(element.units)
        });
        this.showForm = false;
        this.showVerifyForm = true;
      }
    },
    // add new curriculum subject
    addSubject: function(){
      // checks if there is a subject selected

      // if
      //
      // this.alertMessage = error.response.data.message;
      //   this.dismissErrorCountDown = this.dismissSecs;

      console.log(this.selectedSubjects);
      // if(this.selectedSubject == null){
      //   this.alertMessage = "Subject field is requied.";
      //   this.dismissErrorCountDown = this.dismissSecs;
      // }else{
      //   // pass all selected data to varialble dataInsert

      // }

      for (var a = 0; a < this.selectedSubjects.length; a++) {
        var subject = this.selectedSubjects[a];

        this.dataInsert = {
          subject_id: subject.id,
          year_level: this.selectedYearLevel,
          curriculum_id: this.curriculum_data.id,
          semester_id: this.selectedSemester.id,
          active: 1
        }
        // curriculum subject
        Axios
          .post('http://localhost/api/v1/curriculum_subjects', this.dataInsert,{
            headers: {
              'Authorization': 'Bearer ' + this.$store.getters.getToken
            }
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clears selected subject
            // this.selectedSubject = null;
            //refreshes the table to see added subject

          })
          .catch(error => {
            // console.log(error.response.data.errors)
            this.alertMessage = error.response.data.message;
            this.errors.push(error.response.data.errors);
            this.dismissErrorCountDown = this.dismissSecs;
          });
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.items = [];
      this.selectedSubjects = [];
      this.showForm = false;
      this.showVerifyForm = false;
      this.selectedYearLevel = "All";
      this.selectedSemester = {
        id : null,
        semester : null
      }
      this.getCurriculumSubjects();
    },

    onDeleteSubject: function() {
      // console.log("asdasd")
      // document.getElementById('myCheck').getAttribu
      // alert("delete" + document.getElementById('deleteID').value);
      var id = document.getElementById('deleteID').value
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
          const values = Object.values(error.response.data.errors);
          for(const val of values){
            for(const err of val){
              this.errors.push(err);
            }
          }
          this.dismissErrorCountDown = this.dismissSecs;
        });

        document.getElementById('deleteID').value = ""
    },

    // get all curriculum subjects
    getCurriculumSubjects: function() {
      // clears the table
      var tbl = document.getElementById('subjectsTable');
      tbl.innerHTML = '';
      this.container = [];
      Axios
        .get('http://localhost/api/v1/curriculums/' + this.curriculum_data.id + '/subjects', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          const entries = Object.entries(response.data)
          this.container = entries;
          this.appendToTable();
          if(this.container.length == 0){
            //show no subject text if table is empty
            var table = document.getElementById("subjectsTable");
            var tr = document.createElement('tr');
            var th = document.createElement('th');
            th.appendChild(document.createTextNode("No subjects found."));
            tr.appendChild(th)
            tbl.appendChild(tr);
          }else{
            // shows subjects based on selected filters
            if(this.selectedYearLevel != null && this.selectedSemester.semester != null){
              this.onChangeYearLevel();
            }
          }
        })
    },


    onChangeYearLevel: function() {

      if(this.selectedYearLevel == "All"){
        // disables semester and suibject button
        this.sem_status = true;
        this.subject_status = true;
        this.selectedSemester = {id: null, semester:null}
        this.getCurriculumSubjects()
      }else{
        this.sem_status = false;
        if(this.selectedSemester.semester != null){
          this.onChangeSemester();
        }
        var title, classValue, selectedYearLevel, selectedSemester, filterYear, filterSemester, table, tr, year_col, sem_col, i, semValue;
        selectedYearLevel = this.selectedYearLevel;
        selectedSemester = this.selectedSemester.semester;

        if(selectedSemester != null){
          filterYear = selectedYearLevel.toUpperCase() + " - " + selectedSemester.toUpperCase();;

          table = document.getElementById("subjectsTable");
          tr = table.getElementsByTagName("tr")

          for (i = 0; i < tr.length; i++) {
            var textNode = tr[i].getElementsByTagName('th');
            if (textNode.nodeValue == "No subjects found."){

            }else{
              if(tr[i].className == filterYear){
                tr[i].style.display = "";
              }else{
                tr[i].style.display = "none";
              }
            }
          }
        }
      }

    },

    onChangeSemester: function() {
      this.getFilteredSubjects();
      this.subject_status = false;
      var title, classValue, selectedYearLevel, selectedSemester, filterYear, filterSemester, table, tr, year_col, sem_col, i, semValue;
      selectedYearLevel = this.selectedYearLevel;
      selectedSemester = this.selectedSemester.semester;
      filterYear = selectedYearLevel.toUpperCase() + " - " + selectedSemester.toUpperCase();;

      table = document.getElementById("subjectsTable");
      tr = table.getElementsByTagName("tr")

      for (i = 0; i < tr.length; i++) {
        var textNode = tr[0].getElementsByTagName('th');
        if (textNode.nodeValue == "No subjects found."){

        }else{
          if(tr[i].className == filterYear){
            tr[i].style.display = "";
          }else{
            tr[i].style.display = "none";
          }
        }
      }
    },

    appendToTable: function() {
      var container = this.container;
      var tbl = document.getElementById('subjectsTable');

      for (var i = 0; i < container.length; i++) {

        // const keys = Object.keys(container[i][1])
        const entries = Object.entries(container[i][1])
        // console.log(entries);
        for (var j = 0 ; j < entries.length; j++){
          var tr = document.createElement('tr');
          var td = document.createElement('td');
          var th = document.createElement('td');
          var tagClass = container[i][0].toUpperCase() + " - " + entries[j][0].toUpperCase();
          // console.log(container[i][0].toUpperCase() + " - " + keys[j].toUpperCase());
          th.appendChild(document.createTextNode(tagClass))
          th.setAttribute("id", "table_head");
          // tr.appendChild(th).classList.add("title");
          tr.setAttribute("class", tagClass);

          tr.appendChild(th).colSpan = "7";
          tbl.appendChild(tr);


          var row = document.createElement('tr');
          var hcode = document.createElement('th');
          var hdesc = document.createElement('th');
          var hlec = document.createElement('th');
          var hlab = document.createElement('th');
          var hunits = document.createElement('th');
          var hprerequisite = document.createElement('th');
          var action = document.createElement('th');


          hcode.appendChild(document.createTextNode("Subject Code"))
          hdesc.appendChild(document.createTextNode("Description"))
          hlec.appendChild(document.createTextNode("Lec"))
          hlab.appendChild(document.createTextNode("Lab"))
            hunits.appendChild(document.createTextNode("Units"))
          hprerequisite.appendChild(document.createTextNode("Prerequisite"))
          action.appendChild(document.createTextNode("Action"))

          row.appendChild(hcode)
          row.appendChild(hdesc)

          row.appendChild(hlec)
          row.appendChild(hlab)
          row.appendChild(hunits)
          row.appendChild(hprerequisite)
          row.appendChild(action)
          // row.classList.add("try")
          row.setAttribute("class", tagClass);
          tbl.appendChild(row);
          var total_lec_num = 0;
          var total_lab_num = 0;
          var total_units_num = 0;
          for(var k = 0; k < entries[j][1].length; k++){

            var subject = entries[j][1][k];
            // header

            // data
            var tr = document.createElement('tr');
            var code = document.createElement('td');
            var desc = document.createElement('td');
            var lec = document.createElement('td');
            var lab = document.createElement('td');
            var units = document.createElement('td');
            var prerequisite = document.createElement('td');
            var action = document.createElement('td');

            action.setAttribute('align', 'center')

            code.appendChild(document.createTextNode(subject.subject.subject_code))
            desc.appendChild(document.createTextNode(subject.subject.subject_title))
            lec.appendChild(document.createTextNode(subject.subject.lec))
            lab.appendChild(document.createTextNode(subject.subject.lab))
            units.appendChild(document.createTextNode(subject.subject.units))
            prerequisite.appendChild(document.createTextNode(subject.prerequisite || ''))
            // var deleteBtn = document.createElement("BUTTON");
            var btn = document.createElement("button");
            btn.addEventListener('click', myFunction, true);
            btn.className += "btn btn-danger btn-sm";
            btn.innerHTML = '<i class="fa fa-trash"/>';
            btn.setAttribute('id', subject.id)
            action.appendChild(btn);

            total_lec_num = parseInt(total_lec_num) + parseInt(subject.subject.lec);
            total_lab_num = parseInt(total_lab_num) + parseInt(subject.subject.lab);
            total_units_num = parseInt(total_units_num) + parseInt(subject.subject.units);





            // variant='danger'
            // size='sm'
            // class='deleteBtn'
            // @click='()=>onDeleteSubject(data.id)'>
            //   DELETE
            // var deleteBtn = document.createElement("BUTTON");
            // deleteBtn.innerHTML = "Delete";
            // deleteBtn.setAttribute("class", "btn btn-danger btn-sm deleteBtn");
            // // deleteBtn.addEventListener("click", "onDeleteSubject();");
            // deleteBtn.onclick = function() { runCommand() };
            // deleteBtn.setAttribute('v-on:click','onDeleteSubject();')
            // deleteBtn.onclick = "onDeleteSubject()";

            // action.appendChild(deleteBtn);

            tr.appendChild(code)
            tr.appendChild(desc)
            tr.appendChild(lec)
            tr.appendChild(lab)
            tr.appendChild(units)
            tr.appendChild(prerequisite)
            tr.appendChild(action)
            tr.setAttribute("class", tagClass);
            tbl.appendChild(tr)



          }
          // total units here
          var total_units_row = document.createElement('tr');
          total_units_row.setAttribute("class", tagClass);

          var total_num_of_units = document.createElement('td');
          var total_lec = document.createElement('td');
          var total_lab = document.createElement('td');
          var total_units = document.createElement('td');
          var last_td = document.createElement('td');

          total_num_of_units.setAttribute('id', 'total_units')
          total_num_of_units.appendChild(document.createTextNode("Total Number of Units"));
          total_lec.appendChild(document.createTextNode(total_lec_num));
          total_lab.appendChild(document.createTextNode(total_lab_num));
          total_units.appendChild(document.createTextNode(total_units_num));

          total_units_row.appendChild(total_num_of_units).colSpan = "2";
          total_units_row.appendChild(total_lec)
          total_units_row.appendChild(total_lab)
          total_units_row.appendChild(total_units)
          total_units_row.appendChild(last_td).colSpan = "2";
          tbl.appendChild(total_units_row)
        }
      }
    },

    // sets year level select box
    getYearLevel: function() {
      console.log(this.$route.params)

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
      this.selectedSubject = null;
      this.selectedYearLevel = null;
      if(this.showForm){
        this.getCurriculumSubjects();
        this.selectedYearLevel = "All";
        this.showForm = false;
      } else {
        this.items = [];
        this.curriculumSubjects = [];
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
      this.isLoading = true;
      Axios
        .get('http://localhost/api/v1/subjects', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          this.isLoading = false;

          // console.log(response.data)
          // console.log(this.filteredSubjects);
          var subjects = response.data;
          //

          console.log(subjects)
          console.log(this.filteredSubjects)
          var container = [];
          if(this.filteredSubjects.length > 0){
            for (var i = 0; i < subjects.length; i++) {
              var checker = false;
              var subject = subjects[i];
              for (var k = 0; k < this.filteredSubjects.length; k++) {
                var filteredSubject = this.filteredSubjects[k];
                if(subject.id == filteredSubject.subject_id){
                  checker = true;
                }
              }
              if(checker){
                console.log(1)
              }else{
                container.push(subjects[i]);
                console.log(container)
              }
            }
            this.items = container;
            this.totalRows = this.items.length;
          }else{
            this.items = subjects;
            this.totalRows = this.items.length;
          }

            // if (this.filteredSubjects.indexOf({ subject_id: filter_this[i].id})!=-1) {
            // if(1 == 1){
            //   this.items.push(filter_this[i]);
            // }

          // console.log(this.items);



          // var arr = [{ id: 1, username: 'fred' },
          //   { id: 2, username: 'bill'},
          //   { id: 3, username: 'ted' }];


          // for (var i = 0; i < filter_this.length; i++) {


            // var check = this.subjectChecker(filter_this[i], this.filteredSubjects);
          //
          //   usedTime.indexOf(converted) === -1 ? usedTime.push(converted) : console.log();
          //   var index = this.filteredSubjects.findIndex(x => {
          //     x.subject_id == filter_this[i].id
          //   })
          //   // here you can check specific property for an object whether it exist in your array or not
          //
          //   if (index === -1){
          //       this.items.push(filter_this[i]);
          //   }
          // console.log(check)

          // }

          // console.log(this.items)




        })
    },

    getFilteredSubjects: function() {

      // this.isLoading = true;
      Axios
        .get('http://localhost/api/v1/curriculum_subjects', {
          params : {
            curriculum_id : this.curriculum_data.id
            // ,year_level : this.selectedYearLevel,
            // semester_id : this.selectedSemester.id
          },
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        })
        .then(response => {
          this.filteredSubjects = response.data;
          // console.log(this.filteredSubjects);
          // if(this.filteredSubjects.length > 0){
            this.getSubjects();
          // }
        })
    },




     subjectChecker : function(subject, arr) {
      return arr.some(function(s) {
        return s.subject_id === subject.id;
      });
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    resetForm: function() {
      // this.form = {
      //   curriculum_title: null,
      //   curriculum_desc: null,
      //   course_id: null,
      //   active: 1
      // };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },


  }
}
</script>
