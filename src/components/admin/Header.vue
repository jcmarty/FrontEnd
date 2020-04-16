<template>
<!-- top navigation -->
<div class="top_nav d-print-none">
  <div class="nav_menu">
    <b-navbar>
        <div class="nav toggle">
          <a id="menu_toggle" v-on:click="swapClass()"><i class="fa fa-bars"></i></a>
        </div>

        <b-navbar-brand href="admin">
          <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="responsive"/>
        </b-navbar-brand>
        
        <b-navbar-nav>
          <!--  TODO:  Replace firstname with full name or role? -->
          <b-nav-item-dropdown :text="user.first_name + ' ' + user.last_name" right>
            <b-dropdown-item href="#" v-on:click="logout()"><i class="fa fa-sign-out pull-right"></i> Log Out</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="logout()"><i class="fas fa-users-cog pull-right"></i>Account Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
  </div>
</div>

<!-- /top navigation -->
</template>
<script>
    export default {
        name: 'Header',
        data() {
            return {
              user: this.$store.getters.getUser
            }
        },
        methods: {
            logout(){
              this.$store.dispatch('logout');
            },
            //replaces jquery code for the collapsible sidebar menu
            swapClass(){
              const el = document.body;
              el.classList.toggle('nav-md');
              el.classList.toggle('nav-sm');
            }
        }
    }
</script>
