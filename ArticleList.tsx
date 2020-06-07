import React, { FC, useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
import { ArticleData } from './ArticleData';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

export type ArticleListRouteProps = RouteProp<RootStackParamList, 'Article'>;


const sourceList: string[] = [
    'https://news.yahoo.co.jp/pickup/rss.xml',
    'https://www.newsweekjapan.jp/story/rss.xml',
//    'https://news.google.com/rss?hl=en-US&ie=UTF-8&oe=UTF-8&topic=b&gl=US&ceid=US:en',
];

const getRSS = async (source: string): Promise<ArticleData[]> => {
    const response = await axios.get<string>(source);
    const rss      = await rssParser.parse(response.data);
    const articles = [...rss.items].map<ArticleData>(value =>
        ({ title: value.title, link: value.links[0].url }));
    return articles;
}

const ArctileList: FC = () => {
    let [list, setList] = useState(new Array<ArticleData>());
    const navigation = useNavigation();
    const params = useRoute<ArticleListRouteProps>().params;

    useEffect(() => {
        sourceList.forEach( (element) => {
            getRSS(element).then(articles => {
                let newArticles : ArticleData[] = list;
                articles.forEach( article => {
                    newArticles.push(article);
                } )
                setList(newArticles);
            });
        });
    },[]);

    return (
        <FlatList
            data={list}
            renderItem={({ item }) =>
                <TouchableOpacity style={styles.item}
                    onPress={() => navigation.navigate('Article',
                        { title: item.title, link: item.link })}>
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            }
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 4,
    },
    title: {
        fontSize: 24
    }
})

export default ArctileList;