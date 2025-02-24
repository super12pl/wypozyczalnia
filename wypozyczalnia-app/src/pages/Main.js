import { useEffect, useState } from 'react';
import '../App.css';

function Main() {
  var [samochody,setSamochody] = useState([])
  const [loaded,setLoaded] = useState(false)
  const [sort,setSort] = useState("id")
  useEffect(()=>{
    fetch("http://localhost/wypozyczalnia/").then(res => res.json()).then((result)=>{
      setSamochody(result)
    })
  },[loaded])
  
  function handle_sort(e){
    setSort(e.target.value)
    samochody = samochody.sort((a,b) => {
      console.log([e.target.value], b[e.target.value])
      if(a[e.target.value] < b[e.target.value]){
        return -1;
      }
    });
  }
  

  return (
    <div className="App">
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

        <div>
            <div>Sortowanie</div>
            <select onChange={handle_sort}>
                <option value = "id">id</option>
                <option value = "model">model</option>
                <option value = "typ">typ</option>
                <option value = "ilosc_miejsc">ilość miejsc</option>
                <option value = "ilosc_drzwi">ilość drzwi</option>
                <option value = "skrzynia">skrzynia biegów</option>
                <option value = "klimatyzacja">klimatyzacja</option>
                <option value = "cena">cena</option>
            </select>
        </div>

    </div>
  );
}

export default Main;
