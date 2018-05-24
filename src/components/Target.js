import React from 'react';
import LazyLoad from 'react-lazyload';

import { createMailtoLink } from '../util/mailto';

const Target = ({ name, email, userName }) => (
  <LazyLoad height={50} offset={200}>
    <div
      style={{
        padding: '1rem',
        border: '1px solid whitesmoke',
        margin: '.5rem',
      }}
    >
      <a href={createMailtoLink(email, userName)}>{name}</a>
    </div>
  </LazyLoad>
);

export default Target;
