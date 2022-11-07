
/*
Components are independent and reusable bits of code. 
They serve the same purpose as JavaScript functions, 
but work in isolation and return HTML. This is the function based compenent

*/
 // export default used to let  this component to be in other application or pages 
import {useMoralis} from "react-moralis" // to use moralis we need to wrapped it into moralis provider 

export default function ManualHeader (){
    const {enableWeb3} = useMoralis() // useMoralis() is hook used to change the state of variable and re render this change to front end
    // enableWeb3 ==> function to connect the wallet

    return(<div> 
        
        <button onClick = {async ()=>{await enableWeb3()}}>connect wallet</button>
    </div>)

}