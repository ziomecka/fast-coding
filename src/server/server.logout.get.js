module.exports = ( req, res ) => {
    const { login, email } = req.session;
    req.session.authorized = false;
    res.json( { result: 1, authorized: false } );
    console.log(`Email: ${ email }, login: ${ login } logged out`);
};