
module.exports = () => {

    const scripts = `
        <script type="text/javascript" src="/app.js"></script>
        <script type="text/javascript" src="/vendor.js"></script>
    `;

    return (`
        <!DOCTYPE html>
        <html>
            <head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
                <title>Fast-coding</title>
            </head>
            <body>
                <div id="root"></div>
                ${ scripts }
            </body>
        </html>
    `);
};