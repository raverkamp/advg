function to_query(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
  
function exec_query(url, obj) {
   var req = new XMLHttpRequest();
   var q = to_query(obj);
   req.open("GET", url +"?" + q , false);
   req.send();
   if (req.status !== 200) {
        alert("JSON ERROR");
        console.log(req.responseText);
        throw "JSON ERROR";
    }
    var txt = req.responseText;
    var res = JSON.parse(txt);
    return res;
}


/* new fetch api */
function fetchUrl(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => data);
}

/* fetch with async/await */
async function fetchAsync(url, obj) {
    var q = to_query(obj);
    const promise = await fetch(url +"?" + q ,{credentials: 'same-origin'});
    const data = await promise.json();
    return data;
}
