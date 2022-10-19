//  -------------------------------------------
//  Zoomist
//  -------------------------------------------
const myZoomist = document.querySelector('#zoomistFrame')
new Zoomist(myZoomist, {
  // optional parameters
  maxRatio: 4,
  height: '60%',
  // if you need silder
  slider: true,
  // if you need zoomer
  zoomer: false,
  // event
  on: {
    ready() {
      // console.log('Zoomist ready!')
    }
  }
})
 