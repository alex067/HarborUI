let baseURL = 'http://localhost:5000'

if (process.env.NODE_ENV === "production"){
    baseURL = 'someurl';
} 
export default baseURL;