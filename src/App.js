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
    const res = await fetch('https://api.youdata.eu');
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
          <h2>Nutze dein Recht auf deine Daten!</h2>
        </header>
        <div className="explanation">
          Wir generieren Emails, die du an Unternehmen oder Behörden schickst,
          um Auskunft über deine Daten zu erhalten. Gehe bitte folgendermaßen
          vor:<br />
          <br />
          <div className="num-container">
            <div className="num">1</div>
            <div className="num-text">
              Richte ein Email-Programm auf deinem Smartphone oder deinem
              Computer ein (z.B. Thunderbird, Outlook oder Apple Mail).
            </div>
          </div>
          <div className="num-container">
            <div className="num">2</div>
            <div className="num-text">
              Gib deinen Namen an (für die Grußformel, optional):
              <div style={{ textAlign: 'center', paddingLeft: '3rem' }}>
                <input
                  style={{ marginTop: '1rem' }}
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChangeName}
                />
              </div>
            </div>
          </div>
          <div className="num-container">
            <div className="num">3</div>
            <div className="num-text">
              Wähle ein Unternehmen oder Behörde aus.<br />
              <div
                style={{
                  textAlign: 'center',
                  paddingLeft: '5rem',
                  paddingTop: '1rem',
                }}
              >
                <Ionicon icon="md-arrow-down" fontSize="40px" color="black" />
              </div>
            </div>
          </div>
          <div className="num-container">
            <div className="num">4</div>
            <div className="num-text">
              Schicke die Email mit deinem Email-Programm ab.
            </div>
          </div>
          <div className="num-container">
            <div className="num">5</div>
            <div className="num-text">
              Warte auf die Antwort und reiche ggf. Informationen nach. Wenn du
              innerhalb der gesetzten Frist keine Antwort erhälst, hast du ein{' '}
              <a
                href="https://deinedatendeinerechte.de/themen/rechte-auf-beschwerde-und-vertretung-durch-verbraucherschutzorganisationen/?cat=machen"
                target="_blank"
              >
                Recht auf Beschwerde
              </a>.<br />
              <small>
                (Hier wird ins Zukunft wahrscheinlich noch andere Möglichkeiten
                geben. Stay tuned.)
              </small>
            </div>
          </div>
        </div>
        <div>
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
