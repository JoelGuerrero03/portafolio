const nodemailer = require("nodemailer");
const Swal = require('sweetalert2')

class Email {

    constructor(oConfig) {
        this.createTransport = nodemailer.createTransport(oConfig);
    }

    enviarCorreo(oEmail) {
        try {
            this.createTransport.sendMail(oEmail, function(error, info) {
                if (error) {
                    console.log(error);
                    Swal.fire(
                        'Good job!',
                        error,
                        'error'
                    );
                } else {
                    console.log(info);
                }

            });
        } catch (x) {
            console.log("Email.enviarCorreo -- Error-- " + x);
        }
    }
}
module.exports = Email;