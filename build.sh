npm run build
npm run buildsettings
rm -r ../annona/docs/tools/*
cp -r dist/* ../annona/docs/tools/
(echo "---"; echo "layout: page"; echo "title: Annotation Tools"; echo "---"; cat ../annona/docs/tools/index.html) > /tmp/index.html
cp /tmp/index.html ../annona/docs/tools/index.html
rm /tmp/index.html
cd ../annona/docs/tools
# git add .
# git commit -m "update annotation tools"
# git push -f 'https://github.com/ncsu-libraries/annona.git' main
cd ~/projects/tag-builder-iiif
git add -A
git commit -m "update source code"
git push -f 'https://github.com/dnoneill/iiif-tag-builder.git' source
