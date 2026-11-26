// Gera "IA - Anthropic - Claude.pptx" (11 slides, visual leve e acolhedor)
// Uso: NODE_PATH=<node_modules com pptxgenjs, jszip, react, react-dom, react-icons, sharp> PPTX_SKILL_DIR=<skill pptx> node gerar.js
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const JSZip = require("jszip");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const Lu = require("react-icons/lu");
const { applyTheme } = require(path.join(process.env.PPTX_SKILL_DIR || ".", "scripts/apply_theme.js"));

const OUT = path.join(__dirname, "IA - Anthropic - Claude.pptx");
const IMG = (f) => path.join(__dirname, "img", f);

const THEME = {
  name: "IA acolhedor",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "2B2723", // tinta quente
    lt1: "FFFFFF", // cartões
    dk2: "4A443D", // texto de corpo
    lt2: "F7F4ED", // fundo marfim
    accent1: "C15F3C", // terracota
    accent2: "5B87B5", // azul
    accent3: "6E8350", // sálvia
    accent4: "E3B261", // mel
    accent5: "6F6860", // texto suave
    accent6: "E4DED2", // linhas e detalhes
    hlink: "C15F3C", folHlink: "6E8350",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Luiz";
pres.title = "Inteligência Artificial: do começo ao Claude";
pres.subject = "Apresentação escolar — 1ºB Ensino Médio";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

const M = 0.7;
const TOTAL = 11;

// ---------- Utilitários ----------
async function icon(Comp, hex) {
  const svg = renderToStaticMarkup(React.createElement(Comp, { size: 256, color: "#" + hex, strokeWidth: 1.75 }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// Foto recortada na proporção da caixa e com cantos arredondados (sem distorcer)
async function foto(slide, file, x, y, w, h, { pos = "centre", alt = "", legenda, raio = 0.22 } = {}) {
  const pxW = Math.round(w * 200), pxH = Math.round(h * 200), r = Math.round(raio * 200);
  const mask = Buffer.from(`<svg width="${pxW}" height="${pxH}"><rect width="${pxW}" height="${pxH}" rx="${r}" ry="${r}"/></svg>`);
  const buf = await sharp(IMG(file)).resize(pxW, pxH, { fit: "cover", position: pos })
    .composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  slide.addImage({ data: "image/png;base64," + buf.toString("base64"), x, y, w, h, altText: alt });
  if (legenda) {
    slide.addText(legenda, { x, y: y + h + 0.08, w, h: 0.26, fontSize: 10, italic: true, color: C.accent5, margin: 0, isTextBox: true, valign: "top" });
  }
}

const sombra = () => ({ type: "outer", color: "6F6860", opacity: 0.14, blur: 10, offset: 3, angle: 90 });

function cartao(slide, x, y, w, h, fill = C.background1, comSombra = true) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.2, fill: { color: fill }, line: { type: "none" }, objectName: "Cartão",
    ...(comSombra ? { shadow: sombra() } : {}),
  });
}

async function circulo(slide, Comp, x, y, d, { fill = C.background2, hex = HEX.accent1 } = {}) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" }, objectName: "Círculo de ícone" });
  const p = d * 0.24;
  slide.addImage({ data: await icon(Comp, hex), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, altText: "" });
}

function texto(slide, t, opts) {
  slide.addText(t, { isTextBox: true, margin: 0, valign: "top", color: C.text2, fontSize: 17, ...opts });
}

// Pontinhos de progresso (no lugar de barras ou números grandes)
function progresso(slide, n) {
  const d = 0.1, g = 0.12, w = TOTAL * d + (TOTAL - 1) * g;
  for (let i = 0; i < TOTAL; i++) {
    slide.addShape(pres.shapes.OVAL, {
      x: 12.63 - w + i * (d + g), y: 7.0, w: d, h: d, line: { type: "none" },
      fill: { color: i === n - 1 ? C.accent1 : C.accent6 }, objectName: "Progresso",
    });
  }
}

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "CAPA",
  background: { color: C.background2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 2.35, w: 6.4, h: 2.2, fontFace: THEME.headFontFace, fontSize: 44, bold: true, color: C.text1, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 4.7, w: 6.4, h: 1.4, fontSize: 20, color: C.accent5, valign: "top", margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "CONTEUDO",
  background: { color: C.background2 },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: M, y: 0.55, w: 11.9, h: 0.35, fontSize: 14, italic: true, color: C.accent1, fontFace: THEME.headFontFace, valign: "middle", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 0.92, w: 11.9, h: 0.85, fontFace: THEME.headFontFace, fontSize: 36, bold: true, color: C.text1, valign: "middle", margin: 0 }, text: "" } },
    { text: { text: "Luiz · 1ºB", options: { x: M, y: 6.92, w: 4, h: 0.26, fontSize: 11, color: C.accent5, margin: 0 } } },
  ],
});

function conteudo(sec, kicker, titulo, n) {
  const s = pres.addSlide({ masterName: "CONTEUDO", sectionTitle: sec });
  s.addText(kicker, { placeholder: "kicker" });
  s.addText(titulo, { placeholder: "title" });
  progresso(s, n);
  return s;
}


// Gráfico de colunas desenhado com formas: ícone + nome em cima de cada barra
async function ranking(slide, itens, base) {
  const x0 = M, w = 8.3, yBase = 6.45, hMax = 3.05, n = itens.length;
  const bw = 1.25, gap = (w - n * bw) / (n - 1);
  const topo = Math.max(...itens.map((i) => i[3]));
  slide.addShape(pres.shapes.LINE, { x: x0, y: yBase, w, h: 0, line: { color: C.accent6, width: 1.25 }, objectName: "Linha de base" });
  for (let i = 0; i < n; i++) {
    const [Ic, nome, emp, pts] = itens[i];
    const x = x0 + i * (bw + gap);
    const h = Math.max(0.5, hMax * (pts - base) / (topo - base));
    const y = yBase - h;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: bw, h: h + 0.15, rectRadius: 0.12, fill: { color: i === 0 ? C.accent1 : C.text1 }, line: { type: "none" }, objectName: "Barra " + nome });
    slide.addShape(pres.shapes.RECTANGLE, { x, y: yBase, w: bw, h: 0.2, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Base reta" });
    texto(slide, String(pts).replace(/(\d)(\d{3})$/, "$1.$2"), { x, y: y + 0.12, w: bw, h: 0.35, align: "center", fontSize: 15, bold: true, color: C.background1 });
    texto(slide, `${1 + itens.filter((o) => o[3] > pts).length}º`, { x, y: yBase - 0.48, w: bw, h: 0.35, align: "center", fontSize: 13, color: i === 0 ? C.background1 : C.accent6 });
    await circulo(slide, Ic, x + bw / 2 - 0.3, y - 1.32, 0.6, { fill: C.background1, hex: i === 0 ? HEX.accent1 : HEX.dk1 });
    texto(slide, [{ text: nome, options: { bold: true, color: C.text1, fontSize: 15, breakLine: true } }, { text: emp, options: { fontSize: 10, color: C.accent5 } }], { x: x - 0.15, y: y - 0.68, w: bw + 0.3, h: 0.6, align: "center", valign: "bottom" });
  }
}

function explicacao(slide, titulo, corpo, extra) {
  cartao(slide, 9.45, 2.05, 3.18, 4.6);
  texto(slide, titulo, { x: 9.7, y: 2.3, w: 2.7, h: 0.75, fontSize: 18, bold: true, color: C.text1, fontFace: THEME.headFontFace });
  texto(slide, corpo, { x: 9.7, y: 3.1, w: 2.7, h: 2.0, fontSize: 14 });
  texto(slide, extra, { x: 9.7, y: 5.15, w: 2.7, h: 1.3, fontSize: 13, italic: true, color: C.accent1 });
}

// pptxgenjs grava o texto como inglês (en-US); o PowerPoint/Google então oferece
// traduzir e troca nomes como "Deep Blue" e "Anthropic". Marca tudo como pt-BR.
async function marcarPortugues(file) {
  const src = await JSZip.loadAsync(fs.readFileSync(file));
  const out = new JSZip();
  for (const [name, entry] of Object.entries(src.files)) {
    if (entry.dir) continue;
    if (/^ppt\/.*\.xml$/.test(name)) {
      out.file(name, (await entry.async("string")).replace(/lang="en-US"/g, 'lang="pt-BR"'), { createFolders: false });
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
    s.addText("Apresentação · tema livre", { x: M, y: 1.8, w: 6, h: 0.4, fontSize: 16, italic: true, color: C.accent1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText("Inteligência Artificial: do começo ao Claude", { placeholder: "title" });
    s.addText("Luiz · 1ºB · Ensino Médio", { placeholder: "body" });
    await foto(s, "mente.jpg", 7.55, 0.7, 5.08, 6.1, { alt: "Ilustração de um perfil humano com círculos coloridos (Anthropic)", raio: 0.35 });
    s.addText("Ilustração: Anthropic", { x: 7.55, y: 6.88, w: 5.08, h: 0.26, fontSize: 10, italic: true, color: C.accent5, margin: 0, isTextBox: true, align: "right" });
    s.addNotes("Oi, gente! Eu sou o Luiz, do 1ºB, e vou falar sobre Inteligência Artificial: o que é, como chegou até aqui e uma empresa chamada Anthropic, que cria o Claude.");
  }

  // 2 — O que é IA
  pres.addSection({ title: "A IA" });
  {
    const s = conteudo("A IA", "Para começar", "Afinal, o que é Inteligência Artificial?", 2);
    texto(s, "É quando um computador aprende com exemplos e passa a fazer coisas que antes só pessoas faziam.", { x: M, y: 2.1, w: 6.9, h: 1.2, fontSize: 22, color: C.text1, fontFace: THEME.headFontFace });
    const tipos = [
      [Lu.LuEye, "IA que reconhece", "Filtro de spam, recomendações do YouTube, desbloqueio pelo rosto"],
      [Lu.LuSparkles, "IA que cria", "Escreve textos, faz imagens e responde perguntas: ChatGPT, Gemini, Claude"],
    ];
    for (let i = 0; i < 2; i++) {
      const y = 3.55 + i * 1.6;
      cartao(s, M, y, 6.9, 1.4);
      await circulo(s, tipos[i][0], M + 0.3, y + 0.3, 0.8);
      texto(s, [{ text: tipos[i][1], options: { bold: true, color: C.text1, fontSize: 19, breakLine: true } }, { text: tipos[i][2], options: { fontSize: 15, color: C.accent5 } }], { x: M + 1.35, y: y + 0.15, w: 5.35, h: 1.1, valign: "middle" });
    }
    await foto(s, "quebra-cabeca.jpg", 8.1, 2.1, 4.53, 4.5, { alt: "Ilustração de uma peça de quebra-cabeça (Anthropic)", legenda: "Ilustração: Anthropic" });
    s.addNotes("IA é quando o computador aprende com exemplos e passa a fazer coisas que antes só pessoas faziam. Tem a IA que reconhece, como o filtro de spam e as recomendações do YouTube, e a IA que cria, como o ChatGPT e o Claude.");
  }

  // 3 — História em 3 momentos
  {
    const s = conteudo("A IA", "Um pouco de história", "Três momentos que marcaram a IA", 3);
    const cw = 3.75, gap = 0.33, ih = 2.85;
    const momentos = [
      ["1950", "Alan Turing", "Pergunta pela primeira vez: “Máquinas podem pensar?”", "turing.jpg", "Alan Turing · domínio público", "north"],
      ["1997", "IBM Deep Blue", "Computador da IBM vence o campeão mundial de xadrez.", "deep-blue.jpg", "Deep Blue · James the photographer, CC BY 2.0", "centre"],
      ["2022", "ChatGPT", "Chega a 100 milhões de pessoas em uns 2 meses.", null, "", ""],
    ];
    for (let i = 0; i < 3; i++) {
      const [ano, nome, d, img, cred, pos] = momentos[i];
      const x = M + i * (cw + gap);
      cartao(s, x, 2.05, cw, 4.6);
      if (img) {
        await foto(s, img, x + 0.2, 2.25, cw - 0.4, ih, { pos, alt: nome, raio: 0.16 });
        texto(s, cred, { x: x + 0.2, y: 2.25 + ih + 0.05, w: cw - 0.4, h: 0.24, fontSize: 9, italic: true, color: C.accent5 });
      } else {
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.2, y: 2.25, w: cw - 0.4, h: ih, rectRadius: 0.16, fill: { color: C.accent4 }, line: { type: "none" }, objectName: "Fundo ChatGPT" });
        await circulo(s, Lu.LuMessageCircle, x + cw / 2 - 0.65, 2.25 + ih / 2 - 0.65, 1.3, { fill: C.background1, hex: HEX.dk1 });
      }
      texto(s, [{ text: ano + "  ", options: { color: C.accent1 } }, { text: nome, options: { color: C.text1 } }], { x: x + 0.25, y: 5.45, w: cw - 0.5, h: 0.45, fontSize: 21, bold: true, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, d, { x: x + 0.25, y: 5.92, w: cw - 0.5, h: 0.65, fontSize: 14 });
    }
    s.addNotes("Separei três momentos. Em 1950, Alan Turing perguntou se máquinas poderiam pensar. Em 1997, o Deep Blue, da IBM, venceu o campeão mundial de xadrez. E em 2022 veio o ChatGPT, que chegou a 100 milhões de pessoas em uns dois meses.");
  }

  // 4 — Ranking das IAs de texto (gráfico de colunas no estilo "pódio")
  pres.addSection({ title: "A IA hoje" });
  {
    const s = conteudo("A IA hoje", "Ranking real · novembro de 2026", "As IAs mais fortes do mundo hoje", 4);
    await ranking(s, [
      [Lu.LuGem, "Gemini", "Google", 1549],
      [Lu.LuInfinity, "Meta AI", "Meta", 1545],
      [Lu.LuAsterisk, "Claude", "Anthropic", 1540],
      [Lu.LuMessageCircle, "ChatGPT", "OpenAI", 1531],
      [Lu.LuMoon, "Kimi", "Moonshot · China", 1528],
    ], 1450);
    explicacao(s, "Como esse ranking funciona?", "No site Arena, as pessoas fazem uma pergunta, recebem duas respostas sem saber de qual IA elas são e votam na melhor. Milhões de votos viram uma pontuação.", "Mostra o melhor modelo de cada empresa. A diferença entre eles é bem pequena: o 1º lugar muda quase toda semana.");
    texto(s, "Fonte: Arena (arena.ai), ranking de texto, 22/11/2026. Barras a partir de 1.450 pontos.", { x: M, y: 6.6, w: 8.3, h: 0.28, fontSize: 10, italic: true, color: C.accent5 });
    s.addNotes("Este é um ranking real das IAs mais fortes, do site Arena. Lá as pessoas fazem uma pergunta, recebem duas respostas sem saber de qual IA são e votam na melhor. Em novembro de 2026, o Gemini, do Google, está em primeiro, seguido pela IA da Meta, o Claude, o ChatGPT e o Kimi, que é chinês. A diferença entre eles é bem pequena, e o primeiro lugar muda quase toda semana.");
  }

  // 5 — Ranking das IAs de imagem
  {
    const s = conteudo("A IA hoje", "Ranking real · novembro de 2026", "As IAs que mais acertam na hora de criar imagens", 5);
    await ranking(s, [
      [Lu.LuImage, "GPT Image", "OpenAI · ChatGPT", 1429],
      [Lu.LuLayoutGrid, "MAI Image", "Microsoft · Copilot", 1385],
      [Lu.LuBanana, "Nano Banana", "Google · Gemini", 1325],
      [Lu.LuSprout, "Seedream", "ByteDance · China", 1256],
      [Lu.LuPalette, "Qwen-Image", "Alibaba · China", 1256],
    ], 1150);
    explicacao(s, "Você escreve, a IA desenha", "Basta descrever a imagem (“um gato astronauta na Lua”) e a IA cria do zero. O ranking funciona igual: pessoas votam na melhor imagem sem saber qual IA fez.", "E o Midjourney? Ele é famoso por imagens artísticas, mas não participa desse ranking.");
    texto(s, "Fonte: Arena (arena.ai), ranking de texto para imagem, nov/2026. Barras a partir de 1.150 pontos.", { x: M, y: 6.6, w: 8.3, h: 0.28, fontSize: 10, italic: true, color: C.accent5 });
    s.addNotes("E estas são as IAs que criam imagens. Você descreve o que quer, tipo um gato astronauta na Lua, e ela desenha do zero. Em primeiro está o GPT Image, que fica dentro do ChatGPT. Depois vem o da Microsoft, que está no Copilot, e o Nano Banana, do Google, que está no Gemini. Depois vêm duas chinesas, o Seedream e o Qwen. O Midjourney, que é bem famoso, não participa desse ranking.");
  }

  // 5 — O que já faz
  {
    const s = conteudo("A IA hoje", "A IA hoje", "O que a IA já consegue fazer", 6);
    const feitos = [
      [Lu.LuPill, "Ajudar a criar remédios", "O AlphaFold descobriu a forma de milhões de proteínas e ganhou o Nobel de Química em 2024."],
      [Lu.LuMedal, "Medalha de ouro em matemática", "Em 2025, a IA resolveu provas da Olimpíada Internacional de Matemática."],
      [Lu.LuBookOpen, "Ajudar no dia a dia", "Explicar matéria, revisar textos, traduzir e programar."],
    ];
    for (let i = 0; i < 3; i++) {
      const y = 2.1 + i * 1.5;
      cartao(s, M, y, 7.0, 1.3);
      await circulo(s, feitos[i][0], M + 0.28, y + 0.25, 0.8);
      texto(s, [{ text: feitos[i][1], options: { bold: true, color: C.text1, fontSize: 19, breakLine: true } }, { text: feitos[i][2], options: { fontSize: 14, color: C.accent5 } }], { x: M + 1.3, y: y + 0.1, w: 5.5, h: 1.1, valign: "middle" });
    }
    await foto(s, "flor.jpg", 8.1, 2.1, 4.53, 4.3, { alt: "Ilustração de uma flor e pedras (Anthropic)", legenda: "Ilustração: Anthropic", pos: "east" });
    s.addNotes("A IA já faz coisas incríveis. O AlphaFold ajudou a entender as proteínas e ganhou o Nobel de Química. Em 2025, a IA tirou ouro na Olimpíada de Matemática. E no dia a dia ela ajuda a estudar, escrever e traduzir.");
  }

  // 6 — Cuidados
  pres.addSection({ title: "Cuidados" });
  {
    const s = conteudo("Cuidados", "Nem tudo são flores", "Três cuidados que precisamos ter", 7);
    const cuid = [
      [Lu.LuVenetianMask, "Vídeos falsos", "A IA cria vídeos e vozes falsos (deepfakes). Uma empresa perdeu US$ 25 milhões num golpe assim."],
      [Lu.LuCircleHelp, "A IA também erra", "Às vezes ela inventa coisas com muita confiança. Sempre confira em outra fonte."],
      [Lu.LuShieldAlert, "Mau uso", "Pode ser usada em golpes e ataques hackers. Por isso as empresas colocam travas de segurança."],
    ];
    const cw = 3.75, gap = 0.33;
    for (let i = 0; i < 3; i++) {
      const x = M + i * (cw + gap);
      cartao(s, x, 2.1, cw, 3.9);
      await circulo(s, cuid[i][0], x + 0.35, 2.45, 0.95);
      texto(s, cuid[i][1], { x: x + 0.35, y: 3.65, w: cw - 0.7, h: 0.5, fontSize: 21, bold: true, color: C.text1, fontFace: THEME.headFontFace });
      texto(s, cuid[i][2], { x: x + 0.35, y: 4.2, w: cw - 0.7, h: 1.6, fontSize: 15 });
    }
    texto(s, "Fontes: CNN e Fortune (2024); International AI Safety Report (2026).", { x: M, y: 6.3, w: 11.9, h: 0.3, fontSize: 11, italic: true, color: C.accent5 });
    s.addNotes("Mas a IA também tem riscos. Ela cria vídeos falsos: uma empresa perdeu 25 milhões de dólares num golpe assim. Ela erra e inventa coisas, então sempre confira. E pode ser usada em golpes, por isso as empresas colocam travas.");
  }

  // 7 — Empregos
  {
    const s = conteudo("Cuidados", "A pergunta que todo mundo faz", "A IA vai roubar nossos empregos?", 8);
    cartao(s, M, 2.1, 4.6, 4.45, C.text1);
    texto(s, "40%", { x: M + 0.4, y: 2.45, w: 3.8, h: 1.4, fontSize: 88, bold: true, color: C.accent4, fontFace: THEME.headFontFace, valign: "middle" });
    texto(s, "dos empregos do mundo vão ser afetados pela IA.", { x: M + 0.4, y: 3.95, w: 3.8, h: 1.0, fontSize: 20, color: C.background1, fontFace: THEME.headFontFace });
    texto(s, "Fundo Monetário Internacional (FMI), 2024", { x: M + 0.4, y: 5.85, w: 3.8, h: 0.4, fontSize: 11, italic: true, color: C.accent6 });
    texto(s, [{ text: "Afetado não quer dizer demitido. ", options: { bold: true, color: C.text1 } }, { text: "Na maioria das vezes, a IA muda as tarefas e ajuda a pessoa a trabalhar, em vez de fazer tudo sozinha." }], { x: 5.75, y: 2.15, w: 6.88, h: 1.3, fontSize: 18 });
    cartao(s, 5.75, 3.7, 6.88, 1.45);
    await circulo(s, Lu.LuQuote, 6.0, 3.97, 0.85);
    texto(s, [{ text: "O próprio CEO da Anthropic, Dario Amodei, alertou que empregos de início de carreira em escritório podem diminuir bastante.", options: { breakLine: true } }, { text: "Axios, 2025", options: { fontSize: 11, italic: true, color: C.accent5 } }], { x: 7.05, y: 3.8, w: 5.35, h: 1.25, fontSize: 15, valign: "middle" });
    texto(s, [{ text: "O que fazer? ", options: { bold: true, color: C.accent1 } }, { text: "Aprender a usar a IA e caprichar no que ela faz mal: criatividade, conversa com pessoas e senso crítico." }], { x: 5.75, y: 5.4, w: 6.88, h: 1.15, fontSize: 17 });
    s.addNotes("A pergunta que todo mundo faz: a IA vai roubar empregos? O FMI diz que 40% dos empregos do mundo vão ser afetados, mas afetado não é demitido: na maioria das vezes a IA muda as tarefas. Até o CEO da Anthropic alertou que empregos de início de carreira podem diminuir. Então o melhor é aprender a usar a IA e caprichar no que ela faz mal: criatividade, conversar com pessoas e senso crítico.");
  }

  // 8 — Anthropic
  pres.addSection({ title: "Anthropic e Claude" });
  {
    const s = conteudo("Anthropic e Claude", "Do geral para o específico", "Anthropic: a empresa que cria o Claude", 9);
    await foto(s, "farol.jpg", M, 2.1, 4.0, 4.45, { alt: "Ilustração de um farol à noite (Anthropic)", legenda: "Ilustração: Anthropic" });
    texto(s, "Criada em 2021 pelos irmãos Dario e Daniela Amodei. A ideia principal: fazer uma IA útil e segura.", { x: 5.15, y: 2.1, w: 7.48, h: 1.0, fontSize: 20, color: C.text1, fontFace: THEME.headFontFace });
    const ideias = [
      [Lu.LuScrollText, "Uma “constituição”", "O Claude segue regras escritas: ser útil, honesto e não causar danos."],
      [Lu.LuShieldCheck, "Testes antes de lançar", "Quanto mais forte o modelo, mais testes de segurança ele precisa passar."],
    ];
    for (let i = 0; i < 2; i++) {
      const y = 3.35 + i * 1.6;
      cartao(s, 5.15, y, 7.48, 1.4);
      await circulo(s, ideias[i][0], 5.43, y + 0.3, 0.8);
      texto(s, [{ text: ideias[i][1], options: { bold: true, color: C.text1, fontSize: 19, breakLine: true } }, { text: ideias[i][2], options: { fontSize: 15, color: C.accent5 } }], { x: 6.5, y: y + 0.12, w: 5.9, h: 1.15, valign: "middle" });
    }
    s.addNotes("Agora o mais específico: a Anthropic, a empresa que cria o Claude. Ela foi criada em 2021 pelos irmãos Dario e Daniela Amodei, com uma ideia principal: fazer uma IA útil e segura. O Claude segue uma espécie de constituição, regras como ser útil e honesto. E quanto mais forte o modelo, mais testes de segurança ele passa antes de ser lançado.");
  }

  // 9 — Claude
  {
    const s = conteudo("Anthropic e Claude", "Do geral para o específico", "Conheça o Claude", 10);
    texto(s, "Uma família de modelos com nomes de poesia, do mais rápido ao mais forte:", { x: M, y: 2.05, w: 11.9, h: 0.45, fontSize: 18 });
    const fam = [
      ["Haiku", "poema curtinho", "o mais rápido"],
      ["Sonnet", "soneto", "o equilibrado"],
      ["Opus", "“grande obra”", "o avançado"],
      ["Fable 5.2", "lançado em nov/2026", "o mais forte"],
    ];
    const cw = 2.8, gap = 0.233;
    for (let i = 0; i < 4; i++) {
      const x = M + i * (cw + gap), dest = i === 3;
      cartao(s, x, 2.7, cw, 1.75, dest ? C.accent1 : C.background1);
      texto(s, fam[i][0], { x: x + 0.3, y: 2.9, w: cw - 0.6, h: 0.55, fontSize: 26, bold: true, color: dest ? C.background1 : C.text1, fontFace: THEME.headFontFace, valign: "middle" });
      texto(s, fam[i][1], { x: x + 0.3, y: 3.45, w: cw - 0.6, h: 0.3, fontSize: 13, italic: true, color: dest ? C.background1 : C.accent5 });
      texto(s, fam[i][2], { x: x + 0.3, y: 3.8, w: cw - 0.6, h: 0.4, fontSize: 16, bold: true, color: dest ? C.background1 : C.accent1 });
    }
    texto(s, "Dica para usar qualquer IA melhor", { x: M, y: 4.8, w: 11.9, h: 0.4, fontSize: 18, bold: true, color: C.text1 });
    const dicas = [[Lu.LuUser, "Diga quem você é", "“Sou do 1º ano…”"], [Lu.LuTarget, "Diga o que quer", "“Explique as 3 causas…”"], [Lu.LuListChecks, "Diga o formato", "“…em tópicos curtos”"]];
    for (let i = 0; i < 3; i++) {
      const x = M + i * 4.1;
      await circulo(s, dicas[i][0], x, 5.4, 0.85, { fill: C.background1 });
      texto(s, [{ text: dicas[i][1], options: { bold: true, color: C.text1, breakLine: true } }, { text: dicas[i][2], options: { fontSize: 14, italic: true, color: C.accent5 } }], { x: x + 1.05, y: 5.4, w: 2.9, h: 0.85, valign: "middle", fontSize: 17 });
    }
    s.addNotes("O Claude é uma família de modelos com nomes de poesia: Haiku, o mais rápido; Sonnet, o equilibrado; Opus, o avançado; e o Fable 5.2, o mais forte, lançado em novembro. E uma dica para usar qualquer IA: diga quem você é, o que você quer e em que formato.");
  }

  // 10 — Obrigado
  pres.addSection({ title: "Encerramento" });
  {
    const s = pres.addSlide({ masterName: "CAPA", sectionTitle: "Encerramento" });
    s.addText("Conclusão", { x: M, y: 1.8, w: 6, h: 0.4, fontSize: 16, italic: true, color: C.accent1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true });
    s.addText("Obrigado!", { placeholder: "title" });
    s.addText("A IA é uma ótima ferramenta, desde que a gente use com cuidado e senso crítico.\nPerguntas?", { placeholder: "body" });
    await foto(s, "ceu.jpg", 7.55, 0.7, 5.08, 6.1, { alt: "Ilustração de um céu com nuvens e lua (Anthropic)", raio: 0.35, pos: "centre" });
    texto(s, "Fontes: Arena (arena.ai, nov/2026) · Anthropic (anthropic.com) · FMI (2024) · Axios (2025) · CNN e Fortune (2024) · International AI Safety Report (2026) · nobelprize.org · anúncios da OpenAI e do Google (2026). Imagens: Anthropic e Wikimedia Commons.", { x: M, y: 6.3, w: 6.4, h: 0.6, fontSize: 10, color: C.accent5 });
    s.addNotes("Pra fechar: a IA é uma ótima ferramenta, desde que a gente use com cuidado e senso crítico. Obrigado! Alguém tem alguma pergunta?");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  await marcarPortugues(OUT);
  console.log("OK:", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
