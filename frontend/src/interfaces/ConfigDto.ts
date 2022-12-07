export interface ConfigDto{
    id: number,
    userId: number,
    name: string
}

export const getIdFromConfigPerson = (list: ConfigDto[], toFound: string) : number=> {
  for (let user of list)
  {
    if (user.name === toFound) return user.id;
  }
  return -1;
}