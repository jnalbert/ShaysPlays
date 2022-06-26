import { useNavigation } from '@react-navigation/native';
import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import styled from 'styled-components/native'
import { gameWonSetDb } from '../../../firebase/FirestoreFunctions';
import GamesHeader from '../../components/Games/GamesHeader';
import CardsRow from '../../components/Games/Memory/CardsRow';
import { Poppins } from '../../shared/colors';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const HeaderWrapper = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 5%;
`

const CardsRowsWrapper = styled.View`

`

export interface CardType {
    src: string;
    isMatched: boolean;
    isFlipped: boolean;
    index: number;
}

const MemoryScreen: FC = () => {

    const testingUrls = [
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        "https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://media.istockphoto.com/photos/taj-mahal-mausoleum-in-agra-picture-id1146517111?k=20&m=1146517111&s=612x612&w=0&h=vHWfu6TE0R5rG6DJkV42Jxr49aEsLN0ML-ihvtim8kk=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKkKcsPVFyu0Ijfj1O6gXNcddzCGIXGmaxbhSS_MIi5vk_P894NkvfB-co4cOPJ4CC1Yo&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5VheD-fNymktyeBSylXXa93jrQ5JjmC2fw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sYfvABB3L-FBjyhPf3nZEjCbsPuuewJW9uN9dnn0rsuC2Smd7oxwuVrOzuFUQyqNQq0&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-68BCIaW0Iiam8wgn9vWs3vcGMHtg1yMTBg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy__qa-iNxtZb6zKzRpsvVd-qFWaxFKIBb352IEI-gZ7CtWzAO6GNxzoZk5yJdWGEnbEw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc1Y3B0Zz6Q3tsNafyrvoxYP1TRFEgihfx-lWL7UesXyz4F56R4dFTSyjWbJBISP8DxXw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTrvsgIM5tG2B6c54C8GqR8ER9IlhGv9FaTvjJY1yPLn1J7EhoFuPmEFM8DlT-ZCO7g8Q&usqp=CAU",
    ]

    const [cards, setCards] = useState<CardType[]>([]);
    const [choiceOne, setChoiceOne] = useState<number | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<number | null>(null);

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const onCardClick = async (index: number) => {
        if (choiceOne && choiceTwo) return
        if (cards[index].isFlipped) return
        if (choiceOne === null) {
            setChoiceOne(index);
            setCards(prevCards => {
                const newCards = [...prevCards];
                newCards[index].isFlipped = true;
                return newCards;
            })
        } else {
            setChoiceTwo(index);
            setCards(prevCards => {
                const newCards = [...prevCards];
                newCards[index].isFlipped = true;
                return newCards;
            })
        }
    }

    useEffect(() => {
        checkIfMatch()
    }, [choiceOne, choiceTwo])
    

    const checkIfMatch = async () => {
        // console.log("run")
        if (choiceOne !== null && choiceTwo !== null) {
            console.log("run")
            if (cards[choiceOne].src === cards[choiceTwo].src) {
                // console.log("the cards match")
                setCards(prevCards => {
                    const newCards = [...prevCards];
                    newCards[choiceOne].isMatched = true;
                    newCards[choiceTwo].isMatched = true;
                    checkIfGameOver(newCards)
                    return newCards;
                })
                
            } else {
                // console.log("cardds did not match")
                await sleep(1000)
                setCards(prevCards => {
                    const newCards = [...prevCards];
                    newCards[choiceOne].isFlipped = false;
                    newCards[choiceTwo].isFlipped = false;
                    return newCards;
                })
            }
            // console.log("cards deleted")
            
            setChoiceOne(null);
            setChoiceTwo(null);
        }
    }


    const shuffleCards = (cardData: CardType[]) => {
        let shuffledCards = [...cardData, ...cardData].sort(() => Math.random() - 0.5)
        shuffledCards = shuffledCards.map((card: CardType, index: number) => {return {src: card.src, index: index, isMatched: false, isFlipped: false}})
        setCards(shuffledCards)
    }

    useEffect(() => {
        const cardsFakeData: CardType[] = []
        for (let i = 0; i < 10; i++) {
            cardsFakeData.push({
                src: testingUrls[i],
                index: 0,
                isMatched: false,
                isFlipped: false
            })
        }

        shuffleCards(cardsFakeData)
    }, [])


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

    const navigation: any = useNavigation();

    const checkIfGameOver = async (cardsNew: CardType[]) => {
        // console.log("running")
        if (cardsNew.filter(card => card.isMatched).length === cardsNew.length) {
            sendMessageInfo("YOU WIN!");
            gameWonSetDb("memory")
            await sleep(2500)
            navigation.navigate('GameWinScreen')
    
        }
    }

  
   

   

  return (
    <>
        <ScreenWrapperComp scrollView>
            <HeaderWrapper>
                <GamesHeader text='Shaymory'/>
            </HeaderWrapper>
            <CardsRowsWrapper>
                <CardsRow cards={cards.slice(0, 4)} onCardClick={onCardClick} />
                <CardsRow cards={cards.slice(4, 8)} onCardClick={onCardClick} />
                <CardsRow cards={cards.slice(8, 12)} onCardClick={onCardClick} />
                <CardsRow cards={cards.slice(12, 16)} onCardClick={onCardClick} />
                <CardsRow cards={cards.slice(16, 20)} onCardClick={onCardClick} />
            </CardsRowsWrapper>
        </ScreenWrapperComp>
        <FlashMessage position="top" titleStyle={{fontSize: 16, fontFamily: Poppins}} style={{justifyContent: "center", alignItems: "center"}}/>

    </>
  )
}

export default MemoryScreen