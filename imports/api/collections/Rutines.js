import {Meteor} from 'meteor/meteor';

Rutines = new Mongo.Collection("rutines");

Meteor.methods({
  'rutines.insert'(rutinaNom, rutinaDescripcio){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Rutines.insert({
      rutinaNom, rutinaDescripcio,
      completed: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },

  'rutines.update'(rutinaNom, rutinaDescripcio){
    if (Meteor.userId() !== rutina.user){
      throw new Meteor.Error('not-authorized');
    }
    Rutines.update(rutina._id, {
      $set: {
        completed: !rutina.completed
      }
    });
  },

  'rutines.delete'(rutina){
    if (Meteor.userId() !== rutina.user){
      throw new Meteor.Error('not-authorized');
    }
    Rutines.remove(rutina._id);
  }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
