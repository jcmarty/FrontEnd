<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editAYModal v-b-tooltip.hover title="Edit Academiy Year"><b-icon-pencil/></b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteAYModal v-b-tooltip.hover title="Delete Academiy Year"><b-icon-trash/></b-button>
    </div>
</template>

<script>
    export default {
        name: 'AcademicYearActionButtons',
        methods: {
          setFormValues: function(){
            //console.log(this.params.data.id);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.AcademicYears.academic_year = this.params.data.academic_year;
          }
        }
    };
</script>
