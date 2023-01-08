import { UserDto } from "../interfaces/UserDto";

//export const URL_REQUEST: string = "http://192.168.0.14:5050/";
export const URL_REQUEST: string = "http://51.91.126.218:5050/";
//TO RUN: dotnet TimeYourselfBack.dll --urls http://0.0.0.0:5050

export const GetUserDto = (): UserDto | null => {
  let user: string | null = localStorage.getItem("user")
  if (user != null) {
    let u: UserDto = JSON.parse(user);
    return u;
  }
  return null;
}