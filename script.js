import fs from 'node:fs';

const __dirname = import.meta.dirname;

const DATA_PATH = __dirname + '/data';
const OUTPUT_PATH = __dirname + '/ghana-cities.json';

const citiesArr = [];

fs.readdir(DATA_PATH, (error, files) => {
  if (error) console.error('❌ An error occured:', error);

  files.forEach((file) => {
    const raw = fs.readFileSync(DATA_PATH + '/' + file);

    const { region, cities } = JSON.parse(raw);

    cities.forEach((city) => citiesArr.push({ name: city, region }));
  });

  fs.writeFile(OUTPUT_PATH, JSON.stringify(citiesArr, null, 2), (error) => {
    if (error) throw new Error('An error occured while writing file');
  });

  console.log(
    `✅ Successfully wrote ${citiesArr.length} items to ghana-cities.json`
  );
});
