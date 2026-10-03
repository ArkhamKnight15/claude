# OdontoVita: landing page de clínica odontológica

Landing page premium de uma clínica odontológica **fictícia**, focada em gerar agendamentos de consultas.
É um projeto de demonstração: o nome, a equipe, os depoimentos, os números e os contatos são inventados.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React e `tailwind-merge`.

## Como executar

Requer Node.js 20 ou superior.

```bash
cd odontovita
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

- **Navbar dinâmica**: fica compacta e translúcida ao rolar e destaca a seção atual. No mobile vira um menu em tela cheia.
- **Hero** com uma composição de planejamento digital do sorriso (ilustração SVG própria) e cartões flutuantes.
- **Números animados**: contadores disparados ao entrar na tela.
- **Tratamentos**: seis cards. Cada um abre o agendamento com o tratamento já selecionado.
- **Sobre nós**: história, linha do tempo e citação da fundadora.
- **Diferenciais** em layout bento, com a lista de equipamentos.
- **Antes e depois**: slider comparativo (mouse, toque e teclado) com três casos simulados.
- **Depoimentos**, **Equipe** (carrossel no mobile e tablet), **FAQ** em acordeão e **CTA final** com formulário.
- **Agendamento**: modal nativo (`<dialog>`), que vira bottom sheet no mobile. Tem validação, máscara de telefone, estados de carregamento, erro e sucesso, e preserva o rascunho se for fechado sem enviar.
- **Barra fixa de agendamento** no mobile, visível entre o hero e o formulário final.

## Animações

- **Fundo animado (WebGL):** um gradiente fluido gerado por shader em `src/components/effects/AnimatedGradient.tsx`, usado no hero (tons claros) e no CTA final (marinho). Ele é renderizado em meia resolução a 30 fps, pausa fora da tela e não aparece sem suporte a WebGL; nesse caso, fica o fundo estático em CSS. As cores são passadas pela prop `palette`.
- **Rolagem suave com inércia** ([Lenis](https://github.com/darkroomengineering/lenis)), configurada em `src/lib/smoothScroll.ts`, incluindo a navegação por âncoras com foco acessível.
- **Títulos revelados palavra por palavra** (`RevealText`), **parallax e barra de progresso de leitura** ligados à rolagem (CSS scroll-driven animations; navegadores sem suporte mostram o conteúdo estático), **inclinação 3D** no visual do hero, **brilho que segue o cursor** nos cards, **faixa contínua** de tratamentos e **demonstração automática** do slider de antes e depois.
- Com `prefers-reduced-motion` ativado, a rolagem passa a ser direta, os títulos aparecem prontos e o fundo fica estático.

## Estrutura

```
src/
  components/
    booking/        # contexto, modal e formulário de agendamento
    brand/          # logo
    icons/          # ícones próprios (dente, implante, aparelho, redes sociais)
    illustrations/  # ilustrações SVG (sorriso paramétrico, interior da clínica, retratos)
    layout/         # navbar, menu mobile, barra fixa e footer
    ui/             # botão, container, cabeçalho de seção, revelação no scroll etc.
  data/             # todo o conteúdo do site (textos, equipe, FAQ, contatos)
  hooks/            # revelação no scroll, seção ativa, contador, trava de scroll
  lib/              # utilitários (classes, máscara de telefone, validação)
  sections/         # uma seção da página por arquivo
  services/         # envio do agendamento (mock ou API real)
```

## Personalização

**Conteúdo:** todos os textos e dados ficam em `src/data/`. Comece por `clinic.ts`, que reúne nome, telefone, endereço, horários e redes sociais.

**Identidade visual:** as cores, fontes, sombras e animações são tokens no bloco `@theme` de `src/index.css`.

**Fotos:** a página usa ilustrações e placeholders elegantes no lugar de fotos. Para usar imagens reais:

1. Salve os arquivos em `public/images/`, de preferência em WebP ou AVIF, com cerca de 1600px no maior lado.
2. Foto da clínica: preencha `src`, `width` e `height` em `src/data/media.ts`.
3. Equipe: preencha `photo` em `src/data/team.ts`, na proporção 4:5.

Os placeholders são substituídos automaticamente, sem mudar nenhum componente.

**API de agendamento:** sem configuração, o formulário usa uma resposta simulada. Para enviar a uma API real, copie `.env.example` para `.env` e defina:

```bash
VITE_APPOINTMENTS_API_URL=https://sua-api.com/agendamentos
```

O formulário faz um `POST` JSON com `{ name, phone, email?, treatment, period, message? }` e espera uma resposta com `{ protocol, createdAt }`. O contrato está em `src/services/appointments.ts`.

## Qualidade

- HTML semântico, link para pular ao conteúdo e navegação completa por teclado, incluindo as abas, o slider, o acordeão e o modal com foco preso.
- Contraste AA e suporte a `prefers-reduced-motion`. A auditoria do axe-core passa sem violações.
- SEO: título, meta description, Open Graph com imagem própria, dados estruturados (`schema.org/Dentist`) e `robots.txt`.
- Fontes servidas pelo próprio site (Instrument Serif e Manrope), sem requisições a terceiros.

Antes de publicar, defina a URL canônica e a URL absoluta da `og:image` em `index.html` com o domínio final.
