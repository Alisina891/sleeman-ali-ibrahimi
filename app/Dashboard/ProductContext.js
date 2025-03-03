'use client'
import {createContext , useState  , useContext} from "react"

const ProductContext = createContext();


export function ProductProvider({children}) {
    const [selectedColor , setSelectedColor] = useState('White');
    const [selectedModel , setSelectModel] = useState("Sleeman Mark");
    const [selectedBackModel , setSelectBackModel] = useState("Sleeman clear Mark");
    const [selectedSize , setSelectSize ] = useState("L");

    return (
        <ProductContext.Provider value={{selectedColor , setSelectedColor , selectedModel , setSelectModel , selectedBackModel , setSelectBackModel ,
        selectedSize , setSelectSize
         }} >
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    return useContext(ProductContext);
}