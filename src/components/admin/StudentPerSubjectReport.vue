<template>
  <div>
    <!-- page title -->
    <h1 class="d-print-none font-weight-bold text-dark">View Students</h1>
    <hr class="d-print-none" />


    <div class="px-4">
      <!-- show info -->
      <div class="d-print-none mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">
        <!-- form title -->
        <div class=" h5 font-weight-bold text-dark">Schedule Information</div>
        <hr/>
          <div class="d-print-none row mx-5">
            <!-- academic year -->
            <div class="mb-3 column w-25">
              <h6 >Academic Year :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{$route.params.academic_year.academic_year}}</h6>
            </div>
            <!-- end of academic year -->

            <!-- end of semester -->
            <div class="mb-3 column w-25">
              <h6 >Semester :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{$route.params.semester.semester}}</h6>
            </div>
            <!-- end of semester -->
          </div>

          <div class="row mx-5">
            <!-- course -->
            <div class="mb-3 column w-25">
              <h6 >Subject Code :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">
                {{$route.params.schedule.subject.subject.subject_code}}
              </h6>
            </div>
            <!-- end of course -->

            <!-- curriculum -->
            <div class="mb-3 column w-25">
              <h6 >Title :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{$route.params.schedule.subject.subject.subject_title}}</h6>
            </div>
            <!-- end of curriculum -->
          </div>

          <div class="row mx-5">
            <!-- course -->
            <div class="mb-3 column w-25">
              <h6 >Intructor :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">
                {{$route.params.instructor.first_name}} {{$route.params.instructor.last_name}}
              </h6>
            </div>
            <!-- end of course -->

            <!-- curriculum -->
            <div class="mb-3 column w-25">
              <h6 >Room :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{$route.params.schedule.room.room_number}}</h6>
            </div>
            <!-- end of curriculum -->
          </div>

          <div class="row mx-5">
            <!-- year level -->
            <div class="mb-3 column w-25">
              <h6 >Day :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{$route.params.schedule.day}}</h6>
            </div>
            <!-- end of year level -->

            <!-- block -->
            <div class="mb-3 column w-25">
              <h6>Time :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{timeFormatter($route.params.schedule.time_start)}} - {{timeFormatter($route.params.schedule.time_end)}}</h6>
            </div>
            <!-- end of block -->
          </div>

          <div class="row mx-5">
            <!-- student status -->
            <div class="mb-3 column w-25">
              <h6 >Student Status :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{$route.params.schedule.course_code}}</h6>
            </div>
            <!-- end of student status -->

            <!-- academic status -->
            <div class="mb-3 column w-25">
              <h6>Year Level :</h6>
            </div>
            <div class="column w-25">
              <h6 class="font-weight-bold">{{$route.params.schedule.year_level}}</h6>
            </div>
            <!-- end of academic status -->
          </div>


        <hr/>
        <!-- go back button -->
        <b-row>
          <b-col>
            <b-button
                      class="text-white pull-left"
                      size=""
                      variant="info"
                      @click="$router.replace({name: 'InstructorScheduleReport'})"
                      ><i class="fa fa-arrow-left" aria-hidden="true"/> Go Back
            </b-button>
          </b-col>
          <b-col>
            <b-button
                      class="text-white pull-right"
                      size=""
                      variant="primary"
                      onclick="window.print()"
                      >Print
            </b-button>
          </b-col>
        </b-row>
      </div>
      <!-- start of instructor table -->
      <div class="d-print-none mt-4 mb-4 px-4 pt-4 bg-white shadow rounded">
        <b-row>
          <b-col lg="4" class="my-1">
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
        </b-row>
        <b-overlay :show="isLoading" rounded="sm">
          <b-table
            class="d-print-none my-3 table-striped"
            show-empty
            responsive
            bordered
            hover
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter">

            <template v-slot:cell(number)="row">
              {{row.index + 1}}
            </template>
          </b-table>
        </b-overlay>
        <hr/>
        <b-row>
          <b-col lg="1">
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

          <b-col lg="3">
            <b-form-group class="pt-2">
              <p>Showing 1 to {{this.perPage}} of {{this.items.length}} entries</p>
            </b-form-group>
          </b-col>

          <b-col offset-lg="4" lg="4" >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0 float-right"
            ></b-pagination>
          </b-col>
        </b-row>
      </div>
      <!-- end of instructor table -->
    </div>

    <!-- for printing only -->
    <div id="to_print">
      <div class="header d-none d-print-block">
        <!-- <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="logo"/> -->
        <img src="../../assets/images/header_logo.png" alt="Comteq Logo" class="logo"/>
      </div>
      <div class="content d-none d-print-block ">
        <div class="d-print-block mt-4 mb-4 px-4 pt-4 pb-3 border border-dark">
          <!-- form title -->
          <div class=" h5 font-weight-bold text-dark mb-3">Schedule Information</div>
            <table border="0" style="width: 100%">
              <tr class="">
                <td class="pb-3">
                  <span class="h5 pl-5">Academic Year : </span>
                  <span class="h5 font-weight-normal">{{$route.params.academic_year.academic_year}}</span>
                </td>
                <td class="pb-3">
                  <span class="h5 pl-5">Semester : </span>
                  <span class="h5 font-weight-normal">{{$route.params.semester.semester}}</span>
                </td>
              </tr>
              <tr>
                <td class="pb-3">
                  <span class="h5 pl-5">Subject Code : </span>
                  <span class="h5 font-weight-normal">{{$route.params.schedule.subject.subject.subject_code}}</span>
                </td>
                <td class="pb-3">
                  <span class="h5 pl-5">Title : </span>
                  <span class="h5 font-weight-normal">{{$route.params.schedule.subject.subject.subject_title}}</span>
                </td>
              </tr>
              <tr>
                <td class="pb-3"
                  <span class="h5 pl-5">Instructor : </span>
                  <span class="h5 font-weight-normal">{{$route.params.instructor.first_name}} {{$route.params.instructor.last_name}}</span>
                </td>
                <td class="pb-3">
                  <span class="h5 pl-5">Room : </span>
                  <span class="h5 font-weight-normal">{{$route.params.schedule.room.room_number}}</span>
                </td>
              </tr>
              <tr>
                <td class="pb-3">
                  <span class="h5 pl-5">Course / Year : </span>
                  <span class="h5 font-weight-normal">{{$route.params.schedule.course_code}} - {{$route.params.schedule.year_level}}</span>
                </td>
                <td class="pb-3">
                  <span class="h5 pl-5">Block : </span>
                  <span class="h5 font-weight-normal">BLK - {{$route.params.schedule.block}}</span>
                </td>
              </tr>
            </table>
          </div>

        <b-table
          id="print_table"
          class="mt-4 table-striped p"
          show-empty
          bordered
          responsive
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">
          <template v-slot:cell(number)="row">
            {{row.index + 1}}
          </template>
        </b-table>
      </div>
      <!-- <div class="footer  d-none d-print-block text-center">This is the Footer</div> -->
    </div>
  </div>
</template>

<style scoped>

.reset{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* @page{
  orientation: landscape;} */

@media print {
  body {
    margin: 0 auto  ;
    padding: 0;
  }
  body * {
    /* border: 1px solid red; */
    margin: 0;
    padding: 0;
    }
  @page {
    size: portrait ;
    margin-top: 1cm;
  }
  #to_print{
    position: absolute;
    font-family: "Bookman Old Style";
    color: black;
    left: 0;
    top: 0;
    margin: 0;
  }
  .header {
    margin: 0px 0px 10px 0px;
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
  }
  /* @page :left {
  margin-right: 200mm;
  }

  @page :right {
    margin-left: 200mm;
  } */

  .header .logo {
    position: relative;
    width: 100%;
    height: auto ;
    margin: 0 auto;
  }
  .content p{
    /* margin-top: 30px; */
  }
  #print_table {
    margin-top : 20px;
    font-size: 14pt;
  }
  .footer {
    position: absolute;
    bottom: 0;
  }
}
</style>

<script>
import Axios from "axios";
import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';
export default {
  name: 'StudentPerSubjectReport',
  data() {
    return {
      // selectedAcademicYear: this.$store.getters.getCurrentAcademicYear,
      // selectedSemester: this.$store.getters.getCurrentSemester,
      selectedAcademicYear: "",
      selectedSemester: "",
      // variables for table
      isLoading: false,
      items: [],
      fields: [
        { key: 'number', label: 'No.', class: 'text-center', sortable: true,},
        { key: 'enrollment.student.student_number', label: 'Student Number', class: 'text-center', sortable: true},
        { key: 'full_name', label: 'Full Name', sortable: true, class: 'text-center',
          sortByFormatted: true,
          formatter: (value, key, item) => {
            return item.enrollment.student.first_name + " " + item.enrollment.student.last_name;
          }
        },
        { key: 'enrollment.course.course_code', label: 'Course', sortable: true, class: 'text-center' },
        { key: 'enrollment.year_level', label: 'Year Level', sortable: true, class: 'text-center' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      filter: null,
      // end of variables for table
    }
  },
  beforeMount() {

  },

  mounted () {
    // console.log(this.$route.params)
    this.getStudentPerSubject();
    this.backToTop();
  },

  methods: {

    getStudentPerSubject: function(){
    this.isLoading = true;
    Axios
      .get('http://localhost/api/v1/enrollments',
      {
         params : {
          academic_year_id : this.$route.params.academic_year.id,
          semester_id : this.$route.params.semester.id
        },
        headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
      })
      .then(response => {
        this.isLoading = false;
        this.filterStudetSubject(this.$route.params.schedule, response.data)
        // this.items = response.data;
      })
    }, // end of function getInstructors

    filterStudetSubject: function(schedule, enrollments){
      enrollments.forEach((enrollment, i) => {
        enrollment.student_schedule.forEach((subject, i) => {
              subject.subject_id == schedule.subject_id && subject.status == "ENROLLED"? this.items.push(subject): "";
        });
      });

      this.totalRows = this.items.length;

    }, // end of function filterStudetSubject

    backToTop: function(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, // end of backToTop

    timeFormatter : function(time){
      var split = time.split(":");
      var hour = split[0];
      var min = split[1];

      var h = hour % 12 || 12;
      var ampm = (hour < 12 || hour == 24) ? "AM" : "PM";
      return h + ":" + min + ampm;
    },
  }
}
</script>
