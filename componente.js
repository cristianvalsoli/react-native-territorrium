import React, { Component } from "react";
import { Image,  Dimensions ,StyleSheet} from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

import { NativeBaseProvider, Box,View,AspectRatio, HStack, Stack,  Center,StatusBar,IconButton, Text,Icon,Left  ,FlatList, Menu ,Pressable,HamburgerIcon} from "native-base";
  
import AppLoading from 'expo-app-loading';
 


  
// se maqueta  la cardview  con la que se mostraran los articulos disponibles
 
const Cardviews = (props) => {
    

    return <View>    
    <Box alignItems="center"marginTop={5} marginBottom={5}   >
      
        <Box  marginTop={5} marginBottom={5} paddingTo={4}  paddingBottom={4}    maxW="80" rounded="xl" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
              uri:  props.data.foto
            }} alt="image" style={styles.image} />
            </AspectRatio>
        
          </Box>
          <Stack  space={3}  >
            <Stack space={2}>
         <Text style={styles.cardCategory}>{props.data.categoria}</Text>
         <Text style={styles.cardTitle}>{props.data.titulo}</Text>
            </Stack>
            <Text fontWeight="400" style={styles.cardDescription}>
             "{props.data.descripcion}"
             </Text>
            <HStack alignItems="center" space={1} justifyContent="space-between">
              <HStack justifyContent="space-between"  width="100%" >
              <Text style={styles.cardAdd}> 
                 + Add  to cart
                </Text> 
              
                <Text  marginRight="0" style={styles.cardPrice}> 
                ${props.data.precio}
                </Text>
  
            
              </HStack>
            </HStack>
          </Stack>
        </Box>
      
      </Box>
      </View>;

  };
  
 
export default class RecycleViews extends React.Component {
   constructor(props) {
       super(props);
       //se obtiene el ancho de  pantalla
       let { width } = Dimensions.get("window");
///no sé porque lo hacen asi en la documentación
          let dataProvider = new DataProvider((r1, r2) => {
           return r1 !== r2;
       });

      
         //se crea un layout provider
       this._layoutProvider = new LayoutProvider(
           index => {
              
                   return 0;
                
           },
           (type, dim) => {
            //definimos el tamaño general de las cardviews
    
              dim.width = width ;
              dim.height = 400;
             
           }
       );

       this._rowRenderer = this._rowRenderer.bind(this);


       // nos aseguramos  de que el compomente siempre va a estar actualizado 
       this.state = {
           dataProvider: dataProvider.cloneWithRows(props.arreglo)
       };
   }
 

   //se retorn las cardviews con los  datos de cada objeto
   _rowRenderer(type, data) {
        
       return  <Cardviews data={data}></Cardviews> 
   }
  

   render() {



    
       return  <NativeBaseProvider>
                  
                   <RecyclerListView  layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />
        
                </NativeBaseProvider>;
            
 
  
  }
}
 





const styles = StyleSheet.create({
 
   
  image: {
    resizeMode: "contain",
    
   
  },
  cardCategory: {color:"#91AEE6",paddingLeft:15,  fontFamily: 'OpenSans_500Medium'},
  cardTitle: {color:"black", fontSize:20,  fontFamily: 'OpenSans_500Medium',
  paddingLeft:15
  ,  fontFamily: 'OpenSans_500Medium'
 },
  
  cardDescription: {color:"gray",  
paddingLeft:15,
paddingRight:15,
fontFamily: 'OpenSans_500Medium'},
  
  cardAdd:{color:"#7FAAFF",
  fontSize:20,
  paddingLeft:15,
  paddingBottom:10, 
  fontFamily: 'OpenSans_500Medium'},
  cardPrice:{textAlign: 'right'
            ,fontSize:20,
            paddingRight:15
            }  

});

