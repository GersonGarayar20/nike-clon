import { Shoe } from './definitions';
import { shoes } from './shoes';


export const getAllShoes = async (query?:string): Promise<Shoe[] | null> => {
  let result = shoes

  if (query) {
    result = shoes.filter((shoe)=>(shoe.name.toLocaleLowerCase().includes(query)))
  }

  return result
}

export const getShoeById = async (id:number): Promise<Shoe | null> => { 
  const shoeFound = shoes.find(s=>s.id === id)
  
  if (!shoeFound) return null

  return shoeFound
}