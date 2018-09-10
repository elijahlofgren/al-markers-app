#/bin/bash
echo fix from https://tddpirate.zak.co.il/2018/09/06/do-material-design-icons-fail-to-show-in-your-cordova-vue-vuetify-android-application/
echo ============================================
echo Fix paths to font files in Android css files.
echo ============================================
CSSFILES=$1/www/dist/static/css/*.css
echo The relevant css files are: ${CSSFILES}
mkdir -p /tmp/fixcssfiles
rm -v /tmp/fixcssfiles/*
for cssfname in ${CSSFILES} ; do
  #cp ${cssfname} /tmp/fixcssfiles/`basename ${cssfname}`
  #                            # (Save a backup css file)
  sed 's=url(static/fonts/=url(../fonts/=g' < ${cssfname} \
                             > /tmp/fixcssfiles/tmpcssfname
  mv /tmp/fixcssfiles/tmpcssfname ${cssfname}
  echo Procssed ${cssfname}
done
echo ============================================
