"use server";
// import axios from "axios";

// async function handleSignUp(userdata: any) {
//   try {
//     await fetch("/api/users/signup", {
//       method: "POST",
//       body: userdata,
//     })
//       .then((response) => response.json)
//       .then((data) => console.log(data));
//     // router.push("/login");
//   } catch (error: any) {
//     console.log("error : ", error.message);
//   }
// }

async function handleSignUp(data: FormData) {
  console.log(data);
  console.log(data.get("username"));
}

export { handleSignUp };
