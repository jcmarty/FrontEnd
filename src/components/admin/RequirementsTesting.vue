<template>
  <div class="container">


    <form method="POST" enctype="multipart/form-data" @submit.prevent="UploadImage">
      <div class="custom-file">
        <input
          type="file"
          class="custom-file-input mt-2"
          id="customFile"
          @change="onChangeTORUpload"
        >
        <label for="customFile" class="custom-file-label">Choose Image</label>
        <button type="submit" class="btn btn-info mt-2">upload</button>
      </div>

      <div class="mt-3" v-if="tor_file">
          <img :src="tor_file" alt="image"
            class="figure-img img-fluid rounded"
            style="max-height:100px;">
      </div>

      <div class="">
        <b-table
          class="my-3 table-striped"
          show-empty
          responsive
          bordered
          hover
          :items="items"
          :fields="fields">

          <template v-slot:cell(url_tor)="row">
            <b-button variant="info" size="sm" @click="ViewImage(row.item, row.index, $event.target)" v-b-tooltip.hover title="View">
              <b-icon-eye/>
            </b-button>
          </template>


        </b-table>
      </div>

      <!-- Start of Delete Modal -->
      <b-modal id="viewImgModal" ref="viewImgModal" title="View Image" size="md" no-close-on-backdrop>
        <img :src="images.url_tor" alt="image">
      </b-modal> <!-- End of delete Modal -->
    </form>
  </div>
</template>
<script>
  import Axios from "axios";
  export default {
    data() {
      return {
        items:[],
        fields: [
          { key: 'student_number', label: 'Student Number', class: 'text-center', sortable: true},
          { key: 'url_tor', label: 'TOR', sortable: true, class: 'text-center' },
        ],

        images: {
          id: null,
          url_tor: null,
        },

        img:null,
        tor_file: null,
      }
    },
    mounted(){
      this.getStudentRequirementsList();
    },

    methods: {

      ViewImage: function(item, index){
        this.images = {
          id: item.id,
          url_tor: item.url_tor
        },
        console.log(this.images.url_tor)
        this.$root.$emit('bv::show::modal', 'viewImgModal')
      },

              onChangeTORUpload(e){
                // this.tor_file = this.$refs.fileTOR.files[0];
                this.img = e.target.files[0];

                let reader = new FileReader();
                reader.readAsDataURL(this.img);
                reader.onload = e => {
                  // console.log(e)
                  this.tor_file = e.target.result;
                  // console.log(this.tor_file);
                }
              },

              UploadImage(){
                let data = new FormData();
                data.append('image', this.img);

                Axios.post('http://localhost/api/v1/upload/img', data , {
                  headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
                })
                .then(()=>{
                  this.getStudentRequirementsList();
                }).catch(()=>{

                })
            },

      SelecFile(event){
        console.log(event.target.files[0].name)
      },

      // Get Room Function
      getStudentRequirementsList: function(){
        Axios
          .get('http://localhost/api/v1/student_requirements', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.items = response.data;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      }, // End of Get Room function

    }
  }
</script>
