import React, { useEffect, useState } from 'react'

const SmallCrud = () => {
  const [inputitem, setInputitem] = useState("");
  const [item, setItem] = useState([]);
  const [newitem, setNewitem] = useState([]);
  const handleAdd = () => {
    setItem([...item, inputitem])
    setInputitem("")
  }
  const handleDeleted = (value) => {
    const filterData = item.filter((val) => val !== value)
    setItem(filterData)

  }
  const handleAddnew = (value) => {
    if (!newitem.includes(value)) {
      setNewitem([...newitem, value]); // Append to playing 11 list
    }
  }
  console.log("inputitem", newitem)

  return (
    <>
      <div>SmallCrud</div>
      <input onChange={(e) => setInputitem(e.target.value)} type='text' value={inputitem} />
      <button onClick={handleAdd}>Add</button>
      <h1>Master team</h1>
      <ui>
        {item.map((item) => {
          return (
            <>
              <li>{item}</li><button onClick={() => handleAddnew(item)}>Add</button><button onClick={() => handleDeleted(item)}>Delete</button>
            </>
          )
        })}
      </ui>
      <h1>Playnig 11</h1>
      <ui>
        {newitem?.map((item) => {
          return (
            <>
              <li>{item}</li></>
          )
        })}
      </ui>
    </>
  )
}

export default SmallCrud