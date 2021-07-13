const https = require('https');

class RealTimeController {

    index(req, res, next){
        let url = 'https://api.giangpt.com/';
        // Gui request dang get toi gateway de lay chuoi JSON
        https.get(url,(_res) => {
            let body = "";
            // Chuyen tu buff sang string tu ket qua tra ve
            _res.on("data", (chunk) => {
                body += chunk;
            });

            _res.on("end", () => {
                try {
                    body = JSON.parse(body);
                    delete body.sensor[4];
                    // console.log(body)
                    res.status(200).send(body);
                } catch (error) {
                    console.error(error.message);
                };
            });

        }).on("error", (error) => {
            console.error(error.message);
        });
    }
}

module.exports = new RealTimeController;
