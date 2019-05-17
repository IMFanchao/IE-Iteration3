var map;
var gMarkersOg = new Array();
var gMarkers = new Array();

function myMap() {
  var mapProp = {
    //Center is Victoria
    center: new google.maps.LatLng(-37.4, 144.7),
    zoom: 12,
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  //Set center to user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(initialLocation);
    });
  }

}
myMap();

/**
Click check button to update the map
*/
function updateMap() {
    // Clear markers
    if(gMarkers.length > 0) {
      for(i=0 ; i<gMarkers.length ; i++) {
        gMarkers[i].setMap(null);
      }
      gMarkers = new Array();
    }
  //search suburb
  //Suburb from user input
  var suburb = document.getElementById("suburb").value;
  //Type of activity from user input
  var activity = document.getElementById("activity").value;
  var geocoder = new google.maps.Geocoder();

  //suburb for comparing with user input
  var suburbStr = suburb.toString().toUpperCase();
  //type of activity for comparing with user input
  var activityStr = activity.toString().toUpperCase();
  //Marker initialLocation
  var url = "http://maps.google.com/mapfiles/ms/micons/";
  //Check whether there is a activity user input
  var flag = 0;
  //Create table from database
  var tableHTML = '<table border=1 class="fixed_header"><thead><tr><th align=center>Name</th><th align=center>Adress</th><th align=center>Type</th></tr></thead><tbody>';
  //External user selected activity
  var activityList = new Array();
  if(activityStr.match("Swimming".toUpperCase()) != null) {
    activityList.push("SWIM");
  }else if(activityStr.match("Walking/hiking".toUpperCase()) != null) {
    activityList.push("PARK");
  }else if(activityStr.match("Martial art".toUpperCase()) != null) {
    activityList.push("MARTIAL");
  }else if(activityStr.match("Sports".toUpperCase()) != null) {
    activityList.push("SOCCER");
    activityList.push("FOOTBALL");
    activityList.push("NETBALL");
    activityList.push("TENNIS");
    activityList.push("SPORT");
  }else if(activityStr.match("Athletics".toUpperCase()) != null) {
    activityList.push("ATHLET");
  }else if(activityStr.match("All activity".toUpperCase()) != null) {
    activityList.push("");
  }
  if (suburb != null && suburb != "") {
    if (activity != null && activity!= "") {
      {%for mark in club %}
        //Name from the table club
        var name= '{{mark.name}}'.toString();
        //Address from the table club
        var address = '{{mark.address}}'.toString();
        //Postcode from the table club
        var postcode = '{{mark.postcode}}'.toString().toUpperCase();
        //Suburb from the table club
        var markSuburb = '{{mark.suburb}}'.toString().toUpperCase();
        //Type of activity from the table club
        var category = '{{mark.type}}'.toString().toUpperCase();
        //Set title equals to place_id in order to avoid duplicate
        var title = '{{mark.place_id}}'.toString().toUpperCase();
        //Marker initialLocation
        var url = "http://maps.google.com/mapfiles/ms/micons/";
        var url_address = "https://www.google.com/maps/dir/?api=1&" +
          "origin=Current+Location&" + "destination=" + "{{mark.latitude}}"
          + "," + "{{mark.longitude}}";

      if (postcode === suburb || markSuburb.match(suburbStr) != null) {
          var point = new google.maps.LatLng({{mark.latitude}}, {{mark.longitude}});
          //Set marker color
          if(category.match('SWIM') != null) {
            url +=  "blue-dot.png";
          }else if(category.match('FIT') != null) {
            url +=  "purple-dot.png";
          }else if(category.match('GYM') != null) {
            url +=  "purple-dot.png";
          }else if(category.match('TRAIN') != null) {
            url +=  "purple-dot.png";
          }else if(category.match('DISABILITY') != null) {
            url += "pink-dot.png";
          }else if(category.match('PARK') != null) {
            url += "green-dot.png";
          }else if(category.match('MARTIAL') != null) {
            url += "orange-dot.png";
          }else if(category.match('FOOTBALL') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('SOCCER') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('TENNIS') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('NETBALL') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('SPORT') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('ATHLET') != null) {
            url += "yellow-dot.png";
          }else {
            url += "red-dot.png";
          }

          var marker = new google.maps.Marker({
            position: point,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: {
              url: url
            }
          });
          marker['infowindow'] = new google.maps.InfoWindow({
            content: "<h6>{{mark.name}}</h6> <br> {{ mark.address }} ",
          });
          for(i=0 ; i<activityList.length ; i++){
            if(category.match(activityList[i]) != null) {
              marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
              marker.setMap(map);
              //Add entry to table
              tableHTML += "<tr><td align=center>"+name+"</td>";
              tableHTML += "<td align=center><a href=\""+url_address+"\">"+address+"</a></td>";
              tableHTML += "<td align=center>"+category+"</td></tr>";
              flag = 1;
            }
          }
          google.maps.event.addListener(marker, 'click', function() {
            window.open(url_address);
            //map.setZoom(12);
          });
          google.maps.event.addListener(marker, 'mouseover', function() {
            // this['infowindow'].open(map, this);
            this['infowindow'].open(map, this);
          });
          google.maps.event.addListener(marker, 'mouseout', function() {
            // this['infowindow'].close(map, this);
            this['infowindow'].close(map, this);
          });
          gMarkers.push(marker);
        }
      {% endfor %}
      // End a table
      tableHTML += "</tr></table>";
      document.getElementById("tableDiv").innerHTML = tableHTML;
        if(flag == 0) {
            window.alert("Acitivity not found in this suburb!");

        }
        geocoder.geocode({'address': suburb, componentRestrictions: { country: 'AU'}},
          function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              map.setCenter(results[0].geometry.location);
              map.setZoom(14);
            }else {
              window.alert('Geocode was not successful for the following reason: ' + status);
            }
          });


    }else {
      /**
      * User input postcode without activity
      */
      {%for mark in club %}
        //Name from the table club
        var name= '{{mark.name}}'.toString();
        //Address from the table club
        var address = '{{mark.address}}'.toString();
        //Postcode from the table club
        var postcode = '{{mark.postcode}}'.toString().toUpperCase();
        //Suburb from the table club
        var markSuburb = '{{mark.suburb}}'.toString().toUpperCase();
        //Type of activity from the table club
        var category = '{{mark.type}}'.toString().toUpperCase();
        //Set title equals to place_id in order to avoid duplicate
        var title = '{{mark.place_id}}'.toString().toUpperCase();
        //Marker initialLocation
        var url = "http://maps.google.com/mapfiles/ms/micons/";
        var url_address = "https://www.google.com/maps/dir/?api=1&" +
          "origin=Current+Location&" + "destination=" + "{{mark.latitude}}"
          + "," + "{{mark.longitude}}";

      if (postcode === suburb || markSuburb.match(suburbStr) != null) {
          var point = new google.maps.LatLng({{mark.latitude}}, {{mark.longitude}});
          //Set marker color
          if(category.match('SWIM') != null) {
            url +=  "blue-dot.png";
          }else if(category.match('FIT') != null) {
            url +=  "purple-dot.png";
          }else if(category.match('GYM') != null) {
            url +=  "purple-dot.png";
          }else if(category.match('TRAIN') != null) {
            url +=  "purple-dot.png";
          }else if(category.match('DISABILITY') != null) {
            url += "pink-dot.png";
          }else if(category.match('PARK') != null) {
            url += "green-dot.png";
          }else if(category.match('MARTIAL') != null) {
            url += "orange-dot.png";
          }else if(category.match('FOOTBALL') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('SOCCER') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('TENNIS') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('NETBALL') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('SPORT') != null) {
            url += "ltblue-dot.png";
          }else if(category.match('ATHLET') != null) {
            url += "yellow-dot.png";
          }else {
            url += "red-dot.png";
          }

          var marker = new google.maps.Marker({
            position: point,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: {
              url: url
            }
          });
          marker['infowindow'] = new google.maps.InfoWindow({
            content: "<h6>{{mark.name}}</h6> <br> {{ mark.address }} ",
          });

              //Add entry to table
              tableHTML += "<tr><td>"+name+"</td>";
              tableHTML += "<td><a href=\""+url_address+"\">"+address+"</a></td>";
              tableHTML += "<td>"+category+"</td></tr>";

          google.maps.event.addListener(marker, 'click', function() {
            window.open(url_address);
            //map.setZoom(12);
          });
          google.maps.event.addListener(marker, 'mouseover', function() {
            // this['infowindow'].open(map, this);
            this['infowindow'].open(map, this);
          });
          google.maps.event.addListener(marker, 'mouseout', function() {
            // this['infowindow'].close(map, this);
            this['infowindow'].close(map, this);
          });
          gMarkers.push(marker);
        }
      {% endfor %}
      // End a table
      tableHTML += "</tr></tbody></table>";
        geocoder.geocode({'address': suburb, componentRestrictions: { country: 'AU'}},
          function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              map.setCenter(results[0].geometry.location);
              map.setZoom(14);
            }else {
              window.alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
  }else {
    window.alert('Activity not found');
  }

}

(function() {
  'use strict';

  var btnScrollDown = document.querySelector('#scroll_down');

  function scrollDown() {
    var windowCoords = document.documentElement.clientHeight;
    (function scroll() {
      if (window.pageYOffset < windowCoords) {
        window.scrollBy(0, 10);
        setTimeout(scroll, 0);
      }
      if (window.pageYOffset > windowCoords) {
        window.scrollTo(0, windowCoords);
      }
    })();
  }

  btnScrollDown.addEventListener('click', scrollDown);
})();
