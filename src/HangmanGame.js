// self made

import React, {Component} from 'react';
import "./Hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import {randomWord} from './words';

class Hangman extends Component {
    static defaultProps = {
        maxWrong: 6,
        images: [img0, img1, img2, img3, img4, img5, img6]
    }

    constructor(props) {
        super(props);
        this.state = {
            nWrong: 0,
            guessed: new Set(),
            answer: randomWord()
        };
        this.handleGuess = this.handleGuess.bind(this);
        this.reset = this.reset.bind(this);
    }

    guessedWords() {
        return this.state.answer.split("").map(ltr => {
            return (this.state.guessed.has(ltr) ? ltr : '_');
        });
    }

    reset() {
        this.setState({
            nWrong: 0,
            guessed: new Set(),
            answer: randomWord()
        });
    }

    handleGuess(evt) {
        const ltr = evt.target.value;
        this.setState(currState => ({
            guessed: currState.guessed.add(ltr),
            nWrong: currState.nWrong + (this.state.answer.includes(ltr) ? 0 : 1)
        }));
    }

    generateButtons() {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
            <button 
                key={ltr} 
                value={ltr} 
                onClick={this.handleGuess} 
                disabled={this.state.guessed.has(ltr)}
            >
                {ltr}
            </button>
        ));
    }

    render() {
        // gameover if run out of numbers or guessed the word
        const isGameOver = (this.state.nWrong === this.props.maxWrong) || (this.guessedWords().indexOf('_')===-1);
        
        let display;
        
        if(isGameOver) {
            // game over
            if(this.state.nWrong === this.props.maxWrong) {
                // game lost
                display = (<h1>YOU LOSE!!!. The Answer was {this.state.answer}</h1>);
            } else {
                // game won
                display = (<div>
                        <p className="Hangman-word">{this.guessedWords()}</p>
                        <h1>YOU WON</h1>
                    </div>);
            }
        } else {
            // game not over
            display = (<div>
                    <p className="Hangman-word">{this.guessedWords()}</p>
                    <p className="Hangman-btns">{this.generateButtons()}</p>
                </div>)
        }
        
        return (
            <div className="Hangman">
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`}/>
                <p>Number wrong: {this.state.nWrong}</p>

                {display} {/* Either displays button or game won or lost */}
                
                {/* Play Again */}
                <button style={{width: "auto"}} onClick={this.reset}>Reset?</button>
            </div>
        )
    }
}

export default Hangman;