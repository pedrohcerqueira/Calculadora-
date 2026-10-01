const expr = document.getElementById("expr");
const cur = document.getElementById("cur");

const numeros = document.querySelectorAll("[data-n]");
const operacoes = document.querySelectorAll("[data-o]");
const acoes = document.querySelectorAll("[data-a]");

let valorAtual = "0";
let valorAnterior = null;
let operador = null;


function atualizarTela() {
  cur.textContent = valorAtual;
}


numeros.forEach((botao) => {
  botao.addEventListener("click", () => {
    const numero = botao.dataset.n;

    if (valorAtual === "0") {
      valorAtual = numero;
    } else {
      valorAtual += numero;
    }

    atualizarTela();
  });
});


operacoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    valorAnterior = Number(valorAtual);
    operador = botao.dataset.o;
    expr.textContent = valorAtual + " " + operador;
    valorAtual = "0";
  });
});


acoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const acao = botao.dataset.a;

    if (acao === "ac") {
      valorAtual = "0";
      valorAnterior = null;
      operador = null;
      expr.textContent = "";
    }

    if (acao === "del") {
      valorAtual = valorAtual.slice(0, -1);

      if (valorAtual === "") {
        valorAtual = "0";
      }
    }

    if (acao === "decimal") {
      if (!valorAtual.includes(".")) {
        valorAtual += ".";
      }
    }

    if (acao === "sign") {
      if (valorAtual !== "0") {
        valorAtual = String(Number(valorAtual) * -1);
      }
    }

    if (acao === "pct") {
      valorAtual = String(Number(valorAtual) / 100);
    }

    if (acao === "equals") {
      calcular();
    }

    atualizarTela();
  });
});


function calcular() {
  if (valorAnterior === null || operador === null) {
    return;
  }

  const atual = Number(valorAtual);
  let resultado;

  if (operador === "+") {
    resultado = valorAnterior + atual;
  }

  if (operador === "-") {
    resultado = valorAnterior - atual;
  }

  if (operador === "*") {
    resultado = valorAnterior * atual;
  }

  if (operador === "/") {
    if (atual === 0) {
      valorAtual = "Erro";
      return;
    }

    resultado = valorAnterior / atual;
  }

  valorAtual = String(resultado);
  expr.textContent = valorAnterior + " " + operador + " " + atual + " =";

  valorAnterior = null;
  operador = null;
}