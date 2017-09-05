import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { exerciciSchema } from './Exercicis.js';

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
    rutinaTitol: {
        type: String,
        optional: false
    },
    rutinaClient: {
        type: Object,
        optional: false
    },
    rutinaGrupMuscular: {
        type: Object,
        optional: true
    },
    rutinaDataInici: {
        type: Date,
        optional: true
    },
    rutinaDataFi: {
        type: Date,
        optional: true
    },
    rutinaDescripcio: {
        type: String,
        optional: true
    },
    completed: {
        type: Boolean,
        optional: true
    },
    user: {
        type: String,
        optional: false
    },
    setmanes: {
        type: Array,
        optional: false
    },
    'setmanes.$': {
        type: new SimpleSchema({
            indexSetmana: {
                type: SimpleSchema.Integer,
                optional: false
            },
            sessions: {
                type: Array,
                optional: false
            },
            'sessions.$': {
                type: new SimpleSchema({
                    indexSessio: {
                        type: SimpleSchema.Integer,
                        optional: false
                    },
                    data: {
                        type: Date,
                        optional: true
                    },
                    sessioDescripcio: {
                        type: String,
                        optional: true
                    },
                    parts: {
                        type: Array,
                        optional: false
                    },
                    'parts.$': {
                        type: new SimpleSchema({
                            partNom: {
                                type: String,
                                optional: false
                            },
                            partDescripcio: {
                                type: String,
                                optional: true
                            },
                            exercicis: {
                                type: Array,
                                optional: false
                            },
                            'exercicis.$': {
                                type: new SimpleSchema({
                                    indexExercici: {
                                        type: SimpleSchema.Integer,
                                        optional: false
                                    },
                                    exerciciUtil: {
                                        type: exerciciSchema,
                                        optional: false
                                    }
                                }).extend(exerciciSchema)
                            }
                        })
                    }
                })
            }
        })
    }
});

Meteor.methods({
  'rutines.insert'(
      rutinaNom,
      rutinaClient,
      rutinaGrupMuscular,
      rutinaDataInici,
      rutinaDataFi,
      rutinaDescripcio
  ) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Rutines.insert({
            rutinaNom,
            rutinaClient,
            rutinaGrupMuscular,
            rutinaDataInici,
            rutinaDataFi,
            rutinaDescripcio,
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
