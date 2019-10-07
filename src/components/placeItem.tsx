import React from 'react';
import { Box } from "@artsy/palette"
import { Text } from 'react-native';


interface Props {
  place: any
}

export const PlaceItem = (props: Props) => {
  const {place} = props
  return(
    <Box>
      <Text>{place.name}</Text>
    </Box>
  )
}