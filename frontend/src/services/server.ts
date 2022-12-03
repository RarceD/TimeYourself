import { ServerAction } from "../interfaces/serverAction";
import { GetUserDto, URL_REQUEST } from "../util/util";

export const PostFromServer = (input: ServerAction) => {
  let user = GetUserDto();
  if (user) {
    let token = user.token;
    const requestOptions = {
      method: 'POST',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify(input.data)
    };
    fetch(URL_REQUEST + input.endpoint, requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        input.callbackFunction(response);
      });
    return true;
  }
}

export const GetFromServer = (input: ServerAction) => {
  let user = GetUserDto();
  if (user) {
    let token = user.token;

    const xhr = new XMLHttpRequest()
    xhr.open("GET", URL_REQUEST + input.endpoint);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send()
    xhr.onload = function () {
      if (xhr.status === 200) {
        //parse JSON datax`x
        let data = JSON.parse(xhr.responseText);
        input.callbackFunction(data);
      } else if (xhr.status === 401)
        console.log("No records found")
    }
  }
}
export const GetFromServer2 = (input: ServerAction) => {
  //const myHeaders = new Headers();
  let user = GetUserDto();
  if (user) {
    let token = user.token;
    //myHeaders.append('authentication', "Bearer" + token)
    //fetch(URL_REQUEST + input.endpoint, {

    fetch(URL_REQUEST + input.endpoint, {
      mode: 'no-cors',
      method: 'GET',
      //withCredentials: true,
      credentials: 'include',
      headers: {
        Authorization: token,
        'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      }
      );
    //.catch(error => console.error('Error:', error))
    //.then(response => {
    //input.callbackFunction(response);
    //});
  }
}

// Example:
/*
    PostFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'user',
      data: {
        "userNumber": "1234",
        "token": "1234"
      }
    });
    GetFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'user'
    });
*/