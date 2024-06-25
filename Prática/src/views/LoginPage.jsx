import FullPageLoader from '../components/FullPageLoader.jsx';
import { useEffect, useState } from 'react';
import { auth, signUp, signIn } from '../firebase/config.js';
import { useToast, Button, propNames } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import 'ldrs/ring'
import { sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import {useDispatch} from 'react-redux';
import { setUser } from '../store/usersSlice.js';
import { useSelector } from 'react-redux';
import { selectBooks } from '../store/booksSlice.js';
import { fetchBooks } from '../store/booksSlice.js';

import { hourglass } from 'ldrs'

hourglass.register()




function LoginPage() {
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [msgError, setMsgError] = useState();
  const [error, setError] = useState()
  const bookStatus = useSelector(selectBooks).status;
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });






  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
  }


  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMsgError('');

    try {
      await signUp(userCredentials.email, userCredentials.password);
      Swal.fire({
        icon: "success",
        title: "Conta criada!",
        text: "Sua conta foi criada com sucesso!"
      });
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };


  //observa o estado do usuario para fazer modificações em variaveis globais de acordo com o status do usuario
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }))
      if (bookStatus == 'idle') {
        (dispatch(fetchBooks()))
      }

      const uid = user.uid;
      // ...
    } else {
      dispatch(setUser(null))
    }

    if(isLoading){
    setIsLoading(false);
    }
  });





  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMsgError('');

    try {
      const user = await signIn(userCredentials.email, userCredentials.password);

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }

  }


  const handlePasswordReset = () => {
    const email = prompt("Digite seu email")
    sendPasswordResetEmail(auth, email);
    alert("Email sent, check your inbox")
  }





  return (
    <>
      {isLoading &&


        <FullPageLoader bg="rgb(0.5,0.5,0.5,0.5)" />



      }

      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == 'login' ? 'selected' : ''}`}
              onClick={() => setLoginType('login')}>
              Login
            </button>
            <button
              className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
              onClick={() => setLoginType('signup')}>
              Signup
            </button>
          </div>
          <form className="add-form login" onSubmit={loginType == 'login' ? (e) => handleSignIn(e) : (e) => handleSignup(e)}>
            <div className="form-control">
              <label>Email *</label>
              <input type="text" name="email" onChange={(e) => handleCredentials(e)} placeholder="Enter your email" />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input type="password" name="password" onChange={(e) => handleCredentials(e)} placeholder="Enter your password" />
            </div>
            {
              loginType == 'login' ?
                <button className="active btn btn-block">Login</button>
                :
                <button className="active btn btn-block">Sign Up</button>
            }

            <p onClick={() => handlePasswordReset()} className="forgot-password">Forgot Password?</p>

          </form>
        </section>

      </div>
    </>
  )
}

export default LoginPage
