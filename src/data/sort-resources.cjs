const fs = require('fs');

const json = fs.readFileSync('./resources.json', 'utf-8');
const resources = JSON.parse(json);

resources.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync('resources.json', JSON.stringify(resources, null, 2));

console.log('✅ resources.json sorted in resources-sorted.json');