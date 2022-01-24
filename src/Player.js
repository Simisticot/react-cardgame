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

    const [buffTimeout, setBuffTimeout] = useState(0);

    const balanceEffect = 1.3;
    const spearEffect = 1.2;
    const arrowEffect = 1.1;
    const baseDps = 6000;

    useEffect(() => {
        setDps(props.currentBuff*baseDps);
    }, [props.currentBuff]);

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

    const endBuff = () => {
        updateDps(1);
        if(buffTimeout !== 0){
            clearTimeout(buffTimeout);
            setBuffTimeout(0);
        }
    }

    const applyBuff = (multiplier) => {
        endBuff();
        updateDps(multiplier);
        setBuffTimeout(setTimeout(endBuff, 5000));
    }

    const play = () => {
        switch (props.drawn.name){
            case "balance":
                applyBuff(balanceEffect);
                break;
            case "spear":
                applyBuff(spearEffect);
                break;
            case "arrow":
                applyBuff(arrowEffect);
                break;
            default:
                return;
        }
        props.discardDrawn();
    }

    const updateDps = (buff) => {
        setDps(buff*baseDps);
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