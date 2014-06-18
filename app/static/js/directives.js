var directives = angular.module('doralProps.directives', []);

directives.directive('dpNavMenu', function() {
  return function(scope, element) {
    var links = element.find('a'),
    link,
    currentLink,
    stateLinkMap = {},
    i;

    for (i = 0; i < links.length; i++) {
      link = angular.element(links[i]);
      stateLinkMap[link.attr('ui-sref')] = link;
    }

    scope.$on('$stateChangeSuccess', function(event, toState) {
      var pathLink = stateLinkMap[toState.name];

      if (pathLink) {
        if (currentLink) {
          currentLink.removeClass('on');
        }
        currentLink = pathLink;
        currentLink.addClass('on');
      }
    });
  };
});

directives.directive('dpPageBanner', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/page-banner.html',
    link:function(scope, element, attrs) {
      element.addClass('page-banner');

      scope.$on('$stateChangeSuccess', function(event, toState) {
        if (toState.data && toState.data.pageBannerUrl) {
          element.css({
            display: 'block',
            backgroundImage: 'url(' + toState.data.pageBannerUrl + ')'
          });
        } else {
          element.hide();
        }
      });
    }
  };
});