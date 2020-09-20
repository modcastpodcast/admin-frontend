export function wrapPromise<T>(promise: Promise<T>): WrappedPromise<T> {
    let status = 'pending'
    let response: T;
    let error: Error;

    const suspender = promise.then(
        (res: T) => {
            status = 'success'
            response = res
        },
        (err: Error) => {
            status = 'error'
            error = err
        },
    )

    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw error
            default:
                return response
        }
    }

    return { read }
}

export interface WrappedPromise<T> {
    read: () => T
}
