<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Student Reports</h1>
    <hr class="d-print-none"/>
    <div class="px-4">
      <b-form-row class="d-print-none">
        <b-col  cols="12" md="6" lg="2">
          <b-form-group class="academicyear" label="Academic Year" label-for="academicYear">
            <b-form-select id="academicYear" v-model="selectedAcademicYear" @change="onChangeAcademicYear">
              <option value="null" hidden>Select Academic Year</option>
              <option  :value="{id: ay.id, academic_year: ay.academic_year}" v-for="ay in academicYearOptions" >{{ay.academic_year}}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col  cols="12" md="6" lg="2">
          <b-form-group class="semester" label="Semester" label-for="Semester">
            <b-form-select id="Semester" v-model="selectedSemester" @change="onChangeSemester">
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
        <b-col cols="12" md="6" lg="2">
          <b-form-group class="yearlevel"label="Year Level" label-for="yearLevel">
            <b-form-select v-model="selectedYearLevel" id="yearLevel"
                           :options="yearOptions"
                           @change="filterTable">
              <option value="null" hidden>Select Year Level</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <!-- yearLevel -->
        <b-col cols="12" md="6" lg="2">
          <b-form-group class="block"label="Block" label-for="Block">
            <b-form-input
            id="Block"
            v-model="selectedBlock"
            @change="filterTable"
            list="BlockType"
            :placeholder="selectedBlock ? '' : 'Select Block'  ">
            </b-form-input>
            <datalist id="BlockType">
              <option v-for="block in blockOption">{{ block }}</option>
            </datalist>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2">
          <!-- Add New Room Button -->
          <b-button class="mt-4"  variant="primary" onclick="window.print()">
            Print
          </b-button>
        </b-col>
    </b-form-row>





  <div class="d-print-none mt-4 mb-4 px-4 pt-4 bg-white shadow rounded">

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

        <b-button
          variant="info" size="sm"
          @click="ViewGrades(row.item, row.index, $event.target)"
          v-b-tooltip.hover title="Grades"
          v-if="isAuthorized($store.getters.getSettings.student_schedule_management, 2)" >
            <b-icon-clipboard-data/>
        </b-button>

        <b-button
          variant="info" size="sm"
          @click="ViewPerosnalInfo(row.item, row.index, $event.target)"
          v-b-tooltip.hover title="Personal Information"
          v-if="isAuthorized($store.getters.getSettings.enrollment_management, 2)" >
            <b-icon-person/>
        </b-button>

        <b-button
          variant="info" size="sm"
          @click="ViewStudSchedule(row.item, row.index, $event.target)"
          v-b-tooltip.hover title="Schedule"
          v-if="isAuthorized($store.getters.getSettings.student_schedule_management, 2)" >
            <b-icon-clock/>
        </b-button>

        <b-button
          variant="info" size="sm"
          @click="ViewAcadRecord(row.item, row.index, $event.target)"
          v-b-tooltip.hover title="Academic Record"
          v-if="isAuthorized($store.getters.getSettings.student_schedule_management, 2)">
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

<!-- for printing only -->
<div id="to_print">
  <div class="header d-none d-print-block">
    <img src="../../assets/images/header_logo.png" alt="Comteq Logo" class="logo"/>
  </div>
  <div class="content d-none d-print-block ">
    <p  style="color: #002060" class="h2 font-weight-bold text-center mt-3">{{selectedAcademicYear.academic_year}}</p>
    <p  style="color: #ff0000" class="h4 font-weight-bold text-center">{{selectedSemester.semester}}</p>
    <p  class="h3 font-weight-bold text-center" >
      <span v-if="selectedCourse">{{selectedCourse.course}} - </span>
      <span v-if="selectedYearLevel">{{selectedYearLevel}} | </span>
      <span v-if="selectedBlock">Block {{selectedBlock}}</span>
    </p>

    <b-table
      class="my-3 table-striped"
      show-empty
      responsive
      bordered
      hover
      :items="filteredItems"
      :fields="fieldsForPrint"
      :current-page="currentPage"
      :per-page="perPage"
      :filter-function="filterTable">

      <template v-slot:cell(number)="data">
        {{ data.index + 1 }}
      </template>

    </b-table>

  </div>
  <!-- <div class="footer  d-none d-print-block text-center">This is the Footer</div> -->
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
              user: this.$store.getters.getUser,
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

              fieldsForPrint: [
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
              ],

              rowData: null,
              totalRows: 1,
              currentPage: 1,
              perPage: 5,
              pageOptions: [5, 10, 15, 20, 25],
              filter: null,

              blockOption: [1,2,3,4,5],

              academicYearOptions: this.$store.getters.getAcademicYears,
              semesterOptions: this.$store.getters.getSemesters,
              selectedBlock: 1,
              selectedAcademicYear: this.$store.getters.getCurrentAcademicYear,
              selectedSemester: this.$store.getters.getCurrentSemester,
              courseOption:null,
              selectedCourse: null,
              selectedYearLevel: null,
              selectedBlock: null,
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
            isAuthorized (activity, priv) {
            // activity level
            if (priv == 0) {
              // check if user has a privilege in this activity
              if (this.user.activities.some(a => a.privileges.activity_id === activity)) {
                return true
              }
              return false
            }


            // privilege level
            else {
              // check if user has the exact privilege (CRUD) to do this activity
              for (var a of this.user.activities) {
                if (a.privileges.activity_id === activity) {
                  switch (priv) {
                    // create
                    case 1:
                      if (a.privileges.create_priv == 1) {
                        return true
                      }
                      return false
                    // read
                    case 2:
                      if (a.privileges.read_priv == 1) {
                        return true
                      }
                      return false
                    // update
                    case 3:
                      if (a.privileges.update_priv == 1) {
                        return true
                      }
                      return false
                    case 4:
                      if (a.privileges.delete_priv == 1) {
                        return true
                      }
                      return false
                  } // end switch
                } // end of if (a.activity_id === activity)
              }
            }
          },

            onChangeSemester(){
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;

              // this.isLoading = true;
              this.filteredItems = [];
              var sem = this.selectedSemester.id;
              var ay = this.selectedAcademicYear.id;
              var container = [];
              for(var index in this.items) {
                  var obj = this.items[index];

                  if (obj.academic_year_id == ay && obj.semester_id == sem) {
                    container.push(obj);
                  }
              }

              this.filteredItems = container
              this.currentPage = 1;
              this.totalRows = this.filteredItems.length;
              this.GetAllStudents();
            },

            onChangeAcademicYear(){
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;

              // this.isLoading = true;
              this.filteredItems = [];
              var sem = this.selectedSemester.id;
              var ay = this.selectedAcademicYear.id;
              var container = [];
              for(var index in this.items) {
                  var obj = this.items[index];

                  if (obj.academic_year_id == ay && obj.semester_id == sem) {
                    container.push(obj);
                  }
              }

              this.filteredItems = container
              this.currentPage = 1;
              this.totalRows = this.filteredItems.length;
              this.GetAllStudents();

            },

            ViewAcadRecord: function(item) {
              this.$router.replace({
                name: 'StudentAcademicReport',
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
                name: 'StudentScheduleReport',
                params: item
              })
              // console.log(item)
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
                params: item
              })
              console.log(item)


            },

            GetAllStudents: function(){
              Axios.get('http://localhost/api/v1/enrollments', {
                // add more params
                params: {academic_year_id: this.selectedAcademicYear.id, active : 1, },
                headers: { Authorization: 'Bearer ' + this.$store.getters.getToken }
              })
                .then(response => {

                  this.items = response.data;
                  this.filteredItems = response.data;
                  this.totalRows = this.items.length;

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
              var sem = this.selectedSemester.id;
              var ay = this.selectedAcademicYear.id;
              var course = this.selectedCourse.course;
              var year = this.selectedYearLevel;
              var block = this.selectedBlock;
              var container = [];
              for(var index in this.items) {
                  var obj = this.items[index];

              console.log(year);
                  if (year == null) {
                    if (obj.course.course_code == course && obj.academic_year_id == ay && obj.semester_id == sem) {
                       container.push(obj)

                     }
                  }else {
                    if (block == null) {
                      if (obj.course.course_code == course && obj.year_level == year && obj.academic_year_id == ay && obj.semester_id == sem) {
                          container.push(obj)
                      }
                    }else {
                      if (obj.course.course_code == course && obj.year_level == year && obj.block == block && obj.academic_year_id == ay && obj.semester_id == sem) {
                          container.push(obj)
                      }
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
