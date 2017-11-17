$(function(){
  myMap();
  function myMap() {
      var infowindow = new google.maps.InfoWindow();
      var seattle = {lat: 47.6097, lng: -122.3331};
      var map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 12,
          center: seattle
      });
      var features = [
          {
              position: new google.maps.LatLng(47.7086, -122.3232),
             title:'Northgate'
             // type: 'info'
          }, {
              position: new google.maps.LatLng(47.6628, -122.3139),
            title:'University District'
            //  type: 'info'
          },
          {
              position: new google.maps.LatLng(47.6253, -122.3222),
              title:'Capitol Hill'
              //  type: 'info'
          },{
              position: new google.maps.LatLng(47.6050, -122.3344),
              title:'Downtown'
              //  type: 'info'
          },{
              position: new google.maps.LatLng(47.6256, -122.3344),
              title:'South Lake Union'
              //  type: 'info'
          },{
              position: new google.maps.LatLng(47.6323, -122.3569),
              title:'Queen Anne'
              //  type: 'info'
          },{
              position: new google.maps.LatLng(47.6542, -122.3500),
              title:'Fremont'
              //  type: 'info'
          },{
              position: new google.maps.LatLng(47.6797, -122.3257),
              title:'Green Lake'
              //  type: 'info'
          },{
              position: new google.maps.LatLng(47.6792, -122.3860),
              title:'Ballard'
              //  type: 'info'
          },{
              position: new google.maps.LatLng(47.5755, -122.4107),
              title:'Alki'
              //  type: 'info'
          }];
      // Create markers.
      features.forEach(function(feature) {
          var marker = new google.maps.Marker({
              position: feature.position,
             // icon: icons[feature.type].icon,
              title:feature.title,
              map: map
          });

          //var service = new google.maps.places.PlacesService(map);
          google.maps.event.addListener(marker, 'click', function() {
                  infowindow.setContent('<div><strong>' + marker.title + '</strong><br>'
                      + '<a href="neighborDetail.html?name='+marker.title+'">Click Here</a>' + ' to see more details'
                     );
                  infowindow.open(map, this);
              });
          });
  }

});
