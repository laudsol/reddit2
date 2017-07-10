(function() {
  'use strict';

  angular
    .module('app')
    .service('editService', service);

    service.$inject = ['$http'];

    function service($http) {
      const vm = this;

      this.getPostInfo = function(id){
        return $http.get('/api/posts/'+id).then(function(response){
          return response.data;
        }).catch(function(err){
        });
      };

      this.editPost = function(id,post){
        return $http.patch('/api/posts/'+id,post).then(function(result){
          return result.data;
        }).catch(function(err){
        });
      };

    }
})();
