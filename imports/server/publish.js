import {Meteor} from 'meteor/meteor';

Meteor.publish("allResolutions", function(){
  return Resolutions.find();
});

Meteor.publish("userResolutions", function(){
  return Resolutions.find({
    user: this.userId
  });
});
