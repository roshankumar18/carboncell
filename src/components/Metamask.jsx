import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Web3 from 'web3';

const Metamask = () => {
    const [connectedAccount, setConnectedAccount] = useState(false) 
    useEffect(()=>{
      if(sessionStorage.getItem('metamask')){
        JSON.parse(sessionStorage.getItem('metamask'))?setConnectedAccount(true):setConnectedAccount(false)
      }
    },[])
    async function connectMetamask() {
        //check metamask is installed
        if(connectedAccount){
            toast.success('Already connected')
            return
        }
        if (window.ethereum) {
            try{
                const web3 = new Web3(window.ethereum);
    
                //request user to connect accounts (Metamask will prompt)
                await window.ethereum.request({ method: 'eth_requestAccounts' });
          
                //get the connected accounts
                const accounts = await web3.eth.getAccounts();
  
                //show the first connected account in the react page
                setConnectedAccount(true);
                sessionStorage.setItem('metamask',JSON.stringify(true))
                toast.success('Successfully connected')
            }catch(error){
              setConnectedAccount(false)
              if(error.code===4001){
                toast.error('Extension Closed')
              }else{
                toast.error('Login in process. Please wait')
              }
               
            }
         

        } else {
          toast.error('Please download metamask to connect')
        }
      }

  return (
    <div className='overflow-hidden flex flex-1 sm:max-w-fit gap-2 pt-12'>
    {/* Button to trigger Metamask connection */}
    <button className='bg-primary text-white font-medium rounded-md w-fit h-fit p-4' 
    onClick={connectMetamask}>
      {connectedAccount ?'Metamask Connected':'Connect to Metamask'}
      
      </button>


    </div>
  )
}

export default Metamask