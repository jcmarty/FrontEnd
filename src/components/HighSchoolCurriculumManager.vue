<template>
  <div>
    <h1>Manage High School Curriculum</h1>
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
      <div class="panel-heading">Add a New Curriculum</div>
      <div class="panel-body">
        <b-form id="Add_SHS_Subject_Form">
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
                class="strand"
                label="Strand"
                label-for="strand">
                <b-form-select
                  v-model="curriculum.strand_id"
                  :options="strandOptions">
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_SHS_Curriculum_Btn" @click="addCurriculum">
                Add
              </b-button>
            </b-col>
          </b-form-row>
        </b-form>
      </div>
    </div>
    <!--Form end  -->

    <b-button variant="success" size="sm" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
      Add New Curriculum
    </b-button>

    <ag-grid-vue class="ag-theme-material"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :gridOptions="gridOptions">
    </ag-grid-vue>

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
            class="strand"
            label="Strand"
            label-for="strand">
            <b-form-select
              v-model="curriculum.strand_id"
              :options="strandOptions">
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
  import {AgGridVue} from "ag-grid-vue";
  import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
  import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
  import CurriculumActionButtons from "./ActionButtons/CurriculumActionButtons.vue";
  export default{
    name: 'HighSchoolCurriculumManager',
    components: {
      AgGridVue,
      CurriculumActionButtons
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        id: null,
        curriculum: {
          curriculum_title: null,
          curriculum_desc: null,
          strand_id: null
        },
        strandOptions: [],
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
          {headerName: 'Title', field: 'curriculum_title', sortable: true, filter: true, width: 250, resizable: true},
          {headerName: 'Description', field: 'curriculum_desc', sortable: true, filter: true, width: 280, resizable: true},
          {headerName: 'Strand', field: 'strand_id', width: 120, sortable: true, filter: true},
          {headerName: 'Actions', field: 'id', width: 280, cellRendererFramework: 'CurriculumActionButtons'}
      ];

    },
    mounted () {
      this.getCurriculums();
      this.getStrands();
    },
    methods:{
      getStrands: function(){
        Axios
          .get('http://localhost/api/v1/strands', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            for(const strand of response.data){
              this.strandOptions.push({value: strand.id, text: strand.strand});
            }
          })
          .catch(error => {
            console.log(error.response);
          })
      },
      getCurriculums: function(){
        Axios
          .get('http://localhost/api/v1/curriculums?level=shs', {
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
      addCurriculum: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/curriculums', this.curriculum, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            console.log(response);
            this.getCurriculums();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear curriculum data
            this.curriculum = {
              curriculum_title: null,
              curriculum_desc: null,
              strand_id: null
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
            //console.log(error);
          })
      },
      updateCurriculum: function(){
        this.errors = [];
        Axios
          .put('http://localhost/api/v1/curriculums/' + this.id, this.curriculum, {
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
              strand_id: null
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
          .delete('http://localhost/api/v1/curriculums/' + this.id, {
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
              strand_id: null
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
      }
    }
  }
</script>
