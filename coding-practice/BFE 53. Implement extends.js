const myExtends = (SuperType, SubType) => {
  // your code here
  let InheritedSubType = function () {
    SuperType.prototype.constructor.apply(this, arguments);
    SubType.prototype.constructor.apply(this, arguments);
  };
  
  // Make objects of InheritedSubType same as SubType
  InheritedSubType.prototype = SubType.prototype;

  // Make objects of InheritedSubType as sub-objects of SuperType
  InheritedSubType.prototype.__proto__ = SuperType.prototype;

  // Bring in static properties too
  InheritedSubType.__proto__ = SuperType;

  return InheritedSubType;
}

function SuperType(name) {
  this.name = name
  this.forSuper = [1, 2]
  this.from = 'super'
}
SuperType.prototype.superMethod = function() {}
SuperType.prototype.method = function() {}
SuperType.staticSuper = 'staticSuper'

function SubType(name) {
  this.name = name
  this.forSub = [3, 4]
  this.from = 'sub'
}

SubType.prototype.subMethod = function() {}
SubType.prototype.method = function() {}
SubType.staticSub = 'staticSub'


// const InheritedSubType = myExtends(SuperType, SubType)
// let instance = new InheritedSubType()

const ExtendedType = myExtends(SuperType, SubType)
const instance = new ExtendedType('bfe')
console.log(`expect(${instance.name}).toBe('bfe')`);
console.log(`expect(${instance.from}).toBe('sub')`);
console.log(`expect(${instance.forSub}).toBe([3,4])`);
console.log(`expect(${instance.forSuper}).toBe([1,2])`);