class Animal {
    readonly name: string;
    constructor(public age: number) {
    }
}

class Cat extends Animal {
    readonly name = 'cat';
}

class Dog extends Animal {
    readonly name = 'dog';
}


let catA = new Cat(1);
console.log(catA);
let dogA = new Dog(2);
console.log(dogA);

// console.log(Object.assign(catA, dogA));
console.log(Object.assign(dogA, catA));



let aString = 'FGHJKfghjk';
console.log(aString);
console.log(!aString);
console.log(aString!);
console.log(aString!.toLowerCase());