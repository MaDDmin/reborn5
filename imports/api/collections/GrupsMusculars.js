import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export default GrupsMusculars = new Mongo.Collection("grups_musculars");

GrupsMusculars.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

GrupsMusculars.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: false
  },
  grupMuscularNom: {
    type: String,
    optional: false
  },
  grupMuscularDescripcio: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: false
  },
  arrImatges: {
      type: Array,
      optional: true
  },
  'arrImatges.$': {
      type: Object
  },
  user: {
    type: String,
    optional: false
  }
});

// GrupsMusculars.attachSchema(GrupsMusculars.schema);

Meteor.methods({
    'grups_musculars.insert'(
        grupMuscularNom,
        grupMuscularDescripcio,
        arrImatges
    ) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        GrupsMusculars.insert({
            grupMuscularNom, grupMuscularDescripcio,
            createdAt: new Date(),
            user: Meteor.userId(),
            arrImatges
        }, {
                validate: false
        }, (error, result) => {
                if (error) {
                    alert(`ERROR: ${error}`);
                }
            }
        );
    },

    'grups_musculars.nom.update'(grup_muscular, grupMuscularNom) {
        if (Meteor.userId() !== grup_muscular.user) {
            throw new Meteor.Error('not-authorized');
        }

        GrupsMusculars.update(grup_muscular._id, {
            $set: {
                grupMuscularNom
            }
        });
    },

    'grups_musculars.descrip.update'(grup_muscular, grupMuscularDescripcio) {
        if (Meteor.userId() !== grup_muscular.user) {
            throw new Meteor.Error('not-authorized');
        }

        GrupsMusculars.update(grup_muscular._id, {
            $set: {
                grupMuscularDescripcio
            }
        });
    },

    'grups_musculars.imatge.update'(
        grup_muscular,
        clau,
        imgSrc,
        imgTitle,
        editDate
    ) {
        if (Meteor.userId() !== grup_muscular.user) {
            throw new Meteor.Error('not-authorized');
        }
        console.log("Interior del Mètode de Meteor.");

        let
            arrImatges = grup_muscular.arrImatges,
            arrClau = arrImatges[clau],
            imgArx = arrClau.imgArx;

        console.dir("arrImatges: ", arrImatges);
        console.dir("arrClau: ", arrClau);
        console.dir("imgArx: ", imgArx);

        arrImatges[clau].imgArx.buffer = imgSrc;
        arrImatges[clau].imgArx.name = imgTitle;
        arrImatges[clau].imgArx.editDate = editDate;

        console.dir("arrImatges: ", arrImatges);

        GrupsMusculars.update({
            _id: grup_muscular._id
        }, { $set: {
            arrImatges
        }});
    },

    'grups_musculars.imatgeText.update'(
        grup_muscular,
        clau,
        nouText
    ) {
        if (Meteor.userId() !== grup_muscular.user) {
            throw new Meteor.Error('not-authorized');
        }

        let
            arrImatges = grup_muscular.arrImatges,
            arrClau = arrImatges[clau];

        arrImatges[clau].imgText = nouText;
        arrImatges[clau].editDate = new Date();

        GrupsMusculars.update({
            _id: grup_muscular._id
        }, { $set: {
            arrImatges
        }});
    },

    'grups_musculars.imatge.delete'(
        grup_muscular,
        clau
    ) {
        if (Meteor.userId() !== grup_muscular.user) {
            throw new Meteor.Error('not-authorized');
        }

        let
            arrImatges = grup_muscular.arrImatges;

        grup_muscular.arrImatges.splice(clau, 1);

        arrImatges.editDate = new Date();

        GrupsMusculars.update({
            _id: grup_muscular._id
        }, { $set: {
            arrImatges
        }});
    },

    'grups_musculars.imatges.afegeix'(
        grup_muscular,
        arrNovesImatges
    ) {
        if (Meteor.userId() !== grup_muscular.user) {
            throw new Meteor.Error('not-authorized');
        }

        let
            arrImatges = grup_muscular.arrImatges;

        arrNovesImatges.map(
            (v,i,a) => arrImatges.push(v)
        );

        grup_muscular.arrImatges.editDate = new Date();

        GrupsMusculars.update({
            _id: grup_muscular._id
        }, { $set: {
            arrImatges
        }});
    },

    'grups_musculars.delete'(grup_muscular) {
        if (Meteor.userId() !== grup_muscular.user) {
            throw new Meteor.Error('not-authorized');
        }

        GrupsMusculars.remove(grup_muscular._id);
    }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
