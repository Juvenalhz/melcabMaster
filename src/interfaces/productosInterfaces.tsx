// Generated by https://quicktype.io

export interface JSONProductos {
    productos: dataProducto[];
}

export interface dataProducto { 
    id:          number;
    nombre:      string;
    descripcion: string;
    img:         string;
    precio:      number;
    marca:       number;
}