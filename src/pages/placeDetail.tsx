import React from 'react';


import { StyleSheet, ActivityIndicator, Image, ScrollView} from "react-native";
import { Flex, Sans } from "@artsy/palette"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { SocialActions } from '../components/socialActions';


interface Props {
  navigation: any
}

const FIND_PLACE_QUERY = gql`
  query FindPlace($id: ID!){
    place(id: $id) {
      id
      name
      location
      address
      address2
      city
      tags
      images {
        urls {
          thumb
          original
        }
      }
      stats {
        type
        response
        total
      }
      myReview {
        reviewType
        response
      }
      myLists {
        listType
      }
    }
  }
`

const ME_QUERY = gql`
  query {
    me {
      name
    }
  }
`

export const PlaceDetail = (props: Props) => {
  const {navigation} = props
  const id = navigation.getParam("id")
  const {loading, data} = useQuery(FIND_PLACE_QUERY, {variables: {id: id}})
  const {data: meData} = useQuery(ME_QUERY)
  if (loading) {
    return(
      <ActivityIndicator size="large" style={styles.spinner}/>
    )
  }
  if (data && data.place) {
    const {place} = data
    return (
      <Flex flexDirection="column" justifyContent="center">
        <Sans size={8} textAlign="center" m={0.5}>{place.name}</Sans>
        <Sans size={2} textAlign="center">{place.tags.join(",")}</Sans>
        <ScrollView>
          {place.images && place.images.length > 0 &&
            place.images.map( i => <Image source={{uri: i.urls.thumb}} style={{width: 200, height: 200, margin: 5}}/>)
          }
        </ScrollView>
        <SocialActions place={place} me={meData && meData.me}/>
      </Flex>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  section: {
    flexDirection: "column",
  },
  spinner: {
    marginTop: 30,
    color: "#000000",
    backgroundColor: "#FFFFFF"
  },
})