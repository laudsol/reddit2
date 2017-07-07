(function() {
  'use strict';

  angular.module('app')

    .component('post',{
      controller: controller,
      templateUrl: './post/post.template.html'
    });

    controller.$inject = ['$http'];

    function controller($http){
      const vm = this;
      vm.posts = [];

      vm.$onInit = function(){
        vm.show = false;
        vm.showEdit = false;
        vm.propertyName = 'Votes';
        $http.get('/api/posts').then(function(response){
          vm.posts = response.data;
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
        $http.post('/api/posts',vm.post).then(function(response){
          response.data.comments = [];
          vm.posts.push(response.data);
        });

        vm.post.votes = 0;
        delete vm.post;
        vm.show = false;
      };

      vm.showComments = function(post){
        if(post.show === true){
          post.show = false;
        } else {
          post.show = true;
        }
      };

      vm.createComment = function(post,message){
        let id = post.id;
        let postbox = vm.posts.indexOf(post);
        message = {content: message};
        $http.post('/api/posts/'+id+'/comments',message).then(function(response){ vm.posts[postbox].comments.unshift(response.data);
        });
      };

      vm.newUpdate = function(){
        if(vm.showEdit === true){
          vm.showEdit = false;
        }
        else {
          vm.showEdit = true;
        }
      };

      vm.upVote = function(post){
          post.votes += 1;
      };

      vm.downVote = function(post){
        if(post.votes > 0){
          post.votes -= 1;
        }
      };
    }

})();