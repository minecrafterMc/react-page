import "./App.css";
import data from "./data";
import ReactDOMServer from "react-dom/server";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return width;
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
    document.getElementById("popup-name").innerHTML = data[Id].name;
    document.getElementById("popup-desc").innerHTML = data[Id].description;
    document.getElementById("popup-img").src = data[Id].banner;
    gameDestination = data[Id].url;
    document.getElementById("popup-patchNotes").innerHTML =
      ReactDOMServer.renderToString(patchList);
    document.getElementById("popup").style.display = "block";
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
    <img src="https://minecraftermc.github.io/react-page/assets/Play.webp" onClick={handleClick}/>
  )
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
        <h2 className="popup-title">Patch Notes:</h2>
        <div id="popup-patchNotes"></div>
      </div>
      <div className="Games">
        <h1 className="title">Games</h1>
        <Icon Id="tetis"></Icon>
      </div>
    </div>
  );
}

export default App;
