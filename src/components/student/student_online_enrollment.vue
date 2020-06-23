<template>
  <div>
    <div class="dash_page_title">
      Online Enrollment
      <hr />
    </div>

    <!-- start of course setup form -->
    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="courseSetupForm">
      <div class=" h5 font-weight-bold text-dark" >Course Setup</div>
      <hr/>
    </div>
    <!-- end of course setup form -->

    <!-- start of course setup form -->
    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="subjectSetupForm">
      <div class=" h5 font-weight-bold text-dark" >Subject Setup</div>
      <hr/>
    </div>
    <!-- end of course setup form -->

    <!-- start of course setup form -->
    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="previewForm">
      <div class=" h5 font-weight-bold text-dark" >Preview Enrollment</div>
      <hr/>
    </div>
    <!-- end of course setup form -->

    <!-- start of Enrollment table -->
    <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">

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
          <b-button variant="primary" @click="" class="toggleFormBtn" v-if="!courseSetupForm">
            New Enrollment
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
          refreshed
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">
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
    <!-- enrollment table -->
  </div>
</template>

<script>
export default {
  name: 'StudentOnlineEnrollment',

  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 25],
      filter: null,

      courseSetupForm: true,
      subjectSetupForm: true,
      previewForm: true,
      showForm: false,
      alertMessage: "",
      errors: [],
      dismissSecs: 7,
      dismissSuccessCountDown: 0,
      dismissErrorCountDown: 0,
    }
  }, // End of Data
}
</script>

<style lang="css" scoped>
.dash_page_title{
  font-size: 17pt;
  font-weight: bold;
  padding: 0;
  margin-bottom: 20px;
}
</style>
