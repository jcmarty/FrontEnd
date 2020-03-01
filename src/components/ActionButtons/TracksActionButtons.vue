<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editTrackModal>EDIT</b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteTrackModal>DELETE</b-button>
    </div>
</template>

<script>
    export default {
        name: 'TracksActionButtons',
        methods: {
          setFormValues: function(){
            //console.log(this.params.data.id);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.track.track_code = this.params.data.track_code;
            this.params.context.componentParent.track.track_desc = this.params.data.track_desc;
            this.params.context.componentParent.track.created_at = this.params.data.created_at;
            this.params.context.componentParent.track.updated_at = this.params.data.updated_at;
            this.params.context.componentParent.track.last_updated_by = this.params.data.last_updated_by;
            this.params.context.componentParent.track.active = this.params.data.active;
          }
        }
    };
</script>
