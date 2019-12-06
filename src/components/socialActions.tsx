import * as React from "react"
import { Spinner, Flex, HeartFillIcon, MessageIcon, Modal, Sans, Input, Button, Box, Message, HeartIcon } from "@artsy/palette"

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import PhotoUpload from "./photoUpload";

interface Props {
  place: any
  me: any
}

const ADD_TO_LIST_MUTATION = gql`
  mutation AddToList($placeId: ID!, $listType: String!){
    addToList(placeId: $placeId, listType: $listType){
      id
    }
  }
`
const PLACE_INVITE = gql`
  mutation InviteToPlace($placeId: ID, $guestEmails: [String!]) {
    inviteToPlace(placeId: $placeId, guestEmails: $guestEmails) {
      id
    }
  }
`


export const SocialActions = (props: Props) => {
  const {place, me} = props
  const {myLists} = place
  const [addToListMutation, { loading: addToListLoading, called: addToListCalled }] = useMutation(ADD_TO_LIST_MUTATION)
  const alreadyLiked = addToListCalled || (myLists && myLists.some(l => l.listType === "planning_to_go"))

  return(
    <>
      <Flex flexDirection="row" justifyContent="space-between" m="auto" mt={1} mb={2} >
        <PhotoUpload me={me} place={place}/>
        {alreadyLiked && <HeartFillIcon mr={1} ml={1} width={25} height={25} style={{cursor: "pointer"}} fill='red100'/> }
        {!alreadyLiked && <HeartIcon mr={1} ml={1} width={25} height={25} style={{cursor: "pointer"}} onClick={(e) => addToListMutation({variables: {placeId: place.id, listType: "planning_to_go"}})} /> }
      </Flex>
    </>
  )
}
