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

        <!-- yearLevel -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group class="block"label="Block" label-for="Block">
            <b-form-select v-model="selectedBlock" id="Block"
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

      <template v-slot:cell(number)="data">
        {{ data.index + 1 }}
      </template>

      <template v-slot:cell(actions)="row">

        <b-button variant="info" size="sm"  @click="ViewGrades(row.item, row.index, $event.target)" v-b-tooltip.hover title="Grades">
          <b-icon-clipboard-data/>
        </b-button>

        <b-button variant="info" size="sm"  @click="ViewPerosnalInfo(row.item, row.index, $event.target)" v-b-tooltip.hover title="Personal Information">
          <b-icon-person/>
        </b-button>

        <b-button variant="info" size="sm"  @click="ViewStudSchedule(row.item, row.index, $event.target)" v-b-tooltip.hover title="Schedule">
            <b-icon-clock/>
        </b-button>

        <b-button variant="info" size="sm"  @click="ViewAcadRecord(row.item, row.index, $event.target)" v-b-tooltip.hover title="Academic Record">
            <b-icon-card-list/>
        </b-button>

      </template>

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
                { key: 'number', label: 'Number', sortable: true, class: 'text-center'},
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
                { key: 'actions', label: 'Actions' , class: 'text-center' }
              ],

              rowData: null,
              totalRows: 1,
              currentPage: 1,
              perPage: 5,
              pageOptions: [5, 10, 15, 20, 25],
              filter: null,

              academicYearOptions: this.$store.getters.getAcademicYears,
              semesterOptions: this.$store.getters.getSemesters,
              selectedBlock: 1,
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
            ViewAcadRecord: function(item) {
              this.$router.replace({
                name: 'StudentGradeReport',
                params: {
                  id: item.id,
                  student_number: item.student.student_number,
                  first_name: item.student.first_name,
                  middle_name: item.student.middle_name,
                  last_name: item.student.last_name,
                  suffix_name: item.student.suffix_name,
                }
              })
            },

            ViewStudSchedule: function(item) {
              this.$router.replace({
                name: 'StudentGradeReport',
                params: {
                  id: item.id,
                  student_number: item.student.student_number,
                  first_name: item.student.first_name,
                  middle_name: item.student.middle_name,
                  last_name: item.student.last_name,
                  suffix_name: item.student.suffix_name,
                }
              })
            },

            ViewPerosnalInfo: function(item) {
              this.$router.replace({
                name: 'StudentInformationReport',
                params: {
                  id: item.id,
                  student_number: item.student.student_number,
                  first_name: item.student.first_name,
                  middle_name: item.student.middle_name,
                  last_name: item.student.last_name,
                  suffix_name: item.student.suffix_name,
                  gender: item.student.gender,
                  civil_status: item.student.civil_status,
                  citizenship:item.student.citizenship,
                  address: item.student.address,
                  barangay: item.student.barangay,
                  city: item.student.city,
                  postal: item.student.postal,
                  province: item.student.province,
                  telephone: item.student.telephone,
                  cellphone: item.student.cellphone,
                  email: item.student.email,
                  birth_date: item.student.birth_date,
                  birth_place: item.student.birth_place,
                  father_name: item.student.father_name,
                  mother_name: item.student.mother_name,
                  contact_person: item.student.contact_person,
                  contact_address: item.student.contact_address,
                  contact_number: item.student.contact_number,
                  school_last_attended: item.student.school_last_attended,
                  school_address: item.student.school_address,
                  college_last_attended: item.student.college_last_attended,
                  college_address: item.student.college_address,

                }
              })
            },

            ViewGrades: function(item) {
              this.$router.replace({
                name: 'StudentGradeReport',
                params: {
                  id: item.id,
                  student_number: item.student.student_number,
                  first_name: item.student.first_name,
                  middle_name: item.student.middle_name,
                  last_name: item.student.last_name,
                  suffix_name: item.student.suffix_name,
                }
              })
            },

            GetAllStudents: function(){
              Axios.get('http://localhost/api/v1/enrollments', {
                // add more params
                params: {active : 1},
                headers: { Authorization: 'Bearer ' + this.$store.getters.getToken }
              })
                .then(response => {
                  console.log(response.data)
                  this.items = response.data;
                    // console.log(this.items);
                  this.filteredItems = response.data;
                  this.totalRows = this.items.length;
                  // console.log(response.data)
                })
                .catch(error => {
                  // console.log(error.response)
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
                  var year = this.selectedYearLevel;
                  var block = this.selectedBlock;
                  if (year == null) {
                    if (obj.course.course_code == course) {
                      container.push(obj)
                    }
                  }else {
                    if (obj.course.course_code == course && obj.year_level == year) {
                      container.push(obj)
                    }
                  }
                  // if (year == null) {
                  //
                  // }else {
                  //   if (block == null) {
                  //
                  //   }else {
                  //
                  //   }
                  // }


              }

              // setTimeout(() => {this.isLoading = false; }, 1000);
              this.filteredItems = container
              this.currentPage = 1;
              this.totalRows = this.filteredItems.length;

             }, // end of function filterTable

          }

}
</script>
