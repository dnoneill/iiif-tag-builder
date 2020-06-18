npm run build
rm -r ../iiif-annotation/docs/tools/*
cp -r dist/* ../iiif-annotation/docs/tools/
(echo "---"; echo "layout: page"; echo "---"; cat ../iiif-annotation/docs/tools/index.html) > /tmp/index.html
cp /tmp/index.html ../iiif-annotation/docs/tools/index.html
rm /tmp/index.html
cd ../iiif-annotation/docs/tools
git add .
git commit -m "update annotation tools"
git push -f 'https://github.com/ncsu-libraries/annona.git' master
cd ~/projects/tag-builder-iiif
git add -A
git commit -m "update source code"
git push -f 'https://github.com/dnoneill/iiif-tag-builder.git' source
