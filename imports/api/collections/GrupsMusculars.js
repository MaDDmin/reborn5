import {Meteor} from 'meteor/meteor';

GrupsMusculars = new Mongo.Collection("grups_musculars");

Meteor.methods({
  'grups_musculars.insert'(grupMuscularNom, grupMuscularDescripcio){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    GrupsMusculars.insert({
      grupMuscularNom, grupMuscularDescripcio,
      completed: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },

  'grups_musculars.update'(grupMuscularNom, grupMuscularDescripcio){
    if (Meteor.userId() !== grup_muscular.user){
      throw new Meteor.Error('not-authorized');
    }
    GrupsMusculars.update(grup_muscular._id, {
      $set: {
        completed: !grup_muscular.completed
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
