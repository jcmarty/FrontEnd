<template>
  <div>
    <h1>Manage Course</h1>
    <!--form Start  -->
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
    <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
      <div class="panel-heading">Add a Course</div>
      <div class="panel-body">
        <b-form id="Add_Course_Form">
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="coursecode"
              label="Course Code"
              label-for="courseCode">
              <b-form-input
                type="text"
                v-model="course.course_code"
                id="courseCode"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Name -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="coursedesc"
              label="Course Desc"
              label-for="courseDesc">
              <b-form-input
                type="text"
                v-model="course.course_desc"
                id="courseDesc"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Type -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="coursemajor"
              label="Course Major"
              label-for="courseMajor">
              <b-form-input
                type="text"
                v-model="course.course_major"
                id="courseMajor"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!-- Room Capacity -->
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="yearduration"
              label="Year Duration"
              label-for="yearDuration">
              <b-form-input
                type="text"
                v-model="course.year_duration "
                id="yearDuration"
                required></b-form-input>
            </b-form-group>
          </b-col>

            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_Course_Btn" @click="addCourse">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>
    <!--Form end  -->

    <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New Course
    </b-button>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

    <b-modal id="editCourseModal" ref="editCourseModal" title="Edit Course" size="xl">
      <b-form-row>
      <!-- Room Number -->
      <b-col cols="12" md="6" lg="2">
        <b-form-group
          class="coursecode"
          label="Course Code"
          label-for="courseCode">
          <b-form-input
            type="text"
            v-model="course.course_code"
            id="courseCode"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!--  Room Name -->
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          class="coursedesc"
          label="Course Desc"
          label-for="courseDesc">
          <b-form-input
            type="text"
            v-model="course.course_desc"
            id="courseDesc"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!--  Room Type -->
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          class="coursemajor"
          label="Course Major"
          label-for="courseMajor">
          <b-form-input
            type="text"
            v-model="course.course_major"
            id="courseMajor"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!-- Room Capacity -->
      <b-col cols="12" md="6" lg="2">
        <b-form-group
          class="yearduration"
          label="Year Duration"
          label-for="yearDuration">
          <b-form-input
            type="number"
            v-model="course.year_duration"
            id="yearDuration"
            required></b-form-input>
        </b-form-group>
      </b-col>
      </b-form-row>

      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('editCourseModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="updateCourse()">
          Update
        </b-button>
      </template>
    </b-modal>

    <b-modal id="deleteCourseModal" ref="deleteCourseModal" title="Delete Course" size="lg">
      <p>Are you sure you want to delete {{ this.course.course_code }}?</p>

      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('deleteCourseModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deleteCourse()">
          Delete
        </b-button>
      </template>
    </b-modal>
  </div>
</template>   

<script>
  import Axios from "axios";
  import {AgGridVue} from "ag-grid-vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  import CoursesActionButtons from "./ActionButtons/CoursesActionButtons.vue";
  export default{
    name: 'CoursesManager',
    components: {
      AgGridVue,
      CoursesActionButtons
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        id: null,
        course: {
          course_code: null,
          course_desc: null,
          course_major: null,
          year_duration: 0,
          active: 1
        },
        options: [
          {value: 0, text: 'Inactive'},
          {value: 1, text: 'Active'}
        ],
        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
    },
    beforeMount(){
      this.gridOptions = {
          context: {
              componentParent: this
          }
      };
      this.columnDefs = [
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 80},
          {headerName: 'Course Code', field: 'course_code', sortable: true, filter: true, width: 130, resizable: true},
          {headerName: 'Course Desc', field: 'course_desc', sortable: true, filter: true, resizable: true},
          {headerName: 'Course Major', field: 'course_major', sortable: true, filter: true, width: 150},
          {headerName: 'Year Duration Units', field: 'year_duration', sortable: true, filter: true, width: 180,},
          {headerName: 'Status', field: 'active', width: 120,
            cellRenderer: (data) => {
              if(data.value === 1){
                return 'Active';
              } else {
                return 'Inactive';
              }
            }},
          {headerName: 'Actions', field: 'id', cellRendererFramework: 'CoursesActionButtons'}
      ];

    },
    mounted () {
      this.getCourses();
    },
    methods:{
      getCourses: function(){
        Axios
          .get('http://localhost/api/v1/courses', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data.data);
            this.rowData = response.data;
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
      addCourse: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/courses', this.course, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getCourses();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.course = {
              course_code: null,
              course_desc: null,
              course_major: null,
              year_duration: 0,
              active: 1
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
      updateCourse: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/courses/' + this.id, this.course, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getCourses();
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          // clear subject data
          this.course = {
            course_code: null,
            course_desc: null,
            course_major: null,
            year_duration: 0,
            active: 1
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
        this.$refs['editCourseModal'].hide();
      },
      deleteCourse: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/courses/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getCourses();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.course = {
              course_code: null,
              course_desc: null,
              course_major: null,
              year_duration: 0,
              active: 1
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
        this.$refs['deleteCourseModal'].hide();
      }
    }
  }
</script>
