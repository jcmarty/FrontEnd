<template>
    <div>
      <b-button variant='danger' size='sm' @click='deleteTimeAvailability' v-b-modal.deleteAvailabilityModal>Remove</b-button>
    </div>
</template>

<script>
    export default {
        name: 'PreferredSubjectButtons',
        methods: {
          deleteTimeAvailability: function(){
            //console.log(this.params.data);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.timeAvailability.day = this.params.data.day;
            this.params.context.componentParent.timeAvailability.time_start = this.params.data.time_start;
            this.params.context.componentParent.timeAvailability.time_end = this.params.data.time_end;
          }
        }
    };
</script>
