<template>
  <div>
    <h1 class="font-weight-bold text-dark">Manage Instructor Preferred Subjects</h1>
    <b-breadcrumb>
      <b-breadcrumb-item to="/manage/instructor">Instructors</b-breadcrumb-item>
      <b-breadcrumb-item :active="true">{{ instructor.name }}</b-breadcrumb-item>
    </b-breadcrumb>

    <!-- An alert for displaying success messages -->
    <b-alert variant="success"
      :show="dismissSuccessCountDown"
      @dismissed="dismissSuccessCountDown=0"
      dismissible fade>
        {{alertMessage}}
    </b-alert>

    <!-- An alert for displaying warning and/or error messages -->
    <b-alert variant="danger"
      :show="dismissErrorCountDown"
      @dismissed="dismissErrorCountDown=0"
      dismissible fade>
        <p>{{alertMessage}}</p>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
    </b-alert>

    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">
      <h5 class=" h5 font-weight-bold text-dark">Add Preferred Subject</h5><hr/>
      <div class="panel-body">
        <b-form id="Add_College_Subject_Form">
          <b-form-row>
            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="preferred_subject"
                label="Preferred Subject"
                label-for="preferred_subject">
                <b-form-select
                  id="preferred_subject"
                  v-model="preferredSubject.subject_id"
                  :options="subjectOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="academic_year"
                label="Academic Year"
                label-for="academic_year">
                <b-form-select
                  id="academic_year"
                  v-model="preferredSubject.academic_year_id"
                  :options="academicYearOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2">
              <b-form-group
                class="semester"
                label="Semester"
                label-for="semester">
                <b-form-select
                  id="semester"
                  v-model="preferredSubject.semester_id"
                  :options="semesterOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="2" class="d-flex justify-content-end align-items-end mb-1">
              <b-button variant="primary" @click="addPreferredSubject" class="px-5">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>

    <b-modal id="deletePreferredSubjModal" ref="deletePreferredSubjModal" title="Delete Preferred Subject" size="md">
      <center><h6>Are you sure you want to remove <br/><b>({{ preferredSubject.subject_code }}) {{preferredSubject.subject_title}}</b>?</h6></center>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button size="sm" variant="danger" @click="hideModal('deletePreferredSubjModal')">
            Cancel
          </b-button>
          <b-button class="float-right" size="sm" variant="success" @click="deletePreferredSubject">
            Delete
          </b-button>
        </b-col>
      </template>
    </b-modal>

    <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">

    <b-overlay :show="isLoading" rounded="sm">
    <b-table
      class="my-3 table-striped MyTable"
      responsive
      show-empty
      bordered
      hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter">

      <template v-slot:cell(actions)="row">

        <b-button variant="danger" size="sm" @click="DeleteModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Delete">
          <b-icon-trash/>
        </b-button>

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
</template>
<script>
  import Axios from "axios";
  export default{
    name: 'InstructorSubjectsManager',
    data(){
      return {
        items: [],
        fields: [
          { key: 'subject.subject_code', label: 'Day', class: 'text-center', sortable: true},
          { key: 'subject.subject_title', label: 'Time Start', sortable: true, class: 'text-center' },
          { key: 'academic_year.academic_year', label: 'Academic Year', sortable: true, class: 'text-center' },
          { key: 'semester.semester', label: 'Semseter', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        settings: this.$store.getters.getSettings,
        instructor: {
          id: null,
          name: null
        },
        columnDefs: null,
        rowData: null,
        id: null,

        preferredSubject: {
          subject_id: null,
          subject_code: null,
          subject_title: null,
          academic_year_id: null,
          semester_id: null,
          active: 1
        },

        subjectOptions: [],
        academicYearOptions: [],
        semesterOptions: [],

        isLoading: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
    },

    mounted() {
      this.getSubjects();
      this.getPreferredSubjects();
      this.getAcademicYears();
      this.getSemesters();
      this.preferredSubject.academic_year_id = this.settings.current_ay;
      this.preferredSubject.semester_id = this.settings.current_sem;
    },
    created() {
        // console.log(this.$route.params);
        this.instructor = {
          id: this.$route.params.id,
          name: this.$route.params.first_name + " " + this.$route.params.last_name
        }
    },
    methods: {
      hideModal: function($modal){
        this.$refs[$modal].hide();
      },
      deletePreferredSubject: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/instructors/' + this.instructor.id + '/preferred_subjects/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.getPreferredSubjects();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deletePreferredSubjModal'].hide();
      },
      addPreferredSubject: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/instructors/' + this.instructor.id + '/preferred_subjects', this.preferredSubject, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            // console.log(response)
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.getPreferredSubjects();
            this.preferredSubject.subject_id = null;
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
      getPreferredSubjects: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/instructors/' + this.instructor.id + '/preferred_subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.isLoading = false;
            // console.log(response.data);
            this.items = response.data;
          })
          .catch(error => {
            this.isLoading = false;
            // console.log(error.response);
          })
      },
      getSubjects: function(){
        Axios
          .get('http://localhost/api/v1/subjects', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            for(const subject of response.data){
              this.subjectOptions.push({value: subject.id, text: subject.subject_code + " - " +subject.subject_title});
            }
          })
          .catch(error => {
            // console.log(error.response);
          })
      },
      getAcademicYears: function(){
        Axios
          .get('http://localhost/api/v1/academic_years', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            for(const ay of response.data){
              this.academicYearOptions.push({value: ay.id, text: ay.academic_year});
            }
          })
          .catch(error => {
            // console.log(error.response.data.message);
          })
      },
      getSemesters: function(){
        Axios
          .get('http://localhost/api/v1/semesters', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            for(const sem of response.data){
              this.semesterOptions.push({value: sem.id, text: sem.semester});
            }
          })
          .catch(error => {
            // console.log(error.response.data.message);
          })
      },

      DeleteModal: function(item){
          this.id = item.id,
        this.preferredSubject = {
          subject_id: item.subject_id,
          subject_code: item.subject.subject_code,
          subject_title: item.subject.subject_title,
          academic_year_id: item.academic_year_id,
          semester_id: item.semester_id,
          active: item.active,

        };


          this.$root.$emit('bv::show::modal', 'deletePreferredSubjModal')
      },
    }
  }
</script>
