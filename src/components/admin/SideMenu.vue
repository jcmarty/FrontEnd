<template>
<div class="col-md-3 left_col">
  <div class="left_col scroll-view">
    <div class="navbar nav_title" style="border: 0;">
      <router-link tag="a" to="/admin" class="site_title"><i class="fa fa-calendar"></i> <span>{{this.$store.getters.getUser.role}}</span></router-link>
    </div>


    <div class="profile clearfix"></div>
    <!-- menu profile quick info -->
    <div class="profile clearfix">
      <div class="profile_info">
        <h2> Welcome {{this.$store.getters.getUser.first_name}} {{this.$store.getters.getUser.last_name}}!</h2>
      </div>
    </div>
    <!-- /menu profile quick info -->

    <br />

    <!-- sidebar menu -->
    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
      <div class="menu_section">
        <ul class="nav side-menu" v-click-outside="onClickOutside">
          <router-link tag="li" to="/admin"><a><i class="fa fa-home"></i> Home </a></router-link>
          <li v-bind:class="{current : currentCategory=='manage'}"><a v-b-toggle.manageOptions><i class="fa fa-edit"></i> Manage <span class="fa fa-chevron-down"></span></a>
            <b-collapse tag="ul" class="nav child_menu" id="manageOptions" accordion="sideMenuAccordion">
              <router-link tag="li" to="/manage/student/requirements"><a>Requirements Testing</a></router-link>
              <router-link tag="li" to="/manage/curriculum/college"><a>Curriculum Testing</a></router-link>
              <router-link tag="li" to="/manage/schedule/college"><a>Schedule Testing</a></router-link>
              <li v-b-toggle.schedules v-if="isAuthorized(this.$store.getters.getSettings.schedule_management, 0)"><a> Class Schedule<span class="fa fa-chevron-down"></span></a>
                <b-collapse tag="ul" class="nav child_menu" id="schedules" accordion="sideMenuSubAccordion">
                  <router-link tag="li" to="/manage/schedule/college"><a class="super_child_menu">College</a></router-link>
                  <router-link tag="li" to="/manage/schedule/shs"><a class="super_child_menu">Senior High</a></router-link>
                </b-collapse>
              </li>
              <router-link tag="li" to="/manage/subject" v-if="isAuthorized(this.$store.getters.getSettings.subject_management, 0)"><a>Subject</a></router-link>
              <li v-b-toggle.curriculum v-if="isAuthorized(this.$store.getters.getSettings.curriculum_management, 0)"><a>Curriculum<span class="fa fa-chevron-down"></span></a>
              <b-collapse tag="ul" class="nav child_menu" id="curriculum" accordion="sideMenuSubAccordion">
                <router-link tag="li" to="/manage/curriculum/college"><a class="super_child_menu">College</a></router-link>
                <router-link tag="li" to="/manage/curriculum/shs"><a class="super_child_menu">Senior High</a></router-link>
              </b-collapse>
              </li>
              <router-link tag="li" to="/manage/room" v-if="isAuthorized(this.$store.getters.getSettings.room_management, 0)"><a>Room</a></router-link>
              <router-link tag="li" to="/manage/academicyear" v-if="isAuthorized(this.$store.getters.getSettings.academic_year_management, 0)"><a>Academic Years</a></router-link>
              <router-link tag="li" to="/manage/semesters" v-if="isAuthorized(this.$store.getters.getSettings.semester_management, 0)"><a>Semester</a></router-link>
              <router-link tag="li" to="/manage/course" v-if="isAuthorized(this.$store.getters.getSettings.course_management, 0)"><a>Course</a></router-link>
              <router-link tag="li" to="/manage/strand" v-if="isAuthorized(this.$store.getters.getSettings.strand_management, 0)"><a>Strand</a></router-link>
              <router-link tag="li" to="/manage/track" v-if="isAuthorized(this.$store.getters.getSettings.track_management, 0)"><a>Track</a></router-link>
              <router-link tag="li" to="/manage/instructor" v-if="isAuthorized(this.$store.getters.getSettings.instructor_management, 0)"><a>Instructor</a></router-link>
              <router-link tag="li" to="/manage/useraccount" v-if="isAuthorized(this.$store.getters.getSettings.user_management, 0)"><a>User Accounts</a></router-link>
              <li v-b-toggle.student><a>Student<span class="fa fa-chevron-down"></span></a>
              <b-collapse tag="ul" class="nav child_menu" id="student" accordion="sideMenuSubAccordion">
                <router-link tag="li" to="/manage/student/registration"><a class="super_child_menu">Registration</a></router-link>
                <router-link tag="li" to="/manage/student/enrollment"><a class="super_child_menu">Enrollment</a></router-link>
                <router-link tag="li" to="/manage/student/grades"><a class="super_child_menu">Grades</a></router-link>
              </b-collapse>
              </li>
              <!-- TODO:  Decide if we are really going to add these, and HOW -->
              <router-link tag="li" to="#"><a>Password Reset Requests</a></router-link>
              <router-link tag="li" to="#"><a>Backup and Restore Database</a></router-link>
              <!-- --------------------------------------------------- -->
              <router-link tag="li" to="/ActivityLogs"><a>Activity Logs</a></router-link>
            </b-collapse>
          </li>
          <li v-bind:class="{active : currentCategory=='reports'}"><a v-b-toggle.reports><i class="fa fa-desktop"></i>View Report<span class="fa fa-chevron-down"></span></a>
            <b-collapse tag="ul" class="nav child_menu" id="reports" accordion="sideMenuAccordion">
              <li v-b-toggle.classSchedules v-if="isAuthorized(this.$store.getters.getSettings.schedule_management, 0)"><a> Class Schedule<span class="fa fa-chevron-down"></span></a>
                <b-collapse tag="ul" class="nav child_menu" id="classSchedules" accordion="sideMenuSubAccordion">
                  <router-link tag="li" to="/reports/schedule/college"><a class="super_child_menu">College</a></router-link>
                  <router-link tag="li" to="/reports/schedule/shs"><a class="super_child_menu">Senior High</a></router-link>
                </b-collapse>
              </li>
              <router-link tag="li" to="/reports/student" v-if="isAuthorized(this.$store.getters.getSettings.schedule_management, 0)"><a>Student Reports</a></router-link>
              <router-link tag="li" to="/reports/schedule/room" v-if="isAuthorized(this.$store.getters.getSettings.schedule_management, 0)"><a>Room Schedule</a></router-link>
              <router-link tag="li" to="/reports/schedule/instructor" v-if="isAuthorized(this.$store.getters.getSettings.schedule_management, 0)"><a>Instructor Schedule</a></router-link>
              <router-link tag="li" to="#" v-if="isAuthorized(this.$store.getters.getSettings.instructor_management, 0)"><a>Instructors List</a></router-link>
              <router-link tag="li" to="#" ><a>Alumni Members / Graduates</a></router-link>
            </b-collapse>
          </li>
        </ul>
      </div>
    </div>
    <!-- /sidebar menu -->
  </div>
</div>
</template>
<script>
  export default{
    name: "SideMenu",
    data(){
      return {
        // user: this.$store.getters.getUser,
        category: 'index'
      }
    },
    computed: {
      //category of current url/path is used
      //to set the active link in the sidebar menu
      currentCategory: {
        get: function(){
          return this.category;
        },
        set: function(newValue){
          this.category = newValue;
        }
      }
    },
    mounted(){
      //checks what category the current url/path belongs to
      //TODO: FIX THIS; stopped working after I added b-collapse
      switch(this.$route.name){
        case 'manageCollegeSchedule':
        case 'manageHighSchoolSchedule':
        case 'manageCollegeSubjects':
      //  case 'manageHighSchoolSchedule':
          //return 'manage';
          this.currentCategory = 'manage';
          break;
        case 'viewCollegeSchedule':
        case 'viewHighSchoolSchedule':
        case 'viewRoomSchedule':
        case 'viewInstructorSchedule':
          //return 'reports';
          this.currentCategory = 'reports';
          break;
        default:
          //return 'index';
          this.currentCategory = 'index';
      }
      this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
        if(isJustShown)
          document.getElementById(collapseId).parentElement.classList.add("active");
        else
          document.getElementById(collapseId).parentElement.classList.remove("active");
      });
    },
    methods: {
      isAuthorized(activity, priv){
        //activity level
        if(priv == 0){
          //check if user has a privilege in this activity
          if (this.$store.getters.getUser.activities.some(a => a.activity_id === activity)) {
            return true;
          }
          return false;
        }
        //privilege level
        else{
          //TODO: check if user has the exact privilege (CRUD) to do this activity

        }
      },
      //hide sidebar submenu when clicked outside the sidebar menu
      onClickOutside(e, el){
        if(document.getElementById('manageOptions').classList.contains('show'))
          this.$root.$emit('bv::toggle::collapse', 'manageOptions');
        if(document.getElementById('reports').classList.contains('show'))
          this.$root.$emit('bv::toggle::collapse', 'reports');
      }
    }
  }
</script>
