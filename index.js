import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = __dirname + '/data';
const OUTPUT_PATH = __dirname + '/cities.json';

const citiesArr = [];

fs.readdir(DATA_PATH, {}, (error, files) => {
  if (error) console.error('❌ An error occured:', error);

  files.forEach((file) => {
    const raw = fs.readFileSync(DATA_PATH + '/' + file);

    const { region, cities } = JSON.parse(raw);

    cities.forEach((city) => citiesArr.push({ name: city, region }));
  });

  fs.writeFile(OUTPUT_PATH, JSON.stringify(citiesArr, null, 2), (error) => {
    if (error) throw new Error(`An error occured while writing file:`);
  });

  console.log('✅ Successfully wrote cities.json');
});
