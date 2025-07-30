import React, { useEffect } from "react";

const RegisterScreen = () => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "858482116776-o25eg40gipsiaapmdkb9vvon50tcrfjq.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {
          theme: "outline",
          size: "large",
          text: "continue_with",
        }
      );

      window.google.accounts.id.prompt();
    }
  }, []);

  const handleCredentialResponse = (response) => {
    const idToken = response.credential;

    // Decode payload to see user info (optional)
    const base64Url = idToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const userObject = JSON.parse(jsonPayload);

    // This is what you typically send to your backend:
    const payloadToBackend = {
      idToken, // send this to backend for verification
      googleId: userObject.sub,
      email: userObject.email,
      emailVerified: userObject.email_verified,
      name: userObject.name,
      givenName: userObject.given_name,
      familyName: userObject.family_name,
      picture: userObject.picture,
      locale: userObject.locale,
    };

    console.log("Payload to send to backend:", payloadToBackend);


  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <h2>Register with Google</h2>
      <div id="googleSignInDiv"></div>
    </div>
  );
};

export default RegisterScreen;
