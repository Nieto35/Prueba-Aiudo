import React, { useState } from "react";
// COMPONENTES CON ESTILO
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
// CLOSE COMPONENTES CON ESTILO
// Firebase, FIREBASE CON FACEBOOK
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
// CLOSE Firebase, FIREBASE CON FACEBOOK
// COMPONENTES
import Footer from "@components/Footer";
import AlertDismissible from "@components/notifications";
// CLOSE COMPONENTES
// ESTILOS
import "@styles/login/index.css";

function Login() {
  // VARIABLES CREADAS PARA AUTENTIFICACION
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const auth = getAuth();
  const provider = new FacebookAuthProvider();
  // CLOSE VARIABLES CREADAS PARA AUTENTIFICACION

  // ALERT
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [show, setShow] = useState(false);
  // CLOSE ALERT

  // CREAR USUARIO ES NECESARIO UN EMAIL VALIDO Y UNA PASSWORD MAYOR A 6 DIGITOS
  const submit = async () => {
    try {
      // SI TODO SALE BIEN CREA EL USUARIO Y LO LOGEA
      await createUserWithEmailAndPassword(auth, email, passWord);
    } catch (err) {
      // SI SALE MAN HABILITA LA ALERTA Y MUESTRA EL ERROR
      setTitle("¡Error!");
      setTextBody(
        "la password debe tener mas de 6 digitos y el email debe ser correcto!"
      );
      setShow(true);
    }
  };
  // CLOSE CREAR USUARIO ES NECESARIO UN EMAIL VALIDO Y UNA PASSWORD MAYOR A 6 DIGITOS

  // LOGIN CON CORREO Y USUARIO CREADOS
  const login = async () => {
    try {
      // LOGEA SI TODO SALE BIEN
      await signInWithEmailAndPassword(auth, email, passWord);
    } catch (err) {
      // HABILITA ALERTA CON MENSAJE
      setTitle("¡Error!");
      setTextBody("email o password incorrecto!");
      setShow(true);
    }
  };
  // CLOSE LOGIN CON CORREO Y USUARIO CREADOS

  // LOGIN CON FACEBOOK RECORDAR QUE DEBE ESTAR EN LOCALHOST Y EL USUARIO DEBE ESTAR EN CALIFICADORES
  // SEGUN LA DOCUMENTACION DE FACEBOOK NO SE PUEDE UTILIZAR PARA CUALQUIERA SI NO ESTA EN UNA URL
  const sigInWithFacebook = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // SI TODO SALE BIEN LOGEA CON FACEBOOK

        // podemos obetener los datos del usuario con estas variables
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        // HABILITA ALERTA SI ALGO SALE MAL
        setTitle("¡Error!");
        setTextBody(
          "Recuerda tu facebook debe estar en calificadores, escribeme te agrego!, tel: 671033348"
        );
        setShow(true);

        // EN ESTA PARTE PODEMOS CAPTURAR EL ERROR PRECISO, PARA ESTE PROGRAMA NO LO CONSIDERE NECESARIO.
        // SI QUIEREN SABER QUE ERROR TIENEN PUEDEN HACER CONSOLE LOG A ESTAS CONSTANTES.

        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  // CLOSE LOGIN CON FACEBOOK RECORDAR QUE DEBE ESTAR EN LOCALHOST Y EL USUARIO DEBE ESTAR EN CALIFICADORES

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 relative">
        <AlertDismissible
          title={title}
          textBody={textBody}
          show={show}
          setShow={setShow}
          variant="danger"
        />
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </MDBCol>
          <MDBCol col="4" md="6">
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLgPass"
              type="password"
              size="lg"
              value={passWord}
              onChange={(ev) => setPassWord(ev.target.value)}
            />
            <MDBBtn className="mb-4 w-100" size="lg" onClick={login}>
              Sign in
            </MDBBtn>
            <MDBBtn className="mb-4 w-100" size="lg" onClick={submit}>
              Create User
            </MDBBtn>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#3b5998" }}
              onClick={sigInWithFacebook}
            >
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with facebook
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default Login;
