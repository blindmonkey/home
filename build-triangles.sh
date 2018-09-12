CURDIR=`pwd`

TMP=`mktemp -d`
cd $TMP

echo "Cloning triangles repo..."
git clone git://github.com/blindmonkey/blindmonkey.github.io
ls -la
cd blindmonkey.github.io/triangles
ls -la
npm i
npm run build
ls -la
echo "IN BUILD"
cp ./index.js "$CURDIR/public/js/triangles.js"
ls -la

cd $CURDIR
rm -rf $TMP