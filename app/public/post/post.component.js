(function() {
  'use strict';

  angular.module('app')

    .component('post',{
      controller: controller,
      templateUrl: './post/post.template.html'
    });

    controller.$inject = ['$http','postService'];

    function controller($http, postService){
      const vm = this;
      vm.posts = [];

      vm.$onInit = function(){

        vm.show = false;
        vm.showEdit = false;
        vm.propertyName = 'Votes';

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
        postService.newComment(id,message).then(function(response){ vm.posts[postbox].comments.unshift(response);
        });
      };

      vm.upVote = function(post){
        let postbox = vm.posts.indexOf(post);
        let id = post.id;
        postService.addUpVote(id).then(function(response){
          vm.posts[postbox].vote_count = response.vote_count;
        });
      };

      vm.downVote = function(post){
        if(post.vote_count > 0){
          let id = post.id;
          let postbox = vm.posts.indexOf(post);
          postService.addDownVote(id).then(function(response){
            vm.posts[postbox].vote_count = response.vote_count;
          });
        }
      };
    }

})();
