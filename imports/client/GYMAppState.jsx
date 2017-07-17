import { Meteor } from 'meteor/meteor';
import {
  exetendObservable,
  action,
  useStrict,
  toJS,
  map
} from 'mobx';
import ReactiveDataManager from './ReactiveDataManager';

export default class GYMAppState {
  constructor(){
    useStrict(true);

    extendObservable(this, {
      clientsLoading: false,
      grupsMuscularsLoading: false,
      exercicisLoading: false,
      rutinesLoading: false,

      clients: [],
      grupsMusculars: [],
      exercicis: [],
      rutines: [],

      updateClients: action((newClients) => {
        this.clients = newClients;
      }),
      updateGrupsMusculars: action((newGrupsMusculars) => {
        this.grupsMusculars = newGrupsMusculars;
      }),
      updateExercicis: action((newExercicis) => {
        this.Exercicis = newExercicis;
      }),
      updateRutines: action((newRutines) => {
        this.Rutines = newRutines;
      }),

      setClientsLoading: action((boolean) => {
        this.clientsLoading = boolean;
      }),
      setGrupsMuscularsLoading: action((boolean) => {
        this.grupsMuscularsLoading = boolean;
      }),
      setExercicisLoading: action((boolean) => {
        this.exercicisLoading = boolean;
      }),
      setRutinesLoading: action((boolean) => {
        this.rutinesLoading = boolean;
      }),



    })
  }
}
