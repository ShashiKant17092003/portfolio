import { useState, useRef, useEffect } from 'react';


const UrlShortner = () => {
    const [url,setUrl] = useState('');
    const [subtitle,setSubtitle] = useState('');
    const [ourl,setOUrl] = useState('');
  
  
    function fun(uri,sub){
      fetch(`https://s.squizee.in/short/formResponse?url=${uri}&email=&format=json&suffix=${sub}`).then((res)=>{
        return res.json();
      }).then((data)=>{
        setUrl(data.shortened_url);
      })
    }
  
    useEffect(()=>{
      if(ourl){
        fun(ourl,subtitle);
      }
    },[subtitle,ourl])
  
    const select = useRef(null);
  
    const copyPassword = () => {
      window.navigator.clipboard.writeText(url);
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
          <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-bgDark text-blue-500'>
            <h1 className='text-white text-center my-3 text-3xl bg-bgDark'>URL Shortner</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input type="text"  className='outline-none w-full py-1 px-3' placeholder="your name or subtitle" value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} />
            </div>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input type="text"  className='outline-none w-full py-1 px-3' placeholder="your url" value={ourl} onChange={(e)=>setOUrl(e.target.value)} />
            </div>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input type="text" value={url} className='outline-none w-full py-1 px-3 text-green-500' placeholder="shortened url" readOnly ref={select}/>
              <button onClick={copyPassword} className='c-btn outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0'>Copy</button>
            </div>
          </div>
    )
}

export default UrlShortner
