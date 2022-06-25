import React, { FC, useEffect, useState } from 'react'
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native'
import GamesHeader from '../../components/Games/GamesHeader';
import GameRow from '../../components/Games/Sudoku/GameRow';
import { Poppins, Purple } from '../../shared/colors';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';
import { makepuzzle, solvepuzzle } from "sudoku";
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

const HeaderWrapper = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 5%;
`

const GameBoardWrapper = styled.KeyboardAvoidingView`
  background-color: ${Purple};
  width: 90%;
  height: 55%;
`

export interface CellType {
    value: number;
    isMutable: boolean;
    hasConflict: boolean;
}


const SudokuScreen: FC = () => {

    const [solution, setSolution] = useState<number[][]>([])

    const [gameBoard, setGameBoard] = useState<CellType[][]>([])

    const [isGameWon, setIsGameWon] = useState(false)

    const makePuzzleSolution = (puzzle: any) => {
        const solution = solvepuzzle(puzzle)

        // console.log(solution)
        
        const puzzleNumbersArray: number[][] = []
        for (let i = 0; i < 9; i++) {
                const row: number[] = []
                for (let j = 0; j < 9; j++) {
                    let currentNumber = solution[i * 9 + j] + 1
                    // console.log(currentNumber)
                    // currentNumber = currentNumber ? currentNumber : 0
                    row.push(currentNumber)
                }
                puzzleNumbersArray.push(row)
            }

            console.log(puzzleNumbersArray, "solutions")

        setSolution(puzzleNumbersArray)
    
    }

   
    const makeNewGameBoard = async () => {
        const puzzle = await makepuzzle();

        makePuzzleSolution(puzzle)
    
        const gameBoard: CellType[][] = [];
        for (let i = 0; i < 9; i++) {
            const row: CellType[] = [];
            for (let j = 0; j < 9; j++) {
                let cell = puzzle[i * 9 + j];
                cell = cell === null ? 0 : cell + 1;
                const isMutable = cell === 0;
                row.push({ value: cell, isMutable, hasConflict: false });
            }
            gameBoard.push(row);
        }
        // console.log(gameBoard, "board")
        setGameBoard(gameBoard);
    }


    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const handleCellInput = (rowIndex: number, colIndex: number, value: number) => {
        const newGameBoard = [...gameBoard]
        newGameBoard[rowIndex][colIndex].value = value
        newGameBoard[rowIndex][colIndex].hasConflict = false
       if (hasConflict(newGameBoard, rowIndex, colIndex)) {
              newGameBoard[rowIndex][colIndex].hasConflict = true
              sendMessageInfo("Oops! You can't go there")
       }
       setGameBoard(newGameBoard)

       if (hasGameFinished(newGameBoard)) {
           console.log("you won")
           handleGameFinish()
           
       }
    }

    const hasConflict = (gameBoard: CellType[][], rowIndex: number, colIndex: number) => {
        const newGameBoard = [...gameBoard]
        const currentValue = newGameBoard[rowIndex][colIndex].value
        
        // check row conflict
        for (let i = 0; i < 9; i++) {
            // check row conflict
            if (i !== colIndex && newGameBoard[rowIndex][i].value === currentValue) {
                return true;
            }
            // check column conflict
            if (i !== rowIndex && newGameBoard[i][colIndex].value === currentValue) {
                return true;
            }
        }

        // check sudoku peer group
        const peerGroupRowStart = Math.floor(rowIndex / 3) * 3;
        const peerGroupColStart = Math.floor(colIndex / 3) * 3;
        for (let i = peerGroupRowStart; i < peerGroupRowStart + 3; i++) {
            for (let j = peerGroupColStart; j < peerGroupColStart + 3; j++) {
                if (i !== rowIndex && j !== colIndex && newGameBoard[i][j].value === currentValue) {
                    return true;
                }
            }
        }
        return false;
    }

    const hasGameFinished = (newGameBoard: CellType[][]) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (newGameBoard[i][j].value === 0 || newGameBoard[i][j].value !== solution[i][j]) {
                    return false;
                }
            }
        }
        return true;
        
    }

    const navigation: any = useNavigation()

    const handleGameFinish = async () => {
        // Send to db that game was won
        setIsGameWon(true)
        sendMessageInfo("YOU WIN!");
        await delay(2000)
        navigation.navigate('GameWinScreen')
    }

    const sendMessageInfo = (message: string) => {
        showMessage({
            message: message,
            type: "info",
            backgroundColor: "#E5D8F7",
            color: "#000",
            icon: "info",
            duration: 500
        });
    }


    useEffect(() => {
        makeNewGameBoard()
    }, [])

  return (
    <>
        <ScreenWrapperComp>
        <HeaderWrapper>
                <GamesHeader text='Shaydoku'/>
        </HeaderWrapper>

        <GameBoardWrapper>
            {gameBoard.map((row, rowIndex) => {
                return <GameRow rowNumbers={row} isWon={isGameWon} rowIndex={rowIndex} key={rowIndex} handleCellInput={handleCellInput} />
            })}
            {/* <TextInput style={{width: 50, height: 50, backgroundColor: "white"}} value={"8"} editable={true} keyboardType="numeric"/> */}
        </GameBoardWrapper>

        </ScreenWrapperComp>
        <FlashMessage position="top" titleStyle={{fontSize: 16, fontFamily: Poppins}} style={{justifyContent: "center", alignItems: "center"}}/>
    </>

  )
}

export default SudokuScreen