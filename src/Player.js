import { useState, useEffect } from "react";

/*
TODO

First buff played never applies
Buffs aren't meant to stack
*/

const Player = (props) => {
    let damageInterval = 0;
    const [dps, setDps] = useState(6000);
    const [damage, setDamage] = useState(0);

    const [balance, setBalance] = useState(1);
    const [spear, setSpear] = useState(1);
    const [arrow, setArrow] = useState(1);

    let balanceTimeout = 0;
    let spearTimeout = 0;
    let arrowTimeout = 0;

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
        setBalance(1);
        balanceTimeout = 0;
        updateDps();
    }

    const endSpear = () => {
        setSpear(1);
        spearTimeout = 0;
        updateDps();
    }
    
    const endArrow = () => {
        setArrow(1);
        arrowTimeout = 0;
        updateDps();
    }

    const play = () => {
        props.discardDrawn();
        switch (props.drawn.name){
            case "balance":
                console.log("in case");
                setBalance(1.1);
                console.log("balance is "+balance);
                if(balanceTimeout !== 0){
                    clearTimeout(balanceTimeout);
                }
                balanceTimeout = setTimeout(endBalance, 30000);
                break;
            case "spear":
                setSpear(1.1);
                if(spearTimeout !== 0){
                    clearTimeout(spearTimeout);
                }
                spearTimeout = setTimeout(endSpear, 30000);
                break;
            case "arrow":
                setArrow(1.1);
                if(arrowTimeout !== 0){
                    clearTimeout(arrowTimeout);
                }
                arrowTimeout = setTimeout(endArrow, 30000);
                break;
            default:
                return;
        }
        updateDps();
    }

    const updateDps = () => {
        let baseDps = 6000;
        let multiplier = balance*spear*arrow;
        setDps(multiplier*baseDps);
    }


    
    return ( 
        <tr>
            <td>Aquila</td>
            <td>DRG</td>
            <td>{ dps.toFixed(0) }</td>
            <td>{ damage }</td>
            <td><button onClick={ play }>Play</button></td>
        </tr>
     );
}
 
export default Player;