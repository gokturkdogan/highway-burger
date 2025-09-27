const api = {
    categories: "/categories?populate=*",
    products: "/products?filters[category][slug][$eq]={slug}&populate=*"
};

export default api;