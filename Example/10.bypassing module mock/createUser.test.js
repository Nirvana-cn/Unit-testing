import fetch from 'node-fetch';
import {createUser} from './createUser';
const {Response} = jest.requireActual('node-fetch');//这允许您的测试文件从node-fetch导入实际的Response对象，而不是模拟的版本。

jest.mock('node-fetch');

test('createUser calls fetch with the right args and returns the user id', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response('4')));

    const userId = await createUser();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://website.com/users', {
        method: 'POST',
    });
    expect(userId).toBe('4');
});