import fs from 'fs';
import { Sightings } from './interface';

////////////////////////////////////////////////////
// Implement the following function and add types //
////////////////////////////////////////////////////

const LOCATION_DIR = 'locations';

export function decontaminate(filenames: string[]): Sightings {
  const sightings: Sightings = {
    kitchen: 0,
    attic: 0,
    bathroom: 0,
    bedroom: 0,
    backyard: 0
  };

  for (const file of filenames) {
    try {
      const data: string = fs.readFileSync(`${LOCATION_DIR}/${file}`).toString();
      const lines: string[] = data.split("\n");
      for (const line of lines) {
        sightings[line] += 1;
      }
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else {
        throw new Error(String(e));
      }
    }
  }

  return sightings;
}
