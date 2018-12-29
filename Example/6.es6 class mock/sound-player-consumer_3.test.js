import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';
const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
    return jest.fn().mockImplementation(() => {
        return {playSoundFile: mockPlaySoundFile};
    });
});

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    SoundPlayer.mockClear();
    mockPlaySoundFile.mockClear();
});

test('We can check if the consumer called a method on the class instance', () => {
    // Show that mockClear() is working:
    expect(SoundPlayer).not.toHaveBeenCalled();

    const soundPlayerConsumer = new SoundPlayerConsumer();
    // Constructor should have been called again:
    expect(SoundPlayer).toHaveBeenCalledTimes(1);

    const coolSoundFileName = 'song.mp3';
    soundPlayerConsumer.playSomethingCool();

    // mock.instances is available with automatic mocks:
    expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
    expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
});