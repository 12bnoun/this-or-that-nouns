import logo from './logo.svg';
import './App.css';
import AppState from './containers/AppState';

function App() {
  return (
    <div>
      <link href='https://css.gg/heart.css' rel='stylesheet'></link>
      <link href='https://css.gg/crown.css' rel='stylesheet'></link>
      <link href='https://css.gg/chevron-left-o.css' rel='stylesheet'></link>
      <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet"></link>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');
      </style>
      <div className="App">
        <AppState />
      </div>
    </div>
  );
}

export default App;
