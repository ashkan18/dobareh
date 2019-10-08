import React from 'react';


import { SafeAreaView, StyleSheet, ActivityIndicator} from "react-native";
import { Flex, Sans } from "@artsy/palette"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"


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

export const PlaceDetail = (props: Props) => {
  const {navigation} = props
  const id = navigation.getParam("id")
  const {loading, data} = useQuery(FIND_PLACE_QUERY, {variables: {id: id}})
  if (loading) {
    return(
      <ActivityIndicator size="large" style={styles.spinner}/>
    )
  }
  if (data && data.place) {
    const {place} = data
    return (
      <SafeAreaView>
        <Flex flexDirection="column">
          <Sans size={4}>{place.name}</Sans>
        </Flex>
      </SafeAreaView>
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