<template>
  <div>
    <h1>Manage Strands</h1>
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
      <div class="panel-heading">Add a Strands</div>
      <div class="panel-body">
        <b-form id="Add_Strands_Form">
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="trackid"
              label="Track ID"
              label-for="trackID">
              <b-form-input
                type="text"
                v-model="strand.track_id"
                id="trackID"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Name -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="strandcode"
              label="Strand Code"
              label-for="strandCode">
              <b-form-input
                type="text"
                v-model="strand.strand_code"
                id="strandCode"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Type -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="stranddesc"
              label="Strand Desc"
              label-for="strandDesc">
              <b-form-input
                type="text"
                v-model="strand.strand_desc"
                id="strandDesc"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!-- Room Capacity -->

            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-button variant="danger" @click="toggleForm">
                Cancel
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-button variant="primary" id="Add_Strands_Btn" @click="addStrand">
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

    <b-modal id="editStrandsModal" ref="editStrandsModal" title="Edit Strand" size="xl">
      <b-form-row>
      <!-- Room Number -->
      <b-col cols="12" md="6" lg="2">
        <b-form-group
          class="trackid"
          label="Track ID"
          label-for="trackID">
          <b-form-input
            type="text"
            v-model="strand.track_id"
            id="trackID"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!--  Room Name -->
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          class="strandcode"
          label="Strand Code"
          label-for="strandCode">
          <b-form-input
            type="text"
            v-model="strand.strand_code"
            id="strandCode"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!--  Room Type -->
      <b-col cols="12" md="6" lg="4">
        <b-form-group
          class="stranddesc"
          label="Strand Desc"
          label-for="strandDesc">
          <b-form-input
            type="text"
            v-model="strand.strand_desc"
            id="strandDesc"
            required></b-form-input>
        </b-form-group>
      </b-col>

      <!-- Room Capacity -->
      </b-form-row>

      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('editStrandsModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="updateStrand()">
          Update
        </b-button>
      </template>
    </b-modal>

    <b-modal id="deleteStrandsModal" ref="deleteStrandsModal" title="Delete Strand" size="lg">
      <p>Are you sure you want to delete {{ this.strand.strand_desc }}?</p>

      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="danger" @click="$bvModal.hide('deleteStrandsModal')">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deleteStrand()">
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
  import StrandsActionButtons from "./ActionButtons/StrandsActionButtons.vue";
  export default{
    name: 'StrandsManager',
    components: {
      AgGridVue,
      StrandsActionButtons
    },
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridOptions: null,
        id: null,
        strand: {
          track_id: null,
          strand_code: null,
          strand_desc: null,
          created_at: null,
          updated_at: null,
          last_updated_by: null,
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
          {headerName: 'ID', field: 'id', sortable: true, filter: true, width: 90},
          {headerName: 'Track ID', field: 'track_id', sortable: true, filter: true, width: 130,},
          {headerName: 'Strand Code', field: 'strand_code', sortable: true, filter: true, resizable: true},
          {headerName: 'Strand Desc', field: 'strand_desc', sortable: true, filter: true, resizable: true},
          {headerName: 'Created at', field: 'created_at', sortable: true, filter: true, width: 150},
          {headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true, width: 180,},
          {headerName: 'Last updated by', field: 'last_updated_by', sortable: true, filter: true, width: 180,},
          {headerName: 'Status', field: 'active', width: 120,
            cellRenderer: (data) => {
              if(data.value === 1){
                return 'Active';
              } else {
                return 'Inactive';
              }
            }},
          {headerName: 'Actions', field: 'id', cellRendererFramework: 'StrandsActionButtons'}
      ];

    },
    mounted () {
      this.getStrands();
    },
    methods:{
      getStrands: function(){
        Axios
          .get('http://localhost/api/v1/strands', {
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
      addStrand: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/strands', this.strand, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getStrands();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.strand = {
              track_id: null,
              strand_code: null,
              strand_desc: null,
              created_at: null,
              updated_at: null,
              last_updated_by: null,
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
      updateStrand: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/strands/' + this.id, this.strand, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getStrands();
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          // clear subject data
          this.strand = {
            track_id: null,
            strand_code: null,
            strand_desc: null,
            created_at: null,
            updated_at: null,
            last_updated_by: null,
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
        this.$refs['editStrandsModal'].hide();
      },
      deleteStrand: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/strands/' + this.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getStrands();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            // clear room data
            this.strand = {
              track_id: null,
              strand_code: null,
              strand_desc: null,
              created_at: null,
              updated_at: null,
              last_updated_by: null,
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
        this.$refs['deleteStrandsModal'].hide();
      }
    }
  }
</script>
