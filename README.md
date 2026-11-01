# Cuidar Bem — Enfermagem Domiciliar

Site institucional humanizado e responsivo desenvolvido em **HTML5 + Tailwind CSS** para **Josilania Moreira** (Técnica de Enfermagem) e **Robson Campos** (Enfermeiro).

## ✨ Principais Melhorias em Relação ao Boilerplate Original

1. **Preservação da Paleta com Contrastes Otimizados (WCAG AA/AAA):**
   - **Azul Petróleo Principal (`#123b50`)** e **Dourado Acolhedor (`#d8a84e`)** preservados sobre o fundo suave **Sage Alabaster (`#f4f7f6` / `#eaf0ef`)**.
   - **Correção Crítica de Contraste:** No arquivo original, textos de destaque (`eyebrow`) utilizavam `#d8a84e` diretamente sobre fundo claro `#f4f7f6` (taxa de contraste ~2.08:1, ilegível) e a função `light-dark()` invertia o fundo dos cards no modo escuro do sistema mantendo títulos em `#123b50` (contraste 1.25:1). Agora todas as combinações de texto/fundo atingem **contraste > 7:1 (WCAG AAA)**.
2. **Extração e Tratamento das Imagens Originais:**
   - As 7 imagens antes embutidas em `base64` (que deixavam o HTML com mais de 450 KB) foram extraídas para `assets/images/`.
   - As 5 imagens de procedimentos continham bordas brancas e textos cortados de capturas de tela na parte superior/esquerda — todas foram recortadas e limpas mantendo nitidez.
3. **Design Mais Humanizado e Profissional:**
   - Tipografia acolhedora combinando **Lora** (serifada editorial para títulos) e **Plus Jakarta Sans** (alta legibilidade para leitura clínica).
   - Apresentação valorizada da dupla profissional (**Enfermeiro + Técnica de Enfermagem**), jornada passo a passo (*Como Funciona*), seção de *Dúvidas Frequentes (FAQ)* e **Assistente Interativo de WhatsApp** que monta a mensagem personalizada em segundos.
4. **Efeitos Sutis:**
   - Animações suaves de entrada ao rolar a página (`IntersectionObserver`), cabeçalho com efeito vidro (`backdrop-blur`), elevação delicada nos cards e respeito à configuração de acessibilidade `prefers-reduced-motion`.

## 📁 Estrutura de Arquivos

```text
cuidar-bem/
├── index.html                  # Página principal semântica (HTML5 + Tailwind CSS)
├── README.md                   # Documentação do projeto
└── assets/
    ├── css/
    │   └── styles.css          # Variáveis da paleta, animações sutis e acessibilidade
    ├── js/
    │   └── main.js             # Scroll reveal, menu mobile, FAQ e construtor WhatsApp
    └── images/
        ├── favicon.svg         # Ícone da marca Cuidar Bem
        ├── josilania-moreira.jpg
        ├── robson-campos.jpg
        ├── curativos.jpg
        ├── pressao-arterial.jpg
        ├── glicemia.jpg
        ├── medicamentos.jpg
        └── acompanhamento.jpg
```

## 🚀 Como Visualizar

Basta abrir o arquivo `index.html` diretamente em qualquer navegador moderno ou servir a pasta com qualquer servidor estático (ex.: extensão *Live Server* do VS Code ou `npx serve .`).

