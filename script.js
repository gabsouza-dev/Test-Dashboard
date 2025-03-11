function loadXMLData() {
  fetch('test_history.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'application/xml');
      const tests = xmlDoc.getElementsByTagName('test');
      const tbody = document.getElementById('testHistoryTable').getElementsByTagName('tbody')[0];
      
      tbody.innerHTML = '';

      let passingCount = 0, failingCount = 0, pendingCount = 0, skippedCount = 0;
      
      Array.from(tests).forEach(test => {
        const name = test.getAttribute('name') || '';
        const passed = parseInt(test.getAttribute('passed'), 10) || 0;
        const failed = parseInt(test.getAttribute('failed'), 10) || 0;
        const pending = parseInt(test.getAttribute('pending'), 10) || 0;
        const skipped = parseInt(test.getAttribute('skipped'), 10) || 0;
        const time = test.getAttribute('time') || '';
        const total = parseInt(test.getAttribute('total'), 10) || 0;

        passingCount += passed;
        failingCount += failed;
        pendingCount += pending;
        skippedCount += skipped;

        const row = document.createElement('tr');
        
        row.innerHTML = `<td>${name}</td><td>${passed}</td><td>${failed}</td><td>${pending}</td><td>${skipped}</td><td>${time}</td><td>${total}</td>`;
        tbody.appendChild(row);
      });

      document.getElementById('passingCount').textContent = passingCount;
      document.getElementById('failingCount').textContent = failingCount;
      document.getElementById('pendingCount').textContent = pendingCount;
      document.getElementById('skippedCount').textContent = skippedCount;
      document.getElementById('totalCount').textContent = passingCount + failingCount + pendingCount + skippedCount;
    }).catch(error => console.error('Erro ao carregar XML:', error));
}

document.getElementById('testDataForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const rawData = document.getElementById('testData').value.split('\n');

  if (!rawData) {
    alert("Por favor, insira os dados dos testes.");
    return;
  }
  
  let newXML = '';

  rawData.forEach(line => {
    const regex = /\| ✔\s*(.*?)\s*(\d{2}:\d{2})\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*-\s*\|/;
    const match = line.match(regex);
    
    if (match) { newXML += `<test name="${match[1]}" passed="${match[3]}" failed="${match[4]}" pending="${match[5]}" skipped="${match[6]}" time="${match[2]}" total="${parseInt(match[3]) + parseInt(match[4]) + parseInt(match[5]) + parseInt(match[6])}" />\n`; }
  });

  if (newXML) { saveToXML(newXML); }
  else { alert("Formato dos dados está incorreto. Tente novamente."); }
});

function saveToXML(newData) {
  fetch('test_history.xml')
    .then(response => response.text())
    .then(existingData => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(existingData, 'application/xml');
      const testsElement = xmlDoc.getElementsByTagName('tests')[0];
      const newTests = parser.parseFromString('<tests>' + newData + '</tests>', 'application/xml').getElementsByTagName('test');

      Array.from(newTests).forEach(test => { testsElement.appendChild(test); });

      const serializer = new XMLSerializer();
      const updatedXML = serializer.serializeToString(xmlDoc);
      const blob = new Blob([updatedXML], { type: 'application/xml' });
      const link = document.createElement('a');
      
      link.href = URL.createObjectURL(blob);
      link.download = 'test_history.xml';
      link.click();
    })
    .catch(error => console.error('Erro ao salvar XML:', error));
}
