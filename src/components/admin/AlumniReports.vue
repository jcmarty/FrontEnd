<template>
  <div>
    <h1 class="d-print-none font-weight-bold text-dark">Alumni Members / Graduates Reports</h1>
    <hr class="d-print-none"/>
    <div class="px-4">
      <b-form-row class="d-print-none">
        <b-col class="py-4">
          <!-- Add New Room Button -->
          <b-button variant="primary" onclick="window.print()">
            Print
          </b-button>
        </b-col>
    </b-form-row>


  <div class="d-print-none mt-4 mb-4 px-4 pt-4 bg-white shadow rounded">
    <!-- Main table element -->
    <b-table
      class="my-3 table-striped"
      show-empty
      responsive
      bordered
      hover
      :items="filteredItems"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter-function="filterTable">

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
    <!-- end of table -->


    <!-- printing -->

    <!-- for printing only -->
    <div id="to_print">
      <div class="header d-none d-print-block">
        <!-- <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="logo"/> -->
        <img src="../../assets/images/header_logo.png" alt="Comteq Logo" class="logo"/>
      </div>
      <div class="content d-none d-print-block ">

        <!-- dark blue #002060 -->
        <!-- red #ff0000 -->
        <!-- <p  style="color: #002060" class="h2 font-weight-bold text-center mt-3">SY {{selectedAcademicYear.academic_year}}</p>
        <p  style="color: #ff0000" class="h4 font-weight-bold text-center">{{selectedSemester.semester}}</p>
        <p  class="h1 font-weight-bold text-center">Room #{{selectedRoom.number}}</p> -->
        <b-table
          class="my-3 table-striped"
          show-empty
          responsive
          bordered
          hover
          :items="filteredItems"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter-function="filterTable">
        </b-table>
      </div>
      <!-- <div class="footer  d-none d-print-block text-center">This is the Footer</div> -->
    </div>
    </div>

      <!-- end of table -->

  </div>
</template>

<script>
import Axios from "axios";
export default {
name: 'AlumniReport',
  data() {
  return {
      items: [],
      fields: [{}],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      filter: null,
    }
  },

  mounted(){

  },
  methods: {}

}
</script>
