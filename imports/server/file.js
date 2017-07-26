import { Meteor } from 'meteor/meteor';

WebApp.connectHandlers.use('/file', (req, res) => {
    // We only care about PUT methods
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    // I am running meteor as a backend, see https://iamlawrence.me/agnostic-meteor
    // Therefore we need to enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    console.log("Zona 0");


    // When sending a CORS request, a 'preflight' request is sent.
    // This will determine what methods are allowed on this endpoint.
    // Just respond happily with a 200 response
    // See more here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests
    if (req.method === "OPTIONS") {

        console.log("Zona 1");

        res.writeHead(200);
        res.end();
        return;
    } else if (req.method === "PUT") {
        // In this example, I only care about images...
        if (!req.headers['content-type'].startsWith('image')) {
            res.writeHead(400);
            
            console.log("L'encapçalament 'Content-Type' no comença per 'Image'");
            
            res.end();
        }

        let 
            getFile = Meteor.wrapAsync(done => {
                let chunks = [];

                req.on('readable', () => {
                    chunks.push(req.read());
                    
                    console.log("Zona 3");

                });
                req.on('end', () => {
                    
                    console.log("Zona 2");
                    
                    done(undefined, Buffer.concat(chunks));


                });
            });
    }
});