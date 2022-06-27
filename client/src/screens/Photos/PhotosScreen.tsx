import React, { FC, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import PhotoRowType1 from "../../components/Photos/PhotoPieceType1";
import PhotoRowType2 from "../../components/Photos/PhotoPieceType2";
import BasicButton from "../../shared/BasicButton";
import ScreenWrapperComp from "../../shared/ScreenWrapperComp";
import { useNavigation } from "@react-navigation/native";
import { Jet } from "../../shared/colors";

const OverallWrapper = styled.View`
  margin-top: 20px;
  flex-direction: column;
  /* height: 160%; */
  align-items: center;
`;

const PhotoGridWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* height: 520px; */
  width: 100%;
`;

const GridItemContainer = styled.View`
  width: 100%;
  height: 180px;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
`;

const ButtonWrapper = styled.View`
  width: 235px;
  margin-top: 6%; 
  margin-bottom: 4%;
  /* height: 100px; */
  justify-content: center;
  /* align-items: center; */
`;

const PhotosScreen: FC = () => {
  const imgs = [
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  ];
  const [photos, setPhotos] = useState<string[]>(imgs);

  const navigator: any = useNavigation();

  const goToPhotosGallery = async () => {
    navigator.navigate("PhotoGallery");
  };

  return (
    <ScreenWrapperComp scrollView>
      <OverallWrapper>
        <PhotoGridWrapper>
          <GridItemContainer>
            <PhotoRowType1 width={60} imgUrl={photos[0]} />
            <PhotoRowType2 width={40} imgUrls={[photos[1], photos[2]]} />
          </GridItemContainer>
          <GridItemContainer>
            <PhotoRowType1 width={33.3} imgUrl={photos[3]} />
            <PhotoRowType1 width={33.3} imgUrl={photos[4]} />
            <PhotoRowType1 width={33.3} imgUrl={photos[5]} />
          </GridItemContainer>
          <GridItemContainer>
            <PhotoRowType2 width={40} imgUrls={[photos[6], photos[7]]} />
            <PhotoRowType1 width={60} imgUrl={photos[8]} />
          </GridItemContainer>
          <GridItemContainer>
            <PhotoRowType1 width={50} imgUrl={photos[9]} />
            <PhotoRowType1 width={50} imgUrl={photos[10]} />
          </GridItemContainer>
        </PhotoGridWrapper>
        
        <ButtonWrapper>
          <BasicButton
            title={"Play"}
            onPress={goToPhotosGallery}
            style={{ width: "100%", height: 64, backgroundColor: Jet }}
          />
        </ButtonWrapper>
       
      </OverallWrapper>
    </ScreenWrapperComp>
  );
};

export default PhotosScreen;
