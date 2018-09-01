function do_a(callback: (id: number, name: string) => any) {
    setTimeout(function () {
        // 模擬一個需要長間的 function
        console.log('`do_a`: 這個需要的時間比 `do_b` 長');

        // 如果 callback 存在的話就執行他
        callback(3, '');
    }, 3000);
}

function do_c(callback: (id: number, name: string) => any): (gender: boolean, tag: string) => number {
    return (gender, tag) => {
        setTimeout(function () {
            // 模擬一個需要長間的 function
            console.log('`do_a`: 這個需要的時間比 `do_b` 長');

            // 如果 callback 存在的話就執行他
            callback(3, '');
        }, 3000);

        return 0;
    };
}


function do_b(x: number, y: number) {
    setTimeout(function () {
        console.log(x);
        console.log(y);
        console.log('`do_b`: 現在我們就可以肯定 `do_b` 出現在 `do_a` 之後了');
    }, 1000);
}

// do_a(function () {
//     do_b();
// });

do_a(() => {
    do_b(6, 7);
});

// This does NOT work!!!
// Callback has to be a function pointer??!!
// do_a(do_b());



function basic(callback) {
    console.log('作些事情');
    var result = '我是等會要被傳送給 `do something` 的 callback 的函式結果';
    callback(result);
}

function callbacks_with_call(arg1, arg2, callback) {
    console.log('作些事情');

    var result1 = arg1.replace('argument', 'result'),
        result2 = arg2.replace('argument', 'result');

    this.data = '這等會可以讓 callback 函式用 `this` 來調用';

    // 如果 callback 存在的話就執行他
    callback.call(this, result1, result2);
}

// 這個和 `callbacks_with_call` 很相像
// 唯一不同點是將 `call` 換成了 `apply`
// 所以參數只能傳陣列
function callbacks_with_apply(arg1, arg2, callback) {
    console.log('作些事情');

    var result1 = arg1.replace('argument', 'result'),
        result2 = arg2.replace('argument', 'result');

    this.data = '這等會可以讓 callback 函式用 `this` 來調用';

    // 如果 callback 存在的話就執行他
    callback.apply(this, [result1, result2]);
}

basic(function (result) {
    console.log('this callback uses the result value defined on the top');
    console.log(result);
});

let xyz = 123
basic(function () {
    console.log('this callback uses the xyz number value here');
    console.log(xyz);
});

let abc = 'abc';
basic(() => {
    console.log('this callback uses the abc string value');
    console.log(abc);
});

console.log('--------------------------------------------------------------------------------------');

(function () {
    var arg1 = '我是 argument1',
        arg2 = '我是 argument2';

    callbacks_with_call(arg1, arg2, function (result1, result2) {
        console.log('這一個 callback 函式將會列出 `callbacks_with_call` 的執行結果');
        console.log('result1: ' + result1);
        console.log('result2: ' + result2);
        console.log('data from `callbacks_with_call`: ' + this.data);
    });
})();

(() => {
    var arg1 = '我是 argument1',
        arg2 = '我是 argument2';

    callbacks_with_call(arg1, arg2, function (result1, result2) {
        console.log('這一個 callback 函式將會列出 `callbacks_with_call` 的執行結果');
        console.log('result1: ' + result1);
        console.log('result2: ' + result2);
        console.log('data from `callbacks_with_call`: ' + this.data);
    });
})();

console.log('--------------------------------------------------------------------------------------');

(function () {
    var arg1 = '我是 argument1',
        arg2 = '我是 argument2';

    callbacks_with_apply(arg1, arg2, function (result1, result2) {
        console.log('這一個 callback 函式將會列出 `callbacks_with_apply` 的執行結果');
        console.log('result1: ' + result1);
        console.log('result2: ' + result2);
        console.log('data from `callbacks_with_apply`: ' + this.data);
    });
})();