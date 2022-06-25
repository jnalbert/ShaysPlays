import React, { FC, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Black, logoutRed, Poppins, Text300, backgroundColor, Purple } from '../../../shared/colors';

const OverallWrapper = styled.View`
  height: 100%;
  width: ${100 / 9}%;
  border: 1px solid black;
`;

const TextInput = styled.TextInput`
  height: 100%;
  width: 100%;
  background-color: white;
  font-family: ${Poppins};
  text-align: center;
  font-size: 22px;
`;

interface Props {
  colIndex: number;
  rowIndex: number;
  value: number;
  isMutable: boolean;
  hasConflict: boolean;
  isWon: boolean;
  handleCellInput: (rowIndex: number, colIndex: number, value: number) => void;
}

const GameCell: FC<Props> = ({
  colIndex,
  rowIndex,
  value,
  isMutable,
  hasConflict,
  isWon,
  handleCellInput,
}) => {
  let borderRightWidth = 1;
  let borderBottomWidth = 1;
  let borderTopWidth = 1;
  let borderLeftWidth = 1;

  // Sets the border to the right width
  if (colIndex === 8 || (colIndex + 1) % 3 === 0) {
    borderRightWidth = 3;
  }
  if (colIndex === 0 || colIndex % 3 === 0) {
    borderLeftWidth = 3;
  }
  if (rowIndex === 8 || (rowIndex + 1) % 3 === 0) {
    borderBottomWidth = 3;
  }
  if (rowIndex === 0 || rowIndex % 3 === 0) {
    borderTopWidth = 3;
  }

  const onTextChange = (text: string) => {
    hasConflict = false;
    // console.log(text)
    text = text || "0";
    handleCellInput(rowIndex, colIndex, parseInt(text));
  };

  const displayValue = value === 0 ? "" : value.toString();

//   console.log(hasConflict);

  const [backgroundColor, setBackgroundColor] = useState("white");

  const backgroundColorGet = () => {
    if (isWon) {
        return Purple;
    } else if (!isMutable) {
        return Text300;
    } else {
        return "white"
    }
  }
//  

  return (
    <OverallWrapper
      style={{
        borderRightWidth: borderRightWidth,
        borderBottomWidth: borderBottomWidth,
        borderTopWidth: borderTopWidth,
        borderLeftWidth: borderLeftWidth,
      }}
    >
      <TextInput
        style={{ 
            color: hasConflict ? logoutRed : Black,
            backgroundColor: backgroundColorGet()
         }}
        value={displayValue}
        maxLength={1}
        keyboardType="numeric"
        onChangeText={onTextChange}
        editable={isMutable}
      />
    </OverallWrapper>
  );
};

export default GameCell;
