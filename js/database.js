var dbPromised = idb.open('db_favorite', 1, upgradeDb => {
  var objectStore = upgradeDb.createObjectStore('favorite', {
    keyPath: 'id'
  });
  objectStore.createIndex('teamName', 'teamName', { unique: false});
});

function addFavorite(data) {
  dbPromised.then(function(db) {
      var tx = db.transaction('favorite', 'readwrite');
      var store = tx.objectStore('favorite');
      var dataSave = {  
              id: data.id,
              name: data.name,
              crestUrl : data.crestUrl,
        };
        
       tx.objectStore('favorite').put(dataSave);
        return tx.complete;
  }).then(function() {
    console.log('Tim Favorit berhasil disimpan.');
        var message = `${data.name} ditambahkan ke daftar favorit`;
            
        if (Notification.permission === 'granted') {
            showNotification(message);
        } else {
            console.error('Fitur notifikasi tidak diijinkan.');
        }
        
  }).catch(function(err) {
      console.log(err);
  });
}

function deleteFavorite(data) {
   dbPromised.then(function(db) {
      var tx = db.transaction('favorite', 'readwrite');
      var store = tx.objectStore('favorite');
      
      store.delete(data);
      return tx.complete;
  }).then(function() {
     var message = `Tim berhasil dihapus dari daftar favorit`;
        
      if (Notification.permission === 'granted') {
          showNotification(message);
      } else {
          console.error('FItur notifikasi tidak diijinkan.');
      }
  }).catch(function(err) {
      console.log(err);
  });
}

function getFavData() {
  return new Promise(function (resolve, reject) {
      dbPromised
          .then(function (db) {
              var tx = db.transaction('favorite', "readonly");
              var store = tx.objectStore('favorite');
              return store.getAll();
          })
          .then(function (data) {
              resolve(data);
          });
  });
}

function checkData(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
                var tx = db.transaction('favorite', "readonly");
                var store = tx.objectStore('favorite');
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve(true)
                } else {
                  reject(false);
                }
            });
    });
}

function showNotification(body) {
    const title = 'Favorite Team';
    const options = {
        'body': `${body}`,
        'icon': '../icon.png',
        'badge': '../icon.png'
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}