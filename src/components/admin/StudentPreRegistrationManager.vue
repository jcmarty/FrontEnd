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
    <transition name="fade">
      <div class="px-4 py-3 mt-4 mx-3 shadow rounded bg-white" v-if="RegisterTableForm">
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
      <b-overlay :show="registerOverlay" rounded="sm">
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
          <b-button variant="danger" size="sm" @click="DeleteModal(row.item, $event.target)" v-b-tooltip.hover title="Delete">
            <b-icon-trash/>
          </b-button>

          <b-button variant="info" size="sm"  @click="ViewInfo(row.item, row.index, $event.target)" v-b-tooltip.hover title="View Information">
            <b-icon-info/>
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
  import { required, minLength, between } from 'vuelidate/lib/validators';
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

        PreRegStudents: {
          id: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          suffix_name: null,
          gender: null,
          civil_status: null,
          citizenship:null,
          address: null,
          barangay: null,
          city: null,
          postal: null,
          province: null,
          telephone: null,
          cellphone: 0,
          email: null,
          birth_date: null,
          birth_place: null,
          father_name: null,
          mother_name: null,
          contact_person: null,
          contact_address: null,
          contact_number: 0,
          blood_type: null,
          photo_url: null,
          user_id: null,
          school_last_attended: null,
          school_address: null,
          college_last_attended: null,
          college_address: null,
          active: 1,
        },

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        RegisterTableForm: true,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
        updateSuccessCountDown: 0,
        updateErrorCountDown: 0,
        studentsrowdata: null,
        registerOverlay: false,

      }
    },

    mounted () {
      this.getStudents();
    },

    methods:{

      RegStudents: function(){

          Axios
            .post('http://localhost/api/v1/pre_registers', this.PreRegStudents, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(response => {
              console.log(response.message);
              this.alertMessage = "New student record successfully created.";
              this.getStudents();
              this.dismissSuccessCountDown = this.dismissSecs;
              this.showForm = false;
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

      getStudents: function(){
        this.registerOverlay = true;
        Axios
          .get('http://localhost/api/v1/pre_registers', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.registerOverlay = false;
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



      Register: function(item){
        this.PreRegStudents = {
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
          blood_type: item.blood_type,
          photo_url: item.photo_url,
          user_id: item.user_id,
          school_last_attended: item.school_last_attended,
          school_address: item.school_address,
          college_last_attended: item.college_last_attended,
          college_address: item.college_address,
          active: 1,
        },

        this.$router.replace({
          name: 'StudentRegistrationManager',
          params: item
        })
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
            blood_type: item.blood_type,
            photo_url: item.photo_url,
            user_id: item.user_id,
            school_last_attended: item.school_last_attended,
            school_address: item.school_address,
            college_last_attended: item.college_last_attended,
            college_address: item.college_address,
            active: 1,
          }
        })
      },
    }
  }
</script>
