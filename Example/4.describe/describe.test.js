const myBeverage = {
    delicious: true,
    sour: false,
};

beforeAll(() => {
    console.log('global before all');
});

afterAll(() => {
    console.log('global after all');
});

beforeEach(() =>{
    console.log('global before each');
});

afterEach(() =>{
    console.log('global after each');
});

describe('my beverage', () => {
    beforeAll(() => {
        console.log('inner test before all');
    });

    afterAll(() => {
        console.log('inner test after all');
    });

    beforeEach(() => {
        console.log('inner test before each');
    });

    afterEach(() =>{
        console.log('inner test after each');
    });

    test('is delicious', () => {
        expect(myBeverage.delicious).toBeTruthy();
    });

    test('is not sour', () => {
        expect(myBeverage.sour).toBeFalsy();
    });
});