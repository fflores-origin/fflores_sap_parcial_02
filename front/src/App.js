import { useEffect, useState } from 'react';
import './App.css';
import TravelMap from './components/TravelMap'
import LineHorizontal from './components/LineHorizontal'
import { travelPoints } from './types/cities';
import { travelRoutes } from './types/routes';

import {
  getShortestByOrigin,
  getAllTrucks,
  getTravelsByTruckCode,
  getTravelingTrucks
} from './services/apiServices'
import { deepClone } from './utils/objectClone';

function App() {

  const [selectedByDestiny, setSelectedByDestiny] = useState('')
  const [selectedTruckCode, setSelectedTruckCode] = useState('')

  const [truckTravels, setTruckTravels] = useState(null);
  const [truckTravelsActive, setTruckTravelsActive] = useState(null);

  const [routeToShow, setRoutesToShow] = useState([]);


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

  const clearRoute = () => {
    setRoutesToShow([]);
  }

  const getTrucksOptions = () => {
    if (trucks) {
      return trucks.map((x, i) => {
        return <option key={`truck${i}`} value={x.code}>{x.code}</option>
      })
    }
  }

  const mapRoute = (listIdsLocation) => {
    const items = listIdsLocation;
    let routes = [];
    for (let index = 0; index < items.length; index++) {
      const d = items[index];
      if (index !== items.length - 1) {
        const n = items[index + 1]
        var route = travelRoutes.find(x => x.originId === d && x.destinyId === n);
        routes.push(route);
      }
    }

    if (routes.length !== 0) {
      setRoutesToShow(routes)
    }

    return routes;

  }


  const handleSearchByDestiny = async () => {
    if (selectedByDestiny == null) {
      return
    }

    const data = await getShortestByOrigin(selectedByDestiny)

    if (data && data.shortestRoute && data.shortestRoute.length !== 0) {
      const items = data.shortestRoute;
      mapRoute(items)
    }
  }

  const handleSelectByDestinyChange = (e) => {
    var data = e.target.value;
    if (data !== null && data !== "")
      setSelectedByDestiny(e.target.value)
    else
      setSelectedByDestiny(null)
  }

  const handleOnChangeSelectTruck = (e) => {
    clearRoute();
    var data = e.target.value;
    if (data !== null && data !== "")
      setSelectedTruckCode(data)
    else
      setSelectedTruckCode(null)

  }

  const handleGetLastTravelsByTruckCode = async () => {
    setTruckTravels(null);
    clearRoute();
    if (selectedTruckCode == null) { return }
    const data = await getTravelsByTruckCode(selectedTruckCode);
    setTruckTravels(data);
    console.log(data);
  }

  const handleGetRoute = (route) => {
    clearRoute()
    const data = route.map(x => x.locationId)
    mapRoute(data);

  }

  const handleGetTravelingTrucks = async () => {
    clearRoute()
    const data = await getTravelingTrucks(selectedTruckCode);
    setTruckTravelsActive(data);
    console.log(data)
  }

  const handleShowActiveRoute = (activeRoute) => {
    clearRoute()
    if (!activeRoute) return;
    let routes = [];

    for (let index = 0; index < activeRoute.length; index++) {
      const d = activeRoute[index];
      let isActual = d.actual === true

      if (index !== activeRoute.length - 1) {
        const n = activeRoute[index + 1]
        var original = travelRoutes.find(x => x.originId === d.locationId && x.destinyId === n.locationId);

        const route = deepClone(original)
        route.color = 'green'

        if (isActual)
          route.color = 'red'

        routes.push(route);
      }
    }

    if (routes.length !== 0) {
      setRoutesToShow(routes)
    }

  }

  const clearTruckSelection = () => {
    clearRoute();
    setSelectedTruckCode('');
    setTruckTravels(null);
  }

  const clearDetination = () => {
    clearRoute();
    setSelectedByDestiny('');
  }

  const getStatus = (date) => {

    if (date == null) {
      return <div className='p-1 bg-green-500 rounded-sm text-gray-50'>ON TRAVEL</div>
    }

    return (<div className='p-1 bg-violet-500 rounded-sm text-gray-50'>FINISHED</div>)
  }

  return (
    <div className="flex w-full flex-col">
      <div className='w-[100%] text-center align-middle p-[20px] bg-black '>
        <span className='text-[30px] text-white font-bold tracking-widest'>LOGISTONKS</span>
      </div>
      <div className='flex flex-row w-[100%]'>
        <div className='w-[50%]'>

          <div className='px-6 flex flex-col'>
            <span className='p-2 font-bold underline'>Get shortest route by Origin Point</span>
            <div className='flex flex-row'>
              <span className='w-[200px] align-middle p-2'>From : </span>
              <select className='px-5 py-2 border w-[100%] mr-4' value={selectedByDestiny} onChange={handleSelectByDestinyChange} id='select-by-destiny'>
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
              <button className='bg-[#3086cc] p-1 w-20 rounded-md text-white	font-bold hover:bg-[#143f63] ml-2' onClick={clearDetination}> Clear </button>
            </div>
          </div>

          <LineHorizontal />

          <div className='px-6 flex flex-col mt-5'>
            <span className='mb-3 font-bold underline'>Get Lastest travels by Truck Code</span>
            <div className='flex flex-row'>
              <span className='w-[200px] align-middle p-2'>Trucks : </span>
              <select className='px-5 py-2 border w-[100%] mr-4' value={selectedTruckCode} onChange={handleOnChangeSelectTruck} id='select-by-code'>
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
                    <th className='border'>START DATE</th>
                    <th className='border'>END DATE</th>
                    <th className='border'>INITIAL LOCATION</th>
                    <th className='border'>STATUS</th>
                    <th className='border'>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {truckTravels != null &&
                    truckTravels.map((x, i) => {
                      return (<tr key={`truck-travel-row-${i}`} className='p-3'>
                        <td className='border text-center p-2'>{i + 1}</td>
                        <td className='border text-center p-2'>{x.createdOn}</td>
                        <td className='border text-center p-2'>{x.finishedOn}</td>
                        <td className='border text-center p-2'>{x.location.name}</td>
                        <td className='border text-center p-2'>{getStatus(x.finishedOn)}</td>
                        <td className='border text-center p-2'>
                          {x.route.length === 0 &&
                            <>No Available</>
                          }
                          {x.route.length !== 0 &&
                            <button onClick={() => handleGetRoute(x.route)} className='bg-[#3086cc] p-1 rounded-md text-white	font-bold hover:bg-[#143f63]'>Get Route</button>
                          }
                        </td>
                      </tr>)
                    })
                  }
                  {truckTravels !== null && truckTravels.length === 0 &&
                    <tr>
                      <td className='border text-center p-2' colSpan={6}>No travels to display</td>
                    </tr>
                  }
                  {truckTravels == null &&
                    <tr>
                      <td className='border text-center p-2' colSpan={6}>Please search a truck by its code</td>
                    </tr>
                  }

                </tbody>
              </table>


            </div>
          </div>

          <LineHorizontal />

          <div className='px-6 flex flex-col mt-5'>
            <span className='p-2 font-bold underline'>Get Trucks Traveling</span>
            <div className='mb-3 ml-5'>
              <span className='font-bold'>REFERENCES: </span><br />
              <div className='flex flex-row align-middle'>
                <span className='w-[120px] border p-2'>Actual Step : </span><div className='h-3 w-10 bg-[red] mt-4 mx-4'></div>
              </div>
              <div className='flex flex-row align-middle'>
                <span className='w-[120px] border p-2'>Route Step :</span><div className='h-3 w-10 bg-[green] my-4 mx-4'></div>
              </div>
            </div>
            <div>
              <button className='bg-[#3086cc] p-1 w-[100px] h-[40px] ml-4 rounded-md text-white	font-bold hover:bg-[#143f63]' onClick={handleGetTravelingTrucks}>Get Trucks</button>
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
                          <button className='bg-[#3086cc] p-1 w-[100px] h-[40px] rounded-md text-white	font-bold hover:bg-[#143f63]' onClick={() => handleShowActiveRoute(x.route)}>Show Truck</button>
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
          <TravelMap travelPoints={travelPoints} travelRoutes={routeToShow} />
        </div>
      </div>
    </div>
  );
}

export default App;
