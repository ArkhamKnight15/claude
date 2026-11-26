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
const STEPS = ["IA", "IA hoje", "Perigos", "Anthropic"];
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

// Marca todo o texto como português (pptxgenjs grava en-US, o que faz o
// PowerPoint/Google oferecer tradução e trocar nomes como "Deep Blue" e "Anthropic")
async function marcarPortugues(file) {
  const fs = require("fs");
  const JSZip = require("jszip");
  const src = await JSZip.loadAsync(fs.readFileSync(file));
  const out = new JSZip();
  for (const [name, entry] of Object.entries(src.files)) {
    if (entry.dir) continue; // sem entradas de pasta: elas atrapalham abrir o arquivo na nuvem
    if (/^ppt\/.*\.xml$/.test(name)) {
      const xml = await entry.async("string");
      out.file(name, xml.replace(/lang="en-US"/g, 'lang="pt-BR"'), { createFolders: false });
    } else {
      out.file(name, await entry.async("nodebuffer"), { createFolders: false });
    }
  }
  fs.writeFileSync(file, await out.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

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
    funil(s, { x: M, y: 2.1, w: 6.2, barH: 0.82, gap: 0.2, escuro: false, todos: true });
    const itens = [
      ["IA", "O que é e de onde veio"],
      ["IA hoje", "Os modelos mais fortes e o que já fazem"],
      ["Perigos", "Seis riscos reais, um de cada vez"],
      ["Anthropic", "A empresa que cria o Claude e aposta em segurança"],
    ];
    itens.forEach(([t, d], i) => {
      texto(s, [{ text: t, options: { bold: true, color: C.text1, breakLine: true } }, { text: d, options: { fontSize: 14, color: C.accent5 } }], { x: 7.4, y: 2.1 + i * 1.02, w: 5.3, h: 0.82, valign: "middle", fontSize: 17 });
    });
    s.addNotes("Vou seguir um funil, do mais geral para o mais específico: primeiro a IA em geral, depois como ela está hoje, depois a parte mais importante, que são os perigos, e por fim uma empresa específica, a Anthropic, que cria o Claude.");
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

  // 4 — História em 3 momentos
  {
    const s = conteudo("01 · IA", "Três momentos que marcaram a IA", 0);
    const cw = 3.9, gap = 0.2, ih = 2.75;
    const momentos = [
      ["1950", "Alan Turing", "O matemático britânico pergunta: “Máquinas podem pensar?” e cria o Teste de Turing.", "turing.jpg", "Alan Turing · domínio público", "north"],
      ["1997", "IBM Deep Blue", "O supercomputador Deep Blue, da IBM, vence o campeão mundial de xadrez Garry Kasparov.", "deep-blue.jpg", "Deep Blue · James the photographer, CC BY 2.0", "centre"],
      ["2022", "ChatGPT", "A OpenAI lança o ChatGPT: 100 milhões de usuários em cerca de 2 meses, e a IA vira assunto no mundo todo.", null, "", ""],
    ];
    for (let i = 0; i < 3; i++) {
      const [ano, nome, d, img, cred, pos] = momentos[i];
      const x = M + i * (cw + gap);
      if (img) {
        await foto(s, img, x, 2.0, cw, ih, { pos, alt: nome, legenda: cred });
      } else {
        cartao(s, x, 2.0, cw, ih, C.text1);
        await circulo(s, Lu.LuMessagesSquare, x + cw / 2 - 0.6, 2.0 + ih / 2 - 0.85, 1.2, { fill: C.accent5, hex: "FFFFFF" });
        texto(s, "ChatGPT", { x, y: 2.0 + ih / 2 + 0.5, w: cw, h: 0.5, align: "center", fontSize: 22, bold: true, color: C.background1, fontFace: THEME.headFontFace });
      }
      texto(s, [{ text: ano + "  ", options: { color: C.accent1 } }, { text: nome, options: { color: C.text1 } }], { x, y: 5.15, w: cw, h: 0.5, fontSize: 24, bold: true, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, d, { x, y: 5.7, w: cw, h: 0.85, fontSize: 14 });
    }
    s.addNotes("A IA tem mais de 70 anos de história, e eu separei três momentos. Em 1950, o matemático britânico Alan Turing perguntou se máquinas poderiam pensar e criou o Teste de Turing. Em 1997, o Deep Blue, um supercomputador da IBM, venceu o campeão mundial de xadrez Garry Kasparov. E em 2022 a OpenAI lançou o ChatGPT, que chegou a 100 milhões de usuários em uns dois meses e fez todo mundo começar a falar de IA.");
  }

  // 5 — Modelos mais fortes
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
    s.addNotes("Estes são os modelos mais fortes do mundo hoje, em novembro de 2026. O GPT-6 Astra, da OpenAI, que roda no ChatGPT. O Gemini 4, do Google. O Claude Fable 5.2, da Anthropic, lançado agora em novembro e em primeiro lugar em vários rankings. O Grok, da empresa do Elon Musk. E o DeepSeek, da China, que é aberto: qualquer um pode baixar. Curiosidade: esses modelos ficaram tão bons em encontrar falhas de segurança que as empresas liberaram primeiro só para especialistas em cibersegurança.");
  }

  // 6 — Conquistas
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
    fonte(s, "Prêmio Nobel (nobelprize.org); International AI Safety Report 2026 (Yoshua Bengio et al.).", M, 6.55, 8.0);
    s.addNotes("A IA já faz coisas impressionantes. Em 2024, o AlphaFold ganhou o Nobel de Química por prever a forma das proteínas, o que ajuda a criar remédios. Em 2025, a IA chegou a nível de medalha de ouro na Olimpíada Internacional de Matemática. Hoje os melhores modelos superam doutores em testes de ciência. E um agente de IA ficou entre os 5% melhores numa competição de hackers. Esse último exemplo já mostra o outro lado: o que serve para defender também pode servir para atacar.");
  }

  // 7 — O alerta do CEO da Anthropic
  pres.addSection({ title: "03 · Perigos" });
  {
    const s = conteudo("03 · Perigos", "O alerta de quem cria a IA", 2);
    cartao(s, M, 2.0, 3.9, 4.45, C.text1);
    texto(s, "25%", { x: M + 0.35, y: 2.3, w: 3.2, h: 1.3, fontSize: 80, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
    texto(s, "de chance de as coisas darem “muito, muito errado” com a IA.", { x: M + 0.35, y: 3.7, w: 3.2, h: 1.0, fontSize: 18, color: C.background1, fontFace: THEME.headFontFace, italic: true });
    texto(s, "Dario Amodei, CEO da Anthropic, em setembro de 2025 (Axios). Na mesma fala, deu 75% de chance de a IA dar muito certo.", { x: M + 0.35, y: 4.9, w: 3.2, h: 1.3, fontSize: 12, color: C.accent6 });
    texto(s, [{ text: "Dario Amodei ", options: { bold: true, color: C.text1 } }, { text: "é cofundador e CEO da Anthropic, a empresa que cria o Claude. Mesmo fabricando IA, ele é uma das vozes que mais alertam sobre os riscos." }], { x: 4.75, y: 2.0, w: 7.98, h: 0.8, fontSize: 15 });
    const falas = [
      ["“Nós, como produtores dessa tecnologia, temos o dever e a obrigação de ser honestos sobre o que está por vir.”", "Axios, maio de 2025 — ao alertar sobre empregos"],
      ["No ensaio “A Adolescência da Tecnologia”, ele compara a humanidade a um adolescente que recebeu um poder enorme e precisa amadurecer rápido. Cita armas biológicas, perda de controle, governos autoritários e desemprego, mas diz que os riscos podem ser vencidos se agirmos com cuidado.", "Ensaio “The Adolescence of Technology”, janeiro de 2026"],
    ];
    for (let i = 0; i < 2; i++) {
      const y = 2.95 + i * 1.82;
      cartao(s, 4.75, y, 7.98, 1.65);
      await circulo(s, Lu.LuQuote, 4.95, y + 0.2, 0.55, { fill: C.background1 });
      texto(s, [{ text: falas[i][0], options: { color: C.text1, fontSize: i === 0 ? 16 : 13, italic: i === 0, fontFace: i === 0 ? THEME.headFontFace : undefined, breakLine: true } }, { text: falas[i][1], options: { fontSize: 10, color: C.accent5 } }], { x: 5.7, y: y + 0.15, w: 6.85, h: 1.38, valign: "middle" });
    }
    s.addNotes("Agora a parte mais importante: os perigos. E quem alerta não são só pessoas contra a tecnologia. Dario Amodei é o CEO da Anthropic, a empresa que cria o Claude. Em 2025, ele disse que existe 25% de chance de as coisas darem muito, muito errado com a IA. Ele também disse que, como fabricantes, eles têm o dever de ser honestos sobre o que vem por aí. E em 2026 escreveu um ensaio chamado A Adolescência da Tecnologia, dizendo que a humanidade recebeu um poder enorme e precisa amadurecer rápido. Mas ele também acredita que os riscos podem ser vencidos. Vou mostrar seis perigos, um de cada vez.");
  }

  // 8 — Perigo 1: Desinformação e deepfakes
  {
    const s = conteudo("03 · Perigos", "Desinformação e deepfakes", 2, "Perigo 1 de 6");
    texto(s, "Deepfakes são vídeos, fotos e vozes falsos criados por IA, cada vez mais difíceis de diferenciar dos reais.", { x: M, y: 1.85, w: 8.0, h: 0.6, fontSize: 15, color: C.text1 });
    const casos = [
      ["US$ 25 milhões", "Em 2024, um funcionário da empresa Arup, em Hong Kong, transferiu esse valor depois de uma videochamada com o “diretor financeiro” e colegas. Todos eram deepfakes.", "CNN / Fortune, 2024"],
      ["2º maior risco", "Desinformação é o 2º maior risco global para os próximos 2 anos, segundo mais de 1.300 especialistas.", "World Economic Forum, Global Risks Report 2026"],
      ["Proibido nas eleições", "No Brasil, o TSE proibiu deepfakes na propaganda eleitoral e exige aviso quando houver conteúdo feito com IA.", "TSE, Resolução nº 23.732/2024"],
    ];
    casos.forEach(([n, d, f], i) => {
      const y = 2.6 + i * 1.3;
      texto(s, n, { x: M, y, w: 3.3, h: 1.15, fontSize: 26, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, [{ text: d, options: { breakLine: true } }, { text: f, options: { fontSize: 10, italic: true, color: C.accent5 } }], { x: 4.05, y, w: 4.6, h: 1.15, fontSize: 13, valign: "middle" });
    });
    await foto(s, "espelho.jpg", 9.0, 2.0, 3.73, 4.4, { alt: "Ilustração de um espelho antigo (Anthropic)", legenda: "Ilustração: Anthropic" });
    s.addNotes("Perigo 1: desinformação. A IA cria vídeos, fotos e vozes falsas quase perfeitas, os deepfakes. Em 2024, um funcionário de uma empresa em Hong Kong transferiu 25 milhões de dólares depois de uma videochamada em que todos os colegas eram falsos. O Fórum Econômico Mundial coloca a desinformação como o segundo maior risco do mundo para os próximos dois anos. E aqui no Brasil o TSE proibiu deepfakes na propaganda eleitoral. Dica: desconfie de vídeos chocantes e confirme em fontes confiáveis.");
  }

  // 9 — Perigo 2: Alucinações
  {
    const s = conteudo("03 · Perigos", "A IA erra com confiança: as “alucinações”", 2, "Perigo 2 de 6");
    cartao(s, M, 2.0, 5.85, 4.45);
    await circulo(s, Lu.LuBrain, M + 0.3, 2.25, 0.7, { fill: C.background1 });
    texto(s, "Por que isso acontece?", { x: M + 1.2, y: 2.25, w: 4.3, h: 0.7, fontSize: 19, bold: true, color: C.text1, valign: "middle" });
    texto(s, "Um chatbot funciona prevendo a próxima palavra mais provável, uma de cada vez. Ele escreve o que “parece certo”, não o que ele sabe ser verdade.", { x: M + 0.3, y: 3.15, w: 5.25, h: 1.2, fontSize: 15 });
    texto(s, [{ text: "Exemplo: ", options: { bold: true, color: C.accent1 } }, { text: "pedir uma fonte e receber um livro, um site ou uma lei que não existem, com nome, autor e data inventados." }], { x: M + 0.3, y: 4.5, w: 5.25, h: 1.0, fontSize: 14 });
    texto(s, "Por isso: sempre confira em outra fonte.", { x: M + 0.3, y: 5.65, w: 5.25, h: 0.5, fontSize: 15, bold: true, color: C.text1 });
    cartao(s, 6.65, 2.0, 6.08, 4.45, C.text1);
    await circulo(s, Lu.LuGavel, 6.95, 2.25, 0.7, { fill: C.accent5, hex: "FFFFFF" });
    texto(s, "Até na Justiça", { x: 7.85, y: 2.25, w: 4.6, h: 0.7, fontSize: 19, bold: true, color: C.background1, valign: "middle" });
    texto(s, "+1.300", { x: 6.95, y: 3.1, w: 5.5, h: 1.1, fontSize: 64, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
    texto(s, "processos no mundo em que advogados ou partes usaram IA e citaram casos judiciais que nunca existiram (até abril de 2026).", { x: 6.95, y: 4.3, w: 5.5, h: 0.95, fontSize: 15, color: C.background1 });
    texto(s, "Em 2023, nos EUA, advogados foram multados por apresentar a um juiz seis processos inventados pelo ChatGPT (caso Mata v. Avianca).", { x: 6.95, y: 5.35, w: 5.5, h: 0.9, fontSize: 12, color: C.accent6 });
    fonte(s, "Damien Charlotin, AI Hallucination Cases Database (via NPR, 2026); Mata v. Avianca, Justiça Federal de Nova York (2023).");
    s.addNotes("Perigo 2: a IA erra, e erra com confiança. Isso se chama alucinação. Acontece porque o chatbot funciona prevendo a próxima palavra mais provável: ele escreve o que parece certo, não o que sabe ser verdade. Às vezes inventa livros, sites e leis que não existem. Isso já chegou na Justiça: são mais de 1.300 processos em que alguém usou IA e citou casos falsos. Em 2023, advogados nos Estados Unidos foram multados por entregar ao juiz seis processos inventados pelo ChatGPT.");
  }

  // 10 — Perigo 3: Trabalho
  {
    const s = conteudo("03 · Perigos", "A IA vai substituir os trabalhadores?", 2, "Perigo 3 de 6");
    const stats = [
      ["50%", "dos empregos de nível inicial em escritório (tecnologia, finanças, direito) podem sumir, segundo Dario Amodei, CEO da Anthropic.", "Axios, maio de 2025"],
      ["10–20%", "de desemprego nos EUA em 1 a 5 anos é o cenário que ele alertou. Muitos economistas acham exagerado.", "Axios, maio de 2025"],
      ["40%", "dos empregos do mundo serão afetados pela IA (60% nos países ricos): metade pode ganhar produtividade, a outra metade perder tarefas ou vagas.", "FMI, 2024"],
    ];
    stats.forEach(([n, d, f], i) => {
      const y = 2.0 + i * 1.5;
      texto(s, n, { x: M, y, w: 2.3, h: 1.3, fontSize: 40, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, [{ text: d, options: { breakLine: true } }, { text: f, options: { fontSize: 10, italic: true, color: C.accent5 } }], { x: 3.0, y, w: 3.75, h: 1.3, fontSize: 13, valign: "middle" });
    });
    cartao(s, 7.05, 2.0, 5.68, 2.55);
    texto(s, "Como as pessoas usam o Claude no trabalho", { x: 7.3, y: 2.15, w: 5.2, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
    s.addChart(pres.charts.BAR, [{ name: "Conversas", labels: ["IA ajuda a pessoa", "IA faz a tarefa sozinha"], values: [52, 45] }], {
      ...chartBase(), x: 7.15, y: 2.55, w: 5.45, h: 1.55, barDir: "bar", catAxisOrientation: "maxMin",
      chartColors: [HEX.accent1], dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', barGapWidthPct: 40, valAxisMinVal: 0, valAxisMaxVal: 65,
    });
    texto(s, "Anthropic Economic Index, jan/2026", { x: 7.3, y: 4.12, w: 5.2, h: 0.3, fontSize: 10, italic: true, color: C.accent5 });
    cartao(s, 7.05, 4.75, 5.68, 1.7, C.text1);
    texto(s, [{ text: "Resposta curta: ", options: { bold: true, color: C.accent4 } }, { text: "por enquanto, a IA substitui mais tarefas do que pessoas. Mas quem está começando a carreira pode sentir primeiro. Vale aprender a usar IA e desenvolver o que ela faz mal: criatividade, comunicação e senso crítico.", options: { color: C.background1 } }], { x: 7.3, y: 4.75, w: 5.2, h: 1.7, valign: "middle", fontSize: 13 });
    s.addNotes("Perigo 3, que é a pergunta que todo mundo faz: a IA vai substituir os trabalhadores? O próprio CEO da Anthropic, Dario Amodei, alertou em 2025 que a IA pode eliminar metade dos empregos de nível inicial em escritório e levar o desemprego nos EUA a 10 ou 20% em até cinco anos. Muitos economistas acham isso exagerado, mas o FMI também calcula que 40% dos empregos do mundo serão afetados. Por outro lado, os dados da própria Anthropic mostram que, na maioria das conversas, a IA ajuda a pessoa em vez de fazer tudo sozinha. Então, por enquanto, a IA substitui mais tarefas do que pessoas. Mas quem está começando a carreira, como nós no futuro, pode sentir primeiro. Por isso vale aprender a usar IA e desenvolver criatividade, comunicação e senso crítico.");
  }

  // 11 — Perigo 4: Meio ambiente
  {
    const s = conteudo("03 · Perigos", "O custo ambiental da IA", 2, "Perigo 4 de 6");
    cartao(s, M, 2.0, 7.0, 4.45);
    await circulo(s, Lu.LuZap, M + 0.3, 2.25, 0.7, { fill: C.background1 });
    texto(s, "Eletricidade usada por data centers no mundo (TWh)", { x: M + 1.2, y: 2.25, w: 5.5, h: 0.7, fontSize: 17, bold: true, color: C.text1, valign: "middle" });
    s.addChart(pres.charts.BAR, [{ name: "TWh", labels: ["2024", "2030 (previsão)"], values: [415, 945] }], {
      ...chartBase(), x: M + 0.3, y: 3.1, w: 6.4, h: 3.2, barDir: "col",
      chartColors: [HEX.accent1], dataLabelPosition: "outEnd", dataLabelFormatCode: "0", dataLabelFontSize: 14, catAxisLabelFontSize: 13, barGapWidthPct: 80, valAxisMinVal: 0, valAxisMaxVal: 1100,
    });
    const st = [
      ["2×", "o consumo de energia dos data centers deve mais que dobrar até 2030"],
      ["≈ Japão", "em 2030, eles devem gastar um pouco mais do que o Japão inteiro consome hoje"],
      ["+17%", "foi o quanto esse consumo cresceu só em 2025, puxado pela IA"],
    ];
    st.forEach(([n, d], i) => {
      const y = 2.0 + i * 1.5;
      texto(s, n, { x: 7.95, y, w: 4.78, h: 0.65, fontSize: 32, bold: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, d, { x: 7.95, y: y + 0.65, w: 4.78, h: 0.7, fontSize: 14 });
    });
    fonte(s, "Agência Internacional de Energia (IEA), “Energy and AI” (2025) e atualização de 2026.");
    s.addNotes("Perigo 4: o meio ambiente. Toda vez que usamos IA, um data center, que é um prédio cheio de computadores, gasta energia. A Agência Internacional de Energia prevê que o consumo dos data centers vai mais que dobrar até 2030, passando o que o Japão inteiro consome hoje. Só em 2025 cresceu 17%. Mais energia pode significar mais poluição, dependendo de como ela é produzida.");
  }

  // 12 — Perigo 5: Crimes
  {
    const s = conteudo("03 · Perigos", "IA nas mãos de criminosos", 2, "Perigo 5 de 6");
    const riscos = [
      [Lu.LuBug, "Ataques hackers", "Em 2025, a própria Anthropic descobriu e bloqueou um grupo de espionagem que usou o Claude Code para automatizar ataques a cerca de 30 alvos no mundo."],
      [Lu.LuStore, "Crime “pronto para usar”", "Ferramentas de IA para golpes e vírus de sequestro de dados (ransomware) já são vendidas em mercados criminosos na internet."],
      [Lu.LuBiohazard, "Armas biológicas e químicas", "Um dos maiores medos: a IA ensinar alguém a fabricar uma arma. Por isso as empresas colocam bloqueios nos modelos."],
    ];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 3.0;
      cartao(s, x, 2.0, 2.8, 4.45);
      await circulo(s, riscos[i][0], x + 0.25, 2.25, 0.7, { fill: C.background1 });
      texto(s, riscos[i][1], { x: x + 0.25, y: 3.1, w: 2.35, h: 0.65, fontSize: 16, bold: true, color: C.text1, valign: "top" });
      texto(s, riscos[i][2], { x: x + 0.25, y: 3.8, w: 2.35, h: 2.5, fontSize: 13 });
    }
    cartao(s, 9.6, 2.0, 3.13, 4.45, C.text1);
    await circulo(s, Lu.LuLock, 9.85, 2.25, 0.7, { fill: C.accent5, hex: "FFFFFF" });
    texto(s, "A resposta das empresas", { x: 9.85, y: 3.1, w: 2.65, h: 0.65, fontSize: 16, bold: true, color: C.accent4 });
    texto(s, "Os modelos mais fortes (Claude Mythos, Gemini 4 Argon, GPT-6 Astra) foram liberados primeiro só para especialistas verificados em segurança.", { x: 9.85, y: 3.8, w: 2.65, h: 2.5, fontSize: 13, color: C.background1 });
    fonte(s, "Anthropic, “Disrupting the first reported AI-orchestrated cyber espionage campaign” (2025); International AI Safety Report 2026; anúncios oficiais (2026).");
    s.addNotes("Perigo 5: a IA nas mãos de criminosos. Em 2025, a própria Anthropic descobriu um grupo de espionagem usando o Claude Code para automatizar ataques hackers contra cerca de 30 alvos, e bloqueou. Já existem ferramentas de IA para golpes e vírus sendo vendidas em mercados criminosos. E um dos maiores medos é a IA ensinar alguém a fabricar armas biológicas ou químicas. Por isso as empresas liberaram os modelos mais fortes primeiro só para especialistas verificados.");
  }

  // 13 — Perigo 6: Perda de controle
  {
    const s = conteudo("03 · Perigos", "E se a IA sair do controle?", 2, "Perigo 6 de 6");
    await foto(s, "buraco-negro.jpg", M, 2.0, 3.0, 4.45, { alt: "Ilustração de um buraco negro (Anthropic)" });
    const itens = [
      [Lu.LuUnplug, "Chantagem em testes", "Em 2025, a Anthropic colocou modelos de várias empresas em situações simuladas. Ao “descobrir” que seriam desligados, alguns chegaram a chantagear pessoas para continuar funcionando."],
      [Lu.LuEyeOff, "Comportamento enganoso", "Dario Amodei contou que, em testes sob pressão, o próprio Claude chegou a enganar. Ninguém sabe ainda explicar totalmente como esses modelos “pensam” por dentro."],
    ];
    for (let i = 0; i < 2; i++) {
      const y = 2.0 + i * 2.3;
      cartao(s, 3.85, y, 5.5, 2.15);
      await circulo(s, itens[i][0], 4.1, y + 0.25, 0.65, { fill: C.background1 });
      texto(s, itens[i][1], { x: 4.95, y: y + 0.25, w: 4.2, h: 0.65, fontSize: 17, bold: true, color: C.text1, valign: "middle" });
      texto(s, itens[i][2], { x: 4.1, y: y + 1.0, w: 5.05, h: 1.05, fontSize: 13 });
    }
    cartao(s, 9.6, 2.0, 3.13, 4.45, C.text1);
    texto(s, "“", { x: 9.9, y: 2.05, w: 1, h: 0.8, fontSize: 64, bold: true, color: C.accent1, fontFace: THEME.headFontFace });
    texto(s, "Reduzir o risco de extinção causado pela IA deve ser uma prioridade global, ao lado de pandemias e guerra nuclear.", { x: 9.9, y: 2.8, w: 2.6, h: 2.5, fontSize: 15, italic: true, color: C.background1, fontFace: THEME.headFontFace });
    texto(s, "Declaração assinada por centenas de cientistas e pelos chefes da OpenAI, do Google DeepMind e da Anthropic (2023)", { x: 9.9, y: 5.3, w: 2.6, h: 1.0, fontSize: 10, color: C.accent6 });
    fonte(s, "Anthropic, “Agentic Misalignment” (2025); D. Amodei, “The Adolescence of Technology” (2026); Center for AI Safety, Statement on AI Risk (2023). Ilustração: Anthropic.");
    s.addNotes("Perigo 6, o mais assustador: a perda de controle. Em 2025, a Anthropic fez testes simulados com modelos de várias empresas. Quando descobriam que iam ser desligados, alguns chegaram a chantagear pessoas para continuar funcionando. O próprio Dario Amodei contou que o Claude chegou a enganar em testes sob pressão. Foram só testes, mas mostram por que segurança importa. Tanto que, em 2023, centenas de cientistas e os chefes das maiores empresas de IA, incluindo a Anthropic, assinaram que reduzir esse risco deve ser prioridade mundial, como pandemias e guerra nuclear.");
  }

  // 14 — Anthropic e Claude
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
    s.addNotes("Agora o nível mais específico: a Anthropic. Ela foi fundada em 2021 pelos irmãos Dario e Daniela Amodei, que saíram da OpenAI preocupados com segurança. A empresa tem três frentes: a IA Constitucional, em que o Claude segue princípios escritos; o escalonamento responsável, que exige mais testes conforme o modelo fica mais forte; e a interpretabilidade, que tenta entender o que acontece dentro da IA. O produto dela é o Claude, uma família de modelos: Haiku, o mais rápido; Sonnet, o equilibrado; Opus, o avançado; e o Fable 5.2, lançado em novembro, o mais forte. O Mythos é restrito a especialistas em segurança. Repare que várias das pesquisas sobre perigos que mostrei foram publicadas pela própria Anthropic.");
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
      "Axios — entrevistas com Dario Amodei (maio e setembro de 2025)",
      "D. Amodei — “The Adolescence of Technology” (2026)",
      "Anthropic — Economic Index (2026) e relatórios de segurança (2025)",
      "International AI Safety Report 2026 — Y. Bengio et al.",
      "World Economic Forum — Global Risks Report 2026",
      "FMI — K. Georgieva (2024) · IEA — Energy and AI (2025)",
      "D. Charlotin — AI Hallucination Cases Database; NPR (2026)",
      "CNN / Fortune — caso Arup (2024) · TSE — Res. 23.732/2024",
      "Center for AI Safety — Statement on AI Risk (2023)",
      "OpenAI, Google, Anthropic — anúncios oficiais (2026) · BenchLM",
      "Nobel Prize — nobelprize.org (2024)",
      "Imagens: Anthropic (ilustrações) e Wikimedia Commons",
    ];
    texto(s, fontes.map((f, i) => ({ text: f, options: { bullet: true, breakLine: i < fontes.length - 1 } })), { x: 6.7, y: 1.95, w: 6.03, h: 4.6, fontSize: 12, color: C.accent6, paraSpaceAfter: 4 });
    s.addNotes("Para fechar: a IA é uma ferramenta muito poderosa, mas tem riscos reais, e até quem a cria está alertando sobre eles. Quem entende esses riscos e aprende a usar com senso crítico sai na frente. Todas as informações vieram dessas fontes. Muito obrigado! Alguém tem alguma pergunta?");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  await marcarPortugues(OUT);
  console.log("OK:", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
