export class Forca {
  mensagemFinal: string;
  palavraSecreta: string;
  letrasEncontradas: string[];
  erros: number;

  constructor() {
      this.mensagemFinal = "";
      this.palavraSecreta = this.obterPalavraSecreta();
      this.letrasEncontradas = this.popularLetrasEncontradas(this.palavraSecreta.length);
      this.erros = 0;
  }

  palavraParcial(): string {
      return this.letrasEncontradas.join("");
  }

  quantidadeLetras(): number {
      return this.palavraSecreta.length;
  }

  jogadorAcertou(palpite: string): boolean {
      let letraFoiEncontrada = false;

      for (let i = 0; i < this.palavraSecreta.length; i++) {
          if (palpite === this.palavraSecreta[i]) {
              this.letrasEncontradas[i] = palpite;
              letraFoiEncontrada = true;
          }
      }

      if (letraFoiEncontrada === false) {
          this.erros++;
      }

      const acertou: boolean = this.letrasEncontradas.join("") === this.palavraSecreta;

      if (acertou) {
          this.mensagemFinal = `Você acertou a palavra ${this.palavraSecreta}, parabéns!`;
      } else if (this.jogadorPerdeu()) {
          this.mensagemFinal = "Você perdeu! Tente novamente...";
      }

      return acertou;
  }

  jogadorPerdeu(): boolean {
      return this.erros === 7;
  }

  obterPalavraSecreta(): string {
      const palavras: string[] = [
        "ABACATE",
        "ABACAXI",
        "ACEROLA",
        "ACAI",
        "ARACA",
        "ABACATE",
        "BACABA",
        "BACURI",
        "BANANA",
        "CAJA",
        "CAJU",
        "CARAMBOLA",
        "CUPUACU",
        "GRAVIOLA",
        "GOIABA",
        "JABUTICABA",
        "JENIPAPO",
        "MACA",
        "MANGABA",
        "MANGA",
        "MARACUJA",
        "MURICI",
        "PEQUI",
        "PITANGA",
        "PITAYA",
        "SAPOTI",
        "TANGERINA",
        "UMBU",
        "UVA",
        "UVAIA"
      ];

      const indiceAleatorio: number = Math.floor(Math.random() * palavras.length);

      return palavras[indiceAleatorio];
  }

  popularLetrasEncontradas(tamanho: number): string[] {
      const letrasEncontradas: string[] = new Array(tamanho).fill("_");
      return letrasEncontradas;
  }
}