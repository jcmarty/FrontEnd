import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import Axios from "axios";

const baseUrl = "http://localhost/api/v1/";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    systemTitle : "Registration System",
    authenticated: false,
    user: null,
    token: null,
    settings: {
      user_activities: []
    },
    academic_years : [],
    current_academic_year : null,
    semesters : [],
    current_semester : null,
    courses: [],
    rooms: [],
  },
  mutations: {
    setAppSettings(state, payload){
      state.settings = payload;
    },

    setAuthenticated(state, payload) {
      state.authenticated = payload;
    },

    setUser(state, payload){
      state.user = payload;
    },

    setToken(state, payload){
      state.token = payload;
    },

    setCurrentAcademicYear(state, payload){
      state.current_academic_year = payload;
    },

    setCurrentSemester(state, payload){
      state.current_semester = payload;
    },

    setAcademicYears(state, payload){
      state.academic_years = payload;
      // searchs the current academic year and pass it to current ay variable
      var current_ay = state.academic_years.find(academic_year => academic_year.id == state.settings.current_ay);
      // pass the current AY
      state.current_academic_year = {
        id : current_ay.id,
        academic_year : current_ay.academic_year
      };
    },

    setSemesters(state, payload){
      state.semesters = payload;
      // searchs the current semester and pass it to current sem variable
      var current_sem = state.semesters.find(semester => semester.id == state.settings.current_sem);
      // pass the current semester
      state.current_semester = {
        id : current_sem.id,
        semester : current_sem.semester
      };
    },

    setCourses(state, payload){
      var courses = []
      for (var i = 0; i < payload.length; i++) {
        if (payload[i].active == 1) {
          courses.push(
            {
              value: {
                id: payload[i].id,
                year: payload[i].year_duration,
                course_code: payload[i].course_code,
                curriculum: payload[i].curriculum
              },
              text: payload[i].course_code + " - " + payload[i].course_desc
            },
          );
        }
      }
      state.courses = courses;
    }, // end of setCourses

    setRooms(state, payload){
      state.rooms = payload;
    }, // end of setRooms
  },

  actions: {
    //TODO: Move login / api request code here?
    logout(context){
      localStorage.removeItem("ccbc_token");
      context.commit('setAuthenticated', false);
      context.commit('setUser', null);
      context.commit('setToken', null);
      // context.commit('setAcademicYears', []);
      // context.commit('setSemesters', null);
      // context.commit('setCourses', null);
      // context.commit('setRooms', null);

      // from this
      // router.replace("/login");
      // to this
      router.replace("/admin/login");
    },
    setAuthenticated(context, payload){
      context.commit('setAuthenticated', payload);
    },
    setUser(context, payload){
      context.commit('setUser', payload);
    },
    setToken(context, payload){
      context.commit('setToken', payload);
    },
    setAppSettings(context, payload){
      context.commit('setAppSettings', payload);
    },

    loadCurrentAcademicYear(context, payload){
      context.commit('setCurrentAcademicYear', payload);
    },

    loadCurrentSemester(context, payload){
      context.commit('setCurrentSemester', payload);
    },

    // get all academic year
    loadAcademicYears(context, token){
      if (token != null) {
        Axios
          .get(baseUrl + "academic_years", {
            headers: {'Authorization': 'Bearer ' + token}
          })
          .then(response => {
            let payload = response.data
            context.commit('setAcademicYears', payload);
          })
          .catch(error => {
            console.log(error)
          })
      }
    }, // end of loadAcademicYears

    // get all semester
    loadSemesters(context, token){
      if (token != null) {
        Axios
          .get(baseUrl + "semesters", {
            headers: {'Authorization': 'Bearer ' + token}
          })
          .then(response => {
            let payload = response.data
            context.commit('setSemesters', payload);
          })
          .catch(error => {
            console.log(error)
          })
      }
    }, // end of loadSemesters

    // get all courses
    loadCourses(context, token){
      if (token != null) {
        Axios
          .get(baseUrl + "courses", {
            headers: {'Authorization': 'Bearer ' + token}
          })
          .then(response => {
            let payload = response.data
            context.commit('setCourses', payload);
          })
          .catch(error => {
            console.log(error)
          })
      }
    }, // end of loadCourses

    // get all rooms
    loadRooms(context, token){
      if (token != null) {
        Axios
          .get(baseUrl + "rooms", {
            headers: {'Authorization': 'Bearer ' + token}
          })
          .then(response => {
            let payload = response.data
            context.commit('setRooms', payload);
          })
          .catch(error => {
            console.log(error)
          })
      }
    }, // end of loadRooms

  },
  getters: {
    getSettings(state){
      return state.settings;
    },
    isAuthenticated(state){
      return state.authenticated;
    },
    getUser(state){
      return state.user;
    },
    getToken(state){
      return state.token;
    },
    getAcademicYears(state){
      return state.academic_years;
    },
    getCurrentAcademicYear(state){
      return state.current_academic_year;
    },
    getSemesters(state){
      return state.semesters;
    },
    getCurrentSemester(state){
      return state.current_semester;
    },
    getCourses(state){
      return state.courses;
    },
    getRooms(state){
      return state.rooms;
    },
  }
});
