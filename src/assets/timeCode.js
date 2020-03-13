var time_start = "08:00:00";
var split_start = time_start.split(":");
var hour_start = split_start[0];
var h = "";

var time_end = "17:00:00";
var split_end = time_end.split(":");
var hour_end = split_end[0];

var used = [
		{
        	start: "13:00:00",
        	end: "14:30:00",
        },
        {
        	start: "15:00:00",
        	end: "16:30:00",
        },
	];

var usedTime = [];
var free = [];
var ampm = "";
var converted = "";

this.UsedTimeConvert(used);

for (var i = hour_start; i <= hour_end; i++) {
	for (var j = 0; j < 2; j++) {
		this.timeConvert(j);
	}
}

var split_used_start = used[a].start.split(":");
// var hour_used_start = split_used_start[0];
var hour_used_start = parseInt(split_used_start[0] + 1);

var split_used_end = used[a].end.split(":");
// var hour_used_end = split_used_end[0];
var hour_used_end = parseInt(split_used_end[0] - 1);


function UsedTimeConvert(used){
   for (var a = 0; a <= used.length -1; a++) {
   		var split_used_start = used[a].start.split(":");
		var hour_used_start = split_used_start[0];

    	var split_used_end = used[a].end.split(":");
		var hour_used_end = split_used_end[0];
    	for (var b = hour_used_start; b <= hour_used_end; b++) {
			for (var j = 0; j < 2; j++) {
				if (j == 0){
					minutes_start = "00";
			  	h = b % 12 || 12;
			  	ampm = (b < 12 || b == 24) ? "AM" : "PM";
			   	converted = h + ":" +  minutes_start + ampm;
			   	usedTime.push(converted);
       	}else if(j == 1){
        	if(b == hour_used_end){

          }else{
          	minutes_start = "30";
				  	h = b % 12 || 12;
   				  ampm = (b < 12 || b == 24) ? "AM" : "PM";
            converted = h + ":" +  minutes_start + ampm;
   				  usedTime.push(converted);
          }
        }
			}
    }
	}
},


function timeConvert(j){
    	if (j == 0){
        	minutes_start = "00";
			  h = i % 12 || 12;
			  ampm = (i < 12 || i == 24) ? "AM" : "PM";
   			  //alert(converted = h + ":" +  minutes_start + ampm) ;
			  converted = h + ":" +  minutes_start + ampm;
			  this.checkUsedTime(converted);
        }
        else if(j == 1){
        	if(i == hour_end){
            }else{
            	minutes_start = "30";
				   h = i % 12 || 12;
   				   ampm = (i < 12 || i == 24) ? "AM" : "PM";
   				   //alert(converted = h + ":" +  minutes_start + ampm) ;
                   converted = h + ":" +  minutes_start + ampm;
   				   this.checkUsedTime(converted);
            }
        }
}

function checkUsedTime(data) {
  for (var i = 0; i <= usedTime.length; i++) {
  	if (usedTime[i] == data){
    	return
    }
  }
  free.push(data);
}
console.log(free)
