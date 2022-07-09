//Cristian Ivan Valdez SOlis telefono: 311366269811
//importamos los componentes necesarios para el desarrollo 
import React, { useEffect, useState } from 'react';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import RecycleViews from './componente'
import { Image, StyleSheet} from 'react-native';
//se import la libreria nativeBase solicitada
import { NativeBaseProvider, Box,View, HStack,   Center,StatusBar,IconButton, Text,Icon } from "native-base";

import AppLoading from 'expo-app-loading';
//se import el tipo de fuente solicitado
import {
  useFonts, 
  OpenSans_500Medium,
  OpenSans_600SemiBold, 
  OpenSans_800ExtraBold_Italic,
} from '@expo-google-fonts/open-sans';

 // console.log(props.data)
 //se realiza el maquetado del Actionbar, se añaden los botones menu y carro de compras
function AppBar() {
  return <>
   
      <StatusBar bg="#3700B3" barStyle="light-content" />
    
      <Box safeAreaTop bg="#6200ee" />
      <HStack bg="#6200ee" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="xl" as={MaterialIcons} name="menu" color="white" />} />
      
        </HStack>
        <HStack alignItems="center">
        <AntDesign name="enviromento"size={30} style={styles.logo}  />
          <Text style={styles.title} >
            
            territorium
          </Text>
        </HStack>
        <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="shopping-cart" size="xl" color="white" />} />
        </HStack>
      </HStack>
 
    </>;
}
//serializamos la data proveniente de la api suminsitrada
function dataParset(data){
  let temArray=[];
  ///se obtienen las llaves de los objetos de productos
  var result =new  Map( Object.entries(data.products)); 
 // console.log(result.values() ) ;
 //se crea  el objeto serializado
  for(var ele of result.values()){
        temArray.push({
          "foto":ele.thumbnail,
          "categoria":ele.category,
          "titulo":ele.title,
          "descripcion":ele.description,
          "precio":ele.price,
          });}
  
   
  return temArray;
   
  
}

/// obtenemos los datos  y renderizamos los componentes  portada y recyclerview

function  Logico() {
  //definimos un estado para evitar renderizar  componentes sin datos para consumir
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);   
  const fetchData = async () => {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();
    setData(data);
  
    setLoading(false);
    
  };
  useEffect(() => {
    fetchData();
  }, []);
/// en  el mockupt  presentado se evidencia un doble scroll   en el que está el componente listview de native base
///pero no es lo ideal para este tipo de UI, lo ideal es usar  el componente recyclerView
//porqué la api retorna muchos objetos lo cual hace muy conveniente la reutilizción de componentes renderizados
  return <>
           <Box style={styles.container} bg="black">
       <Image source={{ uri: 'https://i.ibb.co/RYy5RMt/Captura-de-pantalla-2022-07-07-234853.png' }} alt="Alternate Text" size="xl" style={styles.imagePrimary}  blurRadius={1}/>
       <Text style={styles.text1}>Nuevo Curso</Text>
       <Text style={styles.text2}>TÉCNICAS DE ILUSTRACIÓN PARA LIBROS INFANTILES </Text>
       <Text style={styles.text3}>Ver más</Text>
      </Box>
        {isLoading ? <Center  horizontal="center" height="100%"><Text>Loading...</Text></Center>:
       
         <RecycleViews arreglo={dataParset(data)}/>           
        }  
      
    </>;
};
//la siguiente función contendra el resumen de los componentes a renderizar
export default function App() {
  //se cargan las fuentes de texto
  let [fontsLoaded] = useFonts({
    OpenSans_500Medium,
  OpenSans_600SemiBold, 
  OpenSans_800ExtraBold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return ( 
    <NativeBaseProvider>
       
     
      <View   height="100%"> 
    
      <AppBar></AppBar>
    
   
     
      <Logico ></Logico>
          
      </View>

    </NativeBaseProvider>

    
  );}

}


//definimos los estilos de los compomentes
const styles = StyleSheet.create({
  title:{
    color:'white',
    fontFamily:'OpenSans_800ExtraBold_Italic',
    fontSize:25,
    fontWeight:"bold"
  },
  text1:{
    color:'white',
    fontSize:15,
    marginLeft:40,
    marginTop:50,
    fontFamily: 'OpenSans_500Medium',

  },
    text2:{
    fontSize:20,
    color:'white',
    marginLeft:40,
    marginTop:4,
    fontFamily: 'OpenSans_500Medium',
   

  },  text3:{
    color:'white',
    marginLeft:40,
    marginTop:10,
    fontSize:19,
    fontFamily: 'OpenSans_500Medium',

  },
  container:{
    width: '100%' ,
    height:200
  },
 
  imagePrimary: {
    opacity: 0.5,
    position: 'absolute',
    width: "100%", height: "100%"
  },
logo:{
  color:"white" ,  transform: [{rotate: '89deg'}]
},
  
  
  

});

