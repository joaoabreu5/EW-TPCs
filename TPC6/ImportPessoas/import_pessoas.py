import json
import requests

def read_dataset(path):
    file = open(path)
    dataset = json.load(file)
    file.close()
    
    pessoas = dataset['pessoas']
    for registo in pessoas:
        if 'id' in registo:
            registo['_id'] = registo['id']
            registo.pop('id')

    return pessoas

def import_json():
    path = 'dataset-extra1.json'
    pessoas = read_dataset(path)
    
    url = 'http://localhost:3000/pessoas/lista'
    headers = {"Content-Type": "application/json"}

    f = 0
    while f < len(pessoas):
        i = f
        f += 91
        requests.post(url, headers=headers, json=pessoas[i:f])
    
    print("'" + path + "' importado para MongoDB com sucesso!")
   
import_json()
