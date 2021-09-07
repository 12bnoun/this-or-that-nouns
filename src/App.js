import "./App.css";
import AppState from "./containers/AppState";

function App() {
  return (
    <div>
      <link href="https://css.gg/heart.css" rel="stylesheet"></link>
      <link href="https://css.gg/crown.css" rel="stylesheet"></link>
      <link href="https://css.gg/chevron-left-o.css" rel="stylesheet"></link>
      <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet"></link>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
        @import
        url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');
        @import
        url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');
        @import
        url(//db.onlinewebfonts.com/c/6ab539c6fc2b21ff0b149b3d06d7f97c?family=Minecraft);
      </style>
      <div className="App">
        <AppState />
      </div>
    </div>
  );
}

export default App;
