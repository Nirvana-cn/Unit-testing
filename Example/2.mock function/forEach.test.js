const func=require('./forEach')

test('test forEach',()=>{
    func([1,2],mockCallback)
    expect(mockCallback.mock.calls.length).toBe(2)
    expect(mockCallback.mock.calls[0][0]).toBe(1)
    expect(mockCallback.mock.results[0].value).toBe(43)
    expect(mockCallback.mock.calls[1][0]).toBe(2)
    expect(mockCallback.mock.results[1].value).toBe(44)
})

const mockCallback=jest.fn(x=>42+x)
mockCallback.mockName('This is a mock')
console.log(mockCallback.getMockName())


const mockFn = jest.fn().mockImplementation(scalar => 42 + scalar);
// or: jest.fn(scalar => 42 + scalar);
const a = mockFn(0);
const b = mockFn(1);
a === 42; // true
b === 43; // true
mockFn.mock.calls[0][0] === 0; // true
mockFn.mock.calls[1][0] === 1; // true


const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockReturnValueOnce('first call')
    .mockReturnValueOnce('second call');

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
