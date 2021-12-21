let produtos = [];
const url = "https://apide-produtos.herokuapp.com/produtos";


// FETCH NA API
function atualizarProdutos() {
  fetch(url).then((data) => {
    data.json().then((newProducts) => {
      produtos = [...newProducts.products];
      renderizarProdutos();
    });
  });
}

atualizarProdutos();


// ATUALIZAÇÃO DE PRODUTOS NO FRONT - RENDERIZAÇÃO
function renderizarProdutos() {
  const lista = document.querySelector(".lista ul");
  lista.innerHTML = ''

  produtos.forEach((produto) => {
    const li = createLiElement();

    const div = createDivElement();
    const strong = createStrongElement();
    const button = createButtonElement();

    const p = createPElement();
    const span = createSpanElement();

    const img = createImgElement();

    p.innerHTML = produto.name;
    span.innerHTML = `R$ ${produto.price}`;

    strong.innerHTML = `${produto.estoque} em estoque`;

    img.src = "assets/img/seta.svg";

    li.appendChild(div);
    li.appendChild(strong);
    li.appendChild(button);

    div.appendChild(p);
    div.appendChild(span);

    button.appendChild(img);

    lista.appendChild(li);
  });
}

// funções de criação de elemento
const createDivElement = () => document.createElement("div");
const createPElement = () => document.createElement("p");
const createSpanElement = () => document.createElement("span");
const createStrongElement = () => document.createElement("strong");
const createLiElement = () => document.createElement("li");
const createButtonElement = () => document.createElement("button");
const createImgElement = () => document.createElement("img");

// MECANISMO DE BUSCA
const search = document.querySelector(".search input");
const searchButton = document.querySelector(".search span");

searchButton.addEventListener('click', () => pesquisar())

// função de pesquisa
function pesquisar() {
  const pesquisa = search.value;

  const regExp = new RegExp(pesquisa);

  const productsAux = []

  produtos.forEach((produto) => {
    if (String(produto.name).search(regExp) !== -1) {
      productsAux.push(produto)
    }
  });
  
  produtos = [...productsAux]

  renderizarProdutos()
}


