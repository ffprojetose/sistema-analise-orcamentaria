/**
 * projetos.js - Gerenciamento de projetos
 * Funções para gerenciar os projetos (CRUD)
 */

// Array para armazenar projetos
let projetos = [];

// Carregar projetos do localStorage ou criar exemplo inicial
function carregarProjetos() {
  const projetosArmazenados = localStorage.getItem('projetos');
  if (projetosArmazenados) {
    projetos = JSON.parse(projetosArmazenados);
  } else {
    // Se não houver projetos armazenados, usar o Projeto Reserva como exemplo
    projetos = [
      {
        id: 1,
        nome: 'Projeto Reserva',
        tipo: 'residencial',
        areaConstruida: 596.25,
        descricao: 'Residência com 4 suítes, piscina, 8 banheiros e padrão alto',
        caracteristicas: {
          numPavimentos: 2,
          numSuites: 4,
          numBanheiros: 8,
          possuiPiscina: 'sim',
          possuiElevador: 'nao',
          tipoFundacao: 'sapata',
          tipoCobertura: 'telhado',
          padraoAcabamento: 'alto'
        },
        arquivos: [],
        dataCriacao: '12/03/2025',
        status: 'concluido',
        orcamento: {
          valorTotal: 2231821.85,
          categorias: [
            {
              nome: 'SUPERESTRUTURA',
              valor: 655549.09,
              percentual: 32.41,
              subitens: [
                { nome: 'Vigas', valor: 229442.18, percentual: 35 },
                { nome: 'Lajes', valor: 262219.64, percentual: 40 },
                { nome: 'Pilares', valor: 163887.27, percentual: 25 }
              ]
            },
            {
              nome: 'SERVIÇOS PRELIMINARES',
              valor: 329385.90,
              percentual: 14.70,
              subitens: [
                { nome: 'Tapumes e Canteiro', valor: 59289.46, percentual: 18 },
                { nome: 'Locação da Obra', valor: 26350.87, percentual: 8 },
                { nome: 'Muro Perimetral (h=2,0-2,25m)', valor: 88934.19, percentual: 27 },
                { nome: 'Terraplanagem', valor: 39526.31, percentual: 12 },
                { nome: 'Instalações Provisórias', valor: 65877.18, percentual: 20 },
                { nome: 'Demolições e Retiradas', valor: 49407.89, percentual: 15 }
              ]
            }
          ]
        }
      }
    ];
    
    // Salvar projeto exemplo no localStorage
    salvarProjetos();
  }
}

// Função para salvar projetos no localStorage
function salvarProjetos() {
  localStorage.setItem('projetos', JSON.stringify(projetos));
}

// Renderizar lista de projetos
function renderizarListaProjetos() {
  const containerProjetos = document.getElementById('lista-projetos');
  
  if (containerProjetos) {
    // Limpar conteúdo atual
    containerProjetos.innerHTML = '';
    
    // Verificar se há projetos
    if (projetos.length === 0) {
      containerProjetos.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <i class="fas fa-folder-open"></i>
          </div>
          <h3>Nenhum projeto encontrado</h3>
          <p>Crie seu primeiro projeto clicando no botão acima.</p>
        </div>
      `;
      return;
    }
    
    // Renderizar projetos
    renderizarProjetos(projetos, containerProjetos);
  }
}

// Carregar projetos recentes na página inicial
function carregarProjetosRecentes() {
  const projetosRecentesContainer = document.getElementById('projetos-recentes');
  
  if (projetosRecentesContainer) {
    if (projetos.length > 0) {
      projetosRecentesContainer.innerHTML = '';
      
      // Mostrar até 3 projetos mais recentes
      const projetosRecentes = projetos.slice(0, 3);
      
      projetosRecentes.forEach(projeto => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Status do projeto
        const status = document.createElement('div');
        status.className = `project-status status-${projeto.status}`;
        status.textContent = projeto.status === 'concluido' ? 'Concluído' : 'Em Andamento';
        
        // Título do projeto
        const titulo = document.createElement('div');
        titulo.className = 'project-title';
        titulo.textContent = projeto.nome;
        
        // Metadados do projeto
        const meta = document.createElement('div');
        meta.className = 'project-meta';
        meta.textContent = `${projeto.tipo.charAt(0).toUpperCase() + projeto.tipo.slice(1)} • ${projeto.areaConstruida.toFixed(2)}m² • ${projeto.dataCriacao}`;
        
        // Descrição do projeto
        const descricao = document.createElement('div');
        descricao.textContent = projeto.descricao;
        
        // Montar o card do projeto
        card.appendChild(status);
        card.appendChild(titulo);
        card.appendChild(meta);
        card.appendChild(descricao);
        
        card.addEventListener('click', () => {
          // Ir para a aba de projetos e destacar este projeto
          projetoAtual = projeto;
          abrirAnaliseOrcamentaria(projeto);
        });
        
        projetosRecentesContainer.appendChild(card);
      });
    } else {
      projetosRecentesContainer.innerHTML = '<p>Nenhum projeto encontrado. Crie seu primeiro projeto!</p>';
    }
  }
}

// Criar novo projeto a partir do formulário
function criarProjetoDoFormulario() {
  const nomeProjeto = document.getElementById('nome-projeto').value;
  const areaConstruida = parseFloat(document.getElementById('area-construida').value);
  const tipoProjeto = document.getElementById('tipo-projeto').value;
  const descricaoProjeto = document.getElementById('descricao-projeto').value;
  
  const numPavimentos = parseInt(document.getElementById('num-pavimentos').value);
  const numSuites = parseInt(document.getElementById('num-suites').value);
  const numBanheiros = parseInt(document.getElementById('num-banheiros').value);
  const possuiPiscina = document.getElementById('possui-piscina').value;
  const possuiElevador = document.getElementById('possui-elevador').value;
  const tipoFundacao = document.getElementById('tipo-fundacao').value;
  const tipoCobertura = document.getElementById('tipo-cobertura').value;
  const padraoAcabamento = document.getElementById('padrao-acabamento').value;
  
  // Gerar ID único para o projeto
  const id = Date.now();
  
  // Obter data atual
  const data = new Date();
  const dataFormatada = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
  
  // Criar objeto de projeto
  const projeto = {
    id: id,
    nome: nomeProjeto,
    tipo: tipoProjeto,
    areaConstruida: areaConstruida,
    descricao: descricaoProjeto,
    caracteristicas: {
      numPavimentos: numPavimentos,
      numSuites: numSuites,
      numBanheiros: numBanheiros,
      possuiPiscina: possuiPiscina,
      possuiElevador: possuiElevador,
      tipoFundacao: tipoFundacao,
      tipoCobertura: tipoCobertura,
      padraoAcabamento: padraoAcabamento
    },
    arquivos: obterArquivosUpload(),
    dataCriacao: dataFormatada,
    status: 'emandamento',
    orcamento: gerarOrcamentoEstimado(areaConstruida, tipoProjeto, padraoAcabamento)
  };
  
  return projeto;
}

// Obter arquivos do upload
function obterArquivosUpload() {
  const fileList = document.getElementById('file-list');
  const arquivos = [];
  
  // Se não houver lista de arquivos, retornar array vazio
  if (!fileList) return arquivos;
  
  // Extrair nomes de arquivos da lista
  const fileItems = fileList.querySelectorAll('.file-item');
  fileItems.forEach(item => {
    const fileName = item.querySelector('.file-item-name').textContent;
    arquivos.push({
      nome: fileName,
      tipo: obterTipoArquivo(fileName),
      data: new Date().toISOString()
    });
  });
  
  return arquivos;
}

// Obter o tipo de arquivo a partir do nome
function obterTipoArquivo(fileName) {
  const extensao = fileName.split('.').pop().toLowerCase();
  
  switch (extensao) {
    case 'pdf':
      return 'PDF';
    case 'dwg':
      return 'DWG';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'Imagem';
    default:
      return 'Outro';
  }
}
