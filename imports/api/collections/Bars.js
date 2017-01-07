import {Meteor} from 'meteor/meteor';

Bars = new Mongo.Collection("bars");

Meteor.methods({
  'bars.insert'(text){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Bars.insert({
      text,
      completed: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },

  'bars.update'(bar){
    if (Meteor.userId() !== bar.user){
      throw new Meteor.Error('not-authorized');
    }
    Bars.update(bar._id, {
      $set: {
        completed: !bar.completed
      }
    });
  },

  'bars.delete'(bar){
    if (Meteor.userId() !== bar.user){
      throw new Meteor.Error('not-authorized');
    }
    Bars.remove(bar._id);
  }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
