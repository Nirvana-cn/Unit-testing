const func=require('./forEach')

const mockCallback=jest.fn(x=>42+x)

test('test forEach',()=>{
    func([1,2],mockCallback)
    expect(mockCallback.mock.calls.length).toBe(2)
    expect(mockCallback.mock.calls[0][0]).toBe(1)
    expect(mockCallback.mock.results[0].value).toBe(43)
    expect(mockCallback.mock.calls[1][0]).toBe(2)
    expect(mockCallback.mock.results[1].value).toBe(44)
})