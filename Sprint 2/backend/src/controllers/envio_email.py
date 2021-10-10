import smtplib

class Email:
    def sender_email():
        SUBJECT = "testando assunto"
        TO = "jodangalas00@gmail.com"
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = "Rota da dando certo"
        BODY = "\r\n".join((
        f"From: {FROM}",
        f"To: {TO}",
        f"Subject: {SUBJECT}",
        "",
        text))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(FROM, PASSWORD)
        print("Login funfou")
        server.sendmail(FROM, TO, BODY)
        print("Email enviado para", TO)
        server.quit()





