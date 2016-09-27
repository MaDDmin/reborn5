import {Meteor} from 'meteor/meteor';

Meteor.publish("allResolutions", function(){
  return Resolutions.find();
});
