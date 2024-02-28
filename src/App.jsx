import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  // useRef hook;
  let passwordRef = useRef(); 
  
  // useCallback hook;
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*_-+=`~';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  // Copy to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password);
  },[password])

  // useEffect hook;
  useEffect(() => passwordGenerator(), [length, numAllowed, charAllowed, setPassword])

  return (
    <>
      {/* main Container */}
      <div className='h-screen w-full relative bg-black overflow-hidden'>

        {/* Section */}
        <div className='mt-16 h-fit w-1/2 absolute left-1/2 -translate-x-1/2 p-5 bg-slate-900 rounded-2xl'>
          <h1 className="text-center text-white text-2xl font-semibold uppercase mb-4">Password Generator</h1>

          <div className='w-full h-12 rounded-2xl overflow-hidden mb-6'>

            {/* Password Box */}
            <input className='w-[85%] px-4 selection:bg-black selection:text-white outline-none py-3 text-orange-500 font-semibold text-xl' value={password} type="text" placeholder="Password" readOnly ref={passwordRef}/>

            {/* copy button */}
            <button onClick={copyPasswordToClipboard} className='w-[15%] p-4 outline-none font-semibold text-white bg-blue-800'>Copy</button>

          </div>

          <div className='text-orange-500 flex items-center gap-2 text-lg'>
            <input onChange={(e) => setLength(e.target.value)} type="range" min={6} max={100} className='cursor-pointer' />
            <label htmlFor="length">Length: {length}</label>

            <input onChange={() => setNumAllowed(preValue => !preValue)} type="checkbox" id='num' name='num' className='cursor-pointer' />
            <label htmlFor="num">Numbers</label>

            <input onChange={() => setCharAllowed(preValue => !preValue)} type="checkbox" id='char' className='cursor-pointer' />
            <label htmlFor="char">Characters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
