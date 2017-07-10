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
          return response.data
        }).catch(function (err){
        });
      };
  }

}());
