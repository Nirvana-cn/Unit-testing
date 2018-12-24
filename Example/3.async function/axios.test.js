const fetch = require('./axios')

describe('async test', () => {
    // one
    test('method one', () => {
        expect.assertions(1);
        return fetch().then(res => {
            expect(res.name).toMatch(/ham/)
        })
    })

    // two
    test('method two',()=>{
        expect.assertions(1);
        return expect(fetch()).resolves.toBeTruthy()
    })

    //three
    test('method three', async () => {
        expect.assertions(1);
        let data = await fetch()
        expect(data.name).toMatch(/ham/)
    })
})





