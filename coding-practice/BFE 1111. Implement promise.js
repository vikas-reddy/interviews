class MyPromise {
    constructor() {
    }

    then(thenFn: Function, catchFn: Function): MyPromise { }
    catch(catchFn: Function): MyPromise {
        return this.then(undefined, catchFn);
    }
    static resolve(value: any): MyPromise {}
    static reject(value: any): MyPromise {}
    static all(promises: MyPromise[]): MyPromise {}
    static race(promises: MyPromise[]): MyPromise {}
}

function debounce (func: Function, wait: number, immediate: boolean) {
    let timeoutId: number | undefined;
    return function (...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            timeoutId = undefined;
            if (!immediate) {
                func.apply(this, args);
            }
        }, wait)
        if (immediate && !timeoutId) {
            func.apply(this, args);
        }
    }
}
