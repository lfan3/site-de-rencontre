import React from 'react'
import Papa from 'papaparse'

export default function() {
  const [rows, setRows] = React.useState([])
  React.useEffect(() => {
    async function getData() {
      const response = await fetch('/data/nodes.csv')
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      setRows(rows)
    }
    getData()
  }, []) // [] means just do this once, after initial render
  return (
    <div className="app">
      <Table cols={tripColumns} rows={rows} />
    </div>
  )
}

//upload a fichier csv
class CSVFileUploader extends React.Component {
    handleFiles = (files) => {
        // Check for the various File API support.
        if (window.FileReader) {
            // FileReader are supported.
            this.getAsText(files[0]);
        }
    }

    getAsText(fileToRead) {
        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(fileToRead);
        // Handle errors load
        reader.onload = this.fileReadingFinished;
        reader.onerror = this.errorHandler;
    }

    processData(csv) {
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = allTextLines.map(data => data.split(';'))

        console.log(lines)
    }

    fileReadingFinished(event) {
        var csv = event.target.result;
        processData(csv);
    }

    errorHandler(event) {
        if (event.target.error.name === "NotReadableError") {
            alert("Cannot read file!");
        }
    }
    render() {
        return(
            <input 
                type="file" 
                onchange={ this.handleFiles }
                accept=".csv" 
            />
        )
    }
}

