import { Shoe } from './definitions';
// import { shoes } from './shoes';

const URL = "https://nike-backend-xmmb.onrender.com"


export const getAllShoes = async (query?:string): Promise<Shoe[] | null> => {
  // let result = shoes
  let result = await fetch(`${URL}/shoes`,{cache:'no-store'}).then(res => res.json())

  if (query) {
    // result = shoes.filter((shoe)=>(shoe.name.toLocaleLowerCase().includes(query)))
    result = await fetch(`${URL}/shoes?q=${query}`).then(res => res.json())
  }
  
  return result.data
}

export const getShoeById = async (id:string): Promise<Shoe | null> => { 
  const result = await fetch(`${URL}/shoes/${id}`,{cache:'no-store'}).then(res => res.json())

  if (result.errors) return null

  return result.data
}