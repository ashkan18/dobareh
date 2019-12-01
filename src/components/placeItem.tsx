import React from 'react';
import { BorderBox, Sans } from "@artsy/palette"
import { randomPhoto } from '../util';
import { Image, TouchableOpacity } from "react-native"


interface Props {
  place: any,
  navigation: any
}

export const PlaceItem = (props: Props) => {
  const {place} = props
  const {navigate} = props.navigation;
  return(
    <TouchableOpacity onPress={() => navigate('PlaceDetail', {id: place.id})}>
      <BorderBox justifyContent={"space-around"}>
        <Sans size="4">{place.name}</Sans>
        {place.images && place.images.length > 0 &&
          <Image source={{uri: randomPhoto(place.images).urls.thumb}} style={{width: 100, height: 100}}/>
        }
      </BorderBox>
    </TouchableOpacity>
  )
}