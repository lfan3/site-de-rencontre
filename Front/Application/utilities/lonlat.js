if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(function(position){
        console.log('latitude: ' + position.coords.latitude)
        console.log('longitude: ' + position.coords.longitude)
    })
}