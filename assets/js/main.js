// Função para carregar o arquivo CSV e gerar a tabela
function loadCSVData() {
  fetch('/data/data.csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n');
      const headers = rows[0].split(';');
      const table = document.getElementById('csv-table-body');

      // Adiciona as linhas da tabela
      rows.slice(1).forEach(row => {
        const columns = row.split(';');
        if (columns.length === headers.length) {
          const tr = document.createElement('tr');
          columns.forEach(col => {
            const td = document.createElement('td');
            td.innerText = col;
            tr.appendChild(td);
          });
          table.appendChild(tr);
        }
      });
    })
    .catch(error => console.error('Erro ao carregar o arquivo CSV:', error));
}

// Função para carregar o arquivo JSON de idioma
function loadTranslations(language) {
  fetch(`/data/i18n/${language}.json`)
    .then(response => response.json())
    .then(translations => {
      applyTranslations(translations);
    })
    .catch(error => console.error('Erro ao carregar as traduções:', error));
}

// Função para aplicar as traduções no conteúdo da página
function applyTranslations(translations) {
  document.getElementById('title').innerText = translations.title;
  document.getElementById('subtitle').innerText = translations.subtitle;
  document.getElementById('objectives-title').innerText = translations.objectives_title;
  document.getElementById('not-objective-title').innerText = translations.not_objective_title;
  document.getElementById('composition-title').innerText = translations.composition_title;
  document.getElementById('sensitive-nutrients-title').innerText = translations.sensitive_nutrients_title;
  document.getElementById('improvements-title').innerText = translations.improvements_title;
  document.getElementById('license-title').innerText = translations.license_title;
  
  // Preencher a lista de objetivos
  const objectivesList = document.getElementById('objectives');
  objectivesList.innerHTML = '';
  translations.objectives.forEach(objective => {
    const li = document.createElement('li');
    li.innerText = objective;
    objectivesList.appendChild(li);
  });

  // Preencher a lista de potenciais melhorias
  const improvementsList = document.getElementById('improvements');
  improvementsList.innerHTML = '';
  translations.improvements_list.forEach(improvement => {
    const li = document.createElement('li');
    li.innerText = improvement;
    improvementsList.appendChild(li);
  });

  // Aplicar o texto da licença
  document.getElementById('license-text').innerText = translations.license_text;
  document.getElementById('license-link').innerText = translations.license_link;
}

// Função para definir o idioma, padrão 'pt-br'
function setLanguage(language = 'pt-br') {
  loadTranslations(language);
}

// Detecta a preferência de idioma do navegador
const userLanguage = navigator.language || navigator.userLanguage;
const preferredLanguage = userLanguage.includes('en') ? 'en' : userLanguage.includes('es') ? 'es' : 'pt-br';

// Carrega as traduções e a tabela ao carregar a página
window.onload = function() {
  setLanguage(preferredLanguage);
  loadCSVData();
};
