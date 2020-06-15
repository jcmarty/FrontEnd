<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Manage Student Grades</h1>
    <hr class="d-print-none"/>

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

      <b-form-row class="d-print-none">
        <b-col  cols="12" md="6" lg="2">
          <b-form-group class="academicyear" label="Academic Year" label-for="academicYear">
            <b-form-select id="academicYear" v-model="selectedAcademicYear" @change="">
              <option value="null" hidden>Select Academic Year</option>
              <option  :value="{id: ay.id, academic_year: ay.academic_year}" v-for="ay in academicYearOptions" >{{ay.academic_year}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col  cols="12" md="6" lg="2">
          <b-form-group class="semester" label="Semester" label-for="Semester">
            <b-form-select id="Semester" v-model="selectedSemester" @change="">
              <option value="null" hidden>Select Semester</option>
              <option  :value="{id: sem.id, semester: sem.semester}" v-for="sem in semesterOptions" >{{sem.semester}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group class="instructor" label="Instructor" label-for="Instructor">
            <b-form-select id="Instructor" @change="getSubject" v-model="selectedInstructor">
              <option value="null" hidden>Select Instructor</option>
              <option v-if="instructorRow === null" value="null" disabled>No Instructors</option>
              <option v-else v-for="data in instructorRow" v-bind:value="data.id">{{data.last_name}}, {{data.middle_name}} {{data.first_name}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group class="subject" label="Subject" label-for="Subject">
            <b-form-select id="Subject" @change="filterStudentSchedule" v-model="selectedSubject">
              <option value="null" hidden>Select Subject</option>
              <option v-if="SubjectsRow === null" value="null" disabled>No Subjects</option>
              <option v-else v-for="data in SubjectsRow" v-bind:value="{id: data.id, subject_code: data.subject_code ,subject_id: data.subject_id}">
                {{data.subject_code}} - {{data.subject.subject.subject_title}}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- Alert Message -->
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


        <!-- <template v-slot:cell(full_name)="row" >
          <p v-if="row.item.enrollment.student.suffix_name">{{row.item.enrollment.student.last_name}} {{row.item.enrollment.student.suffix_name}}, {{row.item.enrollment.student.middle_name}} {{row.item.enrollment.student.first_name}} </p>
          <p v-else>{{row.item.enrollment.student.last_name}}, {{row.item.enrollment.student.middle_name}} {{row.item.enrollment.student.first_name}} </p>
        </template> -->

        <template v-slot:cell(prelim_grade)="row" >
          <input type="number" class="Grade" v-model="row.item.prelim_grade" :disabled="input_status.prelim_disabled" max="100"/>
        </template>

        <template v-slot:head(prelim_grade)="row" >
            <b-form-group class="Prelim" label="Prelim Grades" label-for="Prelim">
              <b-button v-if="input_status.prelim_disabled" size="sm" variant="warning" :hidden="hidebutton"
                  @click="input_status = {
                    prelim_disabled: false,
                    midterm_disabled: true,
                    prefinal_disabled: true,
                    final_disabled: true,
                    semestral_disabled: true
                  }"
              >
                  <i class="fa fa-pencil"></i>
              </b-button>

              <b-button v-if="!input_status.prelim_disabled" size="sm" variant="success" @click="PrelimSaveGrades">
                <i class="fa fa-save"></i>
              </b-button>
            </b-form-group>
        </template>

        <template v-slot:cell(midterm_grade)="row" >
          <input type="number" class="Grade" v-model="row.item.midterm_grade" :disabled="input_status.midterm_disabled" max="100"></input>
        </template>

        <template v-slot:head(midterm_grade)="row" >
            <b-form-group class="Midterm" label="Midterm Grades" label-for="Midterm">
              <b-button v-if="input_status.midterm_disabled" size="sm" variant="warning" :hidden="hidebutton"
                  @click="input_status = {
                    prelim_disabled: true,
                    midterm_disabled: false,
                    prefinal_disabled: true,
                    final_disabled: true,
                    semestral_disabled: true
                  }"
              >
                  <i class="fa fa-pencil"></i>
              </b-button>

              <b-button v-if="!input_status.midterm_disabled" size="sm" variant="success" @click="MidtermSaveGrades">
                <i class="fa fa-save"></i>
              </b-button>
            </b-form-group>
        </template>

        <template v-slot:cell(prefinal_grade)="row" >
          <input type="number" class="Grade" v-model="row.item.prefinal_grade" :disabled="input_status.prefinal_disabled" max="100"></input>
        </template>

        <template v-slot:head(prefinal_grade)="row" >
            <b-form-group class="Prefinal" label="Prefinal Grades" label-for="Prefinal">
              <b-button v-if="input_status.prefinal_disabled" size="sm" variant="warning" :hidden="hidebutton"
                  @click="input_status = {
                    prelim_disabled: true,
                    midterm_disabled: true,
                    prefinal_disabled: false,
                    final_disabled: true,
                    semestral_disabled: true
                  }"
              >
                  <i class="fa fa-pencil"></i>
              </b-button>

              <b-button v-if="!input_status.prefinal_disabled" size="sm" variant="success" @click="PrefinalSaveGrades">
                <i class="fa fa-save"></i>
              </b-button>
            </b-form-group>
        </template>

        <template v-slot:cell(final_grade)="row" >
            <input type="number" class="Grade" v-model="row.item.final_grade" :disabled="input_status.final_disabled" max="100"></input>
        </template>

        <template v-slot:head(final_grade)="row" >
            <b-form-group class="Final" label="Final Grades" label-for="Final">
              <b-button v-if="input_status.final_disabled" size="sm" variant="warning" :hidden="hidebutton"
                  @click="input_status = {
                    prelim_disabled: true,
                    midterm_disabled: true,
                    prefinal_disabled: true,
                    final_disabled: false,
                    semestral_disabled: true
                  }"
              >
                  <i class="fa fa-pencil"></i>
              </b-button>

              <b-button v-if="!input_status.final_disabled" size="sm" variant="success" @click="FinalSaveGrades">
                <i class="fa fa-save"></i>
              </b-button>
            </b-form-group>
        </template>

        <!-- <template v-slot:cell(semestral)="row" > -->
          <!-- <input type="text" class="Grade" :disabled="input_status.semestral_disabled" :value="(row.item.prelim_grade + row.item.midterm_grade + row.item.prefinal_grade + row.item.final_grade) / 4 "> -->
            <!-- <input type="text" class="Grade" v-model="row.item.prelim_grade" :disabled="input_status.semestral_disabled" >
            </input> -->

        <!-- </template> -->
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
        name: 'StudentReport',
        data() {
            return {
              items: [],
              fields: [
                { key: 'number', label: 'Number', sortable: true, class: 'text-center',
                sortByFormatted: true,
                formatter: (value, key, item, index) => {
                   // this.counter = this.counter + 1;


                   return index;
                  // return item.time_start  + "-" + item.time_end;
                  }
                },
                { key: 'full_name', label: 'Name', class: 'text-center', sortable: true,
                sortByFormatted: true,
                formatter: (value, key, item) => {
                  var suffix = item.student.suffix_name? " " + item.student.suffix_name : "";
                  var middle = item.student.middle_name? " " + item.student.middle_name: "";
                  return item.student.last_name  + suffix + ', ' + item.student.first_name + middle;
                  }
                },

                { key: 'student.student_number', label: 'Student Number', sortable: true, class: 'text-center' },
                { key: 'student.address', label: 'Address', sortable: true, class: 'text-center' },
                { key: 'student.contact_number', label: 'Contact Number', sortable: true, class: 'text-center' },
                { key: 'student.birth_date', label: 'Birthday', sortable: true, class: 'text-center' },
                { key: 'student.birth_place', label: 'Birth Place', sortable: true, class: 'text-center' },
                { key: 'course.course_code', label: 'Course', sortable: true, class: 'text-center' },
                { key: 'year_level', label: 'Year Level', sortable: true, class: 'text-center' },
              ],

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

          mounted () {
            this.GetAllStudents(),
            this.GetCourse()
          },

          methods: {
            GetAllStudents: function(){
              Axios.get('http://localhost/api/v1/enrollments', {
                // add more params
                params: {active : 1},
                headers: { Authorization: 'Bearer ' + this.$store.getters.getToken }
              })
                .then(response => {
                  this.items = response.data;
                  this.filteredItems = response.data;
                  this.totalRows = this.items.length;
                  console.log(response.data)
                })
                .catch(error => {
                  console.log(error.response)
                })
            },

            GetCourse: function(){
              Axios
                .get('http://localhost/api/v1/courses', {
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(response => {
                  this.courseOption = response.data;
                })

            },

            setYearLevel: function() {
              if (this.selectedCourse.year == '4') {
                this.yearOptions = [
                  { value: '1st Year', text: '1st Year' },
                  { value: '2nd Year', text: '2nd Year' },
                  { value: '3rd Year', text: '3rd Year' },
                  { value: '4th Year', text: '4th Year' }
                ]
              } else if (this.selectedCourse.year == '2') {
                this.yearOptions = [
                  { value: '1st Year', text: '1st Year' },
                  { value: '2nd Year', text: '2nd Year' }
                ]
              }
              // clears values in select boxes
              this.selectedYearLevel = null;
              this.filterTable();
            }, // end of function setYearLevel

            // this will filter activity record
            filterTable: function(){
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;

              // this.isLoading = true;
              this.filteredItems = [];

              var container = [];
              for(var index in this.items) {
                  var obj = this.items[index];
                  var course = this.selectedCourse.course;
                  var year = this.selectedYearLevel
                  if (year == null) {
                    if (obj.course.course_code == course) {
                      container.push(obj)
                    }
                  }else {
                    if (obj.course.course_code == course && obj.year_level == year) {
                      container.push(obj)
                    }
                  }


              }

              // setTimeout(() => {this.isLoading = false; }, 1000);
              this.filteredItems = container
              this.currentPage = 1;
              this.totalRows = this.filteredItems.length;

            }, // end of function filterTable

          }

}
</script>
