function isTokenValid(decodedToken) {
    const currentTimeInMs = Date.now();
    const expInMs = Math.round(decodedToken.exp * 1000);

    return (currentTimeInMs < expInMs)
}

export default isTokenValid;