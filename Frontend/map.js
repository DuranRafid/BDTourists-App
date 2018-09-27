// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var module = angular.module('myIonicApp.controllers', ['ionic', 'ngCordova']);



module.factory('GoogleMaps', function($cordovaGeolocation){

  var apiKey = false;
  var map = null;
    var records={};
    var markers = {};
    var id;
    var currentId = 0;

  function initMap(){

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){
          console.log('map is loaded');
          console.log(position.coords.latitude + ' ' + position.coords.longitude);
        //Load the markers
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: latLng
          });
          marker.setMap(map);
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
          circle.setMap(map);
       //   console.log('aascas');
          google.maps.event.addListener(map, 'click', function (evt) {
                console.log('clicked in map');
                console.log(evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3)) ;
                records+=evt.latLng;
                console.log(records);
                var marker = new google.maps.Marker({
                      map: map,
                      animation: google.maps.Animation.DROP,
                      position: evt.latLng
                });
                marker.setMap(map);
                id=evt.latLng.lat().toFixed(3)+'_'+evt.latLng.lng().toFixed(3);
                markers[id]=marker;
                console.log(id);
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
          });
          google.maps.event.addListener(marker, "click", function (evt) { 
              id = marker.getPosition().lat()+'_'+markr.getPosition().lng();
              console.log('Clicked in marker'+id);
              delMarker(id); 
          });


      });

    }, function(error){
      console.log("Could not get location");

    
    });

  }
  
    var uniqueId = function() {
        return ++currentId;
    }
  var delMarker = function (id) {
     marker = markers[id]; 
     marker.setMap(null);
  }

  function addInfoWindow(marker, message, record) {

      var infoWindow = new google.maps.InfoWindow({
          content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
      
  }

  return {
    init: function(){
      initMap();
    }
  }

});

module.controller('map', function($scope, $state, $cordovaGeolocation,GoogleMaps) {
        GoogleMaps.init();
});
