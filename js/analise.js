{ nome: 'Revestimentos de Parede', valor: valorTotal * 0.25 * 0.25, percentual: 25 },
          { nome: 'Forro', valor: valorTotal * 0.25 * 0.15, percentual: 15 },
          { nome: 'Pintura', valor: valorTotal * 0.25 * 0.2, percentual: 20 },
          { nome: 'Esquadrias', valor: valorTotal * 0.25 * 0.1, percentual: 10 }
        ]
      }
    ];
  } else if (tipoProjeto === 'comercial') {
    // Distribuição específica para projetos comerciais
    categorias = [
      {
        nome: 'SUPERESTRUTURA',
        valor: valorTotal * 0.35,
        percentual: 35,
        subitens: [
          { nome: 'Vigas', valor: valorTotal * 0.35 * 0.35, percentual: 35 },
          { nome: 'Lajes', valor: valorTotal * 0.35 * 0.40, percentual: 40 },
          { nome: 'Pilares', valor: valorTotal * 0.35 * 0.25, percentual: 25 }
        ]
      },
      {
        nome: 'SERVIÇOS PRELIMINARES',
        valor: valorTotal * 0.12,
        percentual: 12,
        subitens: [
          { nome: 'Tapumes e Canteiro', valor: valorTotal * 0.12 * 0.20, percentual: 20 },
          { nome: 'Locação da Obra', valor: valorTotal * 0.12 * 0.10, percentual: 10 },
          { nome: 'Terraplanagem', valor: valorTotal * 0.12 * 0.15, percentual: 15 },
          { nome: 'Instalações Provisórias', valor: valorTotal * 0.12 * 0.40, percentual: 40 },
          { nome: 'Demolições e Retiradas', valor: valorTotal * 0.12 * 0.15, percentual: 15 }
        ]
      },
      {
        nome: 'VEDAÇÕES',
        valor: valorTotal * 0.15,
        percentual: 15,
        subitens: [
          { nome: 'Alvenaria', valor: valorTotal * 0.15 * 0.6, percentual: 60 },
          { nome: 'Divisórias', valor: valorTotal * 0.15 * 0.4, percentual: 40 }
        ]
      },
      {
        nome: 'INSTALAÇÕES',
        valor: valorTotal * 0.20,
        percentual: 20,
        subitens: [
          { nome: 'Instalações Elétricas', valor: valorTotal * 0.20 * 0.40, percentual: 40 },
          { nome: 'Instalações Hidráulicas', valor: valorTotal * 0.20 * 0.25, percentual: 25 },
          { nome: 'HVAC', valor: valorTotal * 0.20 * 0.25, percentual: 25 },
          { nome: 'Outras Instalações', valor: valorTotal * 0.20 * 0.10, percentual: 10 }
        ]
      },
      {
        nome: 'ACABAMENTOS',
        valor: valorTotal * 0.18,
        percentual: 18,
        subitens: [
          { nome: 'Revestimentos de Piso', valor: valorTotal * 0.18 * 0.35, percentual: 35 },
          { nome: 'Revestimentos de Parede', valor: valorTotal * 0.18 * 0.25, percentual: 25 },
          { nome: 'Forro', valor: valorTotal * 0.18 * 0.15, percentual: 15 },
          { nome: 'Pintura', valor: valorTotal * 0.18 * 0.15, percentual: 15 },
          { nome: 'Esquadrias', valor: valorTotal * 0.18 * 0.10, percentual: 10 }
        ]
      }
    ];
  } else {
    // Distribuição genérica para outros tipos de projeto
    categorias = [
      {
        nome: 'SUPERESTRUTURA',
        valor: valorTotal * 0.32,
        percentual: 32,
        subitens: [
          { nome: 'Vigas', valor: valorTotal * 0.32 * 0.35, percentual: 35 },
          { nome: 'Lajes', valor: valorTotal * 0.32 * 0.40, percentual: 40 },
          { nome: 'Pilares', valor: valorTotal * 0.32 * 0.25, percentual: 25 }
        ]
      },
      {
        nome: 'SERVIÇOS PRELIMINARES',
        valor: valorTotal * 0.13,
        percentual: 13,
        subitens: [
          { nome: 'Tapumes e Canteiro', valor: valorTotal * 0.13 * 0.20, percentual: 20 },
          { nome: 'Locação da Obra', valor: valorTotal * 0.13 * 0.15, percentual: 15 },
          { nome: 'Terraplanagem', valor: valorTotal * 0.13 * 0.25, percentual: 25 },
          { nome: 'Instalações Provisórias', valor: valorTotal * 0.13 * 0.40, percentual: 40 }
        ]
      },
      {
        nome: 'INSTALAÇÕES',
        valor: valorTotal * 0.25,
        percentual: 25,
        subitens: [
          { nome: 'Instalações Elétricas', valor: valorTotal * 0.25 * 0.40, percentual: 40 },
          { nome: 'Instalações Hidráulicas', valor: valorTotal * 0.25 * 0.30, percentual: 30 },
          { nome: 'Instalações Especiais', valor: valorTotal * 0.25 * 0.30, percentual: 30 }
        ]
      },
      {
        nome: 'ACABAMENTOS',
        valor: valorTotal * 0.20,
        percentual: 20,
        subitens: [
          { nome: 'Revestimentos', valor: valorTotal * 0.20 * 0.60, percentual: 60 },
          { nome: 'Pintura', valor: valorTotal * 0.20 * 0.25, percentual: 25 },
          { nome: 'Esquadrias', valor: valorTotal * 0.20 * 0.15, percentual: 15 }
        ]
      },
      {
        nome: 'OUTROS',
        valor: valorTotal * 0.10,
        percentual: 10,
        subitens: [
          { nome: 'Paisagismo', valor: valorTotal * 0.10 * 0.30, percentual: 30 },
          { nome: 'Limpeza Final', valor: valorTotal * 0.10 * 0.20, percentual: 20 },
          { nome: 'Diversos', valor: valorTotal * 0.10 * 0.50, percentual: 50 }
        ]
      }
    ];
  }
  
  return {
    valorTotal: valorTotal,
    valorPorM2: valorTotal / areaConstruida,
    categorias: categorias
  };
}

// Função para avaliar o custo por m²
function avaliarCustoPorM2(custoPorM2, tipoProjeto, padraoAcabamento) {
  // Definir faixas de custo de referência por tipo e padrão
  const referencia = {
    residencial: {
      baixo: { min: 1500, max: 2000 },
      medio: { min: 2000, max: 3000 },
      alto: { min: 3000, max: 4500 },
      luxo: { min: 4500, max: 6000 }
    },
    comercial: {
      baixo: { min: 1800, max: 2200 },
      medio: { min: 2200, max: 3500 },
      alto: { min: 3500, max: 4800 },
      luxo: { min: 4800, max: 6500 }
    },
    industrial: {
      baixo: { min: 1200, max: 1800 },
      medio: { min: 1800, max: 2500 },
      alto: { min: 2500, max: 3500 },
      luxo: { min: 3500, max: 5000 }
    },
    institucional: {
      baixo: { min: 2000, max: 2500 },
      medio: { min: 2500, max: 3500 },
      alto: { min: 3500, max: 5000 },
      luxo: { min: 5000, max: 7000 }
    }
  };
  
  // Usar valores de referência residencial como padrão se o tipo não existir
  const ref = referencia[tipoProjeto] || referencia.residencial;
  
  // Usar valores de referência para padrão médio se o padrão não existir
  const faixa = ref[padraoAcabamento] || ref.medio;
  
  // Avaliar o custo
  if (custoPorM2 < faixa.min * 0.9) {
    return 'significativamente abaixo da média';
  } else if (custoPorM2 < faixa.min) {
    return 'abaixo da média';
  } else if (custoPorM2 > faixa.max * 1.1) {
    return 'significativamente acima da média';
  } else if (custoPorM2 > faixa.max) {
    return 'acima da média';
  } else {
    return 'dentro da média';
  }
}

// Configurar funcionalidade de expandir/recolher na tabela de orçamento
function configurarTabelaOrcamento() {
  // Manipular cliques nas linhas de nível
  const linhasNivel = document.querySelectorAll('.nivel-row');
  
  linhasNivel.forEach(linha => {
    linha.addEventListener('click', () => {
      const nivel = linha.getAttribute('data-nivel');
      const toggleIcon = linha.querySelector('.toggle-icon');
      const linhasSubitem = document.querySelectorAll(`.subitem-row[data-parent="${nivel}"]`);
      
      // Alternar visibilidade dos subitens
      linhasSubitem.forEach(subitem => {
        if (subitem.style.display === 'none' || subitem.style.display === '') {
          subitem.style.display = 'table-row';
          toggleIcon.textContent = '-';
        } else {
          subitem.style.display = 'none';
          toggleIcon.textContent = '+';
        }
      });
    });
  });
  
  // Botão para expandir todos
  const btnExpandirTodos = document.getElementById('expandAll');
  if (btnExpandirTodos) {
    btnExpandirTodos.addEventListener('click', () => {
      const linhasSubitem = document.querySelectorAll('.subitem-row');
      const toggleIcons = document.querySelectorAll('.toggle-icon');
      
      linhasSubitem.forEach(linha => {
        linha.style.display = 'table-row';
      });
      
      toggleIcons.forEach(icon => {
        icon.textContent = '-';
      });
    });
  }
  
  // Botão para recolher todos
  const btnRecolherTodos = document.getElementById('collapseAll');
  if (btnRecolherTodos) {
    btnRecolherTodos.addEventListener('click', () => {
      const linhasSubitem = document.querySelectorAll('.subitem-row');
      const toggleIcons = document.querySelectorAll('.toggle-icon');
      
      linhasSubitem.forEach(linha => {
        linha.style.display = 'none';
      });
      
      toggleIcons.forEach(icon => {
        icon.textContent = '+';
      });
    });
  }
  
  // Botão para exportar PDF
  const btnExportarPDF = document.getElementById('exportPDF');
  if (btnExportarPDF) {
    btnExportarPDF.addEventListener('click', () => {
      alert('Funcionalidade de exportação para PDF será implementada em breve.');
    });
  }
}
