/**
 * main.js - Código principal do Sistema de Análise Orçamentária
 * Funções principais e inicialização do sistema
 */

// Variáveis globais do sistema
let projetoAtual = null;

// Inicialização do sistema quando o documento está pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('Sistema de Análise Orçamentária iniciado');
  
  // Carregar projetos do localStorage
  carregarProjetos();
  
  // Configurar navegação entre abas
  configurarNavegacao();
  
  // Inicializar componentes da interface
  inicializarInterface();
  
  // Inicializar eventos de interação
  inicializarEventos();
});

// Configuração de navegação entre abas
function configurarNavegacao() {
  const navLinks = document.querySelectorAll('.nav-link');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remover classe active de todos os links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Adicionar classe active ao link clicado
      link.classList.add('active');
      
      // Esconder todos os conteúdos de abas
      tabContents.forEach(tab => tab.classList.remove('active'));
      
      // Mostrar o conteúdo da aba correspondente
      const tabId = link.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Inicialização de componentes da interface
function inicializarInterface() {
  // Renderizar lista de projetos na aba Projetos
  renderizarListaProjetos();
  
  // Carregar projetos recentes na página inicial
  carregarProjetosRecentes();
  
  // Verificar se existe logo salva no localStorage
  carregarLogoEmpresa();
}

// Inicialização de eventos da interface
function inicializarEventos() {
  // Configurar botões da página inicial
  configurarBotoesPaginaInicial();
  
  // Configurar botão para criar novo projeto
  configurarBotaoCriarProjeto();
  
  // Configurar campo de busca
  configurarCampoBusca();
  
  // Configurar formulário de novo projeto
  configurarFormularioNovoProjeto();
  
  // Configurar upload de logo
  configurarUploadLogo();
  
  // Configurar upload de arquivos
  configurarUploadArquivos();
}

// Carregar logo da empresa do localStorage
function carregarLogoEmpresa() {
  const logoImage = document.getElementById('company-logo');
  
  if (logoImage) {
    const logoSalva = localStorage.getItem('logoEmpresa');
    if (logoSalva) {
      logoImage.src = logoSalva;
    }
  }
}

// Configurar botões da página inicial
function configurarBotoesPaginaInicial() {
  const btnVerProjetos = document.getElementById('btn-ver-projetos');
  const btnNovoProjeto = document.getElementById('btn-novo-projeto');
  
  if (btnVerProjetos) {
    btnVerProjetos.addEventListener('click', () => {
      document.querySelector('.nav-link[data-tab="projetos"]').click();
    });
  }
  
  if (btnNovoProjeto) {
    btnNovoProjeto.addEventListener('click', () => {
      document.querySelector('.nav-link[data-tab="novo-projeto"]').click();
    });
  }
}

// Configurar botão para criar novo projeto
function configurarBotaoCriarProjeto() {
  const btnCriarProjeto = document.getElementById('btn-criar-projeto');
  
  if (btnCriarProjeto) {
    btnCriarProjeto.addEventListener('click', () => {
      document.querySelector('.nav-link[data-tab="novo-projeto"]').click();
    });
  }
}

// Configurar campo de busca
function configurarCampoBusca() {
  const campoBusca = document.getElementById('projeto-busca');
  
  if (campoBusca) {
    campoBusca.addEventListener('input', () => {
      const termoBusca = campoBusca.value.toLowerCase();
      
      // Filtrar projetos pelo termo de busca
      const projetosFiltrados = projetos.filter(projeto => 
        projeto.nome.toLowerCase().includes(termoBusca) || 
        projeto.descricao.toLowerCase().includes(termoBusca) ||
        projeto.tipo.toLowerCase().includes(termoBusca)
      );
      
      // Renderizar projetos filtrados
      renderizarProjetosFiltrados(projetosFiltrados);
    });
  }
}

// Renderizar projetos filtrados
function renderizarProjetosFiltrados(projetosFiltrados) {
  const containerProjetos = document.getElementById('lista-projetos');
  
  if (containerProjetos) {
    // Limpar conteúdo atual
    containerProjetos.innerHTML = '';
    
    // Verificar se há projetos filtrados
    if (projetosFiltrados.length === 0) {
      containerProjetos.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>Nenhum resultado encontrado</h3>
          <p>Tente usar termos diferentes na sua busca.</p>
        </div>
      `;
      return;
    }
    
    // Renderizar projetos filtrados usando a função de renderização normal
    renderizarProjetos(projetosFiltrados, containerProjetos);
  }
}

// Renderizar projetos em um container
function renderizarProjetos(listaProjetos, container) {
  listaProjetos.forEach(projeto => {
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
    
    // Ações do projeto
    const acoes = document.createElement('div');
    acoes.className = 'project-actions';
    
    // Botão de análise
    const btnAnalise = document.createElement('button');
    btnAnalise.className = 'btn action-btn';
    btnAnalise.textContent = projeto.status === 'concluido' ? 'Ver Análise' : 'Continuar Análise';
    btnAnalise.addEventListener('click', (e) => {
      e.stopPropagation(); // Impedir propagação do clique para o card
      projetoAtual = projeto;
      abrirAnaliseOrcamentaria(projeto);
    });
    
    // Botão de edição
    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn btn-secondary action-btn';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', (e) => {
      e.stopPropagation(); // Impedir propagação do clique para o card
      editarProjeto(projeto);
    });
    
    // Montar o card do projeto
    acoes.appendChild(btnAnalise);
    acoes.appendChild(btnEditar);
    
    card.appendChild(status);
    card.appendChild(titulo);
    card.appendChild(meta);
    card.appendChild(descricao);
    card.appendChild(acoes);
    
    // Adicionar interação de clique no card (opcional)
    card.addEventListener('click', () => {
      projetoAtual = projeto;
      abrirAnaliseOrcamentaria(projeto);
    });
    
    container.appendChild(card);
  });
}

// Abrir a aba de análise e mostrar o projeto selecionado
function abrirAnaliseOrcamentaria(projeto) {
  // Mudar para a aba de análise
  document.querySelector('.nav-link[data-tab="analise"]').click();
  
  // Renderizar a análise do projeto selecionado
  renderizarAnaliseOrcamentaria(projeto);
}

// Editar um projeto
function editarProjeto(projeto) {
  // Implementação básica - simplesmente alerta
  alert(`Funcionalidade de edição para o projeto "${projeto.nome}" será implementada em breve.`);
  
  // Aqui você adicionaria a lógica para preencher o formulário com os dados do projeto
  // e mudar para a aba de edição
}

// Configurar upload de logo
function configurarUploadLogo() {
  const logoInput = document.getElementById('logo-upload-input');
  const logoImage = document.getElementById('company-logo');
  
  if (logoInput && logoImage) {
    logoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          const logoUrl = event.target.result;
          logoImage.src = logoUrl;
          
          // Salvar logo no localStorage
          localStorage.setItem('logoEmpresa', logoUrl);
        };
        
        reader.readAsDataURL(file);
      }
    });
  }
}

// Configurar formulário de novo projeto
function configurarFormularioNovoProjeto() {
  const form = document.getElementById('projeto-form');
  const analisarBtn = document.getElementById('analisar-projeto-btn');
  
  if (analisarBtn) {
    analisarBtn.addEventListener('click', () => {
      if (validarFormulario()) {
        // Criar novo projeto a partir dos dados do formulário
        const novoProjeto = criarProjetoDoFormulario();
        
        // Adicionar o novo projeto à lista de projetos
        projetos.push(novoProjeto);
        
        // Salvar projetos no localStorage
        salvarProjetos();
        
        // Redirecionar para a aba de análise com o novo projeto
        projetoAtual = novoProjeto;
        renderizarAnaliseOrcamentaria(novoProjeto);
        
        // Mudar para a aba de análise
        document.querySelector('.nav-link[data-tab="analise"]').click();
        
        // Limpar formulário
        form.reset();
        
        alert('Projeto criado com sucesso!');
        
        // Atualizar projetos recentes
        carregarProjetosRecentes();
      }
    });
  }
}

// Validar formulário de novo projeto
function validarFormulario() {
  const nomeProjeto = document.getElementById('nome-projeto').value;
  const areaConstruida = document.getElementById('area-construida').value;
  const tipoProjeto = document.getElementById('tipo-projeto').value;
  
  if (!nomeProjeto) {
    alert('Por favor, informe o nome do projeto.');
    return false;
  }
  
  if (!areaConstruida || areaConstruida <= 0) {
    alert('Por favor, informe uma área construída válida.');
    return false;
  }
  
  if (!tipoProjeto) {
    alert('Por favor, selecione o tipo de projeto.');
    return false;
  }
  
  return true;
}

// Configurar upload de arquivos do projeto
function configurarUploadArquivos() {
  const uploadInput = document.getElementById('upload-files');
  const fileList = document.getElementById('file-list');
  
  if (uploadInput && fileList) {
    uploadInput.addEventListener('change', (e) => {
      const files = e.target.files;
      
      if (files.length > 0) {
        // Mostrar a lista de arquivos
        fileList.style.display = 'block';
        
        // Adicionar os arquivos à lista
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          
          // Criar item de arquivo
          const fileItem = document.createElement('div');
          fileItem.className = 'file-item';
          
          // Nome do arquivo
          const fileName = document.createElement('div');
          fileName.className = 'file-item-name';
          fileName.textContent = file.name;
          
          // Ações do arquivo
          const fileActions = document.createElement('div');
          fileActions.className = 'file-item-actions';
          
          // Botão de exclusão
          const deleteButton = document.createElement('span');
          deleteButton.className = 'file-item-action';
          deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
          deleteButton.addEventListener('click', () => {
            fileList.removeChild(fileItem);
            
            // Se não houver mais arquivos, esconder a lista
            if (fileList.children.length === 0) {
              fileList.style.display = 'none';
            }
          });
          
          // Montar o item de arquivo
          fileActions.appendChild(deleteButton);
          fileItem.appendChild(fileName);
          fileItem.appendChild(fileActions);
          fileList.appendChild(fileItem);
        }
      }
    });
  }
}
