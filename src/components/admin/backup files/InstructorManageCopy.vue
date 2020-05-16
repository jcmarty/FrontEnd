<template>
  <div>
    <h1>Manage Instructors</h1>
    <div>

    <!-- Main table element -->
    <b-table
      class="my-3 table-striped"
      show-empty
      responsive
      head-variant="dark"
      bordered
      hover
      stacked="md"
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
      </template>
    </b-table>

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
    <!-- end of table -->

  </div>
</template>
<script>
  import Axios from "axios";
  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker';
  import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';

  export default{
    name: 'InstructorManager',
    components: {
      VueTimepicker
    },
    data() {
      return{
        items: [],
        fields: [
          { key: 'employee_id', label: 'Room Number', class: 'text-center', sortable: true},
          { key: 'first_name', label: 'Room Name', sortable: true, class: 'text-center' },
          { key: 'birth_date', label: 'Room Type', sortable: true, class: 'text-center' },
          { key: 'gender', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'email', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'contact_no', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'address', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'city', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'province', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'postal_code', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'work_experience', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'certifications', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'educational_attainment', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        instructor: {
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

        settings: this.$store.getters.getSettings,
        tabIndex: 0,
        secondTabDisabled: true,
        lastTabsDisabled: true,
        personalInfoColumnDefs: null,
        personalInfoRowData: null,
        preferredSubjectsColumnDefs: null,
        preferredSubjectsRowData: null,
        timeAvailabilityColumnDefs: null,
        timeAvailabilityRowData: null,
        instructorId: null,

        subjectOptions: [],
        academicYearOptions: [],
        semesterOptions: [],

        newPreferredSubject: {
          subject_id: null,
          academic_year_id: null,
          semester_id: null,
          active: 1
        },

        genderOptions: [
          {value: 'Male', text: 'Male'},
          {value: 'Female', text: 'Female'}
        ],

        dayOptions: [
          {value: 'Monday', text: 'Monday'},
          {value: 'Tuesday', text: 'Tuesday'},
          {value: 'Wednesday', text: 'Wednesday'},
          {value: 'Thursday', text: 'Thursday'},
          {value: 'Friday', text: 'Friday'},
          {value: 'Saturday', text: 'Saturday'},
        ],

        newTimeAvailability: {
          instructor_id: null,
          academic_year_id: null,
          semester_id: null,
          day: null,
          time_start: null,
          time_end: null,
          active: 1
        },

        calendarIcon: "fa fa-calendar",
        birthDateFormat: "MMM dd, yyyy",
        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
        updateSuccessCountDown: 0,
        updateErrorCountDown: 0,
      }
    },

    mounted () {
      this.getInstructors();
    },
    methods:{

      getInstructors: function(){
        Axios
          .get('http://localhost/api/v1/instructors', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            //console.log(response.data);
            this.items = response.data;
            for(var j = 0; j < this.items.length; j++){
              if(this.items[j].active == 1){
                this.items[j].status = true
              }else{
                this.items[j].status = false;
              }
            }
            this.totalRows = this.items.length;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      },
    }
  }
</script>
