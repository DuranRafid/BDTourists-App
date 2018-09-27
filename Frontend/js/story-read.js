var module = angular.module('myIonicApp.controllers');

module.controller('story-read', function($scope, $http,ApiEndpoint,sharePlaceInfo,shareDataService) {
    $scope.story = [];
  $scope.story.journey = [];
  $scope.story.report = [];
    $scope.story.aesthetic = [];
    
     
    
    var arr = {};
    $scope.data = {};
     arr = sharePlaceInfo.getList();
     $scope.data.place = arr[0];
    
     var userarr = {};
     userarr = shareDataService.getList();
     $scope.data.user = userarr[0].email;
     console.log($scope.data.user);
    
   

    var likeArray = [];
    var dislikeArray = [];
    var url_likes = ApiEndpoint.url + 'likes/';
  
    $http.get(url_likes,{params: { place: $scope.data.place.name ,email: $scope.data.user}}).then(function successCallback(response){
        console.log("Here in likes");
        for(r=0;r<response.data.length;r++){
            var id = response.data[r].story_id;
            var type = response.data[r].type;
           // console.log("story id"+ id+" type:"+type);
            if(type=="like") likeArray.push(id);
            else dislikeArray.push(id);
        }
        console.log("LikeArray "+likeArray.toString());
        console.log("DisLikeArray "+dislikeArray.toString());
    },function errorCallback(response){
            console.log("ERROR");
    });
    
    
   
    
    
    
    var url_journey = ApiEndpoint.url + 'journey/';
    //var jsonreq = JSON.stringify({place:$scope.data.place.name});
    $http.get(url_journey,{params: { place: $scope.data.place.name }}).then(function successCallback(response){
        console.log(response.data);
        for(r=0;r<response.data.length;r++){
            console.log(Date.parse(response.data[r].time));
            $scope.story.journey.push(response.data[r]);
        }
      //  $scope.lastarticleID = response.data.length;
    },function errorCallback(response){
            console.log("ERROR");
    });
    
    var url_report = ApiEndpoint.url + 'report/';
    $http.get(url_report,{params: { place: $scope.data.place.name }}).then(function successCallback(response){
        console.log(response.data);
        for(r=0;r<response.data.length;r++){
           
            $scope.story.report.push(response.data[r]);
        }
        //$scope.lastarticleID = response.data.length;
    },function errorCallback(response){
            console.log("ERROR");
    });
    
    var url_aesthetic = ApiEndpoint.url + 'aesthetic/';
    $http.get(url_aesthetic, {params: { place: $scope.data.place.name }}).then(function successCallback(response){
        console.log(response.data);
        for(r=0;r<response.data.length;r++){
           
            $scope.story.aesthetic.push(response.data[r]);
        }
        //$scope.lastarticleID = response.data.length;
    },function errorCallback(response){
            console.log("ERROR");
    });
    
     $scope.isLiked = function(a)
    {
        
        if(likeArray.indexOf(a)!=-1)
            {
                console.log(a);
                console.log("is liked");
                return true;
            }
        return false;
    }
     
      $scope.isDisLiked = function(a)
    {
        
        if(dislikeArray.indexOf(a)!=-1)
            {
                console.log(a);
                console.log("is disliked");
                return true;
            }
        return false;
    }
    
    $scope.Like = function(a){
        
        console.log(a);
        if($scope.isLiked(a)== false){
            var url_vote = ApiEndpoint.url + 'vote/';
             var jsonreq = JSON.stringify({id:a,type:"like",email:$scope.data.user});
            $http.post(url_vote,jsonreq).then(function successCallback(response){
                     console.log(response.data);

                },function errorCallback(response){
                    console.log("ERROR");
                });
           
            likeArray.push(a);
            var i = dislikeArray.indexOf(a);
            if(i!=-1) dislikeArray.splice(i,1);
      //  $scope.$apply();
            
        }
    }
    
    $scope.Dislike = function(a){
        
        console.log(a);
         if($scope.isDisLiked(a)== false){
            var url_vote = ApiEndpoint.url + 'vote/';
             var jsonreq = JSON.stringify({id:a,type:"dislike",email:$scope.data.user});
            $http.post(url_vote,jsonreq).then(function successCallback(response){
                     console.log(response.data);

                },function errorCallback(response){
                    console.log("ERROR");
                });
             
             dislikeArray.push(a);
             var i = likeArray.indexOf(a);
            if(i!=-1) likeArray.splice(i,1);
             
         }
        //$scope.$apply();
        //$http.post(url_vote)
    }
   

});

