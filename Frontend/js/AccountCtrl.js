var module = angular.module('myIonicApp.controllers');

module.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

module.controller('AccountCtrl',function($scope,$http,$state,ApiEndpoint,shareDataService){
    //$scope.header = "Welcome to the galaxy's finest smugglers";
   // $scope.smuglers = shareDataService.getList();
     var arr = {};
    $scope.data = {};
     arr = shareDataService.getList();
     $scope.data = arr[0];
     console.log($scope.data.firstname);
	
})
