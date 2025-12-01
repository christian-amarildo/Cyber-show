# 🛡️ Cyber Show - O Show da Cibersegurança

Bem-vindo ao **Cyber Show**, um jogo de perguntas e respostas estilo "Show do Milhão", focado totalmente em **Cibersegurança**! Teste seus conhecimentos sobre segurança da informação, redes, criptografia e muito mais em um ambiente divertido e temático.

![Cyber Show Logo](show/images/logo.png)

## 🎮 Sobre o Jogo

O **Cyber Show** foi desenvolvido para ser uma ferramenta educativa e engajadora. O jogador deve responder a uma série de perguntas de dificuldade crescente para acumular prêmios virtuais até chegar ao tão sonhado "1 Milhão".

### ✨ Funcionalidades Principais

*   **Tema Cyberpunk**: Interface imersiva com grades neon, cores vibrantes e um apresentador futurista.
*   **Mecânicas Clássicas**:
    *   **🃏 Cartas**: Sorteie uma carta para eliminar 0, 1, 2 ou até 3 respostas erradas!
    *   **🏃 Pular**: Não sabe a resposta? Você tem direito a pular a pergunta até 3 vezes.
    *   **🛑 Parar**: Decida parar e levar o prêmio acumulado se não quiser arriscar.
*   **Áudio Imersivo**: Efeitos sonoros sintetizados em tempo real para abertura, acertos, erros e vitória.
*   **Perguntas Dinâmicas**: Banco de dados com perguntas variadas sobre o mundo da segurança digital.

## 🚀 Como Executar o Projeto

Este é um projeto web estático (HTML, CSS, JS), o que o torna muito fácil de rodar.

### Pré-requisitos

*   Um navegador web moderno (Chrome, Firefox, Edge).
*   (Opcional) Node.js instalado para rodar um servidor local.

### Rodando Localmente

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/christian-amarildo/Cyber-show.git
    ```
2.  **Navegue até a pasta**:
    ```bash
    cd Cyber-show
    ```
3.  **Abra o arquivo `index.html`** diretamente no seu navegador OU use um servidor local (recomendado para carregar os áudios corretamente):
    ```bash
    npx serve
    ```
4.  Acesse `http://localhost:3000` (ou a porta indicada).

## 📂 Estrutura do Projeto

O projeto foi organizado para ser simples e fácil de manter:

*   `index.html`: Estrutura principal da página e elementos do jogo.
*   `style.css`: Estilização completa, animações e responsividade.
*   `script.js`: Lógica do jogo, controle de estado, áudio e interação.
*   `questions.js`: Banco de dados das perguntas (JSON array).
*   `show/`: Pasta contendo imagens e assets do jogo.
*   `referencias/`: Arquivos de design e backups antigos.

## 🛠️ Tecnologias Utilizadas

*   **HTML5**: Semântica e estrutura.
*   **CSS3**: Flexbox, Grid, Animações e Variáveis CSS.
*   **JavaScript (ES6+)**: Lógica de programação e manipulação do DOM.
*   **Web Audio API**: Síntese de efeitos sonoros em tempo real.

## 👤 Autor

Desenvolvido por **Christian Amarildo**.

---
*Divirta-se e aprenda com o Cyber Show!* 🔒
