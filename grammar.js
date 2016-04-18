var messages= {
    WELCOME_MSG: "Hi there, I am your Sandals Intelligent Concierge assistant but you can call me SIC.",
    BROWSE_TOUR_INTRO: "Let's see. It seems that we have the following tours available: ",
    HOTEL_ID:"Based on your location, it seems you are staying at the Emerald Bay resort, is that correct? Can I have your room number?",
    GUEST_ID: "Great e-meeting you Mr. Virtue, How can I help you today?",
    BOOK_TOUR:"Let me check...It seems that is available. Should I book it?",
    TOUR_BOOKED: "Done! You are all set for the {1} tour tomorrow. Send me a message when you get back to learn about your experience",
    USER_NAME: "Jason Virtue",
    WELCOME_BACK_MSG: "Hi there {1}. How was the {2} tour. Was it awesome?",
    PROMO_MSG: "Well, for being a great guest and an artificial intelligence fan we would like to offer you 50% discount in your next tour. Just use the promo code MSFTROCKS"
};

var tours={
    EXUMACAYS: "Is awesome! Imagine an action packed excursion aboard a 35 foot custom designed PowerCat while you snorkel, beach comb and experience all the beauty of the Exumas in one tour.",
    ECOKAYAK: "Is a kayak expedition in which adventurers explore the marine ecology surrounding Little Water Cay in the Princess Alexandra Nature Reserve. While paddling beside the extraordinary red and black mangroves",
    HONEYMOONERS: "Be ready for an adventure! Your captain will take you on a boating journey from Georgetown across to Stocking Island, which creates the Natural Elizabeth Harbor. He shall set up beach chairs, an umbrella and your picnic supplies before leaving you to your own devices.",
    BONEFISHING:""
};

var tourlist=["Exuma Cays Ocean Safari", "Honeymooners Island Picnic", "Eco Kayak Tour", "Private Bahamas Bone Fishing"];

module.exports.messages= messages;
module.exports.tours= tours;
module.exports.tourlist= tourlist;
