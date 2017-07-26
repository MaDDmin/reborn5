import { Meteor } from 'meteor/meteor';
import fs from 'fs';

WebApp.connectHandlers.use('/file', (req, res) => {
    // Using internal WebApp
    let 
        start = Date.now(),
        file = fs.createWriteStream('/public');

    file.on('error', () => {});
    file.on('finish', () => {
        res.writeHead(200);
        res.end(); // End the response
        
        console.log(`Finished uploading, time taken: ${Date.now() - start}`);
    });
});