import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { CellType } from '../../../screens/Games/SudokuScreen';
import GameCell from './GameCell';

const OverallWrapper = styled.View`
    width: 100%;
    height: ${(100/9)}%;
    flex-direction: row;
`

interface Props {
    rowIndex: number;
    rowNumbers: CellType[];
    isWon: boolean;
    handleCellInput: (rowIndex: number, colIndex: number, value: number) => void;

}

const GameRow: FC<Props> = ({
    rowIndex,
    rowNumbers,
    isWon,
    handleCellInput
}) => {
  return (
    <OverallWrapper>
      {rowNumbers.map((cell, index) => {
            return <GameCell key={index} isWon={isWon} rowIndex={rowIndex} colIndex={index} {...cell} handleCellInput={handleCellInput} />
      })}
    </OverallWrapper>
  )
}

export default GameRow