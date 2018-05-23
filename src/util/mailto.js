import dayjs from 'dayjs';

import { formatUnicorn } from './strings';
import { letter } from './letter';

function createMailtoLink(email, userName) {
  const date = dayjs().add(4, 'week');
  const text = encodeURIComponent(
    formatUnicorn(letter, { name: userName, date })
  );
  return `mailto:${email}?subject=Auskunft gemäß Artikel 15 DSGVO&body=${text}`;
}

export { createMailtoLink };
