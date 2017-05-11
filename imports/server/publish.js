import {Meteor} from 'meteor/meteor';

// Publish GrupsMusculars
Meteor.publish("userGrupsMusculars", function(){
  return GrupsMusculars.find({
    user: this.userId
  });
});

// Publish Clients
Meteor.publish("userClients", function(){
  return Clients.find({
    user: this.userId
  });
});

// //===============
// // Publish Bars
// Meteor.publish("allBars", function(){
//   return Bars.find();
// });
//
// Meteor.publish("userBars", function(){
//   return Bars.find({
//     user: this.userId
//   });
// });
