
const sendServerErrorResponse = (res) => {
    res.status(500).json({message: "erreur serveur, veuillez réessayer"});
};
const sendUnauthorizedResponse = (res) => {
    res.status(401).json({message: "401: unauthorized request"});
};

module.exports = {
    sendServerErrorResponse,
    sendUnauthorizedResponse
};