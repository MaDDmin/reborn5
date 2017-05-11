import {Meteor} from 'meteor/meteor';

Clients = new Mongo.Collection("clients");

Meteor.methods({
  'clients.insert'(text){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Clients.insert({
      text,
      completed: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },

  'clients.update'(bar){
    if (Meteor.userId() !== client.user){
      throw new Meteor.Error('not-authorized');
    }
    Clients.update(client._id, {
      $set: {
        completed: !client.completed
      }
    });
  },

  'clients.delete'(client){
    if (Meteor.userId() !== client.user){
      throw new Meteor.Error('not-authorized');
    }
    Clients.remove(client._id);
  }
});

// Meteor.publish("allResolutions", function(){
//   return Resolutions.find();
// });
