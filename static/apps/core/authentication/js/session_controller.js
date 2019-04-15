/**
 * Created by diego on 06/06/2018.
 */

var SESSION_PARAMTERS = {}
SESSION_PARAMTERS['init_load_page']      = ''
SESSION_PARAMTERS['load_page_duration']  = ''
SESSION_PARAMTERS['setup_page_duration'] = ''

SESSION_PARAMTERS['external_ip'] = null
SESSION_PARAMTERS['internal_ipv4'] = null
SESSION_PARAMTERS['internal_ipv6'] = null
SESSION_PARAMTERS['country_code'] = ''
SESSION_PARAMTERS['country_name'] = ''
SESSION_PARAMTERS['region_name'] = ''
SESSION_PARAMTERS['city'] = ''
SESSION_PARAMTERS['zip_code'] = ''
SESSION_PARAMTERS['time_zone'] = ''
SESSION_PARAMTERS['latitude'] = ''
SESSION_PARAMTERS['longitude'] = ''


function get_session_paramters_freegeoip(){
	// MAX QUERIES 15000 PER HOUR
	get_session_paramters_internal_ip()
	var url = 'http://freegeoip.net/json/'
	$.ajax({
    type: 'get',
    url: url,
    success: function(data) {
    	//alert("FREEGEOIP: "+JSON.stringify(data))
    	SESSION_PARAMTERS['external_ip'] = data.ip;
			SESSION_PARAMTERS['country_code'] = data.country_code.toUpperCase();
			SESSION_PARAMTERS['country_name'] = data.country_name.toUpperCase();
			SESSION_PARAMTERS['region_name'] = data.region_name.toUpperCase();
			SESSION_PARAMTERS['region_code'] = data.region_code.toUpperCase();
			SESSION_PARAMTERS['city'] = data.city.toUpperCase();
			SESSION_PARAMTERS['zip_code'] = data.zip_code
			SESSION_PARAMTERS['time_zone'] = data.time_zone.toUpperCase();
			SESSION_PARAMTERS['latitude'] = data.latitude
			SESSION_PARAMTERS['longitude'] = data.longitude
			//alert("VEJA COMO FICOU O FREEGEOIP: "+JSON.stringify(SESSION_PARAMTERS))
    },
    failure: function(data){

    }
  });
}

function get_session_paramters_ip_api(){
	// MAX QUERIES 9000 POR HOUR
	get_session_paramters_internal_ip()
	var url = 'http://ip-api.com/json'
	$.ajax({
    type: 'get',
    url: url,
    success: function(data) {
			//alert("IP-API: "+JSON.stringify(data))
    	SESSION_PARAMTERS['external_ip'] = data.query
			SESSION_PARAMTERS['country_code'] = data.countryCode.toUpperCase();
			SESSION_PARAMTERS['country_name'] = data.country.toUpperCase();
			SESSION_PARAMTERS['region_name'] = data.regionName.toUpperCase();
			SESSION_PARAMTERS['region_code'] = data.region.toUpperCase();
			SESSION_PARAMTERS['city'] = data.city.toUpperCase();
			SESSION_PARAMTERS['zip_code'] = data.zip
			SESSION_PARAMTERS['time_zone'] = data.timezone.toUpperCase();
			SESSION_PARAMTERS['latitude'] = data.lat
			SESSION_PARAMTERS['longitude'] = data.lon
			//alert("VEJA COMO FICOU O IP-API: "+JSON.stringify(SESSION_PARAMTERS))
    },
    failure: function(data){

    }
  });
}

function get_session_paramters_internal_ip(){
	window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
    var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};
    pc.createDataChannel("");    //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
    pc.onicecandidate = function(ice){  //listen for candidate events
        if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
        var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        //console.log('my IP: ', myIP);
				if (myIP.indexOf(":") >= 0){
					alert("IPv6: "+myIP)
					if (SESSION_PARAMTERS['internal_ipv6'] == null){
						SESSION_PARAMTERS['internal_ipv6'] = myIP
					}
				}
				else if (myIP.indexOf(".") >= 0){
					//alert("IPv4: "+myIP)
					if (SESSION_PARAMTERS['internal_ipv4'] == null){
						SESSION_PARAMTERS['internal_ipv4'] = myIP
					}
				}

        pc.onicecandidate = noop;
        //return myIP;
    };
}

function verify_session_paramters(){
	try{
		get_session_paramters_freegeoip()
	}
	catch(erro){
		get_session_paramters_ip_api()
	}
}

verify_session_paramters();
