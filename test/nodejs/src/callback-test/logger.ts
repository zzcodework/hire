export class Logger {
    public log(operationName: string, value: number, callback: (response: number) => number): (response: number) => void {
        let start = process.hrtime();
        console.log(`the purpose of log function is to do these steps: 1,2,3,4 and ${operationName}`);

        return (response) => {
            console.log(`before callback, do work - ${value}`);
            callback(response);
        };
    }
}
