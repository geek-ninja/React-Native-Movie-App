import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AwesomeFont from 'react-native-vector-icons/FontAwesome'

const MovieRating = ({rating,ratingColor}) => {

    const avgVote = ((rating/10)*5).toFixed(1).toString()
    const [star,setStar] = useState(avgVote[0])
    const [halfStar,setHalfStar] = useState(avgVote[2])

  return (
    <View style = {styles.ratingContainer}>
        {
            Array.from({length:star}).map((s,index)=> (
                <AwesomeFont key={index} name='star' size={24} color = {ratingColor}/>
            ))
        }
        {
            halfStar >= 5 ? 
            <AwesomeFont name='star-half-full' size={24} color = {ratingColor}/> 
            :
            null
        }
        
    </View>
  )
}

export default MovieRating

const styles = StyleSheet.create({
    ratingContainer:{
        marginTop:5,
        flexDirection:'row'
    }
})