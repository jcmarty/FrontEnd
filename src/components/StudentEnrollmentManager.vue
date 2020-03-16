<template>
  <div>
    <h1>Manage Student Enrollment</h1>

    <div class="panel panel-primary recordMaintenanceForm">
      <div class="panel-heading">Enroll Student</div>
      <div class="panel-body">

        <b-form id="Add_Semester_Form">
          <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="studentno"
              label="Student No."
              label-for="studentNo">
              <b-form-input
                type="text"
                v-bind:value=" RegStudent.student_number "
                id="studentNo"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="studentStatus"
              label="Student Status"
              label-for="studentStatus">
              <b-form-input
                type="text"
                v-model="semesters.semester"
                id="studentStatus"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="academicstatus"
              label="Academic Status"
              label-for="academicStatus">
              <b-form-input
                type="text"
                v-model="semesters.semester"
                id="academicStatus"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="fullname"
              label="Full Name"
              label-for="fullName">
              <b-form-input
                type="text"
                v-bind:value=" RegStudent.name "
                id="fullName"
                required></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="course"
              label="Course"
              label-for="Course">
              <b-form-input
                type="text"
                v-model="semesters.semester"
                id="Course"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="curriculom"
              label="Curriculom"
              label-for="Curriculom">
              <b-form-input
                type="text"
                v-model="semesters.semester"
                id="Curriculom"
                required></b-form-input>
            </b-form-group>
          </b-col>

        <b-col cols="12" md="6" lg="3">
          <b-form-group
            class="yearlevel"
            label="Year Level"
            label-for="yearLevel">
            <b-form-input
              type="text"
              v-model="semesters.semester"
              id="yearLevel"
              required></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="3">
          <b-form-group
            class="dateenrolled"
            label="Date Enrolled"
            label-for="dateEnrolled">
            <b-form-input
              type="text"
              v-model="semesters.semester"
              id="dateEnrolled"
              required></b-form-input>
          </b-form-group>
        </b-col>
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
        responsive=true
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
    },


    methods:{
      getSemesters: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.SubjectcsRowData = response.data;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      },

      toggleForm: function(){
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },

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

      toggleForm: function(){
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
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
             this.RegStudent = {
                  id: this.$route.params.id,
                  name:
                    this.$route.params.last_name +" "+
                    this.$route.params.suffix_name+", "+
                    this.$route.params.first_name+" "+
                    this.$route.params.middle_name,
                  student_number: this.$route.params.student_number,
                };
        }
        // console.log(this.$route.params);
      }
    }
  }
</script>
