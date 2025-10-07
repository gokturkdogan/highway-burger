const api = {
    categories: "/categories?filters[isActive][$eq]=true&populate=*",
    products: "/products?filters[isActive][$eq]=true&filters[category][slug][$eq]={slug}&populate=*",
    productDetail: "/products/{id}?populate=*",
    register: "/auth/local/register",
    login: "/auth/local",
    profile: "/users/me",
    updateProfile: "/users/{id}",
    cart: "/users/{id}"
};

export default api;