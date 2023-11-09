module.exports = {
  bail: true,
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ]
}

/* bail: true --- faz com que, se um teste falhar, todos os testes em seguida interrompam/parem
   testMatch --- vetor contendo qual é o padrão dos arqs. de teste;
                    no caso, é qualquer nome (por isso os "*") contendo a extensão ".spec.js" (poderia ser ".test.js" também);
                 <rootDir> --- var. global do root pra selecionar a raiz do projeto */
