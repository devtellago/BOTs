/**
 * Created by Jesus on 4/14/2016.
 */
var builder= require('botbuilder');
var restify= require('restify');
var botgrammar= require('./grammar.js');
var modelUrl= process.env.model || "https://api.projectoxford.ai/luis/v1/application?id=487a86b7-941c-428b-9986-d644558e45ae&subscription-key=69861c002a634b548b882a160e07efff?q=";
//load LUIS model
var dialog = new builder.LuisDialog(modelUrl);
// Create bot and add dialogs
var sicbot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });

/*sicbot.add('/', function(session){
 session.send("hello");
 });*/

sicbot.add('/', dialog);
//process LUIS intents

dialog.on('Intro', function (session, args, next) {



    var botid=builder.EntityRecognizer.findEntity(args.entities, 'SICBOT');
    if(botid != null) {
        session.dialogData.username= null;
    }

    if(session.dialogData.username == null) {
        var response = botgrammar.messages.WELCOME_MSG + " . " + botgrammar.messages.HOTEL_ID;
        session.send(response);
    }
    else
    {
        var response= botgrammar.messages.WELCOME_BACK_MSG.replace('{1}', session.dialogData.username);
        response= response.replace('{2}', session.dialogData.tour);
        session.send(response);
    }

})

dialog.on('IdUser', function(session, args, next){
    //get resolved entities
    var hotel= builder.EntityRecognizer.findEntity(args.entities, 'Hotel');
    var room= builder.EntityRecognizer.findEntity(args.entities, 'Hotel::Room');
    //store entities in the session
    session.userData.name= hotel + "," + room;
    session.dialogData.hotel=hotel;
    session.dialogData.room= room;
    session.dialogData.username= botgrammar.messages.USER_NAME;
    //send response
    session.send(botgrammar.messages.GUEST_ID);
})

dialog.on('BrowseTours', function(session, args, next){
    var response= botgrammar.messages.BROWSE_TOUR_INTRO;

    botgrammar.tourlist.forEach(function(value) {
        response+= ', ' + value;
    });
    session.send(response);

})

dialog.on('GetTourDetails', function(session, args, next) {
    var tour = builder.EntityRecognizer.findEntity(args.entities, 'Tour');
    var response = "";

    if (tour.entity.toString().toLowerCase().indexOf("exuma") > -1) {
        response = botgrammar.tours.EXUMACAYS;
        session.dialogData.tour = "EXUMA CAYS";
    }
    if (tour.entity.toString().toLowerCase().indexOf("eco") > -1) {

        session.dialogData.tour = "ECO KAYAK";
        response = botgrammar.tours.ECOKAYAK;
    }
    if (tour.entity.toString().toLowerCase().indexOf("honey") > -1) {
        session.dialogData.tour = "HONEYMOONERS";

        response = botgrammar.tours.HONEYMOONERS;
    }

    session.send(response);
})

dialog.on("BookTour",
    function(session, args, next){
        var tour= session.dialogData.tour;
        session.send(botgrammar.messages.BOOK_TOUR);
    }
)


dialog.on('CompleteBooking', function(session, results){
    var tour= session.dialogData.tour;
    var response= botgrammar.messages.TOUR_BOOKED.replace('{1}', tour);
    session.send(response);
})

dialog.on('GoodTour', function(session, args, next){
    session.send(botgrammar.messages.PROMO_MSG);
})

dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. "));

// Setup Restify Server
var server = restify.createServer();
server.port= 3978;
server.name= process.env.name;



server.post('/api/messages', sicbot.verifyBotFramework(), sicbot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
