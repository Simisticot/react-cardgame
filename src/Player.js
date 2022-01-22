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

        return () => {
            clearInterval(damageInterval);
            console.log("use return");
        };
    }, [dps]);

    const play = () => {
        setDps(prevDps => (prevDps+600));
    }


    
    return ( 
        <tr>
            <td>Aquila</td>
            <td>DRG</td>
            <td>{ dps }</td>
            <td>{ damage }</td>
            <td><button onClick={ play }>Play</button></td>
        </tr>
     );
}
 
export default Player;