//----AUDIO-----
var audio = document.getElementById('audio');

    $('#play').click(function(){
        audio.play();       
    });

   $('#pause').click(function(){
        audio.pause();  
    });

//-------Location------
   
//---Current----
var mapProp={
    zoom:5,
    mapTypeId:'roadmap'
};


    
//var map1=new google.maps.Map($('#map1')[0], mapProp);
var map1=new google.maps.Map(
  document.getElementById("map1"),mapProp);
var markers = [];
if(navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map1,
        position: pos,
        //content: 'Location found using HTML5.'
 });
    map1.setCenter(pos);
        
        
        var marker=new google.maps.Marker({
  position:pos,
  });

marker.setMap(map1);

    }, function() {
      handleNoGeolocation(true);
    });
  
  }


//----direction----
var button = document.getElementById('button');
//var str = $( "#from" ).text();
//var b= $("#to").text();

var directionDisplay;
var directionsService = new google.maps.DirectionsService();     //Create a DirectionsService object which is required to communicate with the Google Maps API Direction Service
var map2;
$('#button').click(function(){
    
    directionsDisplay = new google.maps.DirectionsRenderer();        //Create a DirectionsRenderer object to render the directions results
    var center = new google.maps.LatLng(0, 0);    //Map is centered at 0,0
    var myOptions =
    {
            zoom:7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center
    }
    map2 = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map2);
    var start = $( "#from" ).val();     //Set the source/ origin
    var end = $( "#to" ).val();  //Set the destination
    var request =
    {
            origin:start,
        destination:end,
            travelMode: google.maps.DirectionsTravelMode.WALKING          //Current travel mode is DRIVING. You can change to BICYCLING or WALKING and see the changes.
    };
    directionsService.route(request, function(response, status)
    {
            if (status == google.maps.DirectionsStatus.OK) //Check if request is successful.
            {
            directionsDisplay.setDirections(response);         //Display the directions result
            }
    });
});

//------Weather--------------


var button1 = document.getElementById('button1');



    $('#button1').click(function(){
        var returnMsg;
var state=$( "#state" ).val();
var city=$( "#city" ).val();
        $(document).ready(function() {
 $.ajax({
       
        url: 'http://api.wunderground.com/api/36b799dc821d5836/conditions/q/'+state+'/'+city+'.json',
        async: false,
        contentType: "application/json",
        dataType: 'jsonp'
       
    }).then(function(data) {
     
     $.each(data, function(idx, obj) {
	 returnMsg = "'"+city+"'"+" Temperature is " +obj.temp_f + "    weather is " + obj.weather;
         
         document.getElementById('write').innerHTML = returnMsg;
});
    });

    });  
               
});

    

    

button.addEventListener('click', onClick, false);
button1.addEventListener('click', onClick, false);