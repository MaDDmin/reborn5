import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export default Exercicis = new Mongo.Collection("exercicis");

Exercicis.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
})

export const exerciciSchema = Exercicis.schema = new SimpleSchema({
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
    type: Number,
    optional: false,
    defaultValue: "1"
  },
  exerciciRepeticionsDefault: {
    type: Number,
    optional: false,
    defaultValue: "1"
  },
  exerciciDescansMinuts: {
    type: Number,
    optional: false,
    defaultValue: "0"
  },
  exerciciDescansSegons: {
    type: Number,
    optional: false,
    defaultValue: "0"
  },
  exerciciCarrega: {
    type: Number,
    optional: false,
    defaultValue: "0"
  },
    arrImatges: {
        type: Array,
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
        exerciciDescansMinuts,
        exerciciDescansSegons,
        exerciciCarrega,
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
            exerciciDescansMinuts,
            exerciciDescansSegons,
            exerciciCarrega,
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
        exerciciDescansMinuts,
        exerciciDescansSegons,
        exerciciCarrega,
        arrImatges
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
