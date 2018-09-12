# AL Historic Markers App

Shows locations of AL historical markers

## Not publishable to iOS App store (rejected)
This Cordova app was rejected by Apple for publishing in the App Store for it being not app-like enough. It probably needs to have the UI rebuilt with a framework that makes the interface look like native iOS widgets (e.g. Ionic, Xamarin)

## Screenshots

### Home

![Home](https://raw.githubusercontent.com/elijahlofgren/al-markers-app/master/source-images/screenshots/android/Screenshot_20180909-215051.png)

### Map View

![Filter by category](https://raw.githubusercontent.com/elijahlofgren/al-markers-app/master/source-images/screenshots/android/Screenshot_20180909-215141.png)


### Filter By Category

![Filter by category](https://raw.githubusercontent.com/elijahlofgren/al-markers-app/master/source-images/screenshots/android/Screenshot_20180909-215059.png)



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# build for production and cordova build.
npm run cordova-build

# build for production and serve the app through the browser - no hot reload.
npm run browser

# add respective platforms
cordova platform add android
cordova platform add ios

# build for production and serve the app on an iOS device
npm run ios

# build for production and serve the app on an android device (won't serve on a virtual device)
npm run android

# build for production and serve the app on an android device (will serve on a virtual device or physical device - prefers virtual)
npm run android-vm
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
