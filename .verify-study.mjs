import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

class Element {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.attributes = {};
  }
  append(child) { this.children.push(child); }
  replaceChildren() { this.children = []; }
  addEventListener(type, listener) { this[type] = listener; }
  setAttribute(key, value) { this.attributes[key] = value; }
  focus() {}
  get descendants() { return this.children.flatMap(child => [child, ...child.descendants]); }
}
const study = new Element("main");
const progress = new Element("progress");
const count = new Element("output");
const progressTitle = new Element("span");
const modes = ["cards", "quiz"].map(mode => Object.assign(new Element("button"), { dataset: { mode } }));
const selectors = { "#study": study, "#progress": progress, "#progress-count": count, "#progress-title": progressTitle };
const document = {
  createElement: tag => new Element(tag),
  querySelector: selector => selectors[selector],
  querySelectorAll: () => modes,
};
const context = vm.createContext({ window: {}, document });
for (const file of ["questions.js", "app.js"]) {
  vm.runInContext(readFileSync(new URL("./" + file, import.meta.url), "utf8"), context);
}
const bank = context.window.questionBank;
assert.equal(bank.length, 57);
assert.equal(bank.filter(q => q.survey === 1).length, 31);
assert.equal(bank.filter(q => q.survey === 2).length, 26);
assert.ok(bank.every(q => new Set(q.choices).size === 3 && q.answer));
const find = predicate => study.descendants.find(predicate);
const title = () => find(x => x.tag === "h2");
const answer = () => find(x => x.className === "answer");
const current = () => bank.find(q => q.prompt === title().innerHTML);
const buttons = () => study.descendants.filter(x => x.tag === "button");
const click = label => buttons().find(x => x.textContent === label).click();
const checked = (value) => {
  assert.equal(progress.value, value);
  assert.equal(count.textContent, value + " / 57");
};
const cards = new Set();
for (let index = 0; index < 57; index++) {
  const item = current();
  cards.add(item);
  assert.equal(answer(), undefined);
  click("Показать ответ");
  checked(index + 1);
  assert.equal(answer().innerHTML, item.answer);
  click(index < 56 ? "Следующая карточка" : "Завершить колоду");
}
assert.equal(cards.size, 57);
assert.equal(title().textContent, "Колода пройдена");
click("Перемешать и повторить");
checked(0);
modes[1].click();
const first = current();
const correct = () => {
  const statement = find(x => x.className === "statement");
  if (!statement) return current().choices[0];
  return statement.textContent === current().choices[0] ? "Верно" : "Неверно";
};
click(correct());
checked(1);
const second = current();
click(correct() === "Верно" ? "Неверно" : "Верно");
assert.equal(current(), second);
assert.equal(answer().innerHTML, second.answer);
checked(0);
click("Начать с первого вопроса");
assert.equal(current(), first);
click(buttons().find(x => x.textContent !== correct()).textContent);
assert.equal(answer().innerHTML, first.answer);
click("Начать с первого вопроса");
const quiz = new Set();
for (let index = 0; index < 57; index++) {
  quiz.add(current());
  assert.equal(buttons().length, index % 2 === 0 ? 3 : 2);
  click(correct());
  checked(index + 1);
}
assert.equal(quiz.size, 57);
assert.equal(title().textContent, "Тест пройден");
click("Пройти тест ещё раз");
checked(0);
console.log("Verified all 57 cards, all 57 test items, both types of mistakes, and complete attempt restart.");
