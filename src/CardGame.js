import React from "react";
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
            SpreadContent:this.cards[0]
        };
        this.drawcd = this.drawcd.bind(this);
        this.updateDrawCD = this.updateDrawCD.bind(this);
        this.draw = this.draw.bind(this);
        this.royalRoad = this.royalRoad.bind(this);
        this.spread = this.spread.bind(this);

        this.drawInterval = 0;
    }

    draw(){
        if(this.drawInterval != 0)return;
        this.drawcd();
        let rand = this.randomCard();
        console.log(rand);
        this.setState({DrawnCard:this.cards[rand]});
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

    render(){
        return (
            <div id="cardGame">
            <div id="drawSection">
                <button id="draw" onClick={ this.draw }>
                Draw 
                </button>
                <span id="drawCd">{ this.state.DrawCooldown > 0 && this.state.DrawCooldown }</span>
                <span id="drawnCard"> { this.state.DrawnCard.name } </span>
            </div>
            <div id="royalRoadSection">
                <button id="royalRoad" onClick={ this.royalRoad }>
                    Royal Road
                </button>
                <span id="royalRoadEffect">{ this.state.RoyalRoad.name }</span>
            </div>
            <div id="spreadSection">
                <button id="spread" onClick={ this.spread }>
                    Spread
                </button>
                <span id="spreadContent">{ this.state.SpreadContent.name }</span>
            </div>
            <div id="sleeveDrawSection">
                <button id="sleeveDraw">
                    Sleeve Draw
                </button>
                <span id="sleeveDrawCD"></span>
            </div>
            <div id="party">
            </div>
        </div>
        );
    }
}

export default CardGame;