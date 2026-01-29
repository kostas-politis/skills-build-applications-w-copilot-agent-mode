import React, { useEffect, useState } from 'react'

import { buildEndpoint, TableView } from './_shared'

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const endpoint = buildEndpoint('leaderboard')

  function fetchData() {
    setLoading(true)
    console.log('Fetching Leaderboard from', endpoint)
    fetch(endpoint)
      .then((r) => r.json())
      .then((json) => {
        console.log('Leaderboard response:', json)
        let data = []
        if (Array.isArray(json)) data = json
        else if (json && Array.isArray(json.results)) data = json.results
        else if (json) data = [json]
        setItems(data)
        setError(null)
      })
      .catch((err) => {
        console.error('Leaderboard fetch error', err)
        setError(err)
        setItems([])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [endpoint])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h5">Leaderboard</h3>
        <div>
          <button className="btn btn-secondary me-2" onClick={fetchData}>Refresh</button>
          {loading && <span className="loading-spinner" />}
        </div>
      </div>
      {error && <div className="alert alert-danger">Error loading leaderboard</div>}
      <div className="card card-section p-3">
        <TableView items={items} />
      </div>
    </div>
  )
}
