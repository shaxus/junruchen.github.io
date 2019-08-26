Function.prototype.bind2 = function (oThis) {
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }

  var aArgs = Array.prototype.slice.call(arguments, 1),
    fToBind = this,
    fNOP = function () {
    },
    fBound = function () {
      // this instanceof fNOP === true时,说明返回的fBound被当做new的构造函数调用
      return fToBind.apply(this instanceof fNOP
          ? this
          : oThis,
        // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
        aArgs.concat(Array.prototype.slice.call(arguments)))
    }

  // 维护原型关系
  if (this.prototype) {
    // Function.prototype doesn't have a prototype property
    fNOP.prototype = this.prototype
  }
  // 下行的代码使fBound.prototype是fNOP的实例,因此
  // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
  fBound.prototype = new fNOP()

  console.log('==', fBound.prototype.constructor)

  return fBound
}

Function.prototype.bind3 = function (oThis, ...args0) {
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }

  let fToBind = this
  let fBound = function (...args1) {
    if (new.target === fBound) {
      return new fToBind(...args0.concat(args1))
    }
    return fToBind.apply(oThis, args0.concat(args1))
  }
  return fBound
}

function Foo () {
  console.log(this)
}

new (Foo.bind2({}))()
//
// function foo1 () {
//   this.count++
// }
// let obj = {
//   count: 20
// }
// let newFoo = foo1.bind2(obj)
// newFoo()
// console.log(obj)

