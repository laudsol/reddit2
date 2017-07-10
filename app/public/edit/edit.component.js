(function() {
  'use strict';

  angular.module('app')

    .component('edit',{
      controller: controller,
      templateUrl: './edit/edit.template.html'
    });

    controller.$inject = ['$http','$stateParams','$state','editService'];

    function controller($http, $stateParams, $state, editService){
      const vm = this;

      vm.$onInit = function(){

          let id = $stateParams.id;
          editService.getPostInfo(id).then(function(response){
            vm.post = response;
          });
      };

      vm.updatePost = function(){
        let id = $stateParams.id;
        let post = vm.post;
        editService.editPost(id,post).then(function(result){
          delete vm.post;
          $state.go('posts');
        });
      };

    }

})();
