import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default Exercicis = new Mongo.Collection("exercicis");

Exercicis.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
})

Exercicis.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: false
  },
  exerciciNom: {
    type: String,
    optional: false
  },
  exerciciGrupMuscular: {
    type: String,
    optional: false
  },
  exerciciDescripcio: {
    type: String,
    optional: true
  },
  exerciciSeriesDefault: {
    type: String,
    optional: false,
    defaultValue: "1"
  },
  exerciciRepeticionsDefault: {
    type: String,
    optional: false,
    defaultValue: "1"
  },
  exerciciDescansDefault: {
    type: String,
    optional: false,
    defaultValue: "0"
  },
  exerciciMinutsDefault: {
    type: String,
    optional: false,
    defaultValue: "1"
  },
    arrImatges: {
        type: [Object],
        optional: true
    },
    user: {
        type: String,
        optional: false
    }
})

Meteor.methods({
    'exercicis.insert'(
        exerciciNom,
        exerciciGrupMuscular,
        exerciciDescripcio,
        exerciciSeriesDefault,
        exerciciRepeticionsDefault,
        exerciciDescansDefault,
        exerciciMinutsDefault,
        arrImatges
    ) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Exercicis.insert({
            exerciciNom,
            exerciciGrupMuscular,
            exerciciDescripcio,
            exerciciSeriesDefault,
            exerciciRepeticionsDefault,
            exerciciDescansDefault,
            exerciciMinutsDefault,
            createdAt: new Date(),
            user: Meteor.userId(),
            arrImatges
        });
    },

    'exercicis.update'(
        exerciciNom,
        exerciciGrupMuscular,
        exerciciDescripcio,
        exerciciSeriesDefault,
        exerciciRepeticionsDefault,
        exerciciDescansDefault,
        exerciciMinutsDefault
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }
        Exercicis.update(exercici._id, {
            $set: {
                //completed: !exercici.completed
            }
        });
    },

    'exercicis.delete'(exercici) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }
        Exercicis.remove(exercici._id);
    }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
