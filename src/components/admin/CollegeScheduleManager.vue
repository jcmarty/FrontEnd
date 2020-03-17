<template>
  <div>

  <h1>College Class Schedule</h1><hr/>

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
      <div class="panel-heading">Add a Class Schedule</div>
      <div class="panel-body">
        <b-form id="Add_ClassSchedule_Form">

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="academicyear"
              label="Academic Year"
              label-for="academicYear">
              <b-form-select
                id="academicYear"
                v-model="selected"
                @change="getAY()">
                <option v-for="ay in AyRow"
                v-bind:value="ay.id">{{ay.academic_year}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="semester"
              label="Semester"
              label-for="Semester">
              <b-form-select
                id="Semester"
                v-model="selected"
                @change="getInstructorSchedule()">
                <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="course"
              label="Course"
              label-for="Course">
              <b-form-select
                id="Course"
                v-model="selected"
                @change="getInstructorSchedule()">
                <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="curriculum"
              label="Curriculum"
              label-for="Curriculum">
              <b-form-select
                id="Curriculum"
                v-model="selected"
                @change="getInstructorSchedule()">
                <option v-for="ay in rowData "
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="yearlevel"
              label="Year Level"
              label-for="yearLevel">
              <b-form-select
                id="yearLevel"
                v-model="selected"
                @change="getInstructorSchedule()">
                <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="subject"
              label="Subject"
              label-for="Subject">
              <b-form-select
                id="Subject"
                v-model="selected"
                @change="getInstructorSchedule()">
                <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="blockbatch"
              label="Block Batch"
              label-for="blockBatch">
              <b-form-select
                id="blockBatch"
                v-model="selected"
                @change="getInstructorSchedule()">
                <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="leclab"
              label="Lecture Laboratory"
              label-for="lectureLaboratory">
              <b-form-select
                id="lectureLaboratory"
                v-model="selected"
                @change="getInstructorSchedule()">
                <option v-for="ay in rowData"
                v-bind:value="ins.id">{{ins.first_name}} {{ins.last_name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_Semester_Btn" @click="addSemeter">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>

    <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New Class Schedule
    </b-button>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="CollegeClassScheduleColumnDefs"
      :rowData="CollegeClassSchedRow"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

  </div>
</template>

    <script>
    import Axios from "axios";
    import {AgGridVue} from "ag-grid-vue";
    import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
    import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';

        export default {
            name: 'CollegeClassSchedule',
            data() {
                return {
                  CollegeClassScheduleColumnDefs: null,
                  columnDefs: null,
                  CollegeClassSchedRow: null,
                  AyRow: null,
                  gridOptions: null,
                  showForm: false,
                  alertMessage: "",
                  errors: [],
                  dismissSecs: 7,
                  dismissSuccessCountDown: 0,
                  dismissErrorCountDown: 0,
                  // full_name: this.instructor.first_name + " " + this.instructor.last_name,
                }
            },
            components: {
                AgGridVue,
            },
            beforeMount() {
              this.gridOptions = {
                  context: {
                      componentParent: this
                  }
              };

              this.CollegeClassScheduleColumnDefs = [
                  {headerName: 'Subject Code', field: 'subject.subject.subject_code', sortable: true, filter: true, width: 150, resizable:true },
                  {headerName: 'Subject Description', field: 'subject.subject.subject_description', sortable: true, filter: true, width: 150, resizable:true},
                  {headerName: 'Day', field: 'day', sortable: true, filter: true, width: 150,},
                  {headerName: 'Time Start', field: 'time_start', sortable: true, filter: true, width: 150},
                  {headerName: 'Time End', field: 'time_end', sortable: true, filter: true, width: 150},
                  {headerName: 'Room ID.', field: 'room.room_number', sortable: true, filter: true, width: 150},
                  {headerName: 'Instructor ID.', field: 'instructor.first_name' , sortable: true, filter: true, width: 150},
                  {headerName: 'Block', field: 'block', sortable: true, filter: true, width: 150},
                  {headerName: 'Batch', field: 'batch', sortable: true, filter: true, width: 150},
                  {headerName: 'Class Type', field: 'class_type', sortable: true, filter: true, width: 150},
                  {headerName: 'Academic Year', field: 'academic_year_id', sortable: true, filter: true, width: 150},
                  {headerName: 'Semester', field: 'semester_id', sortable: true, filter: true, width: 150},
              ];

              },
              mounted () {
                this.getClassSchedule();
                // this.getAY();
              },

              methods: {
                getClassSchedule: function(){
                  Axios
                    .get('http://localhost/api/v1/class_schedules', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      //console.log(response.data.data);
                      this.CollegeClassSchedRow = response.data;
                    })
                },

                getAY: function(){
                  Axios
                    .get('http://localhost/api/v1/academic_years', {
                      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                    })
                    .then(response => {
                      //console.log(response.data.data);
                      this.AyRow = response.data;
                    })
                },


                toggleForm: function(){
                  if(this.showForm){
                    this.showForm = false;
                  } else {
                    this.showForm = true;
                  }
                },
              },

            }
    </script>

  </div>
</template>
