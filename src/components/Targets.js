import React from 'react';

import Target from './Target';

const Targets = ({ targets, name, targetSearch, targetFilter }) => {
  const filteredTargets = Object.entries(targetFilter)
    .map(x => {
      console.log(x);
      if (x[1] === false) return null;
      return targets[x[0]];
    })
    .filter(x => x !== null);
  console.log('filteredTargets', filteredTargets);

  const flattenTargets = filteredTargets.reduce((x, y) => x.concat(y), []);

  const finalTargets = targetSearch.length
    ? flattenTargets.filter(
        x => x.Name.toLowerCase().indexOf(targetSearch.toLowerCase()) >= 0
      )
    : flattenTargets;

  const targetElemetns =
    finalTargets &&
    finalTargets.map((x, i) => (
      <Target
        key={i}
        name={x['Name']}
        email={x['Email']}
        userName={name || ''}
      />
    ));

  console.log(targetElemetns.length);

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {targetElemetns}
    </div>
  );
};

export default Targets;
