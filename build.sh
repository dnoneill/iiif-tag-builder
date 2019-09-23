npm run build
cp -r dist/* ../iiif-annotation/docs/tag-builder/
(echo "---"; echo "layout: page"; echo "title: Tag Builder"; echo "---"; cat ../iiif-annotation/docs/tag-builder/index.html) > /tmp/index.html
cp /tmp/index.html ../iiif-annotation/docs/tag-builder/index.html
rm /tmp/index.html
cd ../iiif-annotation/docs/tag-builder
git add .
git commit -m "update tag-builder"
git push -f 'https://github.com/ncsu-libraries/iiif-annotation.git' master
cd ~/projects/tag-builder-iiif
git add -A
git commit -m "update source code"
git push -f 'https://github.com/dnoneill/iiif-tag-builder.git' source
