import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

import './App.css';
import Targets from './components/Targets';

class App extends Component {
  state = {
    name: '',
    targetSearch: '',
    targetFilter: {},
    targets: {},
  };

  async componentDidMount() {
    const res = await fetch('https://youdata-api.app.vis.one');
    const targets = await res.json();
    const targetFilter = Object.keys(targets).map(x => {
      return {
        [x]: true,
      };
    });

    this.setState({
      targets,
      targetFilter: Object.assign({}, ...targetFilter),
    });
  }

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  handleChangeTarget = e => {
    this.setState({ targetSearch: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">youdata.eu</h1>
          <Ionicon icon="md-at" fontSize="50px" color="black" rotate={true} />
          <h2>
            Du hast dein Recht auf deine Daten.<br />Nutz' es!
          </h2>
        </header>
        <div className="explanation">
          Durch die DSGVO hast du das Recht auf Auskunft über die Daten, die ein
          Unterhemen bei dir speichern. Wir helfen dir mir vorfourlierten
          Emails. Damit das läuft, mache folgendes:<br />
          <br />
          1. richte ein Email-Programm (z.B. Thunderbird) an <br />
          <br />
          2. Gib deinen Namen an (für die Grußformel) <br />
          <br />
          3. Wähle ein Unternehmen aus <br />
          <br />
          4. Schicke die Email mit Email-Programm an
        </div>
        <div>
          <p>Gib deinen Name an:</p>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChangeName}
          />

          <p>Suche:</p>
          <input
            type="text"
            value={this.state.targetSearch}
            onChange={this.handleChangeTarget}
          />
          <p>Filter:</p>
          {Object.entries(this.state.targetFilter).map(x => (
            <div key={x[0]}>
              <input
                type="checkbox"
                checked={x[1]}
                onChange={e =>
                  this.setState({
                    targetFilter: {
                      ...this.state.targetFilter,
                      ...{ [x[0]]: e.target.checked },
                    },
                  })
                }
              />
              {x[0]}
            </div>
          ))}
          <Targets
            targets={this.state.targets}
            name={this.state.name}
            targetSearch={this.state.targetSearch}
            targetFilter={this.state.targetFilter}
          />
        </div>
      </div>
    );
  }
}

export default App;
