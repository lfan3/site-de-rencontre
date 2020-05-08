import React from 'react'
import {csv, dsv, json} from 'd3'


const CsvData = ()=>{
    
    React.useEffect(()=>{
        //json('app/dataCSV/arrondissements.json').then(data=>{
        //    console.log(data)
        //})
     
        csv('app/dataCSV/villes_france.csv').then(data=>{
            console.log(data[36011].OZAN)
            let temp = data.map(d=>d.OZAN)
        })
   
    }, [])
    return(
        <div>csv</div>
    )
}

export default CsvData