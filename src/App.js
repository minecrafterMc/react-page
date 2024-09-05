import "./App.css";
import data from "./data";
import ReactDOMServer from "react-dom/server";


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return width;
}
let slideIndex = 0;
var slideTimeout;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("popup-gallery-image");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  slideTimeout = setTimeout(showSlides, 3000); // Change image every 2 seconds
} 
var popup;
var gameDestination;
if (getWindowDimensions() > 600) {
  popup = "popup";
} else {
  popup = "small-popup";
}
function Icon({ Id }) {
  function handleClick() {
    let patchList = data[Id].changelog.map((version) => (
      <div key={version.id}>
        <h2 className="popup-patchNotes-title">{version.number}</h2>
        <ul>
          {version.notes.map((ver) => (
            <li key={ver.id}>{ver.text}</li>
          ))}
        </ul>
      </div>
    ));
    let gallery = data[Id].gallery.map((image) => (
      <div className="popup-gallery-image fade" key={image.id}>
  <div className="popup-gallery-numbertext">{image.id} / {data[Id].gallery.length}</div>
  <img src={image.url} style={{width: "100%"}} />
  {image.caption != "" && <div className="popup-gallery-text">{image.caption}</div>}
</div>
     
    ));
    console.log(gallery)
    document.getElementById("popup-name").innerHTML = data[Id].name;
    document.getElementById("popup-desc").innerHTML = data[Id].description;
    document.getElementById("popup-img").src = data[Id].banner;
    gameDestination = data[Id].url;
    document.getElementById("popup-patchNotes").innerHTML =
      ReactDOMServer.renderToString(patchList);
      document.getElementById("popup-gallery").innerHTML =
      ReactDOMServer.renderToString(gallery);
    document.getElementById("popup-footer").innerHTML = data[Id].footer;
    document.getElementById("popup").style.display = "block";
    clearTimeout(slideTimeout);
    showSlides();
  }
  let iconname;
  if (getWindowDimensions() < 600) {
    iconname = "small-Icon";
  } else {
    iconname = "Icon";
  }
  return <img className={iconname} src={data[Id].Icon} onClick={handleClick} />;
}
function PlayButton(){
  function handleClick(){
    window.location.href = gameDestination;
  }
  return(
    <div className="popup-playDiv">
    <img src="https://minecraftermc.github.io/react-page/assets/Play.webp"  className="popup-playImg" onClick={handleClick}/>
    </div>
  )
}
function Gallery(){

}
function App() {
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
  return (
    <div className="App">
      <div className={popup} id="popup">
        <img id="popup-img" className="fade-img" />
        <button className="popup-close" onClick={closePopup}>
          close
        </button>
        <h1 className="popup-title" id="popup-name"></h1>
        
        <h3 className="popup-title" id="popup-desc"></h3>
        <PlayButton />
        <h2 className="popup-title">Screenshots:</h2>
        <div id="popup-gallery"></div>
        <h2 className="popup-title">Patch Notes:</h2>
        
        <div id="popup-patchNotes"></div>
        <h3 className="popup-title" id="popup-footer"></h3>
      </div>
      <h1 className="title">Games</h1>
      <div className="kontener">
        <Icon Id="tetis" />
        <Icon Id="mineSplapper" />
      </div>
      <h1 className="title">Tools</h1>
      <div className="kontener">

        <Icon Id="tetisEditor" />
      </div>
    </div>
  );
}

export default App;
