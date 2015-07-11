function TodoCtrl($scope) {

  $scope.todos = [{
    text: 'Learn AngularJS',
    done: false
     date: 06/05/2015;
    time: 10:00 AM;
    done: false
  },
   {
    text: 'Build an app',
    date: 06/05/2015;
    time: 10:00 AM;
    done: false
  }];

  $scope.getTotalTodos = function() {
    return $scope.todos.length;
  };

  $scope.addTodo = function() {
    $scope.todos.push({
      text: $scope.formTodoText,
      date:$scope.todoDate, 
      time:$scope.todoTime,
      done: false
    });
    $scope.formTodoText = '';
    $scope.todoDate = '';
    $scope.todoTime = 00.00;
  };

  $scope.clear = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}