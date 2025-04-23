import Funcionario from "../model/FuncionarioModel.js";

async function listar(req, res) {
    const respostaBanco = await Funcionario.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Funcionario.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const respostaBanco = await Funcionario.create(req.body);
    res.json(respostaBanco);
}

async function alterar(req, res) {
    const nomefuncionario = req.body.nomefuncionario;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const nascimento = req.body.nascimento;
    const salario = req.body.salario;
    const contratacao = req.body.contratacao;
    const ativo = req.body.ativo;
    const senha = req.body.senha;
    const token = req.body.token;

    const idfuncionario = req.params.id;

    const respostaBanco = await Funcionario.update(
        { nomefuncionario, cpf, email, telefone, nascimento, salario, contratacao, ativo, senha, token },
        { where: { idfuncionario } });
    res.json(respostaBanco);
}

// Demitir funcionário
async function demitirFuncionario(req, res) {
    const { idfuncionario, data_demissao } = req.body;

    try {
        const funcionario = await Funcionario.findByPk(idfuncionario);

        if (!funcionario) {
            return res.status(404).json({ erro: "Funcionário não encontrado." });
        }

        if (!funcionario.ativo) {
            return res.status(400).json({ erro: "Funcionário já foi demitido anteriormente." });
        }

        funcionario.ativo = false;
        funcionario.demissao = data_demissao;

        await funcionario.save();

        return res.json({ mensagem: "Funcionário demitido com sucesso.", funcionario });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao tentar demitir funcionário.", detalhes: erro.message });
    }
}

// Definir senha
async function definirSenha(req, res) {
    const { codigo, senha } = req.body;

    try {
        if (!codigo || isNaN(codigo)) {
            return res.status(400).json({ erro: 'Código de funcionário inválido.' });
        }

        if (!senha || senha.length < 6 || senha.length > 20) {
            return res.status(400).json({ erro: 'A senha deve ter entre 6 e 20 caracteres.' });
        }

        const funcionario = await Funcionario.findByPk(codigo);

        if (!funcionario) {
            return res.status(404).json({ erro: 'Funcionário não encontrado.' });
        }

        funcionario.senha = senha;
        funcionario.token = null;
        await funcionario.save();

        return res.status(200).json({ mensagem: 'Senha definida com sucesso.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro interno ao definir senha.' });
    }
}

//Login Funcionario

async function loginFuncionario(req, res) {
    const { email, senha } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ erro: "E-mail inválido." });
    }

    if (!senha) {
        return res.status(400).json({ erro: "Senha não informada." });
    }

    try {
        const funcionario = await Funcionario.findOne({
            where: {
                email: email,
                senha: senha
            }
        });

        if (!funcionario) {
            return res.status(401).json({ erro: "E-mail ou senha incorretos." });
        }

        if (!funcionario.ativo) {
            return res.status(403).json({ erro: "Funcionário inativo." });
        }

        const token = new Date().toISOString();
        funcionario.token = token;
        await funcionario.save();

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            token: token
        });

    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao tentar realizar login.", detalhes: erro.message });
    }
}


export default { listar, selecionar, inserir, alterar, demitirFuncionario, definirSenha, loginFuncionario  };
