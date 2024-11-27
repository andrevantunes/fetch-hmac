GREEN="\e[1;32m"
RESET="\e[1;0m"
echo "$GREEN[Start build process]$RESET"

echo "- Clear dist"
rm -rf dist
mkdir dist

echo "- Compile files .ts on ./.tmp"
yarn tsc --outDir .tmp

echo "- Bundle index.js"
yarn rollup .tmp/MeSalvaApi.js --file .tmp/bundle.js --format cjs --silent
yarn uglifyjs .tmp/bundle.js -o dist/index.js -c -m

echo "- Bundle index.d.ts"
yarn dts-bundle --name @mesalva/api --main .tmp/MeSalvaApi.d.ts
mv .tmp/@mesalva/api.d.ts dist/index.d.ts

echo "- Remove temp files"
rm -rf .tmp
rm -rf .compile

echo "$GREEN- Success$RESET"
echo "$GREEN[Finish]$RESET"
