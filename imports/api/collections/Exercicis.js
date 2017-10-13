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

    'exercicis.nom.update'(
        exercici,
        exerciciNom
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        Exercicis.update(exercici._id, {
            $set: {
                exerciciNom
            }
        });
    },

    'exercicis.imatge.update'(
        exercici,
        clau,
        imgSrc,
        imgTitle,
        editDate
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }
        console.log("Interior del Mètode de Meteor.");

        let
            arrImatges = exercici.arrImatges,
            arrClau = arrImatges[clau],
            imgArx = arrClau.imgArx;

        console.dir("arrImatges: ", arrImatges);
        console.dir("arrClau: ", arrClau);
        console.dir("imgArx: ", imgArx);

        arrImatges[clau].imgArx.buffer = imgSrc;
        arrImatges[clau].imgArx.name = imgTitle;
        arrImatges[clau].imgArx.editDate = editDate;

        console.dir("arrImatges: ", arrImatges);

        Exercicis.update({
            _id: exercici._id
        }, { $set: {
            arrImatges
        }});
    },

    'exercicis.imatgeText.update'(
        exercici,
        clau,
        nouText
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        let
            arrImatges = exercici.arrImatges,
            arrClau = arrImatges[clau];

        arrImatges[clau].imgText = nouText;
        arrImatges[clau].editDate = new Date();

        Exercicis.update({
            _id: exercici._id
        }, { $set: {
            arrImatges
        }});
    },

    'exercicis.descrip.update'(
        exercici,
        exerciciDescripcio
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        Exercicis.update(exercici._id, {
            $set: {
                exerciciDescripcio
            }
        });
    },

    'exercicis.series.update'(
        exercici,
        exerciciSeriesDefault
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        Exercicis.update(exercici._id, {
            $set: {
                exerciciSeriesDefault
            }
        });
    },

    'exercicis.repeticions.update'(
        exercici,
        exerciciRepeticionsDefault
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        Exercicis.update(exercici._id, {
            $set: {
                exerciciRepeticionsDefault
            }
        });
    },

    'exercicis.minuts.update'(
        exercici,
        exerciciDescansMinuts
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        Exercicis.update(exercici._id, {
            $set: {
                exerciciDescansMinuts
            }
        });
    },

    'exercicis.segons.update'(
        exercici,
        exerciciDescansSegons
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        Exercicis.update(exercici._id, {
            $set: {
                exerciciDescansSegons
            }
        });
    },

    'exercicis.carrega.update'(
        exercici,
        exerciciCarrega
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        Exercicis.update(exercici._id, {
            $set: {
                exerciciCarrega
            }
        });
    },

    'exercicis.imatge.delete'(
        exercici,
        clau
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        let
            arrImatges = exercici.arrImatges;

        exercici.arrImatges.splice(clau, 1);

        arrImatges.editDate = new Date();

        Exercicis.update({
            _id: exercici._id
        }, { $set: {
            arrImatges
        }});
    },

    'exercicis.imatges.afegeix'(
        exercici,
        arrNovesImatges
    ) {
        if (Meteor.userId() !== exercici.user) {
            throw new Meteor.Error('not-authorized');
        }

        let
            arrImatges = exercici.arrImatges;

        arrNovesImatges.map(
            (v,i,a) => arrImatges.push(v)
        );

        exercici.arrImatges.editDate = new Date();

        Exercicis.update({
            _id: exercici._id
        }, { $set: {
            arrImatges
        }});
    },


    // 'exercicis.update'(
    //     exerciciNom,
    //     exerciciGrupMuscular,
    //     exerciciDescripcio,
    //     exerciciSeriesDefault,
    //     exerciciRepeticionsDefault,
    //     exerciciDescansMinuts,
    //     exerciciDescansSegons,
    //     exerciciCarrega,
    //     arrImatges
    // ) {
    //     if (Meteor.userId() !== exercici.user) {
    //         throw new Meteor.Error('not-authorized');
    //     }
    //     Exercicis.update(exercici._id, {
    //         $set: {
    //             //completed: !exercici.completed
    //         }
    //     });
    // },

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
