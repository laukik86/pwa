// Background sync registration (simulate saving vocab progress)
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      return registration.sync.register('sync-vocab-progress');
    }).then(() => {
      console.log("Background Sync Registered ✅");
    }).catch(console.error);
  }
  
  // Ask for push notification permission
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("🔔 Notification permission granted.");
    }
  });
  