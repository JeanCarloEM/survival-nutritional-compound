document.addEventListener('DOMContentLoaded', function () {
  const langSelector = document.getElementById('langSelector');
  const langFiles = {
    'pt-br': '/data/i18n/pt-br.json',
    'en': '/data/i18n/en.json',
    'es': '/data/i18n/es.json'
  };

  function loadLang(lang) {
    fetch(langFiles[lang])
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('title').innerText = data.title;
        document.getElementById('subtitle').innerText = data.subtitle;

        document.getElementById('tableTitle').innerText = data.tableTitle;

        // Populating sections
        document.getElementById('objectives').innerHTML = data.objectives.map(o => `<p>${o}</p>`).join('');
        document.getElementById('composition').innerHTML = data.composition.map(c => `<p>${c}</p>`).join('');
        document.getElementById('micronutrients').innerHTML = data.micronutrients.map(m => `<p>${m}</p>`).join('');
        document.getElementById('improvements').innerHTML = data.improvements.map(i => `<p>${i}</p>`).join('');
        document.getElementById('license').innerHTML = data.license;

        // Populating badges
        document.getElementById('badges').innerHTML = data.badges.map(b => `<span class="badge bg-info">${b}</span>`).join('');

        // Loading CSV data
        loadCSV(lang);
      });
  }

  function loadCSV(lang) {
    fetch('/data/data.csv')
      .then((response) => response.text())
      .then((csvData) => {
        const parsedData = Papa.parse(csvData, { header: true }).data;

        const table = document.getElementById('csvTable');
        const headers = Object.keys(parsedData[0]);
        let thead = '<thead><tr>';

        // Table headers
        headers.forEach(header => {
          thead += `<th>${header}</th>`;
        });
        thead += '</tr></thead>';

        let tbody = '<tbody>';

        // Table rows
        parsedData.forEach(row => {
          tbody += '<tr>';
          headers.forEach(header => {
            tbody += `<td>${row[header]}</td>`;
          });
          tbody += '</tr>';
        });
        tbody += '</tbody>';

        table.innerHTML = thead + tbody;
      });
  }

  langSelector.addEventListener('change', (event) => {
    loadLang(event.target.value);
  });

  // Load default language
  loadLang('pt-br');
});
