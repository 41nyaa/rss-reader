import React, { FC } from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

export type ArticleRouteProps = RouteProp<RootStackParamList,'Article'>;

const Article: FC = () => {
    const navigation = useNavigation();
    const params = useRoute<ArticleRouteProps>().params;
    return (
            <WebView source={{uri: params.link}}>
            </WebView>
    );
}

export default Article;