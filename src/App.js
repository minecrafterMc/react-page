import './App.css';
const data = {"tetis":{"Icon":"https://minecraftermc.github.io/react-page/assets/TetisIcon.png","name":"Tetis"}}

function Icon({Id}){
  function handleClick(){
    document.getElementById("popup-name").innerHTML = data[Id].name;
    document.getElementById("popup").style.display = "block"
  }
  return (
    <img className='Icon' src={data[Id].Icon} onClick={handleClick} />
  )
}

function App() {
  return (
    <div className="App">
      <div className='popup' id='popup'>
        <h1 className='title' id='popup-name'></h1>
      </div>
     <div className='Games'>
      <h1 className='title'>Games</h1>
      <Icon Id="tetis"></Icon>
      <Icon Id="tetis"></Icon>
      <Icon Id="tetis"></Icon>
      </div>
    </div>
  );
}

export default App;
