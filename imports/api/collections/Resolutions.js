import {Meteor} from 'meteor/meteor';

Resolutions = new Mongo.Collection("resolutions");

Meteor.methods({
  'resolutions.insert'(text){
    Resolutions.insert({
      text,
      completed: false,
      createdAt: new Date()
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
