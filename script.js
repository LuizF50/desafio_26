// Categorias dos elementos químicos
const categorias = {
    Metais: ['Li', 'Be', 'Na', 'Mg', 'Al', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi'],
    GasesNobres: ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'],
    Halogenios: ['F', 'Cl', 'Br', 'I', 'At'],
    Outros: [] // Categoria para elementos não classificados
};

// Emojis para cada categoria
const emojis = {
    Metais: "🔧",
    GasesNobres: "💭",
    Halogenios: "🧪",
    Outros: "🌌"
};

// Função para classificar um elemento
function classificarElemento(elemento) {
    if (categorias.Metais.includes(elemento)) {
        return "Metais";
    } else if (categorias.GasesNobres.includes(elemento)) {
        return "Gases Nobres";
    } else if (categorias.Halogenios.includes(elemento)) {
        return "Halogênios";
    } else {
        return "Outros";
    }
}

// Função para inserir um novo elemento na lista ordenada
function inserirElemento(elementos, novoElemento) {
    const pesoAtomico = {
        H: 1, He: 4, Li: 7, Be: 9, B: 11, C: 12, N: 14, O: 16, F: 19, Ne: 20,
        Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35, Ar: 40, K: 39,
        Ca: 40, Sc: 45, Ti: 48, V: 51, Cr: 52, Mn: 55, Fe: 56, Co: 59,
        Ni: 59, Cu: 63, Zn: 65, Ga: 70, Ge: 73, As: 75, Se: 79,
        Br: 80, Kr: 84 // Adicione mais elementos conforme necessário
    };

    // Inserir o novo elemento na lista ordenada
    const elementosComNovo = [...elementos];
    elementosComNovo.push(novoElemento);
    elementosComNovo.sort((a, b) => (pesoAtomico[a] || Infinity) - (pesoAtomico[b] || Infinity));

    return elementosComNovo;
}

// Função para adicionar um novo elemento
function adicionarElemento() {
    const elementos = ["H", "He", "Li", "Be", "B"];
    const novoElemento = document.getElementById("novoElemento").value.trim();

    if (!novoElemento) return;

    const categoria = classificarElemento(novoElemento);

    // Atualizar categorias se for "Outros"
    if (categoria === "Outros" && !categorias.Outros.includes(novoElemento)) {
        categorias.Outros.push(novoElemento);
    }

    const elementosAtualizados = inserirElemento(elementos, novoElemento);

    // Atualizar a tabela de elementos
    atualizarTabela(elementosAtualizados);

    // Exibir mensagem de classificação
    const mensagem = `O elemento '${novoElemento}' foi classificado na categoria '${categoria}'.`;
    document.getElementById("mensagem").textContent = mensagem;

    // Limpar o campo de entrada
    document.getElementById("novoElemento").value = "";
}

// Função para atualizar a tabela de elementos
function atualizarTabela(elementos) {
    const tabela = document.getElementById("elementosTabela").querySelector("tbody");
    tabela.innerHTML = ""; // Limpa a tabela

    elementos.forEach((elemento) => {
        const categoria = classificarElemento(elemento);
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${elemento}</td>
            <td>${emojis[categoria]} ${categoria}</td>
        `;
        tabela.appendChild(linha);
    });
}

// Função para exibir as categorias e seus elementos
function mostrarCategorias() {
    const containerCategorias = document.getElementById("categoriasContainer");
    const listaCategorias = document.getElementById("categoriasLista");

    listaCategorias.innerHTML = ""; // Limpa a lista antes de recriar

    for (let categoria in categorias) {
        const li = document.createElement("li");
        li.innerHTML = `${emojis[categoria]} <strong>${categoria}:</strong> ${categorias[categoria].join(", ")}`;
        listaCategorias.appendChild(li);
    }

    containerCategorias.style.display = "block";
}
