import { useState } from "react";
import "./App.css";
import authenticateUser from "@/services/auth/login";
import logout from "@/services/auth/logout";

function App() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e: any, text: string) => {
    if (e.target.value.length) {
      if (text === "password") {
        setLogin({ ...login, password: e.target.value });
      } else if (text === "username") {
        setLogin({ ...login, username: e.target.value });
      }
    }
  };

  const handleOnClick = async (e: any) => {
    e.preventDefault();
    console.log(await authenticateUser(login));
  };
  const handleLogOutOnClick = async (e: any) => {
    e.preventDefault();
    console.log(await logout());
  };

  return (
    <>
      <form>
        <input
          type="text"
          onChange={(e) => handleOnChange(e, "username")}
          title="username"
          placeholder="username"
        />
        <input
          type="password"
          onChange={(e) => handleOnChange(e, "password")}
          title="password"
        />
        <button onClick={handleOnClick}>Envoyer</button>
      </form>
      {login && (
        <div>
          <div>{login.username}</div>
          <div>{login.password}</div>
        </div>
      )}
      <button onClick={handleLogOutOnClick}>Déconnexion</button>
    </>
  );
}

export default App;
