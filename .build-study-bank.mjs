const distractors = [
  [
    "Возвращающая сила пропорциональна отклонению и направлена к равновесию, поэтому свободное движение идеальной системы синусоидально.",
    "Возвращающая сила постоянна по модулю, поэтому координата идеального осциллятора всегда меняется по синусоиде.",
    "Сила направлена от равновесия, поэтому отклонение периодически меняет знак."
  ],
  [
    "x″ + ω₀²x = 0.",
    "x″ − ω₀²x = 0.",
    "x′ + ω₀²x = 0."
  ],
  [
    "Это уравнение для λ, которое у линейного однородного ОДУ с постоянными коэффициентами получают подстановкой x = e^(λt).",
    "Это исходное дифференциальное уравнение после подстановки начального значения x(0).",
    "Это уравнение, которое задаёт только амплитуду и не связано с видом решения."
  ],
  [
    "Пара комплексно-сопряжённых корней даёт колебательную составляющую. Действительная часть задаёт затухание или рост.",
    "Пара комплексных корней всегда даёт чистое затухание без колебаний.",
    "Комплексность корней означает, что действительные решения не существуют."
  ],
  [
    "Это ненулевой вектор v, для которого Av = λv, а λ — соответствующее собственное значение.",
    "Это любой вектор v, для которого Av = v, а собственное значение всегда равно единице.",
    "Это вектор v, ортогональный Av, а λ — угол между v и Av."
  ],
  [
    "Для нулевого вектора Av = λv выполняется при любом λ и потому не определяет соответствующее значение.",
    "Нулевой вектор исключают, потому что равенство Av = λv для него никогда не выполняется.",
    "Нулевой вектор допустим, если λ также равна нулю."
  ],
  [
    "Преобразование умножает длину на |λ| и оставляет образ на той же прямой. При λ < 0 направление меняется на противоположное.",
    "Преобразование поворачивает вектор на угол λ и всегда сохраняет его длину.",
    "Преобразование переносит вектор в перпендикулярное направление и сохраняет его длину."
  ],
  [
    "Любое ненулевое кратное остаётся собственным вектором с тем же собственным значением.",
    "При умножении вектора на c его собственное значение тоже умножается на c.",
    "Масштабировать собственный вектор можно только множителем 1."
  ],
  [
    "Находят λ из det(A − λI) = 0 и ненулевые решения (A − λI)v = 0.",
    "Складывают диагональные элементы A и подставляют сумму в качестве единственного λ.",
    "Решают Av = 0 для всех λ независимо от значения λ."
  ],
  [
    "Они задают направления простого масштабирования. Базис из них помогает разделить линейную систему на независимые уравнения.",
    "Они нужны, чтобы заменить любую квадратную матрицу единичной без изменения координат.",
    "Они определяют только число строк матрицы и не связаны с динамикой."
  ],
  [
    "Явный шаг идёт по касательной с наклоном в начале шага: yₙ₊₁ = yₙ + h f(tₙ, yₙ).",
    "Явный метод Эйлера использует среднее двух наклонов на каждом шаге и имеет второй порядок.",
    "Явный метод Эйлера заменяет кривую отрезком с наклоном, вычисленным только в неизвестной конечной точке."
  ],
  [
    "Используют два вычисления правой части и получают второй порядок, например усредняют наклоны начала и прогнозируемого конца шага.",
    "Используют только начальный наклон, а второй порядок получают за счёт увеличения шага.",
    "Используют четыре наклона с весами 1:2:2:1 на каждом шаге."
  ],
  [
    "Классический RK4 вычисляет правую часть четыре раза на шаг и комбинирует наклоны с весами 1:2:2:1.",
    "Классический RK4 вычисляет правую часть дважды на шаг и усредняет наклоны.",
    "Классический RK4 вычисляет правую часть один раз за четыре шага."
  ],
  [
    "Регрессия моделирует зависимость количественной величины от одной или нескольких объясняющих переменных.",
    "Регрессия — способ случайной перестановки наблюдений для увеличения выборки.",
    "Регрессия — вычисление только коэффициента корреляции без модели зависимости."
  ],
  [
    "Прямое преобразование получает спектр сигнала, обратное восстанавливает сигнал по спектру.",
    "Прямое преобразование восстанавливает временной сигнал из спектра, обратное строит спектр.",
    "Оба преобразования вычисляют только среднее значение сигнала."
  ],
  [
    "Для линейной стационарной системы отношение преобразования Лапласа выхода к преобразованию входа берут при нулевых начальных условиях.",
    "Передаточная функция — отношение начального значения входа к конечному значению выхода.",
    "Передаточная функция — сумма преобразований Лапласа входа и выхода."
  ],
  [
    "Положительная корреляция отражает однонаправленную линейную связь, отрицательная — разнонаправленную.",
    "Положительная корреляция означает, что при росте одной величины другая обычно падает.",
    "Отрицательная корреляция означает отсутствие линейной связи."
  ],
  [
    "Невязка показывает отклонение от исходного уравнения при подстановке приближения, например r = b − A·x̃.",
    "Невязка всегда равна разности между точным и приближённым решениями.",
    "Невязка — разность между двумя соседними приближениями независимо от уравнения."
  ],
  [
    "Метод Монте-Карло использует случайные испытания для оценки вероятностей, интегралов и других характеристик.",
    "Метод Монте-Карло вычисляет точный результат, перебирая все точки непрерывной области.",
    "Метод Монте-Карло находит производную, используя только два фиксированных значения функции."
  ],
  [
    "Это числовая функция, ставящая в соответствие число каждому исходу случайного эксперимента.",
    "Это вероятность единственного выбранного исхода.",
    "Это конкретное измеренное число, одинаковое для всех исходов эксперимента."
  ],
  [
    "Это конкретное числовое значение, полученное при случайном испытании по заданному распределению.",
    "Это функция, которая описывает все возможные исходы и однозначно определяет их вероятности.",
    "Это среднее значение всех возможных результатов испытания."
  ],
  [
    "Выборка — набор наблюдений из изучаемой совокупности.",
    "Выборка — формула для вычисления вероятности каждого исхода.",
    "Выборка — числовое среднее всех наблюдений от одного эксперимента."
  ],
  [
    "Это среднее значение случайной величины по её распределению, например сумма значений с весами-вероятностями в дискретном случае.",
    "Это наиболее вероятное значение, независимо от остальных значений.",
    "Это среднее крайних значений, независимо от распределения."
  ],
  [
    "Для независимых одинаково распределённых испытаний с конечной дисперсией стандартная ошибка убывает как 1/√N.",
    "Стандартная ошибка убывает как 1/N, поэтому удвоение N уменьшает её вдвое.",
    "Стандартная ошибка растёт как √N при увеличении числа испытаний."
  ],
  [
    "При стандартных условиях центрированное и нормированное выборочное среднее сходится по распределению к нормальному закону.",
    "При увеличении выборки распределение каждого отдельного наблюдения обязательно становится нормальным.",
    "При стандартных условиях среднее становится равномерно распределённым на всей числовой оси."
  ],
  [
    "Перебор оценивает варианты по очереди, деление шага уменьшает неудачный шаг вдвое, а градиентный спуск движется против градиента.",
    "Перебор проверяет только одну точку, деление шага удваивает шаг, а градиентный спуск всегда идёт по градиенту.",
    "Перебор и градиентный спуск выполняют только случайные шаги, а деление шага применяется только к первому варианту."
  ]
];

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const [katexPath, playwrightPath, chromiumPath] = process.argv.slice(2);
if (!katexPath || !playwrightPath || !chromiumPath) {
  throw new Error("Usage: node .build-study-bank.mjs <KaTeX module> <Playwright entry point> <Chromium executable>");
}
const { renderToString } = await import(pathToFileURL(katexPath));
const { chromium } = await import(pathToFileURL(playwrightPath));
const escapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const escapeHtml = text => text.replace(/[&<>"]/g, character => escapes[character]);
const formulas = new Map();

function math(tex, displayMode = false) {
  const source = tex.trim();
  const id = createHash("sha256").update(JSON.stringify([source, displayMode])).digest("hex").slice(0, 16);
  if (!formulas.has(id)) {
    const rendered = renderToString(source, { displayMode, output: "mathml", strict: "error" });
    const markup = rendered.match(/<math\b[\s\S]*<\/math>/)[0];
    formulas.set(id, { source, markup, displayMode });
  }
  return "{{formula:" + id + "}}";
}

function inline(text) {
  return text.split(/(\$[^$\n]+\$|\*\*[^*\n]+\*\*)/).map(part => {
    if (part.startsWith("$") && part.endsWith("$")) return math(part.slice(1, -1));
    if (part.startsWith("**") && part.endsWith("**")) return "<strong>" + inline(part.slice(2, -2)) + "</strong>";
    return escapeHtml(part);
  }).join("");
}

const choiceFormulas = new Map([
  ["x″ + ω₀²x = 0", "x''+\\omega_0^2x=0"],
  ["x″ − ω₀²x = 0", "x''-\\omega_0^2x=0"],
  ["x′ + ω₀²x = 0", "x'+\\omega_0^2x=0"],
  ["x = e^(λt)", "x=e^{\\lambda t}"],
  ["x(0)", "x(0)"],
  ["Av = λv", "Av=\\lambda v"],
  ["Av = v", "Av=v"],
  ["Av = 0", "Av=0"],
  ["|λ|", "|\\lambda|"],
  ["λ < 0", "\\lambda<0"],
  ["det(A − λI) = 0", "\\det(A-\\lambda I)=0"],
  ["(A − λI)v = 0", "(A-\\lambda I)v=0"],
  ["yₙ₊₁ = yₙ + h f(tₙ, yₙ)", "y_{n+1}=y_n+h f(t_n,y_n)"],
  ["1:2:2:1", "1:2:2:1"],
  ["r = b − A·x̃", "r=b-A\\tilde x"],
  ["1/√N", "\\frac{1}{\\sqrt N}"],
  ["1/N", "\\frac{1}{N}"],
  ["√N", "\\sqrt N"],
  ["λ", "\\lambda"],
  ["Av", "Av"],
  ["v", "v"],
  ["c", "c"],
  ["A", "A"],
  ["N", "N"],
]);
const choicePattern = new RegExp([...choiceFormulas.keys()]
  .sort((a, b) => b.length - a.length)
  .map(formula => {
    const pattern = formula.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return /^[a-zA-Z]+$/.test(formula) ? "\\b" + pattern + "\\b" : pattern;
  }).join("|"), "g");

function choiceHtml(text) {
  let html = "";
  let offset = 0;
  for (const { 0: match, index } of text.matchAll(choicePattern)) {
    html += escapeHtml(text.slice(offset, index)) + math(choiceFormulas.get(match));
    offset = index + match.length;
  }
  return html + escapeHtml(text.slice(offset));
}

function answerHtml(markdown) {
  return markdown.replace(/^\*\*Ответ\.\*\*\s*/, "").trim()
    .split(/(\$\$[\s\S]+?\$\$)|\n{2,}/).filter(part => part?.trim())
    .map(part => {
      if (part.startsWith("$$")) return '<div class="formula">' + math(part.slice(2, -2), true) + "</div>";
      if (part.startsWith("- ")) {
        return "<ul>" + part.split("\n").map(line => "<li>" + inline(line.slice(2)) + "</li>").join("") + "</ul>";
      }
      return "<p>" + inline(part) + "</p>";
    }).join("");
}

const questionBank = [];
const survey = 2;
const md = readFileSync(new URL("./Опрос 2 — вопросы и ответы.md", import.meta.url), "utf8")
  .replace(/\r\n/g, "\n");
let topic;
let number = 0;
const sections = md.split(/^(#{2,3} .+)$/gm);
for (let section = 1; section < sections.length; section += 2) {
  const heading = sections[section];
  if (heading.startsWith("## ")) {
    topic = heading.slice(3);
    continue;
  }
  const [, marker, prompt] = heading.match(/^### (\d+)\. (.+)$/);
  if (Number(marker) !== ++number || !distractors[number - 1]) throw Error("Unexpected question " + heading);
  questionBank.push({
    survey,
    number,
    topic,
    prompt: inline(prompt.replace("Av=λv", "$Av=\\lambda v$").replace(/\b[AN]\b/g, symbol =>
      prompt.includes("Av=λv") ? symbol : "$" + symbol + "$")),
    answer: answerHtml(sections[section + 1].trim()),
    choices: distractors[number - 1].map(choiceHtml),
  });
}
if (number !== distractors.length) throw Error("Question count mismatch");

const assetDirectory = new URL("./formulas/", import.meta.url);
const fontSize = 24;
const browser = await chromium.launch({ executablePath: chromiumPath, chromiumSandbox: true });
const images = new Map();
try {
  const page = await browser.newPage({ viewport: { width: 1400, height: 650 }, deviceScaleFactor: 3 });
  const content = [...formulas].map(([id, { markup, displayMode }]) => (
    '<div><div class="frame" id="f-' + id + '">' + markup
      + (displayMode ? "" : '<i class="baseline"></i>') + "</div></div>"
  )).join("\n");
  await page.setContent('<style>html,body{background:transparent;margin:0;color:#e6edff;}'
    + ".frame{display:inline-block;font-size:" + fontSize + "px;padding:3px;}"
    + ".baseline{display:inline-block;width:0;height:0;vertical-align:baseline;}</style>" + content);
  await page.evaluate(() => document.fonts.ready);
  for (const [id, { source, displayMode }] of formulas) {
    const frame = page.locator("#f-" + id);
    const geometry = await frame.evaluate(element => {
      const rect = element.getBoundingClientRect();
      const marker = element.querySelector(".baseline");
      return { width: rect.width, depth: marker ? rect.bottom - marker.getBoundingClientRect().top : 0 };
    });
    const png = await frame.screenshot({ omitBackground: true, animations: "disabled" });
    images.set(id, { png, tag: '<img class="formula-image" src="./formulas/' + id + '.png" alt="'
      + escapeHtml(source.replace(/\s+/g, " ")) + '" style="width:' + (geometry.width / fontSize).toFixed(3)
      + "em;vertical-align:-" + (geometry.depth / fontSize).toFixed(3) + 'em">' });
  }
} finally {
  await browser.close();
}

mkdirSync(assetDirectory, { recursive: true });
for (const [id, image] of images) writeFileSync(new URL(id + ".png", assetDirectory), image.png);
const insertImages = html => html.replace(/\{\{formula:([a-f0-9]+)\}\}/g, (_, id) => images.get(id).tag);
const lines = questionBank.map(question => "  " + JSON.stringify({
  ...question,
  prompt: insertImages(question.prompt),
  answer: insertImages(question.answer),
  choices: question.choices.map(insertImages),
}));
writeFileSync(new URL("./questions.js", import.meta.url),
  "// The first choice is correct.\n"
  + "window.questionBank = [\n" + lines.join(",\n") + "\n];\n");
