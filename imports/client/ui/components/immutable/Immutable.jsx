import React, {Component} from 'react';
import Immutable, {List} from 'immutable';

export default class Immut extends Component {
  render(){
    let
      list1 = List.of(1, 2),
      list2 = list1.push(3, 4, 5),
      list3 = list2.unshift(0),
      list4 = list1.concat(list2, list3);

    let result = `list1: ${list1}\nlist2: ${list2}\nlist3: ${list3}\nlist4: ${list4}`;

    return (
      <div>
        <h1>Ací, la tornada d'IMMUTABLE.</h1>
        <pre>{result}</pre>
      </div>
    );
  }
}
