<template>
  <div class="Stud_nav">
    <b-navbar toggleable="lg" class="StudentNav">
      <!-- <b-navbar-brand href="#">COMTEQ</b-navbar-brand> -->
      <!-- <div class="logo_container">
        <b-img src="../../public/logo.jfif" fluclass alt="Responsive image"></b-img>
      </div> -->

<!--june 16, 2020-->
      <b-navbar-toggle class="text-body" target="nav-collapse"></b-navbar-toggle>

      <b-collapse class="Stud_nav-collapse" is-nav>
        <b-navbar-nav class="Stud_navbar_nav">
          <b-nav-item class="Stud_nav_item" to="/">Home</b-nav-item>
          <b-nav-item class="Stud_nav_item Stud_dropdown">
            Programs
            <div class="Stud_dropdown-content">
              <router-link to="/ProgramCollege"><a href="#" >College</a></router-link>
              </br>
              <router-link to="/ProgramSHS"><a href="#" >Senior High</a></router-link>
            </div>
          </b-nav-item>

          <b-nav-item class="Stud_nav_item Stud_dropdown" href="#" >
            Admissions
            <div class="Stud_dropdown-content">
              <router-link to="/AdmissionCollege"><a href="#" >College</a></router-link>
              </br>
              <router-link to="/AdmissionSHS"><a href="#" >Senior High</a></router-link>
            </div>
          </b-nav-item>

          <b-nav-item class="Stud_nav_item" href="#" to="/Register">Register</b-nav-item>
          <b-nav-item class="Stud_nav_item" href="#" to="/About">About</b-nav-item>
          <b-nav-item id="Stud_login" class="Stud_nav_item" href="#" to="/Login">Login</b-nav-item>
        </b-navbar-nav>


        <!-- Right aligned nav items -->
        <!-- end of  ml-auto -->
      </b-collapse>
    </b-navbar>
  </div>
  <!-- end of class container -->
</template>




<script>
    export default {
        name: 'Header',
        data() {
            return {
            }
        },
        methods: {

            },

        }
</script>
