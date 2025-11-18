import { useState, useCallback, useEffect, useRef } from "react";

const Password = () => {
    const [length, setLength] = useState(8);
    const [num, setNum] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [passwd, setPasswd] = useState('');
  
    const generatePassword = useCallback(() => {
      let pass = '';
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (num) str += "0123456789";
      if (symbols) str += "!@#$%^&*()_=[]/<>?:~*-+";
  
      for (let i = 0; i < length; i++) {
        const char = str.charAt(Math.floor(Math.random() * str.length));
        pass += char;
      }
      setPasswd(pass);
    }, [length, num, symbols]);
  
    useEffect(() => {
      generatePassword();
    }, [length, num, symbols, generatePassword]);
  
    const select = useRef(null);
  
    const copyPassword = () => {
      window.navigator.clipboard.writeText(passwd);
      const copyButton = document.querySelector('.c-btn');
      copyButton.classList.add('bg-color');
      copyButton.classList.add('text-black');
      copyButton.classList.remove('bg-blue-800');
      copyButton.innerHTML = "Done"
      select.current.select();
      setTimeout(() => {
        copyButton.classList.remove('bg-color');
        copyButton.classList.remove('text-black');
        copyButton.classList.add('bg-blue-800');
        copyButton.classList.add('text-white');
        copyButton.innerHTML = "Copy"
        select.current.setSelectionRange(0,0);
        }, 2000);
    };
  
    return (
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-bgDark text-orange-500'>
        <h1 className='text-white text-center my-3 bg-bgDark text-3xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={passwd} className='outline-none w-full py-1 px-3 bg-bgDark2' placeholder="Password" readOnly ref={select}/>
          <button onClick={copyPassword} className='c-btn outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 bg-bgDark'>
          <div className='flex items-center gap-x-1 bg-bgDark'>
            <input type="range" min={6} max={50} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)} />
            <label htmlFor="Length" className='bg-bgDark'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 bg-bgDark'>
            <input type="checkbox" checked={num} onChange={() => setNum((prev) => !prev)} />
            <label htmlFor="Numbers" className='bg-bgDark'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 bg-bgDark'>
            <input type="checkbox" checked={symbols} onChange={() => setSymbols((prev) => !prev)} />
            <label htmlFor="Characters" className='bg-bgDark'>Symbols</label>
          </div>
        </div>
      </div>
    );
}

export default Password
