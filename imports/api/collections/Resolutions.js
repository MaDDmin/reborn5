import {Meteor} from 'meteor/meteor';

Resolutions = new Mongo.Collection("resolutions");

Meteor.methods({
  'resolutions.insert'(text){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.insert({
      text,
      completed: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },

  'resolutions.update'(id, status){
    Resolutions.update(id, {
      $set: {
        completed: !status
      }
    });
  },

  'resolutions.delete'(id){
    Resolutions.remove(id);
  }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
