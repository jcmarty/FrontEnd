<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Instructor List Reports</h1>
    <hr class="d-print-none"/>
    <div class="px-4">


        <b-button variant="primary" onclick="window.print()">
          Print
        </b-button>





  <div class="d-print-none mt-4 mb-4 px-4 pt-4 bg-white shadow rounded">

    <!-- Main table element -->
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

      <template v-slot:cell(number)="data">
        {{ data.index + 1 }}
      </template>

    </b-table>


    <hr class="d-print-none"/>
    <b-row class="d-print-none">
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

<!-- for printing only -->
<div id="to_print">
  <div class="header d-none d-print-block">
    <img src="../../assets/images/header_logo.png" alt="Comteq Logo" class="logo"/>
  </div>
  <div class="content d-none d-print-block ">
    <p  style="color: #002060" class="h2 font-weight-bold text-center mt-3">SY {{selectedAcademicYear.academic_year}}</p>
    <p  style="color: #ff0000" class="h4 font-weight-bold text-center">{{selectedSemester.semester}}</p>
    <center><h1>Instructor List Report</h1></center>
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

      <template v-slot:cell(number)="data">
        {{ data.index + 1 }}
      </template>

    </b-table>

  </div>
  <!-- <div class="footer  d-none d-print-block text-center">This is the Footer</div> -->
</div>

    <!-- end of table -->

  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: 'InstructorsListReport',
  data() {
    return {
     user: this.$store.getters.getUser,
     items: [],
    fields: [
      { key: 'employee_id', label: 'Employee ID', class: 'text-center', sortable: true},
      { key: 'full_name', label: 'Full Name', sortable: true, class: 'text-center' },
      { key: 'birth_date', label: 'Birthdate', sortable: true, class: 'text-center' },
      { key: 'gender', label: 'Gender', sortable: true, class: 'text-center' },
      { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
      { key: 'contact_no', label: 'Contact Number', sortable: true, class: 'text-center' },
    ],
    fieldsForPrint: [
      { key: 'employee_id', label: 'Employee ID', class: 'text-center', sortable: true},
      { key: 'full_name', label: 'Full Name', sortable: true, class: 'text-center' },
      { key: 'birth_date', label: 'Birthdate', sortable: true, class: 'text-center' },
      { key: 'gender', label: 'Gender', sortable: true, class: 'text-center' },
      { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
      { key: 'contact_no', label: 'Contact Number', sortable: true, class: 'text-center' },
    ],

      instructor: {
        id: null,
        employee_id: null,
        first_name: null,
        middle_name: null,
        last_name: null,
        birth_date: null,
        gender: null,
        email: null,
        contact_no: null,
        address: null,
        city: null,
        province: null,
        postal_code: null,
        work_experience: null,
        certifications: null,
        educational_attainment: null,
        availabilities: [],
        preferred_subjects: [],
        active: 1
      },

      isLoading: false,
      rowData: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      filter: null,

      selectedAcademicYear: this.$store.getters.getCurrentAcademicYear,
      selectedSemester: this.$store.getters.getCurrentSemester,
    }
  },

mounted(){
  this.getInstructors()
},

methods: {

  getInstructors: function(){
    this.isLoading = true;
    Axios
      .get('http://localhost/api/v1/instructors', {
      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
      })
      .then(response => {
        this.isLoading = false;
        this.items = response.data;
        for(var j = 0; j < this.items.length; j++){
        var sn, mn = null;
        sn = this.items[j].suffix_name != null ? " " +this.items[j].suffix_name : '',
        mn = this.items[j].middle_name != null ? this.items[j].middle_name : '',
        this.items[j].full_name = this.items[j].last_name + sn + ", " + this.items[j].first_name + " " + mn;
          if(this.items[j].active == 1){
            this.items[j].status = true
          }else{
            this.items[j].status = false;
          }
        }
          this.totalRows = this.items.length;
          })
          .catch(error => {
          this.isLoading = false;
          this.alertMessage = error.response.data.message;
          this.dismissErrorCountDown = this.dismissSecs;
        })
      },
  }
}
</script>
