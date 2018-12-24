const sum = require('./sum');

test('test', () => {
    // expect(sum(1, 2)).toEqual(3);
    expect(null).toBeNull();
    expect(1).not.toBeNull();
    expect('').not.toBeUndefined();
    expect('undefined').toBeDefined();
    expect(undefined).toBeUndefined();
    expect(undefined).toBeFalsy();
    expect(11).toBeTruthy();
    expect(0.1+0.2).toBeCloseTo(0.3)
    expect(0.1+0.2).toBeLessThan(0.45)
});

test('char',()=>{
    expect('team').toMatch(/tea/)
    expect('team').not.toMatch(/tee/)
})

test('test array',function () {
    expect([1,2,3]).toContain(1)
    expect(['a','b','c']).toContain('b')
    expect(['1','2','3']).not.toContain(3)
})