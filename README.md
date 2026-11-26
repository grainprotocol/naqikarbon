# Instituto NaqīKarbon

Site institucional estático do Instituto NaqīKarbon.

## Publicação

Antes de publicar qualquer alteração visual, editorial, técnica ou de
responsividade, implementar primeiro localmente e aguardar confirmação explícita
do usuário. Não criar commits, realizar push, alterar a branch `main` ou
acionar o GitHub Pages sem essa autorização.

Para publicar o site, configure o GitHub Pages em **Settings → Pages** para
publicar a raiz (`/`) da branch `main`. O arquivo `CNAME` na raiz do repositório
deve conter `naqikarbon.com.br`; esse arquivo configura o domínio no GitHub
Pages e não é um registro CNAME na zona DNS.

No Registro.br, configure somente o domínio raiz (`naqikarbon.com.br`) com
quatro registros A apontando para `185.199.108.153`, `185.199.109.153`,
`185.199.110.153` e `185.199.111.153`. Não é necessário configurar `www` para
publicar o site no domínio raiz.

O workflow **Validate website** verifica os arquivos estáticos em cada push. A
publicação é feita pela configuração do GitHub Pages, não por esse workflow.

## Serviços técnicos

O diretório de serviços fica em `servicos/`, com uma página central e páginas
permanentes para consultoria em sustentabilidade, descarbonização, pesquisa e
formação, inovação ambiental, editais e financiamento, e projetos colaborativos.
As fontes consultadas, metadados e informações que exigem revisão institucional
estão documentados em `CONTENT_AUDIT.md`.

## Expedição pelos Biomas do Brasil

A apresentação e as duas versões do jogo ficam em
`projetos/expedicao-pelos-biomas/`. A página permite escolher entre a versão
infantil, com narração do navegador, e a experiência para jovens e adultos.
Após a publicação na branch `main`, o projeto estará disponível em:

`https://naqikarbon.com.br/projetos/expedicao-pelos-biomas/`

## Blog

O acervo editorial estático fica em `blog/`, com a listagem em `blog/index.html`
e uma página por artigo em `blog/<slug>/index.html`. As imagens migradas estão
armazenadas em `assets/blog/images/`; o inventário dos artigos e seus endereços
originais está em `blog/inventario.csv`.

## Indexação

`robots.txt` permite o rastreamento e indica `sitemap.xml`, que lista as páginas
institucionais, o projeto educativo e os artigos públicos. `llms.txt` oferece
um índice complementar e experimental para leitores automatizados; não garante
rastreamento, indexação ou citações por ferramentas de busca ou IA.

Após a publicação, cadastre o domínio raiz `https://naqikarbon.com.br/` no
Google Search Console e no Bing Webmaster Tools e envie
`https://naqikarbon.com.br/sitemap.xml`. Os códigos de verificação devem ser
obtidos nas próprias contas; nenhum token foi incluído no repositório.

## Antes de divulgar

- Envie um teste pelo formulário e confirme a ativação do FormSubmit no e-mail
  `naqikarbon@gmail.com`. Sem essa confirmação, o serviço pode não encaminhar
  mensagens.
- Confira os links, imagens e recursos externos em produção. O site usa
  Tailwind CSS, Google Fonts, Font Awesome, TradingView e imagens hospedadas por
  terceiros.
- Revise a política de privacidade e os endereços de contato para confirmar que
  refletem os processos atuais da instituição.
