import React from 'react';

import Target from './Target';

const Targets = ({ targets, name, targetSearch, targetFilter }) => {
  const filteredTargets = Object.entries(targetFilter)
    .map(x => {
      if (x[1] === false) return null;
      return targets[x[0]];
    })
    .filter(x => x !== null);

  const flattenTargets = filteredTargets.reduce((x, y) => x.concat(y), []);

  const finalTargets = targetSearch.length
    ? flattenTargets.filter(
        x => x.name.toLowerCase().indexOf(targetSearch.toLowerCase()) >= 0
      )
    : flattenTargets;

  const targetElemetns =
    finalTargets &&
    finalTargets.map((x, i) => (
      <Target key={i} name={x.name} email={x.email} userName={name || ''} />
    ));

  const nothingFound = (
    <div style={{ padding: '1rem' }}>Die Auswahl ergab keine Treffer.</div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {targetElemetns.length ? targetElemetns : nothingFound}
    </div>
  );
};

export default Targets;
