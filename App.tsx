import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopicSelector from './TopicSelector';
import ArticleList from './ArticleList';
import Article from './Article';

export type RootStackParamList = {
  TopicSelector: undefined;
  ArticleList: { topic: string };
  Article: { title: string, link: string };
}
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TopicSelector">
        <Stack.Screen name="TopicSelector" component={TopicSelector} />
        <Stack.Screen name="ArticleList" component={ArticleList} />
        <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
