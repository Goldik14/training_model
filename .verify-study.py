from pathlib import Path
import random
from playwright.sync_api import sync_playwright

path = Path(__file__).resolve().parent / "index.html"
browser_path = Path.home() / "AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe"

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=str(browser_path), headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(path.as_uri())
    assert page.locator("#progress-count").inner_text() == "0 / 57"
    bank = page.evaluate("window.questionBank")
    assert len(bank) == 57
    assert sorted({(q["survey"], q["number"]) for q in bank}) == [
        (survey, number) for survey, total in [(1, 31), (2, 26)] for number in range(1, total + 1)
    ]
    assert all(len(set(q["choices"])) == 3 and q["answer"] for q in bank)
    by_prompt = {q["prompt"]: q for q in bank}

    cards = []
    for index in range(57):
        cards.append(page.locator("h2").inner_html())
        assert page.locator(".answer").count() == 0
        page.get_by_role("button", name="Показать ответ").click()
        assert page.locator(".answer").inner_html() == by_prompt[cards[-1]]["answer"]
        assert page.locator("#progress-count").inner_text() == f"{index + 1} / 57"
        page.get_by_role("button", name="Следующая карточка" if index < 56 else "Завершить колоду").click()
    assert len(set(cards)) == 57
    assert page.locator("h2").inner_text() == "Колода пройдена"
    page.get_by_role("button", name="Перемешать и повторить").click()
    assert page.locator("#progress-count").inner_text() == "0 / 57"

    page.get_by_role("button", name="Тест").click()
    page.screenshot(path=str(path.parent / ".quiz-desktop-check.png"))
    first = page.locator("h2").inner_html()

    def answer_label():
        question = by_prompt[page.locator("h2").inner_html()]
        if page.locator(".statement").count():
            return "Верно" if page.locator(".statement").inner_text() == question["choices"][0] else "Неверно"
        return question["choices"][0]

    page.get_by_role("button", name=answer_label(), exact=True).click()
    assert page.locator("#progress-count").inner_text() == "1 / 57"
    second = page.locator("h2").inner_html()
    assert page.locator(".options.binary .option").count() == 2
    wrong = "Неверно" if answer_label() == "Верно" else "Верно"
    page.get_by_role("button", name=wrong, exact=True).click()
    assert page.locator("#progress-count").inner_text() == "0 / 57"
    assert page.locator("h2").inner_html() == second
    assert page.locator(".answer").inner_html() == by_prompt[second]["answer"]
    page.get_by_role("button", name="Начать с первого вопроса").click()
    assert page.locator("h2").inner_html() == first

    quiz = []
    for index in range(57):
        quiz.append(page.locator("h2").inner_html())
        assert page.locator(".option").count() == (3 if index % 2 == 0 else 2)
        page.get_by_role("button", name=answer_label(), exact=True).click()
        assert page.locator("#progress-count").inner_text() == f"{index + 1} / 57"
    assert len(set(quiz)) == 57
    assert page.locator("h2").inner_text() == "Тест пройден"

    page.set_viewport_size({"width": 360, "height": 780})
    page.evaluate("Math.random = () => 0.99999")
    page.get_by_role("button", name="Пройти тест ещё раз").click()
    assert page.locator("#progress-count").inner_text() == "0 / 57"
    assert page.evaluate("document.documentElement.scrollWidth === innerWidth")
    page.get_by_role("button", name="Карточки").click()
    for question in bank:
        prompt = page.locator("h2").inner_html()
        page.get_by_role("button", name="Показать ответ").click()
        assert page.evaluate("document.documentElement.scrollWidth === innerWidth"), prompt
        if page.locator(".formula").count():
            page.screenshot(path=str(path.parent / ".flashcard-mobile-check.png"))
        page.get_by_role("button", name="Следующая карточка" if question != bank[-1] else "Завершить колоду").click()
    assert not errors, errors
    browser.close()
print("Verified both 57-question flows, full answer matching, quiz restart, no horizontal page overflow on mobile, and no browser JavaScript errors.")
