// sum with variable argument number
var sum = function () {
  var args = Array.prototype.slice.call(arguments);
  var arraySum = 0;
  args.forEach( function (el) {
    arraySum += el;
  });
  return arraySum;
};

sum(1,2,3,4,5);

//bind with args

Function.prototype.myBind = function (obj) {
  var fn = this;
  var args = Array.prototype.slice.call(arguments);
  return function () {
    var args2 = Array.prototype.slice.call(arguments);
    args2.forEach(function (el) {
      args.push(el);
    }) ;
    return fn.apply(obj, args.slice(1));
  };
};

// curriedSum, curry

function curriedSum (numArgs) {
  var numbers = [];

  var _curriedSum = function (num) {
    // debugger
    numbers.push(num);

    if (numbers.length === numArgs) {
      var sum = 0;
      numbers.forEach(function (el) {
        sum += el;
      });
      return sum;
    }
    else {
      return _curriedSum;
    }
  };
  return _curriedSum;
}

var sum = curriedSum(4);
sum(5)(30)(20)(1); // => 56

// Function.prototype.curry

Function.prototype.curry = function (numArgs) {
  var fn = this;
  var args = [];


  function curried (arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return fn(args);
    } else {
      return curried;
    }
  }

  return curried;
};

function sumNums (arr) {
  var sum = 0;
  arr.forEach(function (el) {
    sum += el;
  });
  return sum;
}

var curryNums = sumNums.curry(3);
curryNums(1)(2)(3);
