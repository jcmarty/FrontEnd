<template>
    <div>
      <b-button variant='danger' size='sm' @click='deletePreferredSubject' v-b-modal.deletePreferredSubjModal>Remove</b-button>
    </div>
</template>

<script>
    export default {
        name: 'PreferredSubjectButtons',
        methods: {
          deletePreferredSubject: function(){
            //console.log(this.params.data);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.preferredSubject.subject_description = this.params.data.subject_description;
          }
        }
    };
</script>
