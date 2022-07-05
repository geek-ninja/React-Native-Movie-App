import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { LinearGradient } from 'expo-linear-gradient';
import MovieRating from './MovieRating';

const BASEURL_IMG = 'https://image.tmdb.org/t/p/original/';

const { width, height} = Dimensions.get('window')
const SPACING = 10
const ITEM_SIZE =  width * 0.72
const SPACER_ITEM_SIZE = (width - ITEM_SIZE)/2
const BACKDROP_HEIGHT = height * 0.6

const MovieDetails = ({ratingColor}) => {

  const route = useRoute()
  const item = route.params.item
//   if(route.name == 'detailView'){
//       isDetailView(false)
//   }
  
  return ( 
    <View style = {styles.movieDetailContainer}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator = {false}>
        <SharedElement id= {`${item.id}.image`}>
        <Image source={{uri: `${BASEURL_IMG}${item.backdrop_path || item.poster_path}`}} style = {styles.movieListImage}/>
    </SharedElement>
    <View style = {[styles.movieDetailInfo]}>
        <Text style = {[styles.movieDetailTitle,{color:ratingColor}]}>{item.title || item.name}</Text>
        <View style = {[styles.movieDetailDateContainer]}>
            <Text style = {[styles.movieDetailDate,{backgroundColor:ratingColor}]}>{item.release_date || item.first_air_date}</Text>
        </View>
        <Text style = {{color:ratingColor,fontSize:24,fontWeight:'800'}}>About Movie</Text>
        <Text style = {{fontSize:18}}>{item.overview}</Text>
        <MovieRating rating = {item.vote_average} ratingColor = {ratingColor}/>
    </View>
        </ScrollView>
    </View>
  )
}

// MovieDetails.sharedElements = (route, otherRoute, showing) => {
//     const { item } = route.params;
//     return [`${item.id}.image`];
// }

export default MovieDetails

const styles = StyleSheet.create({
    movieDetailContainer:{
        position:'relative',
        height:'100%',
        width:'100%',
        backgroundColor:'white'
    },
    movieListImage:{
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode:'cover',
    },
    movieDetailInfo:{
        // position:'absolute',
        // top:ITEM_SIZE + 5,
        width:'100%',
        height:'100%',
        zIndex:1,
        backgroundColor:'rgba(255, 255, 255,0.3)',
        borderRadius:24,
        padding:10
    },
    movieDetailTitle:{
        fontSize:25,
        fontWeight:'800'
    },
    movieDetailDateContainer:{
        marginVertical:8
    },
    movieDetailDate:{
        color:'white',
        fontSize:18,
        fontWeight:'600',
        padding:10,
        borderRadius:15,
        alignSelf:'flex-start'
    }
})