// Ryan Prasad
// rhprasad@outlook.com
// 5/19/2022
// Functional app is located here: https://ryanprasad.users.earthengine.app/view/marijuana-farm-raid


// This is my first Earth Engine app - pertaining to this story:
// https://www.dailymail.co.uk/news/article-2015001/Largest-marijuana-plantation-hidden-black-netting-Mexican-desert.html
// The Mexican government did not confirm the exact location of the field, but there is strong evidence the field was at 29.9547967 N, 114.9961798 W.
// The shape sticks out like a sore thumb against the desert, is about 300 acres, 
// and reflects strongly in the NIR band - meaning there was probably lots of vegetation underneath the black cover.
// This app is a false color time series of the construction of the field before and after it was torn down after the raid on July 15, 2011.
// Shout out the the remote sensing and programming faculty at PSU GIS.


// Define visual parameters
var falseColor543Vis = {
  min: 0.0,
  max: 0.4,
  gamma: 1.2,
};

// Bring in the selected Landsat 7 images
Map.addLayer(ee.Image('LANDSAT/LE07/C01/T1_TOA/LE07_038039_20110308').select(['B5', 'B4', 'B3']), falseColor543Vis, 'Mar 8, 2011');
Map.addLayer(ee.Image('LANDSAT/LE07/C01/T1_TOA/LE07_038039_20110425').select(['B5', 'B4', 'B3']), falseColor543Vis, 'Apr 25, 2011');
Map.addLayer(ee.Image('LANDSAT/LE07/C01/T1_TOA/LE07_038039_20110511').select(['B5', 'B4', 'B3']), falseColor543Vis, 'May 11, 2011');
Map.addLayer(ee.Image('LANDSAT/LE07/C01/T1_TOA/LE07_038039_20110527').select(['B5', 'B4', 'B3']), falseColor543Vis, 'May 27, 2011');
Map.addLayer(ee.Image('LANDSAT/LE07/C01/T1_TOA/LE07_038039_20110612').select(['B5', 'B4', 'B3']), falseColor543Vis, 'June 12, 2011');
Map.addLayer(ee.Image('LANDSAT/LE07/C01/T1_TOA/LE07_038039_20110628').select(['B5', 'B4', 'B3']), falseColor543Vis, 'June 28, 2011');
Map.addLayer(ee.Image('LANDSAT/LE07/C01/T1_TOA/LE07_038039_20110714').select(['B5', 'B4', 'B3']), falseColor543Vis, 'July 14, 2011');
Map.addLayer(ee.Image('LANDSAT/LE07/C01/T1_TOA/LE07_038039_20110730').select(['B5', 'B4', 'B3']), falseColor543Vis, 'July 30, 2011');

// Center and scale the map
Map.setCenter(-114.9961798, 29.9547967, 15);

// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '450px'}
});

// Layer list
var layerList = Map.layers();
print(layerList);

var current = 7
// Slider to define which image will be shown.
var slider = ui.Slider({
  min: 0, 
  max: layerList.length() - 1, 
  value: current, 
  step: 1,
  style: {width: '300px', textAlign: 'center'}
});


// Title
panel.add(ui.Label('Life of an Illicit 300 Acre Marijuana Farm', {fontSize: '24px', textAlign: 'center', fontWeight: 'bold'}));
panel.add(ui.Label('(Use the slider below to control the map.)', {fontSize: '10px', textAlign: 'center'}));


// Add the slider and a label to the panel 
panel.add(slider);
// Label showing date
var date = ui.Label('Jul 30, 2011', {fontSize: '14px', fontWeight: 'bold'});
var commentary = ui.Label('The farm at full operational capacity. Notice the strong plant life at the North side of the site, away from the highway to the South.', {fontSize: '14px', fontWeight: 'bold'});
panel.add(date);
panel.add(commentary);

// Add the text to the panel in labels
panel.add(ui.Label('AP YouTube clip', null, 'https://www.youtube.com/watch?v=hJDVWRdXW_8'));
panel.add(ui.Label('Print story at Daily Mail', null, 'https://www.dailymail.co.uk/news/article-2015001/Largest-marijuana-plantation-hidden-black-netting-Mexican-desert.html'));
panel.add(ui.Label('Some time between March and April 2011, construction began on the largest marijuana field in Mexican history. The farm is speculated to belong to El Chapo\'s Sinaloa cartel - responsible for much of the worst violence in the country at the time. The farm was raided by the Mexican army in mid July 2011 and was destroyed.'));
panel.add(ui.Label('A black tarp was erected over the farm, which is often used by legitimate farmers to protect their crops from the sun. The marijuana was reportedly concealed by other plants. A number of small structures were located at the site, including toilets for the workers. 58 people were detained in connection to the farm.'));
panel.add(ui.Label('The Mexican government never confirmed the exact location of the field, but there is strong evidence the location of the field was at 29.9547967 N, 114.9961798 W.', {fontWeight: 'bold'}));
panel.add(ui.Label('The shape sticks out like a sore thumb against the desert, is about 300 acres, and reflects strongly in the NIR band - meaning there was probably lots of vegetation underneath the black cover.'));
panel.add(ui.Label('This app is a Landsat 7 false color (543) time series of the construction of the field through its destruction on July 15, 2011.'));
panel.add(ui.Label('Creator: Ryan Prasad | Date: 5/19/2022 | Email: rhprasad@outlook.com | Some of the image slider code was written by Iago Mendes and JonasV on the GIS Stack Exchange.'));

// Add the panel to the map
ui.root.add(panel);


// When the slider moves... do a few things
slider.onSlide(function(value){
  // Function that changes the opacity of layers
  layerList.get(current).setOpacity(0);
  layerList.get(value).setOpacity(1);
  current = value;
  
  // Change the date of the label underneath the slider
  date.setValue(layerList.get(current).getName());
  
  // Update the comment depending on the date
  if (layerList.get(current).getName() == 'Mar 8, 2011') {
    commentary.setValue('The bare earth site prior to construction.');
  }
  if (layerList.get(current).getName() == 'Apr 25, 2011') {
    commentary.setValue('Construction of the site began sometime before this. There is detectable plant life underneath the northernmost part of the site.');
  }
  if (layerList.get(current).getName() == 'May 11, 2011') {
    commentary.setValue('The site at about 40% operation. New plant life is barely noticeable in the south part of the site not covered by the tarp. Some of the area covered by the tarp has not grown yet.');
  }
  if (layerList.get(current).getName() == 'May 27, 2011') {
    commentary.setValue('The site at about 50% operation. Notice the strong plant life beneath the tarp and weaker plant life exposed to the sun in the southernmost part of the site.');
  }
  if (layerList.get(current).getName() == 'June 12, 2011') {
    commentary.setValue('The site at about 80% operation. The previously exposed plant life has been covered, but some new plant life in the southeast part of the site is exposed.');
  }
  if (layerList.get(current).getName() == 'June 28, 2011') {
    commentary.setValue('The site at about 90% operation. Some new plant life is exposed in the west part of the site. The oldest plants seem to be quite healthy.');
  }
  if (layerList.get(current).getName() == 'July 14, 2011') {
    commentary.setValue('The farm at full operational capacity before the raid. Notice the strong plant life at the North side of the site, away from the highway to the South.');
  }
  if (layerList.get(current).getName() == 'July 30, 2011') {
    commentary.setValue('The site after the raid by the Mexican army. All of the cultivated plant life was destroyed or removed - all that remains are the structures in the west part of the site. The natrural scrub vegetation reflects strongly in the absense of the farm.');
  }

});

// Go back to the image of it fully built (#6 in the series before the raid)
slider.setValue(6)

// Slider from Iago Mendes and JonasV: https://gis.stackexchange.com/questions/417340/how-to-change-the-image-shown-on-the-map-using-a-slider
