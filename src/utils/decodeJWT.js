import { jwtDecode } from "jwt-decode";


const decodeJWT = (token) => {
  try {
    const decoded = jwtDecode(token);
    
    if (!decoded) {
      throw new Error('Missing or invalid token');
    }

    return decoded;
  } catch (error) {
    console.error('Token parsing error:', error.message);
    return null;
  }
}

export default decodeJWT;