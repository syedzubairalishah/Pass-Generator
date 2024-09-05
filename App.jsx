import { useState,useCallback,useEffect,useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  
  const passGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (number) str += "!@#$%^&*()_+{}[]~`"
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,number,character,setPassword])
  
  useEffect(()=>{passGenerator()},[length,setNumber,setCharacter,passGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-5 my-10 text-red-500 bg-gray-800'>
        <h1 className='text-white text-center my-5'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input type="text" 
          value={password} 
          className='outline-none w-full py-1 px-2' 
          placeholder='Password' 
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='text-black outline-none px-5 py-2 shrink-0 rounded-full bg-blue-500'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={number}
            id='numberInput'
            onChange={()=>{setNumber((prev)=>!prev)}}
            />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={number}
            id='numberInput'
            onChange={()=>{setCharacter((prev)=>!prev)}}
            />
            <label>Characters</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
