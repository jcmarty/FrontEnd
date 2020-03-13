<template>
<div class="container">
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
  </b-row>

  <b-button class="float-right" variant="success" @click="UploadFile">
    upload
  </b-button>
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
</div>
</template>
<script>
  import Axios from "axios";
  export default {
    data() {
      return {

      }
    },

    methods: {
      SelecFile(event){
        console.log(event)
      },

      UploadFile: function(){
          Axios
            .post('http://localhost/api/v1/rooms', this.room, {
              headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
            })
            .then(res => {
                console.log(res);
            })

        },

    }
  }
</script>
