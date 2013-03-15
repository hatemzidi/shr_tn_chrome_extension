//sets the item in the localstorage
  function setItem(key, value) {
    try {
      window.localStorage.removeItem(key);
      window.localStorage.setItem(key, value);
      console.log('setItem(' + key + '): ' + value );
    }catch(e) {
      console.error("Error inside setItem ");
      console.log(e);
    }
  }
  
  //Gets the item from local storage with the specified key
  function getItem(key) {
    var value;
    
    try {
      value = window.localStorage.getItem(key);
    }catch(e) {
      console.error("Error inside getItem() for key: " + key);
	    console.log(e);
	    value = "null";
    }
    
    console.log('getItem(' + key +'): ' + value );
    return value;
  }
  
  //Clears all the key value pairs in the local storage
  function clearStrg() {
    console.log('about to clear local storage ');
    window.localStorage.clear();
    console.log('cleared');
  }