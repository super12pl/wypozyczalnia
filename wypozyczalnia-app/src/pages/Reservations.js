import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

function Reservations() {
  const navigate = useNavigate()
  var [rezerwacje, setRezerwacje] = useState([])
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    fetch("http://localhost/wypozyczalnia/reservations.php?klient="+localStorage.getItem("klient")).then(res => res.json()).then((result) => {
      setRezerwacje(result)
    })
  }, [loaded])


  return (
    <div className="App">
      <button onClick={()=>navigate("/main")}>Wróć</button>
      <h1>Rezerwacje</h1>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Data Odbioru</th>
            <th>Data Zwrotu</th>
          </tr>
        </thead>
        <tbody>
          {rezerwacje.map(rezerwacja => (
            <tr key={rezerwacja.id}>
              <td>{rezerwacja.model}</td>
              <td>{rezerwacja.data_odbioru}</td>
              <td>{rezerwacja.data_zwrotu}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Reservations;
