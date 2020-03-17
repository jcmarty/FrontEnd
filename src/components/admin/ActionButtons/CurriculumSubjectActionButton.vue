<template>
    <div>
      <b-button variant='success' size='sm' @click='addSubject' v-b-tooltip.hover title="Add this subject"><b-icon-plus/></b-button>
    </div>
</template>

<script>
    import Axios from "axios";
    export default {
        name: 'CurriculumSubjectActionButton',
        data() {
          return {
            newSubjectData: {
              subject_id: null,
              curriculum_id: null,
              year_level: null,
              semester_id: null,
              active: null
            },
            subjectsData: null,
          }
        },
        mounted (){

        },
        methods: {
          // add curriculum subject
          addSubject: function(){
            this.params.context.componentParent.errors = [];
            if(this.params.context.componentParent.selectedYearLevel == null){
              this.params.context.componentParent.alertMessage = "Year level field is required";
              this.params.context.componentParent.dismissErrorCountDown = 7;
            }else if( this.params.context.componentParent.selectedSemester.id  == null){
              this.params.context.componentParent.alertMessage = "Semester field is required";
              this.params.context.componentParent.dismissErrorCountDown = 7;
            }else{
              this.newSubjectData = {
                subject_id : this.params.data.id,
                curriculum_id : this.params.context.componentParent.curriculum_data.id,
                year_level : this.params.context.componentParent.selectedYearLevel,
                semester_id : this.params.context.componentParent.selectedSemester.id,
                active : 1
              };
              Axios
                .post('http://localhost/api/v1/curriculum_subjects', this.newSubjectData,{
                  headers: {
                    'Authorization': 'Bearer ' + this.$store.getters.getToken
                  }
                })
                .then(response => {
                  this.params.context.componentParent.alertMessage = response.data.message;
                  this.params.context.componentParent.dismissSuccessCountDown = 7;
                  this.params.context.componentParent.getCurriculumSubjects();
                  this.params.context.componentParent.filterExistedSubject();
                  this.params.context.componentParent.onChangeSemester();
                })
                .catch(error => {
                  console.log(error.response.data);
                  this.params.context.componentParent.alertMessage = error.response.data.message;
                  this.params.context.componentParent.dismissErrorCountDown = 7;
                })
            }
          },

          // get all curriculum subjects
          // getCurriculumSubjects: function() {
          //   Axios
          //     .get('http://localhost/api/v1/curriculums/' + this.params.context.componentParent.curriculum_data.id + '/subjects', {
          //       headers: {
          //         'Authorization': 'Bearer ' + this.$store.getters.getToken
          //       }
          //     })
          //     .then(response => {
          //       this.subjectsData = response.data;
          //       this.params.context.componentParent.CurriculumSubjectData = response.data;
          //       // this.filterExistedSubject();
          //     })
          // },

          // filterExistedSubject: function() {
          //   // gets all subjects
          //   Axios
          //     .get('http://localhost/api/v1/subjects', {
          //       headers: {
          //         'Authorization': 'Bearer ' + this.$store.getters.getToken
          //       }
          //     })
          //     .then(response => {
          //
          //       // CurriculumSubjectData
          //       this.rowData = [];
          //       for(var i = 0; i < response.data.length; i++){
          //         for(var j = 0; j < this.subjectsData.length; j++){
          //           if(response.data[i].id == this.subjectsData[j].subject_id){
          //             return
          //           }
          //         }
          //         this.params.context.componentParent.rowData.push(response.data[i]);
          //       }
          //
          //     })
          // },

        }
    };
</script>
