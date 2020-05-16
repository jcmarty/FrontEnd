<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Student Reports</h1>
    <hr class="d-print-none"/>
    <div class="px-4">
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

        <b-col  cols="12" md="6" lg="2">
          <b-form-group class="course" label="course" label-for="Course">
            <b-form-select id="Course" v-model="selectedCourse" @change="setYearLevel">
              <option value="null" hidden>Select Course</option>
              <option  :value="{id: course.id, course: course.course_code, year: course.year_duration}" v-for="course in courseOption" >{{course.course_code}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <!-- yearLevel -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group class="yearlevel"label="Year Level" label-for="yearLevel">
            <b-form-select v-model="selectedYearLevel" id="yearLevel"
                           :options="yearOptions"
                           @change="filterTable">
              <option value="null" hidden>Select Year Level</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col class="py-4">
          <!-- Add New Room Button -->
          <b-button variant="primary" onclick="window.print()">
            Print
          </b-button>
        </b-col>
    </b-form-row>





  <div class="d-print-none mt-4 mb-4 px-4 pt-4 bg-white shadow rounded">
    <center>
      <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="responsive d-none d-print-block" id="ComteqLogoPrint"/>
    </center>

    <b-form-row class="d-none d-print-block">
        <center>
          <h5>COMTEQ Computer & Business College</h5>
          <h6>1200 4th floor Savers Appliance Depot, Rizal Ave, East Tapinac Olongapo City Zambales. </h6>
      </center>
    </b-form-row>

    <!-- Main table element -->
    <b-table
      class="my-3 table-striped"
      show-empty
      responsive
      bordered
      hover
      :items="filteredItems"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter-function="filterTable">

    </b-table>

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
