<template> <!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1 class="font-weight-bold text-dark">Manage Course</h1>
    <hr/>

    <!-- Alert Message -->
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

    <!-- Adding Form Start  -->

    <div class="addPanel">
      <transition name="fade">
        <!-- <div class="panel panel-primary recordMaintenanceForm" v-if="showForm">
          <div class="panel-heading">Add a Course</div>
          <div class="panel-body"> -->
        <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="showForm">
          <div class=" h5 font-weight-bold text-dark" >Add New Course</div>
          <hr/>
            <b-form id="Add_Course_Form">
                <b-form-row>
                  <!-- Course Code -->
                  <b-col cols="12" md="6" lg="4">
                  <b-form-group
                    class="coursecode"
                    label="Course Code"
                    label-for="courseCode">
                    <b-form-input
                      type="text"
                      v-model="course.course_code"
                      id="courseCode"
                      required>
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <!--  Course Description -->
                <b-col cols="12" md="6" lg="8">
                  <b-form-group
                    class="coursedesc"
                    label="Description"
                    label-for="courseDesc">
                    <b-form-input
                      type="text"
                      v-model="course.course_desc"
                      id="courseDesc"
                      required>
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>

              <b-form-row>
                <!-- Year Duration-->
                <b-col cols="12" md="6" lg="4">
                  <b-form-group
                    class="yearduration"
                    label="Year Duration"
                    label-for="yearDuration">
                    <b-form-input
                      type="number"
                      v-model="course.year_duration "
                      id="yearDuration"
                      required>
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <!--  Course Manager -->
                <b-col cols="12" md="6" lg="8">
                  <b-form-group
                    class="coursemajor"
                    label="Course Major"
                    label-for="courseMajor">
                    <b-form-input
                      type="text"
                      v-model="course.course_major"
                      id="courseMajor"
                      required>
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>

              <b-form-row>
                <b-col cols="12" md="12" lg="12">
                  <hr/>
                </b-col>
              </b-form-row>

              <!-- Form Buttons -->
              <b-form-row>
                <b-col>
                  <b-button variant="danger" @click="toggleForm">
                    Cancel
                  </b-button>
                </b-col>
                <b-col class="d-flex justify-content-end">
                  <b-button variant="success" id="Add_Course_Btn" @click="addCourse">
                    Add
                  </b-button>
                </b-col>
              </b-form-row>

            </b-form> <!-- End of b-form  -->
          </div> <!-- End of form container  -->
      </transition>
    </div> <!-- End of addPanel  -->

    <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">
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

        <b-col class="pt-4">
          <!-- Add New Room Button -->
          <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
            Add New Course
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
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">

          <template v-slot:cell(year_duration)="row" >
            <p v-if="row.item.year_duration">{{row.item.year_duration}} years</p>
          </template>

          <template v-slot:cell(active)="row" >
            <b-form-checkbox switch size="sm" :checked="row.item.status"  @change="StatusUpdate(row.item, $event.target)">
              <b-badge variant="success" pill v-if="row.item.active">Active</b-badge>
              <b-badge variant="danger"  pill v-else>Inactive</b-badge>
            </b-form-checkbox>
          </template>

          <template v-slot:cell(actions)="row">
            <b-button variant="warning" size="sm" v-b-tooltip.hover title="Edit Course"  @click="EditModal(row.item, row.index, $event.target)" class="mr-1">
              <b-icon-pencil/>
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
      <!-- end of table -->


      <b-modal id="editCourseModal" ref="editCourseModal" title="Edit Course" size="lg" no-close-on-backdrop>
        <b-form-row>
        <!-- Course Code -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            class="coursecode"
            label="Course Code"
            label-for="courseCode">
            <b-form-input
              type="text"
              v-model="course.course_code"
              id="courseCode"
              required>
            </b-form-input>
          </b-form-group>
        </b-col>

        <!--  Course Description -->
        <b-col cols="12" md="6" lg="9">
          <b-form-group
            class="coursedesc"
            label="Course Desc"
            label-for="courseDesc">
            <b-form-input
              type="text"
              v-model="course.course_desc"
              id="courseDesc"
              required>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <!-- Year Duration -->
        <b-col cols="12" md="6" lg="3">
          <b-form-group
            class="yearduration"
            label="Year Duration"
            label-for="yearDuration">
            <b-form-input
              type="number"
              v-model="course.year_duration"
              id="yearDuration"
              required>
            </b-form-input>
          </b-form-group>
        </b-col>

        <!-- Course Major -->
        <b-col cols="12" md="6" lg="9">
          <b-form-group
            class="coursemajor"
            label="Course Major"
            label-for="courseMajor">
            <b-form-input
              type="text"
              v-model="course.course_major"
              id="courseMajor"
              required>
            </b-form-input>
          </b-form-group>
        </b-col>

      </b-form-row>

        <!-- Modal Footer Template -->
        <template v-slot:modal-footer="{ cancel, ok }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-col>
            <b-button class="float-left"  variant="danger" @click="$bvModal.hide('editCourseModal')">
              Cancel
            </b-button>
            <b-button class="float-right"  variant="success" @click="updateCourse()">
              Update
            </b-button>
          </b-col>
        </template>
    </b-modal>

    <!-- Start of Delete Modal -->
    <b-modal id="deleteCourseModal" ref="deleteCourseModal" title="Delete Course" size="md" no-close-on-backdrop>
      <h6>Are you sure you want to delete <br/><b> {{ this.course.course_code }} {{this.course.course_desc}}?</b></h6>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('deleteCourseModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="deleteCourse()">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal> <!-- End of delete Modal -->

  </div> <!-- End of Main Div -->
</template> <!-- End of Template -->

<script>
  import Axios from "axios";
  const { validationMixin, default: Vuelidate } = require('vuelidate');
  const { required, minLength } = require('vuelidate/lib/validators');
  export default{
    name: 'CoursesManager',
    data() {
      return {
        isLoading: false,
        items: [],
        fields: [
          { key: 'course_code', label: 'Course Code', sortable: true, class: 'text-center'},
          { key: 'course_desc', label: 'Course Description', sortable: true, class: 'text-center' },
          { key: 'course_major', label: 'Course Major', sortable: true, class: 'text-center' },
          { key: 'year_duration', label: 'Year Duration', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        course: {
          id: null,
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
    }, // End of Data

    validations: {
      course: {
        course_code: {required},
        course_desc: {required},
        course_major: {required},
        year_duration: {required},
      }
    },

    mounted () {
      this.getCourses();
    }, // End of Mounted

    methods:{

      // Get course Function
      getCourses: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/courses', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.items = response.data;
            for(var j = 0; j < this.items.length; j++){
              if(this.items[j].active == 1){
                this.items[j].status = true
              }else{
                this.items[j].status = false;
              }
            }
            this.totalRows = this.items.length;
            this.isLoading = false;
            this.backToTop();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
            this.backToTop();
          })
      }, // End of Get Course function

      // Add Course Function
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
            this.showForm = false;
            this.resetform();
            this.backToTop();
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
            this.backToTop();
          })
      }, // End of Add Course Function

      // Update Course Function
      updateCourse: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/courses/' + this.course.id, this.course, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getCourses();
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          this.resetform();
          this.backToTop();
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
          this.backToTop();
        });
        this.$refs['editCourseModal'].hide();
      },// End of Update Course Function

      // Delete Course Function
      deleteCourse: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/courses/' + this.course.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getCourses();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.resetform();
            this.backToTop();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
            this.backToTop();
          });
        this.$refs['deleteCourseModal'].hide();
      }, // End of Delete Course Function

      //Toggle Form Function
      toggleForm: function(){
        this.resetform();
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
        this.backToTop();
      }, // End of Toggle Form Function

      // Reset Form Function
      resetform: function(){
        this.course = {
          course_code: null,
          course_desc: null,
          course_major: null,
          year_duration: 0,
          active: 1
        };
      }, // End of Reset Form Function
      EditModal: function(item, index) {
        this.showForm = false;
        this.course = {
          id: item.id,
          course_code: item.course_code,
          course_desc: item.course_desc,
          course_major: item.course_major,
          year_duration: item.year_duration,
          active: item.active
        },
        this.$root.$emit('bv::show::modal', 'editCourseModal')
      },
      DeleteModal: function(item){
        this.course = {
          id: item.id,
          course_code: item.course_code,
          course_desc: item.course_desc,
          course_major: item.course_major,
          year_duration: item.year_duration,
          active: item.active
        },
          this.$root.$emit('bv::show::modal', 'deleteCourseModal')
      },

      StatusUpdate: function(item){
        this.errors = [];
        this.course = {
          id: item.id,
          course_code: item.course_code,
          course_desc: item.course_desc,
          course_major: item.course_major,
          year_duration: item.year_duration,
          active: item.active == 1 ? item.active = 0 : item.active = 1
        },

        Axios
        .put('http://localhost/api/v1/courses/' + this.course.id, this.course, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getCourses();
          if(item.active == 0){
            this.alertMessage = "Course " + item.course_code + " successfully deactivated."
          }else{
              this.alertMessage = "Course " + item.course_code + " successfully activated."
          }
          this.dismissSuccessCountDown = this.dismissSecs;
          this.resetform();

        })
        .catch(error => {
          this.alertMessage = error.response.data.message;
          const values = Object.values(error.response.data.errors);
          for(const val of values){
            for(const err of val){
              this.errors.push(err);
            }
          }
          this.backToTop();
          this.dismissErrorCountDown = this.dismissSecs;
        });
      }, // end of Status Update Function

      backToTop: function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },

    } // End of Methods
  } // End of Export Default
</script>
