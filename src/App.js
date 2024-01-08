import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [listCards, setListCards] = useState([]);
  const [listCardsUsed, setListCardsUsed] = useState([]);
  const [listHisOfCard, setListHisOfCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [totalCarsIn, setTotalCarsIn] = useState(0);
  const [totalCarsOut, setTotalCarsOut] = useState(0);
  const [totalCarsInParking, setTotalCarsInParking] = useState(0);

  useEffect(() => {
    const getAllCards = async() =>{
      const res = axios.get('');
      console.log(res.data);
      setListCards(res.data);
    }
    
    const getAllCardsUsed = async() => {
      const res = axios.get('');
      console.log(res.data);
      setListCardsUsed(res.data);
    }

    getAllCards();
    getAllCardsUsed();
  },[]);

  useEffect(() => {
    const getListHis = async(cardId) => {
      const res = axios.get('', {params: {cardId}});
      console.log(res.data);
      setListHisOfCard(res.data);
    }

    if(selectedCard) getListHis(selectedCard); 
  },[selectedCard]);

  useEffect(() => {
    const getInfo = async (cardId) => {
      try {
        const res = await axios.get('YOUR_API_ENDPOINT');
        const { totalCarsIn, totalCarsOut, totalCarsInParking } = res.data;

        // Cập nhật giá trị state
        setTotalCarsIn(totalCarsIn);
        setTotalCarsOut(totalCarsOut);
        setTotalCarsInParking(totalCarsInParking);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Gọi hàm getInfo
    getInfo();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
      <div>
          <h2>Tổng số xe vào:{totalCarsIn} </h2>
          <h2>Tổng số xe ra: {totalCarsOut}</h2>
          <h2>Tổng số xe trong bãi:{totalCarsInParking}</h2>

          
        </div>
        <div>
          <h2>Danh sách tất cả các xe: </h2>
          {listCards.map((item,index) => (<div onClick={() => setSelectedCard(item.cardId)}> {item}</div>))}
        </div>

        <div>
          <h2>Danh sách các xe trong bãi: </h2>
          {listCardsUsed.map((item,index) => (<div>{item}</div>))}
        </div>

        <div>
          <h2>Lịch sử: </h2>
          {listHisOfCard.map((item,index) => (<div>{item}</div>))}
        </div>

          
      </header>
    </div>
  );
}

export default App;
