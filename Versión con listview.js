import React, { useEffect, useState } from 'react';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo';
import { Image, StyleSheet} from 'react-native';
import { NativeBaseProvider, Box,View,AspectRatio, HStack, Stack,  Center,StatusBar,IconButton, Text,Icon,Left  ,FlatList, Menu ,Pressable,HamburgerIcon,ScrollView, Container} from "native-base";

function AppBar() {
  return <>
   
      <StatusBar bg="#3700B3" barStyle="light-content" />
    
      <Box safeAreaTop bg="#6200ee" />
      <HStack bg="#6200ee" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="xl" as={MaterialIcons} name="menu" color="white" />} />
      
        </HStack>
        <HStack alignItems="center">
        <AntDesign name="enviromento"size={20} style={styles.logo}  />
          <Text color="white" fontSize="20" fontWeight="bold">
            
            Territorium
          </Text>
        </HStack>
        <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="shopping-cart" size="xl" color="white" />} />
        </HStack>
      </HStack>
 
    </>;
}

function  ScrollData() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);   

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return <>
      
         
        
      <Box style={styles.container} bg="black">
       
       <Image source={{ uri: 'https://i.ibb.co/RYy5RMt/Captura-de-pantalla-2022-07-07-234853.png" alt="Captura-de-pantalla-2022-07-07-234853' }} alt="Alternate Text" size="xl" style={styles.imagePrimary}  blurRadius={1}/>
       <Text style={styles.text1}>Nuevo Curso</Text>
       <Text style={styles.text2}>TÉCNICAS DE ILUSTRACIÓN PARA LIBROS INFANTILES </Text>
       <Text style={styles.text3}>Ver más</Text>
      </Box>
     
        {isLoading ? <Center  horizontal="center" height="100%"><Text>Loading...</Text></Center>:
        <FlatList
      
        initialNumToRender={4}
       
        data={data.products}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          
         <Cardviews product={item} ></Cardviews>
        )}
      />}
  
     
    </>;
};
const Cardviews = (props) => {
  
  return <Box alignItems="center" paddingTop={5}>
     <Pressable onLongPress={() => console.log("I'm Pressed")}>
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
            uri:   props.product.thumbnail
          }} alt="image" />
          </AspectRatio>
      
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
       <Text style={styles.cardCategory}>{props.product.category}</Text>
       <Text style={styles.cardTitle}>{props.product.title}</Text>
          </Stack>
          <Text fontWeight="400" style={styles.cardDescription}>
           "{props.product.description}"
           </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack justifyContent="space-between"  width="100%" >
            <Text style={styles.cardAdd}> 
               + Add  to cart
              </Text> 
            
              <Text  marginRight="0" style={styles.cardPrice}> 
              ${props.product.price}
              </Text>

          
            </HStack>
          </HStack>
        </Stack>
      </Box>
      </Pressable>
    </Box>;
};

export default function App() {


  return ( 
    <NativeBaseProvider>
       
     
      <View  bg="black" height="100%">
      <StatusBar bg="#3700B3" barStyle="light-content" />
    
      <AppBar></AppBar>
    
   
     
      <ScrollData ></ScrollData>
          
      </View>

    </NativeBaseProvider>

    
  );

}



const styles = StyleSheet.create({
  text1:{
    color:'white',
    marginLeft:40,
    marginTop:50

  },
    text2:{
    fontSize:20,
    color:'white',
    marginLeft:40,
    marginTop:4
   

  },  text3:{
    color:'white',
    marginLeft:40,
    marginTop:10,
    fontSize:12

  },
  container:{
    width: '100%' ,
    height:200
  },
  scroll:{
    width: "100%", height:"100%" 
  },
  imagePrimary: {
    opacity: 0.5,
    position: 'absolute',
    width: "100%", height: "100%"
  },
  cardCategory: {color:"#91AEE6"},
  cardTitle: {color:"black", fontSize:20 },
  
  cardDescription: {color:"gray"},
  
  cardAdd:{color:"#7FAAFF",fontSize:20},
  cardPrice:{textAlign: 'right'
,fontSize:20},
logo:{
  color:"white" ,  transform: [{rotate: '89deg'}]
}
  
  

});

