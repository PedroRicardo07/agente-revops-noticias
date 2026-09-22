---
name: radar
description: roda o radar do dia com o time de agentes, na ordem pesquisador, verificador, redator, guarda (e o agente do dono, se existir), e depois grava o dia no repositório com um commit; use quando alguém pedir para rodar o radar ou quando a rotina das 7h disparar.
---

# Radar do dia

Você coordena o time. Não pesquisa, não escreve e não verifica nada por conta própria: aciona cada agente na ordem, confere o que ele deixou em disco e só então passa para o próximo.

**Uma etapa por vez, sem pular nenhuma.** Se uma etapa falhar, pare, diga o que aconteceu e não invente o resultado dela.

Antes da etapa 1: descubra a data real de hoje e leia `RADAR.md` e `CLAUDE.md`. A data de hoje, no formato AAAA-MM-DD, é o nome de arquivo usado em todas as etapas.

## 1. Pesquisador

Acione o agente `pesquisador`.

Depois, abra `fontes/AAAA-MM-DD.md` e confira que existe e tem **pelo menos três itens**.

- Menos de três itens, ou arquivo inexistente: registre isso e **siga mesmo assim**. Dia fraco é dia fraco, não é motivo para parar.
- Nunca complete a lista você mesmo.

## 2. Verificador

Acione o agente `verificador`.

Depois, abra `verificacao/AAAA-MM-DD.md` e confira que existe e traz a tabela e a contagem. Anote quantos itens ficaram CONFERE.

## 3. Redator

Acione o agente `redator`.

Depois, confira que existem os dois: `diario/AAAA-MM-DD.md` e `index.html`. Confira também que o briefing começa com a primeira linha que `RADAR.md` exige.

Se `modelo-index.html` não existir, o redator vai parar. Nesse caso, pare também, avise que falta o modelo e não gere HTML por conta própria.

## 4. O agente do dono

Olhe `.claude/agents/`. Se houver algum agente além de `pesquisador`, `verificador`, `redator` e `guarda`, acione esse agente também.

Pegue o que ele devolveu e inclua **no fim do briefing**, numa seção com o nome dele, por exemplo `## Colunista`. Havendo mais de um agente extra, uma seção para cada, na ordem alfabética.

Se esse agente também gravou arquivo próprio (por exemplo um `.docx`), deixe o arquivo onde ele salvou e mencione o caminho na seção.

Quando a seção for de humor ou opinião declarada, diga isso na primeira linha da seção. Assim o guarda sabe que ali a opinião está identificada e não está passando por fato.

## 5. Guarda

Acione o agente `guarda`.

- Terminou em **NÃO PUBLIQUE**: pare aqui. Mostre o relatório dele na íntegra, **não faça commit** e não tente contornar. O radar do dia fica em disco, sem publicar.
- Terminou em **PODE PUBLICAR**: siga para a etapa 6.

## 6. Gravar

Só chegue aqui com PODE PUBLICAR na mão.

1. `git add -A`
2. `git commit -m "radar de AAAA-MM-DD"`
3. Se houver remoto configurado, `git push`.

Se o push falhar, **diga o motivo exato** (login, rede, conflito) e pare. Não force, não reescreva histórico, não troque o endereço do remoto, não tente outro caminho. O commit fica local e o usuário resolve.

## 7. Relatório final

Três linhas, só isto:

- a primeira linha do briefing de hoje;
- quantos itens conferiram, do total pesquisado;
- quantos agentes rodaram.

## Nunca

- Nunca envie nada para ninguém. O commit e o push são a única saída deste projeto. Nada de e-mail, mensagem, webhook ou publicação em outro lugar.
- Nunca use chave, senha, token ou credencial, nem peça uma.
- Nunca pule uma etapa, nem inverta a ordem.
- Nunca escreva no lugar de um agente, nem conserte o trabalho dele. Deu problema, relate.
- Nunca faça commit sem o PODE PUBLICAR do guarda.
