
console.log(Object.assign({}, { abc: [1, 2], xyz: 123 }, { abc: [4, 5] }));

let testJson = { abc: 123 };
console.log(testJson.abc);
console.log(testJson['abc']);

let data = null;
// data = {};
// Object.assign(data, { abc: 123 });
// data['abc'] = 123;
console.log(data);

let emptyJson = {};
console.log(emptyJson);
console.log(JSON.stringify(emptyJson));
// console.log(JSON.parse(emptyJson.toString()));

console.log(Object.assign({}, { a: 1 }, {}));
console.log(Object.assign({}, { a: 1 }, undefined));
console.log(Object.assign({}, { a: 1 }, null));

console.log(null === 'local');
console.log(undefined === 'abc');

class CorrelationVector {
    public value: string;
}

class FakeClass {
    public Cor: CorrelationVector;

    public constructor() {
        this.Cor = new CorrelationVector();
    }
}

let x = new FakeClass();
console.log(x.Cor);
console.log(x.Cor.value);

let m = undefined;
console.log(m);
if (m) {
    console.log(`log from undefined`);
}

m = null;
console.log(m);
if (m) {
    console.log(`log from null`);
}

export enum ResultType {
    Success = <any>'Success oh yeah',
    Failure = <any>'Failure oh no'
}


function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"))


