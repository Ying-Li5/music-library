const fetchSearch = async (searchTerm) => {
    return fetch(`https://itunes.apple.com/search?{searchTerm}`)
    .then(response => response.json())
    .then(resData => resData.result)
}

const wrapPromise = (promise) => {
    let status = 'pending'
    let result = ''
    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err
    })
    return {
        read() {
            if(status === 'pending') {
                throw suspender
            } else if (status === 'error') {
                throw result
            }
            return result
        }
    }
}

export const createResource = (searchTerm) => {
    return {
        result: wrapPromise(fetchSearch(searchTerm))
    }
}