<template>
<div class="container">

    <!-- First ROW -->
    <b-row>

      <!-- File upload for TOR -->
      <b-col cols="12" md="6" lg="6" class="">
        <b-form-group label="Transcrip of Records" label-for="fileTOR">
          <b-form-file id="fileTOR"  ref="fileTOR" size="" v-on:change="onChangeTORUpload"></b-form-file>
        </b-form-group>
      </b-col>
      <!-- File upload for TOR -->

      <!-- File upload for PSA -->
      <b-col cols="12" md="6" lg="6" class="">
        <b-form-group label="PSA Birth Cirtificate" label-for="filePSA">
          <b-form-file id="filePSA" size=""></b-form-file>
        </b-form-group>
      </b-col>
      <!-- File upload for PSA -->

    </b-row>
    <!-- First ROW -->

    <!-- Second ROW -->
    <b-row>

      <!-- File upload for Good Moral -->
      <b-col cols="12" md="6" lg="6" class="">
        <b-form-group label="Good Moral Character" label-for="fileGMRC">
          <b-form-file id="fileGMRC" size=""></b-form-file>
        </b-form-group>
      </b-col>
      <!-- File upload for Good Moral -->

      <!-- File upload for Honorable -->
      <b-col cols="12" md="6" lg="6" class="">
        <b-form-group label="Honorable Dismissal" label-for="fileHonorable">
          <b-form-file id="fileHonorable" size=""></b-form-file>
        </b-form-group>
      </b-col>
      <!-- File upload for Honorable -->

    </b-row>
    <!-- Second ROW -->

    <!-- Third ROW -->
    <b-row>

      <!-- File upload for 137 -->
      <b-col cols="12" md="6" lg="6" class="">
        <b-form-group label="Form 137" label-for="file137">
          <b-form-file id="file137" size=""></b-form-file>
        </b-form-group>
      </b-col>
      <!-- File upload for 137 -->

      <!-- File upload for 138 -->
      <b-col cols="12" md="6" lg="6" class="">
        <b-form-group label="Form 138" label-for="file138">
          <b-form-file id="file138" size=""></b-form-file>
        </b-form-group>
      </b-col>
      <!-- File upload for 138 -->

    </b-row>
    <!-- Third ROW -->

    <!-- Fourth ROW -->
    <b-row>

      <!-- File upload for file2x2 -->
      <b-col cols="12" md="6" lg="6" class="">
        <b-form-group label="2x2 Picture" label-for="file2x2">
          <b-form-file id="file2x2" size=""></b-form-file>
        </b-form-group>
      </b-col>
      <!-- File upload for file2x2 -->

      <!-- Upload button -->
      <b-col cols="12" md="6" lg="6" class="mt-4">
        <b-button class="float-right" variant="success" @click="UploadFile">
          Upload
        </b-button>
      </b-col>
      <!-- Upload button -->

    </b-row>
    <!-- Fourth ROW -->


<!--
  <b-row>
      <b-form-group
      class="birthcertificate"
      label="Birth Certificate"
      label-for="birthCertificate">
        <b-input-group  size="sm">
          <input
            type="file"
            id="birthCertificate"
            @change="SelecFile">
          </input>
        </b-input-group>
      </b-form-group>
  </b-row>
  <b-row>
      <b-form-group
      class="tor"
      label="Transcript of Records (TOR)"
      label-for="TOR">
        <b-input-group  size="sm">
          <input
            type="file"
            id="TOR">
          </input>
        </b-input-group>
      </b-form-group>
  </b-row>
  <b-row>
      <b-form-group
      class="form137"
      label="Form 137"
      label-for="Form137">
        <b-input-group  size="sm">
          <input
            type="file"
            id="Form137">
          </input>
        </b-input-group>
      </b-form-group>
  </b-row>
  <b-row>
      <b-form-group
      class="form138"
      label="Form 138"
      label-for="Form138">
        <b-input-group  size="sm">
          <input
            type="file"
            id="Form138">
          </input>
        </b-input-group>
      </b-form-group>
  </b-row>

  <b-row>
      <b-form-group
      class="goodmoral"
      label="Good Moral"
      label-for="goodMoral">
        <b-input-group  size="sm">
          <input
            type="file"
            id="goodMoral">
          </input>
        </b-input-group>
      </b-form-group>
  </b-row>

  <b-row>
      <b-form-group
      class="honorabledismisal"
      label="Honorable Dismisal"
      label-for="honorableDismisal">
        <b-input-group  size="sm">
          <input
            type="file"
            id="honorableDismisal">
          </input>
        </b-input-group>
      </b-form-group>
  </b-row>

  <b-row>
      <b-form-group
      class="twobytwo"
      label="2 x 2 picture"
      label-for="twoBytwo">
        <b-input-group  size="sm">
          <input
            type="file"
            id="twoBytwo">
          </input>
        </b-input-group>
      </b-form-group>
  </b-row> -->


  <!-- form 137
      form 138
      TOR
      psa birth Certificate
      good moral
      honorable dismisal
      2v2
      -->
  <!-- <input type="file" @change="SelecFile"/>

  <input type="file" @change="SelecFile"/>
  <input type="file" @change="SelecFile"/>
  <input type="file" @change="SelecFile"/>
  <input type="file" @change="SelecFile"/>
  <input type="file" @change="SelecFile"/>
  <input type="file" @change="SelecFile"/>
  <input type="file" @change="SelecFile"/> -->
  <!-- Main table element -->
  <!-- <img v-for="item in items" :src="'/storage/images/'+item.url_tor" alt="image" /> -->

  <b-table
    class="my-3 table-striped"
    show-empty
    responsive=true
    head-variant="dark"
    bordered
    hover
    stacked="md"
    :items="items"
    :fields="fields"
    :current-page="currentPage"
    :per-page="perPage"
    :filter="filter">

    <template v-slot:cell(year_duration)="row" >
      <p v-if="row.item.year_duration">{{row.item.year_duration}} years</p>
    </template>

    <template v-slot:cell(active)="row" >
      <p v-if="row.item.active"><b-badge class="p-2" variant="success">Active</b-badge></p>
      <p v-else><b-badge class="p-2" variant="danger">Inactive</b-badge></p>
    </template>

    <template v-slot:cell(actions)="row">
      <b-button variant="warning" size="sm"  @click="EditModal(row.item, row.index, $event.target)" class="mr-1">
        <b-icon-pencil/>
      </b-button>

      <b-button variant="danger" size="sm" @click="DeleteModal(row.item, $event.target)" v-b-tooltip.hover title="Delete Room">
        <b-icon-trash/>
      </b-button>
    </template>
  </b-table>

</div>
</template>
<script>
  import Axios from "axios";
  export default {
    data() {
      return {

        items: [],
        fields: [
          { key: 'student.student_number', label: 'Student Number', class: 'text-center', sortable: true},
          { key: 'student.first_name', label: 'Name', sortable: true, class: 'text-center' },
          { key: 'url_tor', label: 'TOR', sortable: true, class: 'text-center' },
          { key: 'url_birth_certificate', label: 'PSA', sortable: true, class: 'text-center' },
          { key: 'url_good_moral', label: 'GMRC', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        tor_file: '',
      }
    },

    mounted(){
      this.getStudents();
    },
    methods: {
      // SelecFile(event){
      //   console.log(event)
      // },
      getStudents: function(){
        Axios
          .get('http://localhost/api/v1/student_requirements', {
            headers: {
              'Authorization': 'Bearer ' + this.$store.getters.getToken
            }

          })
          .then(response => {
            this.items = response.data;
            this.totalRows = this.items.length;
              // console.log(response.data);
          })
      },


      // Uploads selected files
      UploadFile: function(){
        let formData = new FormData();
        formData.append('file', this.file);

        console.log(formData)
          // Axios
          //   .put('http://localhost/api/v1/student_requirements/' + 166, {
          //     headers: {
          //       'Authorization': 'Bearer ' + this.$store.getters.getToken,
          //       'Content-Type': 'multipart/form-data'
          //     }
          //   })
          //   .then(response => {
          //       console.log(response.data);
          //   })
        },

        onChangeTORUpload(){
          this.tor_file = this.$refs.fileTOR.files[0];
        },
    }
  }
</script>
