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

  'resolutions.update'(resolution){
    if (Meteor.userId() !== resolution.user){
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.update(resolution._id, {
      $set: {
        completed: !resolution.completed
      }
    });
  },

  'resolutions.delete'(resolution){
    if (Meteor.userId() !== resolution.user){
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.remove(resolution._id);
  }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
