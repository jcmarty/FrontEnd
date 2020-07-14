<template>
  <div>
    <div class="dash_page_title">
      Online Enrollment
      <hr />
    </div>

    <!-- start of course setup form -->
    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="courseSetupForm">
      <div class=" h5 font-weight-bold text-dark" >Course Setup</div>
      <hr/>
      <b-form-row>
        <!-- Course -->
        <b-col cols="12" md="3" lg="3">
          <b-form-group class="course"
                        label="Course"
                        label-for="Course">
            <b-form-select v-model="selectedCourse"
                           id="Course"
                           @change="onChangeCourse"
                           aria-describedby="course-feedback">
              <option value="null" hidden>Select Course</option>
              <option v-for="c in courseRow" :value="{
                id : c.id,
                year : c.year_duration,
                course_code : c.course_code,
                curriculum : c.curriculum
                }">{{c.course_code}}
              </option>
            </b-form-select>

          </b-form-group>
        </b-col>
        <!-- Course -->

        <!-- Curriculum -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group class="curriculum"
                        label="Curriculum"
                        label-for="Curriculum">
            <b-form-select v-model="selectedCurriculum"
                           id="Curriculum"
                           @change="onChangeYearLevel"
                           aria-describedby="curriculum-feedback">
              <option value="null" hidden>Select Curriculum</option>
              <option v-for="curriculum in curriculumOptions " v-bind:value="{id: curriculum.id, subjects: curriculum.curriculum_subjects, curriculum: curriculum}">{{curriculum.curriculum_title}}</option>
            </b-form-select>

          </b-form-group>
        </b-col>
        <!-- Curriculum -->

        <!-- yearLevel -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group class="yearlevel"
                        label="Year Level"
                        label-for="yearLevel">
            <b-form-select v-model="selectedYearLevel"
                           id="yearLevel"
                           :options="yearOptions"
                           @change=""
                           aria-describedby="yearLevel-feedback">
              <option value="null" hidden>Select Year Level</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <!-- yearLevel -->
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-button variant="danger" @click="cancelEnrollment">
            Cancel
          </b-button>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button variant="primary" @click="showSubjectsForm">
            Next
          </b-button>
        </b-col>
      </b-form-row>
    </div>
    <!-- end of course setup form -->

    <!-- start of course setup form -->
    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="subjectSetupForm">
      <div class=" h5 font-weight-bold text-dark" >Subject Setup</div>
      <hr/>
      <b-form-row>
        <b-col>
          <b-button variant="danger" @click="showCourseForm">
            Previous
          </b-button>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button variant="primary" @click="showPreviewForm">
            Next
          </b-button>
        </b-col>
      </b-form-row>
    </div>
    <!-- end of course setup form -->

    <!-- start of course setup form -->
    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="previewForm">
      <div class=" h5 font-weight-bold text-dark" >Preview Enrollment</div>
      <hr/>
      <b-form-row>
        <b-col>
          <b-button variant="danger" @click="showSubjectsForm">
            Previous
          </b-button>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button variant="primary" @click="">
            Enroll
          </b-button>
        </b-col>
      </b-form-row>
    </div>
    <!-- end of course setup form -->

    <!-- start of Enrollment table -->
    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">

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

        <b-col class="pt-4">
          <!-- Add New Room Button -->
          <b-button variant="primary" @click="showCourseForm" class="toggleFormBtn" v-if="addbtn">
            New Enrollment
          </b-button>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-overlay :show="isLoading" rounded="sm">
        <b-table
          class="my-3 table-striped"
          show-empty
          responsive
          bordered
          hover
          refreshed
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">
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

        <b-col offset-lg="6" sm="12" md="4" lg="5"class="my-1">
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
    <!-- enrollment table -->
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: 'StudentOnlineEnrollment',

  data() {
    return {

      isLoading: false,
      items : [],
      fields : [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      filter: null,

      courseRow : [],

      courseSetupForm: false,
      subjectSetupForm: false,
      previewForm: false,
      addbtn : true,

      showForm: false,
      alertMessage: "",
      errors: [],
      dismissSecs: 7,
      dismissSuccessCountDown: 0,
      dismissErrorCountDown: 0,

      selectedAcademicYear: null,
      selectedSemester: null,
      selectedStudentStatus: null,
      selectedAcademicStatus: null,
      selectedCourse: null,
      selectedCurriculum: null,
      selectedYearLevel: null,
      selectedDate: null,
      selectedBlock: null,
      full_name: null,
      address: "",

      curriculumOptions: null,
      yearOptions: [],
      subjectOptions: [],
      addedSubjects: [],
    }
  }, // End of Data
  mounted(){
    this.getCourses();
  },

  methods:{

    getCourses: function(){

      Axios
        .get('http://localhost/api/v1/online/courses', {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getStudentToken}
        })
        .then(response => {
          this.courseRow = response.data;
        })
        .catch(error => {
          alert(error.response.data.message)
          this.alertMessage = error.response.data.message;
          const values = Object.values(error.response.data.errors);
          for(const val of values){
            for(const err of val){
              this.errors.push(err);
            }
          }
          this.dismissErrorCountDown = this.dismissSecs;
        });
    },

    // gets all curriculum record
    onChangeCourse: function() {
      this.courseState = null;
      var curriculums = this.selectedCourse.curriculum
      if (curriculums.length == 0) {
        this.curriculumOptions = null
      } else {
        this.curriculumOptions = curriculums
      }
      // clears values in select boxes
      this.selectedCurriculum = null;
      this.selectedYearLevel = null;
      this.yearOptions = [];
    }, // end of function onChangeCourse

    // SET YEAR LEVEL BASED ON SELECTED COURSE
    onChangeYearLevel: function() {
      this.curriculumState = null;
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
    }, // end of function onChangeYearLevel

    cancelEnrollment: function(){
      this.courseSetupForm = false;
      this.addbtn = true;
    },

    showCourseForm : function(){
      this.courseSetupForm = true;
      this.subjectSetupForm = false;
      this.addbtn = false;
    },

    showSubjectsForm : function(){
      this.courseSetupForm = false;
      this.subjectSetupForm = true;
      this.previewForm = false;
      this.addbtn = false;
    },

    showPreviewForm : function(){
      this.subjectSetupForm = false;
      this.previewForm = true;
      this.addbtn = false;
    },
  }
}
</script>

<style lang="css" scoped>
.dash_page_title{
  font-size: 17pt;
  font-weight: bold;
  padding: 0;
  margin-bottom: 20px;
}
</style>
