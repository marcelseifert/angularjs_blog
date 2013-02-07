function Person(vorname, nachname, alter, adresse) {
  
       this.vorname = vorname;
       this.nachname = nachname;
       this.alter = alter;
       this.adresse = adresse;
 
       this.fullname = function() {
              return this.vorname + " " + this.nachname;
       };
 
}

function Adresse(strasse, ort, plz) {
    this.strasse = strasse;
    this.ort = ort;
    this.plz = plz;
    
}
 
function PersonViewModel($scope) {
 
      var zuerich = new Adresse("Berner Strasse 10", 8080, "Zürich");
      var hamburg = new Adresse("Berliner Strasse 2", 2220, "Hamburg");
      
       $scope.listOfPersonen = [ new Person("Vorname1", "Nachname1", 10, zuerich),
                     new Person("Vorname2", "Nachname2", 20, hamburg), ];
 
       $scope.editPerson = null;
       $scope.vorname = "";
       $scope.nachname = "";
       $scope.alter = "";
       
       $scope.selectedPerson = function(person) {
              $scope.editPerson = person;
               $scope.alter = person.alter;
       };
 
       $scope.clear = function() {
              $scope.editPerson = null;
              $scope.vorname = "";
              $scope.nachname = "";
       };
 
       $scope.add = function() {
              $scope.listOfPersonen.push(new Person($scope.vorname, $scope.nachname));
              $scope.clear();
       };
 
       $scope.remove = function() {
              $scope.listOfPersonen.splice($scope.listOfPersonen.indexOf($scope.editPerson),1);       
              $scope.clear();
       };
 
}

angular.module('angularcheck.directive', []).
directive('slider', function($parse) {
  return {
    restrict: 'E',
    transclude: true,
    
    require: 'ngModel',
    link:function(scope,element,attrs){ 
      
     scope.slideValue = function(value) {
         var express = attrs.ngModel + ' = ' +  value;
         scope.$apply(express); 
         scope.$digest();
     }
      scope.$watch(attrs.ngModel, function(val) {
                if (val != element.slider("value")) {
                    element.slider("value", val);
                }
       });
     element.slider({
                  min: parseInt(attrs.min),
                  max: parseInt(attrs.max),
                  value: 0,
                  slide: function(event, ui){   
                      scope.slideValue(ui.value); 
                  }
               });           
      
    } ,
    template:
      '<div class="slider"></div>',
    replace: true
  };
});
angular.module('angularcheck', ['angularcheck.directive']);