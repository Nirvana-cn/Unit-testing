import events from './event';
import fetch from './fetch';

jest.mock('./fetch.js');

test('mock 整个 fetch.js模块', async () => {
    expect.assertions(2);
    await events.getPostList();
    expect(fetch.fetchPostsList).toHaveBeenCalled();
    expect(fetch.fetchPostsList).toHaveBeenCalledTimes(1);
});