const sum = require('../src/sum');
const hasType = require('./hasType');

const result = n => 'Итог: ' + n;

test('1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(result(3));
});

test('"1" + 2 = 3', () => {
  expect(sum("1", 2)).toBe(result(3));
});

test('1 + "2" = 3', () => {
  expect(sum(1, "2")).toBe(result(3));
});

test('"1" + "2" = 3', () => {
  expect(sum("1", "2")).toBe(result(3));
});

test('"-1" + "2" = 1', () => {
  expect(sum("-1", "2")).toBe(result(1));
});

test('шаблонные строки', async () => {
  return new Promise((resolve) => {
    hasType('sum/index.js', 'TemplateLiteral', res => resolve(expect(res).toBeTruthy()))
  });
});
