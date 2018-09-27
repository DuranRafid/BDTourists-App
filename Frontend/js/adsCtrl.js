var module = angular.module('myIonicApp.controllers');

module.controller('adsCtrl', function($scope, $http,ApiEndpoint,sharePlaceInfo,shareDataService) {
  
    $scope.advertises = [];
    $scope.data = [];
    var userarr = {};
     userarr = shareDataService.getList();
     $scope.data.user = userarr[0].email;
     console.log($scope.data.user);
    
    
     var likeArray = [];
    var dislikeArray = [];
    var url_likes = ApiEndpoint.url + 'likes/';
  
    $http.get(url_likes,{params: { place: "All" ,email: $scope.data.user}}).then(function successCallback(response){
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
    
    
    
    var url = ApiEndpoint.url + 'advertisement/';
    
    $http.get(url).then(function successCallback(response){
        for(r=0;r<response.data.length;r++){
            
            $scope.advertises.push(response.data[r]);
        }
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
    }

});

