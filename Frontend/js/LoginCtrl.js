var module = angular.module('myIonicApp.controllers');

module.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

module.controller('LoginCtrl',function($scope,$state,$http,ApiEndpoint,$ionicPopup,shareDataService){
    $scope.data = {};
    $scope.login = function()
	{
         var empty = true;
        title='';
        if($scope.data.username==null) {
            empty = false;
            title += 'Email';
        }
        if($scope.data.password==null) {
            empty = false;
            title+=',';
            title += 'Password';
        }
        
        if(title!='') {
            title+=' are empty';
            $ionicPopup.alert({
               title: 'Required',
                template: title
            });
        }
        if(empty==true){
            var jsonreq = JSON.stringify({email:$scope.data.username,password:$scope.data.password});
            var url = ApiEndpoint.url+ 'login/';
            $http.post(url,jsonreq).then(function successCallback(response){
                   // console.log(response.data)
                    if(response.data=="Wrong")
                        {
                            $scope.message = "Wrong Username or password! Try again carefully!";
                            
                        }
                    else {
                       
                        $scope.data = response.data;
                        shareDataService.addList($scope.data[0]);
                        console.log($scope.data[0].firstname);
                         $state.go('app.home');
                    }
            },function errorCallback(response){
                console.log("ERROR");
            });
            
        }
	};
    
    $scope.account = function()
    {
        $state.go('init.signup');
        
    }
    
})

module.service('shareDataService', function() {
  var myList = [];

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
    setList: setList
  };

});
