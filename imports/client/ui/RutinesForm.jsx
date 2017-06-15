import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

class LiniaExercici extends Component{
  constructor(props){
    super(props);

    // this.state = {
    //   ordre: 0,
    //   repeticions: 0,
    //   series: 0,
    //   descans: 0,
    //   minuts: 0,
    //   tipus: "Normal"
    // };
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

  render () {
    return (
      <li className="liSelEx">
        <select ref="selExercici" >
          {
            this.props.exercicis.map(exercici=>
              <option key={exercici.exerciciNom} value={exercici._id}>
                { exercici.exerciciNom }
              </option>
            )
          }
        </select>
        <input type="text" placeholder="Repeticions" />
        <input type="text" placeholder="Series" />
        <input type="text" placeholder="Descans" />
        <input type="text" placeholder="Minuts" />
        <table>
          <tr>
            <td><input type="radio" name="tipusLinia" title="Normal" value="Normal" /></td>
            <td><input type="radio" name="tipusLinia" title="Super" value="Super" /></td>
            <td><input type="radio" name="tipusLinia" title="Triple" value="Triple" /></td>
            <td><input type="radio" name="tipusLinia" title="Separador" value="Separador" /></td>
          </tr>
        </table>
        <button ref="btLiniaUp" ></button>
        <button ref="btLiniaDown" ></button>
        <button ref="btLiniaDelete" ></button>
      </li>
    );
  }
}

class LlistaExercicis extends Component{
  render () {
    return (
      <div>
        <ol id="olSelEx" ref="olSelEx">
          {this.props.children}
        </ol>
        <button id="btAddEx" ref="btAddEx" >+</button>
      </div>
    );
  }
}

export default class RutinesForm extends Component{
  constructor(props){
    super(props);
    // this.state = {
    //   nombreExercicis: 1
    // };
  }

  onAddSelEx(event){
    event.preventDefault();
    let olSelEx = this.refs.olSelEx,
      newSelEx = ()=>(<li className="liSelEx">
        <select ref="selExercici">
          {
            this.props.exercicis.map(exercici=>
              <option key={exercici.exerciciNom} value={exercici._id}>
                { exercici.exerciciNom }
              </option>
            )
          }
        </select>
      </li>);

    olSelEx.appendChild(newSelEx);
  }

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
          <div id="divStartDate">
            <div className="control-group">
              <label htmlFor="dos-day" className="control-label">Data d'Inici: </label>
              <div className="controls">
                <select name="rutinaDayOfStart" id="rutinaDayOfStart" ref="rutinaDayOfStart">
                  <option value="">Dia</option>
                  <option value="">---</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select name="rutinaMonthOfStart" id="rutinaMonthOfStart" ref="rutinaMonthOfStart">
                  <option value="">Mes</option>
                  <option value="">-----</option>
                  <option value="01">Gener</option>
                  <option value="02">Febrer</option>
                  <option value="03">Març</option>
                  <option value="04">Abril</option>
                  <option value="05">Maig</option>
                  <option value="06">Juny</option>
                  <option value="07">Juliol</option>
                  <option value="08">Agost</option>
                  <option value="09">Setembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Desembre</option>
                </select>
                <select name="rutinaYearOfStart" id="rutinaYearOfStart" ref="rutinaYearOfStart">
                  <option value="">Any</option>
                  <option value="">----</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                  <option value="2035">2035</option>
                  <option value="2036">2036</option>
                  <option value="2037">2037</option>
                  <option value="2038">2038</option>
                  <option value="2039">2039</option>
                  <option value="2040">2040</option>
                  <option value="2041">2041</option>
                  <option value="2042">2042</option>
                  <option value="2043">2043</option>
                  <option value="2044">2044</option>
                  <option value="2045">2045</option>
                  <option value="2046">2046</option>
                  <option value="2047">2047</option>
                  <option value="2048">2048</option>
                  <option value="2049">2049</option>
                  <option value="2050">2050</option>
                </select>
              </div>
            </div>
          </div>
          <div id="divFinishDate">
            <div className="control-group">
              <label htmlFor="dof-day" className="control-label">Data de Finalització: </label>
              <div className="controls">
                <select name="rutinaDayOfFinish" id="rutinaDayOfFinish" ref="rutinaDayOfFinish">
                  <option value="">Dia</option>
                  <option value="">---</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select name="rutinaMonthOfFinish" id="rutinaMonthOfFinish" ref="rutinaMonthOfFinish">
                  <option value="">Mes</option>
                  <option value="">-----</option>
                  <option value="01">Gener</option>
                  <option value="02">Febrer</option>
                  <option value="03">Març</option>
                  <option value="04">Abril</option>
                  <option value="05">Maig</option>
                  <option value="06">Juny</option>
                  <option value="07">Juliol</option>
                  <option value="08">Agost</option>
                  <option value="09">Setembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Desembre</option>
                </select>
                <select name="rutinaYearOfFinish" id="rutinaYearOfFinish" ref="rutinaYearOfFinish">
                  <option value="">Any</option>
                  <option value="">----</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                  <option value="2035">2035</option>
                  <option value="2036">2036</option>
                  <option value="2037">2037</option>
                  <option value="2038">2038</option>
                  <option value="2039">2039</option>
                  <option value="2040">2040</option>
                  <option value="2041">2041</option>
                  <option value="2042">2042</option>
                  <option value="2043">2043</option>
                  <option value="2044">2044</option>
                  <option value="2045">2045</option>
                  <option value="2046">2046</option>
                  <option value="2047">2047</option>
                  <option value="2048">2048</option>
                  <option value="2049">2049</option>
                  <option value="2050">2050</option>
                </select>
              </div>
            </div>
          </div>
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
};
