import { useEffect, useState } from 'react';
import './App.css';
import TravelMap from './components/TravelMap'
import { travelPoints } from './types/cities';
import { travelRoutes } from './types/routes';

import {
  getShortestByOrigin,
  getAllTrucks,
  getTravelsByTruckCode,
  getTravelingTrucks
} from './services/apiServices'

function App() {

  const [selectedByDestiny, setSelectedByDestiny] = useState(null)
  const [selectedTruckCode, setSelectedTruckCode] = useState(null)

  const [truckTravels, setTruckTravels] = useState(null);
  const [truckTravelsActive, setTruckTravelsActive] = useState(null);


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
    if (data !== null && data !== "")
      setSelectedByDestiny(e.target.value)
    else
      setSelectedByDestiny(null)
  }

  const handleOnChangeSelectTruck = (e) => {
    var data = e.target.value;
    console.log(data)
    if (data !== null && data !== "")
      setSelectedTruckCode(data)
    else
      setSelectedTruckCode(null)

  }

  const handleGetLastTravelsByTruckCode = async () => {
    setTruckTravels(null);
    if (selectedTruckCode == null) { return }
    const data = await getTravelsByTruckCode(selectedTruckCode);
    setTruckTravels(data);
    console.log(data);
  }

  const handleGetRoute = (locationId) => {
    console.log(locationId)
  }

  const handleGetTravelingTrucks = async () => {
    const data = await getTravelingTrucks(selectedTruckCode);
    setTruckTravelsActive(data);
    console.log(data)
  }

  const handleShowActiveRoute = (activeRoute) => {
    console.log(activeRoute)
  }

  const clearTruckSelection = () => {
    setSelectedTruckCode(null);
    setTruckTravels(null);
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
              <span className='w-[200px] align-middle p-2'>From : </span>
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
              <span className='w-[200px] align-middle p-2'>Trucks : </span>
              <select className='px-5 py-2 border w-[100%] mr-4' onChange={handleOnChangeSelectTruck}>
                <option value=''>SELECT..</option>
                {getTrucksOptions()}
              </select>
              <button className='bg-[#3086cc] p-1 w-20 rounded-md text-white	font-bold hover:bg-[#143f63]' onClick={handleGetLastTravelsByTruckCode}> Show </button>
              <button className='bg-[#3086cc] p-1 w-20 rounded-md text-white	font-bold hover:bg-[#143f63] ml-2' onClick={clearTruckSelection}> Clear </button>

            </div>
            <div>

              <table className='m-2 border w-[100%]'>
                <thead>
                  <tr>
                    <th className='border'>#</th>
                    <th className='border'>CODE</th>
                    <th className='border'>START DATE</th>
                    <th className='border'>END DATE</th>
                    <th className='border'>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {truckTravels != null &&
                    truckTravels.map((x, i) => {
                      return (<tr key={`truck-travel-row-${i}`} className='p-3'>
                        <td className='border text-center p-2'>{x.id}</td>
                        <td className='border text-center p-2'>{x.createdOn}</td>
                        <td className='border text-center p-2'>{x.finishedOn}</td>
                        <td className='border text-center p-2'>{x.location.name}</td>
                        <td className='border text-center p-2'>
                          {x.route.length === 0 &&
                            <>NO ROUTE</>
                          }
                          {x.route.length !== 0 &&
                            <button onClick={() => handleGetRoute(x.route)} className='bg-[#3086cc] p-1 rounded-md text-white	font-bold hover:bg-[#143f63]'>Get Route</button>
                          }
                        </td>
                      </tr>)
                    })
                  }
                  {truckTravels == null &&
                    <tr>
                      <td className='border text-center p-2' colSpan={5}>Please search a truck</td>
                    </tr>
                  }

                </tbody>
              </table>


            </div>
          </div>

          <div className='px-6 flex flex-col mt-5'>
            <span className='p-2'>Get Trucks Traveling</span>
            <div>
              <button className='bg-[#3086cc] p-1 w-[100px] h-[40px] rounded-md text-white	font-bold hover:bg-[#143f63]' onClick={handleGetTravelingTrucks}>Get</button>
            </div>
            <div>
              <table className='m-2 border w-[100%]'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>CODE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {truckTravelsActive !== null &&
                    truckTravelsActive.map((x, i) => {
                      return (<tr key={`active-travels-${i}`} className='p-3'>
                        <td className='border text-center p-2'>{i + 1}</td>
                        <td className='border text-center p-2'>{x.truck.code}</td>
                        <td className='border text-center p-2'>
                          <button className='bg-[#3086cc] p-1 w-[100px] h-[40px] rounded-md text-white	font-bold hover:bg-[#143f63]' onClick={()=>handleShowActiveRoute(x.route)}>Show Truck</button>
                        </td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>
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
