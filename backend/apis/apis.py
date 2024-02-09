from flask import Flask, request, jsonify
from datetime import datetime
import sys

sys.path.append('C:/Users/gabri/OneDrive/Documents/GitHub/frontend-BioKinectCare/backend')  # Substitua pelo caminho real

from banco.conexao import conectar_banco
import logging

app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)

collection = conectar_banco()

# API para criar um novo paciente
@app.route('/api/pacientes', methods=['POST'])
def criar_paciente():
    data = request.json
    paciente = {
        "nome_completo": data["nome_completo"],
        "cpf": data["cpf"],
        "data_nascimento": datetime.strptime(data["data_nascimento"], "%Y-%m-%d"),
        "musculo": data["musculo"],
        "senha" : data["senha"],
        "calibragem" : data["calibragem"]
    }
    try:
        result = collection.insert_one(paciente)
        return jsonify({"mensagem": "Paciente inserido com sucesso", "id": str(result.inserted_id)})
    except Exception as e:
        return jsonify({"mensagem": "Erro ao inserir paciente", "erro": str(e)})


# API para listar todos os pacientes
@app.route('/api/pacientes', methods=['GET'])
def listar_pacientes():
    pacientes = list(collection.find())
    
    # Converter o ObjectId para uma representação string
    for paciente in pacientes:
        paciente['_id'] = str(paciente['_id'])
    
    return jsonify(pacientes)

@app.route('/api/pacientes/<cpf>', methods=['PUT'])
def atualizar_paciente(cpf):
    data = request.json
    filtro = {"cpf": cpf}
    atualizacao = {
        "$set": {
            "nome_completo": data["nome_completo"],
            "data_nascimento": datetime.strptime(data["data_nascimento"], "%Y-%m-%d"),
            "musculo": data["musculo"],
            "senha": data["senha"],
            "calibragem": data["calibragem"]
        }
    }
    
    try:
        result = collection.update_one(filtro, atualizacao)
        if result.modified_count > 0:
            return jsonify({"mensagem": "Paciente atualizado com sucesso"})
        else:
            return jsonify({"mensagem": "Nenhum paciente foi atualizado. Verifique o CPF."})
    except Exception as e:
        return jsonify({"mensagem": "Erro ao atualizar paciente", "erro": str(e)})

@app.route('/api/pacientes/<cpf>', methods=['DELETE'])
def deletar_paciente(cpf):
    filtro = {"cpf": cpf}
    
    try:
        result = collection.delete_one(filtro)
        if result.deleted_count > 0:
            return jsonify({"mensagem": "Paciente deletado com sucesso"})
        else:
            return jsonify({"mensagem": "Nenhum paciente foi deletado. Verifique o CPF."})
    except Exception as e:
        return jsonify({"mensagem": "Erro ao deletar paciente", "erro": str(e)})

if __name__ == '__main__':
    app.run(debug=True)