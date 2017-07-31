import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export default Imatges = new Mongo.Collection('imatges');

Meteor.methods({
    'imatges.insert'(buffer, tipusRef, idRef, ...adjunt) {
        console.log("Meteor method: 'saveImage'.");
        Imatges.insert({
            createdAt: new Date(),
            user: Meteor.userId(),
            data: buffer,
            tipusRef,
            idRef,
            ...adjunt
        });
        //console.log(`Meteor method: RIGHT AFTER Files.insert. \nBuffer: ${buffer}`);
    }
});
