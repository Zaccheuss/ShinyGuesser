import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const pwd = dirname(fileURLToPath(import.meta.url));