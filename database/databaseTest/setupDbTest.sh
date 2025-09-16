#!/bin/bash

# Carregar variáveis do .env na raiz
if [ -f ../../backend/.env ]; then
  export $(grep -v '^#' ../../backend/.env | xargs)
else
  echo ".env não encontrado na pasta raiz!"
  exit 1
fi

# Checar variáveis obrigatórias
if [ -z "$DATABASE_HOST" ] || [ -z "$DATABASE_USER" ] || [ -z "$DATABASE_PASSWORD" ]; then
  echo "Variáveis DATABASE_HOST, DATABASE_USER e DATABASE_PASSWORD precisam estar definidas no .env"
  exit 1
fi

# Rodar createDatabase.sql
if [ -f createDatabase.sql ]; then
  echo "Executando createDatabase.sql..."
  mysql -h $DATABASE_HOST -u $DATABASE_USER -p$DATABASE_PASSWORD < createDatabase.sql
else
  echo "createDatabase.sql não encontrado!"
  exit 1
fi

# Rodar todos os arquivos da pasta tables em ordem alfabética
TABLES_DIR="./tables"

if [ -d "$TABLES_DIR" ]; then
  for file in $(ls $TABLES_DIR | sort); do
    if [[ $file == *.sql ]]; then
      echo "Executando $file..."
      mysql -h $DATABASE_HOST -u $DATABASE_USER -p$DATABASE_PASSWORD $DATABASE_NAME < "$TABLES_DIR/$file"
    fi
  done
else
  echo "Pasta tables não encontrada!"
  exit 1
fi

echo "Todos os scripts SQL foram executados com sucesso!"
