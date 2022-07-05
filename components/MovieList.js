import { Dimensions, StyleSheet, Text, View, FlatList, Image, Animated, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import movieTypes from '../api/movieTypes'
import axios from 'axios'
import { LinearGradient} from 'expo-linear-gradient'
import { SharedElement } from 'react-navigation-shared-element'
import MovieRating from './MovieRating'

const { width, height} = Dimensions.get('window')
const SPACING = 10
const ITEM_SIZE =  width * 0.72
const SPACER_ITEM_SIZE = (width - ITEM_SIZE)/2
const BACKDROP_HEIGHT = height * 0.6

const BASEURL = "https://api.themoviedb.org/3"
const BASEURL_IMG = 'https://image.tmdb.org/t/p/original/';

const Loading = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.paragraph}>Loading...</Text>
    </View>
);

const Backdrop = ({movies,scrollX}) => {
    return (
        <View style = {{position:'absolute',top:0,width,height:BACKDROP_HEIGHT}}>
            <FlatList 
            data={movies}
            keyExtractor={item => item.id}
            removeClippedSubviews={false}
            contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
            renderItem = {({item,index}) => {

                if(!item.backdrop_path || !item.poster_path){
                    return null
                }
                const inputRange = [
                    (index - 2) * ITEM_SIZE,
                    (index - 1) * ITEM_SIZE
                ]
                const translateX = scrollX.interpolate({
                    inputRange,
                    outputRange:[-width,0]
                })
                return (
                    // <MaskedView 
                    // style = {{position:'absolute'}}
                    // maskElement = {
                    //     <Svg width={width} height={height} viewBox = {`0 0 ${width} ${height}`}>
                    //         <Rect x='0' y='0' width = {width} height = {height} fill = 'red'/>
                    //     </Svg>
                    // }
                    // >   
                    // </MaskedView>
                    <Animated.View removeClippedSubviews={false} style = {{transform:[{translateX}]}}>
                        <Image 
                        source={{uri: `${BASEURL_IMG}${item.backdrop_path || item.poster_path}`}}
                        style = {{
                            position:'absolute',
                            width,
                            height:BACKDROP_HEIGHT,
                            resizeMode:'cover'
                        }}
                        />
                    </Animated.View>
                )
            }}
            />
            <LinearGradient 
            colors={['transparent','white']}
            style = {{
                width,
                height:BACKDROP_HEIGHT * 0.8 ,
                position:'absolute',
                bottom:0
            }}
            />
        </View>
    )
}

const MovieList = ({genres,ratingColor}) => {

    // const route = useRoute()
    // if(route.name != 'detailView'){
    //     isDetailView(true)
    // }

    const navigation = useNavigation()
    // const testurl = movieTypes.fetchTrending
    const scrollX = useRef(new Animated.Value(0)).current
    const [moviesData,setMoviesData] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await axios.get(`${BASEURL}${genres}`)
            setMoviesData([{id:'left-spacer'},...response.data.results,{id:'right-spacer'}])
        }
        if( moviesData.length <= 0){
            fetchMovies()
        }
    }, [])

    if(moviesData.length === 0){
        return <Loading/>
    }

  return (
    <View style = {styles.movieListContainer}>
      <Backdrop movies = {moviesData} scrollX = {scrollX}/>
      <Animated.FlatList
        showsHorizontalScrollIndicator = {false}
        data = {moviesData}
        keyExtractor = {(item) => item.id}
        horizontal
        snapToInterval={ITEM_SIZE}
        decelerationRate = {0}
        onScroll = {Animated.event(
            [{nativeEvent: {contentOffset: {x:scrollX}}}],
            {useNativeDriver:true}
        )}
        scrollEventThrottle = {16}
        bounces = {false}

        contentContainerStyle={{
            alignItems:'center'
        }}
        renderItem = {({item,index}) => {
            if(!item.backdrop_path || !item.poster_path){
                return (
                    <View key={item.id} style = {{width:SPACER_ITEM_SIZE}}/>
                )
            }
            const inputRange = [
                (index - 2) * ITEM_SIZE,(index-1) * ITEM_SIZE,(index) * ITEM_SIZE
            ]
            const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [100,50,100]
            })
            return(
                <TouchableOpacity 
                    key={item.id} 
                    activeOpacity = {0.8} 
                    onPress = {() => navigation.push('detailView',{item})}>
                    <View style = {{width: ITEM_SIZE}}>
                        <Animated.View 
                        style = {{
                            marginHorizontal: SPACING,
                            padding:SPACING*2,
                            alignItems:'center',
                            backgroundColor:'white',
                            borderRadius:34,
                            transform:[{translateY}]
                        }}>
                            <SharedElement id= {`${item.id}.image`} style = {styles.movieListImage}>
                                <Image source={{uri: `${BASEURL_IMG}${item.backdrop_path || item.poster_path}`}} style = {styles.movieListImage}/>
                            </SharedElement>
                            <Text style = {{fontSize:24,fontWeight:'600'}} numberOfLines = {1}>{item.title || item.name}</Text>
                            <Text style = {{fontSize:12}} numberOfLines = {3}>{item.overview}</Text>
                            <MovieRating rating = {item.vote_average} ratingColor = {ratingColor}/>
                        </Animated.View>
                    </View>
                </TouchableOpacity>
            )   
        }}
        />
    </View>
  )
}

export default MovieList

const styles = StyleSheet.create({
    movieListContainer:{
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    loadingContainer: {
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    movieListImage:{
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    }
})