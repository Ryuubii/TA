import { fileURLToPath } from 'url';
import path from 'path';

export const basedir = path.dirname(fileURLToPath(new URL(import.meta.url)));
