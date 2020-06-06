import React, {FC} from 'react';
import { FlatList, Text } from "react-native";
import Article from "./Article";
import {ArticleData} from './ArticleData';

type ArctileListProps = {
    list : ArticleData[];
}

const ArctileList : FC<ArctileListProps> = ({list}) => {

    return (
        <FlatList
        data={list}
        renderItem={({item}) => <Article data={item}/>}
        />    
    );
}

export default ArctileList;