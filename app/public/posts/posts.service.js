(function() {
  'use strict';

  angular
    .module('app')
    .service('postService', service);

    service.$inject = ['$http'];

    function service($http) {
      const vm = this;

      this.getPosts = function(){
        return $http.get('/api/posts').then(function(response){
          return response.data;
        }).catch(function (err){
        });
      };

      this.newPost = function(post){
        return $http.post('/api/posts',post).then(function(response){
          return response.data;
        }).catch(function(err){
        });
      };

      this.newComment = function(id,message){
        return $http.post('/api/posts/'+id+'/comments',message).then(function(response){
          return response.data;
        }).catch(function(err){
        });
      };

      this.addUpVote = function(id){
        return $http.post('/api/posts/'+id+'/votes').then(function(response){
          return response.data;
        }).catch(function(err){
        });
      };

      this.addDownVote = function(id){
        return $http.delete('/api/posts/'+id+'/votes').then(function(response){
          return response.data;
        }).catch(function(err){
        });
      };
  }

}());
