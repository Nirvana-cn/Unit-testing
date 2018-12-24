const fetch = require('./axios')

describe('async test', () => {

    test('method three', async () => {
        expect.assertions(2);
        let data = await fetch()
        expect(data.name).toMatch(/ham/)
        let data2 = await fetch()
        expect(data2.username).toMatch(/Bret/)
    })
})





