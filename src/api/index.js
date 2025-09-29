const api = {
    categories: "/categories?filters[isActive][$eq]=true&populate=*",
    products: "/products?filters[isActive][$eq]=true&filters[category][slug][$eq]={slug}&populate=*",
};

export default api;