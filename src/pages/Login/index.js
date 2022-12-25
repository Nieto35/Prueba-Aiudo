import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
// Firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
// FOOTER
import Footer from "@components/Footer";
import Notification from "@components/notifications";
import "@styles/login/index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const auth = getAuth();
  const provider = new FacebookAuthProvider();

  const submit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, passWord);
    } catch (err) {
      alert(
        "la password debe tener mas de 6 digitos y el email debe ser correcto"
      );
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, passWord);
    } catch (err) {
      alert("email o password incorrectos"); // TypeError: failed to fetch
    }
  };

  const sigInWithFacebook = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        alert("hubo algun problema con facebook");
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  return (
    <>
      <MDBContainer fluid className="p-3 my-5 relative">
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
