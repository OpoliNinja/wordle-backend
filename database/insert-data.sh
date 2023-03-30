#!/bin/bash
# This script will only be executed when is there is no volume created for our database in docker
set -e

# 1) Filter words with 5 letters
fiveLettersWords=$(grep '^.....$' /var/lib/postgresql/words.txt)

echo "$fiveLettersWords"

# 2) Start creating the query
query="INSERT INTO words (word) VALUES "

for word in $fiveLettersWords ; do
    query+="('$word'),"
done

query=${query%?}

# 3) Execute our query into docker
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

$query;

EOSQL
