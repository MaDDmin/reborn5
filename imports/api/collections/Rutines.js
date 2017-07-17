import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default Rutines = new Mongo.Collection("rutines");

Rutines.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Rutines.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: false
  },
  rutinaNom: {
    type: String,
    optional: false
  },
  rutinaClient: {
    type: String,
    optional: false
  },
  rutinaGrupMuscular: {
    type: String,
    optional: true
  },
  rutinaDiaInici: {
    type: String,
    optional: true
  },
  rutinaMesInici: {
    type: String,
    optional: true
  },
  rutinaAnyInici: {
    type: Number,
    optional: true
  },
  rutinaDiaFi: {
    type: String,
    optional: true
  },
  rutinaMesFi: {
    type: Number,
    optional: true
  },
  rutinaAnyFi: {
    type: String,
    optional: true
  },
  rutinaDescripcio: {
    type: String,
    optional: true
  },
  completed: {
    type: Boolean,
    optional: false
  },
  user: {
    type: String,
    optional: false
  }
});

Meteor.methods({
  'rutines.insert'(rutinaNom, rutinaClient, rutinaGrupMuscular, rutinaDiaInici, rutinaMesInici, rutinaAnyInici, rutinaDiaFi, rutinaMesFi, rutinaAnyFi, rutinaDescripcio){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Rutines.insert({rutinaNom, rutinaClient, rutinaGrupMuscular, rutinaDiaInici, rutinaMesInici, rutinaAnyInici, rutinaDiaFi, rutinaMesFi, rutinaAnyFi, rutinaDescripcio,
      completed: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },

  'rutines.update'(rutinaNom, rutinaClient, rutinaGrupMuscular, rutinaDiaInici, rutinaMesInici, rutinaAnyInici, rutinaDiaFi, rutinaMesFi, rutinaAnyFi, rutinaDescripcio){
    if (Meteor.userId() !== rutina.user){
      throw new Meteor.Error('not-authorized');
    }
    Rutines.update(rutina._id, {
      $set: {
        completed: !rutina.completed
      }
    });
  },

  'rutines.delete'(rutina){
    if (Meteor.userId() !== rutina.user){
      throw new Meteor.Error('not-authorized');
    }
    Rutines.remove(rutina._id);
  }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
