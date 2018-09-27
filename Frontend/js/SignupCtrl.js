var module = angular.module('myIonicApp.controllers');

module.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

module.controller('SignupCtrl',function($scope,$state,$ionicPopup,$http,ApiEndpoint,shareDataService){
    $scope.header = "Sign Up here";
    var empty = true;
    $scope.data = {};
    $scope.districts = [];
    var url_dis = ApiEndpoint.url + 'districts/';
    $http.get(url_dis).then(function successCallback(response){
        $scope.data = response.data;
        for(r=0;r<$scope.data.length;r++){
            console.log($scope.data[r].name);
            $scope.districts.push($scope.data[r].name);
        }
    },function errorCallback(response){
            console.log("ERROR");
    });
    $scope.signup = function()
	{
        title='';
        if($scope.data.firstname==null) {
            empty = false;
            title += 'Firstname';
        }
        if($scope.data.surname==null) {
            empty = false;
            title+=',';
            title += 'Surname';
        }
        if($scope.data.email==null) {
            empty = false;
            title+=',';
            title += 'Email';
        }
        if($scope.data.phone==null) {
            empty = false;
            title+=',';
            title += 'Phone';
        }
        if($scope.data.password==null) {
            empty = false;
            title+=',';
            title += 'Password';
        }
        if($scope.data.city==null) {
            empty = false;
            title+=',';
            title += 'city';
        }
        if($scope.data.sex==null) {
            empty = false;
            title+=',';
            title += 'Gender';
        }
        if(title!='') {
            title+=' are empty';
            $ionicPopup.alert({
               title: 'Required',
                template: title
            });
        }
        if(empty==true){
            var jsonreq = JSON.stringify({
                firstname:$scope.data.firstname,
                surname:$scope.data.surname,
                email:$scope.data.email,
                password:$scope.data.password,
                city:$scope.data.city,
                sex:$scope.data.sex,
                phoneno:$scope.data.phone
            });
            var url = ApiEndpoint.url+ 'register/';
            $http.post(url,jsonreq).then(function successCallback(response){
                 console.log(response.data);
                if(response.data=="Successful")
                    {
                        console.log($scope.data.sex);
                        shareDataService.addList($scope.data);
                        $state.go('app.home');
                    }
                else {
                    $scope.message = "User already exists";
                }

            },function errorCallback(response){
                console.log("ERROR");
            });
            
        }
	};
    
})