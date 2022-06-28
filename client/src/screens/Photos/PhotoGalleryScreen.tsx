import React, { FC, useRef, useState, useEffect } from 'react'
import { View, Image } from 'react-native';
import styled from 'styled-components/native'
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

import { MaterialIcons } from '@expo/vector-icons'; 
import { Jet, Purple } from '../../shared/colors';
import Carousel from 'react-native-snap-carousel';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { getDbPhotos } from '../../../firebase/FirestoreFunctions';



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
    height: 440px;
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

    const [photosUrls, setPhotosUrls] = useState<string[]>([])

    const getUrls = async () => {
        const urls = await getDbPhotos(326)
        // suffles urls in randome order
        const shuffledUrls = urls.sort(() => Math.random() - 0.5)
        setPhotosUrls(shuffledUrls)
    }

    useEffect(() => {
        getUrls()
    }, [])


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
        "https://firebasestorage.googleapis.com/v0/b/shaysplays-c233d.appspot.com/o/songs%2FLoverTyalorSwift.mp3?alt=media&token=04a809aa-096b-43ac-aa3f-79e53523799c",
        "https://firebasestorage.googleapis.com/v0/b/shaysplays-c233d.appspot.com/o/songs%2FKeepDrivingHarry.mp3?alt=media&token=0d098ad6-3619-4339-921f-85a93db4fc93",
        "https://firebasestorage.googleapis.com/v0/b/shaysplays-c233d.appspot.com/o/songs%2FDelicateTaylorSwift.mp3?alt=media&token=5af3e077-8be0-41e6-ab7f-69076f7948cb",
        "https://firebasestorage.googleapis.com/v0/b/shaysplays-c233d.appspot.com/o/songs%2FLoveOfMyLifeHarry.mp3?alt=media&token=161dc345-b671-4a28-9e39-53fa197430a2"
        ]
    

    let currentSongIndex = Math.floor((Math.random() * (audioUrls.length)));
    // console.log(currentSongIndex, "Here")


    let sound = useRef(new Audio.Sound());

    const playAudio = async () => {
        await sound.current.loadAsync(
            { uri: audioUrls[currentSongIndex] },
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
            itemWidth={340}
            itemHeight={430}
            renderItem={renderPhoto}
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
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