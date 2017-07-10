(function() {
  'use strict';

  angular.module('app')
    .component('post',{
      bindings: {
        post: '='
      },
      controller: controller,
      templateUrl: './post/post.template.html'
    });

    controller.$inject = ['$http','postService'];

    function controller($http,postService){
      const vm = this;
      vm.show = false;
      vm.showEdit = false;
      vm.propertyName = 'Votes';

      vm.$onInit = function(){
      };

      vm.showComments = function(post){
        if(vm.show === true){
          vm.show = false;
        } else {
          vm.show = true;
        }
      };

      vm.createComment = function(message){
        let id = vm.post.id;
        message = {content: message};
        postService.newComment(id,message).then(function(response){ vm.post.comments.unshift(response);
        });
      };

      vm.upVote = function(post){
        let id = vm.post.id;
        postService.addUpVote(id).then(function(response){
          vm.post.vote_count = response.vote_count;
        });
      };

      vm.downVote = function(post){
        if(vm.post.vote_count > 0){
          let id = vm.post.id;
          postService.addDownVote(id).then(function(response){
            vm.post.vote_count = response.vote_count;
          });
        }
      };

    }

})();
