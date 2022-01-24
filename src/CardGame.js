import React from "react";
import Player from "./Player";
class CardGame extends React.Component {
    
    constructor(props){
        super(props);
        this.cards = [
            {
                name:"",
                royalRoad:0
            },
            {
                name:"balance",
                royalRoad:1
            },
            {
                name:"bole",
                royalRoad:1
            },
            {
                name:"spire",
                royalRoad:2
            },
            {
                name:"ewer",
                royalRoad:2
            },
            {
                name:"spear",
                royalRoad:3
            },
            {
                name:"arrow",
                royalRoad:3
            }
        ]
        this.royalRoadTypes = [
            {
                name: ""
            },
            {
                name: "Power"
            },
            {
                name: "AoE"
            },
            {
                name: "Duration"
            }
        ]
        this.state = {
            DrawCooldown:0,
            DrawnCard:this.cards[0],
            RoyalRoad:this.royalRoadTypes[0],
            SpreadContent:this.cards[0],
            SleeveDrawCooldown:0,
            currentBuff: 1.5
        };
        this.drawcd = this.drawcd.bind(this);
        this.updateDrawCD = this.updateDrawCD.bind(this);
        this.draw = this.draw.bind(this);
        this.royalRoad = this.royalRoad.bind(this);
        this.spread = this.spread.bind(this);
        this.sleeveDraw = this.sleeveDraw.bind(this);
        this.updateSleeveDrawCd = this.updateSleeveDrawCd.bind(this);
        this.discardRoyalRoad = this.discardRoyalRoad.bind(this);
        this.discardDrawn = this.discardDrawn.bind(this);
        this.discardSpread = this.discardSpread.bind(this);

        this.drawInterval = 0;
        this.sleeveDrawInterval = 0;
    }

    draw(){
        if(this.drawInterval !== 0)return;
        this.drawcd();
        let rand = this.randomCard();
        this.setState({DrawnCard:this.cards[rand], currentBuff: 2});
    }

    randomCard(){
        return Math.floor(Math.random()*6)+1;
    }

    drawcd(){
        this.setState({
            DrawCooldown:5
        });
        this.drawInterval = setInterval(this.updateDrawCD, 1000);
    }

    updateDrawCD(){
        this.setState(prevState => ({
            DrawCooldown: prevState.DrawCooldown-1
        }));
        if(this.state.DrawCooldown === 0){
            clearInterval(this.drawInterval);
            this.drawInterval = 0;
        }
    }

    royalRoad(){
        if(this.state.DrawnCard.name === "")return;
        this.setState(prevState => ({ 
            DrawnCard: this.cards[0],
            RoyalRoad: this.royalRoadTypes[prevState.DrawnCard.royalRoad]
         }));
    }

    spread(){
        if(this.state.DrawnCard.name === "")return;
        this.setState(prevState => ({
            SpreadContent: prevState.DrawnCard,
            DrawnCard: this.cards[0]
        }));
    }

    sleeveDraw(){
        if(this.sleeveDrawInterval !== 0)return;
        if(this.state.RoyalRoad.name === ""){
            this.setState({RoyalRoad:this.royalRoadTypes[this.cards[this.randomCard()].royalRoad]});
        }
        if(this.state.DrawnCard.name === ""){
            this.setState({DrawnCard:this.cards[this.randomCard()]});
            if(this.drawInterval !== 0){
                clearInterval(this.drawInterval);
                this.drawInterval = 0;
                this.setState({DrawCooldown:0});
            }
        }
        if(this.state.SpreadContent.name === ""){
            this.setState({SpreadContent:this.cards[this.randomCard()]});
        }
        this.sleeveDrawCd();
    }

    sleeveDrawCd(){
        this.setState({SleeveDrawCooldown:5});
        this.sleeveDrawInterval = setInterval(this.updateSleeveDrawCd, 1000);
    }

    updateSleeveDrawCd(){
        this.setState(prevState => ({
            SleeveDrawCooldown:prevState.SleeveDrawCooldown-1
        }));
        if(this.state.SleeveDrawCooldown === 0){
            clearInterval(this.sleeveDrawInterval);
            this.sleeveDrawInterval = 0;
        }
    }

    discardDrawn(){
        this.setState({DrawnCard:this.cards[0]});
    }

    discardRoyalRoad(){
        this.setState({RoyalRoad:this.royalRoadTypes[0]});
    }

    discardSpread(){
        this.setState({SpreadContent:this.cards[0]});
    }

    render(){
        return (
            <div id="cardGame">
            <div id="drawSection">
                <button onClick={ this.discardDrawn }>
                    Discard
                </button>
                <button id="draw" onClick={ this.draw }>
                    Draw 
                </button>
                <span id="drawCd">{ this.state.DrawCooldown > 0 && this.state.DrawCooldown }</span>
                <span id="drawnCard"> { this.state.DrawnCard.name } </span>
            </div>
            <div id="royalRoadSection">
                <button onClick={ this.discardRoyalRoad }>
                    Discard
                </button>
                <button id="royalRoad" onClick={ this.royalRoad }>
                    Royal Road
                </button>
                <span id="royalRoadEffect">{ this.state.RoyalRoad.name }</span>
            </div>
            <div id="spreadSection">
                <button onClick={ this.discardSpread }>
                    Discard
                </button>
                <button id="spread" onClick={ this.spread }>
                    Spread
                </button>
                <span id="spreadContent">{ this.state.SpreadContent.name }</span>
            </div>
            <div id="sleeveDrawSection">
                <button id="sleeveDraw" onClick={ this.sleeveDraw }>
                    Sleeve Draw
                </button>
                <span id="sleeveDrawCD">{ this.state.SleeveDrawCooldown > 0 && this.state.SleeveDrawCooldown }</span>
            </div>
            <div id="party">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>DPS</th>
                            <th>Damage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Player drawn={this.state.DrawnCard} royalRoad={this.state.RoyalRoad} spread={this.state.SpreadContent} discardDrawn={this.discardDrawn} currentBuff={ this.state.currentBuff }/>
                    </tbody>
                </table>
                
            </div>
        </div>
        );
    }
}

export default CardGame;