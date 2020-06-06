import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, DrawerLayoutAndroidComponent } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import * as rssParser from 'react-native-rss-parser';
import { ArticleData } from './ArticleData';
import ArctileList from './ArticleList';
import Article from './Article';

const sourceList: string[] = [
  'https://www.newsweekjapan.jp/story/rss.xml',
  'https://news.google.com/rss?hl=en-US&ie=UTF-8&oe=UTF-8&topic=b&gl=US&ceid=US:en',
  'https://news.yahoo.co.jp/pickup/rss.xml'
];

const getRSS = async (source: string): Promise<ArticleData[]> => {
  console.log('get rss!' + source);
  const response = await axios.get<string>(source);
  const rss = await rssParser.parse(response.data);
  const titles = [...rss.items].map(value => value.title);
  const urls = [...rss.items].map(value => value.links[0].url);
  const categories = [...rss.items].map(value => value.categories[0]?.name);
  let articles: ArticleData[] = [];
  for (let i = 0; i < titles.length; i++) {
    articles.push({ id: i, title: titles[i], url: urls[i], category: categories[i] });
  }
  return articles;
}

export default function App() {
  const [list, setList] = useState(new Array<ArticleData>(0));

  useEffect(() => {
    sourceList.forEach(element => {
      getRSS(element).then(articles =>setList(list.concat(articles)));
      console.log(list);
    });
    console.log('render!');
  }, []);

  return (
    <View style={styles.container}>
      <ArctileList list={list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
