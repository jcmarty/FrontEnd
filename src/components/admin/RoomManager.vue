<template>   <!-- Start Template -->
  <div> <!-- Start of Main Div -->
    <h1 class="font-weight-bold text-dark">Manage Rooms</h1>
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

    <!-- Adding Form Start  -->
      <div class="addPanel">
        <!-- <div class="panel panel-primary recordMaintenanceForm" v-if="showForm" >
          <div class="panel-heading">Add a Room</div>
          <div class="panel-body"> -->
        <transition name="fade">
          <!-- <div class="mx-3 mt-4 mb-4 px-4 py-2 bg-white shadow rounded"> -->
        <div id="" class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded" v-if="showForm">
          <div class=" h5 font-weight-bold text-dark" >Add New Room</div>
          <hr/>
            <b-form id="Add_Room_Form">
            <b-form-row>
              <!-- Room Number -->
              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  class="roomnumber"
                  label="Room Number"
                  label-for="roomNumber">
                  <b-form-input
                    type="number"
                    v-model="room.room_number"
                    id="roomNumber"
                    required></b-form-input>
                </b-form-group>
              </b-col>

              <!--  Room Name -->
              <b-col cols="12" md="6" lg="8">
                <b-form-group
                  class="roomname"
                  label="Room Name"
                  label-for="roomName">
                  <b-form-input
                    type="text"
                    v-model="room.room_name"
                    id="roomName"
                    required></b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <!-- Room Capacity -->
              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  class="roomcapacity"
                  label="Room Capacity"
                  label-for="roomCapacity">
                  <b-form-input
                    type="number"
                    v-model="room.room_capacity"
                    id="roomCapacity"
                    required></b-form-input>
                </b-form-group>
              </b-col>

              <!--  Room Type -->
              <b-col cols="12" md="6" lg="8">
                <b-form-group
                  class="roomtype"
                  label="Room Type"
                  label-for="roomType">
                  <b-form-input
                    type="text"
                    v-model="room.room_type"
                    id="roomType"
                    required></b-form-input>
                </b-form-group>
              </b-col>
           </b-form-row>

             <b-form-row>
               <b-col cols="12" md="12" lg="12">
                 <hr/>
               </b-col>
             </b-form-row>

             <!-- Form Buttons -->
             <b-form-row>
               <b-col>
                 <b-button variant="danger" @click="toggleForm">
                   Cancel
                 </b-button>
               </b-col>
               <b-col class="d-flex justify-content-end">
                 <b-button variant="success" id="Add_College_Subject_Btn" @click="addRoom">
                   Add
                 </b-button>
               </b-col>
             </b-form-row>
             <!-- Form Buttons -->

            </b-form> <!-- End of b-form  -->
          </div>  <!-- End of Panel Body  -->
        </transition>
      </div> <!-- End of Add Panel  -->

    <!-- <div class="myTable px-4 py-3 my-5"> -->
    <div class="mx-3 mt-4 mb-4 px-4 pt-4 pb-3 bg-white shadow rounded">

      <!-- Adding Form Start  -->
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
          <b-button variant="primary" @click="toggleForm" class="toggleFormBtn" v-if="!showForm">
            Add New Room
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
      <!-- end of table -->

      <b-modal size="lg" id="editRoomModal" ref="editRoomModal" title="Edit Room" no-close-on-backdrop>
        <b-form-row>
          <!-- Room Number -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group
              class="roomnumber"
              label="Room Number"
              label-for="roomNumber">
              <b-form-input
                type="text"
                v-model="room.room_number"
                id="roomNumber"
                required></b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Name -->
          <b-col cols="12" md="6" lg="8">
            <b-form-group
              class="roomname"
              label="Room Name"
              label-for="roomName">
              <b-form-input
                type="text"
                v-model="room.room_name"
                id="roomName"
                required></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <!-- Room Status -->
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              label="Status">
              <b-form-select
              :options="options"
              v-model="room.active">
            </b-form-select>
            </b-form-group>
          </b-col>

          <!-- Room Capacity -->
          <b-col cols="12" md="6" lg="2">
            <b-form-group
              class="roomcapacity"
              label="Room Capacity"
              label-for="roomCapacity">
              <b-form-input
                type="number"
                id="roomCapacity"
                v-model="room.room_capacity">
              </b-form-input>
            </b-form-group>
          </b-col>

          <!--  Room Type -->
          <b-col cols="12" md="6" lg="8">
            <b-form-group
              class="roomtype"
              label="Room Type"
              label-for="roomType">
              <b-form-input
                type="text"
                id="roomType"
                v-model="room.room_type">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <template v-slot:modal-footer="{ cancel, ok }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-col>
            <b-button class="float-left"  variant="danger" @click="$bvModal.hide('editRoomModal')">
              Cancel
            </b-button>
            <b-button class="float-right" variant="success" @click="updateRoom()">
              Update
            </b-button>
         </b-col>
       </template>
    </b-modal>



    <!-- Start of Delete Modal -->
    <b-modal id="deleteRoomModal" ref="deleteRoomModal" title="Delete Room" size="md" no-close-on-backdrop>
      <h6>Are you sure you want to delete  <br/><b>Room {{ this.room.room_number }} {{this.room.room_name}} ?</b></h6>
      <template v-slot:modal-footer="{ cancel, ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-col>
          <b-button class="float-left" variant="danger" @click="$bvModal.hide('deleteRoomModal')">
            No
          </b-button>
          <b-button class="float-right" variant="success" @click="deleteRoom()">
            Yes
          </b-button>
        </b-col>
      </template>
    </b-modal> <!-- End of delete Modal -->
  </div> <!-- End of Main Div -->
</template> <!-- End of Template -->

<script>
  import Axios from "axios";
  export default{
    name: 'RoomsManager',
    data() {
      return {
        isLoading: false,
        items: [],
        fields: [
          { key: 'room_number', label: 'Room Number', class: 'text-center', sortable: true},
          { key: 'room_name', label: 'Room Name', sortable: true, class: 'text-center' },
          { key: 'room_type', label: 'Room Type', sortable: true, class: 'text-center' },
          { key: 'room_capacity', label: 'Room Capacity', sortable: true, class: 'text-center' },
          { key: 'active', label: 'Active', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' , class: 'text-center' }
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20, 25],
        filter: null,

        room: {
          id: null,
          room_number: null,
          room_name: null,
          room_type: null,
          room_capacity: null,
          active: 0
        },

        options: [
          {value: 0, text: 'Inactive'},
          {value: 1, text: 'Active'}
        ],

        showForm: false,
        alertMessage: "",
        errors: [],
        dismissSecs: 7,
        dismissSuccessCountDown: 0,
        dismissErrorCountDown: 0,
      }
    }, // End of Data

    mounted () {
      this.getRooms();
    }, // End of mounted

    methods:{
      // Get Room Function
      getRooms: function(){
        this.isLoading = true;
        Axios
          .get('http://localhost/api/v1/rooms', {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.isLoading = false;
            this.items = response.data;
            for(var j = 0; j < this.items.length; j++){
              if(this.items[j].active == 1){
                this.items[j].status = true
              }else{
                this.items[j].status = false;
              }
            }
            this.totalRows = this.items.length;
            this.backToTop();
          })
          .catch(error => {
            this.isLoading = false;
            this.alertMessage = error.response.data.message;
            this.dismissErrorCountDown = this.dismissSecs;
            this.backToTop();
          })
      }, // End of Get Room function

      // Add Room Function
      addRoom: function(){
        this.errors = [];
        Axios
          .post('http://localhost/api/v1/rooms', this.room, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getRooms();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.showForm = false;
            this.resetform();
            this.backToTop();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            const values = Object.values(error.response.data.errors);
            for(const val of values){
              for(const err of val){
                this.errors.push(err);
              }
            }
            this.backToTop();
            this.dismissErrorCountDown = this.dismissSecs;
          })
      }, // End of Add Room Function

      // Update Room Function
      updateRoom: function(){
        this.errors = [];
        Axios
        .put('http://localhost/api/v1/rooms/' + this.room.id, this.room, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getRooms();
          this.alertMessage = response.data.message;
          this.dismissSuccessCountDown = this.dismissSecs;
          this.resetform();
          this.backToTop();
        })
        .catch(error => {
          this.alertMessage = error.response.data.message;
          const values = Object.values(error.response.data.errors);
          for(const val of values){
            for(const err of val){
              this.errors.push(err);
            }
          }
          this.backToTop();
          this.dismissErrorCountDown = this.dismissSecs;
        });
        this.$refs['editRoomModal'].hide();
      }, // End of Update Room Function

      // Delete Room Function
      deleteRoom: function(){
        this.errors = [];
        Axios
          .delete('http://localhost/api/v1/rooms/' + this.room.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            this.getRooms();
            this.alertMessage = response.data.message;
            this.dismissSuccessCountDown = this.dismissSecs;
            this.resetform();
            this.backToTop();
          })
          .catch(error => {
            this.alertMessage = error.response.data.message;
            /*const values = Object.values(error.response.data.errors);
            for(const val of values){
              for(const err of val){
                this.errors.push(err);
              }
            }*/
            this.backToTop();
            this.dismissErrorCountDown = this.dismissSecs;
          });
        this.$refs['deleteRoomModal'].hide();
      }, // End of Delete Room Function

      // Toggle Form Function
      toggleForm: function(){
        this.resetform();
        if(this.showForm){
          this.showForm = false;
        } else {
          this.showForm = true;
        }
        this.backToTop();
      }, // End of Toggle Form Function

      // Reset Form Function
      resetform: function(){
        this.room = {
          room_number: null,
          room_name: null,
          room_type: null,
          room_capacity: null,
          active: 1
        };
      }, // End of Reset Form Function

      EditModal: function(item, index) {
        this.room = {
          id: item.id,
          room_number: item.room_number,
          room_name: item.room_name,
          room_type: item.room_type,
          room_capacity: item.room_capacity,
          active: item.active
        },
        this.$root.$emit('bv::show::modal', 'editRoomModal')
      },
      DeleteModal: function(item){
        this.room = {
          id: item.id,
          room_number: item.room_number,
          room_name: item.room_name,
          room_type: item.room_type,
          room_capacity: item.room_capacity,
          active: item.active
        },
        this.$root.$emit('bv::show::modal', 'deleteRoomModal')
      },

      StatusUpdate: function(item){
        this.errors = [];

        this.room = {
          id: item.id,
          room_number: item.room_number,
          room_name: item.room_name,
          room_type: item.room_type,
          room_capacity: item.room_capacity,
          active: item.active == 1 ? item.active = 0 : item.active = 1
        },

        Axios
        .put('http://localhost/api/v1/rooms/' + this.room.id, this.room, {
          headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
        })
        .then(response => {
          this.getRooms();
          if(item.active == 0){
            this.alertMessage = "Room " + item.room_number + " successfully deactivated."
          }else{
              this.alertMessage = "Room " + item.room_number + " successfully activated."
          }
          this.dismissSuccessCountDown = this.dismissSecs;
          this.resetform();
          this.backToTop();
        })
        .catch(error => {
          this.alertMessage = error.response.data.message;
          const values = Object.values(error.response.data.errors);
          for(const val of values){
            for(const err of val){
              this.errors.push(err);
            }
          }
          this.backToTop();
          this.dismissErrorCountDown = this.dismissSecs;
        });
      }, // end of Status Update Function

      backToTop: function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
    } // End of Methods
  } // End of Export Default
</script>
<style>
  .addPanel{
    width: 70%;
    position: relative;
    left: 200px;
  }

  .myTable{
    border-radius: 5px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }


</style>
