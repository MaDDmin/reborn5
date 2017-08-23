import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
      type: [Object],
      optional: true
  },
  user: {
    type: String,
    optional: false
  }
});

Meteor.methods({
    'grups_musculars.insert'(
        grupMuscularNom,
        grupMuscularDescripcio,
        arrImatges) {

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        GrupsMusculars.insert( {
          grupMuscularNom, grupMuscularDescripcio,
          createdAt: new Date(),
          user: Meteor.userId(),
          arrImatges
        });
    },

  'grups_musculars.update'(grupMuscularNom, grupMuscularDescripcio){
    if (Meteor.userId() !== grup_muscular.user){
      throw new Meteor.Error('not-authorized');
    }
    GrupsMusculars.update(grup_muscular._id, {
      $set: {
        //completed: !grup_muscular.completed
      }
    });
  },

  'grups_musculars.delete'(grup_muscular){
    if (Meteor.userId() !== grup_muscular.user){
      throw new Meteor.Error('not-authorized');
    }
    GrupsMusculars.remove(grup_muscular._id);
  }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
