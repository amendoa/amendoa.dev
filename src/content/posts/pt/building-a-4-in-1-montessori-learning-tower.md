---
title: "Construindo Uma Torre Montessori 4 Em 1"
lang: pt
translationKey: building-a-4-in-1-montessori-learning-tower
routeSlug: construindo-uma-torre-de-aprendizagem-montessori-4-em-1
tags: [maker, woodworking, 3d-printing]
aiAssisted: true
date: 2026-11-07
---

Construí esta torre de aprendizagem Montessori 4 em 1 para a minha filha usando principalmente sobras de MDF, madeira e filamento de outros projetos.

O projeto é baseado na **torre de aprendizagem HM0001 da Só Berços**:

[Produto original — Só Berços](https://www.sobercos.com.br/torre-de-aprendizagem-montessoriana-4-em-1-verde)

O que me chamou atenção nesse modelo foi a forma como ele muda de função sem dobrar. Em pé, funciona como torre de aprendizagem. Quando a estrutura inteira é colocada de lado, vira uma pequena mesa com cadeira.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/montessori-tower-finished-01.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

Eu não tinha os desenhos de fabricação originais, então a primeira parte do projeto foi entender como o móvel era construído.

## Engenharia reversa do projeto original

A página do produto fornecia as dimensões externas:

- 780 mm de altura;
- 344 mm de largura;
- 430 mm de profundidade.

O fabricante também disponibiliza um manual de montagem.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/original-manual-exploded-view.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

O manual mostra claramente a estrutura principal:

- duas laterais idênticas;
- dois painéis internos fixos;
- uma barra superior de madeira;
- uma plataforma removível.

O que ele não fornece é um conjunto completo de medidas para todas essas peças.

Usei o ChatGPT para ajudar a reconstruir as medidas que faltavam a partir do manual e das dimensões externas conhecidas.

Usamos a lateral de 780 × 430 mm como principal referência, retificamos os desenhos do manual e estimamos as posições e os tamanhos das aberturas.

Um dos desenhos criados durante esse processo foi este:

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/reverse-engineering-side-panel.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

Também reconstruímos as outras peças:

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/reverse-engineering-parts.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

Depois reunimos as medidas em um desenho técnico mais completo:

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/reverse-engineering-overview.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

As medidas externas vieram do produto original. As medidas internas foram calculadas a partir dos desenhos aqui publicados, então são só aproximações.

Usei **MDF de 18 mm** nas laterais.

## Materiais

Não comprei todo o material especificamente para este projeto.

As laterais brancas são de MDF.

As peças marrons são sobras de madeira que eu já tinha e são mais grossas que o MDF.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/montessori-tower-upright-front.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

Essas peças marrons viraram os painéis internos fixos.

Quando a torre está em pé, elas ficam na vertical. Quando a torre é colocada de lado, uma vira o tampo da mesa e a outra vira o assento.

## Cortando as laterais

As laterais foram as peças mais complicadas por causa das grandes aberturas internas e dos cantos arredondados.

Fiz o corte bruto das aberturas com a tico-tico e depois usei a tupia para limpar as bordas e formar os cantos internos.

Essa parte não saiu como eu queria.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/router-cut-before-3d-trim.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

Alguns cantos ficaram irregulares, algumas bordas do MDF lascaram e, em alguns pontos, retirei mais material do que deveria.

As aberturas ainda eram utilizáveis, então mantive as peças. O problema era principalmente o acabamento das bordas internas.

## Corrigindo os cortes internos

As molduras impressas em 3D não faziam parte do plano original.

Eu as criei depois do problema com os cortes internos, como uma alternativa a refazer as duas laterais.

Primeiro geramos uma peça curva para acompanhar a abertura. Depois recortei essa curva e fiz outro modelo a partir dela.

Os dois STLs abaixo mostram esse processo e os dois fizeram parte do que imprimi para chegar à borda colorida final.

Primeiro, a curva:

<stl-viewer src="/attachments/building-a-4-in-1-montessori-learning-tower/rounded_C_MDF_clip_20mm_no_inner_fillet_outer_R1.stl" title="Curva base para a borda interna"><strong>Curva base para a borda interna</strong><a href="/attachments/building-a-4-in-1-montessori-learning-tower/rounded_C_MDF_clip_20mm_no_inner_fillet_outer_R1.stl" download>Baixar STL</a></stl-viewer>

Depois, criei um reto utilizando a própria curva `Untitled.stl`:

<stl-viewer src="/attachments/building-a-4-in-1-montessori-learning-tower/Untitled.stl" title="Peça final usada na borda interna"><strong>Peça final usada na borda interna</strong><a href="/attachments/building-a-4-in-1-montessori-learning-tower/Untitled.stl" download>Baixar STL</a></stl-viewer>

Eu tinha pequenas quantidades de filamento que sobraram de outras impressões, então imprimi as peças nas cores que estavam disponíveis.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/montessori-tower-finished-02.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

As peças impressas cobrem as bordas irregulares do MDF e criam um contorno uniforme nas aberturas.

## Plataforma regulável

A plataforma removível entra em diferentes aberturas horizontais nas laterais.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/montessori-tower-finished-01.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

Isso permite mudar a altura da plataforma sem alterar a estrutura.

A barra de madeira na parte superior une as duas laterais e fecha o lado aberto da torre.

## Modo mesa e cadeira

Essa é a parte do projeto original que me fez escolher esse modelo.

A torre não dobra.

Você simplesmente coloca a estrutura inteira de lado.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/montessori-tower-table-mode-01.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

Os dois painéis marrons internos mudam de orientação junto com o restante da estrutura.

Um vira o **tampo da mesa**.

O outro vira o **assento**.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/montessori-tower-table-mode-02.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

As laterais continuam sendo a estrutura principal nas duas posições.

<div style="text-align: center;">
  <img src="/attachments/building-a-4-in-1-montessori-learning-tower/montessori-tower-table-mode-03.png" alt="" style="max-height: 400px; max-width: 100%; width: auto; height: auto; object-fit: contain;" />
</div>

As mesmas peças são usadas nas duas configurações.

## O que eu mudaria se fizesse outra

Se eu construísse outra, mudaria a forma de fazer as aberturas internas.

Eu faria gabaritos adequados para a tupia antes de cortar as laterais definitivas.

Também deixaria mais material no corte com a tico-tico e usaria uma fresa copiadora apoiada no gabarito para definir a forma final.

O principal problema nesta construção foi tentar controlar a geometria final das aberturas sem um gabarito adequado.

As molduras impressas resolveram isso nesta torre.

## Resultado

A torre está pronta e sendo usada.

Minha filha usa na bancada da cozinha e também na posição de mesa e cadeira.

O projeto acabou combinando engenharia reversa, trabalho com MDF, sobras de madeira, tupia e impressão 3D.

> Este artigo documenta a minha construção e o processo de engenharia reversa. Isso não é um desenho oficial e não é garantida por nenhuma norma de segurança.
