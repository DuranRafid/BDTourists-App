var module = angular.module('myIonicApp.controllers');

module.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

module.controller('Viewmap', function($scope, $state,$http,ApiEndpoint, $cordovaGeolocation,MapPoint,sharePlaceInfo) {
    var options = {timeout: 10000, enableHighAccuracy: true};
    var map = null;
    var records = {};

    var longitude;
    var latitude;
       var arr = {};
    $scope.data = {};
     arr = sharePlaceInfo.getList();
     $scope.data.place = arr[0];
       
    console.log($scope.data.place);
       var pos = [];
       
     var url = ApiEndpoint.url + 'riskpoints/';
    $http.get(url,{params: { place: $scope.data.place.name }}).then(function successCallback(response){
        console.log(response.data);
        for(r=0;r<response.data.length;r++){
          
            pos.push(response.data[r]);
            console.log("Latitude from report "+pos[r].latitude);
            
            console.log("Longitude from report "+pos[r].longitude);
        }
        //$scope.lastarticleID = response.data.length;
    },function errorCallback(response){
            console.log("ERROR");
    });
    
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

  
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
       center: latLng,
       zoom: 6,
       mapTypeId: google.maps.MapTypeId.ROADMAP
    };


 
   map = new google.maps.Map(document.getElementById("map"), mapOptions);
       //console.log('isdjcsicj');
      
   google.maps.event.addListener(map,'idle', function(){
       
         var markerArray = [];
  

    for(x=0;x<pos.length;x++){
        var point = new google.maps.LatLng(pos[x].latitude, pos[x].longitude);
        console.log("Here"+ pos[x].latitude+" "+pos[x].longitude);
        var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: point,
              content: x}); 
        marker.setMap(map);
        var circle = new google.maps.Circle({
                     // map : map
                      center:point,
                      radius:120,
                      strokeColor:"#0000FF",
                      strokeOpacity:0.8,
                      strokeWeight:2,
                      fillColor:"#0000FF",
                      fillOpacity:0.4
                }); 
        circle.setMap(map); 
      
    } 
          console.log('map is loaded');
          console.log(position.coords.latitude + ' ' + position.coords.longitude);
        //Load the markers
     /*     var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: latLng
          });
        //  marker.setMap(map);
          var circle = new google.maps.Circle({
                     // map : map
                      center:latLng,
                      radius:120,
                      strokeColor:"#0000FF",
                      strokeOpacity:0.8,
                      strokeWeight:2,
                      fillColor:"#0000FF",
                      fillOpacity:0.4
                }); 
        //  circle.setMap(map);  */
    
    
       
    
   /* pos["Mohammadpur"]=[23.7658, 90.3584];
    pos["Dhanmondi"]=[23.7465, 90.3760];
    pos["Shahjahanpur"]=[23.7408, 90.4213];
    pos["Gulshan"]=[23.7925, 90.4078];
    pos["Mirpur"]=[23.8223, 90.3654]; */
   
      
    /*   google.maps.event.addListener(map, 'click', function (evt) {
                console.log('clicked in map');
                console.log(evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3)) ;
                latitude = evt.latLng.lat().toFixed(3);
                longitude = evt.latLng.lng().toFixed(3);
                records+=evt.latLng;
                console.log(records);
                var marker = new google.maps.Marker({
                      map: map,
                      animation: google.maps.Animation.DROP,
                      position: evt.latLng
                });
                marker.setMap(map);
             //   id=evt.latLng.lat().toFixed(3)+'_'+evt.latLng.lng().toFixed(3);
              //  markers[id]=marker;
              //  console.log(id);
                var circle = new google.maps.Circle({
                     // map : map
                      center: new google.maps.LatLng(evt.latLng.lat(),evt.latLng.lng()),
                      radius:80,
                      strokeColor:"#0000FF",
                      strokeOpacity:0.8,
                      strokeWeight:2,
                      fillColor:"#0000FF",
                      fillOpacity:0.4
                }); 
                circle.setMap(map);
          }); */

   })
 
 

 
  }, function(error){
    console.log("Could not get location");
  });


  
    $scope.take = function(){
        MapPoint.setPoint(latitude,longitude);
        $state.go('app.story');
    }

});


module.service('MapPoint', function() {
  var lat;
  var lon;

  var setPoint = function(i,j) {
      lat = i; lon = j;
  }

  var getPointlat = function(){
      return lat;
  }
   var getPointlon = function(){
      return lon;
  }
  return {
    setPoint: setPoint,
    getPointlat: getPointlat,
    getPointlon: getPointlon
  };

});
