const authService = require('../services/authService')

const login = async (req, res) => {
    const { body } = req;
    try {
        const getLog = await authService.login(body);
        res.status(200).json(getLog);

    } catch (error) {
        res.status(error?.status || 500).json({
            status: "Failed",
            message: error?.message || error
        })
    }
}


const register = async(req, res) => {
    const { body } = req;
    try {
        const register = await authService.register(body);
        res.status(201).json(register);
    } catch (err) {
        res.status(err?.status || 500).json({
            status: "Failed",
            message: err?.message || err
        });
    }
}

module.exports = {
    login,
    register
}