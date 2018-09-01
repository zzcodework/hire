export class Worker {
    public run(response: number): number {
        console.log(`this is the actual callback work ${response}`);
        return response;
    }
}