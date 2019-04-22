var SESSION_PARAMTERS = {}
function set_ip(id){
   SESSION_PARAMTERS.internal_ipv4 = id;
   return id;
}

function get_session_paramters_ip_api() {
   get_internal_ip(set_ip);

   var ajax1 = $.ajax({
          type: "get",
          url: "http://ip-api.com/json",
          success: function(e) {
            SESSION_PARAMTERS.external_ip = e.query,
            SESSION_PARAMTERS.country_Code = e.countryCode.toUpperCase(),
            SESSION_PARAMTERS.country_name = e.country.toUpperCase(),
            SESSION_PARAMTERS.region_name = e.regionName.toUpperCase(),
            SESSION_PARAMTERS.region_code = e.region.toUpperCase(),
            SESSION_PARAMTERS.city = e.city.toUpperCase(),
            SESSION_PARAMTERS.zip_code = e.zip,
            SESSION_PARAMTERS.time_zone = e.timezone.toUpperCase(),
            SESSION_PARAMTERS.latitude = e.lat,
            SESSION_PARAMTERS.longitude = e.lon
          },

   });

   var ajax2 = $.ajax({
           type: "get",
           url: "http://api.ipapi.com/api/check?access_key=123f0a50a8f11794aad63dc1d90eab5e",
           success: function(e) {
               SESSION_PARAMTERS.external_ip = e.ip,
               SESSION_PARAMTERS.country_Code = e.country_code.toUpperCase(),
               SESSION_PARAMTERS.country_name = e.country_name.toUpperCase(),
               SESSION_PARAMTERS.region_name = e.region_name.toUpperCase(),
               SESSION_PARAMTERS.region_code = e.region_code.toUpperCase(),
               SESSION_PARAMTERS.city = e.city.toUpperCase(),
               SESSION_PARAMTERS.zip_code = e.zip,
               SESSION_PARAMTERS.latitude = e.latitude,
               SESSION_PARAMTERS.longitude = e.longitude
           },
   });

   try {
      ajax1;
   } catch(e) {
     ajax2;
   }

   if (SESSION_PARAMTERS.external_ip !== undefined)
      notify("confirm","Sua localização", "IP Externo:"+SESSION_PARAMTERS.external_ip+"<br>Cidade "+SESSION_PARAMTERS.city+"<br>UF : "+SESSION_PARAMTERS.region_code);

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

