import json

f = open("dataset-extra1.json", "r")
dict_dataset = json.load(f)
f.close()

lista_pessoas = dict_dataset['pessoas']

for i in range(len(lista_pessoas)):
    lista_pessoas[i]['id'] = 'p' + str(i)
    
f = open("dataset-extra1-plus-id.json", "w")
json.dump(dict_dataset, f, ensure_ascii=False, indent=2)
f.close()
