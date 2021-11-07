//Rotas acessiveis apenas se o usuario estiver autenticado
import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import BottomTab from '../components/BottomTab';
import BottomTabAdm from '../components/BottomTabAdm';
import ChatRoom from '../screens/Chat/ChatRoom';
import DetailsAds from '../screens/Search/DetailsAds';
import Details from '../screens/Search/Details';



const AppStack = createStackNavigator();

const AppRoutes = () => {
   return(
     
       <AppStack.Navigator  independent={true}
       screenOptions={{
         headerStyle: {
           backgroundColor: "transparent",
         },
         headerTintColor: "#3F37C9",
         headerTransparent: true,
         headerTitle: "",
         headerLeftContainerStyle: {
           paddingLeft: 20,
         },
       }}>
         
           <AppStack.Screen name="BottomTabAdm" component={BottomTabAdm} />
          
          <AppStack.Screen name='ChatRoom' component={ChatRoom} />
            <AppStack.Screen name='Details' component={Details} />
            <AppStack.Screen name='DetailsAds' component={DetailsAds} />
       </AppStack.Navigator>
   )
}

export default AppRoutes;
