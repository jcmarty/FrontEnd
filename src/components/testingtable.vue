<template>
  <b-container>
    <!-- User Interface controls -->
    <h1>Room Management</h1>
    <hr/>

    <div class="myTable px-4 py-3 my-5">
    <b-row>
      <b-col lg="4" class="my-1 ">
        <b-form-group
        class="filter"
        label="Filter"
        label-for="Filter"
        >
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

    <!-- Main table element -->
    <b-table
      class="my-3"
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter">
      <template v-slot:cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template v-slot:cell(actions)="row">

        <b-button variant="warning" size="sm" @click="row.toggleDetails">
          <b-icon-pencil/>
        </b-button>

        <b-button variant="danger" size="sm" v-b-tooltip.hover title="Delete Room">
          <b-icon-trash/>
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-col cols="12" md="6" lg="3">
            <!-- getting the id of selected room -->
            <b-form-input
              type="number"
              id="roomID"
              :value="row.item.id"
              hidden>
            </b-form-input >

            <b-form-group
              class="roomnumber"
              label="Room Number"
              label-for="roomNumber">
              <b-form-input
                type="number"
                id="roomNumber"
                :value="row.item.room_number">
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="roomname"
              label="Room Name"
              label-for="roomName">
              <b-form-input
                type="text"
                id="roomName"
                :value="row.item.room_name">
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="roomtype"
              label="Room Type"
              label-for="roomType">
              <b-form-input
                type="text"
                id="roomType"
                :value="row.item.room_type">
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="3">
            <b-form-group
              class="roomcapacity"
              label="Room Capacity"
              label-for="roomCapacity">
              <b-form-input
                type="number"
                id="roomCapacity"
                :value="row.item.room_capacity">
              </b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="2">
            <b-form-group
              label="Status">
              <b-form-select
                :options="options"
                :value="row.item.active">
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col>
            <b-button class="float-right" variant="success" @click="updateRoom()">
              Update
            </b-button>
         </b-col>
        </b-card>
      </template>
    </b-table>

    <hr/>
    <b-row>
      <b-col sm="4" md="6" lg="1" class="my-1">
        <b-form-group
        class="perpageselect"
        label=""
        label-for="perPageSelect"
        >
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


    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>
<style>
  .myTable{
    border-radius: 5px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>
<script>
  import Axios from "axios";
  export default {
    data() {
      return {
        items: [],
        fields: [
          { key: 'id', label: 'id', sortable: true,  class: 'text-center', sortDirection: 'desc'  },
          { key: 'room_number', label: 'Room Number', class: 'text-center', sortable: true, sortDirection: 'desc' },
          { key: 'room_name', label: 'Room Name', sortable: true, class: 'text-center' },
          { key: 'room_type', label: 'Room Type', sortable: true, class: 'text-center' },
          { key: 'room_capacity', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        id: null,

        room: {
          room_number: 0,
          room_name: null,
          room_type: null,
          room_capacity: 0,
          active: 0
        },

        options: [
          {value: 0, text: 'Inactive'},
          {value: 1, text: 'Active'}
        ],
      }
    },

    mounted() {
      this.getRooms();
      // Set the initial number of items

    },
    methods: {
      getRooms: function(){
        Axios
          .get('http://localhost/api/v1/rooms', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.items = response.data;
            this.totalRows = this.items.length;
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
          })
      }, // End of Get Room function

      // Update Room Function
      updateRoom: function(){
        // document.getElementById("roomID").value
        var num = document.getElementById("roomNumber").value
        var name = document.getElementById("roomName").value
        var type = document.getElementById("roomType").value
        var cap = document.getElementById("roomCapacity").value
        var data = {
          room_number: num,
          room_name: name,
          room_type: type,
          room_capacity: cap,
        }
        console.log(data);

        // this.errors = [];
        // Axios
        // .put('http://localhost/api/v1/rooms/' + this.id, this.room, {
        //   headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        // })
        // .then(response => {
        //   this.getRooms();
        //   this.alertMessage = response.data.message;
        //   this.dismissSuccessCountDown = this.dismissSecs;
        // })
        // .catch(error => {
        //   this.alertMessage = error.response.data.message;
        //   const values = Object.values(error.response.data.errors);
        //   for(const val of values){
        //     for(const err of val){
        //       this.errors.push(err);
        //     }
        //   }
        //   this.dismissErrorCountDown = this.dismissSecs;
        // });
      }, // End of Update Room Function

      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
