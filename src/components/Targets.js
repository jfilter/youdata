import React from 'react';

import Target from './Target';

const Targets = ({ targets, name, targetSearch, targetCurrentFilter }) => {
  if (targetCurrentFilter === null && !targetSearch.length) return null;
  console.log('targetSearch', targetSearch);

  let targetsProcessed = null;

  if (targetCurrentFilter !== null) {
    targetsProcessed = targets[targetCurrentFilter];
  }

  if (targetSearch.length) {
    const flattenTargets = Object.values(targets).reduce(
      (x, y) => x.concat(y),
      []
    );
    targetsProcessed = flattenTargets.filter(
      x => x.name.toLowerCase().indexOf(targetSearch.toLowerCase()) >= 0
    );
  }

  const targetElemetns =
    targetsProcessed &&
    targetsProcessed.map((x, i) => (
      <Target key={i} name={x.name} email={x.email} userName={name || ''} />
    ));

  const nothingFound = (
    <div style={{ padding: '1rem' }}>Die Auswahl ergab keine Treffer.</div>
  );

  return (
    <div
      style={{
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        textAlign: 'left',
        maxWidth: '30rem',
        margin: '0 auto',
      }}
    >
      {targetElemetns.length ? targetElemetns : nothingFound}
    </div>
  );
};

export default Targets;
