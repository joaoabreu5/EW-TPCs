import json
import os

def ordCidade(c):
    return c['nome']

def ordLigacao(l):
    return l['distância']
    
f = open("mapa.json")
mapa = json.load(f)
f.close()

cidades = mapa['cidades']
cidades.sort(key=ordCidade)

ligacoes = mapa['ligações']
ligacoes.sort(key=ordLigacao)

dict_cidades = dict()
for c in cidades:
    dict_cidades[c['id']] = c
    
dict_ligacoes = dict()
for l in ligacoes:
    if l['origem'] not in dict_ligacoes:
        dict_ligacoes[l['origem']] = [l]
    else:
        dict_ligacoes[l['origem']].append(l)

pagHTML = """<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <!-- Índice -->
        <a name="indice"/>
        <h3>Índice</h3>
        <ul>"""

for c in cidades:
    pagHTML += f"""
            <li>
                <a href="{c['id']}">{c['nome']}</a>
            </li>
        """
    
pagHTML += """</ul>
    </body>
</html>
"""

file = open("index.html", "w")
file.write(pagHTML)
file.close()

cidades_folder = "cidades/"
try:
    os.mkdir(cidades_folder)
except:
    pass
    

for c in cidades:
    file_name = cidades_folder + c['id'] + ".html"
    file = open(file_name, "w")
    
    str_ligacoes = ""
    if c['id'] in dict_ligacoes:
        str_ligacoes+="""<b>Ligações:</b>
                <ul>"""
        for l in dict_ligacoes[c['id']]:
            str_ligacoes += f"""
                    <li>
                        <a href="{l['destino']}">{dict_cidades[l['destino']]['nome']}</a>: {l['distância']} km
                    </li>
                """
        str_ligacoes+="""</ul>"""
    
    pagHTML = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <a name="{c['id']}"/>
        <h3>{c['nome']}</h3>
        <p><b>População:</b> {c['população']}</p>
        <p><b>Descrição:</b> {c['descrição']}</p>
        <p><b>Distrito:</b> {c['distrito']}</p>
        <p>
            {str_ligacoes}
        </p>
        <address>[<a href="indice">Voltar ao índice</a>]</address>
        <center>
            <hr width="80%"/>
        </center>    
    </body>
</html>
"""
    
    file.write(pagHTML)
    file.close()
