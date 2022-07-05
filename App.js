import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useRoute} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import genres from './components/genresScreens';
import AwesomeFonts from 'react-native-vector-icons/FontAwesome5'
import Movies from './components/Movies';
import { useEffect, useState } from 'react';

const Tab = createMaterialBottomTabNavigator()


export default function App() {

  // const [isDetailView,setIsDetailView] = useState(true)
  
  // useEffect(() => {
  // }, [isDetailView])
  
  return (
    <NavigationContainer>
      <Tab.Navigator activeColor='#fff' shifting = {true} labeled = {true}>
        {
          genres.map((genre) => (
            <Tab.Screen
            key={genre.id} 
            name={genre.name} 
            children={() => <Movies genres = {genre.genresType} ratingColor = {genre.tabcolor}/>}
            options = {{
              tabBarLabel: genre.name,
              tabBarColor:genre.tabcolor,
              tabBarIcon:({color}) => (
                <AwesomeFonts name= {genre.icon} color = {color} size = {20}/>
              )
            }}
            />
          ))
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
