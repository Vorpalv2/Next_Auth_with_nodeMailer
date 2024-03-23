import React from "react";

async function fetchData() {
  let response = await fetch("api/users/login");
  let data = await response.json();
  return data;
}

const LoginPage = () => {
  const data = fetchData();

  return <div>LoginPage with Data : {data}</div>;
};

export default LoginPage;
