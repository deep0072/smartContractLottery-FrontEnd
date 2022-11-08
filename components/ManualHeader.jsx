
/*
Components are independent and reusable bits of code. 
They serve the same purpose as JavaScript functions, 
but work in isolation and return HTML. This is the function based compenent

*/
 // export default used to let  this component to be in other application or pages 
import {useMoralis} from "react-moralis" // to use moralis we need to wrapped it into moralis provider 
import {useEffect} from "react"

export default function ManualHeader (){
    const {enableWeb3,account, isWeb3Enabled,Moralis, deactivateWeb3,isWeb3EnableLoading} = useMoralis() // useMoralis() is hook used to change the state of variable and re render this change to front end
    // enableWeb3 ==> function to connect the wallet



    // this hook will clean the local storage after disconnecting account from metamask wallet
    // after disconnecting account whenver we refresh the page metmask wont pop up everytime
    useEffect(()=>{
        Moralis.onAccountChanged((account)=>{
            console.log(`account changes to ${account}`)

            if (account == null){ // when we 
                window.localStorage.removeItem("connected")
                deactivateWeb3() // this will set web3Enable to false
            }

        })

        

    })
    
    /*now after connecting to wallet when we refresh the site then browser forgot 

     that last status wallet connection status is true or false. so we have to click on button for connection

     to tackle this problem useeffect hooks will be used which will keep track of web3enabled status or not whenever page render

     useEffect takes to params one is function and 2nd one is optional dependcies array
     so it will perform function whenver some changes happens with array's  entity.and rerender the front end
     if we keep array blank then it will run only one time. other it will run every time whenver page refresh

    */
     useEffect(()=>{
    
        

        
        if (isWeb3Enabled) return // if web#enable true then return
        

        if (typeof window !== "undefined"){



            if (window.localStorage.getItem("connected")){ /* check last status of wallet is connected in local storage or  not if connected then run enableweb3
                                                              which will shows the connected status in front end. without manual clicking in metamask popup
                                                              enableweb3 only run 
                                                                  
                                                              */
                enableWeb3()
    
            }
        }

      
     }, [isWeb3Enabled]) // useeffect will run if "isWeb3Enabled" changes
 
    return(
        <div>

        {account ? (<div> connected {account}</div>) :(
                
                <button onClick = {async ()=>{await enableWeb3()
                
                                if (typeof window !== "undefined"){
                                    window.localStorage.setItem("connected", "injected") // here we are storing connection status in local storage
                                }
                
                
                }}
                
                disabled = {isWeb3EnableLoading} // this will disable the connect button during connection of wallet
                >
                    
                connect wallet
                </button>
                
            )}

            {console.log(isWeb3Enabled,"web3enabled")}
        </div>
        
    )

}