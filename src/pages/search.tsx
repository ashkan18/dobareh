import React from 'react';
import { Flex, Button, Spinner } from "@artsy/palette"
import gql from "graphql-tag";
import { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { FlatList } from "react-native";
import { PlaceItem } from "../components/placeItem";


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
export const Search = (props: any) => {
  const [where, setWhere] = useState({lat: 40.689786, lng: -73.9748801})
  const [search, { called, loading, error, data }] = useLazyQuery(FIND_PLACES)
  const onSubmit = () => {
    search({variables: {location: where}})
  }
  return (
    <Flex flexDirection="column">
      <Button onPress={() => onSubmit() }>Search</Button>
      { loading && <Spinner/>}
      { called && !loading && data && <FlatList data={data.places.edges.map( e => e.node)} renderItem={({item}) => <PlaceItem place={item} /> }/>}
    </Flex>
  )
}
