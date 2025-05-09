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
  // Títulos
  document.getElementById('title').innerText = translations.title;
  document.getElementById('subtitle').innerText = translations.subtitle;

  // Objetivos
  let objectivesList = document.getElementById('objectives');
  objectivesList.innerHTML = '';
  translations.objectives.forEach(objective => {
    let li = document.createElement('li');
    li.innerText = objective;
    objectivesList.appendChild(li);
  });

  // O que não é objetivo
  let notObjectivesList = document.getElementById('not-objective-list');
  notObjectivesList.innerHTML = '';
  translations.not_objective_list.forEach(item => {
    let li = document.createElement('li');
    li.innerText = item;
    notObjectivesList.appendChild(li);
  });

  // Composição
  document.getElementById('composition-title').innerText = translations.composition_title;
  document.getElementById('composition-text').innerText = translations.composition_text;

  // Micronutrientes Sensíveis
  document.getElementById('sensitive-nutrients-title').innerText = translations.sensitive_nutrients_title;
  document.getElementById('sensitive-nutrients-text').innerText = translations.sensitive_nutrients_text;

  // Potenciais de Melhoria
  let improvementsList = document.getElementById('improvements');
  improvementsList.innerHTML = '';
  translations.improvements_list.forEach(item => {
    let li = document.createElement('li');
    li.innerText = item;
    improvementsList.appendChild(li);
  });

  // Licença
  document.getElementById('license-title').innerText = translations.license_title;
  document.getElementById('license-text').innerText = translations.license_text;
  document.getElementById('license-link').innerText = translations.license_link;

  // Título da Tabela
  document.getElementById('table-title').innerText = translations.table_title;

  // Cabeçalhos da tabela
  document.getElementById('name-header').innerText = translations.table_headers.name;
  document.getElementById('dosage-header').innerText = translations.table_headers.dosage;
  document.getElementById('nutrients-header').innerText = translations.table_headers.nutrients;
  document.getElementById('estimated-header').innerText = translations.table_headers.estimated;
  document.getElementById('notes-header').innerText = translations.table_headers.notes;
}

// Função para definir o idioma, padrão 'pt-br'
function setLanguage(language = 'pt-br') {
  loadTranslations(language);
}

// Detecta a preferência de idioma do navegador
const userLanguage = navigator.language || navigator.userLanguage;
const preferredLanguage = userLanguage.includes('en') ? 'en' : userLanguage.includes('es') ? 'es' : 'pt-br';

// Carrega o idioma preferido
setLanguage(preferredLanguage);
