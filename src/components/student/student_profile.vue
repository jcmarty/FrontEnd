<template lang="html">
  <div>
    <!-- page title -->
    <div class="dash_page_title">
      Profile
      <hr />
    </div>
    <!-- page title -->

    <!-- page content -->
    <div class="dash_profile_container">
      <!-- left content -->
      <div class="left_profile">
        <center>
          <img class="profile_image" src="https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png" alt=""/>
          <h6 class="mb-2">John Christopher L. Marty</h6>
          <p class="mb-4">myEmail@yahoo.com</p>
        </center>
        <div class="dash_recent_info">
          <p class="mb-3">Course <span>BSIT</span></p>
          <p class="mb-3">Year Level <span>1st Year</span></p>
          <p class="mb-3">Block <span>BLK-1</span></p>
          <p class="mb-3">Semester <span>1st Sem</span></p>
        </div>
      </div>
      <!-- left content -->

      <!-- right content -->
      <div class="right_profile">
        <b-tabs content-class="mt-3">

          <b-tab  active>
            <template slot="title">
                <span class="dash_tab_title">Personal Info</span>
            </template>

          </b-tab>

          <b-tab>
            <template slot="title">
                <span class="dash_tab_title">Guardian Info</span>
            </template>
            <p>I'm the second tab</p>
          </b-tab>

          <b-tab>
            <template slot="title">
                <span class="dash_tab_title">School Info</span>
            </template>
            <p>I'm a disabled tab!</p>
          </b-tab>

        </b-tabs>
      </div>
      <!-- right content -->

    </div>
    <!-- page content -->

  </div>
</template>

<script>
export default {
  name: 'StudentProfile',

  data() {
    return {

    }
  }, // End of Data
}
</script>

<style lang="css" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .dash_tab_title{
    text-transform: capitalize;
  }

  .dash_profile_container{
    display: flex;
    justify-content: space-between;
  }

  .right_profile{
    width: calc(100vw - 220px - 230px - 60px);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
    padding: 20px;
    height: auto;
    float: right;
  }

  .right_profile b-tabs{
    color: red;
  }

  .dash_recent_info p span{
    float: right;
    color: #1b56f3;
    font-weight: 900;
    font-family: "Calibri";
    font-size: 14pt;
    line-height: 1;
  }

  .dash_recent_info p{
    font-weight: bold;
    font-size: 11pt;
  }

  .dash_page_title{
    font-size: 17pt;
    font-weight: bold;
    padding: 0;
    margin-bottom: 20px;
  }

  .left_profile{
    width: 230px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
    padding: 20px;
    min-height: calc(100vh - 55px - 45px - 100px);
    /* height: 100vh; */
    margin-right: 20px;
    float: left;
  }

  .left_profile h6{
    text-transform: uppercase;
  }

  .left_profile .profile_image{
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-bottom: 20px;
    margin-top: 10px;
  }



</style>
