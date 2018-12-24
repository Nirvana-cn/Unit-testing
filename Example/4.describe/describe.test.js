const myBeverage = {
    delicious: true,
    sour: false,
};

beforeAll(() => {
    console.log('global before all');
});

beforeEach(() =>{
    console.log('global before each');
});

describe('my beverage', () => {
    beforeAll(() => {
        console.log('inner test before all');
    });

    beforeEach(() => {
        console.log('inner test before each');
    });

    test('is delicious', () => {
        expect(myBeverage.delicious).toBeTruthy();
    });

    test('is not sour', () => {
        expect(myBeverage.sour).toBeFalsy();
    });
});