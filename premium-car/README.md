# Premium Car — Estética Automotiva

Landing page institucional da Premium Car, focada em conversão pelo WhatsApp.

**Stack:** React 19 + TypeScript, Vite, Tailwind CSS 4, Lucide React. Sem backend.

## Executar

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build
npm run lint
```

## Antes de publicar (dados a preencher)

Todos os dados da empresa ficam em **`src/config/site.ts`**:

| Campo | Exemplo | Observação |
| --- | --- | --- |
| `whatsapp.number` | `'5511987654321'` | Formato internacional, só dígitos (país + DDD + número). |
| `whatsapp.display` | `'(11) 98765-4321'` | Como o número aparece no rodapé. |
| `phone`, `address`, `hours` | — | Vazios aparecem como "A definir". |
| `social.instagram` etc. | `'https://instagram.com/perfil'` | Sem URL, o ícone aparece desativado. |

- Enquanto `whatsapp.number` estiver vazio, os botões abrem o WhatsApp com a mensagem pronta para o
  visitante escolher o contato, e o modo de desenvolvimento exibe um aviso no canto da tela.
- As mensagens iniciais de cada botão estão em `src/config/messages.ts`.
- No `index.html`, informe a URL final em `og:url` e use URL absoluta em `og:image`.

## Imagens

As fotos atuais são **ilustrativas** (Unsplash) e estão centralizadas em `src/data/media.ts`.
Para usar fotos reais da Premium Car, salve-as em `public/images/` (WebP, ~1920px) e troque cada item por
`{ src: '/images/arquivo.webp', alt, width, height }`. Se uma imagem falhar, o componente `<Picture />`
mostra um fundo grafite no lugar.

Na galeria (`src/data/gallery.ts`), informe `before` em um item para habilitar o comparativo
**antes/depois** na visualização ampliada.

## Estrutura

```
src/
  config/      dados da empresa e mensagens do WhatsApp
  data/        conteúdo: serviços, diferenciais, galeria, navegação, fotos
  sections/    blocos da página (Hero, Services, Differentials, Gallery, About, FinalCta)
  components/  ui/ (primitivos), layout/ (header, menu, rodapé, WhatsApp flutuante), brand/, gallery/, icons/
  hooks/       viewport, rolagem, seção ativa, diálogos nativos
  lib/         utilitários (WhatsApp, Unsplash, classes, scroll)
```
