<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editStrandsModal v-b-tooltip.hover title="Edit Strand"><b-icon-pencil/></b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteStrandsModal v-b-tooltip.hover title="Delete Strand"><b-icon-trash/></b-button>
    </div>
</template>

<script>
    export default {
        name: 'StrandsActionButtons',
        methods: {
          setFormValues: function(){
            //console.log(this.params.data.id);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.strand.track_id = this.params.data.track_id;
            this.params.context.componentParent.strand.strand_code = this.params.data.strand_code;
            this.params.context.componentParent.strand.strand_desc = this.params.data.strand_desc;
            this.params.context.componentParent.strand.created_at = this.params.data.created_at;
            this.params.context.componentParent.strand.updated_at = this.params.data.updated_at;
            this.params.context.componentParent.strand.last_updated_by = this.params.data.last_updated_by;
            this.params.context.componentParent.strand.active = this.params.data.active;
          }
        }
    };
</script>
