// The location of Uluru
const position = { lat: -25.344, lng: 131.031 };
// Request needed libraries.
//@ts-ignore
const { Map } = await google.maps.importLibrary("maps");
// const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

let map;

// The map, centered at Uluru
map = new Map(document.querySelector("#map"), {
  zoom: 6,
  center: position,
  mapId: "DEMO_MAP_ID",
});

document.querySelector("p").addEventListener("dblclick", e =>{
  e.preventDefault();
  window.alert("Welcome to Google Mapper! Let's play around with the Google Maps API.  \n\nLook up a location by entering values for Latitude and Longitude and pressing \"Go!\".  If the spot searched is one of your favorites click \"Add to favorites\" then \"Go!\" to see your list of favorites on the right of the screen when refreshed. \n\nClick \"Get Current Location\" to see where you are.  \n\nClick \"Explore\" to go to a random place on Earth.  Values for what's found are pre-populated into the \"Latitude\" and \"Longitude\" fields to see where you are.  If you like what you found: enter a location for it, check the favorites box, and hit \"Go!\"\n\n Enjoy!")
})

///////////////////////////////////////////////////////////////////


// document.querySelector("form").addEventListener("submit", e =>{
//   e.preventDefault();
//   const x = parseFloat(e.target.latitude.value);
//   const y = parseFloat(e.target.longitude.value);
//   const location = e.target.location.value;
//   if(e.target["add-to-list"].checked){
//     const newFavorite = {
//       location: location,
//       latitude: x,
//       longitude: y
//     }
//     fetch("http://localhost:3000/favorites",{
//       method:"POST",
//       headers:{
//         //sending JSON to db
//         "Content-Type": "applications/json",
//         //expecting a copy of the JSON back as confirmation
//         "Accept": "applications/json" 
//     },
//     body: JSON.stringify(newFavorite)
//     })
//     .then(res => res.json())
//     .then(newFavoriteInDB)
//   }
//   if(!isNaN(x) && x <= 90 && x>=-90 && y <= 180 && y>=-180 &&!isNaN(y)){
//     const newPosition = {lat:x, lng:y}
//     const zoom = 11
//     map.zoom = zoom
//     map.setCenter(newPosition)
//   } else{
//     console.error("Woof invalid coordinates")
//   }
//   });

const form = document.querySelector("form")

let clicked = null;

document.querySelector("#look-up-value").addEventListener("click", ()=>{
  clicked = "look-up-value";
})

document.querySelector("#add-to-favorites").addEventListener("click", () =>{
  clicked = "add-to-favorites"
})

form.addEventListener("submit", e=>{
  const x = parseFloat(e.target.latitude.value);
  const y = parseFloat(e.target.longitude.value);
  const location = e.target.location.value;
  if(clicked ==="look-up-value"){
    e.preventDefault();
    if(!isNaN(x) && x <= 90 && x>=-90 && y <= 180 && y>=-180 &&!isNaN(y)){
      const newPosition = {lat:x, lng:y}
      const zoom = 11
      map.zoom = zoom
      map.setCenter(newPosition)
    } 
    else {
      window.alert("Woof invalid coordinates")
    }

  } else if (clicked ==="add-to-favorites"){
    // e.preventDefault();
    if(location !== ""){
      const newFavorite = {
        location: location,
        latitude: x,
        longitude: y
      }
      fetch("http://localhost:3000/favorites",{
        method:"POST",
        headers:{
          //sending JSON to db
          "Content-Type": "application/json",
          //expecting a copy of the JSON back as confirmation
          "Accept": "application/json" 
      },
      body: JSON.stringify(newFavorite)
      })
      .then(res => res.json())
      // .then(newFavoriteInDB)
      }
    else{
      window.alert("Give this location a name!")
    }
    map.setCenter({lat:newFavorite.latitude, lng: newFavorite.longitude})

  }


})


clicked = null;

///////////////////////////////////////////////////////////////////



async function success(position){
  try{
    const coords = await position.coords;
    return coords

  } catch(error) {
    console.error(error)
    }
  }


document.querySelector("#current-location").addEventListener("click", e =>{
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(position => {
    success(position)
    .then(res =>{
      const x = res.latitude
      const y = res.longitude
      const newPosition = {lat:x, lng:y}
      const zoom = 15
      map.zoom = zoom
      map.setCenter(newPosition)
    })
  });  
})


document.querySelector("#random").addEventListener("click", e =>{
  e.preventDefault();

  const x = (Math.random()*80).toFixed(5)
  const signedX = Math.random() < .5 ? x*-1: parseFloat(x);

  const y = (Math.random()*180).toFixed(5)
  const signedY = Math.random() < .5 ? y*-1: parseFloat(y);

  const newPosition = {lat: signedX, lng:signedY}
  const zoom = 6
  map.zoom = zoom
  map.setCenter(newPosition)

  const latitudeInputField = document.querySelector("#latitude-input")
  latitudeInputField.value = signedX

  const longitudeInputField = document.querySelector("#longitude-input")
  longitudeInputField.value = signedY

})

async function displayFavorites(){
  const response = await fetch("http://localhost:3000/favorites")
  const convertedResponse = await response.json()
  const favorites = document.querySelector("#favorites")

  convertedResponse.forEach(favorite =>{
    const liElement = document.createElement("li")
    liElement.textContent = favorite.location
    liElement.latitude = favorite.latitude
    liElement.longitude = favorite.longitude
    favorites.append(liElement)

  })
}

displayFavorites()
// fetch("http://localhost:3000/favorites")
// .then(res => res.json())
// .then(resConverted =>{
//   resConverted.forEach(favorite =>{
//     const liElement = document.createElement("li")
//     liElement.textContent = favorite.location
//     liElement.latitude = favorite.latitude
//     liElement.longitude = favorite.longitude
//     favorites.append(liElement)
//     }
//   )}
// );

document.querySelector("#favorites").addEventListener("click", e =>{
  e.preventDefault();
  const position = {
    lat: e.target.latitude,
    lng: e.target.longitude
  }
  const zoom = 6;
  map.zoom = zoom;
  map.setCenter(position);
}
)

async function displayLastLocation(){
  const response = await fetch("http://localhost:3000/favorites")
  const convertedResponse = await response.json()
  const lastLocation = convertedResponse.pop()
  try{
    map.setCenter({lat:lastLocation.latitude, lng:lastLocation.longitude})
  } catch{
    console.log("*bandaid* looking to call last favorites to simulate refresh for favorites and no refresh for map")
  }
}

displayLastLocation()



//////Logic for extra event listener


  // const inputs = document.querySelectorAll('input[type="text"]')

  // inputs.forEach(input =>{
  //   input.addEventListener("focus", e =>{
  //     e.preventDefault();
  //     e.target.style.background = "yellow"
  //   })
  // })

  // inputs.forEach(input =>{
  //   input.addEventListener("focusout", e =>{
  //     e.preventDefault();
  //     e.target.style.background = "white"
  //   })
  // })