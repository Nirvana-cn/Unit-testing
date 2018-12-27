const timer = require('./timer');
const callback = jest.fn();

jest.useFakeTimers();

test('calls the callback after 1 second', () => {
    timer(callback);

    // At this point in time, the callback should not have been called yet
    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});