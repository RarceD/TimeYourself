export interface ServerAction {
    callbackFunction: (str: string) => void,
    data?: object,
    endpoint: string
  }