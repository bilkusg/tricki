tricki is a very small wiki implemented in two small files -one html and
one javascript. It relies on a number of third-party javascript libraries 
and of course on a properly configured webserver.

Nevertheless, it is an example of how much can be achieved very simply with
the aid of freely available modern infrastructure.

tricki's main difference from other wikis is that it implements client-side
encryption of all data, thus ensuring that everything sent to the server to
be stored is already encrypted, and that passwords are never sent across the 
wire.

This does NOT mean that tricki is automatically secure - there are lots of ways
naive setups could be attacked by nasty people. However, if you read the install
guide and understand the issues described on the webpage, you can add a
useful extra level of security to the storage of confidential but easily
accessible information in the cloud.

tricki was implemented by Gary Bilkus during June 2013, and is now an open 
source project on github

