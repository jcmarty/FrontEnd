<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editRoomModal v-b-tooltip.hover title="Edit Room"><b-icon-pencil/></b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteRoomModal v-b-tooltip.hover title="Delete Room"><b-icon-trash/></b-button>
    </div>
</template>

<script>
    export default {
        name: 'RoomsActionButtons',
        methods: {
          setFormValues: function(){
            //console.log(this.params.data.id);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.room.room_number = this.params.data.room_number;
            this.params.context.componentParent.room.room_name = this.params.data.room_name;
            this.params.context.componentParent.room.room_type = this.params.data.room_type;
            this.params.context.componentParent.room.room_capacity = this.params.data.room_capacity;
            this.params.context.componentParent.room.active = this.params.data.active;
          }
        }
    };
</script>
