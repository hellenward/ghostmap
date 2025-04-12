
import React, { useEffect, useState } from 'react';
import './App.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { GhostMap } from './components/GhostMap/index.jsx';
import { GhostModal } from './components/GhostModal/index.jsx';
import app from './firebase.js';


function App() {
  const [data, setData] = useState([]);
  const [selectedGhost, setSelectedGhost] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "ghost-stories"));
      setData(querySnapshot.docs.map(doc => doc.data()));
    }

    fetchData();
  }, [db])

  return (
    <div className="App" data-testid="app">
      <header className="App-header">
        <h1>Brighton Ghost Map</h1>
        <GhostMap ghosts={data} onGhostSelect={setSelectedGhost} data-testid="ghost-map" />
        {selectedGhost && (
          <GhostModal ghost={selectedGhost} onClose={() => setSelectedGhost(null)} />
        )}
      </header>
    </div >
  )
}

export default App;
