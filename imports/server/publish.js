import {Meteor} from 'meteor/meteor';

// Publish GrupsMusculars
Meteor.publish("userGrupsMusculars", () => {
  return GrupsMusculars.find({
    user: this.userId
  });
});

// Publish Clients
Meteor.publish("userClients", () => {
  return Clients.find({
    user: this.userId
  });
});

// Publish Exercicis
Meteor.publish("userExercicis", () => {
  return Exercicis.find({
    user: this.userId
  });
});

// Publish Rutines
Meteor.publish("userRutines", () => {
  return Rutines.find({
    user: this.userId
  });
});

Meteor.publish("userImatges", () => {
  return Imatges.find({
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
