import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import Axios from "axios";

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
    // Academic Year Array of Object
    academic_years : [],
    // Semester Array of Object
    semesters : [],
    // Courses Array of Object
    courses: [],
    // Rooms Array of Object
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

    setAcademicYears(state, payload){
      state.academic_years = payload;
    },

    setSemesters(state, payload){
      state.semesters = payload;
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
              text: payload[i].course_code
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
    setAcademicYears(context, payload){
      context.commit('setAcademicYears', payload);
    },
    setSemesters(context, payload){
      context.commit('setSemesters', payload);
    },
    setCourses(context, payload){
      context.commit('setCourses', payload);
    },
    setRooms(context, payload){
      context.commit('setRooms', payload);
    },
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
    getSemesters(state){
      return state.semesters;
    },
    getCourses(state){
      return state.courses;
    },
    getRooms(state){
      return state.rooms;
    },
  }
});
