<template>
    <div>
      <b-button variant='primary' size='sm' @click='setFormValues()' v-b-modal.SubjectsPerInstructor>Subjects</b-button>
    </div>
</template>

<script>
    export default {
        name: 'InstructorScheduleReportActionButtons',
        methods: {
          setFormValues: function(){
            console.log(this.params.data.id);
            this.params.context.componentParent.instructorId = this.params.data.id;
            this.params.context.componentParent.instructor.employee_id = this.params.data.employee_id;
            this.params.context.componentParent.instructor.first_name = this.params.data.first_name;
            this.params.context.componentParent.instructor.middle_name = this.params.data.middle_name;
            this.params.context.componentParent.instructor.last_name = this.params.data.last_name;
            this.params.context.componentParent.instructor.birth_date = this.params.data.birth_date;
            this.params.context.componentParent.instructor.gender = this.params.data.gender;
            this.params.context.componentParent.instructor.email = this.params.data.email;
            this.params.context.componentParent.instructor.contact_no = this.params.data.contact_no;
            this.params.context.componentParent.instructor.address = this.params.data.address;
            this.params.context.componentParent.instructor.city = this.params.data.city;
            this.params.context.componentParent.instructor.province = this.params.data.province;
            this.params.context.componentParent.instructor.postal_code = this.params.data.postal_code;
            this.params.context.componentParent.instructor.work_experience = this.params.data.work_experience;
            this.params.context.componentParent.instructor.certifications = this.params.data.certifications;
            this.params.context.componentParent.instructor.educational_attainment = this.params.data.educational_attainment;
            this.params.context.componentParent.instructor.active = this.params.data.active;
            this.params.context.componentParent.getPreferredSubjects();
            this.params.context.componentParent.getTimeAvailabilities();
          }
        }
    };
</script>
