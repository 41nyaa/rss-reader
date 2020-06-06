import React, {FC} from 'react';
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {ArticleData} from './ArticleData'
;
export type ArticleProps = {
    data : ArticleData;
};
const Article : FC<ArticleProps> = ({data}) => {

    return (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.title}>{data.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 4,
    },
    title :{
        fontSize : 24
    }
});

export default Article;