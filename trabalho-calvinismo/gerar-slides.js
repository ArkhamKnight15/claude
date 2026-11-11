const pptxgen = require("pptxgenjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require("/root/.claude/skills/synced/9ef7846a-72e7-4fac-bef8-c5a941cf4d2f_62d1af8e-fa06-4fd8-9fc6-ce6f06878c73/pptx/scripts/apply_theme.js");

const OUT = process.argv[2] || "Calvinismo.pptx";

const HEX = {
  dk1: "1E2228", lt1: "FFFFFF", dk2: "2B303A", lt2: "F2F3F5",
  accent1: "8E2A2A", accent2: "B8925A", accent3: "5B6472",
  accent4: "3F5D4C", accent5: "6B7A8F", accent6: "A65E3F",
  hlink: "8E2A2A", folHlink: "5B6472",
};
const THEME = { name: "Calvinismo", headFontFace: "Cambria", bodyFontFace: "Calibri", colors: HEX };

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.title = "Calvinismo — Reforma Protestante";
pres.author = "Luiz, Arthur R., Gustavo A., Erick";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

async function icon(Comp, color, size = 256) {
  const svg = renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- Layouts ----------
const FOOTER = "Reformas Religiosas · Calvinismo";
pres.defineSlideMaster({
  title: "COVER",
  background: { color: C.text1 },
  objects: [],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  margin: [0.4, 0.5, 0.5, 0.5],
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.65, fontFace: THEME.headFontFace, fontSize: 28, bold: true, color: C.text1, valign: "middle", margin: 0 }, text: "" } },
    { text: { text: FOOTER, options: { x: 0.5, y: 5.2, w: 6, h: 0.25, fontSize: 9, color: C.accent3, margin: 0 } } },
  ],
  slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.25, fontSize: 9, color: C.accent3, align: "right", margin: 0 },
});
pres.defineSlideMaster({
  title: "DARK",
  background: { color: C.text1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.65, fontFace: THEME.headFontFace, fontSize: 28, bold: true, color: C.background1, valign: "middle", margin: 0 }, text: "" } },
    { text: { text: FOOTER, options: { x: 0.5, y: 5.2, w: 6, h: 0.25, fontSize: 9, color: C.accent5, margin: 0 } } },
  ],
  slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.25, fontSize: 9, color: C.accent5, align: "right", margin: 0 },
});

// ---------- Helpers ----------
const shadow = () => ({ type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 1.5, angle: 90 });
function card(s, x, y, w, h, fill = C.background2, name = "card") {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { type: "none" }, objectName: name });
}
function circleIcon(s, data, x, y, d, fill = C.accent1, name = "icon") {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" }, objectName: name + " circle" });
  const p = d * 0.25;
  s.addImage({ data, x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, altText: name, objectName: name });
}
function txt(s, text, o) { s.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top" }, o)); }

(async () => {
  const W = HEX.lt1;
  const I = {
    book: await icon(fa.FaBookOpen, W), clock: await icon(fa.FaHourglassHalf, W), map: await icon(fa.FaMapMarkedAlt, W),
    landmark: await icon(fa.FaLandmark, W), user: await icon(fa.FaUserTie, W), users: await icon(fa.FaUsers, W),
    church: await icon(fa.FaChurch, W), crown: await icon(fa.FaCrown, W), coins: await icon(fa.FaCoins, W),
    fire: await icon(fa.FaFire, W), hammer: await icon(fa.FaHammer, W),
    feather: await icon(fa.FaFeatherAlt, W), globe: await icon(fa.FaGlobeEurope, W), scale: await icon(fa.FaBalanceScale, W),
    quote: await icon(fa.FaQuoteLeft, HEX.accent2), split: await icon(fa.FaCodeBranch, W), school: await icon(fa.FaGraduationCap, W),
    shield: await icon(fa.FaShieldAlt, W), info: await icon(fa.FaExclamationCircle, W), unlock: await icon(fa.FaUnlock, W),
    lock: await icon(fa.FaLock, W), bookDark: await icon(fa.FaBook, W), lightbulb: await icon(fa.FaLightbulb, W),
  };

  // 1 — Capa
  pres.addSection({ title: "Abertura" });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: "Abertura" });
  txt(s, "REFORMAS RELIGIOSAS · EUROPA MODERNA", { x: 0.6, y: 0.9, w: 6, h: 0.3, fontSize: 11, bold: true, color: C.accent2, charSpacing: 3 });
  txt(s, "Calvinismo", { x: 0.6, y: 1.3, w: 6, h: 1.0, fontFace: THEME.headFontFace, fontSize: 54, bold: true, color: C.background1, valign: "middle" });
  txt(s, "Fé, disciplina e trabalho: a Reforma de João Calvino e sua expansão pela Europa", { x: 0.6, y: 2.35, w: 5.6, h: 0.8, fontSize: 18, color: C.background2 });
  txt(s, [
    { text: "Grupo", options: { bold: true, color: C.accent2, breakLine: true } },
    { text: "Luiz · Arthur R. · Gustavo A. · Erick", options: { color: C.background1 } },
  ], { x: 0.6, y: 3.85, w: 5.6, h: 0.65, fontSize: 14 });
  txt(s, "Trabalho de História — Infográfico", { x: 0.6, y: 4.65, w: 5.6, h: 0.3, fontSize: 11, color: C.accent5 });
  s.addShape(pres.shapes.OVAL, { x: 6.7, y: 1.2, w: 3.0, h: 3.0, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "cover circle" });
  s.addImage({ data: I.book, x: 7.45, y: 1.95, w: 1.5, h: 1.5, altText: "Bíblia aberta", objectName: "cover icon" });
  txt(s, "Genebra · século XVI", { x: 6.7, y: 4.35, w: 3.0, h: 0.3, fontSize: 12, italic: true, color: C.accent2, align: "center" });
  s.addNotes("Apresentação: Luiz. Abrir com o tema do grupo e o objetivo: entender como a fé calvinista se relacionou com poder, política e sociedade na Europa Moderna.");

  // 2 — Contexto histórico
  pres.addSection({ title: "Contexto" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Contexto" });
  s.addText("Contexto histórico", { placeholder: "title" });
  const ctx = [
    [I.clock, "Quando", "Século XVI, entre c. 1530 e 1600, no auge das Reformas Religiosas."],
    [I.map, "Onde", "Nasce em Genebra (Suíça) e se espalha por França, Escócia, Países Baixos, Inglaterra e parte da Alemanha."],
    [I.church, "Cenário", "Crise da Igreja Católica (indulgências, riqueza do clero), Reforma de Lutero, imprensa difundindo ideias e burguesia em ascensão."],
  ];
  ctx.forEach(([ic, h, b], i) => {
    const y = 1.2 + i * 1.25;
    circleIcon(s, ic, 0.5, y, 0.6, C.accent1, h);
    txt(s, h, { x: 1.3, y, w: 4.4, h: 0.32, fontSize: 15, bold: true, color: C.text1 });
    txt(s, b, { x: 1.3, y: y + 0.34, w: 4.4, h: 0.75, fontSize: 12, color: C.text2 });
  });
  const stats = [["1517", "Lutero publica as 95 teses e inicia a Reforma"], ["1536", "Calvino publica a Instituição da Religião Cristã"], ["1541", "Calvino passa a liderar a Igreja de Genebra"]];
  stats.forEach(([n, l], i) => {
    const y = 1.2 + i * 1.25;
    card(s, 6.1, y, 3.4, 1.05, C.background2, "stat " + n);
    txt(s, n, { x: 6.3, y: y + 0.1, w: 1.3, h: 0.85, fontFace: THEME.headFontFace, fontSize: 30, bold: true, color: C.accent1, valign: "middle" });
    txt(s, l, { x: 7.55, y: y + 0.1, w: 1.8, h: 0.85, fontSize: 11, color: C.text2, valign: "middle" });
  });
  s.addNotes("Apresentação: Luiz. Situar no tempo e no espaço: a Reforma começa com Lutero em 1517; Calvino é da geração seguinte e transforma Genebra em centro da Reforma.");

  // 3 — Personagens e grupos
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Contexto" });
  s.addText("Personagens e grupos envolvidos", { placeholder: "title" });
  const actors = [
    [I.user, "João Calvino", "Teólogo francês (1509–1564). Interesse: reformar a fé tendo a Bíblia como única autoridade."],
    [I.feather, "John Knox", "Reformador escocês formado em Genebra. Interesse: levar a Reforma à Escócia (presbiterianismo)."],
    [I.users, "Huguenotes", "Calvinistas franceses. Interesse: liberdade de culto e espaço político numa França católica."],
    [I.book, "Puritanos", "Protestantes ingleses. Interesse: “purificar” a Igreja Anglicana de práticas católicas."],
    [I.coins, "Burguesia e comerciantes", "Interesse: valorização do trabalho e menos interferência da Igreja nos negócios."],
    [I.crown, "Igreja Católica e reis católicos", "Interesse: manter a unidade religiosa e a própria autoridade, contendo o protestantismo."],
  ];
  actors.forEach(([ic, h, b], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.5 + col * 3.05, y = 1.15 + row * 1.95, w = 2.9, hh = 1.8;
    card(s, x, y, w, hh, C.background2, h);
    circleIcon(s, ic, x + 0.2, y + 0.2, 0.5, i === 5 ? C.accent3 : C.accent1, h);
    txt(s, h, { x: x + 0.8, y: y + 0.2, w: w - 0.95, h: 0.5, fontSize: 13, bold: true, color: C.text1, valign: "middle" });
    txt(s, b, { x: x + 0.2, y: y + 0.82, w: w - 0.4, h: 0.9, fontSize: 11, color: C.text2 });
  });
  s.addNotes("Apresentação: Luiz. Destacar que cada grupo tinha interesses religiosos, mas também políticos e econômicos.");

  // 4 — Quem foi Calvino
  pres.addSection({ title: "Conceitos" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Conceitos" });
  s.addText("Quem foi João Calvino?", { placeholder: "title" });
  card(s, 0.5, 1.15, 3.6, 3.8, C.text1, "perfil");
  circleIcon(s, I.user, 0.75, 1.4, 0.8, C.accent1, "Calvino");
  txt(s, "João Calvino", { x: 1.75, y: 1.4, w: 2.2, h: 0.4, fontFace: THEME.headFontFace, fontSize: 18, bold: true, color: C.background1 });
  txt(s, "1509–1564 · Noyon (França) → Genebra", { x: 1.75, y: 1.8, w: 2.25, h: 0.45, fontSize: 10, color: C.accent2 });
  txt(s, "Teólogo e reformador francês, um dos maiores líderes da Reforma Protestante. Em Genebra criou o Calvinismo e atacou dogmas e práticas da Igreja Católica. Em 1536 publicou sua obra principal, a Instituição da Religião Cristã.", { x: 0.75, y: 2.45, w: 3.1, h: 2.3, fontSize: 12, color: C.background2, paraSpaceAfter: 4 });
  txt(s, "Aspectos básicos da doutrina", { x: 4.5, y: 1.15, w: 5, h: 0.35, fontSize: 15, bold: true, color: C.text1 });
  const pillars = [
    ["Soberania de Deus", "Deus governa absolutamente tudo."],
    ["Autoridade das Escrituras", "A Bíblia é a única autoridade religiosa."],
    ["Salvação pela graça", "Depende de Deus, não das obras humanas."],
    ["Predestinação", "Deus escolheu desde a eternidade os salvos."],
    ["Disciplina e trabalho", "Viver pela fé, com responsabilidade e diligência."],
  ];
  pillars.forEach(([h, b], i) => {
    const y = 1.65 + i * 0.66;
    s.addShape(pres.shapes.OVAL, { x: 4.5, y, w: 0.46, h: 0.46, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "num " + (i + 1) });
    txt(s, String(i + 1), { x: 4.5, y, w: 0.46, h: 0.46, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle" });
    txt(s, [{ text: h, options: { bold: true, color: C.text1, breakLine: true } }, { text: b, options: { color: C.text2 } }], { x: 5.15, y: y - 0.04, w: 4.35, h: 0.58, fontSize: 12 });
  });
  s.addNotes("Apresentação: Arthur R. Quem foi Calvino e os cinco pontos básicos da doutrina.");

  // 5 — Predestinação
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Conceitos" });
  s.addText("O que é predestinação?", { placeholder: "title" });
  s.addImage({ data: I.quote, x: 0.5, y: 1.2, w: 0.5, h: 0.5, altText: "aspas", objectName: "quote mark" });
  txt(s, "Deus já escolheu, desde a eternidade, aqueles que serão salvos.", { x: 1.2, y: 1.15, w: 8.3, h: 0.9, fontFace: THEME.headFontFace, fontSize: 24, italic: true, color: C.background1, valign: "middle" });
  const pred = [
    [I.lock, "A salvação não se compra", "Nem riquezas, nem doações à Igreja, nem indulgências ou boas ações garantem a salvação."],
    [I.crown, "A vontade de Deus é soberana", "É incompreensível para os homens e superior às suas ações e interesses."],
    [I.hammer, "Efeito na vida dos fiéis", "Estimulou o hábito da disciplina, do trabalho e da devoção religiosa."],
  ];
  pred.forEach(([ic, h, b], i) => {
    const x = 0.5 + i * 3.05;
    card(s, x, 2.45, 2.9, 2.45, C.text2, h);
    circleIcon(s, ic, x + 0.25, 2.7, 0.55, C.accent1, h);
    txt(s, h, { x: x + 0.25, y: 3.4, w: 2.4, h: 0.5, fontSize: 14, bold: true, color: C.background1 });
    txt(s, b, { x: x + 0.25, y: 3.9, w: 2.4, h: 0.9, fontSize: 11, color: C.background2 });
  });
  s.addNotes("Apresentação: Arthur R. Mesmo com toda a devoção e trabalho, a salvação dependia só da vontade de Deus.");

  // 6 — Conceitos fundamentais
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Conceitos" });
  s.addText("Conceitos fundamentais", { placeholder: "title" });
  const terms = [
    ["Reforma Protestante", "Movimento do século XVI que rompeu com a Igreja Católica e criou novas igrejas cristãs."],
    ["Indulgências", "Perdão de penas pelos pecados concedido pela Igreja, muitas vezes vendido — alvo central das críticas."],
    ["Sola Scriptura", "Princípio de que só a Bíblia é autoridade em matéria de fé, acima da tradição e do papa."],
    ["Huguenotes", "Nome dado aos calvinistas franceses, perseguidos e envolvidos nas guerras religiosas."],
    ["Presbiterianismo", "Igreja governada por presbíteros (anciãos) eleitos; forma calvinista adotada na Escócia."],
    ["Ética protestante", "Conceito de Max Weber: valores como disciplina e trabalho favoreceram a mentalidade capitalista."],
  ];
  terms.forEach(([h, b], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.5 + col * 4.6, y = 1.15 + row * 1.3, w = 4.4;
    card(s, x, y, w, 1.15, C.background2, h);
    txt(s, h, { x: x + 0.25, y: y + 0.15, w: w - 0.5, h: 0.32, fontSize: 14, bold: true, color: C.accent1 });
    txt(s, b, { x: x + 0.25, y: y + 0.5, w: w - 0.5, h: 0.55, fontSize: 11, color: C.text2 });
  });
  s.addNotes("Apresentação: Arthur R. Explicar rapidamente cada termo; eles reaparecem no restante da apresentação.");

  // 7 — Linha do tempo
  pres.addSection({ title: "Acontecimentos" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Acontecimentos" });
  s.addText("Acontecimentos principais", { placeholder: "title" });
  const events = [
    ["1517", "Lutero publica as 95 teses"],
    ["1536", "Calvino publica a Instituição da Religião Cristã"],
    ["1541", "Calvino organiza a Igreja de Genebra"],
    ["1553", "Miguel Servet é executado em Genebra por heresia"],
    ["1560", "Escócia adota a Reforma liderada por John Knox"],
    ["1562", "Começam as guerras religiosas na França"],
    ["1572", "Noite de São Bartolomeu: massacre de huguenotes"],
    ["1598", "Édito de Nantes concede tolerância aos huguenotes"],
  ];
  const lineY = 3.05, step = 9 / 8;
  s.addShape(pres.shapes.LINE, { x: 0.5, y: lineY, w: 9, h: 0, line: { color: C.accent3, width: 1.5 }, objectName: "timeline" });
  events.forEach(([yr, d], i) => {
    const cx = 0.5 + step * (i + 0.5);
    const up = i % 2 === 0;
    s.addShape(pres.shapes.OVAL, { x: cx - 0.11, y: lineY - 0.11, w: 0.22, h: 0.22, fill: { color: C.accent1 }, line: { color: C.background1, width: 2 }, objectName: "dot " + yr });
    s.addShape(pres.shapes.LINE, { x: cx, y: up ? lineY - 0.45 : lineY + 0.11, w: 0, h: 0.34, line: { color: C.accent3, width: 0.75 }, objectName: "tick " + yr });
    const bw = (i === 0 || i === 7) ? 1.12 : 2.0, bx = cx - bw / 2;
    if (up) {
      txt(s, yr, { x: bx, y: 1.2, w: bw, h: 0.4, fontFace: THEME.headFontFace, fontSize: 18, bold: true, color: C.accent1, align: "center" });
      txt(s, d, { x: bx, y: 1.6, w: bw, h: 0.95, fontSize: 11, color: C.text2, align: "center" });
    } else {
      txt(s, yr, { x: bx, y: 3.55, w: bw, h: 0.4, fontFace: THEME.headFontFace, fontSize: 18, bold: true, color: C.accent1, align: "center" });
      txt(s, d, { x: bx, y: 3.95, w: bw, h: 0.95, fontSize: 11, color: C.text2, align: "center" });
    }
  });
  s.addNotes("Apresentação: Gustavo A. Percorrer a linha do tempo da esquerda para a direita. Datas: 1559 também marca a fundação da Academia de Genebra, que formou pregadores; Calvino morre em 1564.");

  // 8 — Difusão pela Europa
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Acontecimentos" });
  s.addText("Difusão do Calvinismo pela Europa", { placeholder: "title" });
  card(s, 0.5, 1.15, 3.0, 3.8, C.text1, "Genebra");
  circleIcon(s, I.globe, 0.75, 1.4, 0.7, C.accent1, "Genebra");
  txt(s, "Genebra, Suíça", { x: 0.75, y: 2.25, w: 2.5, h: 0.4, fontFace: THEME.headFontFace, fontSize: 18, bold: true, color: C.background1 });
  txt(s, "Centro propagador da Reforma: religiosos de várias partes foram treinados ali para espalhar a nova doutrina.", { x: 0.75, y: 2.7, w: 2.5, h: 1.1, fontSize: 11, color: C.background2 });
  txt(s, "Como se espalhou: livros, pregadores, formação de religiosos e apoio de governantes.", { x: 0.75, y: 3.9, w: 2.5, h: 0.9, fontSize: 11, italic: true, color: C.accent2 });
  const regions = [
    ["França", "Muitos adeptos, os huguenotes; conflitos com os católicos."],
    ["Escócia", "Influenciou John Knox e fortaleceu o Presbiterianismo."],
    ["Países Baixos", "Apoio de grupos sociais e da resistência ao domínio espanhol."],
    ["Inglaterra", "Influenciou os protestantes, principalmente os puritanos."],
    ["Alemanha", "Alcançou algumas regiões, como o Palatinado."],
  ];
  regions.forEach(([h, b], i) => {
    const y = 1.15 + i * 0.78;
    card(s, 3.75, y, 5.75, 0.66, C.background2, h);
    s.addShape(pres.shapes.OVAL, { x: 3.95, y: y + 0.21, w: 0.24, h: 0.24, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "pin " + h });
    txt(s, h, { x: 4.35, y: y + 0.08, w: 1.45, h: 0.5, fontSize: 13, bold: true, color: C.text1, valign: "middle" });
    txt(s, b, { x: 5.8, y: y + 0.08, w: 3.55, h: 0.5, fontSize: 11, color: C.text2, valign: "middle" });
  });
  s.addNotes("Apresentação: Gustavo A. Da Suíça, o Calvinismo se tornou uma das principais correntes do Protestantismo na Europa.");

  // 9 — Disputas de poder
  pres.addSection({ title: "Poder e sociedade" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Poder e sociedade" });
  s.addText("Disputas de poder", { placeholder: "title" });
  const power = [
    [I.church, "Religiosas", ["Disputa pela “verdadeira fé” entre católicos e protestantes", "Controle de igrejas, templos, sermões e ensino"]],
    [I.crown, "Políticas", ["Reis e nobres usaram a religião para ampliar poder", "Huguenotes contra a Coroa francesa", "Países Baixos contra o domínio da Espanha"]],
    [I.coins, "Econômicas", ["Terras e bens da Igreja em disputa", "Burguesia queria menos interferência nos negócios", "Valorização do trabalho e do lucro honesto"]],
  ];
  power.forEach(([ic, h, items], i) => {
    const x = 0.5 + i * 3.05;
    card(s, x, 1.15, 2.9, 3.8, C.background2, h);
    circleIcon(s, ic, x + 0.25, 1.4, 0.6, i === 0 ? C.accent1 : i === 1 ? C.accent3 : C.accent2, h);
    txt(s, h, { x: x + 1.0, y: 1.4, w: 1.7, h: 0.6, fontFace: THEME.headFontFace, fontSize: 18, bold: true, color: C.text1, valign: "middle" });
    txt(s, items.map((t, j) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: j < items.length - 1 } })), { x: x + 0.25, y: 2.3, w: 2.45, h: 2.55, fontSize: 14, color: C.text2, paraSpaceAfter: 10 });
  });
  s.addNotes("Apresentação: Gustavo A. Mostrar que religião, política e economia estavam entrelaçadas.");

  // 10 — Calvinismo e burguesia
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Poder e sociedade" });
  s.addText("Calvinismo e a burguesia", { placeholder: "title" });
  txt(s, "Comerciantes e setores da burguesia viram afinidade entre seus valores e os princípios calvinistas — e a Reforma ainda reduzia a influência católica sobre a sociedade e as instituições locais.", { x: 0.5, y: 1.15, w: 4.5, h: 1.1, fontSize: 13, color: C.text2 });
  const values = ["Disciplina", "Trabalho", "Responsabilidade", "Organização", "Honestidade nos negócios"];
  values.forEach((v, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const w = i === 4 ? 4.5 : 2.2;
    const x = 0.5 + col * 2.3, y = 2.45 + row * 0.6;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.45, rectRadius: 0.22, fill: { color: C.background2 }, line: { color: C.accent2, width: 1 }, objectName: "valor " + v });
    txt(s, v, { x, y, w, h: 0.45, fontSize: 12, bold: true, color: C.text1, align: "center", valign: "middle" });
  });
  card(s, 5.3, 1.15, 4.2, 2.7, C.text1, "Weber");
  circleIcon(s, I.bookDark, 5.55, 1.4, 0.55, C.accent1, "livro");
  txt(s, [{ text: "Max Weber", options: { bold: true, color: C.background1, breakLine: true } }, { text: "A Ética Protestante e o Espírito do Capitalismo (1905)", options: { italic: true, color: C.accent2 } }], { x: 6.25, y: 1.38, w: 3.1, h: 0.75, fontSize: 12 });
  txt(s, "Analisou como valores ligados ao Protestantismo — disciplina, trabalho e organização da vida — poderiam favorecer uma mentalidade adequada ao capitalismo.", { x: 5.55, y: 2.3, w: 3.7, h: 1.4, fontSize: 12, color: C.background2 });
  card(s, 0.5, 4.15, 9.0, 0.8, C.background2, "atenção");
  circleIcon(s, I.info, 0.7, 4.3, 0.5, C.accent1, "atenção");
  txt(s, [{ text: "Atenção: ", options: { bold: true, color: C.accent1 } }, { text: "o Calvinismo não originou o capitalismo, que já se desenvolvia antes da Reforma e teve outros fatores econômicos, políticos e sociais. A relação foi de afinidade de valores.", options: { color: C.text2 } }], { x: 1.35, y: 4.22, w: 8.0, h: 0.66, fontSize: 11, valign: "middle" });
  s.addNotes("Apresentação: Gustavo A. Ressaltar a ressalva final: afinidade, não causa.");

  // 11 — Consequências
  pres.addSection({ title: "Conclusão" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Conclusão" });
  s.addText("Consequências", { placeholder: "title" });
  const cons = [
    [I.split, "Cristandade fragmentada", "Fim da unidade religiosa da Europa ocidental sob Roma."],
    [I.church, "Novas igrejas", "Reformadas, presbiterianas e grupos puritanos se consolidam."],
    [I.fire, "Guerras religiosas", "Conflitos na França e nos Países Baixos, como São Bartolomeu (1572)."],
    [I.hammer, "Trabalho valorizado", "Disciplina e diligência ganham peso moral na vida cotidiana."],
    [I.school, "Educação e leitura", "Incentivo à leitura da Bíblia e à formação, como a Academia de Genebra."],
    [I.shield, "Reação católica", "A Contrarreforma e o Concílio de Trento (1545–1563) respondem ao avanço protestante."],
  ];
  cons.forEach(([ic, h, b], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.5 + col * 3.05, y = 1.15 + row * 1.95;
    card(s, x, y, 2.9, 1.8, C.background2, h);
    circleIcon(s, ic, x + 0.2, y + 0.2, 0.5, C.accent1, h);
    txt(s, h, { x: x + 0.8, y: y + 0.2, w: 1.95, h: 0.5, fontSize: 13, bold: true, color: C.text1, valign: "middle" });
    txt(s, b, { x: x + 0.2, y: y + 0.85, w: 2.5, h: 0.85, fontSize: 11, color: C.text2 });
  });
  s.addNotes("Apresentação: Erick. Transformações provocadas pelo movimento.");

  // 12 — Análise crítica
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Conclusão" });
  s.addText("Análise crítica", { placeholder: "title" });
  txt(s, "As Reformas ampliaram a liberdade de pensamento ou apenas substituíram uma autoridade religiosa por outra?", { x: 0.5, y: 1.0, w: 9, h: 0.6, fontFace: THEME.headFontFace, fontSize: 15, italic: true, color: C.accent2 });
  const sides = [
    [I.unlock, "Ampliaram", ["Quebraram o monopólio da Igreja Católica", "Incentivaram a leitura individual da Bíblia", "Inspiraram resistência a reis, como nos Países Baixos"]],
    [I.lock, "Substituíram", ["Genebra impôs rígida disciplina moral", "Miguel Servet foi executado por heresia (1553)", "Católicos e calvinistas perseguiram dissidentes"]],
  ];
  sides.forEach(([ic, h, items], i) => {
    const x = 0.5 + i * 4.6;
    card(s, x, 1.75, 4.4, 2.0, C.text2, h);
    circleIcon(s, ic, x + 0.25, 1.95, 0.5, i === 0 ? C.accent4 : C.accent1, h);
    txt(s, h, { x: x + 0.9, y: 1.95, w: 3.3, h: 0.5, fontSize: 15, bold: true, color: C.background1, valign: "middle" });
    txt(s, items.map((t, j) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: j < items.length - 1 } })), { x: x + 0.25, y: 2.6, w: 3.95, h: 1.05, fontSize: 11, color: C.background2, paraSpaceAfter: 3 });
  });
  card(s, 0.5, 3.95, 9.0, 1.05, C.accent1, "conclusão");
  circleIcon(s, I.lightbulb, 0.7, 4.22, 0.5, C.text1, "conclusão");
  txt(s, [{ text: "Nossa conclusão: ", options: { bold: true } }, { text: "o Calvinismo fragmentou a autoridade religiosa e abriu caminho para o pluralismo, mas não foi tolerante em si. A liberdade religiosa veio depois, como resultado dos conflitos — por exemplo, o Édito de Nantes (1598)." }], { x: 1.4, y: 4.05, w: 7.9, h: 0.85, fontSize: 12, color: C.background1, valign: "middle" });
  s.addNotes("Apresentação: Erick. Resposta ao desafio crítico e à questão do debate coletivo: as Reformas fragmentaram a cristandade, mas isso não significou automaticamente tolerância.");

  // 13 — Referências
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Conclusão" });
  s.addText("Referências", { placeholder: "title" });
  const refs = [
    ["Brasil Escola", "CALVINISMO. Brasil Escola (UOL). Acesso em: nov. 2026.", "brasilescola.uol.com.br/historiag/calvinismo.htm"],
    ["Toda Matéria", "CALVINISMO. Toda Matéria. Acesso em: nov. 2026.", "todamateria.com.br/calvinismo"],
    ["Obra citada", "WEBER, Max. A Ética Protestante e o Espírito do Capitalismo. São Paulo: Companhia das Letras, 2004. (Original de 1905.)", ""],
  ];
  refs.forEach(([tag, t, url], i) => {
    const y = 1.15 + i * 1.3;
    card(s, 0.5, y, 9.0, 1.15, C.background2, tag);
    circleIcon(s, i === 2 ? I.bookDark : I.globe, 0.75, y + 0.3, 0.55, i === 2 ? C.accent3 : C.accent1, tag);
    txt(s, tag, { x: 1.55, y: y + 0.15, w: 7.7, h: 0.3, fontSize: 14, bold: true, color: C.text1 });
    const runs = [{ text: t, options: { color: C.text2, breakLine: !!url } }];
    if (url) runs.push({ text: "Disponível em: " + url, options: { color: C.accent1, hyperlink: { url: "https://" + url + (url.endsWith(".htm") ? "" : "/") } } });
    txt(s, runs, { x: 1.55, y: y + 0.48, w: 7.7, h: 0.6, fontSize: 11 });
  });
  s.addNotes("Apresentação: Erick. Encerrar agradecendo e abrindo para perguntas.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
