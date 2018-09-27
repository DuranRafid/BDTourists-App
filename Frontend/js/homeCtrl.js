var module = angular.module('myIonicApp.controllers');

module.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

module.controller('homeCtrl',function($scope,$http,$state,ApiEndpoint,shareDataService){
    //$scope.header = "Welcome to the galaxy's finest smugglers";
   // $scope.smuglers = shareDataService.getList();
    
	$scope.story = function(){
		$state.go('app.story');
	}
    
    $scope.view = function(){
		$state.go('app.view');
	}
    
    $scope.adds = function()
    {
        $state.go('app.adds');
    }
})
