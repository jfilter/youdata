import React, { Component } from "react";
import dayjs from "dayjs";

import logo from "./logo.svg";
import "./App.css";

String.prototype.formatUnicorn =
  String.prototype.formatUnicorn ||
  function() {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
      var t = typeof arguments[0];
      var key;
      var args =
        "string" === t || "number" === t
          ? Array.prototype.slice.call(arguments)
          : arguments[0];

      for (key in args) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
      }
    }

    return str;
  };

const letter = `Auskunft gemäß Artikel 15 DSGVO

Sehr geehrte Damen und Herren,

gemäß Artikel 15 der Datenschutz-Grundverordnung (DSGVO) verlange ich hiermit Auskunft 
darüber, ob bei Ihnen personenbezogene Daten über mich gespeichert sind. Falls dies der Fall ist, 
verlange ich Auskunft über die Informationen nach Artikel 15, Absätze 1 und 2 DSGVO.
Ich bitte um eine Bestätigung des Eingangs meines Antrags und gemäß Artikel 12 Absatz 3 
DSGVO um Informationen zu den daraufhin ergriffenen Maßnahmen bis spätestens zum 
folgenden Datum: {date}

Bei Nichtbeachtung meiner Forderung werde ich mich an eine Datenschutzbehörde wenden. 
Zudem behalte ich mir weitere rechtliche Schritte vor, die auch die Geltendmachung von 
Schadenersatzansprüchen nach Artikel 82 DSGVO umfassen.

Mit freundlichen Grüßen

{name}`;

const victims = [
  {
    name: "FragDenStaat",
    email: "info@fragdenstaat.de",
    website: "https://fragdenstaat.de"
  },
  {
    name: "Schufa",
    email: "meineSCHUFA@SCHUFA.de",
    website: "https://www.meineschufa.de"
  },
  {
    name: "Facebook",
    email: "impressum-support@support.facebook.com",
    website: "https://www.facebook.com"
  }
];

function createHref(victim, name) {
  const date = dayjs().add(4, "week");
  const text = encodeURIComponent(letter.formatUnicorn({ name, date }));
  return `mailto:${
    victim.email
  }?subject=Auskunft gemäß Artikel 15 DSGVO&body=${text}`;
}

class App extends Component {
  state = { name: "" };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const victimElements = victims.map(x => {
      return (
        <div>
          <h2>{x.name}</h2>
          <a href={x.website}>{x.website}</a>
          <br />
          <a href={createHref(x, this.state.name)}>
            Email mit Email-Programm Senden
          </a>
        </div>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">YouData – BAM OIDA</h1>
        </header>
        <p>Los geht's Homies!</p>
        <div>
          <p>Gib deinen Name an:</p>
          <input
            style={{ border: "1px solid black" }}
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          {this.state.name && victimElements}
        </div>
      </div>
    );
  }
}

export default App;
