// Gera "IA - Anthropic - Claude.pptx" (15 slides)
// Uso: NODE_PATH=<node_modules com pptxgenjs, react, react-dom, react-icons, sharp> PPTX_SKILL_DIR=<skill pptx> node gerar.js
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const Lu = require("react-icons/lu");
const { applyTheme } = require(path.join(process.env.PPTX_SKILL_DIR || ".", "scripts/apply_theme.js"));

const OUT = path.join(__dirname, "IA - Anthropic - Claude.pptx");
const IMG = (f) => path.join(__dirname, "img", f);

const THEME = {
  name: "IA ao Claude",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1F1E1D", lt1: "FFFFFF", dk2: "3D3929", lt2: "F4F3EE",
    accent1: "C15F3C", // argila (destaque)
    accent2: "5B87B5", // azul
    accent3: "6E8350", // oliva
    accent4: "D9A441", // dourado
    accent5: "4A4743", // cinza escuro
    accent6: "B0AEA5", // cinza claro
    hlink: "C15F3C", folHlink: "6E8350",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Luiz";
pres.title = "Inteligência Artificial: avanços, perigos e o Claude";
pres.subject = "Apresentação escolar — 1ºB Ensino Médio";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

const M = 0.6;
const STEPS = ["IA", "IA hoje", "Perigos", "Anthropic", "Futuro"];
const FOOTER = "Luiz · 1ºB · Inteligência Artificial";

// ---------- Ícones e imagens ----------
async function icon(Comp, hex) {
  const svg = renderToStaticMarkup(React.createElement(Comp, { size: 256, color: "#" + hex }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// Recorta a imagem na proporção exata da caixa (sem distorcer)
async function foto(slide, file, x, y, w, h, { pos = "centre", alt = "", legenda, escuro = false } = {}) {
  const pxW = Math.round(w * 220), pxH = Math.round(h * 220);
  const buf = await sharp(IMG(file)).resize(pxW, pxH, { fit: "cover", position: pos }).jpeg({ quality: 84 }).toBuffer();
  slide.addImage({ data: "image/jpeg;base64," + buf.toString("base64"), x, y, w, h, altText: alt });
  if (legenda) {
    slide.addText(legenda, { x, y: y + h + 0.06, w, h: 0.26, fontSize: 10, italic: true, color: escuro ? C.accent6 : C.accent5, margin: 0, isTextBox: true, valign: "top" });
  }
}

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "CAPA",
  background: { color: C.text1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 2.3, w: 7.2, h: 2.2, fontFace: THEME.headFontFace, fontSize: 40, bold: true, color: C.background1, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 4.85, w: 7.0, h: 0.9, fontSize: 20, color: C.accent6, valign: "top", margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "FINAL",
  background: { color: C.text1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 1.5, w: 5.4, h: 1.2, fontFace: THEME.headFontFace, fontSize: 48, bold: true, color: C.background1, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 2.8, w: 5.4, h: 1.0, fontSize: 20, color: C.accent6, valign: "top", margin: 0 }, text: "" } },
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
function trilha(slide, ativo, extra) {
  let x = M;
  STEPS.forEach((s, i) => {
    const w = 0.11 * s.length + 0.42;
    if (i === ativo) {
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 0.32, w, h: 0.32, rectRadius: 0.16, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "Trilha ativa" });
    }
    slide.addText(s, { x, y: 0.32, w, h: 0.32, fontSize: 11, bold: i === ativo, align: "center", valign: "middle", margin: 0, isTextBox: true, color: i === ativo ? C.background1 : C.accent5, objectName: "Trilha " + s });
    x += w;
    if (i < STEPS.length - 1) {
      slide.addText("›", { x, y: 0.32, w: 0.22, h: 0.32, fontSize: 12, align: "center", valign: "middle", margin: 0, isTextBox: true, color: C.accent6 });
      x += 0.22;
    }
  });
  if (extra) {
    slide.addText(extra, { x: 9.7, y: 0.32, w: 3.03, h: 0.32, fontSize: 11, bold: true, align: "right", valign: "middle", margin: 0, isTextBox: true, color: C.accent1 });
  }
}

function funil(slide, { x, y, w, barH = 0.62, gap = 0.14, ativo = -1, escuro = true, todos = false }) {
  STEPS.forEach((s, i) => {
    const bw = w * (1 - i * 0.16);
    const bx = x + (w - bw) / 2;
    const by = y + i * (barH + gap);
    const on = todos || i === ativo;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw, h: barH, rectRadius: 0.1, line: { type: "none" }, fill: { color: on ? C.accent1 : escuro ? C.accent5 : C.background2 }, objectName: "Funil " + s });
    slide.addText(`${String(i + 1).padStart(2, "0")}  ${s}`, { x: bx, y: by, w: bw, h: barH, align: "center", valign: "middle", margin: 0, isTextBox: true, fontSize: 16, bold: on, color: on ? C.background1 : escuro ? C.accent6 : C.text2 });
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

function fonte(slide, t, x = M, y = 6.55, w = 12.1) {
  texto(slide, "Fonte: " + t, { x, y, w, h: 0.28, fontSize: 10, italic: true, color: C.accent5 });
}

function conteudo(sec, titulo, etapa, extra) {
  const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: sec });
  s.addText(titulo, { placeholder: "title" });
  trilha(s, etapa, extra);
  return s;
}

const chartBase = () => ({
  showValue: true, dataLabelColor: C.text2, dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt",
  catAxisLabelColor: C.text2, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt",
  valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, catAxisLineShow: false, showLegend: false,
});

// ---------- Slides ----------
(async () => {
  // 1 — Capa
  pres.addSection({ title: "Abertura" });
  {
    const s = pres.addSlide({ masterName: "CAPA", sectionTitle: "Abertura" });
    await foto(s, "mente.jpg", 8.33, 0, 5.0, 7.5, { alt: "Ilustração de um perfil humano com círculos coloridos (Anthropic)" });
    s.addText("APRESENTAÇÃO · TEMA LIVRE", { x: M, y: 1.7, w: 7, h: 0.4, fontSize: 13, bold: true, charSpacing: 3, color: C.accent1, margin: 0, isTextBox: true });
    s.addText("Inteligência Artificial: avanços, perigos e o Claude", { placeholder: "title" });
    s.addText("Luiz · 1ºB · Ensino Médio", { placeholder: "body" });
    s.addText("Ilustração: Anthropic", { x: 8.43, y: 7.12, w: 4.8, h: 0.26, fontSize: 9, italic: true, color: C.accent6, margin: 0, isTextBox: true, align: "right" });
    s.addNotes("Bom dia/boa tarde! Meu nome é Luiz, sou do 1ºB, e hoje vou falar sobre Inteligência Artificial: o que ela é, o que já consegue fazer, quais são os perigos e como uma empresa, a Anthropic, tenta lidar com eles.");
  }

  // 2 — Roteiro
  {
    const s = conteudo("Abertura", "Do geral ao específico", -1);
    funil(s, { x: M, y: 2.0, w: 6.2, barH: 0.72, gap: 0.16, escuro: false, todos: true });
    const itens = [
      ["IA", "O que é, de onde veio e como funciona"],
      ["IA hoje", "Os modelos mais fortes e o que já fazem"],
      ["Perigos", "Desinformação, erros, empregos, crimes e controle"],
      ["Anthropic", "Uma empresa criada para tornar a IA segura"],
      ["Futuro", "Oportunidades e como usar com responsabilidade"],
    ];
    itens.forEach(([t, d], i) => {
      texto(s, [{ text: t, options: { bold: true, color: C.text1, breakLine: true } }, { text: d, options: { fontSize: 14, color: C.accent5 } }], { x: 7.4, y: 2.0 + i * 0.88, w: 5.3, h: 0.72, valign: "middle", fontSize: 16 });
    });
    s.addNotes("Vou seguir um funil: começo pelo mais geral, a IA, depois mostro como ela está hoje, passo bastante tempo nos perigos, que é a parte mais importante, chego numa empresa específica, a Anthropic, e termino falando do futuro.");
  }

  // 3 — O que é IA
  pres.addSection({ title: "01 · IA" });
  {
    const s = conteudo("01 · IA", "O que é Inteligência Artificial?", 0);
    texto(s, "Sistemas de computador que fazem tarefas que antes exigiam inteligência humana: entender linguagem, reconhecer imagens, prever e decidir.", { x: M, y: 2.05, w: 7.3, h: 1.1, fontSize: 20, color: C.text1, fontFace: THEME.headFontFace });
    texto(s, "Em vez de seguir regras escritas à mão, a IA aprende com milhões de exemplos.", { x: M, y: 3.25, w: 7.3, h: 0.4, fontSize: 15 });
    const tipos = [
      [Lu.LuFilter, "IA tradicional", "Classifica e prevê", "Filtro de spam, recomendações de vídeo, GPS, desbloqueio facial"],
      [Lu.LuSparkles, "IA generativa", "Cria conteúdo novo", "Textos, imagens, músicas, vídeos e código: ChatGPT, Gemini, Claude"],
    ];
    for (let i = 0; i < 2; i++) {
      const x = M + i * 3.75;
      cartao(s, x, 3.9, 3.55, 2.75);
      await circulo(s, tipos[i][0], x + 0.25, 4.15, 0.7, { fill: C.background1 });
      texto(s, tipos[i][1], { x: x + 0.25, y: 5.0, w: 3.1, h: 0.35, fontSize: 17, bold: true, color: C.text1 });
      texto(s, tipos[i][2], { x: x + 0.25, y: 5.35, w: 3.1, h: 0.3, fontSize: 13, bold: true, color: C.accent1 });
      texto(s, tipos[i][3], { x: x + 0.25, y: 5.7, w: 3.1, h: 0.85, fontSize: 13 });
    }
    await foto(s, "nautilus.jpg", 8.4, 2.05, 4.33, 4.6, { alt: "Ilustração de uma concha de náutilo (Anthropic)", legenda: "Ilustração: Anthropic" });
    s.addNotes("IA é quando um computador faz algo que antes só uma pessoa conseguiria. Existem dois grandes tipos: a IA tradicional, que classifica e prevê, como o filtro de spam ou as recomendações do YouTube; e a IA generativa, que cria coisas novas, como textos e imagens. ChatGPT, Gemini e Claude são exemplos de IA generativa.");
  }

  // 4 — História
  {
    const s = conteudo("01 · IA", "Mais de 70 anos de história", 0);
    await foto(s, "turing.jpg", M, 2.05, 2.05, 2.75, { pos: "north", alt: "Foto de Alan Turing aos 16 anos", legenda: "Alan Turing · domínio público" });
    await foto(s, "deep-blue.jpg", M + 2.25, 2.05, 2.05, 2.75, { alt: "Gabinete do computador Deep Blue, da IBM, em museu", legenda: "Deep Blue · James the photographer, CC BY 2.0" });
    cartao(s, M, 5.3, 4.3, 1.35);
    texto(s, [{ text: "Por que agora? ", options: { bold: true, color: C.accent1, breakLine: true } }, { text: "Computadores muito mais potentes + dados da internet + algoritmos melhores.", options: { fontSize: 14 } }], { x: M + 0.25, y: 5.3, w: 3.85, h: 1.35, valign: "middle", fontSize: 15 });
    const marcos = [
      ["1950", "Alan Turing pergunta: “Máquinas podem pensar?”"],
      ["1956", "Conferência de Dartmouth cria o termo “Inteligência Artificial”"],
      ["1997", "Deep Blue, da IBM, vence o campeão mundial de xadrez Garry Kasparov"],
      ["2012", "Deep learning revoluciona o reconhecimento de imagens"],
      ["2017", "Google cria o Transformer, a base dos chatbots atuais"],
      ["2022", "ChatGPT é lançado e a IA vira assunto no mundo todo"],
      ["2024", "IA ganha dois Prêmios Nobel: Física e Química"],
    ];
    const x0 = 5.4, rowH = 0.66;
    s.addShape(pres.shapes.LINE, { x: x0 + 1.0, y: 2.25, w: 0, h: rowH * 6, line: { color: C.accent6, width: 1.5 }, objectName: "Linha do tempo" });
    marcos.forEach(([ano, d], i) => {
      const y = 2.05 + i * rowH;
      const last = i === marcos.length - 1;
      texto(s, ano, { x: x0, y, w: 0.75, h: 0.4, fontSize: 17, bold: true, fontFace: THEME.headFontFace, color: last ? C.accent1 : C.text1, valign: "middle" });
      s.addShape(pres.shapes.OVAL, { x: x0 + 0.88, y: y + 0.08, w: 0.24, h: 0.24, fill: { color: last ? C.accent1 : C.background1 }, line: { color: C.accent1, width: 2 }, objectName: "Marco " + ano });
      texto(s, d, { x: x0 + 1.35, y, w: 5.95, h: 0.4, fontSize: 15, valign: "middle" });
    });
    s.addNotes("A IA não nasceu ontem. Em 1950, Alan Turing, que aparece na foto, já perguntava se máquinas poderiam pensar. Em 1956 surgiu o nome. Em 1997, o Deep Blue, da outra foto, venceu o campeão mundial de xadrez. Depois vieram o deep learning, o Transformer e o ChatGPT. Em 2024, pesquisas de IA ganharam dois Prêmios Nobel. Tudo acelerou porque juntamos computadores potentes, muitos dados e algoritmos melhores.");
  }

  // 5 — Como funciona
  {
    const s = conteudo("01 · IA", "Como um chatbot “pensa”?", 0);
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
      ...chartBase(), x: 7.0, y: 2.8, w: 5.6, h: 3.35, barDir: "bar", catAxisOrientation: "maxMin",
      chartColors: [HEX.accent1], dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', catAxisLabelFontSize: 13, barGapWidthPct: 45, valAxisMaxVal: 75,
    });
    texto(s, "Valores ilustrativos", { x: 7.2, y: 6.2, w: 5.2, h: 0.3, fontSize: 10, italic: true, color: C.accent5 });
    s.addNotes("Os chatbots são 'modelos de linguagem'. Eles leem uma quantidade enorme de texto, aprendem padrões e vão prevendo a próxima palavra mais provável. Depois de 'O céu está', a mais provável é 'azul'. Repare: ele não 'sabe' a verdade, ele calcula o que é mais provável. Isso vai ser importante quando eu falar dos perigos. Os números do gráfico são ilustrativos.");
  }

  // 6 — Modelos mais fortes
  pres.addSection({ title: "02 · IA hoje" });
  {
    const s = conteudo("02 · IA hoje", "Os modelos mais fortes do mundo hoje", 1, "Novembro de 2026");
    const mods = [
      ["OpenAI · EUA", "GPT-6 Astra", "Set/2026", "Motor do ChatGPT; a OpenAI diz que ele inaugura a “era da AGI”"],
      ["Google · EUA", "Gemini 4", "Set/2026", "Versão Argon: foco em programação, trabalho e defesa digital"],
      ["Anthropic · EUA", "Claude Fable 5.2", "Nov/2026", "Lidera vários rankings; irmão restrito: Claude Mythos"],
      ["xAI · EUA", "Grok 4.7", "Set/2026", "Empresa de Elon Musk; integrado à rede social X"],
      ["DeepSeek · China", "DeepSeek V4", "2026", "Modelo aberto: qualquer pessoa pode baixar e usar"],
    ];
    const cw = 2.26, gap = 0.2;
    mods.forEach(([emp, nome, data, d], i) => {
      const x = M + i * (cw + gap);
      cartao(s, x, 2.0, cw, 2.55);
      texto(s, emp, { x: x + 0.2, y: 2.18, w: cw - 0.4, h: 0.3, fontSize: 11, bold: true, color: C.accent1 });
      texto(s, nome, { x: x + 0.2, y: 2.48, w: cw - 0.4, h: 0.65, fontSize: 18, bold: true, color: C.text1, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, data, { x: x + 0.2, y: 3.15, w: cw - 0.4, h: 0.28, fontSize: 11, color: C.accent5 });
      texto(s, d, { x: x + 0.2, y: 3.45, w: cw - 0.4, h: 1.0, fontSize: 12 });
    });
    texto(s, "Ranking geral BenchLM (nov/2026)", { x: M, y: 4.8, w: 6, h: 0.32, fontSize: 14, bold: true, color: C.text1 });
    s.addChart(pres.charts.BAR, [{ name: "Pontuação", labels: ["Claude Fable 5.2", "Gemini 4 Neon", "GPT-6.2 Astra"], values: [93.3, 91.8, 90.8] }], {
      ...chartBase(), x: M - 0.1, y: 5.1, w: 6.4, h: 1.45, barDir: "bar", catAxisOrientation: "maxMin",
      chartColors: [HEX.accent1], dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0", barGapWidthPct: 40, valAxisMinVal: 0, valAxisMaxVal: 110,
    });
    cartao(s, 7.3, 4.8, 5.4, 1.75, C.text1);
    texto(s, [{ text: "Curiosidade: ", options: { bold: true, color: C.accent4 } }, { text: "os modelos mais fortes ficaram tão bons em achar falhas de segurança que Google, OpenAI e Anthropic liberaram primeiro só para especialistas em defesa digital.", options: { color: C.background1 } }], { x: 7.6, y: 4.8, w: 4.85, h: 1.75, valign: "middle", fontSize: 14 });
    fonte(s, "anúncios oficiais (OpenAI, Google, Anthropic); BenchLM.ai, nov/2026. Os rankings mudam quase toda semana.");
    s.addNotes("Estes são os modelos mais fortes do mundo hoje, em novembro de 2026. O GPT-6 Astra, da OpenAI, que roda no ChatGPT. O Gemini 4, do Google. O Claude Fable 5.2, da Anthropic, lançado agora em novembro e que está em primeiro lugar em vários rankings. O Grok, da empresa do Elon Musk. E o DeepSeek, da China, que é aberto: qualquer um pode baixar. Uma curiosidade: esses modelos ficaram tão bons em encontrar falhas de segurança em sistemas que as empresas liberaram primeiro só para especialistas em cibersegurança.");
  }

  // 7 — Conquistas
  {
    const s = conteudo("02 · IA hoje", "O que a IA já consegue fazer", 1);
    const feitos = [
      [Lu.LuDna, "Nobel de Química 2024", "O AlphaFold, do Google DeepMind, previu a forma de praticamente todas as proteínas conhecidas, acelerando pesquisas de remédios."],
      [Lu.LuMedal, "Ouro na Olimpíada de Matemática", "Em 2025, sistemas de IA alcançaram nível de medalha de ouro na Olimpíada Internacional de Matemática."],
      [Lu.LuFlaskConical, "Acima de doutores", "Os melhores modelos já superam especialistas com doutorado em testes de ciência."],
      [Lu.LuShieldHalf, "Top 5% em cibersegurança", "Em 2025, um agente de IA ficou entre os 5% melhores times de uma grande competição de hackers."],
    ];
    for (let i = 0; i < 4; i++) {
      const x = M + (i % 2) * 4.05, y = 2.0 + Math.floor(i / 2) * 2.3;
      cartao(s, x, y, 3.85, 2.1);
      await circulo(s, feitos[i][0], x + 0.25, y + 0.25, 0.65, { fill: C.background1 });
      texto(s, feitos[i][1], { x: x + 1.05, y: y + 0.25, w: 2.6, h: 0.65, fontSize: 15, bold: true, color: C.text1, valign: "middle" });
      texto(s, feitos[i][2], { x: x + 0.25, y: y + 1.0, w: 3.4, h: 1.0, fontSize: 12 });
    }
    await foto(s, "terra.jpg", 8.75, 2.0, 3.98, 4.4, { alt: "Ilustração da Terra vista da janela de uma nave (Anthropic)", legenda: "Ilustração: Anthropic" });
    fonte(s, "Prêmio Nobel (nobelprize.org); Relatório Internacional de Segurança da IA 2026 (Yoshua Bengio et al.).", M, 6.55, 8.0);
    s.addNotes("E a IA já faz coisas impressionantes. Em 2024, o AlphaFold ganhou o Nobel de Química por prever a forma das proteínas, o que ajuda a criar remédios. Em 2025, a IA chegou a nível de medalha de ouro na Olimpíada Internacional de Matemática. Hoje os melhores modelos superam doutores em testes de ciência. E um agente de IA ficou entre os 5% melhores numa competição de hackers. Esse último exemplo já mostra o outro lado: o que serve para defender também pode servir para atacar.");
  }

  // 8 — Perigos: panorama
  pres.addSection({ title: "03 · Perigos" });
  {
    const s = conteudo("03 · Perigos", "Até os criadores da IA estão preocupados", 2, "Perigos · 1 de 5");
    await foto(s, "hinton.jpg", M, 2.0, 3.0, 4.0, { pos: "north", alt: "Foto de Geoffrey Hinton", legenda: "Geoffrey Hinton · Eviatar Bach, CC BY-SA 3.0" });
    texto(s, [
      { text: "Geoffrey Hinton, o “padrinho da IA”", options: { bold: true, color: C.text1, fontSize: 18, breakLine: true } },
      { text: "Ganhou o Nobel de Física em 2024 pelas redes neurais. Em 2023, saiu do Google para poder alertar livremente sobre os riscos da tecnologia que ajudou a criar.", options: { fontSize: 14 } },
    ], { x: 3.9, y: 2.0, w: 8.8, h: 1.25 });
    texto(s, "O Relatório Internacional de Segurança da IA (2026), feito por mais de 100 especialistas, divide os riscos em três grupos:", { x: 3.9, y: 3.45, w: 8.8, h: 0.6, fontSize: 14, color: C.text1 });
    const grupos = [
      [Lu.LuSkull, "Uso malicioso", "Golpes, deepfakes, ataques hackers e armas"],
      [Lu.LuTriangleAlert, "Falhas", "Erros, vieses e sistemas que saem do controle"],
      [Lu.LuGlobe, "Riscos sistêmicos", "Empregos, meio ambiente e dependência"],
    ];
    for (let i = 0; i < 3; i++) {
      const x = 3.9 + i * 2.98;
      cartao(s, x, 4.2, 2.8, 2.15);
      await circulo(s, grupos[i][0], x + 0.22, 4.4, 0.62, { fill: C.background1 });
      texto(s, grupos[i][1], { x: x + 0.22, y: 5.1, w: 2.4, h: 0.35, fontSize: 15, bold: true, color: C.text1 });
      texto(s, grupos[i][2], { x: x + 0.22, y: 5.45, w: 2.4, h: 0.8, fontSize: 12 });
    }
    fonte(s, "International AI Safety Report 2026 (presidido por Yoshua Bengio); nobelprize.org.", 3.9, 6.55, 8.8);
    s.addNotes("Agora a parte mais importante: os perigos. E quem está alertando não são pessoas contra a tecnologia, são os próprios criadores. Geoffrey Hinton, chamado de padrinho da IA, ganhou o Nobel de Física em 2024 e saiu do Google para poder falar dos riscos. Em 2026, mais de 100 especialistas de vários países publicaram o Relatório Internacional de Segurança da IA, que divide os riscos em três grupos: uso malicioso, falhas e riscos sistêmicos. Nos próximos slides vou mostrar exemplos reais de cada um.");
  }

  // 9 — Desinformação e deepfakes
  {
    const s = conteudo("03 · Perigos", "Desinformação e deepfakes", 2, "Perigos · 2 de 5");
    const casos = [
      ["US$ 25 milhões", "Em 2024, um funcionário da empresa Arup, em Hong Kong, transferiu esse valor depois de uma videochamada com o “diretor financeiro” e colegas. Todos eram deepfakes.", "CNN / Fortune, 2024"],
      ["2º maior risco", "Desinformação é o 2º maior risco global para os próximos 2 anos, segundo mais de 1.300 especialistas.", "Fórum Econômico Mundial, Global Risks Report 2026"],
      ["Proibido nas eleições", "No Brasil, o TSE proibiu o uso de deepfakes em propaganda eleitoral e exige aviso quando houver conteúdo feito com IA.", "TSE, Resolução nº 23.732/2024"],
    ];
    casos.forEach(([n, d, f], i) => {
      const y = 2.0 + i * 1.55;
      texto(s, n, { x: M, y, w: 3.3, h: 1.35, fontSize: 26, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, [{ text: d, options: { breakLine: true } }, { text: f, options: { fontSize: 10, italic: true, color: C.accent5 } }], { x: 4.05, y, w: 4.6, h: 1.35, fontSize: 13, valign: "middle" });
    });
    await foto(s, "espelho.jpg", 9.0, 2.0, 3.73, 4.4, { alt: "Ilustração de um espelho antigo (Anthropic)", legenda: "Ilustração: Anthropic" });
    s.addNotes("O primeiro perigo é a desinformação. Hoje a IA cria vídeos, fotos e vozes falsas quase perfeitas, os deepfakes. Em 2024, um funcionário de uma empresa em Hong Kong transferiu 25 milhões de dólares depois de uma videochamada em que todos os colegas eram falsos. O Fórum Econômico Mundial coloca a desinformação como o segundo maior risco global para os próximos dois anos. E aqui no Brasil o TSE proibiu deepfakes na propaganda eleitoral. Dica: desconfie de vídeos chocantes e confirme em fontes confiáveis.");
  }

  // 10 — Erros e vieses
  {
    const s = conteudo("03 · Perigos", "A IA erra, inventa e pode ser injusta", 2, "Perigos · 3 de 5");
    cartao(s, M, 2.0, 5.85, 4.45);
    await circulo(s, Lu.LuGavel, M + 0.3, 2.25, 0.7, { fill: C.background1 });
    texto(s, "Alucinações", { x: M + 1.2, y: 2.25, w: 4.3, h: 0.7, fontSize: 19, bold: true, color: C.text1, valign: "middle" });
    texto(s, "+1.300", { x: M + 0.3, y: 3.1, w: 5.2, h: 0.85, fontSize: 48, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
    texto(s, "processos na Justiça, no mundo todo, em que advogados ou partes usaram IA e citaram casos que nunca existiram (até abril de 2026).", { x: M + 0.3, y: 4.0, w: 5.25, h: 0.95, fontSize: 14 });
    texto(s, "Lembra do slide sobre prever a próxima palavra? A IA escreve o que “parece certo”, mesmo quando é falso, e com muita confiança.", { x: M + 0.3, y: 5.05, w: 5.25, h: 0.9, fontSize: 13, color: C.accent5 });
    cartao(s, 6.65, 2.0, 6.05, 4.45);
    await circulo(s, Lu.LuScale, 6.95, 2.25, 0.7, { fill: C.background1 });
    texto(s, "Vieses (preconceitos)", { x: 7.85, y: 2.25, w: 4.6, h: 0.7, fontSize: 19, bold: true, color: C.text1, valign: "middle" });
    texto(s, "Taxa de erro de sistemas comerciais de reconhecimento facial (2018):", { x: 6.95, y: 3.1, w: 5.5, h: 0.55, fontSize: 13 });
    s.addChart(pres.charts.BAR, [{ name: "Erro", labels: ["Mulheres de pele escura", "Homens de pele clara"], values: [34.7, 0.8] }], {
      ...chartBase(), x: 6.85, y: 3.65, w: 5.7, h: 1.55, barDir: "bar", catAxisOrientation: "maxMin",
      chartColors: [HEX.accent1], dataLabelPosition: "outEnd", dataLabelFormatCode: '0.0"%"', barGapWidthPct: 40, valAxisMinVal: 0, valAxisMaxVal: 45,
    });
    texto(s, "A IA aprende com dados humanos e pode copiar e ampliar os preconceitos que estão neles.", { x: 6.95, y: 5.3, w: 5.5, h: 0.65, fontSize: 13, color: C.accent5 });
    fonte(s, "Damien Charlotin, AI Hallucination Cases Database (via NPR, 2026); Buolamwini & Gebru, “Gender Shades”, MIT, 2018.");
    s.addNotes("O segundo problema: a IA erra, e erra com confiança. Isso se chama alucinação. Já são mais de 1.300 processos na Justiça em que alguém usou IA e citou casos que nunca existiram. E tem o viés: uma pesquisa do MIT mostrou que sistemas de reconhecimento facial erravam 34,7% das vezes com mulheres de pele escura, contra menos de 1% com homens de pele clara. A IA aprende com dados humanos e pode repetir nossos preconceitos.");
  }

  // 11 — Empregos e energia
  {
    const s = conteudo("03 · Perigos", "Empregos e meio ambiente", 2, "Perigos · 4 de 5");
    cartao(s, M, 2.0, 5.85, 4.45);
    await circulo(s, Lu.LuBriefcase, M + 0.3, 2.25, 0.7, { fill: C.background1 });
    texto(s, "Mercado de trabalho", { x: M + 1.2, y: 2.25, w: 4.3, h: 0.7, fontSize: 19, bold: true, color: C.text1, valign: "middle" });
    [["40%", "dos empregos do mundo serão afetados pela IA"], ["60%", "nos países ricos, onde há mais trabalho de escritório"]].forEach(([n, d], i) => {
      const y = 3.2 + i * 1.15;
      texto(s, n, { x: M + 0.3, y, w: 1.75, h: 0.95, fontSize: 42, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, d, { x: M + 2.1, y, w: 3.45, h: 0.95, fontSize: 14, valign: "middle" });
    });
    texto(s, "Cerca de metade pode ganhar produtividade; a outra metade pode perder tarefas, salário ou vagas.", { x: M + 0.3, y: 5.5, w: 5.25, h: 0.8, fontSize: 13, color: C.accent5 });
    cartao(s, 6.65, 2.0, 6.05, 4.45);
    await circulo(s, Lu.LuZap, 6.95, 2.25, 0.7, { fill: C.background1 });
    texto(s, "Consumo de energia", { x: 7.85, y: 2.25, w: 4.6, h: 0.7, fontSize: 19, bold: true, color: C.text1, valign: "middle" });
    texto(s, "Eletricidade usada por data centers no mundo (TWh):", { x: 6.95, y: 3.1, w: 5.5, h: 0.35, fontSize: 13 });
    s.addChart(pres.charts.BAR, [{ name: "TWh", labels: ["2024", "2030 (previsão)"], values: [415, 945] }], {
      ...chartBase(), x: 6.85, y: 3.45, w: 5.7, h: 1.75, barDir: "bar", catAxisOrientation: "maxMin",
      chartColors: [HEX.accent1], dataLabelPosition: "outEnd", dataLabelFormatCode: "0", barGapWidthPct: 40, valAxisMinVal: 0, valAxisMaxVal: 1150,
    });
    texto(s, "Em 2030, os data centers devem gastar um pouco mais de energia do que o Japão inteiro consome hoje.", { x: 6.95, y: 5.3, w: 5.5, h: 0.65, fontSize: 13, color: C.accent5 });
    fonte(s, "Fundo Monetário Internacional (FMI), K. Georgieva, 2024; Agência Internacional de Energia (IEA), “Energy and AI”, 2025.");
    s.addNotes("O terceiro grupo de riscos afeta a sociedade toda. O FMI calcula que 40% dos empregos do mundo serão afetados pela IA, chegando a 60% nos países ricos. Metade pode ficar mais produtiva, mas a outra metade pode perder tarefas ou vagas. E tem o meio ambiente: a Agência Internacional de Energia prevê que o consumo de eletricidade dos data centers vai mais que dobrar até 2030, passando o consumo atual do Japão inteiro.");
  }

  // 12 — Crimes e controle
  {
    const s = conteudo("03 · Perigos", "Crimes e perda de controle", 2, "Perigos · 5 de 5");
    const riscos = [
      [Lu.LuBug, "Ataques hackers", "Em 2025, a Anthropic descobriu e interrompeu um grupo de espionagem que usou o Claude Code para automatizar ataques a cerca de 30 alvos no mundo."],
      [Lu.LuBiohazard, "Armas biológicas", "Uma das maiores preocupações: a IA ajudar alguém a criar armas químicas ou biológicas. Por isso as empresas colocam bloqueios nos modelos."],
      [Lu.LuUnplug, "Perda de controle", "Em testes simulados da Anthropic (2025), modelos de várias empresas chegaram a chantagear pessoas para não serem desligados."],
    ];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 3.0;
      cartao(s, x, 2.0, 2.8, 4.45);
      await circulo(s, riscos[i][0], x + 0.25, 2.25, 0.7, { fill: C.background1 });
      texto(s, riscos[i][1], { x: x + 0.25, y: 3.1, w: 2.35, h: 0.4, fontSize: 17, bold: true, color: C.text1 });
      texto(s, riscos[i][2], { x: x + 0.25, y: 3.55, w: 2.35, h: 2.8, fontSize: 13 });
    }
    cartao(s, 9.6, 2.0, 3.13, 4.45, C.text1);
    texto(s, "“", { x: 9.9, y: 2.05, w: 1, h: 0.8, fontSize: 64, bold: true, color: C.accent1, fontFace: THEME.headFontFace });
    texto(s, "Reduzir o risco de extinção causado pela IA deve ser uma prioridade global, ao lado de pandemias e guerra nuclear.", { x: 9.9, y: 2.8, w: 2.6, h: 2.5, fontSize: 15, italic: true, color: C.background1, fontFace: THEME.headFontFace });
    texto(s, "Declaração assinada por centenas de cientistas e pelos chefes da OpenAI, do Google DeepMind e da Anthropic (2023)", { x: 9.9, y: 5.3, w: 2.6, h: 1.0, fontSize: 10, color: C.accent6 });
    fonte(s, "Anthropic, “Disrupting the first reported AI-orchestrated cyber espionage campaign” (2025) e “Agentic Misalignment” (2025); Center for AI Safety, Statement on AI Risk (2023).");
    s.addNotes("Por fim, os riscos mais graves. Em 2025, a própria Anthropic descobriu um grupo de espionagem usando o Claude Code para automatizar ataques hackers, e bloqueou. Existe o medo de a IA ajudar a criar armas biológicas. E existe o risco de perda de controle: em testes simulados, modelos de várias empresas chegaram a chantagear pessoas para não serem desligados. É só um teste, mas mostra por que segurança importa. Tanto que, em 2023, centenas de cientistas e os próprios chefes das empresas de IA assinaram que reduzir esse risco deve ser prioridade mundial, como pandemias e guerra nuclear.");
  }

  // 13 — Anthropic e Claude
  pres.addSection({ title: "04 · Anthropic" });
  {
    const s = conteudo("04 · Anthropic", "Anthropic: uma empresa criada pela segurança", 3);
    await foto(s, "farol.jpg", M, 2.0, 3.2, 4.45, { alt: "Ilustração de um farol à noite (Anthropic)", legenda: "Ilustração: Anthropic" });
    texto(s, "Fundada em 2021, em São Francisco (EUA), pelos irmãos Dario e Daniela Amodei e ex-pesquisadores da OpenAI. A ideia: se a IA vai ficar poderosa, empresas preocupadas com segurança precisam estar na frente.", { x: 4.1, y: 2.0, w: 8.6, h: 1.05, fontSize: 15, color: C.text1 });
    const pil = [
      [Lu.LuScrollText, "IA Constitucional", "O Claude segue princípios escritos: ser útil, honesto e evitar danos"],
      [Lu.LuShieldCheck, "Escalonamento responsável", "Quanto mais forte o modelo, mais testes antes do lançamento"],
      [Lu.LuMicroscope, "Interpretabilidade", "Pesquisa para entender o que acontece “dentro” da IA"],
    ];
    for (let i = 0; i < 3; i++) {
      const x = 4.1 + i * 2.93;
      cartao(s, x, 3.25, 2.75, 1.85);
      await circulo(s, pil[i][0], x + 0.2, 3.42, 0.55, { fill: C.background1 });
      texto(s, pil[i][1], { x: x + 0.85, y: 3.42, w: 1.75, h: 0.55, fontSize: 13, bold: true, color: C.text1, valign: "middle" });
      texto(s, pil[i][2], { x: x + 0.2, y: 4.08, w: 2.38, h: 0.95, fontSize: 12 });
    }
    texto(s, "A família Claude", { x: 4.1, y: 5.3, w: 4, h: 0.32, fontSize: 14, bold: true, color: C.accent1 });
    const fam = [["Haiku", "rápido"], ["Sonnet", "equilibrado"], ["Opus", "avançado"], ["Fable 5.2", "o mais forte"], ["Mythos", "restrito"]];
    const fw = 1.6, fg = 0.15;
    fam.forEach(([n, d], i) => {
      const x = 4.1 + i * (fw + fg), dest = i === 3;
      cartao(s, x, 5.7, fw, 0.75, dest ? C.accent1 : C.background2);
      texto(s, [{ text: n, options: { bold: true, breakLine: true, fontSize: 14, color: dest ? C.background1 : C.text1 } }, { text: d, options: { fontSize: 11, color: dest ? C.background1 : C.accent5 } }], { x, y: 5.7, w: fw, h: 0.75, align: "center", valign: "middle" });
    });
    s.addNotes("Agora o nível mais específico: a Anthropic. Ela foi fundada em 2021 pelos irmãos Dario e Daniela Amodei, que saíram da OpenAI preocupados com segurança. A empresa tem três frentes: a IA Constitucional, em que o Claude segue princípios escritos; o escalonamento responsável, que exige mais testes conforme o modelo fica mais forte; e a interpretabilidade, que tenta entender o que acontece dentro da IA. O produto dela é o Claude, uma família de modelos: Haiku, o mais rápido; Sonnet, o equilibrado; Opus, o avançado; e o Fable 5.2, lançado em novembro, o mais forte. O Mythos é restrito a especialistas em segurança. Inclusive, foi a própria Anthropic que publicou várias das pesquisas sobre perigos que mostrei.");
  }

  // 14 — Futuro
  pres.addSection({ title: "05 · Futuro" });
  {
    const s = conteudo("05 · Futuro", "O futuro depende de como usamos", 4);
    const lados = [
      ["O que pode melhorar", HEX.accent3, C.accent3, [
        [Lu.LuHeartPulse, "Saúde", "Diagnósticos mais rápidos e novos remédios"],
        [Lu.LuSchool, "Educação", "Um tutor para cada aluno, a qualquer hora"],
        [Lu.LuFlaskConical, "Ciência", "Pesquisas de anos feitas em meses"],
      ]],
      ["Como usar com responsabilidade", HEX.accent1, C.accent1, [
        [Lu.LuGraduationCap, "Professor, não cola", "Peça para explicar, não para fazer por você"],
        [Lu.LuSearchCheck, "Sempre confira", "A IA erra: compare com fontes confiáveis"],
        [Lu.LuLock, "Proteja seus dados", "Nunca compartilhe senhas ou dados pessoais"],
      ]],
    ];
    for (let c = 0; c < 2; c++) {
      const x = M + c * 6.15;
      cartao(s, x, 2.0, 5.95, 4.45);
      texto(s, lados[c][0], { x: x + 0.35, y: 2.2, w: 5.3, h: 0.45, fontSize: 20, bold: true, color: lados[c][2], fontFace: THEME.headFontFace });
      for (let i = 0; i < 3; i++) {
        const y = 2.95 + i * 1.12;
        await circulo(s, lados[c][3][i][0], x + 0.35, y, 0.75, { fill: C.background1, hex: lados[c][1] });
        texto(s, [{ text: lados[c][3][i][1], options: { bold: true, color: C.text1, breakLine: true } }, { text: lados[c][3][i][2], options: { fontSize: 14, color: C.accent5 } }], { x: x + 1.3, y, w: 4.4, h: 0.75, valign: "middle", fontSize: 17 });
      }
    }
    s.addNotes("E o futuro? A IA pode melhorar muito a saúde, a educação e a ciência. Mas, como vimos, também traz perigos reais. Por isso, o que a gente pode fazer é usar com responsabilidade: usar a IA como professor e não como cola, sempre conferir as informações e proteger nossos dados.");
  }

  // 15 — Encerramento e fontes
  pres.addSection({ title: "Encerramento" });
  {
    const s = pres.addSlide({ masterName: "FINAL", sectionTitle: "Encerramento" });
    s.addText("Obrigado!", { placeholder: "title" });
    s.addText("Perguntas?\nLuiz · 1ºB · Ensino Médio", { placeholder: "body" });
    texto(s, "A IA é uma ferramenta poderosa. Quem entende os riscos e aprende a usá-la com senso crítico sai na frente.", { x: M, y: 4.3, w: 5.4, h: 1.3, fontSize: 18, italic: true, color: C.background1, fontFace: THEME.headFontFace });
    texto(s, "FONTES", { x: 6.7, y: 1.5, w: 6, h: 0.35, fontSize: 13, bold: true, charSpacing: 3, color: C.accent1 });
    const fontes = [
      "International AI Safety Report 2026 — Y. Bengio et al.",
      "World Economic Forum — Global Risks Report 2026",
      "FMI — K. Georgieva, “AI will transform the global economy” (2024)",
      "IEA — Energy and AI (2025)",
      "Buolamwini & Gebru — Gender Shades, MIT (2018)",
      "D. Charlotin — AI Hallucination Cases Database; NPR (2026)",
      "CNN / Fortune — caso Arup (2024) · TSE — Res. 23.732/2024",
      "Anthropic — relatórios de segurança (2025) e anthropic.com",
      "Center for AI Safety — Statement on AI Risk (2023)",
      "OpenAI, Google, Anthropic — anúncios oficiais (2026) · BenchLM",
      "Nobel Prize — nobelprize.org (2024)",
      "Imagens: Anthropic (ilustrações) e Wikimedia Commons",
    ];
    texto(s, fontes.map((f, i) => ({ text: f, options: { bullet: true, breakLine: i < fontes.length - 1 } })), { x: 6.7, y: 1.95, w: 6.03, h: 4.6, fontSize: 12, color: C.accent6, paraSpaceAfter: 4 });
    s.addNotes("Para fechar: a IA é uma ferramenta muito poderosa, mas tem riscos reais. Quem entende esses riscos e aprende a usar com senso crítico sai na frente. Todas as informações vieram dessas fontes confiáveis. Muito obrigado! Alguém tem alguma pergunta?");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("OK:", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
