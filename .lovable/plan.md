## Plano: Atualização da Home Cluny

Trabalho extenso (10 seções, ~1500 linhas de JSX). Vou reescrever quase totalmente `src/components/cluny/Sections.tsx` mantendo a identidade visual já existente (paleta, fontes, tokens) e os componentes que continuam iguais.

### Arquivos afetados
- `src/components/cluny/Sections.tsx` — reescrita das seções Hero, Metodo, Diagnostico, Manifesto, Cases, Conteudo, FAQ, Footer; nova seção `Materiais`
- `src/routes/index.tsx` — incluir `<Materiais />` entre `<Conteudo />` e `<Cadastro />` (e remover `<Atuacao />` se a métrica/cards do hero estavam lá)
- `src/styles.css` — adicionar keyframes `float` e `pulse` se ainda não existirem

### Mudanças por seção

1. **Hero** — grid 60/40, fundo `#1F3D2E`, CTA "Quero meu diagnóstico gratuito", coluna direita com dashboard mock + 4 badges flutuantes animados (`float` com delays). Remover cards de métricas que ficavam abaixo.
2. **Método Cluny** — timeline horizontal desktop / accordion mobile, 5 etapas (Diagnóstico, Fundação, Reforma, Operação, Gestão) com Popover (Shadcn) listando entregáveis. Badges "Implantação 45–60 dias" / "Ciclo Contínuo". Remover bloco "O que eu entrego em cada operação".
3. **Indicadores** — manter como está, ajustar fontes se necessário.
4. **Diagnóstico** — wizard 4 etapas / 8 perguntas com barra de progresso, cálculo de pontos, 3 perfis de resultado (A/B/C) com CTAs distintos. Cards-radio clicáveis, navegação Voltar/Continuar.
5. **Manifesto** — fundo `#1F3D2E`, vídeo placeholder 16:9 grande centralizado com play button, texto centralizado abaixo.
6. **Cases** — grid 3 colunas com foto/nome/cargo/setor, resultado em destaque mono, depoimento itálico, footer com porte da empresa. 3 cases placeholder.
7. **Blog/Conteúdo** — layout 1 destaque + 2 menores no desktop.
8. **Materiais (NOVA)** — fundo Areia, 3 cards (Vídeo Aulas, Ferramentas, E-books) + faixa Verde Cluny no fim.
9. **FAQ** — 8 Q&A em 2 colunas desktop usando Accordion.
10. **Footer** — 4 colunas (Marca, Soluções, Empresa, Contato) + linha legal.

### Detalhes técnicos
- Mantém Tailwind + tokens existentes; cores literais somente nos elementos onde o usuário pediu hex específico.
- Popover via `@/components/ui/popover` (já existe).
- Accordion via `@/components/ui/accordion`.
- Wizard como state local em `<Diagnostico/>` (`useState` para step + respostas).
- Animação float: keyframes em `styles.css` + classes utilitárias inline com `style={{ animationDelay }}`.
- Sem mudanças em backend, rotas ou outras páginas (`/planos/*` ficam intactas).
- Logos já usam o componente `Logo` atualizado (variant branco no footer).

### Não faço
- Não toco nas páginas `/planos/*` nem em `Cadastro`/`StickyBar`/`Nav` (apenas se necessário ajustar imports).
- Não adiciono novas dependências.
- Vídeo é placeholder (sem URL real); ícones via `lucide-react` (já instalado).

Confirma para eu executar?