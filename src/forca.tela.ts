import { Forca } from "./forca.js"; 

export class ForcaTela {
  panelBotoes: HTMLDivElement;
  botaoReiniciar: HTMLButtonElement;
  labelPalavraSecreta: HTMLLabelElement;
  labelDica: HTMLLabelElement;
  imagemForca: HTMLImageElement;
  labelMensagemFinal: HTMLLabelElement;
  jogoDaForca: Forca; // Adicione o tipo Forca para a variável jogoDaForca

  constructor() {
    this.panelBotoes = document.getElementById("panelBotoes") as HTMLDivElement;
    this.botaoReiniciar = document.getElementById("botaoReiniciar") as HTMLButtonElement;
    this.labelPalavraSecreta = document.getElementById("labelPalavraSecreta") as HTMLLabelElement;
    this.labelDica = document.getElementById("labelDica") as HTMLLabelElement;
    this.imagemForca = document.getElementById("imagemForca") as HTMLImageElement;
    this.labelMensagemFinal = document.getElementById("labelMensagemFinal") as HTMLLabelElement;

    this.registrarEventos();

    this.jogoDaForca = new Forca();

    this.obterPalavraParcial();

    this.obterDicaPalavra();
  }

  registrarEventos() {
    for (let botao of this.panelBotoes.children) {
      botao.addEventListener("click", this.darPalpite.bind(this));
      botao.addEventListener("click", this.atualizarBotoesPainel.bind(this));
    }

    this.botaoReiniciar.addEventListener("click", () =>
      this.reiniciarJogo()
    );
  }

  darPalpite(event: Event) {
    const botaoClicado = event.target as HTMLButtonElement;

    const palpite = botaoClicado.textContent![0];

    if (this.jogoDaForca.jogadorAcertou(palpite) || this.jogoDaForca.jogadorPerdeu()) {
      this.finalizarJogo();
    }

    this.obterPalavraParcial();

    this.atualizarForca();
  }

  reiniciarJogo() {
    this.jogoDaForca = new Forca();

    this.obterPalavraParcial();

    this.obterDicaPalavra();

    this.atualizarForca();

    this.labelMensagemFinal.textContent = "";

    //(this.panelBotoes as HTMLDivElement).disabled = false;
    this.panelBotoes.classList.add("disabled");

    for (let botao of this.panelBotoes.children) {
      (botao as HTMLButtonElement).disabled = false;
    }
  }

  atualizarBotoesPainel(event: Event) {
    const botaoClicado = event.target as HTMLButtonElement;

    botaoClicado.disabled = true;
  }

  finalizarJogo() {
    const jogadorPerdeu = this.jogoDaForca.jogadorPerdeu();

    if (jogadorPerdeu) {
      this.labelMensagemFinal.style.color = "red";
    } else {
      this.labelMensagemFinal.style.color = "green";
    }

    //this.panelBotoes.disabled = true;

    for (let botao of this.panelBotoes.children) {
      (botao as HTMLButtonElement).disabled = true;
    }

    this.labelMensagemFinal.textContent = this.jogoDaForca.mensagemFinal;
  }

  atualizarForca() {
    const imagensForca = [
      "forca00",
      "forca01",
      "forca02",
      "forca03",
      "forca04",
      "forca05",
      "forca06",
      "forca07",
    ];

    this.imagemForca.src = `assets/${imagensForca[this.jogoDaForca.erros]}.png`;
  }

  obterPalavraParcial() {
    this.labelPalavraSecreta.textContent = this.jogoDaForca.palavraParcial();
  }

  obterDicaPalavra() {
    this.labelDica.textContent = `${this.jogoDaForca.quantidadeLetras()} letras`;
  }
}