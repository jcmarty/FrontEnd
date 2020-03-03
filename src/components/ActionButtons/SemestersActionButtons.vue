<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editSemesterModal v-b-tooltip.hover title="Edit Semester"><b-icon-pencil/></b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteSemesterModal v-b-tooltip.hover title="Delete Semester"><b-icon-trash/></b-button>
    </div>
</template>

<script>
    export default {
        name: 'SemestersActionButtons',
        methods: {
          setFormValues: function(){
            this.params.context.componentParent.id = this.params.data.id;
          this.params.context.componentParent.semesters.semester = this.params.data.semester;
          }
        }
    };
</script>
