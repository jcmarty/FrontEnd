<template>

  <div>
      <div class="row tile_count">
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-user"></i>Total Irregular students</span>
          <div class="count">150</div>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-user"></i>Total Regular Students</span>
          <div class="count">150</div>

        </div>
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-user"></i>Total Drop Subjects</span>
          <div class="count">8</div>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-user"></i>Total Modular Subjects</span>
          <div class="count">12</div>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-user"></i>Failed Students</span>
          <div class="count">15</div>

        </div>
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-user"></i>INC Students</span>
          <div class="count">25</div>

        </div>
      </div>

      <!-- /top tiles -->
      <div class="row">
        <div class="col-md-8 col-sm-12 col-xs-12">
          <div class="dashboard_graph">
            <div class="row x_title">
              <div class="col-md-6">
                <h3>Total number of students</h3>
              </div>
            </div>
              <!--<canvas id="mybarChart" style="width: 500px; height: 149px;"></canvas>-->
              <bar-chart></bar-chart>
          </div>
        </div>
      </div>
  </div>

</div>
</template>
<script>
  import BarChart from '../BarChart.js';
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
