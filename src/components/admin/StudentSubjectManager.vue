<template>  <!-- Start Template -->
  <div> <!-- Start of Main Div -->

    <h1>Manage Student Subjects</h1>
    <hr/>

    <!-- edit student academic info -->
    <transition name="fade">
      <!-- start of academic form -->
      <div id="" class="mx-3 mb-4 pt-4 pb-2 px-4 bg-white shadow rounded" v-if="showUpdateForm">
      <div class=" h5 font-weight-bold text-dark">Update Academic Information</div>
      <hr/>
      <div class="">
        <b-row>
          <!-- academic year -->
          <b-col cols="12" md="6" lg="3">
            <b-form-group class=""
                          label="Academic Year"
                          label-for="academic_year">
              <b-form-input
                             :value="this.studentRecord.academic_year.academic_year"
                             type="text"
                             disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
          <!-- end of academic year -->

          <!-- semester -->
          <b-col cols="12" md="6" lg="3">
            <b-form-group class=""
                          label="Semester"
                          label-for="semester">
              <b-form-input
                             :value="this.studentRecord.semester.semester"
                             type="text"
                             disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
          <!-- end of semester -->

          <!-- course -->
          <b-col cols="12" md="6" lg="3">
            <b-form-group class=""
                          label="Course"
                          label-for="course">
              <b-form-input
                             :value="this.studentRecord.course.course_code"
                             type="text"
                             disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
          <!-- end of course -->

          <!-- curriculum -->
          <b-col cols="12" md="6" lg="3">
            <b-form-group class=""
                          label="Curriculum"
                          label-for="curriculum">
              <b-form-input
                             :value="this.studentRecord.curriculum.curriculum_title"
                             type="text"
                             disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
          <!-- end of curriculum -->
        </b-row>
        <b-row>
          <!-- Student Status -->
          <b-col cols="12" md="6" lg="3">
            <b-form-group class="studentStatus"
                          label="Student Status"
                          label-for="studentStatus">
              <b-form-select
                v-model="studentRecord.student_status"
                id="studentStatus"
                @change="">
                <option value="" hidden>Student Status</option>
                <option value="NEW">New</option>
                <option value="OLD">Old</option>
                <option value="TRANSFEREE">Transferee</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <!-- Student Status -->

          <!-- Academic Status -->
          <b-col cols="12" md="6" lg="3">
            <b-form-group class="academicstatus"
                          label="Academic Status"
                          label-for="academicStatus">
              <b-form-select
                v-model="studentRecord.academic_status"
                id="academicStatus"
                @change="">
                <option value="null" hidden>Academic Status</option>
                <option value="REGULAR">Regular</option>
                <option value="IRREGULAR">Irregular</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <!-- end of Academic Status -->

          <!-- yearLevel -->
          <b-col cols="12" md="6" lg="3">
            <b-form-group class="yearlevel"
                          label="Year Level"
                          label-for="yearLevel">
              <b-form-select
                             v-model="studentRecord.year_level"
                             id="yearLevel"
                             :options="yearOptions"
                             @change="">
                <option value="null" hidden>Select Year Level</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <!-- yearLevel -->


          <!-- block -->
          <b-col cols="12" md="6" lg="3">
            <b-form-group class="block"
                          label="Block"
                          label-for="block">
              <b-form-select
                            v-model="studentRecord.block"
                             id="block"
                             @change="">
                <option value="null" hidden>Select Block</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <!-- end of block -->
        </b-row>
        <!-- Academic Status -->
      </div>
      <hr/>
      <!-- go back button -->
      <b-row>
        <b-col>
          <b-button
                    class="text-white pull-left"
                    size=""
                    variant="danger"
                    @click="toggleForm"
                    ><i class="fa fa-ban" aria-hidden="true"/> Cancel
          </b-button>
        </b-col>
        <b-col>
          <b-button
                    class="text-white pull-right"
                    size=""
                    variant="success"
                    @click="updateStudentInfo"
                    ><i class="fa fa-save" aria-hidden="true"/> Save
          </b-button>
        </b-col>
      </b-row>
    </div>
      <!-- end of academic form -->
    </transition>
    <!-- edit student academic info -->

    <!-- start student information -->
    <transition name="fade">
      <div id="" class="mx-3 mb-4 pt-4 pb-2 px-4 bg-white shadow rounded" v-if="!showUpdateForm">
        <!-- form title -->
        <div class=" h5 font-weight-bold text-dark">Academic Information</div>
        <hr/>



          <div class="row mx-5 mt-2">

            <!-- full name -->
            <div class="mb-3 column w-25">
              <h6 >Full Name :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">
                {{studentRecord.student.last_name}}{{studentRecord.student.suffix_name?  " " + studentRecord.student.suffix_name  + ", " : ", "}}
                {{studentRecord.student.first_name}}
                {{studentRecord.student.middle_name? studentRecord.student.middle_name : ""}}
              </h6>
            </div>
            <!-- end of full name -->

            <!-- student number -->
            <div class="mb-3 column w-25">
              <h6 >Student Number :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.student.student_number}}</h6>
            </div>
            <!-- end of student number -->


          </div>



          <div class="row mx-5">

            <!-- academic year -->
            <div class="mb-3 column w-25">
              <h6 >Academic Year :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.academic_year.academic_year}}</h6>
            </div>
            <!-- end of academic year -->

            <!-- end of semester -->
            <div class="mb-3 column w-25">
              <h6 >Semester :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.semester.semester}}</h6>
            </div>
            <!-- end of semester -->
          </div>

          <div class="row mx-5">
            <!-- course -->
            <div class="mb-3 column w-25">
              <h6 >Course :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.course.course_code}}</h6>
            </div>
            <!-- end of course -->

            <!-- curriculum -->
            <div class="mb-3 column w-25">
              <h6 >Curriculum :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.curriculum.curriculum_title}}</h6>
            </div>
            <!-- end of curriculum -->
          </div>

          <div class="row mx-5">
            <!-- year level -->
            <div class="mb-3 column w-25">
              <h6 >Year Level :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.year_level.toUpperCase()}}</h6>
            </div>
            <!-- end of year level -->

            <!-- block -->
            <div class="mb-3 column w-25">
              <h6>Block :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.block}}</h6>
            </div>
            <!-- end of block -->
          </div>

          <div class="row mx-5">
            <!-- student status -->
            <div class="mb-3 column w-25">
              <h6 >Student Status :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.student_status}}</h6>
            </div>
            <!-- end of student status -->

            <!-- academic status -->
            <div class="mb-3 column w-25">
              <h6>Academic Status :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{studentRecord.academic_status}}</h6>
            </div>
            <!-- end of academic status -->
          </div>


        <hr/>
        <!-- go back button -->
        <b-row>
          <b-col>
            <b-button
                      class="text-white pull-left"
                      size=""
                      variant="secondary"
                      @click="$router.replace({name: 'StudentEnrollmentManager'})"
                      ><i class="fa fa-arrow-left" aria-hidden="true"/> Go Back
            </b-button>
          </b-col>
          <b-col>
            <b-button
                      v-if="!showUpdateForm"
                      class="text-white pull-right"
                      size=""
                      variant="warning"
                      @click="toggleForm"
                      ><i class="fa fa-pencil" aria-hidden="true"/> Update
            </b-button>
          </b-col>
        </b-row>
      </div>
    </transition>
    <!-- end of student information -->

    <!-- Alert Message -->
    <b-alert class="mx-3" variant="success"
      :show="dismissSuccessCountDown"
      @dismissed="dismissSuccessCountDown=0"
      dismissible fade>
        {{alertMessage}}
    </b-alert>
    <b-alert class="mx-3" variant="danger"
      :show="dismissErrorCountDown"
      @dismissed="dismissErrorCountDown=0"
      dismissible fade>
        <p>{{alertMessage}}</p>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
    </b-alert>
    <!-- End of Alert Message -->

    <!-- start of student subject table -->
    <b-overlay :show="isLoading" rounded="sm">
      <div id="" class="mt-4 mx-3 mb-4 p-4 bg-white shadow rounded">
        <!-- form title -->
        <b-row>
          <b-col>
            <div class=" h5 font-weight-bold text-dark">Enrolled Subject</div>
          </b-col>
          <b-col>
            <b-button
                      v-if="studentRecord.academic_status == 'IRREGULAR'"
                      class="pull-right"
                      size=""
                      variant="primary"
                      @click="showAddModal($route.params)"
                      ><i class="fa fa-plus" aria-hidden="true"/> Add Subject
            </b-button>
          </b-col>
        </b-row>
        <hr/>

        <!-- table -->
        <b-table
          class="my-3 table-striped"
          fixed
          show-empty
          responsive
          head-variant="dark"
          bordered
          hover
          :items="subjectRecords"
          :fields="subjectFields"
          :current-page="1"
          :per-page="perEnrollPage">

          <!-- template for actions button -->
          <template v-slot:cell(actions)="row" >
            <b-button
                      v-if="row.item.status == 'DROPPED'"
                      size="sm" variant="success" @click="showEnrollModal(row.item)">Enroll
            </b-button>
            <b-button
                      v-if="row.item.status == 'ENROLLED'"
                      class="text-white" size="sm" variant="warning" @click="showDropModal(row.item)" >Drop
            </b-button>
            <b-button
                      v-if="row.item.status == 'ENROLLED'"
                      v-b-tooltip.hover title="Delete Subject"
                      class="text-white" size="sm" variant="danger" @click="showDeleteModal(row.item)">
                      <i class="fa fa-trash" aria-hidden="true"></i>
            </b-button>
          </template>
          <!-- end of action button -->

          <!-- template for actions button -->
          <template v-slot:cell(status)="row" >
            <!-- ENROLLED STATUS -->
            <div v-if="row.item.status == 'ENROLLED' || row.item.status == 'PASSED'" class="text-center text-success font-weight-bold mx-3 my-auto px-2 py-1">
              {{row.item.status}}
            </div>
            <!-- DROPPED STATUS -->
            <div v-if="row.item.status == 'DROPPED'" class="text-center text-danger font-weight-bold mx-3 my-auto px-2 py-1">
              {{row.item.status}}
            </div>
          </template>
          <!-- end of action button -->



          <!-- column styling -->
          <template v-slot:table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{
                width: field.key == 'actions' ? '180px' : ''  ||
                       field.key == 'status' ? '140px' : ''  ||
                       field.key == 'curriculum_subject.subject.subject_code' ? '150px' : '',
              }"

            >
          </template>
          <!-- column styling -->

        </b-table>
        <!-- end of table -->
      </div>
    </b-overlay>
    <!-- end of student subject table -->

    <!-- verifyDropModal -->
    <b-modal id="verifyDropModal" ref="verifyDropModal" title="Drop Subject" size="md">
      <h6 class="text-center mb-2">Are you sure you want to drop <br/>
      </h6>
      <div class="h6 text-dark text-center font-weight-bold" v-if="toBeUpdate">
        {{toBeUpdate.curriculum_subject.subject.subject_code}} -
        {{toBeUpdate.curriculum_subject.subject.subject_title}}
      </div>
      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
        <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('verifyDropModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="updateSubject">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <!-- end of verifyDropModal -->

    <!-- verifyEnrollModal -->
    <b-modal id="verifyEnrollModal" ref="verifyEnrollModal" title="Enroll Subject" size="md">
      <h6 class="text-center mb-2">Are you sure you want to enroll <br/>
      </h6>
      <div class="h6 text-dark text-center font-weight-bold" v-if="toBeUpdate">
        {{toBeUpdate.curriculum_subject.subject.subject_code}} -
        {{toBeUpdate.curriculum_subject.subject.subject_title}}
      </div>
      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
        <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('verifyEnrollModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="updateSubject">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <!-- end of verifyEnrollModal -->

    <!-- verifyEnrollModal -->
    <b-modal id="verifyDeleteModal" ref="verifyDeleteModal" title="Enroll Subject" size="md">
      <h6 class="text-center mb-2">Are you sure you want to delete <br/>
      </h6>
      <div class="h6 text-dark text-center font-weight-bold" v-if="toBeUpdate">
        {{toBeUpdate.curriculum_subject.subject.subject_code}} -
        {{toBeUpdate.curriculum_subject.subject.subject_title}}
      </div>
      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
        <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('verifyDeleteModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="deleteSubject">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <!-- end of verifyDeleteModal -->

    <!-- verifyEnrollModal -->
    <b-modal id="verifyAddModal" ref="verifyAddModal" title="Add Subject" size="lg" no-close-on-backdrop>
      <div>
        <b-row>
          <b-col lg="4" class="mt-3">
            <b-form-group
            class="filter"
            label=""
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

        <!-- subjects to enroll -->
        <b-table
          class="my-3 table-striped"
          show-empty
          responsive
          head-variant="dark"
          bordered
          hover
          stacked="md"
          :items="subjectItems"
          :fields="subjectItemsField"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">

          <template v-slot:cell(action)="row" >
            <b-form-checkbox v-model="selected" :value="row.item" >
            </b-form-checkbox>
          </template>

        </b-table>

          <b-row>

            <!-- <b-col class="my-1 col-md-3 offset-md-6"> -->
            <b-col class="my-1">
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
      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
        <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left" variant="danger" @click="$bvModal.hide('verifyAddModal'); {{selected = [];}}">
            Close
          </b-button>
          <b-button class="float-right" variant="success" @click="addSubject">
            Add Subject
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <!-- end of verifyDeleteModal -->


  </div> <!-- End of Main Div -->
</template>   <!-- End of Template -->

<script>
  import Axios from "axios";
  import axiosRetry from 'axios-retry';
  axiosRetry(Axios, { retries: 3 });
  export default{
    name: 'StudentSubjectManager',
    data() {
      return {
        // for enrolled subjects table
        subjectRecords : [],
        subjectFields : [
          { key: 'curriculum_subject.subject.subject_code', label: 'Subject Code', sortable: true, class: 'text-center' },
          { key: 'curriculum_subject.subject.subject_title', label: 'Title', sortable: true, class: 'text-center' },
          { key: 'status', label: 'Status', class: 'text-center' },
          { key: 'actions', label: 'Actions', class: 'text-center' },
        ],
        perEnrollPage : null,

        //
        subjectItems : [],
        subjectItemsField : [
          { key: 'action', label: 'Action', class: 'text-center' },
          { key: 'subject.subject_code', label: 'Subject Code', sortable: true, class: 'text-center' },
          { key: 'subject.subject_title', label: 'Title', sortable: true, class: 'text-center' },
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        toBeUpdate : null,

        // for adding subjects
        studentRecord : this.$route.params,
        selectedAcademicYear: null,
        selectedSemester: null,

        selectedStudentStatus : null,
        selectedAcademicStatus: null,
        selectedYearLevel: null,
        selectedBlock: null,

        courseOptions: this.$store.getters.getCourses,
        enrolledCourse : null,
        yearOptions: [],
        selected : [],
        showUpdateForm : false,

        // for user alert message
        isLoading: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
    }, // end of data


    mounted () {

      var myParam = {
        enrollment_id : this.$route.params.id
      }

      this.getStudentSchedules(myParam)


      // this.enrolledCourse = this.courseOptions.find(course => {
      //   return course.value.id == this.studentRecord.course_id
      // });

        // scroll page to the top
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, // end of mounted

    methods:{

      // update student information
      updateStudentInfo: function(){
        // this.$route.params = this.studentRecord;
        // console.log(this.studentRecord)
        Axios
          .put('http://localhost/api/v1/enrollments/' + this.studentRecord.id, this.studentRecord, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {

            console.log(response)
            // this.dismissSuccessCountDown = 7;
            // this.alertMessage = "Academic information successfully updated.";

            var myParam = {
              enrollment_id : this.studentRecord.id
            }

            this.getStudentSchedules(myParam)
            this.toggleForm();
          })
          .catch(error => {
            console.log(error.response)
          });
      }, // end of function updateStudentInfo

      // get enrolled subjects of student
      getStudentSchedules: function(myParam){
        this.isLoading = true;
        this.subjectRecords = [];
        Axios
        .get('http://localhost/api/v1/student_schedules', {
            params: myParam,
            headers: {
              'Authorization': 'Bearer ' + this.$store.getters.getToken
            }
        })
        .then(response => {
          // console.log(response.data)
          this.isLoading = false;
          // console.log(response.data[0])
          this.studentRecord = response.data[0].enrollment;
          this.subjectRecords = response.data;
          this.perEnrollPage = response.data.length;

          console.log(this.studentRecord)
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error.response)
        });
      }, // end of function getStudentSchedules

      // verify drop subject
      showDropModal: function(item){
        this.$root.$emit('bv::show::modal', 'verifyDropModal');
        this.toBeUpdate = item;
        // console.log(item)
      }, // end of function showDropModal

      // verify enroll subject
      showEnrollModal: function(item){
        this.$root.$emit('bv::show::modal', 'verifyEnrollModal');
        this.toBeUpdate = item;
        // console.log(item)
      }, // end of function showEnrollModal

      // verify delete subject
      showDeleteModal: function(item){
        this.$root.$emit('bv::show::modal', 'verifyDeleteModal');
        this.toBeUpdate = item;
        // console.log(item)
      }, // end of showDeleteModal

      // verify delete subject
      showAddModal: function(item){
        this.$root.$emit('bv::show::modal', 'verifyAddModal');
        // console.log(this.courseOptions)

        // find the current course of the student
        var currentCourse = this.courseOptions.find(course => {
          return course.value.id == this.studentRecord.course_id
        });

        // find enrolled curriculum
        var currentCurriculum = currentCourse.value.curriculum.find(curriculum => {
          return curriculum.id == this.studentRecord.curriculum_id
        });


        this.subjectItems = currentCurriculum.curriculum_subjects;
        this.totalRows = currentCurriculum.curriculum_subjects.length;
      }, // end of showDeleteModal

      // adds selected subject from add Modal
      addSubject : function(){

        var toAdd = {
          enrollment_id : this.studentRecord.id,
          subject_id : null,
          status : 'ENROLLED',
          active  : 1
        };

        for(var i = 0; i < this.selected.length; i++ ){
          toAdd.subject_id = this.selected[i].id;
          Axios
          .post('http://localhost/api/v1/student_schedules', toAdd,{
            headers: { Authorization: 'Bearer ' + this.$store.getters.getToken }
          })
          .then(response => {
            // console.log(response)
            this.dismissSuccessCountDown = 7;
            this.alertMessage = "Subject successfully added.";
          })
          .catch(error => {
            console.log(error.response)
          });
        }

        document.body.scrollTop = 400;
        document.documentElement.scrollTop = 400;

        var myParam = {
          enrollment_id : this.$route.params.id
        }

        this.$root.$emit('bv::hide::modal', 'verifyAddModal');
        this.selected = [];
        this.getStudentSchedules(myParam);

      }, // end of function addSubject


      // Update subject
      updateSubject: function(){
        // passing of params
        var data = {
          enrollment_id : this.toBeUpdate.enrollment_id,
          subject_id : this.toBeUpdate.subject_id,
          status : this.toBeUpdate.status == "DROPPED"? "ENROLLED" : "DROPPED",
          active : 1,
        }

        Axios
        .put('http://localhost/api/v1/student_schedules/' + this.toBeUpdate.id, data, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          // console.log(response)

          document.body.scrollTop = 400;
          document.documentElement.scrollTop = 400;

          this.dismissSuccessCountDown = 7;
          this.alertMessage = data.status == "DROPPED"? "Subject successfully dropped." : "Subject successfully enrolled.";

          var myParam = {
            enrollment_id : this.$route.params.id
          }

          this.$root.$emit('bv::hide::modal', 'verifyDropModal');
          this.$root.$emit('bv::hide::modal', 'verifyEnrollModal');
          this.getStudentSchedules(myParam);
        })
        .catch(error => {
          console.log(error.response)
        });
      }, // end of function updateSubject


      // delete student subject record
      deleteSubject: function(){

        Axios
        .delete('http://localhost/api/v1/student_schedules/' + this.toBeUpdate.id, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          // console.log(response)

          document.body.scrollTop = 400;
          document.documentElement.scrollTop = 400;

          this.dismissSuccessCountDown = 7;
          this.alertMessage = "Subject successfully deleted.";

          var myParam = {
            enrollment_id : this.$route.params.id
          }

          this.$root.$emit('bv::hide::modal', 'verifyDeleteModal');
          this.getStudentSchedules(myParam);
        })
        .catch(error => {
          console.log(error.response)
        });
      }, // end of function deleteSubject

      // show and hide form
      toggleForm: function(){
        // sets year level options
        if (this.studentRecord.course.year_duration == '4') {
          this.yearOptions = [
            { value: '1st Year', text: '1st Year' },
            { value: '2nd Year', text: '2nd Year' },
            { value: '3rd Year', text: '3rd Year' },
            { value: '4th Year', text: '4th Year' }
          ]
        } else if (this.studentRecord.course.year_duration == '2') {
          this.yearOptions = [
            { value: '1st Year', text: '1st Year' },
            { value: '2nd Year', text: '2nd Year' }
          ]
        }

        if(this.showUpdateForm){
          // this.showAddBtn = true;
          this.showUpdateForm = false;
        }else{
          // this.showAddBtn = false;
          this.showUpdateForm = true;
        }
      }, // end of function toggleForm

    } // end of methods

  } // end of Export Default
</script>
