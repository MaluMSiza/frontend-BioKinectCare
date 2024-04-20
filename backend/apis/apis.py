from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from collections.abc import Mapping
import jwt
import sys

sys.path.append('C:/Users/gabri/OneDrive/Documents/GitHub/frontend-BioKinectCare/backend')  # Substitua pelo caminho real

from banco.conexao import conectar_banco
import logging

app = Flask(__name__)
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

@app.route('/api/pacientes/<username>', methods=['PUT'])
def atualizar_paciente(username):
    data = request.json
    filtro = {"username": username}
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
            return jsonify({"mensagem": "Nenhum paciente foi atualizado. Verifique o Username."})
    except Exception as e:
        return jsonify({"mensagem": "Erro ao atualizar paciente", "erro": str(e)})

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
            # Crie um token JWT válido por 1 hora
            expiration_time = datetime.utcnow() + timedelta(hours=1)
            token = jwt.encode({'username': username, 'exp': expiration_time}, app.config['SECRET_KEY'], algorithm='HS256')
            return jsonify(access_token=token), 200
        else:
            return jsonify({"mensagem": "Credenciais inválidas"}), 401
    except Exception as e:
        return jsonify({"mensagem": "Erro ao fazer login", "erro": str(e)}), 500

@app.route('/api/protegido', methods=['GET'])
def rota_protegida():
    token = request.headers.get('Authorization').split(" ")[1]  # Obtemos o token do cabeçalho Authorization
    try:
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        username = decoded_token['username']
        return jsonify(logado_como=username), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"mensagem": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"mensagem": "Token inválido"}), 401

if __name__ == '__main__':
    app.run(debug=True)