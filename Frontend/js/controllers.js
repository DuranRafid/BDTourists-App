angular.module('myIonicApp.controllers', [])

.controller('AppCtrl', function($scope,$state,$ionicModal, $timeout) {
    
    $scope.LogOut = function(){

		$state.go('init.login');
	}
    $scope.GoToAccount = function()
    {
        console.log("Here");
        $state.go('app.account');
    }
})
