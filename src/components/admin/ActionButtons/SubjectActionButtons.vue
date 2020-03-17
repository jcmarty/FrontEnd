<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editSubjModal v-b-tooltip.hover title="Edit Subject"><b-icon-pencil/></b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteSubjModal v-b-tooltip.hover title="Delete Subject"><b-icon-trash/></b-button>
    </div>
</template>

<script>
    export default {
        name: 'SubjectActionButtons',
        methods: {
          setFormValues: function(){
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.subject.subject_code = this.params.data.subject_code;
            this.params.context.componentParent.subject.subject_description = this.params.data.subject_description;
            this.params.context.componentParent.subject.lec = this.params.data.lec;
            this.params.context.componentParent.subject.lab = this.params.data.lab;
            this.params.context.componentParent.subject.units = this.params.data.units;
            this.params.context.componentParent.subject.active = this.params.data.active;
          }
        }
    };
</script>
