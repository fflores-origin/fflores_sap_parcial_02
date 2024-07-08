export const travelRoutes = [
    // CABA
    { originId:1, destinyId:2, coordinates: [[-34.603722, -58.381592], [-31.420083, -64.188776]], color: 'red', description: 'CABA to Córdoba' },
    { originId:1, destinyId:3, coordinates: [[-34.603722, -58.381592], [-27.469161, -58.830974]], color: 'blue', description: 'CABA to Corrientes' },
    { originId:1, destinyId:4, coordinates: [[-34.603722, -58.381592], [-26.184891, -58.173134]], color: 'green', description: 'CABA to Formosa' },
    { originId:1, destinyId:5, coordinates: [[-34.603722, -58.381592], [-34.921450, -57.954530]], color: 'orange', description: 'CABA to La Plata' },
    { originId:1, destinyId:6, coordinates: [[-34.603722, -58.381592], [-29.413463, -66.856460]], color: 'purple', description: 'CABA to La Rioja' },
    { originId:1, destinyId:7, coordinates: [[-34.603722, -58.381592], [-32.889458, -68.845838]], color: 'cyan', description: 'CABA to Mendoza' },
    { originId:1, destinyId:8, coordinates: [[-34.603722, -58.381592], [-38.951611, -68.059097]], color: 'magenta', description: 'CABA to Neuquen' },
    
    // Córdoba
    { originId:2, destinyId:1, coordinates: [[-31.420083, -64.188776], [-34.603722, -58.381592]], color: 'red', description: 'Córdoba to CABA' },
    { originId:2, destinyId:3, coordinates: [[-31.420083, -64.188776], [-27.469161, -58.830974]], color: 'blue', description: 'Córdoba to Corrientes' },
    { originId:2, destinyId:4, coordinates: [[-31.420083, -64.188776], [-26.184891, -58.173134]], color: 'green', description: 'Córdoba to Formosa' },
    { originId:2, destinyId:5, coordinates: [[-31.420083, -64.188776], [-34.921450, -57.954530]], color: 'orange', description: 'Córdoba to La Plata' },
    { originId:2, destinyId:6, coordinates: [[-31.420083, -64.188776], [-29.413463, -66.856460]], color: 'purple', description: 'Córdoba to La Rioja' },
    { originId:2, destinyId:7, coordinates: [[-31.420083, -64.188776], [-32.889458, -68.845838]], color: 'cyan', description: 'Córdoba to Mendoza' },
    { originId:2, destinyId:8, coordinates: [[-31.420083, -64.188776], [-38.951611, -68.059097]], color: 'magenta', description: 'Córdoba to Neuquen' },
    
    // Corrientes
    { originId:3, destinyId:1, coordinates: [[-27.469161, -58.830974], [-34.603722, -58.381592]], color: 'red', description: 'Corrientes to CABA' },
    { originId:3, destinyId:2, coordinates: [[-27.469161, -58.830974], [-31.420083, -64.188776]], color: 'blue', description: 'Corrientes to Córdoba' },
    { originId:3, destinyId:4, coordinates: [[-27.469161, -58.830974], [-26.184891, -58.173134]], color: 'green', description: 'Corrientes to Formosa' },
    { originId:3, destinyId:5, coordinates: [[-27.469161, -58.830974], [-34.921450, -57.954530]], color: 'orange', description: 'Corrientes to La Plata' },
    { originId:3, destinyId:6, coordinates: [[-27.469161, -58.830974], [-29.413463, -66.856460]], color: 'purple', description: 'Corrientes to La Rioja' },
    { originId:3, destinyId:7, coordinates: [[-27.469161, -58.830974], [-32.889458, -68.845838]], color: 'cyan', description: 'Corrientes to Mendoza' },
    { originId:3, destinyId:8, coordinates: [[-27.469161, -58.830974], [-38.951611, -68.059097]], color: 'magenta', description: 'Corrientes to Neuquen' },
    
    // Formosa
    { originId:4, destinyId:1 , coordinates: [[-26.184891, -58.173134], [-34.603722, -58.381592]], color: 'red', description: 'Formosa to CABA' },
    { originId:4, destinyId:2 , coordinates: [[-26.184891, -58.173134], [-31.420083, -64.188776]], color: 'blue', description: 'Formosa to Córdoba' },
    { originId:4, destinyId:3 , coordinates: [[-26.184891, -58.173134], [-27.469161, -58.830974]], color: 'green', description: 'Formosa to Corrientes' },
    { originId:4, destinyId:5 , coordinates: [[-26.184891, -58.173134], [-34.921450, -57.954530]], color: 'orange', description: 'Formosa to La Plata' },
    { originId:4, destinyId:6 , coordinates: [[-26.184891, -58.173134], [-29.413463, -66.856460]], color: 'purple', description: 'Formosa to La Rioja' },
    { originId:4, destinyId:7 , coordinates: [[-26.184891, -58.173134], [-32.889458, -68.845838]], color: 'cyan', description: 'Formosa to Mendoza' },
    { originId:4, destinyId:8 , coordinates: [[-26.184891, -58.173134], [-38.951611, -68.059097]], color: 'magenta', description: 'Formosa to Neuquen' },
    
    // La Plata
    { originId:5, destinyId:1, coordinates: [[-34.921450, -57.954530], [-34.603722, -58.381592]], color: 'red', description: 'La Plata to CABA' },
    { originId:5, destinyId:2, coordinates: [[-34.921450, -57.954530], [-31.420083, -64.188776]], color: 'blue', description: 'La Plata to Córdoba' },
    { originId:5, destinyId:3, coordinates: [[-34.921450, -57.954530], [-27.469161, -58.830974]], color: 'green', description: 'La Plata to Corrientes' },
    { originId:5, destinyId:4, coordinates: [[-34.921450, -57.954530], [-26.184891, -58.173134]], color: 'orange', description: 'La Plata to Formosa' },
    { originId:5, destinyId:6, coordinates: [[-34.921450, -57.954530], [-29.413463, -66.856460]], color: 'purple', description: 'La Plata to La Rioja' },
    { originId:5, destinyId:7, coordinates: [[-34.921450, -57.954530], [-32.889458, -68.845838]], color: 'cyan', description: 'La Plata to Mendoza' },
    { originId:5, destinyId:8, coordinates: [[-34.921450, -57.954530], [-38.951611, -68.059097]], color: 'magenta', description: 'La Plata to Neuquen' },
    
    // La Rioja
    { originId:6, destinyId:1, coordinates: [[-29.413463, -66.856460], [-34.603722, -58.381592]], color: 'red', description: 'La Rioja to CABA' },
    { originId:6, destinyId:2, coordinates: [[-29.413463, -66.856460], [-31.420083, -64.188776]], color: 'blue', description: 'La Rioja to Córdoba' },
    { originId:6, destinyId:3, coordinates: [[-29.413463, -66.856460], [-27.469161, -58.830974]], color: 'green', description: 'La Rioja to Corrientes' },
    { originId:6, destinyId:4, coordinates: [[-29.413463, -66.856460], [-26.184891, -58.173134]], color: 'orange', description: 'La Rioja to Formosa' },
    { originId:6, destinyId:5, coordinates: [[-29.413463, -66.856460], [-34.921450, -57.954530]], color: 'purple', description: 'La Rioja to La Plata' },
    { originId:6, destinyId:7, coordinates: [[-29.413463, -66.856460], [-32.889458, -68.845838]], color: 'cyan', description: 'La Rioja to Mendoza' },
    { originId:6, destinyId:8, coordinates: [[-29.413463, -66.856460], [-38.951611, -68.059097]], color: 'magenta', description: 'La Rioja to Neuquen' },
    
    // Mendoza
    { originId:7, destinyId:1, coordinates: [[-32.889458, -68.845838], [-34.603722, -58.381592]], color: 'red', description: 'Mendoza to CABA' },
    { originId:7, destinyId:2, coordinates: [[-32.889458, -68.845838], [-31.420083, -64.188776]], color: 'blue', description: 'Mendoza to Córdoba' },
    { originId:7, destinyId:3, coordinates: [[-32.889458, -68.845838], [-27.469161, -58.830974]], color: 'green', description: 'Mendoza to Corrientes' },
    { originId:7, destinyId:4, coordinates: [[-32.889458, -68.845838], [-26.184891, -58.173134]], color: 'orange', description: 'Mendoza to Formosa' },
    { originId:7, destinyId:5, coordinates: [[-32.889458, -68.845838], [-34.921450, -57.954530]], color: 'purple', description: 'Mendoza to La Plata' },
    { originId:7, destinyId:6, coordinates: [[-32.889458, -68.845838], [-29.413463, -66.856460]], color: 'cyan', description: 'Mendoza to La Rioja' },
    { originId:7, destinyId:8, coordinates: [[-32.889458, -68.845838], [-38.951611, -68.059097]], color: 'magenta', description: 'Mendoza to Neuquen' },
    
    // Neuquen
    { originId:8, destinyId:1, coordinates: [[-38.951611, -68.059097], [-34.603722, -58.381592]], color: 'red', description: 'Neuquen to CABA' },
    { originId:8, destinyId:2, coordinates: [[-38.951611, -68.059097], [-31.420083, -64.188776]], color: 'blue', description: 'Neuquen to Córdoba' },
    { originId:8, destinyId:3, coordinates: [[-38.951611, -68.059097], [-27.469161, -58.830974]], color: 'green', description: 'Neuquen to Corrientes' },
    { originId:8, destinyId:4, coordinates: [[-38.951611, -68.059097], [-26.184891, -58.173134]], color: 'orange', description: 'Neuquen to Formosa' },
    { originId:8, destinyId:5, coordinates: [[-38.951611, -68.059097], [-34.921450, -57.954530]], color: 'purple', description: 'Neuquen to La Plata' },
    { originId:8, destinyId:6, coordinates: [[-38.951611, -68.059097], [-29.413463, -66.856460]], color: 'cyan', description: 'Neuquen to La Rioja' },
    { originId:8, destinyId:7, coordinates: [[-38.951611, -68.059097], [-32.889458, -68.845838]], color: 'magenta', description: 'Neuquen to Mendoza' }
  ];