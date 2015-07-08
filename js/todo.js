var app = angular.module('TaskManager', ['ui.bootstrap']);

//controllers
app.controller('taskController', function($scope) {
    $scope.date = new Date();
    $scope.time = new Date();
    $scope.saved = localStorage.getItem('taskItems');
    $scope.taskItems = (localStorage.getItem('taskItems') !== null) ?
        JSON.parse($scope.saved) : [{
            description: "your awesome todo?",
            date: $scope.date,
            time: $scope.time,
            complete: false
        }];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItems));


    $scope.priorities = [{
        name: 'Important'
    }, {
        name: 'Regular'
    }, {
        name: 'Not Important'
    }, ];

    $scope.newTask = '';
    $scope.newTaskDate = '';
    $scope.newTaskTime = '';
    $scope.newTaskCategory = $scope.categories;

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

function TestDialogController($scope, dialog, errorText, showErrorText){
 
   $scope.errorText = errorText;  
   $scope.showErrorAlert = showErrorAlert;
 
  $scope.close = function(result){
    dialog.close(result);
  };
}
    $scope.addNew = function() {
        if ($scope.newTask == null || $scope.newTask == '') {
            $scope.errorAlert();
        } else {
            $scope.taskItems.push({
                description: $scope.newTask,
                date: $scope.newTaskDate,
                time: $scope.newTaskTime,
                complete: false,
                priority: $scope.newTaskPriority.name
            })
        };
        $scope.newTask = '';
        $scope.newTaskDate = '';
        $scope.newTaskTime = '';
        $scope.newTaskCategory = $scope.categories;
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItems));
    };

    $scope.deleteTask = function() {
        var completedTask = $scope.taskItems;
        $scope.taskItems = [];
        angular.forEach(completedTask, function(taskItem) {
            if (!taskItem.complete) {
                $scope.taskItems.push(taskItem);
            }
        });
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItems));
    };

    $scope.deleteEntry = function(index) {
        $scope.taskItems.splice(index, 1);
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItems));
    };

    $scope.save = function() {
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItems));
    }
});
