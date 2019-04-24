var SESSION_PARAMTERS = {};

function set_ip(id){
   SESSION_PARAMTERS.internal_ipv4 = id;
   return id;
}
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


function get_location(){

    let key = "AIzaSyA5pZBwmGJJ8f8POml7158nP2yxgvFtoXA";
	  let url_post = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key;
	  $.ajax({
	     type: 'post',
       contentType: 'application/json',
       data: JSON.stringify({"considerIp": "true"}),
       url: url_post,
       success: function(data) {

          let lat = data.location.lat;
          let lng = data.location.lng;
          //alert("GOOGLE-API: "+JSON.stringify(data));
          let url_places = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
          $.ajax({
            type: 'get',
            url: url_places + lat + ',' + lng + "&location_type=ROOFTOP&result_type=street_address&key=" + key,
            success: function(response) {
              //console.log(response);
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

get_location();