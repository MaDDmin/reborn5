import {Meteor} from 'meteor/meteor';

Resolutions = new Mongo.Collection("resolutions");

Meteor.methods({
  'resolutions.insert'(text){
    Resolutions.insert({
      text,
      completed: false,
      createdAt: new Date()
    })
  }
});
