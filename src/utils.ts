import { readFile, writeFile } from 'fs';
import { join } from 'path';

export async function getNamesFromFile(filePath: string): Promise<Array<string>> {
  return new Promise<Array<string>>((resolve, reject) => {
    readFile(join(__dirname, filePath), { encoding: 'utf-8' }, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        return resolve(parseNames(contents));
      }
    });
  });
}

export async function getTextFromFile(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    readFile(join(__dirname, filePath), { encoding: 'utf-8' }, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        return resolve(contents);
      }
    });
  });
}

export async function writeToFile(filePath: string, fileContents: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    writeFile(join(__dirname, filePath), fileContents, { encoding: 'utf-8' }, (err) => {
      if (err) {
        reject(err);
      } else {
        return resolve(undefined);
      }
    });
  });
}

function parseNames(names: string): string[] {
  return names.split(/\s+/);
}