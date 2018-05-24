import dayjs from 'dayjs';

import { formatUnicorn } from './strings';
import { letter } from './letter';

import 'dayjs/locale/de';

dayjs.locale('de');

function createMailtoLink(email, userName) {
  const date = dayjs()
    .add(4, 'week')
    .add(1, 'day')
    .format('DD.MM.YYYY');
  const text = encodeURIComponent(
    formatUnicorn(letter, { name: userName, date })
  );
  return `mailto:${email}?subject=Auskunft gemäß Artikel 15 DSGVO&body=${text}`;
}

export { createMailtoLink };
