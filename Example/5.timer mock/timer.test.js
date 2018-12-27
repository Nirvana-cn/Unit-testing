const timerGame = require('./timer');

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
    timerGame();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledTimes(0);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});