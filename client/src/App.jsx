import { useEffect, useState } from 'react';
import './App.css';
import axios from './axios';

function App() {
  const [prefectures, setPrefectures] = useState([])

  useEffect(() => {
    getPrefectures();
  }, [])

  // Call API to get list of prefectures
  const getPrefectures = () => {
    axios.get("prefectures")
      .then(response => {
        const prefList = response.data.result;
        // Add a selected attribute to each prefecture item to know whether it is selected or not
        prefList.forEach(item => item.selected = false)
        setPrefectures(prefList)
      })
  }

  // set selected attribute to true when prefecture is selected, ortherwise false
  const onSelectPref = (pref) => {
    const findPref = prefectures.find(item => item === pref);
    findPref.selected = !findPref.selected;
  }

  const prefecturesList = prefectures.map(item => (
    <div className="app-prefectures-item" key={item.prefCode}><input type="checkbox" name={item.prefName} id={item.prefCode} onClick={() => onSelectPref(item)} />{item.prefName}</div>
  ))

  return (
    <div className="App">
      <div className="container">
        <h2>都道府県</h2>
        <div className="app-prefectures-list">
          {prefecturesList}
        </div>
      </div>

    </div>
  );
}

export default App;
