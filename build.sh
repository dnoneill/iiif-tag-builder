npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f 'https://github.com/dnoneill/iiif-tag-builder.git' master
cd ~
