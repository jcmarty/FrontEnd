<template>
    <div>
      <b-button variant='primary' size='sm' @click='setFormValues()' v-b-modal.EditStudentModal>Enroll</b-button>
      <b-button variant='info' size='sm' @click='setFormValues()' v-b-modal.EditStudentModal>View</b-button>

    </div>
</template>

<script>
    export default {
        name: 'StudentActionButtons',
        methods: {
          setFormValues: function(){
            console.log(this.params.data.id);
            this.params.context.componentParent.instructorId = this.params.data.id;
            this.params.context.componentParent.Students.first_name = this.params.data.first_name;
            this.params.context.componentParent.Students.middle_name = this.params.data.middle_name;
            this.params.context.componentParent.Students.last_name = this.params.data.last_name;
            this.params.context.componentParent.Students.suffix_name = this.params.data.suffix_name;
            this.params.context.componentParent.Students.gender = this.params.data.gender;
            this.params.context.componentParent.Students.address = this.params.data.address;
            this.params.context.componentParent.Students.civil_status = this.params.data.civil_status;
            this.params.context.componentParent.Students.city = this.params.data.city;
            this.params.context.componentParent.Students.postal = this.params.data.postal;
            this.params.context.componentParent.Students.province = this.params.data.province;
            this.params.context.componentParent.Students.telephone = this.params.data.telephone;
            this.params.context.componentParent.Students.cellphone = this.params.data.cellphone;
            this.params.context.componentParent.Students.email = this.params.data.email;
            this.params.context.componentParent.Students.birth_date = this.params.data.birth_date;
            this.params.context.componentParent.Students.birth_place = this.params.data.birth_place;
            this.params.context.componentParent.Students.father_name = this.params.data.father_name;
            this.params.context.componentParent.Students.mother_name = this.params.data.mother_name;
            this.params.context.componentParent.Students.contact_person = this.params.data.contact_person;
            this.params.context.componentParent.Students.contact_address = this.params.data.contact_address;
            this.params.context.componentParent.Students.contact_number = this.params.data.contact_number;
            this.params.context.componentParent.Students.blood_type = this.params.data.blood_type;
            this.params.context.componentParent.Students.photo_url = this.params.data.photo_url;
            this.params.context.componentParent.Students.user_id = this.params.data.user_id;
            this.params.context.componentParent.Students.school_last_attended = this.params.data.school_last_attended;
            this.params.context.componentParent.Students.school_address = this.params.data.school_address;
            this.params.context.componentParent.Students.active = this.params.data.active;
          }
        }
    };
</script>
