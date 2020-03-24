import { Bar } from 'vue-chartjs';
import Axios from "axios";
var d = new Date();
var n = d.getFullYear();

export default{
  extends: Bar,

  data(){
      return{

        items: [],

        chartdata: {
          labels: ["ACT", "BSIT", "BSCS", "HUMS"],
					datasets: [{
					  label: n + " 1st Semester",
					  backgroundColor: "rgb(255, 9, 6)",
					  borderColor: "rgba(38, 185, 154, 0.7)",
					  pointBorderColor: "rgba(38, 185, 154, 0.7)",
					  pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(220,220,220,1)",
					  pointBorderWidth: 1,
					  data: [100, 50, 25, 70],
					},
          {
					  label: n + " 2nd Semester",
					  backgroundColor: "rgb(27, 86, 243)",
					  borderColor: "rgba(38, 185, 154, 0.7)",
					  pointBorderColor: "rgba(38, 185, 154, 0.7)",
					  pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
					  pointHoverBackgroundColor: "#fff",
					  pointHoverBorderColor: "rgba(220,220,220,1)",
					  pointBorderWidth: 1,
					  data: [50, 100, 75, 20],
					}]
        },
        options: {

          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
        }
      }
  },
  mounted(){
    this.renderChart(this.chartdata, this.options);
  },

  methods:{

  }
}
