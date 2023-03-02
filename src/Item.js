import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";

const Item = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let productImageList = [];
        fetch('https://dummyjson.com/products/' + id)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setUser(data);
                    setIsLoaded(true);

                    for (let i = 0; i < data.images.length; i++) {
                        productImageList.push(data.images[i]);
                    }
                    setProductImages(productImageList);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [id]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (user) {
        return (
            <div className="App-redirect-page">
                <div className="product-images-container">
                    {productImages ? (
                        productImages.map((productImage, index) => (
                            <img
                                key={index}
                                src={productImage}
                                alt={user.title}
                                width="300"
                                height="300"
                            />
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="prod-details-container">
                    <p><b>Name:</b> {user.title}</p>
                    <p><b>Price:</b> ${user.price}</p>
                    <p><b>Discount:</b> {user.discountPercentage}%</p>
                    <p><b>Rating:</b> {user.rating}</p>
                    <p><b>Stock:</b> {user.stock}</p>
                    <p><b>Brand:</b> {user.brand}</p>
                    <p><b>Category:</b> {user.category}</p>
                    <p><b>Description:</b> {user.description}</p>
                </div>
                <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            </div>
        );
    }
}

export default Item;