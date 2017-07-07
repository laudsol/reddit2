(function() {
  'use strict';

  angular.module("app")

    .component('navbar',{
      controller: function(){
        const vm = this;

        vm.$onInit = function(){
        };

      },

      templateUrl: './navbar/navbar.template.html'
    });

})();
