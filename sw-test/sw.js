var STORE_NAME = 'key_database';
var idbDatabase;
var STOP_RETRYING_AFTER = 86400000;

// function getObjectStore(storeName, mode) {
//   return idbDatabase.transaction(storeName, mode).objectStore(storeName);
// }

var keyData = [];

function createDB(str) {
	var indexedDBOpenRequest = indexedDB.open('offline-analytics', 1);
	indexedDBOpenRequest.onerror = function(error) {
        console.error('IndexedDB error:', error);
    };
    indexedDBOpenRequest.onupgradeneeded = function() {
        var objectStore = this.result.createObjectStore(STORE_NAME, {autoIncrement:true});
        keyData.forEach(function(input_key) {
            objectStore.add(input_key.key);
        });
    };
}

// function replayAnalyticsRequests() {
//   var savedRequests = [];

//   getObjectStore(STORE_NAME).openCursor().onsuccess = function(event) {
//     // See https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#Using_a_cursor
//     var cursor = event.target.result;

//     if (cursor) {
//       // Keep moving the cursor forward and collecting saved requests.
//       savedRequests.push(cursor.value);
//       cursor.continue();
//     } else {
//       // At this point, we have all the saved requests.
//       console.log('About to replay %d saved Google Analytics requests...',
//         savedRequests.length);

//       savedRequests.forEach(function(savedRequest) {
//         var queueTime = Date.now() - savedRequest.timestamp;
//         if (queueTime > STOP_RETRYING_AFTER) {
//           getObjectStore(STORE_NAME, 'readwrite').delete(savedRequest.url);
//           console.log(' Request has been queued for %d milliseconds. ' +
//             'No longer attempting to replay.', queueTime);
//         } else {
//           // The qt= URL parameter specifies the time delta in between right now, and when the
//           // /collect request was initially intended to be sent. See
//           // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#qt
//           var requestUrl = savedRequest.url + '&qt=' + queueTime;

//           console.log(' Replaying', requestUrl);

//           fetch(requestUrl).then(function(response) {
//             if (response.status < 400) {
//               // If sending the /collect request was successful, then remove it from the IndexedDB.
//               getObjectStore(STORE_NAME, 'readwrite').delete(savedRequest.url);
//               console.log(' Replaying succeeded.');
//             } else {
//               // This will be triggered if, e.g., Google Analytics returns a HTTP 50x response.
//               // The request will be replayed the next time the service worker starts up.
//               console.error(' Replaying failed:', response);
//             }
//           }).catch(function(error) {
//             // This will be triggered if the network is still down. The request will be replayed again
//             // the next time the service worker starts up.
//             console.error(' Replaying failed:', error);
//           });
//         }
//       });
//     }
//   };
// }

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/sw-test/',
                '/sw-test/index.html',
                '/sw-test/style.css',
                '/sw-test/app.js',
                '/sw-test/image-list.js',
                '/sw-test/star-wars-logo.jpg',
                '/sw-test/gallery/bountyHunters.jpg',
                '/sw-test/gallery/myLittleVader.jpg',
                '/sw-test/gallery/snowTroopers.jpg'
            ]);
        })
    );
});

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     createDB()
//   );
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function(response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open('v1').then(function(cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function() {
                return caches.match('/sw-test/gallery/myLittleVader.jpg');
            });
        }
    }));
});

self.addEventListener('message', function(event){
    console.log("SW Received Message: " + event.data);
    event.waitUntil(
    	createDB(event.data)
    );
    event.waitUntil(
    	keyData.push({key : event.data})
    );
});