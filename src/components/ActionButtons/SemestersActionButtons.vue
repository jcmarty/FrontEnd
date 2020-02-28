<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editSemesterModal>Edit</b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteSemesterModal>Delete</b-button>
    </div>
</template>

<script>
    export default {
        name: 'SemestersActionButtons',
        methods: {
          setFormValues: function(){
          this.params.context.componentParent.semesters.semester = this.params.data.semester;
          }
        }
    };
</script>
