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

全局和describe都可以有上面四个周期函数，describe的after函数优先级要高于全局的after函数，describe的before函数优先级要低于全局的before函数。

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

## Timer Mock

## Manual Mock

## ES6 Class Mock




