import '@testing-library/jest-dom';

import {
  TextDecoder,
  TextEncoder,
} from 'util';

if (global.TextEncoder === undefined) {
  global.TextEncoder = TextEncoder;
}

if (global.TextDecoder === undefined) {
  global.TextDecoder = TextDecoder;
}
