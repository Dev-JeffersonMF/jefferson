let produtos = [];
let carrinho = [];

fetch('produtos.json')
  .then(res => res.json())
  .then(data => {
    produtos = data;
    mostrarProdutos();
  });

function mostrarProdutos() {
  const div = document.getElementById('produtos');
  div.innerHTML = '';
  produtos.forEach(p => {
    const item = document.createElement('div');
    item.className = 'produto';
    item.innerHTML = `
      <strong>${p.nome}</strong> – R$ ${p.preco.toFixed(2)}<br>
      <button onclick="adicionarCarrinho(${p.id})">Adicionar</button>
    `;
    div.appendChild(item);
  });
}

function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const ul = document.getElementById('carrinho');
  const totalSpan = document.getElementById('total');
  ul.innerHTML = '';
  let total = 0;
  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement('li');
    li.textContent = `${item.nome} – R$ ${item.preco.toFixed(2)} `;
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.onclick = () => {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    };
    li.appendChild(btn);
    ul.appendChild(li);
  });
  totalSpan.textContent = total.toFixed(2);
}

function finalizarPedido() {
  const nome = document.getElementById('nome').value;
  const tel = document.getElementById('telefone').value;
  const entrega = document.getElementById('entrega').value;
  const pagamento = document.getElementById('pagamento').value;

  let msg = `*Pedido Drogaria Lucena*%0A`;
  carrinho.forEach(item => {
    msg += `- ${item.nome} (R$ ${item.preco.toFixed(2)})%0A`;
  });

  msg += `%0ATotal: R$ ${document.getElementById('total').textContent}`;
  msg += `%0ANome: ${nome}`;
  msg += `%0ATelefone: ${tel}`;
  msg += `%0AEntrega: ${entrega}`;
  msg += `%0APagamento: ${pagamento}`;

  const fone = '5599999999';
  window.open(`https://wa.me/${fone}?text=${msg}`, '_blank');
}
