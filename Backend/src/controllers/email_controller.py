import smtplib


class Cadastro:    
    def sender_email(email, senha):
        SUBJECT = "Cadastro realizado com sucesso!!!"
        TO = email
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = "Tenha seu primeiro acesso usando essa senha:"f"{senha}"
        BODY = "\r\n".join((
        f"From: {FROM}",
        f"To: {TO}",
        f"Subject: {SUBJECT}",
        "",
        text))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(FROM, PASSWORD)
        server.sendmail(FROM, TO, BODY)
        print("Email enviado para", TO)
        server.quit()

        return "200"

    def sender_email_1(email, senha):
        SUBJECT = "Redefinição de senha"
        TO = email
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = "SENHA:"f"{senha}"
        BODY = "\r\n".join((
        f"From: {FROM}",
        f"To: {TO}",
        f"Subject: {SUBJECT}",
        "",
        text))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(FROM, PASSWORD)
        server.sendmail(FROM, TO, BODY)
        print("Email enviado para", TO)
        server.quit()

        
data = 1