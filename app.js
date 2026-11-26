(() => {
  "use strict";

  const bank = window.questionBank;
  const study = document.querySelector("#study");
  const progress = document.querySelector("#progress");
  const progressTitle = document.querySelector("#progress-title");
  const progressCount = document.querySelector("#progress-count");
  const modeButtons = document.querySelectorAll("[data-mode]");

  function shuffled(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1));
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result;
  }

  function makeTestItem(question, binary) {
    const options = shuffled(question.choices.map((html, index) => ({ html, correct: index === 0 })));
    if (!binary) return { question, options };

    const statement = Math.random() < 0.5
      ? question.choices[0]
      : shuffled(question.choices.slice(1))[0];
    const correct = statement === question.choices[0];

    return {
      question,
      statement,
      options: [
        { html: "Верно", correct },
        { html: "Неверно", correct: !correct },
      ],
    };
  }

  function start(mode) {
    const deck = shuffled(bank);
    return {
      deck: mode === "quiz"
        ? deck.map((question, index) => makeTestItem(question, index % 2 === 1))
        : deck,
      index: 0,
      revealed: false,
      mistake: false,
    };
  }

  let mode = "cards";
  const sessions = { cards: start("cards"), quiz: start("quiz") };

  function add(parent, tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    parent.append(element);
    return element;
  }

  function button(parent, label, action, className = "primary") {
    const control = add(parent, "button", className, label);
    control.type = "button";
    control.addEventListener("click", action);
    return control;
  }

  function heading(text) {
    const element = add(study, "h2", "question", text);
    element.tabIndex = -1;
    return element;
  }

  function questionHeading(question) {
    add(study, "p", "topic", question.topic);
    const element = heading();
    element.innerHTML = question.prompt;
    return element;
  }

  function renderAnswer(question) {
    const answer = add(study, "div", "answer");
    answer.setAttribute("aria-label", "Правильный ответ");
    // This HTML is generated from the local study notes at authoring time.
    answer.innerHTML = question.answer;
    answer.tabIndex = -1;
    return answer;
  }

  function next(session) {
    session.index++;
    session.revealed = false;
    render(true);
  }

  function again() {
    sessions[mode] = start(mode);
    render(true);
  }

  function renderCards(session) {
    const question = session.deck[session.index];
    const title = questionHeading(question);
    const answer = session.revealed ? renderAnswer(question) : null;
    const actions = add(study, "div", "actions");
    if (session.revealed) {
      const last = session.index === session.deck.length - 1;
      button(actions, last ? "Завершить колоду" : "Следующая карточка", () => next(session));
    } else {
      button(actions, "Показать ответ", () => {
        session.revealed = true;
        render(true);
      });
    }
    return answer || title;
  }

  function renderQuiz(session) {
    const { question, statement, options } = session.deck[session.index];
    if (session.mistake) add(study, "p", "feedback", "Ошибка · прогресс сброшен");
    const title = questionHeading(question);

    if (session.mistake) {
      renderAnswer(question);
      button(add(study, "div", "actions"), "Начать с первого вопроса", () => {
        session.index = 0;
        session.mistake = false;
        render(true);
      });
      return title;
    }

    add(study, "p", "prompt", statement ? "Это правильный ответ?" : "Выбери один правильный ответ");
    if (statement) add(study, "p", "statement").innerHTML = statement;
    const controls = add(study, "div", statement ? "options binary" : "options");
    for (const option of options) {
      const control = button(controls, "", () => {
        if (option.correct) {
          next(session);
        } else {
          session.mistake = true;
          render(true);
        }
      }, "option");
      control.innerHTML = option.html;
    }
    return title;
  }

  function render(focus = false) {
    const session = sessions[mode];
    const completed = session.mistake ? 0 : session.index + Number(session.revealed);
    progressTitle.textContent = mode === "cards" ? "Просмотрено" : "Верных подряд";
    progress.max = session.deck.length;
    progress.value = completed;
    progressCount.textContent = completed + " / " + session.deck.length;

    for (const control of modeButtons) {
      control.setAttribute("aria-pressed", String(control.dataset.mode === mode));
    }

    study.replaceChildren();
    let target;
    if (session.index === session.deck.length) {
      const cards = mode === "cards";
      target = heading(cards ? "Колода пройдена" : "Тест пройден");
      add(study, "p", "completion", cards
        ? "Ты просмотрел все карточки."
        : "Ты ответил на все вопросы без ошибок.");
      button(add(study, "div", "actions"), cards ? "Перемешать и повторить" : "Пройти тест ещё раз", again);
    } else {
      target = mode === "cards" ? renderCards(session) : renderQuiz(session);
    }
    if (focus) target.focus();
  }

  for (const control of modeButtons) {
    control.addEventListener("click", () => {
      if (mode === control.dataset.mode) return;
      mode = control.dataset.mode;
      render(true);
    });
  }
  render();
})();
