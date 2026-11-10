# Gama Distribuidora: site institucional

Site da **Gama Distribuidora de Bebidas e Tabacaria** (CLS 404, Bloco D, Loja 01, Asa Sul, Brasília – DF).

O site é uma vitrine com foco em **atendimento pelo WhatsApp**. Não há compras no site: ele apresenta a loja, os produtos e as fotos, e todos os botões abrem uma conversa no WhatsApp com uma mensagem já escrita.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Lenis e `tailwind-merge`.

## Como executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev       # http://localhost:5173
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos (`tsc -b`) + build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Lint com oxlint |

## O que a página tem

- **Verificação de idade (18+)** na primeira visita, guardada no navegador. Esc e clique fora não a fecham.
- **Navbar** que fica compacta ao rolar, destaca a seção atual e mostra o selo **Aberto agora / Fechado**, calculado no horário de Brasília.
- **Hero** com fotos reais da loja, contato do WhatsApp e endereço em cartões flutuantes.
- **O que temos:** vinhos, espumantes, destilados e licores, cervejas, tabacaria premium, festas e presentes. Cada card abre o WhatsApp com uma mensagem sobre aquele assunto.
- **Galeria de fotos** com filtros por categoria, "mostrar mais" e visualização em tela cheia. Dá para navegar pelas setas do teclado, pelo gesto de deslizar e pelas miniaturas.
- **Sobre**, **Atendimento** (como funciona o atendimento pelo WhatsApp), **Como chegar** (mapa, rota no Google Maps e no Waze, horários) e **Dúvidas** em acordeão.
- **Fale com a gente:** atalhos de mensagem pronta ("Quero uma indicação de vinho", "Tem cerveja gelada?"…) e um QR code para quem está no computador continuar a conversa no celular.
- **Atalhos fixos:** barra inferior no celular (WhatsApp + rota) e botão flutuante no desktop.
- **Rodapé** com os avisos legais: venda proibida para menores de 18 anos, "Beba com moderação" e advertência do Ministério da Saúde.

## Estrutura

```
src/
  components/
    brand/      # logotipo vetorizado (símbolo, assinatura horizontal e versão empilhada)
    effects/    # fundo animado em WebGL
    gallery/    # visualização ampliada das fotos
    icons/      # ícones próprios (WhatsApp, Instagram, narguilé, taças)
    layout/     # navbar, menu mobile, verificação de idade, atalhos fixos e rodapé
    ui/         # botão, diálogo, foto, selo de horário, revelação no scroll etc.
  data/         # todo o conteúdo do site (loja, serviços, fotos, FAQ, mensagens prontas)
  hooks/        # seção ativa, horário de funcionamento, rolagem etc.
  lib/          # utilitários (links do WhatsApp, cálculo de horário, classes)
  sections/     # uma seção da página por arquivo
  services/     # carregamento da galeria (local ou API)
```

## Personalização

**Dados da loja:** ficam em `src/data/store.ts`: nome, WhatsApp, Instagram, endereço, links de mapa e horários.

> ⚠️ **Confirme os horários antes de publicar.** Os valores de `schedule` e `hours` em `src/data/store.ts` são provisórios e alimentam o selo "Aberto agora".

**Mensagens do WhatsApp:**

- Texto padrão: `DEFAULT_WHATSAPP_MESSAGE` em `src/data/store.ts`.
- Mensagem de cada categoria: campo `message` em `src/data/services.ts`.
- Atalhos da seção final: `src/data/quickMessages.ts`.

**Fotos:** as imagens em `public/images/galeria/` foram recortadas do Instagram da loja e por isso têm resolução limitada. Para mais nitidez, substitua cada arquivo pelo original, mantendo o mesmo nome. Use WebP ou AVIF com cerca de 1600px no maior lado e ajuste `width` e `height` em `src/data/media.ts`. Para incluir uma foto nova na galeria, adicione-a em `src/data/media.ts` e em `src/data/gallery.ts`.

**QR code:** `public/images/whatsapp-qr.svg` aponta para `https://wa.me/5561999634341`. Se o número mudar, gere um novo QR code com o link atualizado.

**Identidade visual:** as cores, fontes, sombras e animações são tokens no bloco `@theme` de `src/index.css`:

- grafite (`ink`) para a base;
- vinho (`wine`) para os destaques sobre fundo claro;
- champanhe (`gold`) para os destaques sobre fundo escuro;
- verde WhatsApp com contraste AA.

As fontes (Playfair Display, Inter e IBM Plex Mono) são servidas pelo próprio site.

**Galeria via API (opcional):** sem configuração, a galeria usa as fotos locais. Para buscá-las de um endpoint, por exemplo um serviço que espelha o feed do Instagram, copie `.env.example` para `.env` e defina:

```bash
VITE_GALLERY_API_URL=https://sua-api.com/galeria
```

O endpoint deve devolver uma lista no formato de `GalleryPhoto` (`src/types/index.ts`).

## Qualidade

- HTML semântico, link para pular ao conteúdo e navegação completa por teclado, incluindo os filtros, a galeria em tela cheia, o acordeão e os diálogos com foco preso.
- Contraste AA e suporte a `prefers-reduced-motion`. A auditoria do axe-core passa sem violações.
- SEO: título, meta description, Open Graph com imagem própria, dados estruturados (`schema.org/LiquorStore`) e `robots.txt`.

Antes de publicar, defina a URL canônica e a URL absoluta da `og:image` em `index.html` com o domínio final.
