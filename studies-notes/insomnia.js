/* ------------------- Insomnia -----------------------------------------------------------------------------


Menu "Personal Projects" (casinha) --- menu principal do usuário

	Aba "Collections" --- contém as collections (projetos)

	+ Create --- botão pra criar uma collection


Dentro de uma collection:

	Aba da esquerda --- onde ficam as "Requests", e se renomeia/edita elas também

		Environment --- topo da aba esq; cria variáveis de ambiente, pra organizar melhor o projeto (mais ou menos a mesma ideia das váriaveis CSS)
										tokens autenticados --- pra criar e atualizar automaticamente os tokens no Insomnia, configurar o Environment
																						em "Base Environment" criar "USER_TOKEN", com o valor sendo uma função do Insomnia (acessada por "crtl + spacebar")
																						* mais detalhes, ver a aula "Token no Insomnia"

		+ (botão) --- na aba da esq; esse botão permite criar requests (provavelmente, escolher opção "HTTP Request")
						  --- permite também criar pastas pra organizar as requests


	Aba do meio --- onde fica o data, código e responses das requests

		Campo do topo-central --- à esq. se escolhe o método HTTP; à dir. se digita o endereço da API; "SEND" gera a resposta na aba da direita

		(tipo de arquivo) --- escolhe o tipo de arquivo que se pretende usar no corpo da requisição


	Aba da direita --- preview do resultado da request

*/
