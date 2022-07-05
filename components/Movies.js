import { StyleSheet, Text, View } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import MovieList from './MovieList'
import MovieDetails from './MovieDetails'
import { createStackNavigator } from '@react-navigation/stack'
import { useRoute } from '@react-navigation/native'

const Stack = createStackNavigator()
// const Stack = createSharedElementStackNavigator()

const Movies = ({genres , ratingColor}) => {

    // const selectGenre = () => (
    //     <MovieList genres = {genres} ratingColor = {ratingColor}/>
    // )

    // const selectMovieDetail = () => (
    //   <MovieDetails ratingColor = {ratingColor}/>
    // )

  return (
    <Stack.Navigator initialRouteName='listView' headerMode="none">
        <Stack.Screen name = {"listView"}  children = {() => <MovieList genres = {genres} ratingColor = {ratingColor}/>}/>
        {/* <Stack.Screen name="listView" component={MovieList}/> */}
        <Stack.Screen name = "detailView" children = {() => <MovieDetails ratingColor = {ratingColor}/>}/>
        {/* <Stack.Screen name='detailView' component={MovieDetails} sharedElements = {(route,otherRoute,showing) => {
          const { item } = route.params;
          return [`${item.id}.image`];
        }}/> */}
    </Stack.Navigator>
  )
}

export default Movies

const styles = StyleSheet.create({})