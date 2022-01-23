import { useState, useEffect } from "react";
const Player = (props) => {
    let damageInterval = 0;
    const [dps, setDps] = useState(6000);
    const [damage, setDamage] = useState(0);
    const [balance, setBalance] = useState(false);
    const [arrow, setArrow] = useState(false);
    const [spear, setSpear] = useState(false);

    let balanceTimeout = 0;

    useEffect(() => {
        console.log("effect");
        const damageInterval = setInterval(() => {
            setDamage(prevDamage => (prevDamage+dps));
        }, 1000);

        return () => {
            clearInterval(damageInterval);
            console.log("use return");
        };
    }, [dps]);

    const endBalance = () => {
        setBalance(false);
        balanceTimeout = 0;
        updateDps();
    }

    const play = () => {
        props.discardDrawn();
        switch (props.drawn.name){
            case "balance":
                console.log("in case");
                setBalance(true);
                console.log("balance is "+balance);
                if(balanceTimeout !== 0){
                    clearTimeout(balanceTimeout);
                }
                balanceTimeout = setTimeout(endBalance, 5000);
                break;
            default:
                return;
        }
        updateDps();
    }

    const updateDps = () => {
        let baseDps = 6000;
        let multiplier = 1;
        if(balance){
            multiplier = multiplier*1.05;
        }
        setDps(multiplier*baseDps);
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