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

export default { listar, selecionar, inserir, alterar, demitirFuncionario };
