import { useEffect, useState } from 'react';
import './App.css';
import TravelMap from './components/TravelMap'
import { travelPoints } from './types/cities';
// import { travelRoutes } from './types/routes';

import { getShortestByOrigin, getAllTrucks , getTravelsByTruckCode } from './services/apiServices'

function App() {

  const [selectedByDestiny, setSelectedByDestiny] = useState(null)
  const [selectedTruckCode, setSelectedTruckCode] = useState(null)
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const data = await getAllTrucks();
      if (data) {
        setTrucks(data);
      }
    }

    fetchData()

  }, []);

  // var routes = travelRoutes.filter(x => x.originId == 1);
  var routes = []


  const getTrucksOptions = () => {
    if (trucks) {
      return trucks.map((x, i) => {
        return <option key={`truck${i}`} value={x.code}>{x.code}</option>
      })
    }
  }


  const handleSearchByDestiny = async () => {
    if (selectedByDestiny == null) {
      return
    }

    const data = await getShortestByOrigin(selectedByDestiny)
    console.log(data)
  }

  const handleSelectByDestinyChange = (e) => {
    var data = e.target.value;
    console.log(data)
    if (data != null && data != "")
      setSelectedByDestiny(e.target.value)
    else
      setSelectedByDestiny(null)
  }

  const handleOnChangeSelectTruck = (e) => {
    var data = e.target.value;
    console.log(data)
    if (data != null && data != "")
      setSelectedTruckCode(data)
    else
    setSelectedTruckCode(null)
    
  }

  const handleGetLastTravelsByTruckCode = async () => {
    if (selectedTruckCode == null) {
      return
    }

    const data = await getTravelsByTruckCode(selectedTruckCode);
    console.log(data);
  }

  return (
    <div className="flex w-full flex-col">
      <div className='w-[100%] text-center align-middle p-[20px] '>
        <span className='text-[30px] '>LOGISTONKS</span>
      </div>
      <div className='flex flex-row w-[100%]'>
        <div className='w-[50%]'>
          <div className='px-6 flex flex-col'>
            <span className='p-2'>Get shortest route by Origin Point</span>
            <div className='flex flex-row'>
              <span className='w-[80px] align-middle p-2'>From : </span>
              <select className='px-5 py-2 border w-[100%] mr-4' onChange={handleSelectByDestinyChange}>
                <option value=''>SELECT..</option>
                <option value='1'>CABA</option>
                <option value='2'>Cordoba</option>
                <option value='3'>Corrientes</option>
                <option value='4'>Formosa</option>
                <option value='5'>La Plata</option>
                <option value='6'>la Rioja</option>
                <option value='7'>Mendoza</option>
                <option value='8'>Neuquen</option>
              </select>

              <button className='bg-[#3086cc] p-1 w-20 rounded-md text-white	font-bold hover:bg-[#143f63]' onClick={handleSearchByDestiny}> Show </button>
            </div>
          </div>
          <div className='px-6 flex flex-col mt-5'>
            <span>Get Lastest travels by Truck Code</span>
            <div className='flex flex-row'>
              <span className='w-[80px] align-middle p-2'>Trucks : </span>
              <select className='px-5 py-2 border w-[100%] mr-4' onChange={handleOnChangeSelectTruck}>
                {getTrucksOptions()}
              </select>
              <button className='bg-[#3086cc] p-1 w-20 rounded-md text-white	font-bold hover:bg-[#143f63]' onClick={handleGetLastTravelsByTruckCode}> Show </button>
            </div>
          </div>
        </div>
        <div className='w-[50%]'>
          <TravelMap travelPoints={travelPoints} travelRoutes={routes} />
        </div>
      </div>
    </div>
  );
}

export default App;
