const fetch=require('./axios')
// one
// test('async test',()=>{
//     expect.assertions(1);
//     return fetch().then(res=>{
//         expect(res).toMatch(/cat/)
//     })
// })

// two
// test('async test',()=>{
//     expect.assertions(1);
//     return expect(fetch()).resolves.toMatch(/cat/)
// })


//three
test('async test',async ()=>{
    expect.assertions(1);
    let data=await fetch()
    expect(data).toMatch(/cat/)
})