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

    inc = 91
    i = 0
    f = inc
    while i < len(pessoas):
        requests.post(url, headers=headers, json=pessoas[i:f])
        i = f
        f += inc
    
    print("'" + path + "' importado para MongoDB com sucesso!")
   
import_json()
