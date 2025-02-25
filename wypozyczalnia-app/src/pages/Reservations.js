import { useEffect, useState } from 'react';
import '../App.css';

function Main() {
  const navigate = useNavigate()
  var [samochody,setSamochody] = useState([])
  const [loaded,setLoaded] = useState(false)
  const [sort,setSort] = useState("id")
  useEffect(()=>{
    fetch("http://localhost/wypozyczalnia/reservations.php?klient=0").then(res => res.json()).then((result)=>{
      setSamochody(result)
    })
  },[loaded])
  

  return (
    <div className="App">
      <h1>Rezerwacje</h1>
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
          </tr>
          </thead>
          <tbody>
          {samochody.map(samochod =>(
            <tr key={samochod.id}>
              <td>{samochod.model}</td>
              <td>{samochod.typ}</td> 
              <td>{samochod.ilosc_miejsc}</td> 
              <td>{samochod.ilosc_drzwi}</td> 
              <td>{samochod.skrzynia}</td> 
              <td>{samochod.klimatyzacja}</td>
              <td>{samochod.cena}</td> 
            </tr>
          ))}
          </tbody>
         
        </table>

    </div>
  );
}

export default Main;
