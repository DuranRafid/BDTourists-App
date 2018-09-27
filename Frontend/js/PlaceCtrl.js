var module = angular.module('myIonicApp.controllers');

module.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

module.controller('PlaceCtrl',function($scope,$http,$state,$ionicPopup,ApiEndpoint,sharePlaceInfo,shareDataService){
    //$scope.header = "Welcome to the galaxy's finest smugglers";
   // $scope.smuglers = shareDataService.getList();
     var arr = {};
    $scope.data = {};
     arr = sharePlaceInfo.getList();
     $scope.data.place = arr[0];
    
     var userarr = {};
     userarr = shareDataService.getList();
     $scope.data.user = userarr[0].email;
     console.log($scope.data.user);
    
    var jsonreq_rate = JSON.stringify({place:$scope.data.place.name,email:$scope.data.user});
      var url_rate = ApiEndpoint.url+ 'placerating/';
            $http.post(url_rate,jsonreq_rate).then(function successCallback(response){
                
                 console.log(response.data[0])
                $scope.data.userrate = response.data[0].rate;
                if($scope.data.userrate >= 1) $scope.data.rating = $scope.data.userrate;
                console.log($scope.data.userrate);
            
            },function errorCallback(response){
                console.log("ERROR");
            }); 
    
     $scope.rate = function()
    {
         console.log($scope.data.rating);
          var jsonreq = JSON.stringify({place:$scope.data.place.name,email:$scope.data.user,rating:$scope.data.rating});
      var url = ApiEndpoint.url+ 'rating/';
            $http.post(url,jsonreq).then(function successCallback(response){
                 console.log(response.data);
            
            },function errorCallback(response){
                console.log("ERROR");
            });
        $ionicPopup.alert({
               //title: 'Required',
                template: 'You have rated this place '+$scope.data.rating +' out of 5'
            });
    }
     
     $scope.viewStory = function()
     {
         $state.go('app.story-read');
     }
     
     $scope.viewInstitutes = function()
     {
         $state.go('app.institutes');
     }
     
     $scope.viewMap = function()
     {
        $state.go('app.view-map'); 
     }
})