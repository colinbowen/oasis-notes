import React from 'React'

import { createSwitchNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';


const SignInStack = createSwitchNavigator({
    SignIn: SignInScreen,
    Register: RegisterScreen,
    ResetPassword: ResetPasswordScreen,
},
{
  initialRouteName: 'SignIn',
}
)
  

export default SignInStack;