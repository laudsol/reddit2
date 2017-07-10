(function() {
  'use strict';

  angular
    .module('app')
    .service('editService', service);

    service.$inject = ['$http'];

    function service($http) {
      const vm = this;

      this.getPostInfo = function(id){
        console.log('hello');
        return $http.get('/api/posts/'+id).then(function(response){
          return reponse.data;
        }).catch(function(err){
        });
      };

    }
})();
