<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editUserAccountModal>Edit</b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteUserAccountModal>Delete</b-button>
    </div>
</template>

<script>
    export default {
        name: 'UserAccountActionButtons',
        methods: {
          setFormValues: function(){
            //console.log(this.params.data.id);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.users.username = this.params.data.username;
            this.params.context.componentParent.users.password = this.params.data.password;
            this.params.context.componentParent.users.email = this.params.data.email;
            this.params.context.componentParent.users.first_name = this.params.data.first_name;
            this.params.context.componentParent.users.middle_name = this.params.data.middle_name;
            this.params.context.componentParent.users.last_name = this.params.data.last_name;
            this.params.context.componentParent.users.role = this.params.data.role;
            this.params.context.componentParent.users.active = this.params.data.active;
          }
        }
    };
</script>
