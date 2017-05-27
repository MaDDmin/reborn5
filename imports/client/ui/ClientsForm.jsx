import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

export default class ClientsForm extends Component{
  addClient(event){
    event.preventDefault();
    let clientNom = this.refs.clientNom.value.trim(),
      clientCognoms = this.refs.clientCognoms.value.trim(),
      clientMobil = this.refs.clientMobil.value.trim(),
      clientEmail = this.refs.clientEmail.value.trim(),
      clientAddress = this.refs.clientAddress.value.trim();
      clientDayOfBirth = this.refs.clientDayOfBirth.value.trim();
      clientMonthOfBirth = this.refs.clientMonthOfBirth.value.trim();
      clientYearOfBirth = this.refs.clientYearOfBirth.value.trim();
      clientObservacions = this.refs.clientObservacions.value.trim();


    if (clientNom){
      Meteor.call('clients.insert', clientNom, clientCognoms, clientMobil, clientEmail, clientAddress, clientDayOfBirth, clientMonthOfBirth, clientYearOfBirth, clientObservacions, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'escriure una resolució.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.client.value = "";
        }
      });
    }
  }
  render(){
    return (
      <div id="divClientsForm">
        <h2>Nou Client</h2>
        <fieldset>
          <legend>Nou client </legend>

          <form className="new-client" onSubmit={this.addClient.bind(this)}>

            <input type="file" ref="clientImatge" />
            <div id="divInNomClient">
              <input id="clientNom" className="inNomClient" type="text" ref="clientNom" placeholder="Nom" />
              <input id="clientCognoms" className="inNomClient" type="text" ref="clientCognoms" placeholder="Cognoms" />
              {/*<input id="clientAlias" className="inNomClient" type="text" ref="clientAlias" placeholder="Alias" />*/}
            </div>

            <div id="divInGender">
              <div id="divInGenderFemale" className="divGenderOption">
                <input type="radio" name="clientSexe" ref="clientSexe" value="dona" />
                <span className="spanGender"> Dona</span>
              </div>
              <div id="divInGenderMale" className="divGenderOption">
                <input type="radio" name="clientSexe" ref="clientSexe" value="home" />
                <span className="spanGender"> Home</span>
              </div>
              {/*<div id="divInGenderOther" className="divGenderOption">
                <input type="radio" name="clientSexe" ref="clientSexe" value="altre" />
                <span className="spanGender"> Altre</span>
              </div>*/}
            </div>

            <div id="divClientContact">
              <input id="clientEmail" type="email" ref="clientEmail" placeholder="eMail" />
              <input id="clientMobil" type="text" ref="clientMobil" placeholder="Mòbil" />
              <textarea id="clientAddress" ref="clientAddress" placeholder="Adreça domiciliar" />
            </div>

            <div id="divDateOfBirth">
              <div className="control-group">
                <label htmlFor="dob-day" className="control-label">Data de Naixement: </label>
                <div className="controls">
                  <select name="clientDayOfBirth" id="clientDayOfBirth" ref="clientDayOfBirth">
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
                  <select name="clientMonthOfBirth" id="clientMonthOfBirth" ref="clientMonthOfBirth">
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
                  <select name="clientYearOfBirth" id="clientYearOfBirth" ref="clientYearOfBirth">
                    <option value="">Any</option>
                    <option value="">----</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                    <option value="1969">1969</option>
                    <option value="1968">1968</option>
                    <option value="1967">1967</option>
                    <option value="1966">1966</option>
                    <option value="1965">1965</option>
                    <option value="1964">1964</option>
                    <option value="1963">1963</option>
                    <option value="1962">1962</option>
                    <option value="1961">1961</option>
                    <option value="1960">1960</option>
                    <option value="1959">1959</option>
                    <option value="1958">1958</option>
                    <option value="1957">1957</option>
                    <option value="1956">1956</option>
                    <option value="1955">1955</option>
                    <option value="1954">1954</option>
                    <option value="1953">1953</option>
                    <option value="1952">1952</option>
                    <option value="1951">1951</option>
                    <option value="1950">1950</option>
                    <option value="1949">1949</option>
                    <option value="1948">1948</option>
                    <option value="1947">1947</option>
                    <option value="1946">1946</option>
                    <option value="1945">1945</option>
                    <option value="1944">1944</option>
                    <option value="1943">1943</option>
                    <option value="1942">1942</option>
                    <option value="1941">1941</option>
                    <option value="1940">1940</option>
                    <option value="1939">1939</option>
                    <option value="1938">1938</option>
                    <option value="1937">1937</option>
                    <option value="1936">1936</option>
                    <option value="1935">1935</option>
                    <option value="1934">1934</option>
                    <option value="1933">1933</option>
                    <option value="1932">1932</option>
                    <option value="1931">1931</option>
                    <option value="1930">1930</option>
                    <option value="1929">1929</option>
                    <option value="1928">1928</option>
                    <option value="1927">1927</option>
                    <option value="1926">1926</option>
                    <option value="1925">1925</option>
                    <option value="1924">1924</option>
                    <option value="1923">1923</option>
                    <option value="1922">1922</option>
                    <option value="1921">1921</option>
                    <option value="1920">1920</option>
                    <option value="1919">1919</option>
                    <option value="1918">1918</option>
                    <option value="1917">1917</option>
                    <option value="1916">1916</option>
                    <option value="1915">1915</option>
                    <option value="1914">1914</option>
                    <option value="1913">1913</option>
                    <option value="1912">1912</option>
                    <option value="1911">1911</option>
                    <option value="1910">1910</option>
                    <option value="1909">1909</option>
                    <option value="1908">1908</option>
                    <option value="1907">1907</option>
                    <option value="1906">1906</option>
                    <option value="1905">1905</option>
                    <option value="1904">1904</option>
                    <option value="1903">1903</option>
                    <option value="1901">1901</option>
                    <option value="1900">1900</option>
                  </select>
                </div>
              </div>
            </div>
            {/*<input id="clientDayOfBirth" type="text" ref="clientDayOfBirth" placeholder="Dia de naixement" />
            <input id="clientMonthOfBirth" type="text" ref="clientMonthOfBirth" placeholder="Mes de naixement" />
            <input id="clientYearOfBirth" type="text" ref="clientYearOfBirth" placeholder="Any de naixement" />
            */}

            {/*<input
              type="text"
              ref="clientTags"
              placeholder="Etiquetes (separades per comes)"
            />*/}
            <textarea id="clientObservacions" ref="clientObservacions" placeholder="Observacions" />
            <input id="clientSubmit" type="submit" ref="clientSubmit" value="Introduir" />
          </form>
        </fieldset>
      </div>
    );
  }
};
