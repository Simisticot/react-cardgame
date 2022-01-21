import React from "react";
class CardGame extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            DrawCooldown:0,
            DrawnCard:{
                name:"",
                royalRoad:0
            }
        };
        this.drawcd = this.drawcd.bind(this);
        this.updateDrawCD = this.updateDrawCD.bind(this);
        this.draw = this.draw.bind(this);

        this.drawInterval = 0;
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
    }

    draw(){
        if(this.drawInterval != 0)return;
        this.drawcd();
        let rand = this.randomCard();
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

    render(){
        return (
            <div id="cardGame">
            <div id="drawSection">
                <button id="draw" onClick={this.draw}>
                Draw 
                </button>
                <span id="drawCd">{ this.state.DrawCooldown > 0 && this.state.DrawCooldown }</span>
                <span id="drawnCard"> { this.state.DrawnCard.name } </span>
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
            </div>
        </div>
        );
    }
}

export default CardGame;