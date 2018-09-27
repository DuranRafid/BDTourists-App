var module = angular.module('myIonicApp.controllers');

module.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])



module.controller('StoryShareCtrl',function($scope,$http,$state, $ionicPopup, ApiEndpoint,shareDataService,MapPoint){

      var arr = {};
    $scope.data = {};

     arr = shareDataService.getList();
     var useremail = arr[0].email;
     console.log(useremail);
    $scope.districts = [];
    $scope.places = [];
   
	 $scope.storytypes=[{
            value: 'aesthetic',
            label: 'Aesthetic'
        }, {
            value: 'report',
            label: 'Report'
        },{
            value: 'journey',
            label: 'Journey'
        }]; 
    
    var url_dis = ApiEndpoint.url + 'districts/';
    $http.get(url_dis).then(function successCallback(response){
       // $scope.data = response.data;
        for(r=0;r<response.data.length;r++){
         //  console.log($scope.data[r].name);
            $scope.districts.push(response.data[r].name);
        }
    },function errorCallback(response){
            console.log("ERROR");
    });
    
    $scope.changed = function()
    {
        $scope.places = [];
        var jsonreq = JSON.stringify({district:$scope.data.district,tag:"Any"});
        var url_place = ApiEndpoint.url+ 'places/';
         $http.post(url_place,jsonreq).then(function successCallback(response){
           // $scope.data = response.data;
            for(r=0;r<response.data.length;r++){
               // console.log($scope.data[r].name);
                $scope.places.push(response.data[r].name);
                }
            },function errorCallback(response){
                    console.log("ERROR");
            });   
    }
    
    $scope.openMap = function()
    {
        $state.go('app.point-map');
    }
    $scope.share = function()
    {
        var type = $scope.data.storytype;
        console.log(type);
        if(type=='report')
        {
            var longitude = MapPoint.getPointlon();
            var latitude = MapPoint.getPointlat();
            console.log(longitude);
            console.log(latitude);
            console.log($scope.data.reason);
            var jsonreq = JSON.stringify({email:useremail,place:$scope.data.place,reason:$scope.data.reason,accident_type:$scope.data.accident,longitude:longitude,latitude:latitude,story:$scope.data.story});
            var url_report = ApiEndpoint.url+ 'report/'; 
              $http.post(url_report,jsonreq).then(function successCallback(response){
                    console.log(response.data);
            },function errorCallback(response){
                    console.log("ERROR");
            }); 
        }
        else if(type=='journey')
        {
            console.log(useremail);
            var jsonreq = JSON.stringify({email:useremail,place:$scope.data.place,cost:$scope.data.cost,duration:$scope.data.duration,
                                         story:$scope.data.story});
            
            console.log(jsonreq);
            var url_journey = ApiEndpoint.url + 'journey/';
            
            $http.post(url_journey,jsonreq).then(function successCallback(response){
                    console.log(response.data);
            },function errorCallback(response){
                    console.log("ERROR");
            }); 
        }
        else if(type=='aesthetic')
        {
            var url_aesthetic = ApiEndpoint.url + 'aesthetic/';
            var jsonreq = JSON.stringify({email:useremail,place:$scope.data.place,story:$scope.data.story,image:$scope.image});
            
            $http.post(url_aesthetic,jsonreq).then(function successCallback(response){
                    console.log(response.data);
            },function errorCallback(response){
                    console.log("ERROR");
            }); 
         
        }
         $ionicPopup.alert({
               //title: 'Required',
                template: 'Your Story is recorded successfully'
            });
        $state.go('app.home');
    }
    
    
    
    
    
    $scope.setFile = function(element) {
      $scope.currentFile = element.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
          
          var base64Image = event.target.result;
          
        
           $scope.image = base64Image;//.replace(/data:image\/jpeg;base64,/g, '');

        $scope.$apply();
      }
      // when the file is read it triggers the onload event above.
      reader.readAsDataURL(element.files[0]);
}
    
})