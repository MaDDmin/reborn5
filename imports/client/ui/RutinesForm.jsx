import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

import InfiniteCalendar, { withRange, Calendar } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';


class LiniaExercici extends Component {
    constructor(props) {
        super(props);

        this.liniaChange = this.liniaChange.bind(this);
    }

      // actualitzaDefaultsExercici(event){
      //   event.preventDefault();
      //
      //   // Aquest mètode actualitza els valors per defecte del nombre de repeticions, de sèries, temps de descans i minuts assignats a cada exercici de la Llista.
      //
      //   let exerciciSelected = this.refs.selExercici.selectedOptions[0].value,
      //     defaultRepeticions = this.props.exercicis.find({})
      //
      //
      // }
      //
      // actualitzaLiniaExercici(event){
      //   event.preventDefault();
      //
      //   // Aquest mètode actualitzarà l'estat del component LiniaExercici que ha sigut modificat amb les noves dades.
      //
      //   let exerciciTriat = this.refs.selExercici.selectedOptions[0].value,
      //     repeticions;
      // }
      //
      // ELS BOTONS:
      //
      // liniaUp(event){
      //   event.preventDefault();
      //
      // }
      //
      // liniaDown(event){
      //   event.preventDefault();
      //
      // }
      //
      // liniaDelete(event){
      //   event.preventDefault();
      //
      // }

    componentDidMount() {
    // if (!this.refs.selExercici.selectedOptions[0]){
    //   this.refs.selExercici.options[0].setAttribute("selected", true);
    // }
    //    this.selExerciciChange();
    }

    selExerciciChange(ev) {
        if (!!this.refs.selExercici.selectedOptions.length) {
            let
                exerStringified = this.refs.selExercici.selectedOptions[0].getAttribute("data-exercici"),
                exer = JSON.parse(exerStringified);
            // Ha canviat l'exercici i hem d'actualitzar les dades que l'acompanyen ()
            this.state.exerciciSel = exer;
        } else {
            this.refs.selExercici.options[0].setAttribute("selected", "selected");
        }

        this.refs.inRepeticions.value = this.state.repeticions;
        this.refs.inSeries.value = this.state.series;
        this.refs.inDescans.value = this.state.descans;
        this.refs.inMinuts.value = this.state.minuts;
    }

    altraOp() {
        this.state.repeticions = this.refs.inRepeticions.value;
        this.state.series = this.refs.inSeries.value;
        this.state.descans = this.refs.inDescans.value;
        this.state.minuts = this.refs.inMinuts.value;

        this.selExerciciChange();

        console.log(`State: ${JSON.stringify(this.state)}`);
        console.dir(toJS(this.state));
    }

    liniaChange(ev) {
    }

    render() {
        return (
            <li className="liSelEx">
                <select
                    className="selExercici"
                    ref={selExercici => this.selExercici = selExercici}
                    onChange={this.liniaChange}
                >
                    {
                        this.props.exercicis.map(exercici => (
                            <option
                                key={exercici.exerciciNom}
                                value={exercici._id}
                                data-exercici={JSON.stringify(exercici)}
                            >
                                { exercici.exerciciNom }
                            </option>
                        ))
                    }
                </select>
                <input
                    type="text"
                    placeholder="Repeticions"
                    ref={inRepeticions => this.inRepeticions = inRepeticions}
                    onChange={this.liniaChange}
                />
                <input
                    type="text"
                    placeholder="Series"
                    ref={inSeries => this.inSeries = inSeries}
                    onChange={this.liniaChange}
                />
                <input
                    type="text"
                    placeholder="Descans"
                    ref={inDescans => this.inDescans = inDescans}
                    onChange={this.liniaChange}
                />
                <input
                    type="text"
                    placeholder="Minuts"
                    ref={inMinuts => this.inMinuts = inMinuts}
                    onChange={this.liniaChange}
                />
                <table>
                    <tbody>
                        <tr>
                            <td><input type="radio" name="tipusLinia" title="Normal" value="Normal" /></td>
                            <td><input type="radio" name="tipusLinia" title="Super" value="Super" /></td>
                            <td><input type="radio" name="tipusLinia" title="Triple" value="Triple" /></td>
                            <td><input type="radio" name="tipusLinia" title="Separador" value="Separador" /></td>
                        </tr>
                    </tbody>
                </table>
                <button ref={btLiniaUp => this.btLiniaUp = btLiniaUp} ></button>
                <button ref={btLiniaDown => this.btLiniaDown = btLiniaDown} ></button>
                <button ref={btLiniaDelete => this.btLiniaDelete = btLiniaDelete} ></button>
            </li>
        );
    }
}

class LlistaExercicis extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ol
                    id="olSelEx"
                    ref={olSelEx => this.olSelEx = olSelEx}
                >
                    {this.props.children}
                </ol>
                <button
                    id="btAddEx"
                    ref={btAddEx => this.btAddEx = btAddEx}
                >
                    +
                </button>
            </div>
        );
    }
}

export default class RutinesForm extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   nombreExercicis: 1
        // };
    }

    onAddSelEx(event) {
        event.preventDefault();
        let
            olSelEx = this.olSelEx,
            newSelEx = () => (
                <li className="liSelEx">
                    <select ref={selExercici => this.selExercici = selExercici} >
                        {
                            this.props.exercicis.map((exercici, index) =>
                                <option key={index} value={exercici._id}>
                                    { exercici.exerciciNom }
                                </option>
                            )
                        }
                    </select>
                </li>
            );

        olSelEx.appendChild(newSelEx);
    }
//*****************************************************************************************************************
  addRutina(event){
    event.preventDefault();
    let rutinaNom = this.refs.rutinaNom.value.trim(),
        rutinaClient = this.refs.selClient.selectedOptions[0].value,
        rutinaGrupMuscular = this.refs.selGrupMuscular.selectedOptions[0].value,
        rutinaDiaInici = this.refs.rutinaDayOfStart.selectedOptions[0].value,
        rutinaMesInici = this.refs.rutinaMonthOfStart.selectedOptions[0].value,
        rutinaAnyInici = this.refs.rutinaYearOfStart.selectedOptions[0].value,
        rutinaDiaFi = this.refs.rutinaDayOfFinish.selectedOptions[0].value,
        rutinaMesFi = this.refs.rutinaMonthOfFinish.selectedOptions[0].value,
        rutinaAnyFi = this.refs.rutinaYearOfFinish.selectedOptions[0].value,
        rutinaDescripcio = this.refs.rutinaDescripcio.value.trim();

    if (rutinaNom){
      Meteor.call('rutines.insert', rutinaNom, rutinaClient, rutinaGrupMuscular, rutinaDiaInici, rutinaMesInici, rutinaAnyInici, rutinaDiaFi, rutinaMesFi, rutinaAnyFi, rutinaDescripcio, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'introduir dades.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.rutinaNom.value = "";
          this.refs.rutinaDescripcio.value = "";
        }
      });
    }
  }

  render(){
    // const children = [];
    //
    // for (let i = 0; i < this.state.nombreExercicis; i += 1) {
    //   children.push(<LiniaExercici
    //     number={i}
    //   />);
    // };
    let
        today = new Date(),
        lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    return (
      <div id="divRutinesForm">
        <h2>Nova Rutina</h2>
        <form className="novarutina" onSubmit={this.addRutina.bind(this)}>
          <input
            type="text"
            ref="rutinaNom"
            placeholder="Nom de la Rutina"
          />
          <label>Client: </label>
          <select ref="selClient">
            {
              this.props.clients.map(client=>
                <option key={client.clientNom} value={client._id}>
                  { client.clientCognoms+", "+client.clientNom }
                </option>

              )
            }
          </select>
          <label>Grup Muscular: </label>
          <select ref="selGrupMuscular">
            {
              this.props.grups_musculars.map(grup_muscular=>
                <option key={grup_muscular.grupMuscularNom} value={grup_muscular._id}>
                  { grup_muscular.grupMuscularNom }
                </option>
              )
            }
          </select>

          {/*Component= withRange(Calendar)}*/}

          <InfiniteCalendar
            Component={withRange(Calendar)}
            selected={{
                start: new Date(),
                end: new Date()
            }}
            min={new Date(1940, 0, 1)}
            minDate={new Date(1940, 0, 1)}
            max={new Date()}

            displayOptions={{
            }}
            locale={{
                locale: require('date-fns/locale/ca'),
                headerFormat: 'dddd, D MMM',
                weekdays: ["Dmg","Dll","Dm","Dcs","Djs","Dvs","Dss"],
                blank: 'Selecciona una data',
                todayLabel: {
                 long: 'Anar a avui',
                 short: 'Avui.'
             }
            }}
          />

          <fieldset>
            <legend>Llista d'exercicis: </legend>

            <LlistaExercicis
              addSelEx={this.onAddSelEx.bind(this)}
              clients={this.props.clients}
              grups_musculars={this.props.grups_musculars}
              exercicis={this.props.exercicis}
            >
              <LiniaExercici
                clients={this.props.clients}
                grups_musculars={this.props.grups_musculars}
                exercicis={this.props.exercicis}
              />
            </LlistaExercicis>

          </fieldset>
          <textarea
            ref="rutinaDescripcio"
            placeholder="Descripció de la rutina"
          />
          <input
            type="submit"
            ref="rutinaSubmit"
            value="Introduir"
          />
        </form>
      </div>
    );
  }
}
