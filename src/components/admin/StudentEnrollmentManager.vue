<template>
  <div>
    <h1>Manage Student Enrollment</h1>
    <hr/>
    <div class="panel panel-primary recordMaintenanceForm">
      <div class="panel-heading">Enroll Student</div>
      <div class="panel-body">

        <b-form id="Add_Semester_Form">
          <b-form-row>

            <!-- Student Number -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="studentno"
                label="Student No."
                label-for="studentNo">
                <b-form-input
                  type="text"
                  v-model="student_number"
                  id="studentNo"
                  @keyup="searchNumber"
                  :state="state"
                  maxlength=12
                  placeholder="Search Student Number here..."
                  ></b-form-input>
              </b-form-group>
            </b-col>
            <!-- Student Number -->

            <!-- fullName -->
            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="fullname"
                label="Full Name"
                label-for="fullName">
                <b-form-input
                  type="text"
                  v-model="full_name"
                  id="fullName"
                  required></b-form-input>
              </b-form-group>
            </b-col>
            <!-- fullName -->

            <!-- Date Enrolled-->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="dateEnrolled"
                label="Date Enrolled"
                label-for="dateEnrolled">
                <b-form-input
                  type="date"
                  v-model="selectedDate"
                  id="dateEnrolled"
                  ></b-form-input>
              </b-form-group>
            </b-col>
            <!-- Date Enrolled -->

            <!-- Academic Year -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="Academic"
                label="Academic"
                label-for="Academic">
                <b-form-select
                  v-model="selectedAcademic"
                  id="Academic">
                  <option value="null" hidden>Select Academic</option>
                  <option  :value="ay.id" v-for="ay in academicYearOptions" >{{ay.academic_year}}</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <!-- Academic Year -->

            <!-- Semester  -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="semester"
                label="Semester"
                label-for="Semester">
                <b-form-select
                  v-model="selectedSemester"
                  id="Semester">
                  <option value="null" hidden>Select Semester</option>
                  <option  :value="sem.id" v-for="sem in semesterOptions" >{{sem.semester}}</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <!-- Semester  -->

            <!-- Student Status -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="studentStatus"
                label="Student Status"
                label-for="studentStatus">
                <b-form-select
                  v-model="selectedStudentStatus"
                  id="studentStatus">
                  <option value="null" hidden>Select Student Status</option>
                  <option value="New">New</option>
                  <option value="Old">Old</option>
                  <option value="Transferee">Transferee</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <!-- Student Status -->

            <!-- Academic Status -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="academicstatus"
                label="Academic Status"
                label-for="academicStatus">
                <b-form-select
                  v-model="selectedAcademicStatus"
                  id="academicStatus">
                  <option value="null" hidden>Select Academic Status</option>
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <!-- Academic Status -->



          </b-form-row>

          <b-form-row>
            <!-- Course -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="course"
                label="Course"
                label-for="Course">
                <b-form-select
                  v-model="selectedCourse"
                  id="Course">
                  <option value="null" hidden>Select Course</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <!-- Course -->

            <!-- Curriculum -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="curriculum"
                label="Curriculum"
                label-for="Curriculum">
                <b-form-select
                  v-model="selectedCurriculum"
                  id="Curriculum">
                  <option value="null" hidden>Select Curriculum</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <!-- Curriculum -->

            <!-- yearLevel -->
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="yearlevel"
                label="Year Level"
                label-for="yearLevel">
                <b-form-select
                  v-model="selectedYearLevel"
                  id="yearLevel">
                  <option value="null" hidden>Select Year Level</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <!-- yearLevel -->

            <!-- enroll button -->
            <b-col cols="12" md="6" lg="3">
              <b-button
                class="mt-4"
                variant="success"
                block>
                Enroll
              </b-button>
            </b-col>
            <!-- enroll button -->

          </b-form-row>
        </b-form>
      </div>
    </div>

    <div class="myTable px-4 py-3 my-5">
      <!-- Adding Form Start  -->
      <b-row>
        <b-col lg="4" class="my-1 ">
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

      </b-row>

      <!-- Main table element -->
      <b-table
        class="my-3 table-striped"
        show-empty
        responsive
        head-variant="dark"
        bordered
        hover
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter">

        <template v-slot:cell(active)="row" >
          <p v-if="row.item.active"><b-badge class="p-2" variant="success">Active</b-badge></p>
          <p v-else><b-badge class="p-2" variant="danger">Inactive</b-badge></p>

        </template>
      </b-table>

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
  export default{
    name: 'StudentEnrollmentManager',
    data() {
      return {
        items: [],
        fields: [
          { key: 'room_number', label: 'Room Number', class: 'text-center', sortable: true},
          { key: 'room_name', label: 'Room Name', sortable: true, class: 'text-center' },
          { key: 'room_type', label: 'Room Type', sortable: true, class: 'text-center' },
          { key: 'room_capacity', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        semesters:{
          semester:null
        },

        RegStudent:{
          id: null,
          name: null,
          student_number:null,
        },

        // form models
        state: null,
        student_id: null,
        selectedAcademic: null,
        selectedSemester: null,
        selectedStudentStatus: null,
        selectedAcademicStatus: null,
        selectedCourse: null,
        selectedCurriculum: null,
        selectedYearLevel: null,
        selectedDate: null,
        full_name: null,

        // form options
        academicYearOptions: [],
        semesterOptions: [],


        student_number: null,
        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
    },


    mounted () {
      this.test();
      this.getSemesters();
      this.getAcademicYear();
      this.getRegisteredStudents();
    },


    methods:{
      // Search student using student number
      searchNumber:function(){
        this.student_number = this.student_number.length == 4 ? this.student_number + "-" : this.student_number;
        this.student_number = this.student_number.length == 7 ? this.student_number + "-" : this.student_number;
        if(this.student_number.length > 11){
          let data = this.rowData.filter(obj=>obj.student_number == this.student_number);
          if(data.length > 0){
            var info = data[0];
            var suff =  info.suffix_name != null ? info.suffix_name + ",. " : ", "
            var middle =  info.middle_name != null ? info.middle_name : ""
            this.full_name = info.last_name + suff + info.first_name + " " + middle;
            this.student_id = info.id;
            this.state = true;
          }else{
            this.state = false;
            this.full_name = null;
            this.student_id = null;
          }
        }else{
          this.state = null;
          this.full_name = null;
          this.student_id = null;
        }
      }, // end of function searchNumber

      // get all semester
      getSemesters: function(){
        Axios
          .get('http://localhost/api/v1/semesters', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.semesterOptions = response.data;
          })
          .catch(error => {
            if(error.response.status == 500){
              this.getSemesters();
            }
          })
      }, // end of function getSemesters

      // get all semester
      getAcademicYear: function(){
        Axios
          .get('http://localhost/api/v1/academic_years', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.academicYearOptions = response.data;
          })
          .catch(error => {
            if(error.response.status == 500){
              this.getAcademicYear();
            }
          })
      }, // end of function getSemesters


      getClassSched: function(){
        Axios
          .get('http://localhost/api/v1/class_schedules', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.items = response.data;
            this.totalRows = this.items.length;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      },

      // this function will get all student records
      getRegisteredStudents: function(){
        Axios
          .get('http://localhost/api/v1/students',  {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.rowData = response.data;
          })
          .catch(error => {
            console.log(error.response);
          })
      }, // end of function getRegisteredStudents

      getRegisteredStudent: function(){
        Axios
          .get('http://localhost/api/v1/students/' + this.RegStudent.id,  {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            this.rowData = response.data;

          })
          .catch(error => {
            console.log(error.response);
          })
      },

      addSemeter: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/semesters', this.semesters, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSemesters();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.semesters = {
              semester: null
            };
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
          })
      },

      updateSemester: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/semesters/' + this.id, this.semesters, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getSemesters();
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          // clear subject data
          this.semesters = {
            semester: null
          };
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
        this.$refs['editSemesterModal'].hide();
      },

      deleteSemester: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/semesters/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getSemesters();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.semesters = {
              semester: null
            };
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            /*const values = Object.values(error.response.data.errors);
            for(const val of values){
              for(const err of val){
                this.errors.push(err);
              }
            }*/
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteSemesterModal'].hide();
      },

      // start of testing
      test: function(){
        if(Object.keys(this.$route.params).length === 0){
          this.RegStudent = {
               id: '',
               name: '',
               student_number: '',
             };
        }else {
          var p = this.$route.params;

            p.suffix_name =  p.suffix_name != null ? p.suffix_name : ""
            p.middle_name =  p.middle_name != null ? p.middle_name : ""

             this.RegStudent = {
                  id: this.$route.params.id,
                  name:
                    p.last_name + " " + p.suffix_name + ", " + p.first_name + " " + p.middle_name,
                    // this.$route.params.last_name +" "+this.$route.params.suffix_name+", "+this.$route.params.first_name+" "+this.$route.params.middle_name,
                  student_number: this.$route.params.student_number,
                };
                this.student_number = this.$route.params.student_number;
        }
        // console.log(this.$route.params);
      }
    }
  }
</script>
