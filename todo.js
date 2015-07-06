var app = angular.module('TaskManager', []); 

//controllers
app.controller('taskController', function($scope) {
    $scope.date = new Date();
    $scope.time = new Date();
    $scope.saved = localStorage.getItem('taskItems');
    $scope.taskItem = (localStorage.getItem('taskItems')!==null) ? 
    JSON.parse($scope.saved) : [ {description: "Why not add a task?", date: $scope.date, time: $scope.time, complete: false}];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    
    $scope.newTask = null;
    $scope.newTaskDate = null;
    $scope.newTaskTime = null;
    
    $scope.addNew = function () {
        if ($scope.newTaskDate == null || $scope.newTaskDate == '')
         {
            alert("Enter a Date or Deadline")
         }
        else if ($scope.newTaskTime == null || $scope.newTaskTime == '')
        {
            alert("Enter a Time")
            
        } 
        else
         {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: $scope.newTaskDate,
                time: $scope.newTaskTime,
                complete: false,
            })
        };
        $scope.newTask = '';
        $scope.newTaskDate = '';
         $scope.newTaskTime = '';
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };
    $scope.deleteTask = function () {
        var completedTask = $scope.taskItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem)
         {
            if (!taskItem.complete)
             {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };
    
    $scope.save = function () {
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    }
});
