import {Meteor} from 'meteor/meteor';

// Publish Resolutions
Meteor.publish("allResolutions", function(){
  return Resolutions.find();
});

Meteor.publish("userResolutions", function(){
  return Resolutions.find({
    user: this.userId
  });
});

//===============
// Publish Bars
Meteor.publish("allBars", function(){
  return Bars.find();
});

Meteor.publish("userBars", function(){
  return Bars.find({
    user: this.userId
  });
});
