import { countNames } from 'name-counter';
import { getNamesFromFile, getTextFromFile, writeToFile } from './utils';

// For ease, the command yarn start includes these by default, pointing to the resources folder
const [, , textFilePath, titlesFilePath, firstNamesFilePath, lastNamesFilePath, outputPath] = process.argv;

if (!textFilePath || !titlesFilePath || !firstNamesFilePath || !lastNamesFilePath || !outputPath) {
  throw new Error('Did not receive all required arguments. Ensure that you provide the file paths for: text to search, titles, first names, last names and output');
}

Promise.all([
  getTextFromFile(textFilePath),
  getNamesFromFile(titlesFilePath),
  getNamesFromFile(firstNamesFilePath),
  getNamesFromFile(lastNamesFilePath)
])
  .then(([text, titles, firstNames, lastNames]) => {
    const countedNames = countNames(text, titles, firstNames, lastNames);
    const results = countedNames
      .map(name => `${name.name}: ${name.timesFound}`)
      .join('\n');
    return writeToFile(outputPath, results)
  })
  .then(() => {
    console.log('Wrote out file successfully. Closing');
    process.exit(0);
  })
  .catch(err => {
    console.error('Could not read specified file', err);
    process.exit(1);
  });

