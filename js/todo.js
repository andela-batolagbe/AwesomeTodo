var app = angular.module('TaskManager', ['ui.bootstrap']);

//controllers
app.controller('taskController', function($scope) {
    $scope.date = new Date().now;
    $scope.time = new Date().now;
    $scope.saved = localStorage.getItem('taskItems');
    $scope.taskItem = (localStorage.getItem('taskItems') !== null) ?
        JSON.parse($scope.saved) : [{
            description: "your awesome todo?",
            date: $scope.date,
            time: $scope.time,
            complete: false
        }];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));


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


    $scope.errorText = 'Please Enter a ToDO!'
    
    $scope.addNew = function() {
        if ($scope.newTask == null || $scope.newTask == '') {
             alert($scope.errorText);
        } else {
            $scope.taskItem.push({
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
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };


    $scope.deleteTask = function() {
        var completedTask = $scope.taskItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function(taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItems));
    };

    $scope.deleteEntry = function(index) {
        $scope.taskItem.splice(index, 1);
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

    $scope.save = function() {
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    }
});
