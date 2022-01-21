import React from "react";
class CardGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            DrawCooldown:0
        };
    }
    render(){
        return (
            <div id="cardGame">
            <div id="drawSection">
                <button id="draw">
                Draw 
                </button>
                <span id="drawCd">{ this.state.DrawCooldown }</span>
                <span id="drawnCard"></span>
            </div>
            <div id="royalRoadSection">
                <button id="royalRoad">
                    Royal Road
                </button>
                <span id="royalRoadEffect"></span>
            </div>
            <div id="spreadSection">
                <button id="spread">
                    Spread
                </button>
                <span id="spreadContent"></span>
            </div>
            <div id="sleeveDrawSection">
                <button id="sleeveDraw">
                    Sleeve Draw
                </button>
                <span id="sleeveDrawCD"></span>
            </div>
            <div id="party">
                <table id="partyList">
                    <tr>
                        <th>Job</th>
                        <th>Name</th>
                        <th>DPS</th>
                        <th>Damage</th>
                        <th>Action</th>
                    </tr>
                    <tr className="player">
                        <td>DRG</td>
                        <td>Aquila</td>
                        <td className="damage">0</td>
                        <td className="dps">6000</td>
                        <td><button className="play">Play</button></td>
                    </tr>
                </table>
            </div>
        </div>
        );
    }
}

export default CardGame;