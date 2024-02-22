const formContact = document.getElementById('contact-form');
const msg = document.querySelector(".form-message")

formContact.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector(".loader").classList.add("show")

    const serviceId = 'service_6fnmjai';
    const templateId = 'template_qh8lxyp';
    const userId = 'f_lCAFK-rBeaLH5hy';

    const from_name = formContact.from_name.value;
    const to_name  = formContact.to_name.value;
    const message = formContact.message.value;
    const subject = formContact.subject.value

    const emailBody = {
        from_name: from_name,
        to_name: to_name,
        message: message,
        subject: subject,
    }

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: userId,
            template_params: emailBody
        })
    })
        .then(res => {
            if (res.ok) {
                document.querySelector(".loader").classList.remove("show")
                msg.innerHTML = "";
                msg.innerHTML += "<span class='success-msg'>Email Send Successfully</span>"
                msg.classList.add("show")
                formContact.reset(); // Reset the form after successful submission
                setTimeout(() => msg.classList.remove("show"), 3000)
            } else {
                document.querySelector(".loader").classList.toggle("show")
                msg.classList.add("show")
                msg.innerHTML += "<span class='error-msg'>Email No Send</span>"
            }
        })
        .catch(err => {
            console.log('Failed...', err);
        });
});
