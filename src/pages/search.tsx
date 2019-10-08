import React from 'react';


import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import gql from "graphql-tag";
import { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { PlaceItem } from "../components/placeItem";
import { Flex, Button } from "@artsy/palette"


const FIND_PLACES = gql`
  query findPlaces($location: LocationInput, $address: String, $term: String) {
    places(first: 100, location: $location, address: $address, term: $term){
      edges{
        node{
          id
          name
          workingHours
          tags
          images {
            urls {
              original
              thumb
            }
          }
        }
      }
    }
  }
`
interface Props {
  navigation: any
}
export const Search = (props: Props) => {
  const {navigation} = props
  const [where, setWhere] = useState({lat: 40.689786, lng: -73.9748801})
  const [address, setAddress] = useState()
  const [search, { called, loading, error, data }] = useLazyQuery(FIND_PLACES)
  const onSubmit = () => {
    search({variables: {location: where}})
  }
  if (loading) {
    return(
      <ActivityIndicator size="large" style={styles.spinner}/>
    )
  }
  return (
    <SafeAreaView>
      <Flex flexDirection="column">
        <Flex flexDirection="row" style={{border: "2px"}}>
          <TextInput style={{height: 20, flexGrow: 1}} placeholder="Where" value={address} onChangeText={ (text) => setAddress(text) }/>
          <Button size="small" onPress={() => onSubmit() }>Search</Button>
        </Flex>
        { called && !loading && data && <FlatList data={data.places.edges.map( e => e.node)} renderItem={({item}) => <PlaceItem place={item} navigation={navigation}/>} />}
      </Flex>
    </SafeAreaView>
  )
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