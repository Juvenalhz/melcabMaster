import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {
    titulo: string,
    pathw: string
}

export const Categorias = ({ titulo, navigation, pathw }: Props) => {


    
    return (
        <View>
            <TouchableOpacity style={styles.btnCategoria}
                onPress={() => navigation.navigate('Productos')}>
                <Image style={{ width: 100, height: 100, alignItems: 'center' }} source={require(pathw)} />
            </TouchableOpacity>
            <Text style={styles.texto}>{titulo}</Text>
        </View>

    )



}

const styles = StyleSheet.create({
    btnCategoria: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        height: 150,
        width: 150,
        borderRadius: 10,
        justifyContent: 'center'
    },
    texto: {
        color: '#0D3084',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})