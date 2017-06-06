import {Meteor} from 'meteor/meteor';

Exercicis = new Mongo.Collection("exercicis");

Meteor.methods({
  'exercicis.insert'(exerciciNom, exerciciGrupMuscular, exerciciDescripcio){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Exercicis.insert({
      exerciciNom, exerciciGrupMuscular, exerciciDescripcio,
      completed: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },

  'exercicis.update'(exerciciNom, exerciciGrupMuscular, exerciciDescripcio){
    if (Meteor.userId() !== exercici.user){
      throw new Meteor.Error('not-authorized');
    }
    Exercicis.update(exercici._id, {
      $set: {
        completed: !exercici.completed
      }
    });
  },

  'exercicis.delete'(exercici){
    if (Meteor.userId() !== exercici.user){
      throw new Meteor.Error('not-authorized');
    }
    Exercicis.remove(exercici._id);
  }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
