// Gera "IA - Anthropic - Claude.pptx"
// Uso: node gerar.js  (requer pptxgenjs, react, react-dom, react-icons, sharp)
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const Lu = require("react-icons/lu");
const { applyTheme } = require(process.env.PPTX_SKILL_DIR
  ? path.join(process.env.PPTX_SKILL_DIR, "scripts/apply_theme.js")
  : "./apply_theme.js");

const OUT = path.join(__dirname, "IA - Anthropic - Claude.pptx");

const THEME = {
  name: "IA ao Claude",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1F1E1D", // tinta
    lt1: "FFFFFF",
    dk2: "3D3929", // texto de corpo
    lt2: "F4F3EE", // cartões
    accent1: "C15F3C", // argila (destaque)
    accent2: "5B87B5", // azul
    accent3: "6E8350", // oliva
    accent4: "D9A441", // dourado
    accent5: "4A4743", // cinza escuro (texto suave / funil no escuro)
    accent6: "B0AEA5", // cinza claro
    hlink: "C15F3C",
    folHlink: "6E8350",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Luiz";
pres.title = "Inteligência Artificial: da IA ao Claude";
pres.subject = "Apresentação escolar — 1ºB Ensino Médio";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

const W = 13.333;
const M = 0.6;
const STEPS = ["IA", "Anthropic", "Claude", "Modelos", "Futuro"];
const FOOTER = "Luiz · 1ºB · Da IA ao Claude";

// ---------- Ícones ----------
async function icon(Comp, hex) {
  const svg = renderToStaticMarkup(React.createElement(Comp, { size: 256, color: "#" + hex }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "CAPA",
  background: { color: C.text1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 2.3, w: 7.4, h: 2.2, fontFace: THEME.headFontFace, fontSize: 48, bold: true, color: C.background1, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 4.6, w: 7.4, h: 0.9, fontSize: 20, color: C.accent6, valign: "top", margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "DIVISOR",
  background: { color: C.text1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 3.25, w: 6.6, h: 1.2, fontFace: THEME.headFontFace, fontSize: 44, bold: true, color: C.background1, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 4.5, w: 6.6, h: 1.2, fontSize: 18, color: C.accent6, valign: "top", margin: 0 }, text: "" } },
    { text: { text: FOOTER, options: { x: M, y: 6.95, w: 6, h: 0.3, fontSize: 10, color: C.accent6, margin: 0 } } },
  ],
  slideNumber: { x: 12.1, y: 6.95, w: 0.63, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
});

pres.defineSlideMaster({
  title: "CONTEUDO",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 0.85, w: 12.1, h: 0.85, fontFace: THEME.headFontFace, fontSize: 34, bold: true, color: C.text1, valign: "middle", margin: 0 }, text: "" } },
    { text: { text: FOOTER, options: { x: M, y: 6.95, w: 6, h: 0.3, fontSize: 10, color: C.accent5, margin: 0 } } },
  ],
  slideNumber: { x: 12.1, y: 6.95, w: 0.63, h: 0.3, fontSize: 10, color: C.accent5, align: "right" },
});

// ---------- Componentes ----------
// Trilha "IA › Anthropic › Claude › Modelos › Futuro" com a etapa atual destacada
function trilha(slide, ativo, escuro = false) {
  let x = M;
  STEPS.forEach((s, i) => {
    const w = 0.11 * s.length + 0.42;
    if (i === ativo) {
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 0.32, w, h: 0.32, rectRadius: 0.16, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "Trilha ativa" });
    }
    slide.addText(s, {
      x, y: 0.32, w, h: 0.32, fontSize: 11, bold: i === ativo, align: "center", valign: "middle", margin: 0, isTextBox: true,
      color: i === ativo ? C.background1 : escuro ? C.accent6 : C.accent5, objectName: "Trilha " + s,
    });
    x += w;
    if (i < STEPS.length - 1) {
      slide.addText("›", { x, y: 0.32, w: 0.22, h: 0.32, fontSize: 12, align: "center", valign: "middle", margin: 0, isTextBox: true, color: C.accent6 });
      x += 0.22;
    }
  });
}

// Funil: do geral (largo) ao específico (estreito)
function funil(slide, { x, y, w, barH = 0.62, gap = 0.14, ativo = -1, escuro = true, todos = false }) {
  STEPS.forEach((s, i) => {
    const bw = w * (1 - i * 0.16);
    const bx = x + (w - bw) / 2;
    const by = y + i * (barH + gap);
    const on = todos || i === ativo;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx, y: by, w: bw, h: barH, rectRadius: 0.1, line: { type: "none" },
      fill: { color: on ? C.accent1 : escuro ? C.accent5 : C.background2 }, objectName: "Funil " + s,
    });
    slide.addText(`${String(i + 1).padStart(2, "0")}  ${s}`, {
      x: bx, y: by, w: bw, h: barH, align: "center", valign: "middle", margin: 0, isTextBox: true,
      fontSize: 16, bold: on, color: on ? C.background1 : escuro ? C.accent6 : C.text2,
    });
  });
}

async function circulo(slide, Comp, x, y, d, { fill = C.background2, hex = HEX.accent1 } = {}) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" }, objectName: "Círculo de ícone" });
  const p = d * 0.25;
  slide.addImage({ data: await icon(Comp, hex), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, altText: "" });
}

function cartao(slide, x, y, w, h, fill = C.background2) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { type: "none" }, objectName: "Cartão" });
}

function texto(slide, t, opts) {
  slide.addText(t, { isTextBox: true, margin: 0, valign: "top", color: C.text2, fontSize: 15, ...opts });
}

function conteudo(sec, titulo, etapa) {
  const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: sec });
  s.addText(titulo, { placeholder: "title" });
  trilha(s, etapa);
  return s;
}

function divisor(sec, etapa, titulo, sub, notas) {
  const s = pres.addSlide({ masterName: "DIVISOR", sectionTitle: sec });
  trilha(s, etapa, true);
  s.addText(String(etapa + 1).padStart(2, "0"), { x: M, y: 1.75, w: 3, h: 1.4, fontFace: THEME.headFontFace, fontSize: 88, bold: true, color: C.accent1, margin: 0, isTextBox: true, valign: "bottom" });
  s.addText(titulo, { placeholder: "title" });
  s.addText(sub, { placeholder: "body" });
  funil(s, { x: 7.9, y: 1.75, w: 4.83, ativo: etapa });
  s.addNotes(notas);
  return s;
}

// ---------- Slides ----------
(async () => {
  // 1 — Capa
  pres.addSection({ title: "Abertura" });
  {
    const s = pres.addSlide({ masterName: "CAPA", sectionTitle: "Abertura" });
    s.addText("APRESENTAÇÃO · TEMA LIVRE", { x: M, y: 1.7, w: 7, h: 0.4, fontSize: 13, bold: true, charSpacing: 3, color: C.accent1, margin: 0, isTextBox: true });
    s.addText("Inteligência Artificial: da IA ao Claude", { placeholder: "title" });
    s.addText("Luiz · 1ºB · Ensino Médio", { placeholder: "body" });
    funil(s, { x: 8.3, y: 1.6, w: 4.43, barH: 0.7, gap: 0.16, todos: false, ativo: -1 });
    s.addText("do geral ao específico", { x: 8.3, y: 5.95, w: 4.43, h: 0.35, fontSize: 13, italic: true, color: C.accent6, align: "center", margin: 0, isTextBox: true });
    s.addNotes("Bom dia/boa tarde! Meu nome é Luiz, sou do 1ºB, e hoje vou falar sobre Inteligência Artificial. A ideia é começar pelo assunto mais amplo e ir afunilando: primeiro a IA em geral, depois uma empresa específica, a Anthropic, depois o produto dela, o Claude, os modelos que existem e, por fim, o futuro.");
  }

  // 2 — Roteiro
  {
    const s = conteudo("Abertura", "O caminho da apresentação", -1);
    funil(s, { x: M, y: 2.0, w: 6.2, barH: 0.72, gap: 0.16, escuro: false, todos: true });
    const itens = [
      ["IA", "O que é, de onde veio e como funciona"],
      ["Anthropic", "A empresa e sua aposta em segurança"],
      ["Claude", "O assistente: o que faz e onde usar"],
      ["Modelos", "Haiku, Sonnet, Opus e a evolução"],
      ["Futuro", "Oportunidades, desafios e o nosso papel"],
    ];
    itens.forEach(([t, d], i) => {
      texto(s, [{ text: t, options: { bold: true, color: C.text1, breakLine: true } }, { text: d, options: { fontSize: 14, color: C.accent5 } }], { x: 7.4, y: 2.0 + i * 0.88, w: 5.3, h: 0.72, valign: "middle", fontSize: 16 });
    });
    s.addNotes("Este é o roteiro. Pensem num funil: começa largo, com a IA em geral, e vai ficando cada vez mais específico até chegar nos modelos do Claude. No final, abro de novo para pensar no futuro e no que isso muda para nós, estudantes.");
  }

  // ===== 01 IA =====
  pres.addSection({ title: "01 · Inteligência Artificial" });
  divisor("01 · Inteligência Artificial", 0, "Inteligência Artificial", "O panorama geral: o que é, de onde veio e como funciona",
    "Primeira parte: o assunto mais geral de todos, a Inteligência Artificial.");

  // 4 — O que é IA
  {
    const s = conteudo("01 · Inteligência Artificial", "O que é Inteligência Artificial?", 0);
    texto(s, "Sistemas de computador capazes de realizar tarefas que normalmente exigiriam inteligência humana.", { x: M, y: 2.05, w: 5.4, h: 1.3, fontSize: 22, color: C.text1, fontFace: THEME.headFontFace });
    texto(s, "Em vez de seguir só regras escritas à mão, a IA aprende com exemplos: vê milhões de casos e descobre os padrões sozinha.", { x: M, y: 3.55, w: 5.4, h: 1.2, fontSize: 16 });
    texto(s, "Ela entende linguagem, reconhece imagens e sons, faz previsões e toma decisões.", { x: M, y: 4.85, w: 5.4, h: 0.9, fontSize: 16 });
    s.addText("Você já usa IA todo dia", { x: 6.7, y: 2.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: C.accent1, margin: 0, isTextBox: true });
    const ex = [
      [Lu.LuClapperboard, "Recomendações", "Vídeos e músicas sugeridos no streaming e nas redes"],
      [Lu.LuMap, "GPS e trânsito", "Rotas que desviam do engarrafamento em tempo real"],
      [Lu.LuScanFace, "Desbloqueio facial", "O celular reconhece o seu rosto"],
      [Lu.LuLanguages, "Tradutores e voz", "Tradução automática e assistentes de voz"],
    ];
    for (let i = 0; i < 4; i++) {
      const cx = 6.7 + (i % 2) * 3.05, cy = 2.6 + Math.floor(i / 2) * 2.1;
      cartao(s, cx, cy, 2.85, 1.9);
      await circulo(s, ex[i][0], cx + 0.25, cy + 0.25, 0.6, { fill: C.background1 });
      texto(s, ex[i][1], { x: cx + 0.25, y: cy + 0.95, w: 2.4, h: 0.3, fontSize: 15, bold: true, color: C.text1 });
      texto(s, ex[i][2], { x: cx + 0.25, y: cy + 1.25, w: 2.45, h: 0.6, fontSize: 12, color: C.accent5 });
    }
    s.addNotes("IA é quando um computador faz algo que antes só uma pessoa conseguiria, como entender uma frase ou reconhecer um rosto. O segredo é que ela aprende com exemplos, em vez de alguém programar cada regra. E a gente já usa isso o tempo todo: recomendações de vídeo, GPS, desbloqueio facial, tradutor.");
  }

  // 5 — Linha do tempo
  {
    const s = conteudo("01 · Inteligência Artificial", "Uma história de mais de 70 anos", 0);
    const marcos = [
      ["1950", "Alan Turing propõe o “Teste de Turing”: uma máquina pode pensar?"],
      ["1956", "Conferência de Dartmouth cria o termo “Inteligência Artificial”"],
      ["1997", "Deep Blue, da IBM, vence o campeão mundial de xadrez Garry Kasparov"],
      ["2012", "Deep learning revoluciona o reconhecimento de imagens"],
      ["2017", "Pesquisadores do Google criam o Transformer, base dos chatbots atuais"],
      ["2022", "ChatGPT é lançado e a IA conversacional vira assunto no mundo todo"],
    ];
    const lineY = 3.35, step = 12.1 / 6;
    s.addShape(pres.shapes.LINE, { x: M + step / 2, y: lineY, w: step * 5, h: 0, line: { color: C.accent6, width: 1.5 }, objectName: "Linha do tempo" });
    marcos.forEach(([ano, d], i) => {
      const cx = M + step * i + step / 2;
      const last = i === marcos.length - 1;
      s.addShape(pres.shapes.OVAL, { x: cx - 0.13, y: lineY - 0.13, w: 0.26, h: 0.26, fill: { color: last ? C.accent1 : C.background1 }, line: { color: C.accent1, width: 2 }, objectName: "Marco " + ano });
      s.addText(ano, { x: cx - step / 2, y: 2.3, w: step, h: 0.7, fontFace: THEME.headFontFace, fontSize: 30, bold: true, align: "center", color: last ? C.accent1 : C.text1, margin: 0, isTextBox: true });
      texto(s, d, { x: cx - step / 2 + 0.12, y: 3.75, w: step - 0.24, h: 1.6, fontSize: 14, align: "center" });
    });
    cartao(s, M, 5.6, 12.1, 1.0);
    texto(s, [{ text: "Por que agora?  ", options: { bold: true, color: C.accent1 } }, { text: "computadores muito mais potentes + uma quantidade enorme de dados na internet + algoritmos melhores." }], { x: M + 0.35, y: 5.6, w: 11.4, h: 1.0, valign: "middle", fontSize: 16 });
    s.addNotes("A IA não nasceu ontem. Em 1950 Alan Turing já perguntava se máquinas poderiam pensar. Em 1956 surgiu o nome 'Inteligência Artificial'. Em 1997 um computador venceu o campeão mundial de xadrez. Em 2012 o deep learning deu um salto, em 2017 o Google criou o Transformer, que é a base dos chatbots, e em 2022 o ChatGPT popularizou tudo. Isso aconteceu agora porque juntamos computadores potentes, muitos dados e algoritmos melhores.");
  }

  // 6 — Como um chatbot "pensa"
  {
    const s = conteudo("01 · Inteligência Artificial", "Como um chatbot “pensa”?", 0);
    const passos = [
      [Lu.LuBookOpen, "Lê", "Treina com uma quantidade gigante de textos"],
      [Lu.LuNetwork, "Aprende padrões", "Descobre como as palavras costumam se combinar"],
      [Lu.LuSparkles, "Prevê", "Escolhe a próxima palavra mais provável, uma por vez"],
      [Lu.LuUsers, "É ajustado", "Pessoas avaliam respostas e o modelo é refinado"],
    ];
    for (let i = 0; i < 4; i++) {
      const y = 2.05 + i * 1.18;
      await circulo(s, passos[i][0], M, y, 0.8);
      texto(s, [{ text: `${i + 1}. ${passos[i][1]}`, options: { bold: true, color: C.text1, breakLine: true } }, { text: passos[i][2], options: { fontSize: 14, color: C.accent5 } }], { x: M + 1.05, y, w: 4.9, h: 0.8, valign: "middle", fontSize: 17 });
    }
    cartao(s, 6.9, 2.05, 5.8, 4.6);
    texto(s, [{ text: "Exemplo: ", options: { bold: true, color: C.accent1 } }, { text: "“O céu está ___”", options: { bold: true, color: C.text1 } }], { x: 7.2, y: 2.3, w: 5.2, h: 0.4, fontSize: 18 });
    s.addChart(pres.charts.BAR, [{ name: "Probabilidade", labels: ["azul", "nublado", "lindo", "escuro", "verde"], values: [62, 18, 11, 6, 3] }], {
      x: 7.0, y: 2.8, w: 5.6, h: 3.35, barDir: "bar", catAxisOrientation: "maxMin",
      chartColors: [HEX.accent1], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', dataLabelColor: C.text2, dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt",
      catAxisLabelColor: C.text2, catAxisLabelFontSize: 13, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      catAxisLineShow: false, showLegend: false, barGapWidthPct: 45, valAxisMaxVal: 75,
    });
    texto(s, "Valores ilustrativos", { x: 7.2, y: 6.2, w: 5.2, h: 0.3, fontSize: 10, italic: true, color: C.accent5 });
    s.addNotes("Os chatbots de hoje são 'modelos de linguagem'. Eles leem uma quantidade enorme de texto, aprendem padrões e, quando você pergunta algo, vão prevendo a próxima palavra mais provável, uma de cada vez. No exemplo, depois de 'O céu está', a palavra mais provável é 'azul'. Depois, pessoas avaliam as respostas e o modelo é ajustado para ficar mais útil. Os números do gráfico são só ilustrativos.");
  }

  // ===== 02 Anthropic =====
  pres.addSection({ title: "02 · Anthropic" });
  divisor("02 · Anthropic", 1, "Anthropic", "A empresa por trás do Claude e sua aposta em segurança",
    "Agora vamos afunilar: de toda a área de IA, vamos olhar para uma empresa específica, a Anthropic.");

  // 8 — Quem é a Anthropic
  {
    const s = conteudo("02 · Anthropic", "Quem é a Anthropic?", 1);
    texto(s, "Uma empresa de pesquisa e segurança em IA, criada para desenvolver sistemas confiáveis, que as pessoas possam entender e controlar.", { x: M, y: 2.05, w: 6.3, h: 1.4, fontSize: 21, color: C.text1, fontFace: THEME.headFontFace });
    texto(s, "Fundada pelos irmãos Dario e Daniela Amodei, junto com um grupo de pesquisadores que antes trabalhavam na OpenAI.", { x: M, y: 3.7, w: 6.3, h: 0.9, fontSize: 16 });
    texto(s, "A ideia central: se a IA vai ficar cada vez mais poderosa, é melhor que empresas preocupadas com segurança estejam na linha de frente.", { x: M, y: 4.75, w: 6.3, h: 1.2, fontSize: 16 });
    const stats = [
      [Lu.LuCalendar, "2021", "ano de fundação"],
      [Lu.LuMapPin, "São Francisco", "sede, nos Estados Unidos"],
      [Lu.LuHeartHandshake, "Benefício público", "empresa com missão de beneficiar a sociedade, não só dar lucro"],
    ];
    for (let i = 0; i < 3; i++) {
      const y = 2.05 + i * 1.55;
      cartao(s, 7.4, y, 5.3, 1.35);
      await circulo(s, stats[i][0], 7.65, y + 0.33, 0.7, { fill: C.background1 });
      texto(s, stats[i][1], { x: 8.6, y: y + 0.18, w: 3.9, h: 0.55, fontSize: 26, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, stats[i][2], { x: 8.6, y: y + 0.75, w: 3.9, h: 0.5, fontSize: 13, color: C.accent5 });
    }
    s.addNotes("A Anthropic foi fundada em 2021, em São Francisco, pelos irmãos Dario e Daniela Amodei e outros pesquisadores que saíram da OpenAI. Ela se apresenta como uma empresa de pesquisa e segurança em IA. Ela também é registrada como empresa de benefício público, ou seja, tem o compromisso de pensar no impacto para a sociedade e não só no lucro.");
  }

  // 9 — Segurança
  {
    const s = conteudo("02 · Anthropic", "Segurança em primeiro lugar", 1);
    const pilares = [
      [Lu.LuScrollText, "IA Constitucional", "O Claude é treinado seguindo uma “constituição”: princípios escritos que guiam o comportamento dele, como ser honesto e evitar causar danos."],
      [Lu.LuShieldCheck, "Escalonamento responsável", "Regras públicas que exigem testes e proteções mais rígidos à medida que os modelos ficam mais poderosos."],
      [Lu.LuMicroscope, "Interpretabilidade", "Pesquisa para enxergar “dentro” da rede neural e entender como o modelo chega às suas respostas."],
    ];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      cartao(s, x, 2.05, 3.9, 3.35);
      await circulo(s, pilares[i][0], x + 0.3, 2.35, 0.8, { fill: C.background1 });
      texto(s, pilares[i][1], { x: x + 0.3, y: 3.35, w: 3.3, h: 0.4, fontSize: 18, bold: true, color: C.text1 });
      texto(s, pilares[i][2], { x: x + 0.3, y: 3.8, w: 3.35, h: 1.5, fontSize: 14 });
    }
    texto(s, [
      { text: "Útil, honesto e inofensivo", options: { italic: true, bold: true, color: C.accent1, fontFace: THEME.headFontFace, fontSize: 24, breakLine: true } },
      { text: "Os três objetivos que guiam o treinamento do Claude", options: { fontSize: 14, color: C.accent5 } },
    ], { x: M, y: 5.65, w: 12.1, h: 1.0, align: "center", valign: "middle" });
    s.addNotes("O diferencial da Anthropic é a segurança. Ela tem três frentes principais. A IA Constitucional: o Claude aprende a seguir uma lista de princípios escritos. A política de escalonamento responsável: quanto mais poderoso o modelo, mais testes de segurança ele precisa passar antes de ser lançado. E a interpretabilidade, que é tentar entender o que acontece dentro do 'cérebro' do modelo. Tudo isso para que ele seja útil, honesto e inofensivo.");
  }

  // ===== 03 Claude =====
  pres.addSection({ title: "03 · Claude" });
  divisor("03 · Claude", 2, "Claude", "O assistente de IA da Anthropic: o que faz e onde usar",
    "Mais um passo no funil: da empresa, vamos para o principal produto dela, o Claude.");

  // 11 — Conheça o Claude
  {
    const s = conteudo("03 · Claude", "Conheça o Claude", 2);
    texto(s, "O assistente de IA da Anthropic, lançado em março de 2023.", { x: M, y: 2.05, w: 5.4, h: 1.0, fontSize: 22, color: C.text1, fontFace: THEME.headFontFace });
    cartao(s, M, 3.3, 5.4, 2.4);
    await circulo(s, Lu.LuLightbulb, M + 0.3, 3.6, 0.7, { fill: C.background1 });
    texto(s, "Curiosidade sobre o nome", { x: M + 1.2, y: 3.6, w: 4, h: 0.7, fontSize: 16, bold: true, color: C.accent1, valign: "middle" });
    texto(s, "É uma homenagem a Claude Shannon, matemático conhecido como o “pai da teoria da informação”, que está na base de toda a computação moderna.", { x: M + 0.3, y: 4.45, w: 4.8, h: 1.15, fontSize: 14 });
    s.addText("O que ele faz", { x: 6.7, y: 2.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: C.accent1, margin: 0, isTextBox: true });
    const faz = [
      [Lu.LuPenLine, "Escreve e revisa", "Textos, resumos, e-mails e redações"],
      [Lu.LuGraduationCap, "Explica e ensina", "Tira dúvidas no nível de quem pergunta"],
      [Lu.LuCode, "Programa", "Escreve código e encontra erros"],
      [Lu.LuFileText, "Analisa", "Lê documentos, PDFs, tabelas e imagens"],
    ];
    for (let i = 0; i < 4; i++) {
      const cx = 6.7 + (i % 2) * 3.05, cy = 2.6 + Math.floor(i / 2) * 2.1;
      cartao(s, cx, cy, 2.85, 1.9);
      await circulo(s, faz[i][0], cx + 0.25, cy + 0.25, 0.6, { fill: C.background1 });
      texto(s, faz[i][1], { x: cx + 0.25, y: cy + 0.95, w: 2.4, h: 0.3, fontSize: 15, bold: true, color: C.text1 });
      texto(s, faz[i][2], { x: cx + 0.25, y: cy + 1.25, w: 2.45, h: 0.6, fontSize: 12, color: C.accent5 });
    }
    s.addNotes("O Claude é o assistente de IA da Anthropic, lançado em março de 2023. O nome é uma homenagem a Claude Shannon, o pai da teoria da informação. Ele escreve e revisa textos, explica matérias, programa e consegue ler documentos e imagens.");
  }

  // 12 — Onde está o Claude
  {
    const s = conteudo("03 · Claude", "Onde o Claude está", 2);
    const onde = [
      [Lu.LuMessagesSquare, "Claude.ai e apps", "Para qualquer pessoa", "Conversa pelo navegador, celular ou computador. Tem versão gratuita."],
      [Lu.LuTerminal, "Claude Code", "Para programadores", "Trabalha direto no código: lê o projeto, escreve, testa e corrige."],
      [Lu.LuPlug, "API", "Para empresas", "Empresas colocam o Claude dentro dos próprios aplicativos e sites."],
    ];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      cartao(s, x, 2.05, 3.9, 3.4);
      await circulo(s, onde[i][0], x + 0.3, 2.35, 0.8, { fill: C.background1 });
      texto(s, onde[i][1], { x: x + 0.3, y: 3.35, w: 3.3, h: 0.4, fontSize: 19, bold: true, color: C.text1 });
      texto(s, onde[i][2], { x: x + 0.3, y: 3.78, w: 3.3, h: 0.35, fontSize: 13, bold: true, color: C.accent1 });
      texto(s, onde[i][3], { x: x + 0.3, y: 4.2, w: 3.35, h: 1.1, fontSize: 14 });
    }
    cartao(s, M, 5.75, 12.1, 0.9, C.text1);
    texto(s, [{ text: "Curiosidade:  ", options: { bold: true, color: C.accent4 } }, { text: "esta apresentação foi montada com a ajuda do Claude Code.", options: { color: C.background1 } }], { x: M + 0.35, y: 5.75, w: 11.4, h: 0.9, valign: "middle", fontSize: 16 });
    s.addNotes("Dá para usar o Claude de três jeitos principais. Pelo site claude.ai e pelos aplicativos, que qualquer pessoa pode usar. Pelo Claude Code, que é voltado para programadores e trabalha direto no código. E pela API, que é como empresas colocam o Claude dentro dos próprios produtos. Inclusive, esta apresentação foi montada com ajuda do Claude Code.");
  }

  // 13 — Como pedir bem
  {
    const s = conteudo("03 · Claude", "Pergunta boa, resposta boa", 2);
    const cols = [
      [Lu.LuCircleX, "Pedido vago", "“Me fala sobre a Revolução Francesa.”", "Resposta longa e genérica, que pode não servir para o que você precisa.", HEX.accent5],
      [Lu.LuCircleCheck, "Pedido claro", "“Sou do 1º ano do ensino médio. Explique as 3 principais causas da Revolução Francesa em tópicos curtos, com um exemplo de cada.”", "Resposta no nível certo, no formato certo e direto ao ponto.", HEX.accent3],
    ];
    for (let i = 0; i < 2; i++) {
      const x = M + i * 6.15;
      cartao(s, x, 2.05, 5.95, 3.3);
      await circulo(s, cols[i][0], x + 0.3, 2.3, 0.6, { fill: C.background1, hex: cols[i][4] });
      texto(s, cols[i][1], { x: x + 1.1, y: 2.3, w: 4.5, h: 0.6, fontSize: 19, bold: true, color: C.text1, valign: "middle" });
      texto(s, cols[i][2], { x: x + 0.3, y: 3.1, w: 5.35, h: 1.3, fontSize: 15, italic: true, color: C.text1, fontFace: THEME.headFontFace });
      texto(s, cols[i][3], { x: x + 0.3, y: 4.45, w: 5.35, h: 0.8, fontSize: 14, color: C.accent5 });
    }
    const dicas = [[Lu.LuUser, "Dê contexto", "quem é você e para que serve"], [Lu.LuLayoutList, "Diga o formato", "tópicos, tabela, resumo…"], [Lu.LuTarget, "Seja específico", "o que exatamente você quer"]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      await circulo(s, dicas[i][0], x, 5.75, 0.75);
      texto(s, [{ text: dicas[i][1], options: { bold: true, color: C.text1, breakLine: true } }, { text: dicas[i][2], options: { fontSize: 13, color: C.accent5 } }], { x: x + 0.95, y: 5.75, w: 3.0, h: 0.75, valign: "middle", fontSize: 16 });
    }
    s.addNotes("Uma dica prática: a qualidade da resposta depende muito da pergunta. Se eu peço só 'me fala sobre a Revolução Francesa', recebo um textão genérico. Se eu digo quem sou, o que quero e em que formato, a resposta vem muito mais útil. Então: dê contexto, diga o formato e seja específico.");
  }

  // ===== 04 Modelos =====
  pres.addSection({ title: "04 · Modelos" });
  divisor("04 · Modelos", 3, "Modelos", "Por dentro do Claude: tamanhos diferentes para tarefas diferentes",
    "Agora o nível mais específico: o Claude não é um só, ele é uma família de modelos.");

  // 15 — Família
  {
    const s = conteudo("04 · Modelos", "Uma família com nomes de poesia", 3);
    const fam = [
      [Lu.LuFeather, "Haiku", "Poema japonês de só 3 versos", "O mais rápido e econômico. Ideal para tarefas simples e respostas instantâneas.", 1],
      [Lu.LuScale, "Sonnet", "Soneto, poema de 14 versos", "O equilíbrio entre velocidade e inteligência. O mais usado no dia a dia.", 2],
      [Lu.LuCrown, "Opus", "Em latim, “grande obra”", "O mais capaz. Para tarefas longas e complexas, como pesquisa e programação avançada.", 3],
    ];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      cartao(s, x, 2.05, 3.9, 4.55);
      await circulo(s, fam[i][0], x + 0.3, 2.35, 0.8, { fill: C.background1 });
      texto(s, fam[i][1], { x: x + 0.3, y: 3.35, w: 3.3, h: 0.6, fontSize: 28, bold: true, color: C.text1, fontFace: THEME.headFontFace });
      texto(s, fam[i][2], { x: x + 0.3, y: 3.95, w: 3.3, h: 0.35, fontSize: 13, italic: true, color: C.accent1 });
      texto(s, fam[i][3], { x: x + 0.3, y: 4.4, w: 3.35, h: 1.2, fontSize: 14 });
      texto(s, "Capacidade", { x: x + 0.3, y: 5.85, w: 1.4, h: 0.4, fontSize: 12, color: C.accent5, valign: "middle" });
      for (let k = 0; k < 3; k++) {
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 1.75 + k * 0.62, y: 5.97, w: 0.52, h: 0.16, rectRadius: 0.08, line: { type: "none" }, fill: { color: k < fam[i][4] ? C.accent1 : C.accent6 }, objectName: "Nível" });
      }
    }
    s.addNotes("Os modelos do Claude têm nomes de formas de poesia, do menor para o maior. Haiku, um poema japonês curtinho, é o modelo mais rápido e barato. Sonnet, o soneto, é o meio-termo e o mais usado. E Opus, que significa 'grande obra', é o mais inteligente, para tarefas mais difíceis. Escolher o modelo é escolher entre velocidade e capacidade.");
  }

  // 16 — Evolução
  {
    const s = conteudo("04 · Modelos", "A evolução do Claude", 3);
    const ev = [
      ["Mar 2023", "Claude", "Primeira versão pública"],
      ["Jul 2023", "Claude 2", "Lê textos muito mais longos de uma vez"],
      ["Mar 2024", "Claude 3", "Nasce a família Haiku, Sonnet e Opus; passa a entender imagens"],
      ["Fev 2025", "Claude 3.7 Sonnet", "“Pensamento estendido”: raciocina antes de responder"],
      ["Mai 2025", "Claude 4", "Foco em programação e em agentes que executam tarefas"],
      ["2026", "Claude 5", "Geração atual, com Haiku, Sonnet, Opus e Fable"],
    ];
    const x0 = M, rowH = 0.74;
    s.addShape(pres.shapes.LINE, { x: x0 + 1.55, y: 2.15, w: 0, h: rowH * 5, line: { color: C.accent6, width: 1.5 }, objectName: "Linha da evolução" });
    ev.forEach(([d, n, t], i) => {
      const y = 1.95 + i * rowH;
      const last = i === ev.length - 1;
      texto(s, d, { x: x0, y, w: 1.3, h: 0.4, fontSize: 13, bold: true, color: last ? C.accent1 : C.accent5, align: "right", valign: "middle" });
      s.addShape(pres.shapes.OVAL, { x: x0 + 1.43, y: y + 0.08, w: 0.24, h: 0.24, fill: { color: last ? C.accent1 : C.background1 }, line: { color: C.accent1, width: 2 }, objectName: "Versão " + n });
      texto(s, [{ text: n + "  ", options: { bold: true, color: C.text1, fontSize: 16 } }, { text: t, options: { fontSize: 14 } }], { x: x0 + 1.95, y, w: 5.6, h: 0.62, valign: "top" });
    });
    cartao(s, 8.35, 2.05, 4.35, 4.55, C.text1);
    texto(s, "Memória de leitura", { x: 8.75, y: 2.4, w: 3.6, h: 0.4, fontSize: 14, bold: true, color: C.accent4 });
    texto(s, "200 mil", { x: 8.75, y: 2.95, w: 3.6, h: 1.0, fontSize: 54, bold: true, color: C.background1, fontFace: THEME.headFontFace, valign: "middle" });
    texto(s, "tokens (pedaços de palavras) de uma vez, desde o Claude 3", { x: 8.75, y: 3.95, w: 3.6, h: 0.7, fontSize: 14, color: C.accent6 });
    texto(s, [{ text: "≈ 500 páginas", options: { bold: true, color: C.background1, fontSize: 22, breakLine: true } }, { text: "um livro inteiro lido numa única conversa", options: { fontSize: 14, color: C.accent6 } }], { x: 8.75, y: 4.95, w: 3.6, h: 1.3 });
    s.addNotes("Em pouco mais de três anos o Claude evoluiu muito. A primeira versão saiu em 2023. O Claude 2 conseguia ler textos bem maiores. O Claude 3, em 2024, trouxe a família Haiku, Sonnet e Opus e a capacidade de entender imagens. Em 2025 veio o 'pensamento estendido', em que ele raciocina antes de responder, e o Claude 4, focado em programação e agentes. Hoje estamos na geração Claude 5. Um dado legal: ele consegue ler cerca de 200 mil tokens de uma vez, algo como um livro de 500 páginas. (Dica: confira no site da Anthropic se saiu alguma versão nova antes de apresentar.)");
  }

  // ===== 05 Futuro =====
  pres.addSection({ title: "05 · Futuro" });
  divisor("05 · Futuro", 4, "Futuro", "Para onde a IA está indo, e o que isso muda para a gente",
    "Por fim, depois de chegar no mais específico, vamos abrir de novo o olhar e pensar no futuro.");

  // 18 — Oportunidades x Desafios
  {
    const s = conteudo("05 · Futuro", "Oportunidades e desafios", 4);
    const lados = [
      ["Oportunidades", HEX.accent3, [
        [Lu.LuHeartPulse, "Saúde", "Diagnósticos mais rápidos e novos remédios"],
        [Lu.LuSchool, "Educação", "Um tutor personalizado para cada aluno"],
        [Lu.LuFlaskConical, "Ciência", "Pesquisas que levariam anos, feitas em meses"],
        [Lu.LuBot, "Agentes", "IA que executa tarefas inteiras, não só responde"],
      ]],
      ["Desafios", HEX.accent1, [
        [Lu.LuMegaphone, "Desinformação", "Notícias falsas e deepfakes mais convincentes"],
        [Lu.LuBriefcase, "Trabalho", "Profissões mudando e novas habilidades exigidas"],
        [Lu.LuTriangleAlert, "Erros e vieses", "A IA pode inventar fatos com confiança"],
        [Lu.LuLock, "Privacidade", "Cuidado com dados pessoais e uso indevido"],
      ]],
    ];
    for (let c = 0; c < 2; c++) {
      const x = M + c * 6.15;
      cartao(s, x, 2.05, 5.95, 4.6);
      texto(s, lados[c][0], { x: x + 0.35, y: 2.25, w: 5.2, h: 0.45, fontSize: 20, bold: true, color: c === 0 ? C.accent3 : C.accent1, fontFace: THEME.headFontFace });
      for (let i = 0; i < 4; i++) {
        const y = 2.9 + i * 0.92;
        await circulo(s, lados[c][2][i][0], x + 0.35, y, 0.66, { fill: C.background1, hex: lados[c][1] });
        texto(s, [{ text: lados[c][2][i][1], options: { bold: true, color: C.text1, breakLine: true } }, { text: lados[c][2][i][2], options: { fontSize: 13, color: C.accent5 } }], { x: x + 1.2, y: y - 0.02, w: 4.5, h: 0.7, valign: "middle", fontSize: 15 });
      }
    }
    s.addNotes("O futuro da IA tem dois lados. De um lado, oportunidades enormes: ajudar médicos, ter um tutor para cada aluno, acelerar a ciência e ter agentes que fazem tarefas inteiras sozinhos. Do outro, desafios sérios: desinformação e deepfakes, mudanças nas profissões, erros que a IA comete com confiança, as chamadas alucinações, e riscos à privacidade. Por isso a discussão sobre segurança, que a Anthropic defende, é tão importante.");
  }

  // 19 — E nós, estudantes?
  {
    const s = conteudo("05 · Futuro", "E nós, estudantes?", 4);
    const regras = [
      [Lu.LuGraduationCap, "Professor particular, não cola", "Peça para explicar, não para fazer por você"],
      [Lu.LuSearchCheck, "Sempre confira", "A IA pode errar: compare com outras fontes"],
      [Lu.LuMessageCircleQuestion, "Aprenda a perguntar bem", "Contexto + formato + objetivo claro"],
      [Lu.LuShieldCheck, "Proteja seus dados", "Não compartilhe senhas nem informações pessoais"],
    ];
    for (let i = 0; i < 4; i++) {
      const y = 2.05 + i * 1.17;
      await circulo(s, regras[i][0], M, y, 0.85);
      texto(s, [{ text: regras[i][1], options: { bold: true, color: C.text1, breakLine: true } }, { text: regras[i][2], options: { fontSize: 14, color: C.accent5 } }], { x: M + 1.1, y, w: 5.4, h: 0.85, valign: "middle", fontSize: 17 });
    }
    cartao(s, 7.6, 2.05, 5.1, 4.6, C.text1);
    texto(s, "“", { x: 8.0, y: 2.2, w: 1, h: 1.0, fontSize: 80, bold: true, color: C.accent1, fontFace: THEME.headFontFace });
    texto(s, "A IA é uma ferramenta poderosa. Quem aprende a usá-la com senso crítico sai na frente.", { x: 8.0, y: 3.2, w: 4.3, h: 2.2, fontSize: 24, color: C.background1, fontFace: THEME.headFontFace, italic: true });
    texto(s, "Ideia central da apresentação", { x: 8.0, y: 5.85, w: 4.3, h: 0.4, fontSize: 12, color: C.accent6 });
    s.addNotes("E o que isso significa para nós? Usar a IA como um professor particular e não como cola; sempre conferir as informações, porque ela pode errar; aprender a fazer boas perguntas; e proteger nossos dados. A IA é uma ferramenta poderosa, e quem aprende a usá-la com senso crítico sai na frente.");
  }

  // 20 — Encerramento
  pres.addSection({ title: "Encerramento" });
  {
    const s = pres.addSlide({ masterName: "DIVISOR", sectionTitle: "Encerramento" });
    s.addText("Obrigado!", { placeholder: "title" });
    s.addText("Perguntas?\nLuiz · 1ºB · Ensino Médio", { placeholder: "body" });
    s.addText("RECAPITULANDO", { x: M, y: 1.75, w: 6, h: 0.4, fontSize: 13, bold: true, charSpacing: 3, color: C.accent1, margin: 0, isTextBox: true });
    texto(s, "Do geral ao específico: a IA aprende com exemplos, a Anthropic aposta em segurança, o Claude é o assistente, os modelos vão do Haiku ao Opus, e o futuro depende de como usamos tudo isso.", { x: M, y: 2.2, w: 6.6, h: 1.0, fontSize: 14, color: C.accent6 });
    funil(s, { x: 7.9, y: 1.75, w: 4.83, todos: true });
    texto(s, "Fontes: anthropic.com · claude.ai · Vaswani et al., “Attention Is All You Need” (2017) · Turing, “Computing Machinery and Intelligence” (1950)", { x: M, y: 6.3, w: 12.1, h: 0.4, fontSize: 10, color: C.accent6 });
    s.addNotes("Resumindo: começamos pela IA em geral, que aprende com exemplos; passamos pela Anthropic e sua preocupação com segurança; conhecemos o Claude; vimos os modelos Haiku, Sonnet e Opus; e terminamos pensando no futuro. Muito obrigado! Alguém tem alguma pergunta?");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("OK:", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
