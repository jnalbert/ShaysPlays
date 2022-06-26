import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import styled from 'styled-components/native'
import GamesHeader from '../../components/Games/GamesHeader';
import GuessRow from '../../components/Games/Wordle/GuessRow';
import Keyboard from '../../components/Games/Wordle/Keyboard';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

import { showMessage } from "react-native-flash-message";
import { Poppins } from '../../shared/colors';
import { useNavigation } from '@react-navigation/native';
import { gameWonSetDb, getWordleSolution } from '../../../firebase/FirestoreFunctions';



const HeaderWrapper = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 5%;
`

const GuessRowsWrapper = styled.View`
    width: 90%;
`

const KeyBoardWrapper = styled.View`
    margin-top: 7%;
`

interface IGuess {
    [key: number]: string;
  }
  

const WordleScreen: FC = () => {

    const wordleWords = require("../../../assets/wordle.json")
    const allowedWords = JSON.parse(JSON.stringify(wordleWords)).allowedWords
    const solutions = JSON.parse(JSON.stringify(wordleWords)).solutions

    const defaultGuess: IGuess = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
      }

    const [solution, setSolution] = useState("")
    const [guessIndex, setGuessIndex] = useState(0);
    const [guesses, setGuesses] = useState<IGuess>(defaultGuess)
    const [isGameComplete, setIsGameComplete] = useState(false)

    const navigation: any = useNavigation()

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const handleGameWin = async () => {
        setIsGameComplete(true)
        sendMessageInfo("YOU WIN!");

        gameWonSetDb("wordle")
        await delay(2000)
        navigation.navigate('GameWinScreen')
    }

    const handleGameLoose = async () => {
        setIsGameComplete(true)
        showMessage({
            message: "You lost :(",
            description: "The correct word was: " + solution,
            type: "info",
            backgroundColor: "#E5D8F7",
            color: "#000",
            icon: "info",
            autoHide: false,
        });
        await delay(3000)
        navigation.navigate('Games')
    }

    const sendMessageInfo = (message: string) => {
        showMessage({
            message: message,
            type: "info",
            backgroundColor: "#E5D8F7",
            color: "#000",
            icon: "info",
            duration: 2000
        });
    }

    const handleKeyPress = (letter: string) => {

        const guess = guesses[guessIndex]

        if (letter === "ENTER") {
            const guessLower = guess.toLowerCase()
            if (guessLower.length !== 5) {
                sendMessageInfo("The word is too short");
                return;
            }
            if (!allowedWords.includes(guessLower) && !solutions.includes(guessLower)) {
                sendMessageInfo("Not a valid word");
                return;
              }

            if (guessLower === solution) {
                setGuessIndex(guessIndex + 1)
                handleGameWin()
                return;
            }

            if (guessIndex < 5) {
                setGuessIndex(guessIndex + 1)
              } else {
                handleGameLoose()
            
              }
            return;
        }

        if (letter === "⌫") {
            setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) })
            return
        }

        if (guess.length >= 5) return

        setGuesses({ ...guesses, [guessIndex]: guess + letter })

    }

    const getSolutionIndex = async () => {
        // get solution from db ***
        const solutionIndex = await getWordleSolution();
        console.log("solutionIndex", solutionIndex)
        setSolution(solutions[solutionIndex])
    }

    useEffect(() => {
        getSolutionIndex()
    }, [])
    
    useEffect(() => {
        if (!isGameComplete) {
          getSolutionIndex()
          setGuesses(defaultGuess)
          setGuessIndex(0)
        }
      }, [isGameComplete])

  return (
    <>
        <ScreenWrapperComp>
            <HeaderWrapper>
                <GamesHeader text='Shaydle'/>
            </HeaderWrapper>
            
            <GuessRowsWrapper>
                <GuessRow 
                    guess={guesses[0]}
                    word={solution}
                    guessed={guessIndex > 0}
                />
                 <GuessRow 
                    guess={guesses[1]}
                    word={solution}
                    guessed={guessIndex > 1}
                />
                 <GuessRow 
                    guess={guesses[2]}
                    word={solution}
                    guessed={guessIndex > 2}
                />
                 <GuessRow 
                    guess={guesses[3]}
                    word={solution}
                    guessed={guessIndex > 3}
                />
                 <GuessRow 
                    guess={guesses[4]}
                    word={solution}
                    guessed={guessIndex > 4}
                />
                <GuessRow 
                    guess={guesses[5]}
                    word={solution}
                    guessed={guessIndex > 5}
                />
            </GuessRowsWrapper>

            <KeyBoardWrapper>
                <Keyboard onKeyPress={handleKeyPress}/>
            </KeyBoardWrapper>
        </ScreenWrapperComp>
        <FlashMessage position="top" titleStyle={{fontSize: 16, fontFamily: Poppins}} style={{justifyContent: "center", alignItems: "center"}}/>
    </>
  )
}

export default WordleScreen