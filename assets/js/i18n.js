// Função para carregar o arquivo JSON de idioma
function loadTranslations(language) {
    fetch(`/data/i18n/${language}.json`)
      .then(response => response.json())
      .then(translations => {
        applyTranslations(translations);
      })
      .catch(error => console.error("Erro ao carregar as traduções:", error));
  }
  
  // Função para aplicar as traduções no conteúdo da página
  function applyTranslations(translations) {
    // Títulos e subtítulos
    document.getElementById("title").innerText = translations.title;
    document.getElementById("subtitle").innerText = translations.subtitle;
    
    // Objetivos
    let objectivesList = document.getElementById("objectives");
    objectivesList.innerHTML = "";
    translations.objectives.forEach(objective => {
      let li = document.createElement("li");
      li.innerText = objective;
      objectivesList.appendChild(li);
    });
  
    // Composição
    let compositionList = document.getElementById("composition");
    compositionList.innerHTML = "";
    translations.composition.forEach(item => {
      let li = document.createElement("li");
      li.innerText = item;
      compositionList.appendChild(li);
    });
  
    // Micronutrientes
    let micronutrientsList = document.getElementById("micronutrients");
    micronutrientsList.innerHTML = "";
    translations.micronutrients.forEach(item => {
      let li = document.createElement("li");
      li.innerText = item;
      micronutrientsList.appendChild(li);
    });
  
    // Potenciais de Melhoria
    let improvementsList = document.getElementById("improvements");
    improvementsList.innerHTML = "";
    translations.improvements.forEach(item => {
      let li = document.createElement("li");
      li.innerText = item;
      improvementsList.appendChild(li);
    });
  
    // Licença
    document.getElementById("license").innerText = translations.license;
  
    // Badges
    let badgesList = document.getElementById("badges");
    badgesList.innerHTML = "";
    translations.badges.forEach(badge => {
      let li = document.createElement("li");
      li.innerText = badge;
      badgesList.appendChild(li);
    });
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
  