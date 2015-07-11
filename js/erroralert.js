angular.module('alert', ['ui.bootstrap'])

.controller('alertController', function($scope, $dialog, $http) {

    $scope.errorText = 'Please enter a ToDo Task';
    $scope.showErrorText = true;

    $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: '../alert.html',
        controller: 'TestDialogController',
        resolve: {}
    };

    $scope.errorAlert = function() {
        $scope.opts.resolve.errorText = function() {
            return angular.copy($scope.successText);
        }

        $scope.opts.resolve.showErrorText = function() {
            return angular.copy($scope.showErrorText);
        }

        var confirm = $dialog.dialog($scope.opts);
        confirm.open().then(function(result) {
            if (result) {
                return true
            } else {
                return false
            }
        });
    }

    function TestDialogController($scope, dialog, errorText, showErrorText) {

        $scope.errorText = errorText;
        $scope.showErrorAlert = showErrorAlert;

        $scope.close = function(result) {
            dialog.close(result);
        };
    }
});
