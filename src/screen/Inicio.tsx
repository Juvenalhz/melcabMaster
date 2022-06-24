import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppBar } from '../componentes/AppBar'
import { Categorias } from '../componentes/Categorias'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductoProvider } from '../context/ProductoProvider';
import { useWindowDimensions } from 'react-native';
import { ProductoContext } from '../context/ProductoContext';
import { DrawerScreenProps } from '@react-navigation/drawer';
import api from '../api/endpoint/Endpoint';
import { LongPressGestureHandler, ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';
import { Maps } from './Maps';
import { io } from 'socket.io-client';
import { Ordenes } from './Ordenes';




interface Props extends DrawerScreenProps<any, any> {
}

interface marcas {
    marcas: marca[]
}

interface marca {
    id: number,
    nombre: string,
    img?: [] | null
}

export const Inicio = ({ navigation, route }: Props) => {

    const window = Dimensions.get("window");
 
    const { pedidoState, addPedido } = useContext(ProductoContext);
    const { user, token, actDatosUser } = useContext(AuthContext);

      useEffect(() => {
        const socket = io("https://tuplanetadulce.com");

        if (user) socket.emit('indentificando', `user${user?.id}`)

        socket.on("mensaje", data => {
          console.log(data, 'si');
        });

        socket.on("actualizarUser", data => {
            actDatosUser(data);
          });

          return () => {
              socket.off()
          }         
      }, [user?.id]);



    const [marcasMelcab, setmarcasMelcab] = useState<marcas>()

    useEffect(() => {
        api.get('/marcas').then(resp => {
//console.log(resp.data)
            setmarcasMelcab(resp.data);
        })
    }, [])



    if (user && !user.direccion) {
        return (
            <>
                {/* appbar */}
                <AppBar titulo={'Agregue direccion de Local'} navigation={navigation} route={route} />
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Maps navigation={navigation} route={route} />
                </View>
            </>
        );
    } else if (true) {
        //{console.log(user?.direccion)}

        if (user?.tipouser != 2 || route.params?.verProductos) {
            return (
                <>
                    {/* appbar */}
                    <AppBar titulo={'Planeta Dulce'} navigation={navigation} route={route} />
                    {/* body */}
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1, backgroundColor: "#fff" }}>
                            {/* slider */}
                            <View style={{ height: (window.height * 0.40), backgroundColor: "#BFBFBF" }}>
                                <Image style={{ width: '100%', marginBottom: 15, height: '100%' }} source={require('../../utils/logosbancos/LogoPlaneta_Final.jpg')} />
                            </View>
                            {/* Categorias */}
                            <View style={{ flex: 1, flexDirection: "column" }}>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                    {marcasMelcab?.marcas.map((marca) => (
                                        <View key={marca.id}>
                                            <TouchableOpacity style={styles.btnCategoria}
                                                onPress={() => navigation.navigate('Productos', { marcaid: marca.id })}>
                                                <Image style={{ width: 140, height: 140, alignItems: 'center' }} source={{ uri: 'https://tuplanetadulce.com/' + marca.id + 'marcas-planetadulce.png' }} /> 
                                            </TouchableOpacity>
                                            <Text style={styles.texto}>{marca.nombre}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {/* bottom */}

                    <View style={{ flexDirection: 'row', flex: 0.1 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Pedido')}>
                            <View style={{
                                elevation: 10,
                                shadowColor: 'black',
                                flex: 1, borderTopEndRadius: 10, backgroundColor: '#EEEEEE', borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center'

                            }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#0D3084', fontSize: 18 }}> TOTAL </Text>
                                        <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> - </Text>
                                        <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> $ {Math.round((pedidoState.total + Number.EPSILON) * 100) / 100} </Text>
                                    </View>
                                    <Text style={{ color: '#0D3084', fontSize: 12, alignSelf: 'center' }}> Ver Pedido </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </>

            );
        } else 
        return (
            <>
              <Ordenes navigation={navigation} route={route}/>
            </>
    
        );

    }
    {console.log(user?.direccion)}
    return (
        <>
            {/* appbar */}
            <AppBar titulo={'Planeta Dulce'} navigation={navigation} route={route} />
            {/* body */}
            <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        </>

    );


}

const styles = StyleSheet.create({
    btnCategoria: {
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        flex: 0.8
    },
    texto: {
        color: '#0D3084',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})