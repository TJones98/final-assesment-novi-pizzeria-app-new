function isTokenValid(decodedToken) {
    const currentTimeInMs = Date.now();
    const expInMs = decodedToken.exp * 1000;

    return (currentTimeInMs < expInMs)
}

export default isTokenValid;