import { useState, useEffect } from "react";
const Player = () => {
    let damageInterval = 0;
    const [dps, setDps] = useState(6000);
    const [damage, setDamage] = useState(0);

    useEffect(() => {
        console.log("effect");
        const damageInterval = setInterval(() => {
            console.log("update");
            setDamage(prevDamage => (prevDamage+dps));
        }, 1000);

        return () => clearInterval(damageInterval);
    }, [dps]);


    
    return ( 
        <tr>
            <td>Aquila</td>
            <td>DRG</td>
            <td>6000</td>
            <td>{ damage }</td>
            <td><button>Play</button></td>
        </tr>
     );
}
 
export default Player;