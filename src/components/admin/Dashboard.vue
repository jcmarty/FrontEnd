<template>

  <div>
      <div class="row tile_count">

        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><center>Total Irregular students</center></span>
          <div class="count"><center>150</center></div>
        </div>

        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><center>Total Regular Students</center></span>
          <div class="count"><center>150</center></div>
        </div>

        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><center>Total Drop Subjects</center></span>
          <div class="count"><center>125</center></div>
        </div>

        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><center>Total Modular Subjects</center></span>
          <div class="count"><center>100</center></div>
        </div>

        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><center>Failed Students</center></span>
          <div class="count"><center>75</center></div>
        </div>

        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><center>INC Students</center></span>
          <div class="count"><center>50</center></div>
        </div>

      </div>

      <!-- /top tiles -->
      <div class="row">
        <div class="col-md-8 col-sm-12 col-xs-12">
          <div class="dashboard_graph">
            <div class="row x_title">
              <div class="col-md-6">
                <h3>Total number of students AY(2020-2021)</h3>
              </div>
            </div>
              <!-- <canvas id="mybarChart" style="width: 500px; height: 149px;"></canvas> -->
              <bar-chart></bar-chart>
          </div>
        </div>
      </div>
  </div>

</div>
</template>
<script>
  import BarChart from '../../BarChart.js';
  export default{
    components: {
      BarChart
    },
    data(){
      return{

      }
    }
  }


</script>
