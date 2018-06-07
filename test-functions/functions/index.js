const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest((req, res) => admin.firestore().collection('messages').add({original: req.query.text}).then(writeResult => res.json({result: `Message with ID: ${writeResult.id} added.`})));

exports.makeUppercase = functions.firestore.document('/messages/{documentId}').onCreate((snap, context) => {
  console.log('Uppercasing', context.params.documentId, snap.data().original);
  return snap.ref.set({
    uppercase: snap.data().original.toUpperCase()
  }, {merge: true});
});
