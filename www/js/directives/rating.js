//alejandro's approach for rating
var app = angular.module('mdzevents.directives', []);

app.directive('svgJustRating', function() {
    function link(scope, element, attrs) {
      function getIt(descr, item) {

        var first = colorRating(item, 1);
        var second = colorRating(item, 2);
        var third = colorRating(item, 3);
        return '<svg width="80" height="9"><rect y="0" fill="' + first + '" width="20" height="6" rx="3" ry="3"/><rect x="21" y="0" fill="' + second + '" width="20" height="6" rx="3" ry="3"/><rect x="43" y="0" fill="'+ third + '" width="20" height="6" rx="3" ry="3"/> </svg>';
      }

      var colorRating = function(group, current) {
        return (group >= current) ? "#000022" : "#7F707F";
    };

      function renderSVG() {
          element.html( getIt(attrs.descr, attrs.item) );
      }
      
      renderSVG();
    }

    return {
      link: link,
      restrict: 'E'
    };
});

app.directive('svgRating', function() {
    function link(scope, element, attrs) {
      function getIt(descr, item) {

        var first = colorRating(item, 1);
        var second = colorRating(item, 2);
        var third = colorRating(item, 3);
        return '<p class="col" >' + descr + '&nbsp;<svg width="80" height="9"><rect y="0" fill="' + first + '" width="20" height="6" rx="3" ry="3"/><rect x="21" y="0" fill="' + second + '" width="20" height="6" rx="3" ry="3"/><rect x="43" y="0" fill="'+ third + '" width="20" height="6" rx="3" ry="3"/> </svg></p>';
      }

      var colorRating = function(group, current) {
        return (group >= current) ? "#000022" : "#7F707F";
    };

      function renderSVG() {
          element.html( getIt(attrs.descr, attrs.item) );
      }
      
      renderSVG();
    }

    return {
      link: link,
      restrict: 'E'
    };
});