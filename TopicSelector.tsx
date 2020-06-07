import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopicSelector = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Button title='News' onPress={() => navigation.navigate('ArticleList', { topic: '' })} />
        </View>
    );
}
export default TopicSelector;
