function CustomMarker(position, map, icon) {
    this.latlng_ = position;
    this.imageSrc = icon;
    this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function () {
    var self = this;
    var div = this.div_;
    if (!div) {
        div = this.div_ = document.createElement('div');
        div.className = "customMarker";


        var img = document.createElement("img");
        img.src = this.imageSrc;
        div.appendChild(img);
        google.maps.event.addDomListener(div, "click", function (event) {
          google.maps.event.trigger(self, "click");
        });

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};

CustomMarker.prototype.remove = function () {
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};

CustomMarker.prototype.getPosition = function () {
    return this.latlng_;
};


function initialize() {

    var infos = [];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var markers = [
            {
              position: new google.maps.LatLng(-20.333897, -40.373164),
              latlng: [-20.333897, -40.373164],
              name: 'Cleiton',
              icon: 'https://avatars3.githubusercontent.com/u/11451914?s=40&v=4'
            },
            {
              position: new google.maps.LatLng(-20.3542857,-40.3851819),
              latlng: [-20.3372857,-40.3861819],
              name: 'César',
              icon: 'https://avatars3.githubusercontent.com/u/7139752?s=40&v=4'
            }
            ];

            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 13,
              center: new google.maps.LatLng(latitude,longitude),
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            markers.forEach(function(item) {
                var content = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h1 id="firstHeading" class="firstHeading">'+ item.name +'</h1>'+
                    '<div id="bodyContent">'+
                    '<p><b>Latitude:</b>' + item.latlng[0] + '</p>'+
                    '<p><b>Longitude:</b>' + item.latlng[1] + '</p>'+
                    '</div>'+
                    '</div>';

                var markerstamp = new CustomMarker(item.position, map, item.icon);

                var infoWindow = new google.maps.InfoWindow({
                    pixelOffset: new google.maps.Size(-25,-110)
                });

                google.maps.event.addListener(markerstamp, 'click', (function(markerstamp, content, infoWindow) {
                return function() {
                  closeInfos();
                  infoWindow.setContent(content);
                  infoWindow.open(map, markerstamp);

                  infos[0] = infoWindow;
                };
                })(markerstamp, content, infoWindow));
            });
        });
    }

    function closeInfos() {
      if (infos.length > 0) {

        infos[0].set('marker', null);

        infos[0].close();

        infos.length = 0;
      }
    }


    }

    google.maps.event.addDomListener(window, 'load', initialize);