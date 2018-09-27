var module = angular.module('myIonicApp.controllers');

module.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

module.controller('ViewCtrl',function($scope,$http,$state,ApiEndpoint,sharePlaceInfo){
    //$scope.header = "Welcome to the galaxy's finest smugglers";
   // $scope.smuglers = shareDataService.getList();
    $scope.districts = [];
    $scope.places = [];
    $scope.data = {}; 
    
   // $scope.district = "All";
    //$scope.tag = "Any";
   
    
    var url_dis = ApiEndpoint.url + 'districts/';
    $http.get(url_dis).then(function successCallback(response){
        
        for(r=0;r<response.data.length;r++){
            console.log(response.data[r].name);
            $scope.districts.push(response.data[r].name);
        }
    },function errorCallback(response){
            console.log("ERROR");
    });
    
    var url_place = ApiEndpoint.url+ 'places/';
    
     $http.get(url_place).then(function successCallback(response){
          
        for(r=0;r<response.data.length;r++){
            console.log(response.data[r].image_url);
            $scope.places.push(response.data[r]);
            }
        },function errorCallback(response){
                console.log("ERROR");
    });
    
    $scope.changed = function()
    {
        $scope.places = [];
        
        if($scope.data.tag == undefined)
            {
                $scope.data.tag = "Any";
            }
        if($scope.data.district == undefined)
            {
                $scope.data.district = "All";
            }
        console.log($scope.data.tag);
        console.log($scope.data.district);
        var jsonreq = JSON.stringify({district:$scope.data.district,tag:$scope.data.tag});
        
         $http.post(url_place,jsonreq).then(function successCallback(response){
          
            for(r=0;r<response.data.length;r++){
                console.log(response.data[r].image_url);
                $scope.places.push(response.data[r]);
                }
            },function errorCallback(response){
                    console.log("ERROR");
            });
        
    }
    
    
    $scope.selected = function(place)
    {
        sharePlaceInfo.initlist();
        sharePlaceInfo.addList(place);
        $state.go('app.place');
    }
    
    
})

module.service('sharePlaceInfo', function() {
  var myList = [];

  var initlist = function(){
      myList = [];
  }
  var addList = function(newObj) {
      myList.push(newObj);
  }

  var setList = function(newObj){
      myList = newObj;
  }
  var getList = function(){
      return myList;
  }

  return {
    addList: addList,
    getList: getList,
    setList: setList,
    initlist: initlist
  };

});