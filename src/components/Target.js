import React from 'react';

import { createMailtoLink } from '../util/mailto';

const Target = ({ name, email, userName }) => (
  <div
    style={{
      padding: '1rem',
      border: '1px solid whitesmoke',
      margin: '.5rem',
    }}
  >
    <a href={createMailtoLink(email, userName)}>{name}</a>
  </div>
);

export default Target;
