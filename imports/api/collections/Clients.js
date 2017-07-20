import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default Clients = new Mongo.Collection("clients");

Clients.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Clients.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: false
  },
  clientNom: {
    type: String,
    optional: false
  },
  clientCognoms: {
    type: String,
    optional: false
  },
  clientMobil: {
    type: String,
    optional: true
  },
  clientEmail: {
    type: String,
    optional: true
  },
  clientAddress: {
    type: String,
    optional: true
  },
  clientDayOfBirth: {
    type: Number,
    optional: true
  },
  clientMonthOfBirth: {
    type: String,
    optional: true
  },
  clientYearOfBirth: {
    type: Number,
    optional: true
  },
  clientObservacions: {
    type: String,
    optional: true
  },
  completed: {
    type: Boolean,
    optional: false
  },
  user: {
    type: String,
    optional: false
  }
});

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
