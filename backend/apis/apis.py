from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from collections.abc import Mapping
import sys
from flask_cors import CORS

sys.path.append('C:/Users/ariyoshh/Desktop/BioKinectCare/backend')  # Substitua pelo caminho real

from banco.conexao import conectar_banco
import logging

app = Flask(__name__)
CORS(app, origins='*')
app.config['SECRET_KEY'] = 'secret'
app.logger.setLevel(logging.DEBUG)

collection = conectar_banco()

# API para criar um novo paciente
@app.route('/api/pacientes', methods=['POST'])
def criar_paciente():
    data = request.json
    novo_username = data["username"]

    if collection.find_one({"username": novo_username}):
        return jsonify({"mensagem": f"Erro ao inserir paciente. O username '{novo_username}' já está em uso, tente outro, como '{novo_username}123'."}), 400

    paciente = {
        "nome_completo": data["nome_completo"],
        "username": novo_username,
        "data_nascimento": datetime.strptime(data["data_nascimento"], "%Y-%m-%d"),
        "musculo": [],
        "senha" : data["senha"],
        "calibragem" : []
    }
    try:
        result = collection.insert_one(paciente)
        return jsonify({"mensagem": "Paciente inserido com sucesso", "id": str(result.inserted_id)})
    except Exception as e:
        return jsonify({"mensagem": "Erro ao inserir paciente", "erro": str(e)})


# API para listar todos os sensores
from flask import request

@app.route('/api/sensores/', methods=['GET'])
def listar_sensores():
    username = request.args.get('username')  # Obter o valor do parâmetro 'username' da consulta na URL
    sensores = list(collection.find({"username": username}))

    lista_sensores = []
    for sensor in sensores:
        for i in range(len(sensor["musculo"])):
            sensor_info = {
                "musculo": sensor["musculo"][i],
                "calibragem": sensor["calibragem"][i]
            }
            lista_sensores.append(sensor_info)

    print(lista_sensores)
    return jsonify(lista_sensores)


@app.route('/api/pacientes/', methods=['PUT'])
def adicionar_musculo():
    username = request.args.get('username')
    filtro = {"username": username}
    data = collection.find_one(filtro)
    musculo_novo = request.json.get('musculo')  # Supondo que o novo músculo esteja no corpo da requisição
    atualizacao = {
        "$set": {
            "nome_completo": data["nome_completo"],
            "data_nascimento": data["data_nascimento"],
            "senha": data["senha"],
        },
        "$push": {
            "musculo": musculo_novo,
            "calibragem": ''
        }
    }
    
    try:
        result = collection.update_one(filtro, atualizacao)
        if result.modified_count > 0:
            return jsonify({"mensagem": "Músculo adicionado com sucesso!"})
        else:
            return jsonify({"mensagem": "Músculo não adicionado, verifique os campos!"})
    except Exception as e:
        return jsonify({"mensagem": "Erro ao adicionar músculo", "erro": str(e)})

@app.route('/api/pacientes/<username>', methods=['DELETE'])
def deletar_paciente(username):
    filtro = {"username": username}
    
    try:
        result = collection.delete_one(filtro)
        if result.deleted_count > 0:
            return jsonify({"mensagem": "Paciente deletado com sucesso"})
        else:
            return jsonify({"mensagem": "Nenhum paciente foi deletado. Verifique o Username."})
    except Exception as e:
        return jsonify({"mensagem": "Erro ao deletar paciente", "erro": str(e)})

@app.route('/api/login', methods=['POST'])
def fazer_login():
    data = request.json
    username = data.get("username")
    senha = data.get("senha")

    try:
        # Verifique se o usuário existe no banco de dados e a senha está correta
        paciente = collection.find_one({"username": username, "senha": senha})

        if paciente:
            return jsonify({"mensagem": "Login realizado!"}), 200
        else:
            return jsonify({"mensagem": "Credenciais inválidas"}), 401
    except Exception as e:
        return jsonify({"mensagem": "Erro ao fazer login", "erro": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)