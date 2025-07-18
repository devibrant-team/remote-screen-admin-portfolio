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

    // After this, you’d do something like:
    // fetch('/api/auth/google', { method: 'POST', body: JSON.stringify(payloadToBackend), headers: { 'Content-Type': 'application/json' } })


//     email
// : 
// "kosayslh174@gmail.com"
// emailVerified
// : 
// true
// familyName
// : 
// "Slh"
// givenName
// : 
// "Kosay"
// googleId
// : 
// "103530550357593334054"
// idToken
// : 
// "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxMDMzODYwNzE2ZTNhMmFhYjM4MGYwMGRiZTM5YTcxMTQ4NDZiYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NTg0ODIxMTY3NzYtbzI1ZWc0MGdpcHNpYWFwbWRrYjl2dm9uNTB0Y3JmanEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NTg0ODIxMTY3NzYtbzI1ZWc0MGdpcHNpYWFwbWRrYjl2dm9uNTB0Y3JmanEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM1MzA1NTAzNTc1OTMzMzQwNTQiLCJlbWFpbCI6Imtvc2F5c2xoMTc0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3NTI3NjcyMjQsIm5hbWUiOiJLb3NheSBTbGgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGRvSXNka1NqNlRoOS1PY3hPLTZnc2lpa1Yza2s2RUZIVk50NGNBbUxVU3hvb0RnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Iktvc2F5IiwiZmFtaWx5X25hbWUiOiJTbGgiLCJpYXQiOjE3NTI3Njc1MjQsImV4cCI6MTc1Mjc3MTEyNCwianRpIjoiNGUwZTVhYTFjNzllNWFhYTJhM2RhZTYzZjg4MGUzZGZjNzA0ZDk1NCJ9.ACAdFoCIib7Kr03jY3wdawC4_oytV6F-v6GrwwSgjmpCXefE9yl_sjbZJKK5v4JRTuq_PIuFcFF1RXqesqh-3uhouNiLNj7W_xSCZBog_UqvBOfCLLBYpURhKx2lhllLIIGqsqPt1Q2MJrpJ8LQW6FLEJBRlWr16SggHu9JUG26XkfA3Qv_I8FyeUg3Gt11VDEqIbvkZgXk2L-zFk8UU52l0CiKxEVwHTn0i-4KLpSQbI0ca-7w9S9MyEyyQw5o2rFLI7mPUhvKyJz4LuY8ch5t7jdZRcA8nCZiuY1eLGGE7eh8ruZ-mM5z075m46KTUbfWNO1ca8n5Pr6mXROx8xg"
// locale
// : 
// undefined
// name
// : 
// "Kosay Slh"
// picture
// : 
// "https://lh3.googleusercontent.com/a/ACg8ocLdoIsdkSj6Th9-OcxO-6gsiikV3kk6EFHVNt4cAmLUSxooDg=s96-c"
// [[Prototype]]
// : 
// Object

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
