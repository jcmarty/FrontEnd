<template>
  <div>
    <h1 class="font-weight-bold text-dark">Manage College Curriculum</h1>
    <hr/>
    <div id="alert_messages" class="mx-4">
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
    </div>

    <!-- start of adding form  -->
    <div class="adding_form">
      <transition name="fade">
        <div id="" class="px-4 pt-4 pb-3 mx-4 my-4 bg-white shadow rounded" v-if="showForm">
          <div class=" h5 font-weight-bold text-dark" >Add New Curriculum</div>
          <hr/>
          <b-form @submit.stop.prevent="onSubmit">
            <b-form-row>
              <!-- curriculum title -->
              <b-col cols="12" md="6" lg="4">
               <b-form-group :class="{'text-danger' : $v.form.curriculum_title.$error}" label="Curriculum Title *" label-for="curriculum_title">
                 <b-form-input
                   id="curriculum_title"
                   name="curriculum_title"
                   v-model="$v.form.curriculum_title.$model"
                   :state="validateState('curriculum_title')"
                   aria-describedby="curriculum_title_feedback"
                 ></b-form-input>
                 <b-form-invalid-feedback id="curriculum_title_feedback">This is a required field.</b-form-invalid-feedback>
               </b-form-group>
             </b-col>
             <!-- curriculum title -->

             <!-- curriculum description -->
             <b-col cols="12" md="6" lg="4">
               <b-form-group :class="{'text-danger' : $v.form.curriculum_desc.$error}" label="Description *" label-for="curriculum_desc">
                 <b-form-input
                   id="curriculum_desc"
                   name="curriculum_desc"
                   v-model="$v.form.curriculum_desc.$model"
                   :state="validateState('curriculum_desc')"
                   aria-describedby="curriculum_desc_feedback"
                 ></b-form-input>
                 <b-form-invalid-feedback id="curriculum_desc_feedback">This is a required field.</b-form-invalid-feedback>
               </b-form-group>
             </b-col>
             <!-- curriculum description -->

             <!-- course option -->
             <b-col cols="12" md="6" lg="4">
               <b-form-group :class="{'text-danger' : $v.form.course_id.$error, 'text-success' : !$v.form.course_id.$invalid }"
                 label="Course *"
                 label-for="course">
                 <b-form-select
                   id="course"
                   name="course"
                   v-model="$v.form.course_id.$model"
                   :state="validateState('course_id')"
                   aria-describedby="course_feedback">
                   <option value="null" hidden>Select Course</option>
                   <option v-for="course in courseOptions" :value="course.value.id">{{course.text}}</option>
                 </b-form-select>
                 <b-form-invalid-feedback id="course_feedback">This is a required field.</b-form-invalid-feedback>
               </b-form-group>
             </b-col>
             <!-- course option -->

           </b-form-row>
           <hr/>
           <!-- start form buttons -->
           <b-form-row>
             <b-col>
               <b-button variant="danger" @click="resetForm()">Cancel</b-button>
             </b-col>
             <b-col class="d-flex justify-content-end">
               <b-button type="submit" variant="primary">Add</b-button>
             </b-col>
           </b-form-row>
           <!-- end form buttons -->
         </b-form>
        </div>
      </transition>
    </div>
    <!-- end of adding form  -->

    <!-- start of curriculum table -->
    <div class="p-4 mx-4 my-4 bg-white shadow rounded">
      <b-row>

        <!-- start of filter input box -->
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
        <!-- end of filter input box -->

        <!-- Add Button -->
        <b-col class="pt-4">
          <b-button variant="primary" size="" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
            Add New Curriculum
          </b-button>
        </b-col>
        <!-- Add Button -->

      </b-row>

      <!-- start of table element -->
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

          <template v-slot:cell(active)="row" >
            <b-form-checkbox switch size="sm" :checked="row.item.status"  @change="StatusUpdate(row.item, $event.target)">
              <b-badge variant="success" pill v-if="row.item.active">Active</b-badge>
              <b-badge variant="danger"  pill v-else>Inactive</b-badge>
            </b-form-checkbox>
          </template>

          <template v-slot:cell(actions)="row">
            <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" v-b-tooltip.hover title="Edit Room">
              <b-icon-pencil/>
            </b-button>
            <b-button variant="info" size="sm"  @click="addSubject(row.item, row.index, $event.target)" v-b-tooltip.hover title="Subjects">
              <b-icon-info/>
            </b-button>
          </template>

        </b-table>
      </b-overlay>
      <!-- end of table element -->

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

        <b-col offset-lg="6" sm="12" md="4" lg="5" class="my-1">
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
    <!-- end of curriculum table -->

    <b-modal id="editCurriculumModal" ref="editCurriculumModal" title="Edit Curriculum" size="lg">
      <b-form-row>
        <b-col cols="12" md="6" lg="4">
          <b-form-group
            class="curriculum_title"
            label="Curriculum Title"
            label-for="curriculumTitle">
            <b-form-input
              type="text"
              v-model="curriculum.curriculum_title"
              id="curriculumTitle"
              required></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group
            class="curriculum_description"
            label="Curriculum Description"
            label-for="curriculumDesc">
            <b-form-input
              type="text"
              v-model="curriculum.curriculum_desc"
              id="curriculumDesc"
              required></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="4">
          <b-form-group
            class="course"
            label="Course"
            label-for="course">
            <b-form-select
              v-model="curriculum.course_id"
              :options="courseOptions">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('editCurriculumModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="updateCurriculum()">
          Update
        </b-button>
      </template>
    </b-modal>

    <b-modal id="deleteCurriculumModal" ref="deleteCurriculumModal" title="Delete Curriculum" size="lg">
      <p>Are you sure you want to delete {{ this.curriculum.curriculum_desc }}?</p>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('deleteCurriculumModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deleteCurriculum()">
          Delete
        </b-button>
      </template>
    </b-modal>
  </div>
</template>   

<script>
  import Axios from "axios";
  import { required, minLength, between } from 'vuelidate/lib/validators'
  export default{
    name: 'CollegeCurriculumManager',
    data() {
      return {
        isLoading: false,
        items: [],
        fields: [
          { key: 'curriculum_title', label: 'Curriculum Title', class: 'text-center', sortable: true},
          { key: 'curriculum_desc', label: 'Curriculum Description', sortable: true, class: 'text-center' },
          { key: 'course.course_code', label: 'Course', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,


        curriculum: {
          id: null,
          curriculum_title: null,
          curriculum_desc: null,
          course_id: null
        },

        courseOptions: this.$store.getters.getCourses,
        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,

        form: {
          curriculum_title: null,
          curriculum_desc: null,
          course_id: null,
          active: 1
        }
      }
    },
    validations: {
      form: {
        curriculum_title: {
          required
        },
        curriculum_desc: {
          required,
        },
        course_id: {
          required,
        }
      }
    },

    mounted () {
      this.getCurriculums();
      this.$store.dispatch('loadCourses', this.$store.getters.getToken);
    },

    methods:{
      getCurriculums: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/curriculums?level=college', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.isLoading = false;
            //console.log(response.data.data);
            this.items = response.data;
            this.totalRows = this.items.length;
          })
          .catch(error => {
            this.isLoading = false;
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      },

      toggleForm: function(){
        this.curriculum = {
          curriculum_title: null,
          curriculum_desc: null,
          course_id: null
        };
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      },

      addCurriculum: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/curriculums', this.form, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            console.log(response);
            this.getCurriculums();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear curriculum data
            this.form = {
              curriculum_title: null,
              curriculum_desc: null,
              course_id: null,
              active: 1
            };
            this.resetForm();
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
            console.log(error.response.data)
            //console.log(error);
          })
      },

      updateCurriculum: function(){
        this.errors = [];
        Axios
          .put('http://localhost/api/v1/curriculums/' + this.curriculum.id, this.curriculum, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getCurriculums();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear curriculum data
            this.curriculum = {
              curriculum_title: null,
              curriculum_desc: null,
              course_id: null
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
        this.$refs['editCurriculumModal'].hide();
      },

      deleteCurriculum: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/curriculums/' + this.curriculum. id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getCurriculums();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear curriculum data
            this.curriculum = {
              curriculum_title: null,
              curriculum_desc: null,
              course_id: null
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
        this.$refs['deleteCurriculumModal'].hide();
      },

      EditModal: function(item, index) {
        this.curriculum = {
          id: item.id,
          curriculum_title: item.curriculum_title,
          curriculum_desc: item.curriculum_desc,
          course_id: item.course_id,
          active: item.active
        },
        this.$root.$emit('bv::show::modal', 'editCurriculumModal')
      },
      DeleteModal: function(item){
        this.curriculum = {
          id: item.id,
          curriculum_title: item.curriculum_title,
          curriculum_desc: item.curriculum_desc,
          course_id: item.course_id,
          active: item.active
        },
        this.$root.$emit('bv::show::modal', 'deleteCurriculumModal')
      },
      addSubject: function(item) {
        this.$router.replace({
          name: 'manageCurriculumSubjects',
          params: {
            id: item.id,
            curriculum_title: item.curriculum_title,
            curriculum_desc: item.curriculum_desc,
            course_id: item.course_id,
            active: item.active
          }
        })
      },

      StatusUpdate: function(item){
        this.errors = [];
        this.curriculum = {
          id: item.id,
          active: item.active == 1 ? item.active = 0 : item.active = 1
        },

        Axios
        .put('http://localhost/api/v1/curriculums/' + this.curriculum.id, this.curriculum, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getCurriculums();
          if(item.active == 0){
            this.alertMessage = "Curriculum " + item.curriculum_title + " successfully deactivated."
          }else{
              this.alertMessage = "Curriculum " + item.curriculum_title + " successfully activated."
          }
          this.dismissSuccessCountDown = this.dismissSecs;

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
      }, // end of Status Update Function

      validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null;
      },

      resetForm() {
        this.form = {
          curriculum_title: null,
          curriculum_desc: null,
          course_id: null,
          active: 1
        };

        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }

        this.$nextTick(() => {
          this.$v.$reset();
        });
      },
      onSubmit() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        this.addCurriculum()
        // alert("Form submitted!");
      }
    }
  }
</script>
