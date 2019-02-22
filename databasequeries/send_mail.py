import smtplib

def send_mail():
    gmail_user = 'learnwithjaaluu@gmail.com'
    gmail_password = '010203pormi'
    email_text = "An error occured white fetching data"
    to = 'michael.johannes.meier@gmail.com'

    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(gmail_user, gmail_password)
    server.sendmail(gmail_user, to, email_text)
    server.close()