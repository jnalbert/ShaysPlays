import React, { FC } from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { CardType } from '../../../screens/Games/MemoryScreen';
import Card from './Card';

const CardRowWrapper = styled.View`
    flex-direction: row;
`

interface Props {
    cards: CardType[];
    onCardClick: (index: number) => void;
}

const CardsRow: FC<Props> = ({
    cards,
    onCardClick
}) => {
  return (
    <CardRowWrapper>
      {cards.map((card, index) => {
        return <Card {...card} key={index} onCardClick={onCardClick} />
      })}
    </CardRowWrapper>
  )
}

export default CardsRow