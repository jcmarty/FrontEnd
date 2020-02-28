<template>
    <div>
      <b-button variant='warning' size='sm' @click='setFormValues()' v-b-modal.editCourseModal>Edit</b-button>
      <b-button variant='danger' size='sm' @click='setFormValues()' v-b-modal.deleteCourseModal>Delete</b-button>
    </div>
</template>

<script>
    export default {
        name: 'CoursesActionButtons',
        methods: {
          setFormValues: function(){
            console.log(this.params.data.id);
            this.params.context.componentParent.id = this.params.data.id;
            this.params.context.componentParent.course.course_code = this.params.data.course_code;
            this.params.context.componentParent.course.course_desc = this.params.data.course_desc;
            this.params.context.componentParent.course.course_major = this.params.data.course_major;
            this.params.context.componentParent.course.year_duration = this.params.data.year_duration;
            this.params.context.componentParent.course.active = this.params.data.active;
          }
        },

        setValues: function(){
          Axios
          .get('http://localhost/api/v1/courses/' + this.params.data.id, {
            headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
          })
          .then(response => {
            console.log(response);
          })
        }
    };
</script>
