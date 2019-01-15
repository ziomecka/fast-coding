module.exports = async (req, res) => {
    req.session.authorized = false;
    req.session.save();
    res.json( { result: 1, authorized: false } );
};