Makermix Week - Ronins Pairing App (backend)
============================================

State
-----

List of People

Previous Pairs

User

Blacklist

Actions
-------

Be able to choose a pair from a list

Pair with everyone equally

Randomly assign a pair

Not be assigned a pair on my blacklist


MVP
---

MVp List of Makers

MVp Be able to add a Maker

MVp Be able to identify yourself as the Maker wanting to pair

MVp Be able to see Makers I have not paired with

MVP1

MVp Be able to get a random pair

MVP2

MVp Be able to add Makers to a blacklist

MVp Get a random pair not on a blacklist

MVP3

MVp Be able deal with current pairings in real time

MVP4


API Expectations
----------------

GET /makers => { makers: [ { id: 1, name: "Joe" }, { _id: 2, name: "Mark" } ] }

POST /makers (name="Joe") => { id: 1, name: "Joe" }


GET /makers/session/:name => { id: 1, name: "Joe" }

POST /pairs (pairPartner1 = 1, pairPartner2 = 2) => {pairPartner1: {id: 1, name: "Joe"}, pairPartner2: { id: 2, name: "Mark" } }


GET /pairs => {pairs: [{pairPartner1: {id: 1, name: "Joe"}, pairPartner2: { id: 2, name: "Mark" }}] }


GET /makers/:id => { pairedWith: [ {id: 1, name: "Joe"} ], notPairedWith: [ { id: 1, name: "Joe" }, { id: 2, name: "Mark" } ], id: 1, name: "Joe" }


Technologies
------------

1. NodeJS back-end

2. AngularJS front-end

B:  Gus, Dan, Ici, Ilya

F:  Jade, Joe, Rob, Mark