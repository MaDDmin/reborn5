import {Meteor} from 'meteor/meteor';

Clients = new Mongo.Collection("clients");

Meteor.methods({

  'clients.insert'(clientNom, clientCognoms, clientMobil, clientEmail, clientAddress, clientDayOfBirth, clientMonthOfBirth, clientYearOfBirth, clientObservacions){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Clients.insert({
      clientNom, clientCognoms, clientMobil, clientEmail, clientAddress, clientDayOfBirth, clientMonthOfBirth, clientYearOfBirth, clientObservacions,
      completed: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },

  'clients.update'(clientNom, clientCognoms, clientMobil, clientEmail, clientAddress, clientDayOfBirth, clientMonthOfBirth, clientYearOfBirth, clientObservacions){
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
