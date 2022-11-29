import { UserDto } from "../interfaces/UserDto";

export const URL_REQUEST: string = "http://localhost:5000/";

export const GetUserDto = () : UserDto | null => {
    let user: string | null = localStorage.getItem("user")
    if (user != null)
    {
      let u: UserDto = JSON.parse(user);
      return u;
    }
    return null;
}