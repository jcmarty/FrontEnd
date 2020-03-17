<template>
    <div>
      <b-button variant="primary" size='sm' :to="{ name: 'manageCurriculumSubjects',
        params: {
          id: params.data.id,
          data: params.data
          }
        }">
        Subjects</b-button>
      <b-button variant='primary' size='sm' @click='setFormValues()' v-b-modal.editCurriculumModal>Edit</b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteCurriculumModal>Delete</b-button>
    </div>
</template>

<script>
    export default {
        name: 'CurriculumActionButtons',
        methods: {
          setFormValues: function(){
            console.log(this.params.data);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.curriculum.curriculum_title = this.params.data.curriculum_title;
            this.params.context.componentParent.curriculum.curriculum_desc = this.params.data.curriculum_desc;
            this.params.context.componentParent.curriculum.course_id = this.params.data.course_id;
            this.params.context.componentParent.curriculum.strand_id = this.params.data.strand_id;
          }
        }
    };
</script>
