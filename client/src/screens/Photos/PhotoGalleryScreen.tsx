import React, { FC, useRef, useState, useEffect } from 'react'
import { View, Image } from 'react-native';
import styled from 'styled-components/native'
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

import { MaterialIcons } from '@expo/vector-icons'; 
import { Jet, Purple } from '../../shared/colors';
import Carousel from 'react-native-snap-carousel';
import { Audio, AVPlaybackStatus } from 'expo-av';



const OverAllWrapper = styled.View`
/* flex: 1; */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const PhotosCarouselWrapper = styled.View`
    /* flex: 1; */
    align-items: center;
    justify-content: center;
    height: 60%;
    /* margin-bottom: 10px; */
`

const PhotoWrapper = styled.View`
    height: 400px;
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
`

const Photo = styled.Image`
    height: 100%;
    width: 100%;
`

const ControlsWrapper = styled.View`
    flex-direction: row;
    /* justify-content: space-between; */
    /* margin-top: 20px; */
`

const Control = styled.TouchableOpacity`
    margin-left: 10px;
    margin-right: 10px;
`

const SkipAudioContainer = styled.TouchableOpacity`
    background-color: ${Jet};
    border-radius: 50%;
    height: 55px;
    width: 55px;
    align-items: center;
    justify-content: center
`

const PhotoGalleryScreen: FC = () => {

    const fakeData = [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
    ]

    const [photosUrls, setPhotosUrls] = useState<string[]>(fakeData)


    const renderPhoto = ({ item, index }: {item: string, index: number}) => {
        return ( 
        <PhotoWrapper key={index}>
            <Photo source={{uri: item}} />
        </PhotoWrapper>)
    }

    const onPressControl = (side: "left"| "right") => {
        if (side === "left") carouselRef.current.snapToPrev()
        else carouselRef.current.snapToNext()
    }

    const carouselRef = useRef<any>(null)


    Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        interruptionModeIOS: 1,
        interruptionModeAndroid: 1,
        
      })

    const audioUrls = [
        require("../../../assets/songs/LoverTyalorSwift.mp3"),
        require("../../../assets/songs/KeepDrivingHarry.mp3"),
        require("../../../assets/songs/DelicateTaylorSwift.mp3"),
        require("../../../assets/songs/LoveOfMyLifeHarry.mp3")
        ]

    let currentSongIndex = Math.floor((Math.random() * (audioUrls.length)));
    // console.log(currentSongIndex, "Here")


    let sound = useRef(new Audio.Sound());

    const playAudio = async () => {
        await sound.current.loadAsync(
            audioUrls[currentSongIndex],
            { progressUpdateIntervalMillis: 2000}
            );

        sound.current.setOnPlaybackStatusUpdate(playBackStatusUpdate);
        sound.current.playAsync();
    }


    const loadNextAudio = async () => {
        if (sound) {
            await sound.current.unloadAsync();
            currentSongIndex = currentSongIndex >= 3 ? 0 : currentSongIndex + 1;
            playAudio()
        }
    }

    const playBackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            if (status.didJustFinish) {
                loadNextAudio()
            }
        }
    }


    useEffect(() => {
        playAudio()
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.current.unloadAsync()
        }
        : undefined;
    }, [sound])



  return (
    <ScreenWrapperComp backgroundColor={"#717070"}>
      <OverAllWrapper>
        <PhotosCarouselWrapper>

        <Carousel
            layout={"default"}
            layoutCardOffset={30}
            ref={carouselRef}
            data={photosUrls}
            sliderWidth={300}
            itemWidth={320}
            itemHeight={400}
            renderItem={renderPhoto}
            loop={true}
            autoplay={true}
            autoplayInterval={5000}
            />
           
        </PhotosCarouselWrapper>

        <ControlsWrapper>
            <Control onPress={() => onPressControl("left")}>
                <MaterialIcons name="chevron-left" size={110} color={Jet} />
            </Control>
            <Control onPress={() => onPressControl("right")}>
                <MaterialIcons name="chevron-right" size={110} color={Jet}  />
            </Control>
        </ControlsWrapper>

        <SkipAudioContainer onPress={loadNextAudio}>
            <MaterialIcons name="fast-forward" size={45} color="white" />
        </SkipAudioContainer>
        
      </OverAllWrapper>
    </ScreenWrapperComp>
  )
}

export default PhotoGalleryScreen