import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import Home from "./views/student/Home.vue";
import Frontpage from "./views/student/Frontpage.vue";
import Register from "./views/student/Register.vue";
import AdminLogin from "./views/admin/Login.vue";
import Admin from "./views/admin/Admin.vue";
import AdminPanel from "./views/admin/AdminPanel.vue";
import Dashboard from "./components/admin/Dashboard.vue";
import SubjectsManager from "./components/admin/SubjectsManager.vue";
import InstructorManager from "./components/admin/InstructorManager.vue";
import CollegeCurriculumManager from "./components/admin/CollegeCurriculumManager.vue";
import HighSchoolCurriculumManager from "./components/admin/HighSchoolCurriculumManager.vue";
import CollegeScheduleManager from "./components/admin/CollegeScheduleManager.vue";
import HighSchoolScheduleManager from "./components/admin/HighSchoolScheduleManager.vue";
import CollegeScheduleReport from "./components/admin/CollegeScheduleReport.vue";
import HighSchoolScheduleReport from "./components/admin/HighSchoolScheduleReport.vue";
import RoomScheduleReport from "./components/admin/RoomScheduleReport.vue";
import InstructorScheduleReport from "./components/admin/InstructorScheduleReport.vue";
import CurriculumSubjects from "./components/admin/CurriculumSubjects.vue";
import InstructorAvailabilitiesManager from "./components/admin/InstructorAvailabilitiesManager.vue";
import InstructorSubjectsManager from "./components/admin/InstructorSubjectsManager.vue";
import RoomManager from "./components/admin/RoomManager.vue";
import SemestersManager from "./components/admin/SemestersManager.vue";
import CourseManager from "./components/admin/CourseManager.vue";
import StrandsManager from "./components/admin/StrandsManager.vue";
import TrackManager from "./components/admin/TrackManager.vue";
import AcademicYearManager from "./components/admin/AcademicYearManager.vue";
import UserAccountManager from "./components/admin/UserAccountManager.vue";
import StudentRegistrationManager from "./components/admin/StudentRegistrationManager.vue";
import StudentEnrollmentManager from "./components/admin/StudentEnrollmentManager.vue";
import StudentGradesManager from "./components/admin/StudentGradesManager.vue";
import StudentsReport from "./components/admin/StudentsReport.vue";
import UserPrivilegeManager from "./components/admin/UserPrivilegeManager.vue";
import ActivityLogs from "./components/admin/ActivityLogs.vue";

// for testing only
import RequirementsTesting from "./components/admin/RequirementsTesting.vue";

Vue.use(Router);

/*NOTE: the meta inside each route is useless for now.
we might need this if we use a third party authentication library
or used a middleware*/
export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        guest: true
      },
      children: [
        {
          path: "",
          name: "frontpage",
          component: Frontpage,
          meta: {
            guest: true
          }
        },
        {
          path: "register",
          component: Register,
          meta: {
            guest: true
          }

        }
      ]
    },
    {
      path: "/admin",
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      },
      children: [
        {
          path: "",
          name: "adminpanel",
          component: AdminPanel,
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
                requiresAuth: true,
                is_admin: true
              }
            },



            {
              path: '/manage/user/privilege',
              name: 'UserPrivilegeManager',
              component: UserPrivilegeManager,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
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
              path: '/manage/student/registration',
              name: 'StudentRegistrationManager',
              component: StudentRegistrationManager,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },
            {
              path: '/manage/student/enrollment',
              name: 'StudentEnrollmentManager',
              component: StudentEnrollmentManager,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },
            {
              path: '/manage/student/grades',
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
            {
              path: '/manage/user/privilege',
              name: 'StudentsReport',
              component: StudentsReport,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },
            {
              path: '/manage/user/privilege',
              name: 'StudentsReport',
              component: StudentsReport,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },
            {
              path: '/manage/student/requirements',
              name: 'RequirementsTesting',
              component: RequirementsTesting,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },
            {
              path: '/manage/user/privilege',
              name: 'UserPrivilegeManager',
              component: UserPrivilegeManager,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },

            {
              path: '/ActivityLogs',
              name: 'ActivityLogs',
              component: ActivityLogs,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },
          ]
        },
        {
          path: "login",
          component: AdminLogin,
          meta: {
            guest: true
          }

        }
      ]
    }
  ]
});
