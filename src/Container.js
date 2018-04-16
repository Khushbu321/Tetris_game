import React, { Component } from 'react';
import "./Container.css";

class Container extends React.Component{
    constructor(props){
        super(props);
        this.shapes = [
            [[0,0],[1,0],[0,1],[0,2]],
            [[0,0],[1,1],[0,1],[0,2]],

            [[0,0],[1,0],[2,0],[3,0]],
            [[0,0],[1,0],[1,1],[2,1]],
            [[0,0],[1,0],[2,0],[2,1]],
           ] ;
        let randomNo =  Math.floor(Math.random() * Math.floor(5));
        let generatedShape = this.shapes[randomNo];
        this.state = {
            // currentShape: this.shapes[0],
            container: new Array(25).fill([]).map(() => (new Array(25).fill(0))),
            containerCords : [],
            generatedShape: generatedShape,
        }
    }

     fillContainer = (x,y) => {
        let container = this.state.container;
        this.state.containerCords.forEach((point) => {
                const _x = point[0];
                const _y = point[1];
                container[_x][_y] = 0;
        });
        const containerCords = [];
        var reachedEnd = false;
        for(let i = 0; i <this.state.generatedShape.length; i++){
            const currentX = x + this.state.generatedShape[i][0];
            const currentY = y + this.state.generatedShape[i][1];
            containerCords.push([currentX, currentY]);
          	reachedEnd = reachedEnd || currentX >= 24 || (container[currentX + 1][currentY] === 2);
        }
         for(let i = 0; i <containerCords.length; i++){
            if(reachedEnd){
                console.log(i,"-",x,"-",containerCords[i][0],y,"-",containerCords[i][1])
                container[containerCords[i][0]][containerCords[i][1]] = 2;
            }
            else{
               container[containerCords[i][0]][containerCords[i][1]] = 1;
                }
         }
        this.setState({
            container : container,
            containerCords : containerCords ,
            x: x,
            y: y,
        });
     }

    moveLeft = () => {
     this.fillContainer(this.state.x, this.state.y-1);
    }

    moveRight = () => {
     this.fillContainer(this.state.x, this.state.y+1);
    }

    componentDidMount = () =>{
        let randomY = Math.floor(Math.random() * Math.floor(this.state.container.length));
        this.fillContainer(0, randomY);
        document.addEventListener("keydown", (e) => {
            clearTimeout(this.timeout);
            if(e.keyCode === 37){
                this.moveLeft();
            }
            else if(e.keyCode === 39){
                this.moveRight();
            }
        });
    }

    componentDidUpdate = () => {
        clearTimeout(this.timeout);
        let shouldApplyTimeout = true;
        const checkIfShouldStop = () => {
            const container = this.state.container;
            for(var k = 0; k<this.state.containerCords.length;k++){
                 if( this.state.containerCords[k][0] >= 24 ||
                     container[this.state.containerCords[k][0] + 1][this.state.containerCords[k][1]]=== 2
                ) {
                    return true;
               }
            }
            return false;
        }

        for(var i = 0; i < this.state.generatedShape.length ; i++){
            if(checkIfShouldStop()){
                  console.log("check");
                   shouldApplyTimeout = false;
                   // this.fillContainer(this.state.x,this.state.y,this.state.generatedShape);
            }
        }
        if(shouldApplyTimeout){
            this.timeout = setTimeout(() => {
                this.fillContainer(this.state.x+1, this.state.y,this.state.generatedShape);
            }, 1000);
        }
        else{
            let randomNo =  Math.floor(Math.random() * Math.floor(5));
            let generatedShape = this.shapes[randomNo];
            const callback = () => {
                let randomY = Math.floor(Math.random() * Math.floor(this.state.container.length));
                 this.fillContainer(0, randomY);         
           }
         this.setState({
               generatedShape: generatedShape,
               containerCords: [],
               x:0,
               y:11
           }, callback);
        }
    }

    render(){
        return(
            <div className = "Container">
                {this.state.container.map((row) => {
                    return <div className = "row">{row.map((cell) =>{
                        return(<div className = {(cell ? `cell cellOne` : `cell`)}></div>)
                    })}</div>
                })}
            </div>
        );
    }
}

export default Container;
