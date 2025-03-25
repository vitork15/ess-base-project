import { Repository, MoreThan } from "typeorm";
import User from "../entities/user.entity";
import dbConn from "../database/postgresConnection";
import { createTransport, SentMessageInfo } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { randomBytes } from "crypto";
import { hostname } from "os";


class UserService{

    userRepository: Repository<User>

    constructor(){
        this.userRepository = dbConn.getRepository(User) // inicializando interface com o BD
    }

    async insertUser(name: string, login: string, email: string, password: string, birthday: Date) : Promise<User>{

        let user = new User()

        if(password.length < 6){
            throw new Error("Sua senha deve conter pelo menos 6 caracteres")
        }
        
        // verifica se existe usuário com mesmo login
        let user_with_same_login = await this.userRepository.findOne({where:{login:login}})

        if(user_with_same_login){
            throw new Error("Já existe cadastro com esse login")
        }

        // verifica se existe usuário com mesmo email
        let user_with_same_email = await this.userRepository.findOne({where:{email:email}})

        if(user_with_same_email){
            throw new Error("Já existe cadastro com esse e-mail")
        }

        user.name = name
        user.login = login
        user.email = email
        user.password = password
        user.birthday = birthday

        return await this.userRepository.save(user)
    }

    async getUserByLogin(login: string) : Promise<User>{

        let user = await this.userRepository.findOne({where:{login:login}}) // verificamos se o usuário no pedido realmente existe

        if(!user){
            throw new Error("Usuário não encontrado")
        }

        return user
    }

    async deleteUser(login: string) : Promise<User>{

        let user = await this.userRepository.findOne({where:{login:login}}) // verificamos se o usuário no pedido realmente existe

        if(!user){
            throw new Error("Usuário não encontrado!")
        }

        await this.userRepository.delete(user.userID)

        return user
    }

    async updateUser(login : string, newname: string, newlogin: string, newpassword: string, newbirthday: Date) : Promise<User> {

        let user = await this.userRepository.findOne({where:{login:login}}) // verificamos se o usuário no pedido realmente existe
        
        if(!user){
            throw new Error("Usuário não encontrado")
        }

        if(newname != null) { // se houver login no pedido de modificação, usamos seu valor
            user.name = newname 
        }

        if(newlogin != null) { // se houver login no pedido de modificação
                               // verificamos se existe usuário com mesmo login que não é o próprio usuário
            let user_with_desired_login = await this.userRepository.findOne({where:{login:newlogin}})
            if(user_with_desired_login != null && login != newlogin) {
                throw new Error("Já existe um usuário com esse login")
            }

            user.login = newlogin // se tudo for verificado, usados seu valor
        }

        if(newpassword != null) { // se houver senha no pedido de modificação, usamos seu valor

            // pela regra de negócio, a senha deve ter tamanho mínimo 6
            if(newpassword.length < 6){
                throw new Error("Sua senha deve conter pelo menos 6 caracteres")
            }
            // também pela regra de negócio, a mudança de senha não pode manter a mesma senha
            if(newpassword == user.password){
                throw new Error("Sua senha não pode ser igual a anterior!")
            }

            user.password = newpassword 
        }

        if(newbirthday == undefined) user.birthday = null // o aniversário não estar no pedido indica remoção
        else user.birthday = newbirthday 

        return await this.userRepository.save(user)
    }

    async recoverUser(email: string) : Promise<SMTPTransport.SentMessageInfo> {

        let user = await this.userRepository.findOne({where:{email:email}}) // verificamos se o usuário no pedido realmente existe

        if(!user){
            throw new Error("Usuário não encontrado")
        }

        let token = randomBytes(20).toString('hex'); // usamos um token gerado randomicamente para segurança, um hexadecimal de 40 digitos

        user.recoverytoken = token;
        user.recoveryexpire = Date.now() + 300000; // o tempo de recuperação é definido como 5 minutos, definimos isso marcando o limite de tempo no banco de dados

        await this.userRepository.save(user)

        let mailOptions = { // definimos o conteúdo do email que será enviado
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Recuperação de conta",
            html: "<p>Clique <a href=" + "http://localhost:3000" + "/changepassword/" + token + ">aqui</a> para realizar a mudança de senha</p>"
        }

        const transporter = createTransport({ // configuramos o serviço de email
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        })
        
        let emailsent = await transporter.sendMail(mailOptions)

        return emailsent
    }

    async changePassword(token: string, password: string, confirm: string) : Promise<User> {

        let user = await this.userRepository.findOne({where:{recoverytoken: token, recoveryexpire: MoreThan(Date.now())}}) // procuramos se existe usuáro com o mesmo token e cujo tempo de recuperação ainda não acabou

        if(!user){
            throw new Error("Token de recuperação inválido ou expirado")
        }

        if(password != confirm){ // verificação das regras de negócio
            throw new Error("Senhas não correspondem")
        }
        if(password.length < 6){
            throw new Error("Sua senha deve conter pelo menos 6 caracteres")
        }
        if(password == user.password){
            throw new Error("A senha não pode ser igual à anterior")
        }

        user.password = password;
        user.recoverytoken = null; // removemos o token de modificação do usuário após a mudança
        user.recoveryexpire = null; 

        return await this.userRepository.save(user)
    }
}

export default UserService