import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

import './App.css';
import Targets from './components/Targets';

class App extends Component {
  state = {
    inputName: '',
    name: '',
    targetSearch: '',
    targetFilter: {},
    targetCurrentFilter: null,
    targets: {},
    numTargets: '...',
  };

  componentWillMount() {
    this.nameInputTimer = null;
  }

  async componentDidMount() {
    const res = await fetch('https://api.youdata.eu');
    const targets = await res.json();
    let numTargets = 0;

    const targetFilter = Object.keys(targets).map(x => {
      numTargets += targets[x].length;
      return {
        [x]: true,
      };
    });

    this.setState({
      targets,
      numTargets,
      targetFilter: Object.assign({}, ...targetFilter),
    });
  }

  displayString = str => {
    return str
      .split('-')
      .map(x => x.charAt(0).toUpperCase() + x.slice(1))
      .join(' ')
      .replace('ae', 'ä')
      .replace('oe', 'ö')
      .replace('ue', 'ü');
  };

  delayedUpdate = () => {
    this.setState({ name: this.state.inputName });
  };

  handleChangeName = e => {
    clearTimeout(this.nameInputTimer);
    this.setState({ inputName: e.target.value });
    this.nameInputTimer = setTimeout(this.delayedUpdate, 3000);
  };

  handleChangeTarget = e => {
    document.getElementById('search-bar').scrollIntoView();
    this.setState({ targetSearch: e.target.value, targetCurrentFilter: null });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">youdata.eu</h1>
          <Ionicon icon="md-at" fontSize="50px" color="black" rotate={true} />
          <h2>Nutz Dein Recht auf Deine Daten!</h2>
        </header>
        <div className="explanation">
          Wir helfen Dir, easy Unternehmen oder Behörden nach Deinen Daten
          anzufragen. Voraussetzung ist die Benutzung eines E-Mail-Clients.<br />
          <br />
          <div className="num-container">
            <div className="num">1</div>
            <div className="num-text">
              Richte einen E-Mail-Client auf Deinem Smartphone oder Deinem
              Computer ein (z.&nbsp;B.{' '}
              <a href="https://www.thunderbird.net/" target="_blank">
                Thunderbird
              </a>).
            </div>
          </div>
          <div className="num-container">
            <div className="num">2</div>
            <div className="num-text">
              Gib Deinen Namen an (für die Grußformel, optional):
              <div style={{ textAlign: 'center' }}>
                <input
                  placeholder="Dein Name"
                  style={{ marginTop: '1rem' }}
                  type="text"
                  onChange={this.handleChangeName}
                />
              </div>
            </div>
          </div>
          <div className="num-container">
            <div className="num">3</div>
            <div className="num-text">
              Wähle ein Unternehmen oder eine Behörde aus.<br />
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <Ionicon icon="md-arrow-down" fontSize="40px" color="black" />
              </div>
            </div>
          </div>
          <div className="num-container">
            <div className="num">4</div>
            <div className="num-text">
              Versende die E-Mail mit Deinem E-Mail-Client.
            </div>
          </div>
          <div className="num-container">
            <div className="num">5</div>
            <div className="num-text">
              Warte auf die Antwort und reiche ggf. Informationen nach. Wenn Du
              innerhalb der gesetzten Frist keine Antwort erhälst, hast Du ein{' '}
              <a
                href="https://deinedatendeinerechte.de/themen/rechte-auf-beschwerde-und-vertretung-durch-verbraucherschutzorganisationen/?cat=machen"
                target="_blank"
              >
                Recht auf Beschwerde
              </a>.<br />
              <small>
                (Hier wird es in Zukunft wahrscheinlich noch andere Möglichkeiten
                geben. Stay tuned.)
              </small>
            </div>
          </div>
        </div>
        <div>
          <div className="controlls">
            <h4>
              Wähle aus insgesamt {this.state.numTargets} Unternehmen, Behörden
              und anderen Organisationen aus.
            </h4>
            <input
              id="search-bar"
              // style={{ width: '100%' }}
              type="text"
              value={this.state.targetSearch}
              onChange={this.handleChangeTarget}
              placeholder="Suche ..."
            />
          </div>
          <p>... oder welche Kategorie möchtest Du sehen?</p>
          <div className="filter-container">
            {Object.entries(this.state.targetFilter)
              .sort()
              .map(x => (
                <div
                  className={
                    x[0] === this.state.targetCurrentFilter
                      ? 'active'
                      : 'inactive'
                  }
                  key={x[0]}
                  onClick={() => {
                    document
                      .getElementsByClassName('filter-container')[0]
                      .scrollIntoView({ behavior: 'smooth', block: 'start' });
                    this.setState({
                      targetCurrentFilter:
                        this.state.targetCurrentFilter === x[0] ? null : x[0],
                    });
                  }}
                >{`${this.displayString(x[0])} (${
                  this.state.targets[x[0]].length
                })`}</div>
              ))}
          </div>
          <div
            style={{
              minHeight: '60rem',
            }}
          >
            <Targets
              targets={this.state.targets}
              name={this.state.name}
              targetSearch={this.state.targetSearch}
              targetCurrentFilter={this.state.targetCurrentFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
