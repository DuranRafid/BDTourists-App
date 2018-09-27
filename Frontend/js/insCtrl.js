var module = angular.module('myIonicApp.controllers');

module.controller('insCtrl', function($scope, $http,ApiEndpoint,sharePlaceInfo) {

    var arr = {};
    $scope.data = {};
     arr = sharePlaceInfo.getList();
     $scope.data.place = arr[0];
    
     $scope.hotels = [];
     $scope.hospitals = [];
     $scope.policeStations = [];

    
    var url = ApiEndpoint.url + 'institute/';
    $http.get(url,{params: { place: $scope.data.place.name }}).then(function successCallback(response){
        
        for(r=0;r<response.data.length;r++){
            var type = response.data[r].type;
            console.log(type);
            if(type=="hotel")
                {
                    console.log('here');
                    $scope.hotels.push(response.data[r]);
                }
            else if(type=="hospital")
                {
                    $scope.hospitals.push(response.data[r]);
                }
            else if(type=="policeStation")
                {
                    $scope.policeStations.push(response.data[r]);
                }
            
        }
    
    },function errorCallback(response){
            console.log("ERROR");
    });
    
   
   
});

