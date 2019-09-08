import React from 'react';
import LazyLoad from 'react-lazyload';

import { createMailtoLink } from '../util/mailto';

const Target = ({ name, email, userName }) => (
  <LazyLoad height={50} offset={200} once>
    <div
      style={{
        border: '1px solid whitesmoke',
        margin: '.5rem',
        // display:
      }}
    >
      <a href={createMailtoLink(email, userName)}>
        <div
          style={{
            padding: '1rem',
          }}
        >
          {name}
        </div>
      </a>
    </div>
  </LazyLoad>
);

export default Target;
