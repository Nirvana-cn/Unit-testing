Jest是Facebook开源的一个前端测试框架，主要用于React和React Native的单元测试（同样也可以进行JavaScript测试），已被集成在create-react-app中。

Jest特点：
1. 易用性：基于Jasmine，提供断言库，支持多种测试风格
2. 适应性：Jest是模块化、可扩展和可配置的
3. 沙箱和快照：Jest内置了JSDOM，能够模拟浏览器环境，并且并行执行
4. 快照测试：Jest能够对React组件树进行序列化，生成对应的字符串快照，通过比较字符串提供高性能的UI检测
5. Mock系统：Jest实现了一个强大的Mock系统，支持自动和手动mock
6. 支持异步代码测试：支持Promise和async/await
7. 自动生成静态分析结果：内置Istanbul，测试代码覆盖率，并生成对应的报告

(非必须) Jest环境配置，在package.json中的script中增加"test: jest --config .jest.js"

```
module.exports = {
  setupFiles: [
    './test/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  testRegex: '.*\\.test\\.js$',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/components/**/*.{js}',
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
    "^.+\\.js$": "babel-jest"
  },
};
```
- setupFiles：配置文件，在运行测试案例代码之前，Jest会先运行这里的配置文件来初始化指定的测试环境
- moduleFileExtensions：代表支持加载的文件名
- testPathIgnorePatterns：用正则来匹配不用测试的文件
- testRegex：正则表示的测试文件，测试文件的格式为xxx.test.js
- collectCoverage：是否生成测试覆盖报告，如果开启，会增加测试的时间
- collectCoverageFrom：生成测试覆盖报告是检测的覆盖文件
- moduleNameMapper：代表需要被Mock的资源名称
- transform：用babel-jest来编译文件，生成ES6/7的语法

** ES6提供的 import 来导入模块的方式，Jest本身是不支持的,
可以通过安装babel-jest、babel-core、babel-preset-env、babel-plugin-transform-runtime这几个依赖让我们可以使用ES6的语法特性进行单元测试。
在项目的根目录下添加.babelrc文件，并在文件复制如下内容:
```
{
  "presets": ["env"],
  "plugins": ["transform-runtime"]
}
```

## Globals  API

- describe(name, fn)：描述块，讲一组功能相关的测试用例组合在一起
- test(name, fn, timeout)：别名it，用来放测试用例
- afterAll(fn, timeout)：所有测试用例跑完以后执行的方法
- beforeAll(fn, timeout)：所有测试用例执行之前执行的方法
- afterEach(fn)：在每个测试用例执行完后执行的方法
- beforeEach(fn)：在每个测试用例执行之前需要执行的方法

全局和describe都可以有上面四个周期函数，describe的after函数优先级要高于全局的after函数，describe的before函数优先级要低于全局的before函数，完整的例子见Example.4。

```javascript
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

// console.log describe.test.js:7
// global before all
//
// console.log describe.test.js:16
// inner test before all
//
// console.log describe.test.js:11
// global before each
//
// console.log describe.test.js:20
// inner test before each
//
// console.log describe.test.js:11
// global before each
//
// console.log describe.test.js:20
// inner test before each
```

#### describe和test的执行顺序

Jest在执行任何实际test之前，会首先执行文件中所有describe块的处理程序。这是在before*和after*中进行设置，而不是在describe块中进行设置的另一个原因。
默认情况下，describe块执行完成后，Jest按照在收集阶段遇到的顺序连续运行所有test，等待每个test完成并在继续之前进行整理。实例见Example.7。

## 常见断言

1. expect(value)：要测试一个值进行断言的时候，要使用expect对值进行包裹
2. toBe(value)：使用Object.is来进行比较，如果进行浮点数的比较，要使用toBeCloseTo
3. not：用来取反
4. toEqual(value)：用于对象的深比较
5. toMatch(regexpOrString)：用来检查字符串是否匹配，可以是正则表达式或者字符串
6. toContain(item)：用来判断item是否在一个数组中，也可以用于字符串的判断
7. toBeNull(value)：只匹配null
8. toBeUndefined(value)：只匹配undefined
9. toBeDefined(value)：与toBeUndefined相反
10. toBeTruthy(value)：匹配任何使if语句为真的值
11. toBeFalsy(value)：匹配任何使if语句为假的值
12. toBeGreaterThan(number)： 大于
13. toBeGreaterThanOrEqual(number)：大于等于
14. toBeLessThan(number)：小于
15. toBeLessThanOrEqual(number)：小于等于
16. toBeInstanceOf(class)：判断是不是class的实例
17. anything(value)：匹配除了null和undefined以外的所有值
18. resolves：用来取出promise为fulfilled时包裹的值，支持链式调用
19. rejects：用来取出promise为rejected时包裹的值，支持链式调用
20. toHaveBeenCalled()：用来判断mock function是否被调用过
21. toHaveBeenCalledTimes(number)：用来判断mock function被调用的次数
22. assertions(number)：验证在一个测试用例中有number个断言被调用
23. extend(matchers)：自定义一些断言

## 异步函数测试

对于异步函数的测试，官方文档提供了四种方法，分别为callback、promise、resolve/reject和async/await函数

相比于callback，后三者语义上无疑更清晰，在Example.3中，我们分别演示了后三者。

我们使用axios发起异步请求，等待响应数据。

expect.assertions（n）验证在测试期间是否调用了一定数量的断言。这在测试异步代码时通常很有用，以确保实际调用异步中的断言。

比如，我们发起两次异步请求，但是设置expect.assertions(1)或expect.assertions(3)，这个时候就会报错，造成测试无法通过，因为实际异步请求返回应该2次。
所以需要expect.assertions()来确保异步请求响应次数与我们的期望一致。
```
describe('async test', () => {

    test('method three', async () => {
        expect.assertions(1);
        let data = await fetch()
        expect(data.name).toMatch(/ham/)
        let data2 = await fetch()
        expect(data2.username).toMatch(/Bret/)
    })
})

// Expected one assertion to be called but received two assertion calls.
```

## Mock Function

在项目中，一个模块的方法内常常会去调用另外一个模块的方法。在单元测试中，我们可能并不需要关心内部调用的方法的执行过程和结果，
只想知道它是否被正确调用即可，甚至会指定该函数的返回值。此时，使用Mock函数是十分有必要。

Mock函数提供的以下三种特性，在我们写测试代码时十分有用：

- 捕获函数调用情况
- 设置函数返回值
- 改变函数的内部实现

Mock函数常用方法：
1. mockFn.mockName(value)：设置mock函数的名字
2. mockFn.getMockName()： 返回mockFn.mockName(value)中设置的名字
3. mockFn.mock.calls：mock函数的调用信息

mockFn.mock.calls返回一个数组，数组中的每一个元素又是一个数组，包含mock函数的调用信息。比如，
一个被调用两次的模拟函数f，参数为f('arg1'，'arg2')，然后使用参数f('arg3'，'arg4')，mockFn.mock.calls返回的数组形式如下：

> [['arg1', 'arg2'], ['arg3', 'arg4']]

因此，mockFn.mock.calls.length代表mock函数被调用次数，mockFn.mock.calls[0][0]代表第一次调用传入的第一个参数，以此类推。

4. mockFn.mock.results：mock函数的return值，以数组存储
5. mockFn.mock.instances：mock函数实例

```
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; // true
```

6. mockFn.mockImplementation(fn)：创建一个mock函数

注意：jest.fn(implementation)是jest.fn().mockImplementation(implementation)的简写。

7. mockFn.mockImplementationOnce(fn)：创建一个mock函数

该函数将用作对mocked函数的一次调用的mock的实现。可以链式调用，以便多个函数调用产生不同的结果。

```
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val)); // true

myMockFn((err, val) => console.log(val)); // false
```

当mocked函数用完使用mockImplementationOnce定义的实现时，如果调用它们，
它将使用jest.fn(()=> defaultValue)或.mockImplementation(()=> defaultValue)执行默认实现集：
```
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
```

8. mockFn.mockReturnThis()：jest.fn()的语法糖

```
jest.fn(function() {
  return this;
});
```

9. mockFn.mockReturnValue(value)：接受一个值作为调用mock函数时的返回值

```
const mock = jest.fn();
mock.mockReturnValue(42);
mock(); // 42
mock.mockReturnValue(43);
mock(); // 43
```

10. mockFn.mockReturnValueOnce(value)：接受一个值作为调用mock函数时的返回值，可以链式调用，以便产生不同的结果。

当不再使用mockReturnValueOnce值时，调用将返回mockReturnValue指定的值。

```
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call');

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
```

11. mockFn.mockResolvedValue(value)：mock异步函数的语法糖

实现上类似于

```
jest.fn().mockImplementation(() => Promise.resolve(value));
```

用于在test中模拟异步函数

```
test('async test', async () => {
  const asyncMock = jest.fn().mockResolvedValue(43);

  await asyncMock(); // 43
});
```

12. mockFn.mockResolvedValueOnce(value)：语法糖

实现上类似于

```
jest.fn().mockImplementationOnce(() => Promise.resolve(value));
```

```
test('async test', async () => {
  const asyncMock = jest
    .fn()
    .mockResolvedValue('default')
    .mockResolvedValueOnce('first call')
    .mockResolvedValueOnce('second call');

  await asyncMock(); // first call
  await asyncMock(); // second call
  await asyncMock(); // default
  await asyncMock(); // default
});
```

13. mockFn.mockRejectedValue(value)：语法糖

实现上类似于

```
jest.fn().mockImplementation(() => Promise.reject(value));
```

```
test('async test', async () => {
  const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));

  await asyncMock(); // throws "Async error"
});
```

14. mockFn.mockRejectedValueOnce(value)：语法糖

实现上类似于

```
jest.fn().mockImplementationOnce(() => Promise.reject(value));
```

```
test('async test', async () => {
  const asyncMock = jest
    .fn()
    .mockResolvedValueOnce('first call')
    .mockRejectedValueOnce(new Error('Async error'));

  await asyncMock(); // first call
  await asyncMock(); // throws "Async error"
});
```

15. mockFn.mockClear()：重置所有存储在mockFn.mock.calls 和 mockFn.mock.instances数组中的信息

当你想要清除两个断言之间的模拟使用数据时，这通常很有用。

16. mockFn.mockReset()：完成mockFn.mockClear()所做的所有事情，还删除任何模拟的返回值或实现

当你想要将模拟完全重置回其初始状态时，这非常有用。（请注意，重置spy将导致函数没有返回值）。

17. mockFn.mockRestore()：完成mockFn.mockReset()所做的所有事情，并恢复原始（非模拟）实现

当你想在某些测试用例中模拟函数并在其他测试用例中恢复原始实现时，这非常有用。


## Timer Mock

## Manual Mock

## ES6 Class Mock


## 推荐阅读

[使用Jest测试JavaScript (入门篇)](https://segmentfault.com/a/1190000016232248)

[使用Jest测试JavaScript(Mock篇)](https://segmentfault.com/a/1190000016717356)

[顶级测试框架Jest指南：跑通一个完美的程序，就是教出一群像样的学生](https://segmentfault.com/a/1190000016399447)

[Jest cheat sheet](https://github.com/sapegin/jest-cheat-sheet)




