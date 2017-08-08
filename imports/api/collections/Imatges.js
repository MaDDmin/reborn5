import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export default Imatges = new Mongo.Collection('imatges');

Meteor.methods({
    'imatges.insert'(buffer, tipusRef, idRef, adjunt) {
        console.log("Meteor method: 'saveImage'.");
        return Imatges.insert({
            createdAt: new Date(),
            user: Meteor.userId(),
            data: buffer,
            tipusRef,
            idRef,
            adjunt
        });
        //console.log(`Meteor method: RIGHT AFTER Files.insert. \nBuffer: ${buffer}`);
    },

    'imatges.update'(imatge, tipusRef, idRef, adjunt) {
        if (Meteor.userId() !== imatge.user) {
            throw new Meteor.Error('not-authorized');
        }

        Imatges.update(imatge._id, {
            $set: {
                tipusRef,
                idRef,
                adjunt
            }
        });
    },

    'imatges.delete'(imatge) {
        if (Meteor.userId() !== imatge.user) {
            throw new Meteor.Error('not-authorized');
        }
        Imatges.remove(imatge._id);
    }
});
