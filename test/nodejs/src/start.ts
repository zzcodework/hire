import { Logger } from './callback-test/logger';
import { Worker } from './callback-test/worker';
import { GenevaLogger, PrettyPrintStream } from '@azure-iot/bunyan-geneva-stream';
import { config } from '@azure-iot/configuration';
import * as retry from 'retry';
import { ResultType } from "./basic";
import * as mustache from 'mustache';
import * as moment from 'moment';

const hardDeleteAfterMinutes = 7 * 24 * 60;
const now = moment();
console.log(`now - local time: ${now.toDate()}, ISO time: ${now.toISOString()}`);
console.log(`hardDeleteAfterMinutes - ${hardDeleteAfterMinutes}, hours: ${moment.duration(hardDeleteAfterMinutes, 'm').asHours()}, days: ${moment.duration(hardDeleteAfterMinutes, 'm').asDays()}`);
const hardDeleteOlderThan = now.subtract(hardDeleteAfterMinutes, 'm').toDate();
console.log(`hardDeleteOlderThan - local time: ${hardDeleteOlderThan}, ISO time: ${hardDeleteOlderThan.toISOString()}`);
console.log('@'.repeat(300));


// let emptyTest = undefined;
let emptyTest = null;
console.log('dfdfdfdfdfdf'!);
console.log('@'.repeat(200));

if (emptyTest) {
    console.log('@'.repeat(200));
}
else {
    console.log('!'.repeat(200));
}


var even1 = function (args: any[]) {
    console.log(args);
};

even1([1, 2, 3, true, 'gg']);

var even2 = function (aaa) {
    console.log(aaa);
};

even2([1, 2, 3, 'bbb']);



const child_process = require('child_process');

enum Environment {
    ppe,
    prod,
    unknown
}

try {
    JSON.parse('abc');
}
catch (e) {
    // JSON.parse('bbbbbbbb');
    console.log(e);
    throw e;
}
finally {
    console.log('1111111111111111111111finally');
    // JSON.parse('aaaaaaaaaa');
}

console.log(undefined as string);
console.log(null as string);
console.log('$'.repeat(100));

console.log(Environment.ppe);
console.log(Environment['ppe']);
console.log(Environment[Environment.ppe]);
console.log(Environment[Environment['ppe']]);

// console.log(Array.isArray(null));
// console.log(Array.isArray(undefined));
// console.log(Array.isArray([]));

// console.log('*'.repeat(100));
// let va8 = mustache.render('aaa{{buildNumber}}bbb', '123');
// va8 = mustache.render('aaa{{buildNumber}}bbb', { buildNumber: 123 });
// console.log(va8);

let a10 = 'aaa';
if (a10) {
    console.log(`a10 is empty and true`);
}
console.log(!a10);

let a9 = ['aaa', 'bbb', 'ccc'];
console.log(a9);
console.log(JSON.stringify(a9));


let a8 = Object.assign({ name: 100 }, undefined);
console.log(a8);

let va7 = null;
va7 = undefined;
console.log(va7 == null);
console.log(va7 == undefined);
console.log(va7 === null);
console.log(va7 === undefined);
console.log('?'.repeat(100));

let index = 0;
let max = Infinity;

console.log(max++ < Infinity);

reconnect();

function reconnect() {
    console.log(index);
    if (index++ < max) {
        setTimeout(function () {
            reconnect();
        }, 1000 * 1);
    }
}

// let va6 = { name: 'abc', age: 100 };
// Object.assign(va6, { name: 'aaa', number: 0 });
// console.log(va6);
// va6 = ResultType.Success as any;
// console.log('va6 is: ' + va6);
// console.log(ResultType.Failure as any);
// console.log(ResultType.Success.toString());
// console.log(ResultType.Failure.toString());
// console.log(ResultType.Success);
// console.log(ResultType.Failure);
// console.log(String(ResultType.Success));
// console.log(String(ResultType.Failure));
// console.log(ResultType.Success.toString());
// console.log(ResultType.Failure.toString());
// let va5 = null;
// va5 = undefined;
// console.log(`abc-${va5}`);

// let va4 = null;
// console.log(va4 === undefined);
// console.log(va4 === null);
// console.log(undefined === null);

// console.log(typeof null);

// console.log(getStringValue(undefined));
// console.log(getStringValue(null));
// console.log(getStringValue(5));
// console.log(getStringValue(''));
// console.log(getStringValue(true));
// console.log(getStringValue(false));
// console.log(true.toString());
// console.log(false.toString());
// console.log(String(true));
// console.log(String(false));
// console.log(String(''));
// console.log(String(undefined));
// console.log(String());
// console.log(getStringValue('abc'));
// console.log(getStringValue({ name: 'aaa', age: 100 }));

// let va3 = String(undefined);
// va3 = String(null);
// console.log(va3);

// let va2: Array<string | number> = [];
// console.log(1 in va2);

// let va1 = process.hrtime();
// console.log(va1);
// console.log(Math.floor((va1[0] * 1e3) + (va1[1] * 1e-6)));
// console.log(Math.floor((va1[0] * 1e9) + va1[1]));

// let vb = { name: 'aaa', age: 3 };
// let vc = undefined;
// let vd = null;
// let ve = vb && vb['x'] || vd || 4;
// ve = vb && vb.age || vd || 4;
// ve = (vb && vb['y']) || (vb && vb['z']);
// console.log(ve);
// console.log(vb && vb['x'] || vd || 4);
// console.log(vc && vc['x'] || 6);
// console.log(vb && vb.age || 5);


// let va = true ? 1 : null || 2;
// va = false ? 1 : null || 2;
// console.log(va);

// interface IDog {
//     name: string;
// }

// let aValue = { title: 'abc', age: 100 };
// aValue['context'] = 1;
// let aValueB = aValue['xyz'] as IDog;
// console.log(aValueB);

// // let previousTime = new Date('2017-05-18');
// let previousTime = process.hrtime();
// console.log(previousTime);
// console.log(Math.floor((previousTime[0] * 1e3) + (previousTime[1] * 1e-6)));
// // let currentTime = new Date();
// let currentTime = process.hrtime();
// currentTime[0] += 60 * 30;
// console.log(currentTime);
// let difference = currentTime[0] - previousTime[0];
// console.log('time difference: ', difference);
// console.log('time difference: ', difference / 1000 / 60 / 60);
// let differenceTime = new Date(difference * 1000);
// console.log('difference time: ', differenceTime);


// let a3 = 'abc';
// console.log('split is: ' + a3.split('/'));
// console.log('split is: ' + a3.split('/')[0]);
// a3 = '';
// console.log('split is: ' + a3.split('/'));
// console.log('split is: ' + a3.split('/')[0]);
// a3 = '/1/2/3';
// console.log('split is: ' + a3.split('/'));

// let a5 = ['true', true, , 'false', false, 'true', 'abc', { abc: 123 }];
// // let b5 = a5.filter(x => x === true);
// let b5 = a5.find(x => x === 'true');
// console.log(b5);

// let d1 = new Date(a3);
// let d2 = Date.parse(a3);
// d2 = Date.parse('2017-02-03');
// console.log('d1 is: ' + d1);

// if (Date.parse('2019-01-01')) {
//     console.log('d2 is: ' + d2);
// }

// console.log(typeof a3);
// if (typeof a3 === 'string') {
//     console.log('a3 is a string type');
// }

// let a4 = ['a', 'b'];
// let c1 = 0;
// let a4Promises = a4.map(x => {
//     console.log(`c1 is ${c1}`);
//     console.log(x);
//     return Promise.resolve(c1++);
// });
// Promise.all(a4Promises);

// console.log(a4.length);
// if (a4) {
//     console.log(`a4 is ${a4}`);
// }

// let fakeLong = fakeLongTimeOperation(10).then(() => fakeLongTimeOperation(7)).then(() => fakeLongTimeOperation(8));

// let p1 = new Promise((resolve, reject) => {
//     console.log(`new promise`);
// });
// console.log(`1111111111111`);

// let p2 = Promise.resolve(() => {
//     console.log(`promise.resolve`);
// });
// console.log(`2222222222`);


// function doSomething(log: string): any {
//     let x = {};

//     try {
//         JSON.parse(log);
//     }
//     catch (err) {
//         console.error(err);
//     }

//     return x;
// }

// let y = doSomething('aaa');
// console.log(`y is ${y}`);
// console.log(`y is ${y === {}}`);

// let a1 = undefined;
// a1 = null;
// a1 = '';
// if (a1) {
//     console.log(`a1 is empty but true`);
// }
// else {
//     console.log(`a1 is empty and false`);
// }

// a1 = {};
// if (a1) {
//     console.log(`{} is ${a1}`);
// }
// console.log(a1 || 'a1');
// console.log('1111111' + a1);

// a1 = 'aaaaaaaaaa';
// a1 = ''
// // console.log(JSON.parse(a1));
// console.log('$'.repeat(50));

// // for (let key in a1) {
// //     console.log('2222222' + a1[key]);
// // }
// // let aObj = { value: { abc: 123 } };
// let aObj = {};
// console.log(aObj);
// if (aObj === undefined) {
//     console.log(`aObj is {}`);
// }
// // console.log('aaa' in aObj.value ? aObj.value['aaa'] : '111');
// // console.log('aaa' in aObj['value'] ? aObj['value']['aaa'] : '111');
// // console.log('aaa' in aObj['bbb'] ? aObj.value['aaa'] : '111');

// let orTest = null || '';
// console.log(orTest);
// orTest = null || 'abc';
// console.log(orTest);
// orTest = undefined || 'abc';
// console.log(orTest);
// orTest = '' || '123';
// console.log(orTest);

// console.log(parseInt('', 10));

// let size = null;
// console.log(parseInt(size, 10));
// size = undefined;
// console.log(parseInt(size, 10));

// let aBoolean = false;
// aBoolean = true;
// if (aBoolean) {
//     console.log(`aBoolean is ${aBoolean}`);
// }

// let oneArray = [];
// if (Array.isArray(oneArray)) {
//     console.log(`Empty array is array`);
// }

// let abc = '';
// console.log('1111111111111' + abc);
// if (abc)
// { console.log('222222222222' + abc) };

// abc = undefined;
// // console.log(`env" ${abc['def']}`);

// let logger = new Logger();
// let worker = new Worker();
// let genevaLogger: GenevaLogger;

// let z = logger.log('sampleOperation', 99, worker.run);
// z(22);

// setTimeout(function () {
//     console.log(`done`);
// }, 6 * 1000);

// // config.initialize().then(() => {
// //     genevaLogger = new GenevaLogger(config, [{ level: 'trace', stream: new PrettyPrintStream() }]);
// //     let result = promisifyDocumentDb('context', 'testLogOSR', () => { console.log('this is the fn function'); }, [], true);
// // });

// function promisifyDocumentDb<T>(
//     context: any,
//     operationName: string,
//     fn: Function,
//     nonretryableErrorCodes: number[] = [],
//     retryOnError: boolean = true,
// ): (...args: any[]) => Promise<T> {
//     return (...args: any[]): Promise<T> => {
//         return new Promise<T>((resolve, reject) => {
//             const retryOptions = retryOnError ? { retries: 3 } : { retries: 0 };
//             const operation = retry.operation(retryOptions);
//             operation.attempt(() => {
//                 fn(...args, genevaLogger.logNodeOSR(operationName, 'DocDbClient.hostname', context.correlationVector, (error: any, result: T) => {
//                     if (error) {
//                         if (nonretryableErrorCodes.some(code => code === error.code)) {
//                             return reject(error);
//                         }
//                     }
//                     if (!operation.retry(<any>error)) {
//                         if (error) {
//                             return reject(operation.mainError());
//                         }
//                         return resolve(result);
//                     }
//                 }));
//             });
//         });
//     };
// }

// function fakeLongTimeOperation(seconds) {
//     return new Promise((resolve, reject) => {
//         try {
//             setTimeout(function () {
//                 console.log(`long time operation is done`);
//             }, seconds * 1000);
//             resolve();
//         }
//         catch (err) {
//             reject(err);
//         }
//     });
// }

// function getStringValue(value: any): string {
//     // if (value) {
//     //     return String(value);
//     // }
//     // else {
//     //     return '';
//     // }

//     let stringValue = String(value);
//     return stringValue === 'undefined' || stringValue === 'null' ? '' : stringValue;
// }