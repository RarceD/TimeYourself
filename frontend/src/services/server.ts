import { ServerAction } from "../interfaces/serverAction";
import { URL_REQUEST } from "../util/util";

export const PostFromServer = (input: ServerAction) => {
  const requestOptions = {
    method: 'POST',
    mode: "cors" as RequestMode,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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

export const GetFromServer = (input: ServerAction) => {
  fetch(URL_REQUEST + input.endpoint)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      input.callbackFunction(response);
    });
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