var directives = angular.module('doralProps.directives', []);

directives.directive('dpNavMenu', function($location) {
  return function(scope, element, attrs) {
    var links = element.find('a'),
    link,
    currentLink,
    urlMap = {},
    i;

    for (i = 0; i < links.length; i++) {
      link = angular.element(links[i]);
      urlMap[link.attr('href')] = link;
    }

    scope.$on('$routeChangeStart', function() {
      var pathLink = urlMap[$location.path()];

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

directives.directive('dpPageBanner', function($route) {
  return {
    restrict: 'E',
    templateUrl: '/partials/page-banner.html',
    link:function(scope, element, attrs) {
      element.addClass('page-banner');

      scope.$on('$viewContentLoaded', function() {
        var pageBannerUrl = $route.current.pageBannerUrl;

        if (pageBannerUrl) {
          element.css({
            display: 'block',
            backgroundImage: 'url(' + pageBannerUrl + ')'
          });
        } else {
          element.hide();
        }
      });
    }
  };
});