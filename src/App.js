import React, { useRef, useState } from 'react'

const App = () => {
  const fname = useRef()
  const lname = useRef()
  const [data, setdata] = useState([])
  const [view, setview] = useState({})
  const [ind, setind] = useState({})
  const submit_handler = () => {
    const input = {
      fname: fname.current.value,
      lname: lname.current.value,
    }
    setdata([...data, input])
  }
  const delete_handler = (ind) => {
    data.splice(ind, 1)
    setdata([...data])
  }
  const update_input = (e) => {
    setview({ ...view, [e.target.name]: e.target.value })
    console.log(view)
  }
  const update_handler = () => {
    data.splice(ind, 1, view)
    setdata([...data])
  }
  return (
    <>
      <div>
        <label>fname</label>
        <input name="fname" ref={fname} />
        <label>lname</label>
        <input name="lname" ref={lname} />
        <button onClick={submit_handler}>submit</button>
      </div>
      <div>
        <label>fname</label>
        <input name="fname" value={view.fname} onChange={update_input} />
        <label>lname</label>
        <input name="lname" value={view.lname} onChange={update_input} />
        <button onClick={update_handler}>Update</button>
      </div>
      {
        data?.map((a, b, c) => {
          return (
            <>
              <h1>{a.fname}</h1>
              <h1>{a.lname}</h1>
              <button onClick={() => delete_handler(b)}>Delete</button>
              <button onClick={() => { setview(a); setind(b) }}>Change</button>
            </>
          )
        })
      }
    </>
  )
}

export default App