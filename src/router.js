// Start of Admin Routes
import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
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
import StudentPreRegistrationManager from "./components/admin/StudentPreRegistrationManager.vue";
import StudentEnrollmentManager from "./components/admin/StudentEnrollmentManager.vue";
import StudentGradesManager from "./components/admin/StudentGradesManager.vue";
import PreRegisterStudentInfoManager from "./components/admin/PreRegisteredInformationManager.vue";
import UserPrivilegeManager from "./components/admin/UserPrivilegeManager.vue";
import ActivityLogs from "./components/admin/ActivityLogs.vue";
import ResetPassword from "./components/admin/ResetPassword.vue";
import StudentSubjectManager from "./components/admin/StudentSubjectManager.vue";
import StudentInformationManager from "./components/admin/StudentInformationManager.vue";
import InstructorInformationManager from "./components/admin/InstructorInformationManager.vue";
import StudentPerSubjectReport from "./components/admin/StudentPerSubjectReport.vue";
import StudentReport from "./components/admin/StudentReport.vue";
import AlumniReport from "./components/admin/AlumniReports.vue";
// for testing only
import RequirementsTesting from "./components/admin/RequirementsTesting.vue";
// End of Admin Routes

// Start of  Student routes
import Home from "./views/student/Home.vue";
import Register from "./views/student/Register.vue";
import OnlineRegHome from "./components/onlineRegistration/OnlineRegHome.vue";
import OnlineRegAbout from "./components/onlineRegistration/OnlineRegAbout.vue";
import OnlineRegAchievements from "./components/onlineRegistration/OnlineRegAchievements.vue";
import OnlineRegAdmissionCollege from "./components/onlineRegistration/OnlineRegAdmissionCollege.vue";
import OnlineRegAdmissionSHS from "./components/onlineRegistration/OnlineRegAdmissionCollege.vue";
import OnlineRegCollegeEnrollment from "./components/onlineRegistration/OnlineRegCollegeEnrollment.vue";
import OnlineRegCourse from "./components/onlineRegistration/OnlineRegCourse.vue";
import OnlineRegEvents from "./components/onlineRegistration/OnlineRegEvents.vue";
import OnlineRegProgramCollege from "./components/onlineRegistration/OnlineRegProgramCollege.vue";
import OnlineRegProgramSHS from "./components/onlineRegistration/OnlineRegProgramSHS.vue";
import OnlineRegRegister from "./components/onlineRegistration/OnlineRegRegister.vue";
import OnlineRegRequirement from "./components/onlineRegistration/OnlineRegRequirement.vue";
import OnlineRegVisionMission from "./components/onlineRegistration/OnlineRegVisionMission.vue";

// End Of Student routes

//  Start of Student Dashboard
import StudentDashboard from "./views/student/StudentPanel.vue";
import StudentProfile from './components/student/student_profile.vue';
import StudentAccountSetting from './components/student/student_account_setting.vue';
//  End of Student Dashboard


Vue.use(Router);

/*NOTE: the meta inside each route is useless for now.
we might need this if we use a third party authentication library
or used a middleware*/
export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/dashboard",
      name: "StudentDashboard",
      component: StudentDashboard,
      meta: {
        guest: true
      },
      children: [
        {
          path: "/dashboard/student/profile",
          name: "StudentProfile",
          component: StudentProfile,
          meta: {
            guest: true
          }
        },
        {
          path: "/dashboard/student/account_setting",
          name: "StudentAccountSetting",
          component: StudentAccountSetting,
          meta: {
            guest: true
          }
        },

      ]
    },

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
          name: "OnlineRegHome",
          component: OnlineRegHome,
          meta: {
            guest: true
          }
        },
        {
          path: "About",
          name: "OnlineRegAbout",
          component: OnlineRegAbout,
          meta: {
            guest: true
          }
        },
        {
          path: "Achievements",
          name: "OnlineRegAchievements",
          component: OnlineRegAchievements,
          meta: {
            guest: true
          }
        },
        {
          path: "AdmissionCollege",
          name: "OnlineRegAdmissionCollege",
          component: OnlineRegAdmissionCollege,
          meta: {
            guest: true
          }
        },
        {
          path: "AdmissionSHS",
          name: "OnlineRegAdmissionSHS",
          component: OnlineRegAdmissionSHS,
          meta: {
            guest: true
          }
        },
        {
          path: "CollegeEnrollment",
          name: "OnlineRegCollegeEnrollment",
          component: OnlineRegCollegeEnrollment,
          meta: {
            guest: true
          }
        },
        {
          path: "Course",
          name: "OnlineRegCourse",
          component: OnlineRegCourse,
          meta: {
            guest: true
          }
        },
        {
          path: "Events",
          name: "OnlineRegEvents",
          component: OnlineRegEvents,
          meta: {
            guest: true
          }
        },
        {
          path: "ProgramCollege",
          name: "OnlineRegProgramCollege",
          component: OnlineRegProgramCollege,
          meta: {
            guest: true
          }
        },
        {
          path: "ProgramSHS",
          name: "OnlineRegProgramSHS",
          component: OnlineRegProgramSHS,
          meta: {
            guest: true
          }
        },
        {
          path: "Register",
          name: "OnlineRegRegister",
          component: OnlineRegRegister,
          meta: {
            guest: true
          }
        },
        {
          path: "Requirements",
          name: "OnlineRegRequirement",
          component: OnlineRegRequirement,
          meta: {
            guest: true
          }
        },
        {
          path: "VisionMission",
          name: "OnlineRegVisionMission",
          component: OnlineRegVisionMission,
          meta: {
            guest: true
          }
        },
        {
          path: "student/dashboard",
          component: StudentDashboard,
          meta: {
            guest: true
          }
        }
      ]
    },
    // End of Student Routes

    // Start of Admin routes
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
              path: '/view/instructor_schedule/',
              name: 'StudentPerSubjectReport',
              component: StudentPerSubjectReport,
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
              path: '/manage/student/preregistration',
              name: 'StudentPreRegistrationManager',
              component: StudentPreRegistrationManager,
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
              path: '/reports/student',
              name: 'StudentReport',
              component: StudentReport,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },

            {
              path: '/reports/Graduates',
              name: 'AlumniReport',
              component: AlumniReport,
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
              path: '/ActivityLogs',
              name: 'ActivityLogs',
              component: ActivityLogs,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },

            {
              path: '/StudentSubjectManager',
              name: 'StudentSubjectManager',
              component: StudentSubjectManager,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },

            {
              path: '/StudentInformationManager',
              name: 'StudentInformationManager',
              component: StudentInformationManager,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },

            {
              path: '/PreRegisterStudentInfoManager',
              name: 'PreRegisterStudentInfoManager',
              component: PreRegisterStudentInfoManager,
              beforeEnter(to, from, next){
                setTimeout(() => next(), 2000);
              },
            },

            {
              path: '/InstructorInformationManager',
              name: 'InstructorInformationManager',
              component: InstructorInformationManager,
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

        },

        {
          path: '/reset_password',
          name: 'ResetPassword',
          component: ResetPassword,
          beforeEnter(to, from, next){
            setTimeout(() => next(), 1000);
          },
        },

      ]
    }
  ]
});
