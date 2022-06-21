import React, { useContext, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Overlay } from 'react-native-elements';
import { ProductoContext } from '../context/ProductoContext';
import { Pedido } from '../interfaces/interfaces';
import { dataProducto } from '../interfaces/productosInterfaces';
import { AuthContext } from '../context/AuthContext';

interface Props {
    restarProducto?: Function
    sumarProducto?: Function
    cantidadProductos?: Array<{ producto: string, cantidad: number, precio: number, id: number }>
    producto: Pedido
    datos?: { nombre: string, precio: number, id: number }
}

export const Producto = ({ datos, producto }: Props) => {

    const { pedidoState, addPedido, resPedido } = useContext(ProductoContext);
    const { user } = useContext(AuthContext);

    const { pedidos } = pedidoState

    const [detalleProducto, setdetalleProducto] = useState({})

    const [visible, setVisible] = useState(false);



    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const window = Dimensions.get("window");

    return <>
        <View style={{ flexDirection: 'row', height: 140, marginHorizontal: 10, marginVertical: 10 }} >
            <TouchableOpacity style={{ backgroundColor: '#BFBFBF', width: 115, height: 150, borderRadius: 10 }} onPress={() => {
                toggleOverlay()
            }} >
                <Image style={{ width: 120, height: 150, marginBottom: 15 }} source={{ uri: 'http://192.168.1.93:9000/' + producto?.id + 'prod-planetadulce.png' }} />

            </TouchableOpacity>

            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1, marginHorizontal: 20, marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-evenly' }}>
                        <Text style={{ fontSize: 14, position: 'absolute', top: 0, right: 30 }}>Disponible</Text>
                        <Text style={{ fontSize: 14, position: 'absolute', top: 25, right: 55 }}>25</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 18, }}>Costo:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ fontSize: 18, color: '#0D3084', fontWeight: '700' }}>{
                        user ?
                            user?.rango == 1 ? producto.precio :
                                user?.rango == 2 ? producto.precio2 :
                                    producto.precio3 :
                            producto.precio
                    } $</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{
                            height: 35,
                            width: 35, backgroundColor: '#0D3084',
                            borderRadius: 100,
                            marginHorizontal: 10,
                            justifyContent: 'center'
                        }}
                            onPress={() => resPedido(producto)}><Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}
                            >-</Text></TouchableOpacity>
                        <Text style={{ fontSize: 16, color: '#0D3084', fontWeight: '700', alignSelf: 'center' }}>
                            {
                                pedidos.find((pedido) => pedido.id == producto.id)?.cantidad ?? 0}
                        </Text>
                        <TouchableOpacity style={{
                            height: 35,
                            width: 35, backgroundColor: '#0D3084',
                            borderRadius: 100,
                            marginHorizontal: 10,
                            justifyContent: 'center'
                        }}
                            // onPress={() => sumarProducto(producto?.producto == null ? datos?.nombre : producto?.producto, datos?.precio)
                            onPress={() => addPedido(producto)
                            }><Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>+</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <Text style={{ fontSize: 18, marginHorizontal: 10, marginVertical: 10, borderColor: 'rgba(13,48,132,0.5)', borderTopColor: 'white', borderWidth: 2, borderRadius: 8 }}>{datos?.nombre ?? producto?.nombre}</Text>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ height: window.width * 1.15, width: window.width * 0.90 }}>
            <View style={{ margin: 10 }}>
                <Image style={{ width: 250, height: 330, marginBottom: 15 }} source={{ uri: 'http://192.168.1.93:9000/' + producto?.id + 'prod-planetadulce.png' }} />
                <View>
                    <Text style={{ fontSize: 20 }}>{producto.nombre}</Text>
                    <Text style={{ fontSize: 16 }}>Precio {
                        user ?
                            user?.rango == 1 ? producto.precio :
                                user?.rango == 2 ? producto.precio2 :
                                    producto.precio3 :
                            producto.precio
                    } $</Text>
                </View>
            </View>
        </Overlay>
    </>;
};
