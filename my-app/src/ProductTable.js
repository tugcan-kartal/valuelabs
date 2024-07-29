import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-gray-600">Product Name</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-gray-600">Descrption</th>
                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-gray-600">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-100 transition duration-300">
                            <td className="py-2 px-4 border-b border-gray-300">{product.title}</td>
                            <td className="py-2 px-4 border-b border-gray-300">{product.description}</td>
                            <td className="py-2 px-4 border-b border-gray-300">
                                <img src={product.thumbnail} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
