---
title: Como construí meu blog com o Quartz
tags:
  - quartz
---
Criar um blog pessoal pode parecer desafiador, ainda mais se, como eu, você chegou a pensar em construir algo do zero. Criar ferramentas do zero realmente é muito legal e desafiador, mas, a verdade é que, se o seu objetivo principal é compartilhar conteúdo, algo pronto deve servir.  

Como tenho utilizado o [Obisidian](https://obsidian.md/) para escrever e organizar todas as minhas notas e documentações que, naturalmente, estão armazenadas em arquivos [Markdown](https://en.wikipedia.org/wiki/Markdown), decidi utilizar o [Quartz](https://github.com/jackyzha0/quartz).

Trata-se de um gerador de site estático [compatível com o Obsidian](https://quartz.jzhao.xyz/features/Obsidian-compatibility). A ferramenta é cheia de features como graph view, Full-text search, Popover previews, Mermaid e [muitas outras](https://quartz.jzhao.xyz/#-features).

A configuração é muito simples. Abaixo te mostro como a minha foi feita. Não necessariamente é o melhor jeito, então, fique livre para utilizar e modificar como quiser.

## Configuração

_Requerimentos: Node.js e NPM._


Ao contrário da maioria dos SSGs, o Quartz não oferece uma CLI de bootstrapping. De acordo com a [filosofia do Quartz](https://quartz.jzhao.xyz/philosophy), você deve clonar e utilizar o repositório como quiser, o que, naturalmente, te permitirá fazer qualquer tipo de personalização. Na aba de [Get Started da documentação oficial](https://quartz.jzhao.xyz/#-get-started) esse setup é melhor detalhado.

Como eu não pretendo fazer nenhum tipo de configuração mais avançada, além de não querer versionar todos esses arquivos, vou fazer um pouco diferente. A ideia é fazer com que o Quartz sirva somente como um pacote, onde vou apenas sobrescrever os arquivos que eu preciso para configuração mínima. Toda essa configuração será escrita em um [Makefile](https://www.gnu.org/software/make/manual/make.html)

Bom, vamos começar criando o diretório do projeto:

```zsh
mkdir blog && cd $_
```

> [!tip]
> `$_` recebe o último argumento do comando anterior.


Agora, vamos criar o `Makefile`:
```zsh
touch Makefile
```

Nesse arquivo, estarão as instruções necessárias para preparar os diretórios, baixar o código fonte do Quartz, sobrescrever os arquivos necessários e instalar as dependências. O conteúdo ficou assim:

```make title="Makefile"
all: clean prepare get-quartz link-quartz-overrides install-quartz-dependencies

prepare:
	@mkdir quartz

get-quartz: quartz
	@cd quartz; \
    curl -L https://github.com/jackyzha0/quartz/archive/refs/tags/v4.5.1.tar.gz | tar --strip-components=1 -xzf -

link-quartz-overrides: content quartz.config.ts quartz.layout.ts static/icon.png static/og-image.png
	@cd quartz; \
	rm -rf content quartz.config.ts quartz.layout.ts quartz/static/icon.png quartz/static/og-image.png; \
	ln -s ../content; \
	ln -s ../quartz.config.ts; \
	ln -s ../quartz.layout.ts; \
	cp ../static/icon.png quartz/static/; \
	cp ../static/og-image.png quartz/static/

install-quartz-dependencies: quartz
	@cd quartz; \
	npm i

clean:
	@rm -rf quartz

```

Para não deixar maçante, não me aprofundarei em cada comando. Mas aqui está uma breve descrição de cada target: 

| Target                      | Descrição                                                    |
| --------------------------- | ------------------------------------------------------------ |
| all                         | Responsável por chamar todos os outros targets na sequência  |
| prepare                     | Criará os diretórios que são requerimento dos outros targets |
| get-quartz                  | Baixa e extrai o código fonte do Quartz                      |
| link-quartz-overrides       | Mapeia os arquivos e diretórios da root com os do Quartz     |
| install-quartz-dependencies | Instala as dependências do Quartz                            |
| clean                       | Limpa os diretórios criados durante a execução do Makefile   |


> [!tip]
> Se você não especificar nenhum target na hora de executar o Makefile (comando `make`), o primeiro target será sempre executado. Você pode se aproveitar disso e criar um target que chama todos os outros.  Por isso, é bem comum encontrar o primeiro target nomeado como `all`.

> [!tip]
> A syntax de um target do Makefile é mais ou menos assim:
> ```
> target: requirements
> 	body
> ```
> No `requirements`, você pode por todos os arquivos e/ou diretórios necessários para a execução desse target que, na ausência de algum, a execução falhará.

> [!tip]
> O `-L` do curl vai redirecionar o binário para o `tar`, assim eu recebo o arquivo baixado pelo `stdout`.

Você pode ter reparado que no target `link-quartz-overrides`, a gente faz alguns [links simbólicos](https://en.wikipedia.org/wiki/Symbolic_link) de alguns arquivos e copia outros. Entre eles, estão o diretório de [conteúdo](https://quartz.jzhao.xyz/authoring-content), [arquivos de configuração do Quartz](https://quartz.jzhao.xyz/configuration) e arquivos estáticos de imagem, como [favicon](https://quartz.jzhao.xyz/plugins/Favicon) e `og-image`.

Esses arquivos são necessários para a execução do `Makefile`, bem como para o correto funcionamento do Quartz. Portanto, vamos criá-los. Para facilitar, vamos utilizar os arquivos do próprio repositório do Quartz como base. Pra isso, execute os comandos a seguir linha por linha:


```zsh
curl -O https://raw.githubusercontent.com/jackyzha0/quartz/refs/tags/v4.5.1/quartz.layout.ts
curl -O https://raw.githubusercontent.com/jackyzha0/quartz/refs/tags/v4.5.1/quartz.config.ts

mkdir static
curl -o static/icon.png https://raw.githubusercontent.com/jackyzha0/quartz/refs/heads/v4/quartz/static/icon.png
curl -o static/og-image.png https://raw.githubusercontent.com/jackyzha0/quartz/refs/heads/v4/quartz/static/og-image.png

mkdir content
echo ":)" > content/index.md
```

> [!hint]
> Se como eu, você estiver utilizando o Obsidian, linkar o diretório `content` com o seu [vault](https://help.obsidian.md/manage-vaults) pode ser uma boa. Dessa forma, você consegue sincronizar os Markdowns do seu blog com seus outros dispositivos por meio de alguma cloud. 
> 
> No meu caso, meu vault é sincronizado pelo iCloud, então, criei um link local usando o [bindfs](https://bindfs.org/). Depois, você pode fazer o link permanente usando o `launchctl` ou `systemctl`.


Nesse momento, temos todos os arquivos necessários do setup básico, mas, como os arquivos `quartz.layout.ts` e `quartz.config.ts` não estão mais no diretório original, vamos precisar atualizar os imports:

```diff title="quartz.config.ts"
+ import { QuartzConfig } from "./quartz/quartz/cfg"
+ import * as Plugin from "./quartz/quartz/plugins"
- import { QuartzConfig } from "./quartz/cfg"
- import * as Plugin from "./quartz/plugins"
```

```diff title="quartz.layout.ts"
+ import { PageLayout, SharedLayout } from "./quartz/quartz/cfg"
+ import * as Component from "./quartz/quartz/components"
- import { PageLayout, SharedLayout } from "./quartz/cfg"
- import * as Component from "./quartz/components"
```

Com todos arquivos criados e o `Makefile` pronto, podemos executar o `make`:

```zsh
make
```

Se tudo ocorrer bem, ao executar um `ls`, você terá uma estrutura de pastas como essa: 

![[Pasted image 20250910203203.png]]

Além dos arquivos que criamos, temos todo o código fonte do Quartz dentro do diretório `quartz`.  Se você pretende versionar isso em um git, por exemplo, o diretório `quartz` pode ser ignorado:

```txt title=".gitignore"
quartz
```



Nesse ponto, temos todos os arquivos para rodar o projeto. No site oficial, na aba de [arquitetura](https://quartz.jzhao.xyz/advanced/architecture#on-the-server), temos a indicação de uma CLI interna com um comando que sobe um server local. Para facilitar essa execução, vamos criar um script:

```shell title="scripts/dev.sh"
#!/bin/bash

if [[ ! -d quartz ]]; then
    echo "quartz dir not found, try to run \"make\" command"
    exit 1
fi

cd quartz && ./quartz/bootstrap-cli.mjs build --serve --port 3000

```

> [!note]
> O `cd quartz` é necessário, pois, nesse caso, o workdir precisa ser o diretório do Quartz.


Não esqueça de setar permissão de execução para o script:

```zsh
chmod +x ./scripts/dev.sh
```

Então, se executarmos:

```zsh
./scripts/dev.sh
```


O servidor local deve estar rodando na porta `3000`:
![[Pasted image 20250910203628.png]]


E, se acessarmos o `http://localhost:3000` no browser, teremos algo como: 

![[Pasted image 20250910203756.png]]


Com isso, temos tudo funcionando localmente (com hot reload e tudo). Partindo dos arquivos de configuração, você consegue personalizar tudo do seu jeito. Para entender melhor sobre esses arquivos, consulte a documentação de [configuração](https://quartz.jzhao.xyz/configuration) e teste bastante localmente.


E, para finalizar, caso queira publicar o seu trabalho, pode ser legal criar um script de build:

```shell title="scripts/build.sh"
#!/bin/bash

if [[ ! -d quartz ]]; then
    echo "quartz dir not found, try to run \"make\" command"
    exit 1
fi

cd quartz && ./quartz/bootstrap-cli.mjs build --output ../dist

```

```zsh
chmod +x ./scripts/build.sh
```

Esse script vai gerar um diretório `dist` na raiz do projeto. Nesse diretório, estão todos os arquivos que você precisa para a publicação.

--- 
 O código fonte desse passo a passo está [nesse repositório](https://github.com/amendoa/amendoa.dev/tree/main/content-source-code/how-i-built-my-blog-with-quartz). Caso queira consultar alguma aplicação do mundo real, o meu [blog](https://github.com/amendoa/amendoa.dev) foi construído nessa mesma base.
