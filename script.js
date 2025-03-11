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
        const spec = test.getElementsByTagName('spec')[0]?.textContent || '';
        const passing = parseInt(test.getElementsByTagName('passing')[0]?.textContent, 10) || 0;
        const failing = parseInt(test.getElementsByTagName('failing')[0]?.textContent, 10) || 0;
        const pending = parseInt(test.getElementsByTagName('pending')[0]?.textContent, 10) || 0;
        const skipped = parseInt(test.getElementsByTagName('skipped')[0]?.textContent, 10) || 0;
        const duration = test.getElementsByTagName('duration')[0]?.textContent || '';

        passingCount += passing;
        failingCount += failing;
        pendingCount += pending;
        skippedCount += skipped;

        const row = document.createElement('tr');
        
        row.innerHTML = `<td>${spec}</td><td>${passing}</td><td>${failing}</td><td>${pending}</td><td>${skipped}</td><td>${duration}</td>`;
        tbody.appendChild(row);
      });

      document.getElementById('passingCount').textContent = passingCount;
      document.getElementById('failingCount').textContent = failingCount;
      document.getElementById('pendingCount').textContent = pendingCount;
      document.getElementById('skippedCount').textContent = skippedCount;
    })
    .catch(error => console.error('Erro ao carregar XML:', error));
}

document.getElementById('testDataForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const rawData = document.getElementById('testData').value.split('\n');
  let newXML = '';

  rawData.forEach(line => {
    const regex = /\| ✔\s*(.*?)\s*(\d{2}:\d{2})\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*-\s*\|/;
    const match = line.match(regex);
    
    if (match) { newXML += `<test><spec>${match[1]}</spec><passing>${match[3]}</passing><failing>${match[4]}</failing><pending>${match[5]}</pending><skipped>${match[6]}</skipped><duration>${match[2]}</duration></test>\n`; }
  });

  if (newXML) { saveToXML(newXML); }
});

function saveToXML(newData) {
  fetch('test_history.xml')
    .then(response => response.text())
    .then(existingData => {
      const finalXML = existingData.replace('</testHistory>', newData + '</testHistory>');
      const blob = new Blob([finalXML], { type: 'application/xml' });
      const link = document.createElement('a');
      
      link.href = URL.createObjectURL(blob);
      link.download = 'test_history.xml';
      link.click();
    });
}
