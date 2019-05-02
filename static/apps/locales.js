var SESSION_PARAMTERS = {};

SESSION_PARAMTERS['external_ip'] = null;
SESSION_PARAMTERS['country_code'] = null;
SESSION_PARAMTERS['country_name'] =  null;
SESSION_PARAMTERS['region_name'] =  null;
SESSION_PARAMTERS['region_code'] =  null;
SESSION_PARAMTERS['distrit'] =  null;
SESSION_PARAMTERS['city'] =  null;
SESSION_PARAMTERS['zip_code'] =  null;
SESSION_PARAMTERS['time_zone'] =  null;
SESSION_PARAMTERS['latitude'] =  null;
SESSION_PARAMTERS['longitude'] = null;

function set_ip(id){
   SESSION_PARAMTERS.internal_ipv4 = id;
   return id;
}

function get_location(){

    let key = "AIzaSyA5pZBwmGJJ8f8POml7158nP2yxgvFtoXA";
	  let url_post = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key;
	  $.ajax({
	     type: 'post',
       contentType: 'application/json',
       data: JSON.stringify({"considerIp": "true"}),
       url: url_post,
       success: function(data) {
          //console.log('<---- Geolocation GOOGLEAPIS -------->');

          console.log("Latitude  : "+data.location.lat);
          console.log("Longitude : "+data.location.lng);
          console.log("Aproximação : "+data.accuracy);

          //data.location.lat = -20.3341824;
          //data.location.lng = -40.3750912;
          //20.3341824 - Longitude: -40.3750912
          let lat = data.location.lat + 0.000507;
          let lng = data.location.lng + 0.001963;
          //console.log("<------ LOCALIZAÇÃO CORRIGIDA ------->");
          //console.log("Latitude  : "+lat);
          //console.log("Longitude : "+lng);

          let url_places = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
          $.ajax({
            type: 'get',
            url: url_places + lat + ',' + lng + "&location_type=ROOFTOP&result_type=street_address&key=" + key,
            success: function(response) {
              console.log(JSON.stringify(response));
              var date = new Date();
              SESSION_PARAMTERS.external_ip = get_ip();
              SESSION_PARAMTERS.time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              SESSION_PARAMTERS.zip_code = response.results[0].address_components[6].long_name.toUpperCase();
              SESSION_PARAMTERS.country_code = response.results[0].address_components[5].short_name.toUpperCase();
              SESSION_PARAMTERS.country_name = response.results[0].address_components[5].long_name.toUpperCase();
              SESSION_PARAMTERS.region_name = response.results[0].address_components[4].long_name.toUpperCase();
              SESSION_PARAMTERS.region_code = response.results[0].address_components[4].short_name.toUpperCase();
              SESSION_PARAMTERS.city = response.results[0].address_components[3].long_name.toUpperCase();
              SESSION_PARAMTERS.latitude = lat;
              SESSION_PARAMTERS.longitude =lng;
              SESSION_PARAMTERS.distrit = response.results[0].address_components[2].long_name.toUpperCase();
            }
          });

       },
       failure: function(data){

       },

    });
    return SESSION_PARAMTERS;
};


function get_ip() {
   get_internal_ip(set_ip);

   $.ajax({
           type: "get",
           url: "http://api.ipapi.com/api/check?access_key=123f0a50a8f11794aad63dc1d90eab5e",
           success: function(e) {
               //console.log(e);
               SESSION_PARAMTERS.external_ip = e.ip;
           },
   });


}

function get_internal_ip(callback){

    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking using an iframe
    if(!RTCPeerConnection){
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];
        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    //listen for candidate events
    pc.onicecandidate = function(ice){

        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function(result){

        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});

    //wait for a while to let everything done
    setTimeout(function(){
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  alert("Latitude: " + position.coords.latitude +
  " - Longitude: " + position.coords.longitude);
}
//getLocation()

//navigator.geolocation.getCurrentPosition(success, error, options);
get_location();
var options = {

  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 20
};

function success(pos) {
  var crd = pos.coords;

  console.log('<----- Geolocation do Navegador -------->');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

