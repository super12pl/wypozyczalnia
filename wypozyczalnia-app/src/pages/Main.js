import { use, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

function Main() {
  const navigate = useNavigate()
  const [samochody, setSamochody] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [sort, setSort] = useState("id")
  const [beingReserved, setReserved] = useState([-1,-1])
  const [reservationDisplay, setReservationDisplay] = useState("none")
  const [reservationStart,setReservationStart] = useState(new Date())
  const [reservationEnd,setReservationEnd] = useState(new Date())
  useEffect(() => {
    fetch("http://localhost/wypozyczalnia/").then(res => res.json()).then((result) => {
      setSamochody(result)
    })
  }, [loaded])

  function handle_sort(e) {
    setSort(e.target.value)
    samochody = samochody.sort((a, b) => {
      console.log([e.target.value], b[e.target.value])
      if (a[e.target.value] < b[e.target.value]) {
        return -1;
      }
    });
  }
  function make_reservation(id,idreal) {
    console.log(id)
    setReserved([id,idreal])
    setReservationDisplay("flex")

  }
  function reserve(){
    setReservationDisplay("none")
    fetch("http://localhost/wypozyczalnia/makereservation.php?auto="+beingReserved[1]+"&start="+reservationStart+"&end="+reservationEnd+"&klient="+Number(localStorage.getItem("klient"))).then(res => res.json()).then((result)=>{console.log(result)})
  }


  return (
    <div className="App">
      <div>
        <button onClick={() => navigate("/reservations")}>Moje rezerwacje</button>
        <button onClick={() => { localStorage.setItem("klient", null); navigate("/") }}>Wyloguj</button>
      </div>
      <div id='reservationModal' className='flexCol' style={{ display: reservationDisplay }}>
        <form action={reserve} className='flexCol' style={{width:"100%"}}>
          <h3>{beingReserved >-1 ? samochody[beingReserved].model : ""}</h3>
          <label>Data odbioru: <input type="datetime-local" onChange={(e)=>setReservationStart(e.target.value)}></input></label>
          <label>Data zwrotu: <input type="datetime-local" onChange={(e)=>setReservationEnd(e.target.value)}></input></label>
          <span>
            <button type="submit">Potwierdź</button>
            <button onClick={() => { setReserved(-1); setReservationDisplay("none") }}>Anuluj</button>
          </span>
        </form>


      </div>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Typ</th>
            <th>Ilość Miejsc</th>
            <th>Ilość Drzwi</th>
            <th>Skrzynia Biegów</th>
            <th>Klimatyzacja</th>
            <th>Cena</th>
            <th>Zarezerwuj</th>
          </tr>
        </thead>
        <tbody>
          {samochody.map((samochod,index) => (
            <tr key={index}>
              <td>{samochod.model}</td>
              <td>{samochod.typ}</td>
              <td>{samochod.ilosc_miejsc}</td>
              <td>{samochod.ilosc_drzwi}</td>
              <td>{samochod.skrzynia}</td>
              <td>{samochod.klimatyzacja}</td>
              <td>{samochod.cena}</td>
              <td><button onClick={() => make_reservation(index,samochod.id)}>Zarezerwuj</button></td>
            </tr>
          ))}
        </tbody>

      </table>

      <div>
        <div>Sortowanie</div>
        <select onChange={handle_sort}>
          <option value="id">id</option>
          <option value="model">model</option>
          <option value="typ">typ</option>
          <option value="ilosc_miejsc">ilość miejsc</option>
          <option value="ilosc_drzwi">ilość drzwi</option>
          <option value="skrzynia">skrzynia biegów</option>
          <option value="klimatyzacja">klimatyzacja</option>
          <option value="cena">cena</option>
        </select>
      </div>

    </div>
  );
}

export default Main;
