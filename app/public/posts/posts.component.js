(function() {
  'use strict';

  angular.module('app')

    .component('posts',{
      controller: controller,
      templateUrl: './posts/posts.template.html'
    });

    controller.$inject = ['$http','postService'];

    function controller($http, postService){
      const vm = this;
      vm.posts = [];

      vm.$onInit = function(){

        vm.show = false;
        vm.showEdit = false;
        vm.propertyName = name;

        postService.getPosts().then(function(response){
          vm.posts = response;
        });
      };


      vm.newPost = function(){
        if(vm.show===true){
          vm.show=false;
        }
        else {
          vm.show = true;
        }
      };

      vm.createPost = function (){

        let post = vm.post;

        postService.newPost(post).then(function(response){
          response.comments = [];
          vm.posts.push(response);
        });

        vm.post.votes = 0;
        delete vm.post;
        vm.show = false;
      };


    }

})();
