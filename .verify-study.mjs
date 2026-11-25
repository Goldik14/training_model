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
const quizSurveys = Object.assign(new Element("fieldset"), { querySelector: () => ({ value: "0" }) });
const selectors = {
  "#study": study,
  "#progress": progress,
  "#progress-count": count,
  "#progress-title": progressTitle,
  "#quiz-surveys": quizSurveys,
};
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
const labelOf = control => control.innerHTML ?? control.textContent;
const click = label => buttons().find(x => labelOf(x) === label).click();
const checked = (value, total = 57) => {
  assert.equal(progress.value, value);
  assert.equal(progress.max, total);
  assert.equal(count.textContent, value + " / " + total);
};
const cards = new Set();
assert.equal(quizSurveys.hidden, true);
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
assert.equal(quizSurveys.hidden, false);
const first = current();
const correct = () => {
  const statement = find(x => x.className === "statement");
  if (!statement) return current().choices[0];
  return statement.innerHTML === current().choices[0] ? "Верно" : "Неверно";
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
click(labelOf(buttons().find(x => labelOf(x) !== correct())));
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
for (const [survey, total] of [[1, 31], [2, 26]]) {
  quizSurveys.change({ target: { value: String(survey) } });
  checked(0, total);
  const firstInSet = current();
  click(correct());
  checked(1, total);

  const missed = current();
  click(labelOf(buttons().find(x => labelOf(x) !== correct())));
  assert.equal(answer().innerHTML, missed.answer);
  checked(0, total);
  click("Начать с первого вопроса");
  assert.equal(current(), firstInSet);

  const items = new Set();
  for (let index = 0; index < total; index++) {
    assert.equal(current().survey, survey);
    items.add(current());
    click(correct());
    checked(index + 1, total);
  }
  assert.equal(items.size, total);
  assert.equal(title().textContent, "Тест пройден");
  click("Пройти тест ещё раз");
  checked(0, total);
  assert.equal(current().survey, survey);
}
quizSurveys.change({ target: { value: "0" } });
checked(0);
modes[0].click();
assert.equal(quizSurveys.hidden, true);
checked(0);
console.log("Verified all 57 cards and all three quiz selections (31, 26, 57), including mistake recovery and replay.");
