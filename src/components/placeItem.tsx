import React from 'react';
import { BorderBox, Sans } from "@artsy/palette"
import { randomPhoto } from '../util';
import { Image } from "react-native"


interface Props {
  place: any
}

export const PlaceItem = (props: Props) => {
  const {place} = props
  return(
    <BorderBox>
      {place.images && place.images.length > 0 &&
        <Image source={{uri: randomPhoto(place.images).urls.thumb}} style={{width: 100, height: 100}}/>
      }
      <Sans size="4">{place.name}</Sans>
    </BorderBox>
  )
}