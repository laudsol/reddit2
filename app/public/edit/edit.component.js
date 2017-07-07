(function() {
  'use strict';

  angular.module('app')

    .component('edit',{
      controller: controller,
      templateUrl: './edit/edit.template.html'
    });

    controller.$inject = ['$http','$stateParams','$state'];

    function controller($http, $stateParams, $state){
      const vm = this;

      vm.$onInit = function(){
          vm.id = $stateParams.id;
          $http.get('/api/posts/'+vm.id).then(function(result){
            vm.post = result.data;
          });
      };

      vm.updatePost = function(){
        $http.patch('/api/posts/'+vm.id,vm.post).then(function(result){
          delete vm.post;
          $state.go('posts');
        });
      };

    }

})();
