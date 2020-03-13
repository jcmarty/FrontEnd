import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import Login from "./views/Login.vue";
import Admin from "./views/Admin.vue";
import Dashboard from "./components/Dashboard.vue";
import SubjectsManager from "./components/SubjectsManager.vue";
import InstructorManager from "./components/InstructorManager.vue";
import CollegeCurriculumManager from "./components/CollegeCurriculumManager.vue";
import HighSchoolCurriculumManager from "./components/HighSchoolCurriculumManager.vue";
import CollegeScheduleManager from "./components/CollegeScheduleManager.vue";
import HighSchoolScheduleManager from "./components/HighSchoolScheduleManager.vue";
import CollegeScheduleReport from "./components/CollegeScheduleReport.vue";
import HighSchoolScheduleReport from "./components/HighSchoolScheduleReport.vue";
import RoomScheduleReport from "./components/RoomScheduleReport.vue";
import InstructorScheduleReport from "./components/InstructorScheduleReport.vue";
import CurriculumSubjects from "./components/CurriculumSubjects.vue";
import InstructorAvailabilitiesManager from "./components/InstructorAvailabilitiesManager.vue";
import InstructorSubjectsManager from "./components/InstructorSubjectsManager.vue";
import RoomManager from "./components/RoomManager.vue";
import SemestersManager from "./components/SemestersManager.vue";
import CourseManager from "./components/CourseManager.vue";
import StrandsManager from "./components/StrandsManager.vue";
import TrackManager from "./components/TrackManager.vue";
import AcademicYearManager from "./components/AcademicYearManager.vue";
import UserAccountManager from  "./components/UserAccountManager.vue";
import StudentRegistrationManager from "./components/StudentRegistrationManager.vue";
import StudentEnrollmentManager from "./components/StudentEnrollmentManager.vue";
import StudentGradesManager from "./components/StudentGradesManager.vue";
import StudentsReport from "./components/StudentsReport.vue";
import UserPrivilegeManager from "./components/UserPrivilegeManager.vue";



// testing only
import RequirementsTesting from "./components/RequirementsTesting.vue";
Vue.use(Router);


/*NOTE: the meta inside each route is useless for now.
we might need this if we use a third party authentication library
or used a middleware*/
export default new Router({

  mode: 'history',
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      },

      children: [
        {
          path: "",
          name: "dashboard",
          component: Dashboard,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },

          meta: {
            guest: true
          }
        },
        {
          path: '/manage/curriculum/college',
          name: 'manageCollegeCurriculum',
          component: CollegeCurriculumManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/curriculum/shs',
          name: 'manageHighSchoolCurriculum',
          component: HighSchoolCurriculumManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/curriculum/curriculum_subjects',
          name: 'manageCurriculumSubjects',
          component: CurriculumSubjects,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/subject',
          name: 'manageSubject',
          component: SubjectsManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/instructor',
          name: 'manageInstructor',
          component: InstructorManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/time_availabilities/',
          name: 'manageInstructorAvailabilities',
          component: InstructorAvailabilitiesManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/preferred_subjects/',
          name: 'manageInstructorSubjects',
          component: InstructorSubjectsManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/schedule/college',
          name: 'manageCollegeSchedule',
          component: CollegeScheduleManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/schedule/shs',
          name: 'manageHighSchoolSchedule',
          component: HighSchoolScheduleManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/reports/schedule/college',
          name: 'viewCollegeSchedule',
          component: CollegeScheduleReport,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/reports/schedule/shs',
          name: 'viewHighSchoolSchedule',
          component: HighSchoolScheduleReport,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/reports/schedule/room',
          name: 'viewRoomSchedule',
          component: RoomScheduleReport,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/reports/schedule/instructor',
          name: 'viewInstructorSchedule',
          component: InstructorScheduleReport,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/room',
          name: 'RoomManager',
          component: RoomManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/semesters',
          name: 'semester',
          component: SemestersManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/course',
          name: 'course',
          component: CourseManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/strand',
          name: 'strand',
          component: StrandsManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/track',
          name: 'track',
          component: TrackManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/academicyear',
          name: 'AcademicYearManager',
          component: AcademicYearManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/useraccount',
          name: 'UserAccountManager',
          component: UserAccountManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/registration/student',
          name: 'StudentRegistration',
          component: StudentRegistrationManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/enrollment/student',
          name: 'StudentEnrollmentManager',
          component: StudentEnrollmentManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
        {
          path: '/manage/grades/student',
          name: 'StudentGradesManager',
          component: StudentGradesManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },

        {
          path: '/reports/students',
          name: 'StudentsReport',
          component: StudentsReport,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },

        // testing only
        {
          path: '/manage/user/privilege',
          name: 'UserPrivilegeManager',
          component: UserPrivilegeManager,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },

        {
          path: '/manage/requirements/',
          name: 'RequirementsTesting',
          component: RequirementsTesting,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 2000);
          },
        },
      ]
    }
  ]
});
