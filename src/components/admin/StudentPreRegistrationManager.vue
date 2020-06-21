<template>
  <div>
    <h1 class="font-weight-bold text-dark">Manage Student Pre-registration</h1>
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
    <!-- End of Alert Message -->
    <b-modal id="RegisterModal" ref="RegisterModal" title="Register" size="md"  no-close-on-backdrop>
      <center><h6>Are you sure you want to register <br/><b> {{ this.PreRegStudents.last_name }}, {{ this.PreRegStudents.first_name }} {{ this.PreRegStudents.middle_name }}?</b></h6></center>
      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
        <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('RegisterModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="RegStudents">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal>

    <b-modal id="DeleteRegModal" ref="DeleteRegModal" title="Delete Information" size="md"  no-close-on-backdrop>
      <center><h6>Are you sure you want to delete <br/><b> {{ this.PreRegStudents.last_name }}, {{ this.PreRegStudents.first_name }} {{ this.PreRegStudents.middle_name }}?</b></h6></center>
      <template v-slot:modal-footer="{ cancel, ok }">
        <b-col>
        <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button class="float-left"  variant="danger" @click="$bvModal.hide('DeleteRegModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="DeletePreRegStudents">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal>

    <transition name="fade">
      <div class="px-4 py-3 mt-4 mx-3 shadow rounded bg-white" v-if="PreRegisterTableForm">
      <!-- Adding Form Start  -->
      <b-row>
        <b-col lg="4" class="my-1 ">
            <b-input-group  size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search">
              </b-form-input>
            </b-input-group>
        </b-col>
      </b-row>


      <!-- Main table element -->
      <b-overlay :show="PreRegisterOverlay" rounded="sm">
      <b-table
        class="my-3 table-striped"
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

          <b-button variant="info" size="sm"  @click="ViewInfo(row.item, row.index, $event.target)" v-b-tooltip.hover title="View Information">
            <b-icon-info/>
          </b-button>

          <b-button variant="info" size="sm"  @click="RegisterInfo(row.item, row.index, $event.target)" v-b-tooltip.hover title="Register">
            <b-icon-people/>
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
  </transition>
      <!-- end of table -->

  </div>
</template>
<script>
  import Axios from "axios";
  export default{
    name: 'StudentRegistrationManager',
    data() {
      return{
        items: [],
        fields: [
          { key: 'full_name', label: 'Full Name', class: 'text-center'},
          { key: 'birth_date', label: 'Birthdate', class: 'text-center'},
          { key: 'gender', label: 'Gender', class: 'text-center'},
          { key: 'address', label: 'Address', class: 'text-center'},
          { key: 'barangay', label: 'Barangay', class: 'text-center'},
          { key: 'city', label: 'City', class: 'text-center'},
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],
        full_name: null,
        PreRegStudents: {
          id: null,
          student_number: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          suffix_name: null,
          school_last_attended: null,
          school_address: null,
          college_last_attended: null,
          college_address: null,
          gender: null,
          civil_status: null,
          citizenship:null,
          address: null,
          barangay: null,
          city: null,
          postal: null,
          province: null,
          telephone: null,
          cellphone: null,
          email: null,
          birth_date: null,
          birth_place: null,
          father_name: null,
          mother_name: null,
          contact_person: null,
          contact_address: null,
          contact_number: null,
          blood_type: null,
          photo_url: null,
          user_id: null,
          active: 1,
        },

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        PreRegisterTableForm: true,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
        updateSuccessCountDown: 0,
        updateErrorCountDown: 0,
        studentsrowdata: null,
        PreRegisterOverlay: false,

      }
    },

    mounted () {
      this.getStudents();
    },

    methods:{
      DeleteModal: function(item){
        this.PreRegStudents = {
          id: item.id,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
        },
        this.$root.$emit('bv::show::modal', 'DeleteRegModal')

      },

      DeletePreRegStudents: function(){
          Axios
            .delete('http://localhost/api/v1/delete/pre_registers?id=' + this.PreRegStudents.id, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              this.alertMessage = "successfully Registered";
              this.dismissSuccessCountDown = this.dismissSecs;
              this.getStudents();
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
            this.$refs['DeleteRegModal'].hide();
        },


      DeleteRegStudents: function(){
          Axios
            .delete('http://localhost/api/v1/delete/pre_registers?id=' + this.PreRegStudents.id, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {

                this.getStudents();
            })
        },

      RegStudents: function(){
        Axios
          .post('http://localhost/api/v1/students', this.PreRegStudents, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            console.log(this.PreRegStudents)
            this.alertMessage = "successfully Registered";
            this.dismissSuccessCountDown = this.dismissSecs;
            this.DeleteRegStudents();

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
          this.$refs['RegisterModal'].hide();
        },

      getStudents: function(){
        this.PreRegisterOverlay = true;
        Axios
          .get('http://localhost/api/v1/pre_registers', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.PreRegisterOverlay = false;
            this.items = response.data;
            this.totalRows = this.items.length;
            for (var i = 0; i < this.items.length; i++) {
              var sn, mn = null;
              sn = this.items[i].suffix_name != null ? " " +this.items[i].suffix_name : '',
              mn = this.items[i].middle_name != null ? this.items[i].middle_name : '',
              this.items[i].full_name = this.items[i].last_name + sn + ", " + this.items[i].first_name + " " + mn;
            }

          })
      },



      RegisterInfo: function(item){
        this.PreRegStudents = {
          id: item.id,
          student_number: null,
          first_name: item.first_name,
          middle_name: item.middle_name,
          last_name: item.last_name,
          suffix_name: item.suffix_name,
          school_last_attended: item.school_last_attended,
          school_address: item.school_address,
          college_last_attended: item.college_last_attended,
          college_address: item.college_address,
          gender: item.gender,
          civil_status: item.civil_status,
          citizenship:item.citizenship,
          address: item.address,
          barangay: item.barangay,
          city: item.city,
          postal: item.postal,
          province: item.province,
          telephone: item.telephone,
          cellphone: item.cellphone,
          email: item.email,
          birth_date: item.birth_date,
          birth_place: item.birth_place,
          father_name: item.father_name,
          mother_name: item.mother_name,
          contact_person: item.contact_person,
          contact_address: item.contact_address,
          contact_number: item.contact_number,
          photo_url: null,
          user_id: null,
          active: item.active,
        },
        this.$root.$emit('bv::show::modal', 'RegisterModal')
      },

      ViewInfo: function(item) {
        this.$router.replace({
          name: 'PreRegisterStudentInfoManager',
          params: {
            id: item.id,
            first_name: item.first_name,
            middle_name: item.middle_name,
            last_name: item.last_name,
            suffix_name: item.suffix_name,
            gender: item.gender,
            civil_status: item.civil_status,
            citizenship:item.citizenship,
            address: item.address,
            barangay: item.barangay,
            city: item.city,
            postal: item.postal,
            province: item.province,
            telephone: item.telephone,
            cellphone: item.cellphone,
            email: item.email,
            birth_date: item.birth_date,
            birth_place: item.birth_place,
            father_name: item.father_name,
            mother_name: item.mother_name,
            contact_person: item.contact_person,
            contact_address: item.contact_address,
            contact_number: item.contact_number,
            photo_url: null,
            user_id: null,
            school_last_attended: item.school_last_attended,
            school_address: item.school_address,
            college_last_attended: item.college_last_attended,
            college_address: item.college_address,
            active: item.active,
          }
        })
      },
    }
  }
</script>
